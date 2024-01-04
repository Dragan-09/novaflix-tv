import { PrismaClient } from "@prisma/client";
import { notifyAdminWithPurchase } from "../services/email/notify_admin.mjs";
import purchase_trial from "../services/email/purchase_trial.mjs";
import { Stripe } from "stripe";
import activeSubscriptions from "../services/email/active_subscription.mjs";
import { v4 as uuidv4 } from "uuid";
import Redis from "ioredis";
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();
const now = new Date();

const getPlans = async (req, res) => {
  try {
    let plans = await prisma.plan.findMany({ orderBy: { id: "asc" } });
    if (!plans)
      return res.status(500).json({ Message: "Something went wrong!" });

    plans = await Promise.all(
      plans.map(async (plan) => {
        plan.stripe_price = await stripe.prices.retrieve(plan.price_id);
        return plan;
      }),
    );

    return res.status(200).json({
      data: plans.map((plan) => {
        return {
          id: plan.id,
          title: plan.name,
          description: plan.description,
          image: plan.image,
          price: plan.stripe_price.unit_amount / 100,
          price_description: plan.price_description,
          features: plan.features,
        };
      }),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "Something went wrong!" });
  }
};

const getPlan = async (req, res) => {
  let { name: plan_name } = req.params;

  plan_name = plan_name.replace("plan-", "");

  try {
    const plan = await prisma.plan.findFirstOrThrow({
      where: {
        name: plan_name,
      },
    });

    const price = await stripe.prices.retrieve(plan.price_id);

    return res.status(200).json({
      data: {
        name: plan.name,
        price: price.unit_amount / 100,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "No Plan Found!",
    });
  }
};

const paypalCreateOrder = async (req, res) => {
  const { plan: plan_name } = req.body;
  console.log(req.body);
  try {
    const plan = await prisma.plan.findFirst({
      where: {
        name: plan_name.toLowerCase(),
      },
    });

    const price = await stripe.prices.retrieve(plan.price_id);

    const order = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: `${price.unit_amount / 100}`,
            },
            custom_id: plan.id,
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              user_action: "PAY_NOW",
              return_url: "https://twitter.com",
              cancel_url: "https://twitter.com",
              landing_page: "LOGIN",
            },
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
        },
      },
    );
    console.log(order.data);
    return res.status(200).json({ data: order.data });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

const paypalCaptureOrder = async (req, res) => {
  const { orderID: order_id } = req.body;
  const uuid = uuidv4();
  const date = new Date();

  try {
    const orderData = await axios.get(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${order_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    const plan_id = Number(orderData.data.purchase_units[0].custom_id);

    const plan = await prisma.plan.findFirst({
      select: {
        duration_months: true,
      },
      where: {
        id: plan_id,
      },
    });

    const subscribe = await prisma.plansOnUsers.create({
      data: {
        uuid,
        plan_id: plan_id,
        user_email: orderData.data.payer.email_address,
        status: "ON_PROCESS",
        subscription_id: orderData.id,
        subscription_method: "PAYPAL",
        ends_at: new Date(
          date.setMonth(date.getMonth() + plan.duration_months),
        ).toISOString(),
        assigned_at: new Date().toISOString(),
      },
      select: {
        user_email: true,
        plan: true,
        type: true,
        user: true,
        uuid: true,
        plan_id: true,
      },
    });

    const sendEmail = await purchase_trial(
      subscribe.user_email,
      subscribe.plan_id,
      subscribe.type,
      subscribe.user?.id,
    );

    const notify = await notifyAdminWithPurchase(
      subscribe.user_email,
      subscribe.plan.name,
      subscribe.type,
      subscribe.uuid,
      subscribe.user?.id,
    );

    return res.status(201).json({
      message: "Subscribed Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

const subscribe = async (req, res) => {
  const { payment_intent, payment_intent_client_secret } = req.query;
  const date = new Date();

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

    const paymentMethod = await stripe.paymentMethods.retrieve(
      paymentIntent.payment_method,
    );

    const { email } = paymentMethod.billing_details;
    const { plan: plan_id } = paymentIntent.metadata;

    const plan = await prisma.plan.findFirst({
      where: {
        id: Number(plan_id),
      },
    });

    const manual_subscription = await prisma.plansOnUsers.create({
      data: {
        uuid: uuidv4(),
        plan_id: plan.id,
        user_email: email,
        status: "ON_PROCESS",
        subscription_id: "",
        subscription_method: "STRIPE",
        assigned_at: new Date().toISOString(),
        ends_at: new Date(
          date.setMonth(date.getMonth() + plan.duration_months),
        ).toISOString(),
      },
      select: {
        user_email: true,
        plan: true,
        type: true,
        user: true,
        uuid: true,
        plan_id: true,
      },
    });

    const sendEmail = await purchase_trial(
      manual_subscription.user_email,
      manual_subscription.plan_id,
      manual_subscription.type,
      manual_subscription.user?.id,
    );

    const notify = await notifyAdminWithPurchase(
      manual_subscription.user_email,
      manual_subscription.plan.name,
      manual_subscription.type,
      manual_subscription.uuid,
      manual_subscription.user?.id,
    );

    return res.redirect(`${process.env.FRONTEND_URL}?congrats=subscription`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const trial = async (req, res) => {
  const { id: user_id } = req.user;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    const subscriptions = await prisma.plansOnUsers.findFirst({
      where: {
        user_id: user_id,
        ends_at: { gt: new Date() },
      },
      orderBy: { ends_at: "desc" },
    });

    if (subscriptions)
      return res
        .status(400)
        .json({ message: "You already have an active plan!" });

    const trial = await prisma.plansOnUsers.findFirst({
      where: {
        user_id: user_id,
        type: "TRIAL",
      },
    });

    if (trial)
      return res
        .status(400)
        .json({ message: "You can not have the free trial more than once!" });

    const generated_uuid = uuidv4();
    const setTrial = await prisma.plansOnUsers.create({
      data: {
        uuid: generated_uuid,
        user_id: user_id,
        plan_id: 2,
        user_email: user.email,
        status: "ON_PROCESS",
        ends_at: new Date(
          new Date().getTime() + 60 * 60 * 1000 * 24,
        ).toISOString(),
        type: "TRIAL",
      },
      select: {
        plan: true,
      },
    });

    const sendEmail = await purchase_trial(user.email, 2, "TRIAL", user.id);

    const notify = await notifyAdminWithPurchase(
      user_id,
      setTrial.plan.name,
      setTrial.type,
      generated_uuid,
    );

    return res.status(200).json({
      message: "Congratulations! You got the 24 hours trial. Check you email!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const storeCredentials = async (req, res) => {
  const { subscription: subscription_uuid } = req.params;
  const { sub_username, sub_password } = req.body;

  try {
    const subscription = await prisma.plansOnUsers.findFirstOrThrow({
      where: {
        uuid: subscription_uuid,
      },
    });

    console.log(subscription);

    const user = subscription.user_id
      ? await prisma.user.findFirstOrThrow({
          where: {
            id: subscription.user_id,
          },
        })
      : undefined;

    console.log(user?.id);

    const credentials = await prisma.credentials.create({
      data: {
        user_id: user?.id,
        subscription_uuid: subscription.uuid,
        username: sub_username,
        password: sub_password,
      },
    });

    if (credentials) {
      const redis = new Redis(process.env.REDIS_URL || undefined);

      await redis.publish(
        "credentials_stored",
        JSON.stringify({
          user_id: user?.id,
          sub_username,
          sub_password,
          subscription_uuid,
          email: subscription.user_email,
        }),
      );
    }

    return res
      .status(201)
      .json({ message: "Credentials Stored Successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

const subscription_status = async (req, res) => {
  const { subscription: subscription_uuid } = req.params;

  try {
    const subscription = await prisma.plansOnUsers.findFirst({
      where: {
        uuid: subscription_uuid,
      },
    });

    if (!subscription) {
      return res.json({ status: false });
    }

    const credentials = await prisma.credentials.findFirst({
      where: {
        subscription_uuid: subscription.uuid,
      },
    });

    if (credentials) {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    return res.json({ status: false });
  }

  return res.json({
    status: true,
  });
};

export {
  getPlans,
  subscribe,
  trial,
  storeCredentials,
  subscription_status,
  getPlan,
  paypalCreateOrder,
  paypalCaptureOrder,
};

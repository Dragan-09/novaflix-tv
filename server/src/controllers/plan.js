require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const now = new Date();

const prisma = new PrismaClient();

const getPlans = async (req, res) => {
  try {
    let plans = await prisma.plan.findMany();
    if (!plans)
      return res.status(500).json({ Message: "Something went wrong!" });

    plans = await Promise.all(
      plans.map(async (plan) => {
        plan.stripe_price = await stripe.prices.retrieve(plan.price_id);
        return plan;
      })
    );

    return res.status(200).json({
      data: plans.map((plan) => {
        return {
          id: plan.id,
          name: plan.name,
          description: plan.description,
          price: plan.stripe_price.unit_amount / 100,
          price_description: plan.price_description,
        };
      }),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "Something went wrong!" });
  }
};

const purchase = async (req, res) => {
  const plan_id = req.params.id;

  try {
    const plan = await prisma.plan.findFirstOrThrow({
      where: { id: parseInt(plan_id) },
    });

    const user = await prisma.user.findFirstOrThrow({
      where: { id: req.user.id },
    });

    const subscriptions = await prisma.plansOnUsers.findMany({
      where: {
        user_id: user.id,
        ends_at: { gt: new Date() },
      },
      orderBy: { ends_at: "desc" },
    });

    console.log(subscriptions);

    if (subscriptions.length > 0)
      return res.status(400).json({
        message: "You already have an active subscription!",
        sub: subscriptions,
      });

    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.BACKEND_URL}/api/subscribe/${plan_id}/${user.id}?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: user.email,
      line_items: [
        {
          price: plan.price_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
    });

    return res.status(200).json({
      checkout_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something Went wrong" });
  }
};

const subscribe = async (req, res) => {
  const { plan, user } = req.params;
  const { session_id } = req.query;
  if (plan && user && session_id) {
    if (!isNaN(plan) && !isNaN(user) && typeof session_id === "string") {
      try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription
        );

        const manual_subscription = await stripe.subscriptions.update(
          session.subscription,
          {
            cancel_at_period_end: true,
          }
        );

        const subscribe = await prisma.plansOnUsers.create({
          data: {
            user_id: parseInt(user),
            plan_id: parseInt(plan),
            status: "ON_PROCESS",
            subscription_id: session.subscription,
            assigned_at: new Date(
              subscription.current_period_start * 1000
            ).toISOString(),
            ends_at: new Date(
              subscription.current_period_end * 1000
            ).toISOString(),
          },
        });
        return res.redirect(process.env.FRONTEND_URL);
        // return res
        //   .status(200)
        //   .json({ message: "Subscription done successfully!" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
      }
    }
  }
  return res.status(500).json({ message: "Something went wrong!" });
};

const trial = async (req, res) => {
  const { id: user } = req.user;
  try {
    const subscriptions = await prisma.plansOnUsers.findFirst({
      where: {
        user_id: user,
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
        user_id: user,
        type: "TRIAL",
      },
    });

    if (trial)
      return res
        .status(400)
        .json({ message: "You can not have the free trial more than once!" });

    const setTrial = await prisma.plansOnUsers.create({
      data: {
        user_id: user,
        plan_id: 2,
        status: "ON_PROCESS",
        ends_at: new Date(
          new Date().getTime() + 60 * 60 * 1000 * 24
        ).toISOString(),
        type: "TRIAL",
      },
    });

    return res.status(200).json({
      message: "Congratulations! You got the 24 hours trial. Check you email!",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { getPlans, purchase, subscribe, trial };

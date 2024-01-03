import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

const paymentIntent = async (req, res) => {
  const { plan: plan_name } = req.body;

  try {
    const plan = await prisma.plan.findFirstOrThrow({
      where: {
        name: plan_name,
      },
    });

    const price = await stripe.prices.retrieve(plan.price_id);

    const intent = await stripe.paymentIntents.create({
      currency: price.currency,
      amount: price.unit_amount,
      payment_method_types: ["card"],
      setup_future_usage: "off_session",
      metadata: {
        plan: plan.id,
      },
    });

    return res.status(201).json({
      clientSecret: intent.client_secret,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

export { paymentIntent };

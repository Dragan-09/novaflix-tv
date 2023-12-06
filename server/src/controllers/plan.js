require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

    console.log(process.env.FRONTEND_URL);
    const session = await stripe.checkout.sessions.create({
      success_url: process.env.FRONTEND_URL,
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

module.exports = { getPlans, purchase };

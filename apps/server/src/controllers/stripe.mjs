import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentIntent = async (req, res) => {
  try {
    const intent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: 1999,
      payment_method_types: ["card"],
      setup_future_usage: "off_session",
    });

    return res.status(201).json({
      clientSecret: intent.client_secret,
    });
  } catch (error) {
    console.log(error);
  }
};

export { paymentIntent };

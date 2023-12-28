import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const plans = await prisma.plan.createMany({
    data: [
      {
        name: "Basic",
        description:
          "Limited number of channels, Standard Definition (SD) streaming quality, Access to VOD content with restricted library, Single-device streaming, Email support, Limited customer service hours, Ad-supported content",
        price: 0,
        price_description: "Pay every 30 days",
        image: "basic",
        duration_days: 30,
        price_id: "price_1OKKcPDg6AgIuD6dWT5cbCBX",
      },
      {
        name: "Standard",
        description:
          "Limited number of channels, Standard Definition (SD) streaming quality, Access to VOD content with restricted library, Single-device streaming, Email support, Limited customer service hours, Ad-supported content",
        price: 0,
        price_description: "Pay every 3 months",
        image: "standard",
        duration_days: 180,
        price_id: "price_1OKKcPDg6AgIuD6ds1VeQPP2",
      },
      {
        name: "Premium",
        description:
          "Limited number of channels, Standard Definition (SD) streaming quality, Access to VOD content with restricted library, Single-device streaming, Email support, Limited customer service hours, Ad-supported content",
        price: 0,
        price_description: "Pay every 6 months",
        image: "premium",
        duration_days: 365,
        price_id: "price_1OKKcPDg6AgIuD6djN2aDekt",
      },
      {
        name: "VIP",
        description:
          "Limited number of channels, Standard Definition (SD) streaming quality, Access to VOD content with restricted library, Single-device streaming, Email support, Limited customer service hours, Ad-supported content",
        price: 0,
        price_description: "Pay every year",
        image: "premium",
        duration_days: 180,
        price_id: "price_1OSGV8Dg6AgIuD6dgcoNP8hL",
      },
    ],
  });

  const channels = await prisma.channel.createMany({
    data: [
      {
        name: "Bein Sports",
        logo: "channels/bein-sports.webp",
      },
      {
        name: "Netflix",
        logo: "channels/netflix.webp",
      },
      {
        name: "Apple Tv",
        logo: "channels/apple-tv.webp",
      },
      {
        name: "Prime Video",
        logo: "channels/prime-video.webp",
      },
      {
        name: "Hulu",
        logo: "channels/hulu.webp",
      },
      {
        name: "Formula 1",
        logo: "channels/f1.webp",
      },
    ],
  });

  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Movies",
        icon: "movies",
      },
      {
        name: "Sport",
        icon: "sport",
      },
      {
        name: "Cuisine",
        icon: "cuisine",
      },
      {
        name: "Documentary",
        icon: "documentary",
      },
      {
        name: "News",
        icon: "news",
      },
      {
        name: "Other",
        icon: "other",
      },
    ],
  });

  const features = await prisma.feature.createMany({
    data: [
      {
        name: "24/7 Support",
        icon: "support",
      },
      {
        name: "Tech Help",
        icon: "help",
      },
      {
        name: "Content Updates",
        icon: "update",
      },
      {
        name: "Secure Payments",
        icon: "payment",
      },
      {
        name: "Quality Assurance",
        icon: "quality",
      },
      {
        name: "Feedback Loop",
        icon: "feedback",
      },
    ],
  });
};

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });

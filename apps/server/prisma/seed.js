const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {
  const plans = await prisma.plan.createMany({
    data: [
      {
        name: "Basic",
        description: "publish a Single Ad, it never expires. 😀",
        price: 4.98,
        price_description: "Pay every 30 days",
        image: "basic",
        duration_days: 30,
        price_id: "price_1OKKcPDg6AgIuD6dWT5cbCBX",
      },
      {
        name: "Premium",
        description: "publish a Single Ad, it never expires. 😀",
        price: 24.98,
        price_description: "Pay every year",
        image: "premium",
        duration_days: 365,
        price_id: "price_1OKKcPDg6AgIuD6djN2aDekt",
      },
      {
        name: "Standard",
        description: "publish a Single Ad, it never expires. 😀",
        price: 14.98,
        price_description: "Pay every 6 months",
        image: "standard",
        duration_days: 180,
        price_id: "price_1OKKcPDg6AgIuD6ds1VeQPP2",
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
};

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });

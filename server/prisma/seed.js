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
        duration_days: 30,
      },
      {
        name: "Premium",
        description: "publish a Single Ad, it never expires. 😀",
        price: 24.98,
        price_description: "Pay every year",
        duration_days: 365,
      },
      {
        name: "Standard",
        description: "publish a Single Ad, it never expires. 😀",
        price: 14.98,
        price_description: "Pay every 6 months",
        duration_days: 180,
      },
    ],
  });

  // const channels = await prisma.channel.createMany({
  //   data: [
  //     {
  //       name: "Bein Sports",
  //       logo: "channels/bein-sports.png",
  //     },
  //     {
  //       name: "Netflix",
  //       logo: "channels/netflix.png",
  //     },
  //     {
  //       name: "Apple Tv",
  //       logo: "channels/appple-tv.png",
  //     },
  //     {
  //       name: "Prime Video",
  //       logo: "channels/prime-video.png",
  //     },
  //     {
  //       name: "Hulu",
  //       logo: "channels/hulu.png",
  //     },
  //     {
  //       name: "Formula 1",
  //       logo: "channels/formula-1.png",
  //     },
  //   ],
  // });

  // const categories = await prisma.category.createMany({
  //   data: [
  //     {
  //       name: "Movies",
  //     },
  //     {
  //       name: "Sport",
  //     },
  //     {
  //       name: "Cuisine",
  //     },
  //     {
  //       name: "Documentary",
  //     },
  //     {
  //       name: "News",
  //     },
  //     {
  //       name: "Other",
  //     },
  //   ],
  // });
};

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });

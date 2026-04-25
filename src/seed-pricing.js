const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const prices = [
    { type: "mahasiswa", price: 50 },
    { type: "alumni", price: 100 },
    { type: "tamu", price: 150 },
  ];

  for (const p of prices) {
    await prisma.pricing.upsert({
      where: { type: p.type },
      update: { price: p.price },
      create: { type: p.type, price: p.price },
    });
  }

  console.log("Pricing seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

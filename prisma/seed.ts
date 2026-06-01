import { PrismaClient } from "@prisma/client";
import { products } from "../lib/product";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Get unique categories from dummy data
  const categoryNames = Array.from(new Set(products.map((p) => p.category)));

  // Upsert categories
  const categoryMap: Record<string, string> = {};
  for (const name of categoryNames) {
    let cat = await prisma.category.findFirst({ where: { name } });
    if (!cat) {
      cat = await prisma.category.create({ data: { name } });
    }
    categoryMap[name] = cat.id;
  }

  console.log(`Ensured ${categoryNames.length} categories exist.`);

  // Insert products
  for (const prod of products) {
    const categoryId = categoryMap[prod.category];
    
    // check if exists
    const existing = await prisma.product.findFirst({
      where: { name: prod.name },
    });

    if (!existing) {
      await prisma.product.create({
        data: {
          name: prod.name,
          brand: prod.brand,
          description: "รายละเอียดสินค้า " + prod.name,
          price: prod.price,
          originalPrice: prod.originalPrice,
          rating: prod.rating,
          reviews: prod.reviews,
          images: [prod.image],
          badges: prod.badges,
          categoryId,
          inStock: prod.inStock,
        },
      });
      console.log(`Created product: ${prod.name}`);
    } else {
      console.log(`Product already exists: ${prod.name}`);
    }
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

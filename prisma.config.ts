import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const DIRECT_URL =
  process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: DIRECT_URL,
  },
  migrate: {
    async adapter() {
      const pool = new Pool({ connectionString: DIRECT_URL });
      return new PrismaPg(pool);
    },
  },
});

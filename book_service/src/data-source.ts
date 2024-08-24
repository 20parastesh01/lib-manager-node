import "reflect-metadata";
import dotenv from "dotenv-flow";
dotenv.config({ path: process.cwd() });
import { DataSource } from "typeorm";
import { BookEntity } from "./persist-layer/entities/book.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
  entities: [BookEntity],
  migrations: ["./src/migrations/*.ts"],
  synchronize: true,
});

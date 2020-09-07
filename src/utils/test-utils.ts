import "reflect-metadata";
import { createConnection } from "typeorm";

export async function createTestingConnection() {
  try {
    await createConnection();
  } catch (err) {
    console.log("TypeORM connection error: " + err);
  }
}

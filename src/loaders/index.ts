import expressLoader from "./express";
import dependencyInjectorLoder from "./dependencyInjector";
import databaseLoader from "./database";
import Logger from "./logger";

export default async ({ expressApp }) => {
  await databaseLoader.create();
  Logger.info("✅ DB loaded and connected!");

  await dependencyInjectorLoder();
  Logger.info("✅ Dependency Injector loaded.");

  await expressLoader({ app: expressApp });
  Logger.info("✅ Express loaded.");
};

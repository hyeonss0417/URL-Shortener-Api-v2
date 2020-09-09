import Logger from "./logger";
import Container from "typedi";

export default () => {
  try {
    Container.set("logger", Logger);
  } catch (e) {
    Logger.error("🔥 Error on dependency injector loader: %o", e);
    throw e;
  }
};

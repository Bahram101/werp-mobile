import "dotenv/config";
import appJson from "./app.json";

export default {
  ...appJson,
  expo: {
    ...appJson.expo,
    extra: {
      ...appJson.expo.extra,
      SERVER_URL: process.env.EXPO_PUBLIC_SERVER,
    },
  },
};

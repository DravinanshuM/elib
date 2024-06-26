import app from "./src/app";

// import config file.
import { config } from "./src/config/config";

// import Database connection file.
import connectionDB from "./src/config/db";

const startServer = async () => {

  await connectionDB();

  const port = config.port || 5013;

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();

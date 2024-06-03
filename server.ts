import app from "./src/app";

// import config file.
import { config } from "./src/config/config";


const startServer = async () => {

  const port = config.port || 5000;

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();

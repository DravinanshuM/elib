import app from "./src/app";

const startServer = async () => {

  const port = process.env.port || 5000;

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();

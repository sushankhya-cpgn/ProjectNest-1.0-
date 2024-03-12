const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const { default: mongoose } = require("mongoose");

const httpSever = http.createServer(app);
const io = new Server(httpSever, {
  cors: true,
});

io.on("connection", (socket) => {
  console.log(socket);
});

const mongoURI =
  process.env.NODE_ENV === "development"
    ? process.env.MONGODB_LOCAL_URI
    : process.env.MONGODB_CLOUD_URI.replace(
        "<password>",
        process.env.MONGODB_CLOUD_PASSWORD
      );

const mongoLocalURI = process.env.MONGODB_LOCAL_URI;
const mongoCloudURI = process.env.MONGODB_CLOUD_URI.replace(
  "<password>",
  process.env.MONGODB_CLOUD_PASSWORD
);
mongoose
  .connect(mongoURI)
  .then((conInstance) => {
    console.log(
      `connected to the database..., DB Hosted By: ${conInstance.connection.host}`
    );
  })
  .catch((err) => {
    console.log("database connection faled...", err);
  });

const PORT = process.env.PORT || 3000;

httpSever.listen(PORT, () => {
  console.log(
    `${process.env.NODE_ENV.toUpperCase()}: Listening on port ${PORT}...`
  );
});

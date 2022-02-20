const http = require("http");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const MONGO_URL =
  "mongodb+srv://tarunp:ErppJKpNgYy5YjBb@cluster0.lsfg4.mongodb.net/nasa?retryWrites=true&w=majority";
const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const server = http.createServer(app);

mongoose.connection.once('open', () => console.log('Mongo DB Connection ready'))

mongoose.connection.on('error', (err) => console.error(err))

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  server.listen(PORT, () => console.log(`Listening on PORT : ${PORT}`));
}

startServer();

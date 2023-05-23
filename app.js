const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var path = require ("path");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoconnection = require("./config/mongoconnection.json");
const {addPartieSocket} = require ("./Controller/JoueurController")
const server = http.createServer(app);
const io = require ("socket.io")(server);
mongoose.connect(mongoconnection.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection eroor :"));
db.once("open", function () {
  console.log("base de données connectée avec succès!!");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/jeux.html");
});
const UserRouter = require("./routes/joueur");
app.use("/user", UserRouter);


io.on("connection", (socket) => {
  console.log("User connected");

 

socket.on("jeux", (data) => {
  console.log("Received data:", data);
  if (data ) {
    addPartieSocket(data);
    io.emit("jeux", data);
  }
  
});

socket.on("afficherstat", (data) => {
  console.log("Received data:", data);
  if (data ) {
    io.emit("afficherstat", data);
  }
  
  });

  



});




  



server.listen(3030, () => console.log("server is run in port 3030 "));
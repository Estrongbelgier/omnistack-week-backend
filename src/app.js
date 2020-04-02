const express = require("express");
const routes = require("./routes");
const { errors } = require("celebrate");
const cors = require("cors");

const app = express();

app.use(cors()); // CORS segurança
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;

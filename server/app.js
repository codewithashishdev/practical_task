const express = require("express")
const bodyParser = require("body-parser");
const path = require("path"); 
const cors = require("cors");
const contact = require("./configs/constant");

const app = express();

const port = contact.PORT || 3000 ;

const route = require("./module/v1/index");
const models = require("./module/v1/models/index");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/",route);

models.sequelize.options.logging = false;

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
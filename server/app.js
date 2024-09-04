const express = require("express")
const bodyParser = require("body-parser");
const path = require("path"); 
const cors = require("cors");
const session = require('express-session');
const fileUpload = require('express-fileupload');


const app = express();

const constant = require("./configs/constant");
const port = constant.PORT || 3000 ;

const route = require("./module/v1/index");
const models = require("./module/v1/models/index");

app.use(cors());
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: constant.SECRETE,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use("/api/v1/",route);

models.sequelize.options.logging = false;

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
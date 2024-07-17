const express = require("express");
const bodyParser = require("body-parser");
const user = require("./modules/user/user.router");
const product = require("./modules/product/product.router");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

app.use("/user", user);
app.use("/product", product);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./modules/user/userRouter')
const productRouter = require('./modules/product/productRouter')
const app = express();
app.use(bodyParser.json()); 
const port = 3000;

app.use('/api', userRouter, productRouter);
// app.use('/api', productRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${port}`);
  console.log("new date: ",new Date())
});
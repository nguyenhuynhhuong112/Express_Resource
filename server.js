const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./modules/user/userRouter')

const app = express();
app.use(bodyParser.json()); 
const port = 3000;

app.use('/api', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${port}`);
  console.log("new date: ",new Date())
});
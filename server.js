const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/blog-platform', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

const postRouter = require('./routers/postRouter');
app.use('/api/posts', postRouter);

const userRouter = require('./routers/userRouter');
app.use('/api/users', userRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
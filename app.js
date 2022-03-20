const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');

const app = express();

//Connect DB
mongoose
  .connect('mongodb://localhost/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB Connected Successfuly');
  });

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public')); //static dosyaları

//ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});

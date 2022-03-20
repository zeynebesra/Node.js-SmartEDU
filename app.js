const express = require('express');
const pageRoute = require('./routes/pageRoute');

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public')); //static dosyaları

//ROUTES
app.use('/', pageRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});

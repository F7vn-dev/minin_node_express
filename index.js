const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();

app.get('/', (req, res) => {
   res.render('index'); 
});

app.get('/about', (req, res) => {
    res.render('about');
 });


// conf hbs for express
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
// регистрация движка
app.engine('hbs', hbs.engine)
// добавление движка
app.set('view engine', 'hbs')
// регистрация папки под страницы
app.set('views', 'views');
// Конфигурация статичной ссылки
app.use(express.static("public"))

 // configurate PORT 
const PORT = process.env.PORT || 3000;



app.listen(3000 , () => {
    console.log(`Server is running on port: ${PORT}`)
})
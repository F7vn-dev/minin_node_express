const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const coursesRoutes = require('./routes/courses');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');

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
app.use(express.static(path.join(__dirname, "public")))

 // configurate PORT 
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));

app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/addcourse', addRoutes);
app.use('/card', cardRoutes);
app.listen(3000 , () => {
    console.log(`Server is running on port: ${PORT}`)
})
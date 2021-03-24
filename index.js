const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const app = express();
const coursesRoutes = require('./routes/courses');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// conf hbs for express
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
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

// const pass = ubVdJVnIDVVyCdps
// mongodb+srv://f7vn:ubVdJVnIDVVyCdps@cluster0.ab8ao.mongodb.net/shop

app.use(express.urlencoded({extended:true}));

app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/addcourse', addRoutes);
app.use('/card', cardRoutes);

async function start() {
    try {
        const url = "mongodb+srv://f7vn:ubVdJVnIDVVyCdps@cluster0.ab8ao.mongodb.net/shop";
        await mongoose.connect(url, {useNewUrlParser: true, useFindAndModify: false});
        app.listen(PORT , () => {
        console.log(`Server is running on port: ${PORT}`)
    })
    } catch(err) {
        console.log(err)
    }
}

start();
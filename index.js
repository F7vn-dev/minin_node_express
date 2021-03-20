const { request } = require('express');
const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
   res.status(200);
   res.sendFile(path.join(__dirname, 'views', 'index.html')); 
});

app.get('/about', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, 'views', 'about.html')); 
 });

const PORT = process.env.PORT || 3000;

app.listen(3000 , () => {
    console.log(`Server is running on port: ${PORT}`)
})
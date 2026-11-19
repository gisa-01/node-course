const express = require('express');
// Setup an express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

app.listen(3000);

const blogs =[
{title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
{title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
{title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
];
app.get('/', (req, res) =>{
  res.render('index', { title:'Home', blogs });
});

app.get('/about', (req, res) =>{
  res.render('about', { title:'About' });
});

app.get('/blogs/create', (req, res) =>{
  res.render('create', { title:'Create a new Blog' });
});

// 404
app.use((req, res) => {
  res.status(404).render('404', { title:'404' });
});
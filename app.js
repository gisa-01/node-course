const express = require('express');
// Setup an express app
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


// Connecting to the dabase
const dbURI = 'mongodb+srv://gisa_1:test1234@nodetuts.kbhsnv8.mongodb.net/';
mongoose.connect(dbURI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// Register view engine
app.set('view engine', 'ejs');

// Middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));


const blogs =[
{title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
{title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
{title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
];
app.get('/', (req, res) =>{
  res.redirect('/blogs');
});
app.get('/about', (req, res) =>{
  res.render('about', { title:'About' });
});

// blog routes
app.get('/blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.render('index', { title: 'All blogs', blogs: result })
    })
    .catch((err) => console.log(err));
});

app.get('/blogs/create', (req, res) =>{
  res.render('create', { title:'Create a new Blog' });
});

// 404
app.use((req, res) => {
  res.status(404).render('404', { title:'404' });
});
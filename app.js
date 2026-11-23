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

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title:'New blog 2',
    snippet: "About my new blog",
    body: 'More about my blog'
  });
  blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

// Retrieve data from database
app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

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
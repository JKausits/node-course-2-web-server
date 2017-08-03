const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/partials')

// HELPERS
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
})

app.set('view engine', 'hbs');

// MIDDLEWARE
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFileSync('server.log', log + "\n");
  console.log(log);
  next();
});

app.use(express.static(__dirname + '/public'));

// ROUTES
app.get('/', (req, res)=>{
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the jungle'
  });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'You fucking idot'
  })
});

app.get('/portfolio', (req, res)=>{
  res.render('portfolio.hbs',{
    pageTitle: 'portfolio Page'
  });
})

// Starting server
app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
}
);

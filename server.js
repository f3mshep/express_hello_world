const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
const app = express();
CONSTRUCTION = false
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log)
  fs.appendFile('server.log', log + "\n", (err)=> {
    if (err){
      console.log('Could not write to server log.');
    };
  });
  next();
});

app.use((req, res, next) => {
  if (CONSTRUCTION) res.render("repair.hbs")
  else next()
});

hbs.registerHelper('getCurrentYear', ()=> new Date().getFullYear());
hbs.registerHelper('screamIt', (text)=> text.toUpperCase());

app.get('/', (req, res)=> {
  res.render("page_template.hbs", {
    pageTitle: "About Page",
    currentYear: new Date().getFullYear(),
    pageText: 'Welcome to the best website ever!'
  });
});

app.get('/about', (req, res) => {
  res.render("page_template.hbs", {
    pageTitle: "About Page",
    pageText: "Oh my gosh, all about me!"
  });
});

app.get('/bad', (req, res)=> {
  res.send({
    Error: 'Resource not found'
  });
});

app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
});
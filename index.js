const express = require('express');
const request = require('request');
const hbs = require("hbs");
const path = require('path');
const PORT = process.env.PORT || 5000
const app = express();

const weatherData = require('./utils/weatherData');

const publicStaticDirPath = path.join(__dirname, '/public')

const viewsPath = path.join(__dirname, '/templates/views');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicStaticDirPath));



app.get('/', (req, res) => {
  res.render('index')
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  if(!address) {
      return res.send({
          error: "You must enter address in search text box"
      })
  }

  weatherData(address, (error, {temperature, description, cityName, country} = {}) => {
      if(error) {
          return res.send({
              error:`Unable to find ${req.query.address}`
          })
      }
      res.send({
          temperature,
          description,
          cityName,
          country
      })
  })
});

app.get("*", (req, res) => {
  res.render('404', {
      title: "page not found"
  })
})



app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`))
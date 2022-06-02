const express = require("express");
const { json } = require("express/lib/response");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
const apiKey = "05176d66be6d89bba83a99d19fe54986";
const query = req.body.city;
const unit = "metric";
const endPoint = "https://api.openweathermap.org/data/2.5/weather?"
const url = endPoint+"q="+query+"&units="+unit+"&appid=" +apiKey +"";
https.get(url, (response) => {
    response.on("data", (data) => {
        console.log("hello");
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp;
        const cityName = weatherData.name;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<h1>" + cityName + ": " + temperature + " degrees celsius</h1>");
        res.write("<p>Weather description: " + description + "</p>");
        res.write("<p><img src= " + imageURL + "></p>");
        res.send();
    })
});
})

app.listen(3000, () => {
    console.log("The server is running on port 3000");
})

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    
res.sendFile(__dirname + "/index.html")
    
});

app.post("/", function(req,res){

    

    const query = req.body.cityName;
    const apiKey = "286f8a11607d53d1ae8fa62877da3e55"
    const unit = "metric"
    https.get("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit , function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
          const weatherData =   JSON.parse(data)
          const temp = weatherData.main.temp
          const icon = weatherData.weather[0].icon
          const imageURL =  "http://openweathermap.org/img/wn/" + icon +"@2x.png"
         
         res.write("<h1>The Tempreture in " + query + " is " + temp + " degree</h1>")
         res.write("<img src=" + imageURL + ">")
          res.send();


        })
    } )
    
})



app.listen(3000, function(){
    console.log("Server is runiing successfully")
})
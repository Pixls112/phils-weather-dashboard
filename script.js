
var currentWeather = {
    apiKey: "ef5497b9b307f7a9448899e347ab834b",
    getWeather: function (name) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+ name +"&appid="+ this.apiKey +"&units=imperial")
            .then((response) => response.json())
            .then((data) => this.weatherDisplay(data));
    },

    weatherDisplay: function(data) {
        var i = 0
        var { name } = data
        var { country } = data.sys
        var { temp, humidity} = data.main
        var { speed } = data.wind
        var { icon } = data.weather[i]
        document.querySelector(".currentCity").innerText= name + ", " + country
        document.querySelector(".temp").innerText= temp + " F°"
        document.querySelector(".humidity").innerText= humidity + "%"
        document.querySelector(".wind").innerText= speed + " MPH"
        document.querySelector(".weatherIcon").src = "https://openweathermap.org/img/w/"+ icon +".png"
    },
    find: function() {
     this.getWeather(document.querySelector(".weatherSearch").value)
     this.getForecast(document.querySelector(".weatherSearch").value)
    },

    getForecast: function(name) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ name +"&appid=" + this.apiKey +"&units=imperial")
        .then((response) => response.json())
        .then((data) => this.forecastDisplay(data));
    },

    forecastDisplay: function(data) {
            for (let i = 0; i < data.list.length; i+=8){
                
                var { temp, humidity} = data.list[i].main
                var { speed } = data.list[i].wind
                var { icon } = data.list[i].weather[0]
                var forecastDate = data.list[i+1].dt
                var weekDay = new Date(forecastDate*1000)
                console.log(temp,speed,humidity,icon,forecastDate)

                 var foreCastEl=document.createElement("div")
                 foreCastEl.innerHTML=`
                 <h4> ${weekDay} </h4>
                 <p>Temperature: ${temp} </p>
                 <p>Wind: ${speed}</p>
                 <img src= ${"https://openweathermap.org/img/w/"+ icon +".png"}> 
                 <p>Humidity: ${humidity}</p>
                 `
                 $(".upcomingForecast").append(foreCastEl)
            }
        }
}  

document.querySelector(".submitBtn").addEventListener("click", function(){
  currentWeather.find();
}) 


function displayDate() {
    var currentTime = document.querySelector(".currentDate")
    var rightNow = dayjs().format('dddd, MMM DD, YYYY');
    currentTime.innerText = rightNow;
    
}

displayDate()


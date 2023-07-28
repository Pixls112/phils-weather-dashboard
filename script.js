//This is the main variable that contains all the functions that we can call in console to test if the code works.
var currentWeather = {
    //This is used to replace the api key in the api link to easily reference it when using fetch("api link")
    apiKey: "ef5497b9b307f7a9448899e347ab834b",
    //this function pulls data from the api and can be displayed in console using console.log to test if data is pulled through successfully
    getWeather: function (name) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+ name +"&appid="+ this.apiKey +"&units=imperial")
            .then((response) => response.json())
            .then((data) => this.weatherDisplay(data));
    },
    //this function is used to display the current weather information for today in the html for the user to see.
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
    //this is used to grab the values of the functions called within it to display when the find function is called upon
    find: function() {
     this.getWeather(document.querySelector(".weatherSearch").value)
     this.getForecast(document.querySelector(".weatherSearch").value)
    },
    //Similar to the getWeather function this is used to see if the data is able to be pulled from the api link. It also allows me to test in console whether the information is displayed 
    getForecast: function(name) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ name +"&appid=" + this.apiKey +"&units=imperial")
        .then((response) => response.json())
        .then((data) => this.forecastDisplay(data));
    },
    //Similar to the weatherDisplay, this is used to display the upcoming days weather information in the next 5 days
    forecastDisplay: function(data) {
            for (let i = 1; i < data.list.length; i+=8){
                
                var { temp, humidity} = data.list[i].main
                var { speed } = data.list[i].wind
                var { icon } = data.list[i].weather[0]
                var forecastDate = data.list[i+1].dt
                var weekDay = new Date(forecastDate*1000).toDateString()
                console.log(temp,speed,humidity,icon,forecastDate)

                 var foreCastEl=document.createElement("section")
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
//this adds and event listener to the button referenced on the html page so that when the button is clicked it will take the value inputted and apply it into the functions getWeather and GetForecast
document.querySelector(".submitBtn").addEventListener("click", function(){
  currentWeather.find();
}) 

// this is a simple fuction that displays the current date 
function displayDate() {
    var currentTime = document.querySelector(".currentDate")
    var rightNow = dayjs().format('dddd, MMM DD, YYYY');
    currentTime.innerText = rightNow;
    
}
//this calls on the function onto the page to allow it to show on the html
displayDate()


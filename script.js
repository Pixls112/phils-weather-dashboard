
var currentWeather = {
    apiKey: "ef5497b9b307f7a9448899e347ab834b",
    getWeather: function (name) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+ name +"&appid="+ this.apiKey +"&units=imperial")
            .then((response) => response.json())
            .then((data) => this.weatherDisplay(data));
    },

    weatherDisplay: function(data) {
        var { name } = data
        var { country } = data.sys
        var { temp, humidity} = data.main
        var { speed } = data.wind
        console.log(name, country)
        document.querySelector(".currentCity").innerText= name + ", " + country
        document.querySelector(".temp").innerText= temp + " F°"
        document.querySelector(".humidity").innerText= humidity + "%"
        document.querySelector(".wind").innerText= speed + " MPH"
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
        for (var i = 0; i < 5; i++){
            foreCast=`<div>
                <div>
                    <p>Temp: ` + data.list[i].main.temp + `</p>
                    <p>Wind: ` + data.list[i].wind.speed + `</p>
                    <p>Humidity: ` + data.list[i].main.humidity + `</p>
                </div>
            </div>
            `;

            $(".upcomingForecast").append(foreCast);
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



let search = document.querySelector('.button');

search.addEventListener('click', retrieveData);

// function retrieving user geo location
const successfulLookup = function(userPosition) {
    const { latitude, longitude } = userPosition.coords;

    (async () => {
    const key = '0c7d1ecac421446596b54095e7910502';
    const fetchData = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&language=ro&key=${key}`);
    const getData = await fetchData.json();
        console.log(getData);
    
        let address = getData.results[0].components.city 
                    + ' - ' + getData.results[0].components.country 
                    + ', ' + getData.results[0].components.continent;
        
        let createDate = new Date();
               
        let weekday = new Array(7);
        weekday[0] = "Duminică";
        weekday[1] = "Luni";
        weekday[2] = "Marţi";
        weekday[3] = "Miercuri";
        weekday[4] = "Joi";
        weekday[5] = "Vineri";
        weekday[6] = "Sâmbătă";

        let month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        function addZero(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
        }

        let day = createDate.getDate();
        let hour = addZero(createDate.getHours());
        let minute = addZero(createDate.getMinutes());
        let actualweekDay = weekday[createDate.getDay()];
        let actualMonth = month[createDate.getMonth()];
        let year = createDate.getFullYear();

        let currentLocation = document.querySelector('#location');
        let userDate = document.querySelector('#user_actualDate');
        let userHour = document.querySelector('#user_hour');

        currentLocation.innerText = address;
        userDate.innerText = actualMonth + ' ' + '/' + ' ' + day + ' ' + '/' + ' ' + year;
        userHour.innerText = hour + ':' + minute + ' - ' + actualweekDay;

    })();
}

window.navigator.geolocation
.getCurrentPosition(successfulLookup);

let searchedCity = document.querySelector('.search');
let tempElement = document.querySelector('.temp');
let printWeatherDescription = document.querySelector('#description');
let city = document.querySelector('#city_name'); // city inside right div
let countryDisplay = document.querySelector('#country'); // country code inside right div
let hourRight = document.querySelector('.hour'); // hour inside right div

function whiteColor() {
    tempElement.style.color = 'rgba(255, 255, 255, 0.8)';
    city.style.color = 'rgba(255, 255, 255, 0.8)';
    printWeatherDescription.style.color = 'rgba(255, 255, 255, 0.8)';
    countryDisplay.style.color = 'rgba(255, 255, 255, 0.8)';  
    hourRight.style.color = 'rgba(255, 255, 255, 0.8)';
    searchedCity.value = '';
}

function blackColor() {
    tempElement.style.color = 'rgba(0, 0, 0, 0.8)';
    city.style.color = 'rgb(0, 0, 0)';
    printWeatherDescription.style.color = 'rgb(0, 0, 0)';
    countryDisplay.style.color = 'rgb(0, 0, 0)';
    hourRight.style.color = 'rgb(0, 0, 0)';
    searchedCity.value = '';
}

// convert date format to weekday
function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();    
    return isNaN(dayOfWeek) ? null : 
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

let printLocalTime = document.querySelector('#local_time');
//let printTimeZone_min = document.querySelector('#tz_min');
let currentDayInfo = document.querySelector('#currentDay');

async function retrieveData() {

    // 1st API call - Live Weather
    const LiveWeatherKey = 'f6e61e7cdc296a7f1a802ec984f54f2b';
    let currentWeatherData = await fetch(`http://api.weatherstack.com/current?access_key=${LiveWeatherKey}&query=${searchedCity.value}`);
    const currentWeatherRes = await currentWeatherData.json();
    console.log(currentWeatherRes);

    // 2nd API call - 3 Days Weather Forecast
    const forecastKey = '8006b9c4988d70b96d8fb158740d2f9a';
    let forecastData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity.value}&units=metric&appid=${forecastKey}`);
    const forecastRes = await forecastData.json();
    console.log(forecastRes);


    // Live Weather Data retrieved from 1st API
    /////////////////////////////////////////////////////////////////////////
    let {location: {country, name, localtime} } = currentWeatherRes;
    let {current: {temperature} } = currentWeatherRes;
    let {current:{ weather_descriptions} } = currentWeatherRes; 
    ///////////////////////////////////////////////////////////////////////////


     // delay displaying the current day, countryCode & Clock on the screen;
     setTimeout(function(){
        currentDayInfo.innerText = getDayOfWeek(localtime);
        gsap.fromTo('#country', { opacity: 0, stagger: 0.2 }, { opacity: 1, stagger: 0.2, duration: .6 });
        countryDisplay.textContent = country;
        printLocalTime.innerText = localtime.substring(11, 16);
    }, 200);


   // console.log(fetchedCityName.length)
        if (name.length >= 9) {
            gsap.fromTo('#city_name', { opacity: 0, stagger: 0.2 }, { opacity: 1, stagger: 0.2, duration: .6 });
            city.innerText = name;
            city.style.fontSize = 'x-large';
        } else {
            city.innerText = name;
            gsap.fromTo('#city_name', { opacity: 0, stagger: 0.2 }, { opacity: 1, stagger: 0.2, duration: .6 });
        }


    let tempMainSection = document.querySelector('#temp'); // temperature inside right div
    let CurrentTempInfoSection = document.querySelector('#currentTemp'); // temperature under icon (info section)
    tempMainSection.innerText = temperature + ' °C';
    CurrentTempInfoSection.innerText = temperature + ' °C';

        // select days (HTML) elements needed to color according to Light / Dark mode
        let forecastDay1Info = document.getElementById('first_day');
        let forecastDay2Info = document.getElementById('second_day');
        let forecastDay3Info = document.getElementById('third_day');
        let forecastTemp1 = document.getElementById('forecast_temp1');
        let forecastTemp2 = document.getElementById('forecast_temp2');
        let forecastTemp3 = document.getElementById('forecast_temp3');
        let forecast_Txt = document.querySelector('.daysForecast');


        // Forecast Data retrieved from 2nd API
        ///////////////////////////////////////////////////////
        let FetchforecastTempDay1 = forecastRes.list[8].main.temp;
        let FetchforecastTempDay2 = forecastRes.list[16].main.temp;
        let FetchforecastTempDay3 = forecastRes.list[24].main.temp;

        let forecastWeekDay1 = forecastRes.list[8].dt_txt;
        let forecastWeekDay2 = forecastRes.list[16].dt_txt;
        let forecastWeekDay3 = forecastRes.list[24].dt_txt;
         ///////////////////////////////////////////////////////


    function RoundNum(number) { // taking care of rounding temperature value to nearest whole number.
        let temp = Number(number);
        let round = Math.round(temp);
        return round;
    }

    function addForecastNight() { 
        forecastDay1Info.innerText = getDayOfWeek(forecastWeekDay1);
        forecastDay2Info.innerText = getDayOfWeek(forecastWeekDay2);
        forecastDay3Info.innerText = getDayOfWeek(forecastWeekDay3);
        forecastDay1Info.style.color = 'white';
        forecastDay2Info.style.color = 'white';
        forecastDay3Info.style.color = 'white';
        // -------------------------------------------------------------- //
        forecast_Txt.style.color = 'rgb(255, 255, 255)';
        // -------------------------------------------------------------- //
        forecastTemp1.innerText = RoundNum(FetchforecastTempDay1) + ' °C';
        forecastTemp1.style.color = 'rgb(255, 255, 255)';
        // -------------------------------------------------------------- //
        forecastTemp2.innerText = RoundNum(FetchforecastTempDay2) + ' °C';
        forecastTemp2.style.color = 'rgb(255, 255, 255)';
        // -------------------------------------------------------------- //
        forecastTemp3.innerText = RoundNum(FetchforecastTempDay3) + ' °C';
        forecastTemp3.style.color = 'rgb(255, 255, 255)';
        // -------------------------------------------------------------- //
        printWeatherDescription.innerText = weather_descriptions;
    }

    function addForecastDay() {
        gsap.fromTo(".infos", {opacity: 0}, {duration: 7, backgroundColor: 'rgba(255, 255, 255, 0.4)', opacity: 1});
        forecastDay1Info.innerText = getDayOfWeek(forecastWeekDay1);
        forecastDay2Info.innerText = getDayOfWeek(forecastWeekDay2);
        forecastDay3Info.innerText = getDayOfWeek(forecastWeekDay3);
        forecastDay1Info.style.color = 'black';
        forecastDay2Info.style.color = 'black';
        forecastDay3Info.style.color = 'black';
        // -------------------------------------------------------------- //
        forecast_Txt.style.color = 'black';
        // -------------------------------------------------------------- //
        forecastTemp1.innerText = RoundNum(FetchforecastTempDay1) + ' °C';
        forecastTemp1.style.color = 'black';
        // -------------------------------------------------------------- //
        forecastTemp2.innerText = RoundNum(FetchforecastTempDay2) + ' °C';
        forecastTemp2.style.color = 'black';
        // -------------------------------------------------------------- //
        forecastTemp3.innerText = RoundNum(FetchforecastTempDay3) + ' °C';
        forecastTemp3.style.color = 'black';
        // -------------------------------------------------------------- //
        printWeatherDescription.innerText = weather_descriptions;
    }

    let img = document.querySelector('img'); // select weather icon and manipulate below
    let checkTime = localtime.substring(11, 13);

        if (checkTime >= 22 || checkTime <= 6) {
            let weatherContainer = document.querySelector('.container');
            weatherContainer.classList.remove("startApp");
            gsap.fromTo(".weather", {opacity: 0}, {duration: 8, backgroundImage: 'url(weather/night.PNG)', opacity: 1});
            gsap.fromTo(".infos", {opacity: 0}, {duration: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: 1});
            img.removeAttribute('class');
            img.removeAttribute('alt');
                Object.assign(img, {
                className: 'moon',
                src: 'icons/night.png',
                alt: 'moon'
                })
            gsap.fromTo('.moon', {y: 5}, {duration: 3, y: -10});
            whiteColor();
            addForecastNight();
        } else {
            checkWeatherState();
            addForecastDay();
        }
        
        function checkWeatherState() {
            let weatherContainer = document.querySelector('.container');
            weatherContainer.classList.remove("startApp");

            if (weather_descriptions == 'Cloudy' || weather_descriptions == 'Partly cloudy' 
            || weather_descriptions == 'Overcast' || weather_descriptions == 'Patchy rain possible' 
            || weather_descriptions == 'Patchy rain possible') {
                gsap.fromTo(".weather", {opacity: 0}, {duration: 7, backgroundImage: 'url(weather/cloudy.jpg)', opacity: 1});
                img.removeAttribute('class');
                    Object.assign(img, {
                        className: 'clear_clouds',
                        src: 'icons/clear_clouds.png'
                    });
                gsap.fromTo('.clear_clouds', {y: 5}, {duration: 3, y: -10});
                blackColor();
            }

            if (weather_descriptions == 'Clear' || weather_descriptions == 'Sunny' ) {
                gsap.fromTo(".weather", {opacity: 0}, {duration: 7, backgroundImage: 'url(weather/clouds.PNG)', opacity: 1});
                img.removeAttribute('class');
                    Object.assign(img, {
                        className: 'sun',
                        src: 'icons/sun.png'
                    });
                blackColor();
                gsap.fromTo('.sun', {y: 5}, {duration: 3, y: -20});
            }

            if (weather_descriptions == 'Snow' || weather_descriptions == 'Blizzard' 
            || weather_descriptions == 'Light Snow, Mist' || weather_descriptions == 'Light snow'
            || weather_descriptions == 'Moderate snow' || weather_descriptions == 'Blowing snow'
            || weather_descriptions == 'Patchy sleet possible' || weather_descriptions == 'Light Snow, Mist, Snow') {
                gsap.fromTo(".weather", {opacity: 0}, {duration: 7, backgroundImage: 'url(weather/snowing.PNG)', opacity: 1});   
                img.removeAttribute('class');
                    Object.assign(img, {
                        className: 'snow',
                        src: 'icons/snow.png'
                    })
                gsap.fromTo('.snow', {y: 5}, {duration: 3, y: -20});
                blackColor();
            }

            if (weather_descriptions == 'Rain' || weather_descriptions == 'Patchy light drizzle' 
            || weather_descriptions == 'Light Rain' || weather_descriptions == 'Moderate or heavy rain shower' 
            || weather_descriptions == 'Moderate rain at times' || weather_descriptions == 'Moderate rain'
            || weather_descriptions == 'Patchy light rain' || weather_descriptions == 'Light freezing rain' 
            || weather_descriptions == 'Heavy rain at times' || weather_descriptions == 'Heavy rain' 
            || weather_descriptions == 'Light drizzle' || weather_descriptions == 'Freezing drizzle' 
            || weather_descriptions == 'Heavy freezing drizzle') {
                gsap.fromTo(".weather", {opacity: 0}, {duration: 7, backgroundImage: 'url(weather/rain.PNG)', opacity: 1});
                img.removeAttribute('class');
                    Object.assign(img, {
                        className: 'rain',
                        src: 'icons/rain.png'
                    })
                gsap.fromTo('.rain', {y: 5}, {duration: 3, y: -20});
                whiteColor();
            }

            if(weather_descriptions == 'Thunderstorm' || weather_descriptions == 'Light Rain With Thunderstorm'
            || weather_descriptions == 'Thundery outbreaks possible') {
                gsap.fromTo(".weather", {opacity: 0}, {duration: 7, backgroundImage: 'url(weather/thunder.PNG)', opacity: 1});
                img.removeAttribute('class');
                    Object.assign(img, {
                        className: 'thunder',
                        src: 'icons/thunder.png'
                    })
                
                gsap.fromTo('.thunder', {y: 5}, {duration: 3, y: -20});
                whiteColor();
            }

            if(weather_descriptions == 'Mist' || weather_descriptions == 'Haze' || weather_descriptions == 'Fog'
            || weather_descriptions == 'Freezing fog') {
                gsap.fromTo(".weather", {opacity: 0}, {duration: 7, backgroundImage: 'url(weather/fog.PNG)', opacity: 1});
                img.removeAttribute('class');
                    Object.assign(img, {
                        className: 'fog',
                        src: 'icons/fog.png'
                    })
                
                gsap.fromTo('.fog', {y: 5}, {duration: 3, y: -20});
                whiteColor();
            }
        }
}

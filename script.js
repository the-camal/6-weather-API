const app = {
    init: () => {
      document
        .getElementById('btnGet')
        .addEventListener('click', app.fetchWeather);
      document
        .getElementById('btnCurrent')
        .addEventListener('click', app.getLocation);
    },
    // this is going to get the info from openweather app and my html
    fetchWeather: (ev) => {
    
      let city = document.getElementById('latitude').value;
      let lon = document.getElementById('longitude').value;
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e6c076735760bd653450048e434969f9&units=imperial`;


      fetch(url)
        .then((resp) => {
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
        })
        .then((data) => {
          app.showWeather(data);
        })
        .catch(console.err);
    },
// how long it is going to take
    getLocation: (ev) => {
        let opts = {
          enableHighAccuracy: true,
          timeout: 1000 * 10,
          maximumAge: 1000 * 60 * 5,
        };
        navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);
      },
      ftw: (position) => {
        document.getElementById('latitude').value =
          position.coords.latitude.toFixed(2);
        document.getElementById('longitude').value =
          position.coords.longitude.toFixed(2);
      },
      wtf: (err) => {
        console.error(err);
      },
      // this is going to be my links and icons for the weather
      showWeather: (resp) => {
        console.log(resp);
        let town = document.querySelector('.weather.row');
        document.querySelector('.temp') .innerText= "temp = "+resp.main.temp
        document.querySelector('.city') .innerText= "city = "+resp.name
        document.querySelector('.weathericon') .src= `http://openweathermap.org/img/wn/${resp.weather[0].icon}@4x.png`
        document.querySelector('.wind') .innerText= 'windspeed = '+resp.wind.speed
        document.querySelector('.humidity') .innerText= 'humidity = '+resp.main.humidity
   
      },
    };
    
    app.init();

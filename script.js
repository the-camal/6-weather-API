const app = {
    init: () => {
      document
        .getElementById('btnGet')
        .addEventListener('click', app.fetchWeather);
      document
        .getElementById('btnCurrent')
        .addEventListener('click', app.getLocation);
    },
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
        document.querySelector('.temp') .innerText= "temp, "+resp.main.temp
        document.querySelector('.city') .innerText= "city, "+resp.name
        document.querySelector('.weathericon') .src= `http://openweathermap.org/img/wn/${resp.weather[0].icon}@4x.png`
        document.querySelector('.wind') .innerText= 'windspeed, '+resp.wind.speed
        document.querySelector('humidity') .innerText= 'humidity'+resp.humidity
        
        //  town.innerHTML = resp.daily
      //    .map((day, idx) => {
      //       if (idx <= 2) {
      //         let dt = new Date(day.dt * 1000);
      //         let sr = new Date(day.sunrise * 1000).toTimeString();
      //         let ss = new Date(day.sunset * 1000).toTimeString();
      //         return `<div class="col">
      //             <div class="clip">
      //             <h5 class="clip-title p-2">${dt.toDateString()}</h5>
      //               <img
      //                 src="http://openweathermap.org/img/wn/${
      //                   day.weather[0].icon
      //                 }@4x.png"
      //                 class="clip-img-top"
      //                 alt="${day.weather[0].description}"
      //               />
      //               <div class="clip-body">
      //                 <h3 class="clip-title">${day.weather[0].main}</h3>
      //                 <p class="clip-text">High ${day.temp.max}&deg;C Low ${
      //           day.temp.min
      //         }&deg;C</p>
      //                 <p class="clip-text">High Feels like ${
      //                   day.feels_like.day
      //                 }&deg;C</p>
      //                 <p class="clip-text">Pressure ${day.pressure}mb</p>
      //                 <p class="clip-text">Humidity ${day.humidity}%</p>
      //                 <p class="clip-text">UV Index ${day.uvi}</p>
      //                 <p class="clip-text">Precipitation ${day.pop * 100}%</p>
      //                 <p class="clip-text">Dewpoint ${day.dew_point}</p>
      //                 <p class="clip-text">Wind ${day.wind_speed}m/s, ${
      //           day.wind_deg
      //         }&deg;</p>
      //                 <p class="clip-text">Sunrise ${sr}</p>
      //                 <p class="clip-text">Sunset ${ss}</p>
      //               </div>
      //             </div>
      //           </div>
      //         </div>`;
      //       }
      //     })
      //     .join(' ');
      },
    };
    
    app.init();

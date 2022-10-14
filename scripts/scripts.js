let quantity = 0;

let weather = {
  codeApi: "db2516fcde3ac62d7b47595a7039bd54",

  fetchWeather: function (city) {
    console.log(quantity == 0);
    if (quantity == 0) {
      localStorage.setItem(
        "data",
        JSON.stringify({
          coord: { lon: -58.3772, lat: -34.6132 },
          weather: [
            {
              id: 802,
              main: "Clouds",
              description: "scattered clouds",
              icon: "03n",
            },
          ],
          base: "stations",
          main: {
            temp: 16.31,
            feels_like: 16.5,
            temp_min: 14.9,
            temp_max: 16.85,
            pressure: 1009,
            humidity: 96,
          },
          visibility: 10000,
          wind: { speed: 5.66, deg: 80 },
          clouds: { all: 40 },
          dt: 1633040874,
          sys: {
            type: 1,
            id: 8224,
            country: "AR",
            sunrise: 1632994271,
            sunset: 1633038931,
          },
          timezone: -10800,
          id: 3435910,
          name: "Buenos Aires",
          cod: 200,
        })
      );
    }
    console.log(localStorage.getItem("data"));
    let dataSaved = JSON.parse(localStorage.getItem("data"));
    if (dataSaved.name.toLowerCase() == city.toLowerCase()) {
      console.log("saved");
      this.showWeather(dataSaved);
      quantity++;
    } else {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.codeApi
      )
        .then((response) => {
          if (!response.ok) {
            alert("Por favor, ingrese una nueva ciudad");
            throw new Error("Por favor, ingrese una nueva ciudad");
          }

          return response.json();
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("data", JSON.stringify(data));
          quantity++;
          this.showWeather(data);
        });
    }
  },

  bckImage: function (description) {
    if (description.includes("clouds")) {
      document.body.style.backgroundImage = "url('img/cloudy.jpg')";
    } else if (description.includes("rain")) {
      document.body.style.backgroundImage = "url('img/rainy.jpg')";
    } else if (description.includes("clear")) {
      document.body.style.backgroundImage = "url('img/sunny.jpg')";
    } else {
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1920x1200/?landscape')";
    }
  },

  showWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, temp_max, temp_min, feels_like, pressure } =
      data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Clima en " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".temp_max").innerText =
      "Temperatura máxima: " + temp_max + "°C";
    document.querySelector(".temp_min").innerText =
      "Temperatura mínima: " + temp_min + "°C";
    document.querySelector(".feels_like").innerText =
      "Sensación térmica: " + feels_like + "°C";
    document.querySelector(".pressure").innerText =
      "Presión atmosférica: " + pressure;
    document.querySelector(".humidity").innerText =
      "Humedad: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Velocidad del viento: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    console.log(description);
    this.bckImage(description);
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("La Plata");

function getWeather(event, optCity) {
  const inputCity = document.getElementById("search").value;
  optCity = optCity || inputCity;
  if (optCity.length < 1) {
    alert("Please enter a location");
  } else {
    event.preventDefault();

    axios
      .get("https://api.weatherapi.com/v1/current.json", {
        params: {
          key: "438bdcc61ff34e409fe32439221012",
          q: optCity,
          aqi: "yes",
        },
      })
      .then(function (res) {
        const data = res.data;
        updateHtml(data);
      })
      .catch(function (error) {
        console.error(error);
        alert("Please enter a valid location");
      });

    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&per_page=1&query=${optCity}&client_id=RoveDvpRmFAdkrlxwfdgpTIGoCanucl0DZxAcSwHq8Y`
      )
      .then(function (res) {
        updateBackground(res);
      })
      .catch(function (error) {
        console.error(error);
        alert("Image could not be retrieved. Try again later.");
      });
  }
}

function updateHtml(data) {
  document.getElementsByClassName("name")[0].textContent = data.location.name;
  document.getElementsByClassName("country")[0].textContent =
    data.location.country;
  document.getElementsByClassName("time")[0].textContent = new Date(
    data.location.localtime
  ).toUTCString();
  document.getElementsByClassName("temp")[0].textContent =
    data.current.temp_f + `°F`;
  document.getElementsByClassName("condition")[0].textContent =
    data.current.condition.text;
  document.getElementsByClassName("icon")[0].src = data.current.condition.icon;
  document.getElementsByClassName("cloudy")[0].textContent =
    data.current.cloud + "%";
  document.getElementsByClassName("humidity")[0].textContent =
    data.current.humidity + "%";
  document.getElementsByClassName("wind")[0].textContent =
    data.current.wind_mph + "mph " + data.current.wind_dir;
  document.getElementsByClassName("rain")[0].textContent =
    data.current.precip_in + " in";
}

function updateBackground(data) {
  document.getElementById(
    "weather-app"
  ).style.backgroundImage = `url(${data.data.results[0].urls.full})`;
}

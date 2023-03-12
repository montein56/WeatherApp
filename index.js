function displayResults(newCity, weatherData, giffyUrl, unit) {
  const display = document.getElementById("display");
  const displayCity = document.getElementById("displayCity");
  const main = weatherData.main;
  const weather = weatherData.weather;
  let tempUnit = unit === "metric" ? "C" : "F";
  displayCity.style.border = "none";

  document.getElementById(
    "icon"
  ).src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  displayCity.innerText =
    `${newCity}`.toUpperCase() + `, ${weatherData.sys.country}`;

  display.innerText =
    `\n${weather[0].main} : ${weather[0].description}` +
    `\n\n${Math.round(main.temp, 2)}\u00B0 ${tempUnit}` +
    `,  Feels like ${Math.round(main.feels_like, 2)}\u00B0 ${tempUnit}` +
    `\n\nMax ${Math.round(main.temp_max, 2)}\u00B0 ${tempUnit}` +
    ` & Min ${Math.round(main.temp_min, 2)}\u00B0 ${tempUnit}` +
    `\n\nHumidity ${main.humidity} %` +
    `\n\nPressure ${main.pressure}`;
  const image = document.getElementById("gifImage");
  image.src = giffyUrl.data.images.original.url;
}

function getInfo(newLocation, unit) {
  getWeather(newLocation, unit)
    .then((results) => {
      console.log(results.openWeather);
      console.log(results.giffy);
      const weatherData = results.openWeather;
      const giffyUrl = results.giffy;
      const newCity = results.city;
      displayResults(newCity, weatherData, giffyUrl, unit);
    })
    .catch((err) => console.log(err));
}

function changeUnits() {
  const location = document.getElementById("displayCity").innerText;
  const newLocation = location.substring(0, location.length - 4);
  const unit = this.checked ? "metric" : "imperial";
  getInfo(newLocation, unit);
}

function searchLocation(e) {
  e.preventDefault();
  const place = document.getElementById("location");
  const newLocation = place.value;
  const x = document.getElementById("myCheck").checked;
  const unit = x ? "metric" : "imperial";
  getInfo(newLocation, unit);
  place.value = "";
}

async function getWeather(newLocation, unit) {
  const response1 = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${newLocation}&appid=7cdfc03226332fb7b28028a76302e23a&units=${unit}`,
    { mode: "cors" }
  );
  try {
    if (!response1.ok) throw new Error(`City ${newLocation} not found`);
    const json1 = await response1.json();
    const response2 = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=2n7POPaMC5FWod3I9Ag5QQmYZ96U6CKP&s=${json1.weather[0].main}`,
      { mode: "cors" }
    );
    const json2 = await response2.json();
    return {
      openWeather: json1,
      giffy: json2,
      city: newLocation,
    };
  } catch (error) {
    const displayCity = document.getElementById("displayCity");
    displayCity.innerText = "Try entering a location again";
    displayCity.style.border = "red solid 3px";
    // alert(error);
  }
}

function addListeners() {
  const checkbox = document.getElementById("myCheck");
  checkbox.addEventListener("change", changeUnits);
  const btnSearch = document.getElementById("btnSearch");
  btnSearch.addEventListener("click", searchLocation);
}
addListeners();
getInfo("delhi", "imperial");

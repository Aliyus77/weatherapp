// const cityName = "Campana";
// const countryName = "AR";
// const lon = "-58.9591400";
// const lat = "-34.1687400";
// const state = "Buenos Aires";
// const exclude = "hourly,daily";
// const limit = "5";
const apiKey = "a1ae295316bd76017dc99da5776423f2";
// const API = `http://api.openweathermap.org/geo/1.0/direct?q=Campana&limit=5&appid=${apiKey}`;
// const API = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state},${countryName}&limit=${limit}&appid=${apiKey}`;
// const API = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}`;
// const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
const getData = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    return fetch(url).then((data) => data.json());
}

const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
};

const button = document.getElementById('btn');
button.addEventListener('click', infoClima);

function infoClima() {
    const container = document.getElementById('container');
    const input = document.getElementById('input');
    getData(input.value)
        .then((data) => {
        container.innerHTML = template(data);
    })
    .catch(() => {
    container.innerHTML = 'No se encontro la ciudad';
    })
}
function template(data) {
    return `
    <div class= "w-full h-400 flex justify-center items-center ">
        <div class= "w-1/4 h-70 rounded-10 bg-green-400 m-10 flex flex-col justify-center items-center text-white text-center leading-30 rounded">
            <h3 class= "my-10 text-2xl font-bold">${data.name}</h3>
            <span class ="text-5xl px-auto my-3 mb-15 font-bold">${kelvinToCelsius(data.main.temp)}°/${kelvinToCelsius(data.main.temp_min)}°</span>
            <img class="w-60 h-auto mx-auto" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="partly_cloudy">
            <span>Cielo: ${data.weather[0].description}</span>
            <span>Temperatura Máxima: ${kelvinToCelsius(data.main.temp_max)}°</span>
            <span>Sensación Térmica: ${kelvinToCelsius(data.main.feels_like)}°</span>
            <span class="pb-1">Humedad: ${data.main.humidity}%</span>
        </div>
    </div>`;
}
let kelvinToCelsius = (kelvinValue) => Math.floor(kelvinValue - 273);
kelvinToCelsius(297);
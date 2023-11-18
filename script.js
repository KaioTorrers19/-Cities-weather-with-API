const apiKey = 'b6a6d8adb2a36e0d024fcd3c3b9c2315'
const apiCountryURL = 'https://countryflagsapi.com/png/'

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')
const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const WeatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const umidityElement = document.querySelector('#umidity span')
const windElement = document.querySelector('#wind span')
const weatherData = document.querySelector('#weather-data')
// Função para obter dados do clima
const getWeatherData = async city => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

  const res = await fetch(apiWeatherURL)
  const data = await res.json()
  return data
}

// Função para exibir dados do clima
const showWeatherData = async city => {
  const data = await getWeatherData(city)

  cityElement.innerText = data.name
  tempElement.innerText = parseInt(data.main.temp)
  descElement.innerText = data.weather[0].description
  WeatherIconElement.setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  )

  countryElement.setAttribute(
    'src',
    `https://flagsapi.com/${data.sys.country}/flat/64.png`
  )
  umidityElement.innerText = `${data.main.humidity}%`
  windElement.innerText = `${data.wind.speed}km/h`

  weatherData.classList.remove('hidden')
}
// Eventos
searchBtn.addEventListener('click', async e => {
  e.preventDefault()
  const city = cityInput.value

  await showWeatherData(city)
})

cityInput.addEventListener('keyup', e => {
  if (e.code == 'Enter') {
    const city = e.target.value

    showWeatherData(city)
  }
})

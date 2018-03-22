const API_KEY = "848da042ee8ec428269dea5432ede9f8"

const API_SERVICE_BASE_URL = "https://restapi.amap.com/v3/config/district?"

const options = {
  key: API_KEY,
  keywords: "广东",
  subdistrict: "1",
  extensions: "base"
}

let paramsStr = ""

for (let item in options) {
  paramsStr += `&${item}=${options[item]}`
}

paramsStr = paramsStr.slice(1)

const resultURL = API_SERVICE_BASE_URL + paramsStr

async function fetchCitysInfo() {
  const res = await fetch(resultURL)
  const json = await res.json()
  const citys = json.districts[0].districts
  citys.map(city => ({ adcode: city.adcode, name: city.name }))
  return citys
}

async function fetchCityWeatherInfo(adcode) {
  const res = await fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=${API_KEY}&city=${adcode}`)
  return await res.json()
}
  

export { fetchCitysInfo, fetchCityWeatherInfo }


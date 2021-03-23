const APIurl = "http://api.openweathermap.org/data/2.5/weather?"
const APIkey = "appid=275483d966e6fd1ad712f36660db4ea6"
const APIlang = "&lang=en"
const APIunits = "&units=metric"



document.getElementById('refresh').onclick = async function () {
    currentLocationCard()

}

document.getElementById('addcity').onclick = async function () {
    await createCard(document.getElementById('searchfield').value, 'enCard').catch(alert)
}

function initLocalStorage() {
    if (window.localStorage.getItem("default_city") === null)
        localStorage["default_city"] = "Saint Petersburg"
    if (window.localStorage.getItem("favoritescities") === null)
        localStorage["favoritescities"] = JSON.stringify(["Moscow", "Almaty"])
}
function htmlToObject(weatherReportList) {
    const keys = weatherReportList.getElementsByClassName('chname')
    const values = weatherReportList.getElementsByClassName('value');
    const obj = {};
    const params = {}
    for (let i = 0; i < keys.length; i += 1) {
        params[keys[i].textContent.toLowerCase()] = values[i];
    }
    obj.params = params
    obj.temperature = weatherReportList.getElementsByClassName('temperature')[0]
    obj.weathericon = weatherReportList.getElementsByClassName('weathericon')[0]
    obj.cityname = weatherReportList.getElementsByClassName('cityname')[0]
    return obj;
}

async function fillCharacteristics(locationOrCity, params) {
    await request(locationOrCity)
        .then((req) => {
            const weather = req.weather[0]
            const main = req.main
            const report = params
            report.weathericon.src = 'img/png/weathericons/' + weather.icon + '.png'
            report.temperature.textContent = Math.round(main.temp) + '°C'
            report.params['wind'].textContent = req['wind'].speed + ' m/s';
            report.params["cloud cover"].textContent = weather.description;
            report.params['pressure'].textContent = main.pressure + ' hpa'
            report.params['humidity'].textContent = main.humidity + ' %'
            report.params['coordinates'].textContent = `[${req.coord.lon.toFixed(2)}, ${req.coord.lat.toFixed(2)}]`
            report.cityname.textContent = req.name
            return report
        })
        .catch(error => {
            throw error
        })


}

function dataLoad(loadingNode, func, delay) {
    if (loadingNode.parentNode
        .querySelector('.' + document.getElementById('loader').content.firstElementChild.className))
        return 0
    const loadingNodeClone = loadingNode.cloneNode()
    const parentNode = loadingNode.parentNode
    const loaderClone = document.getElementById('loader').content.firstElementChild.cloneNode(true)
    const defDisp = loadingNode.style.display
    loadingNodeClone.prepend(loaderClone)
    loadingNodeClone.classList.add("loading")
    loadingNodeClone.style.display = 'block'
    loadingNodeClone.firstChild.style.margin = `${loadingNode.scrollHeight.valueOf() / 2}px auto`
    loadingNode.style.display = 'none'
    parentNode.prepend(loadingNodeClone)

    setTimeout(async function () {
        await func()
        parentNode.removeChild(loadingNodeClone)
        loadingNode.style.display = defDisp
    }, delay)
}

function currentLocationCard() {
    const currentCard = document.querySelector('.mylocationweather')
    dataLoad(currentCard, function () {
        let params = htmlToObject(currentCard)
        navigator.geolocation.getCurrentPosition(async function (position) {
                await fillCharacteristics([position.coords.latitude, position.coords.longitude], params)
            },
            async function () {
                await fillCharacteristics(this.localStorage['default_city'], params)
            })
    }, 800)
}

async function createCard(cityName, templateID) {
    let citySet = new Set(JSON.parse(window.localStorage.getItem('favoritescities')))
    if (citySet.has(cityName)) {
        throw new CityWithThisNameHasAlreadyAtLocalStorage(cityName)
    }
    citySet.add(cityName)

    const parent = document.getElementById('favoritescities')
    let clone = document.getElementById(templateID).content.firstElementChild.cloneNode(true)
    const params = htmlToObject(clone)
    await fillCharacteristics(cityName, params)
        .then(() => {
            window.localStorage.setItem('favoritescities', JSON.stringify(Array.from(citySet)))
            clone.querySelector('.removecity').addEventListener('click', function () {
                parent.removeChild(clone)
                let citySet = new Set(JSON.parse(window.localStorage.getItem('favoritescities')))
                citySet.delete(cityName)
                window.localStorage.setItem('favoritescities', JSON.stringify(Array.from(citySet)))
            })
            parent.append(clone)
        })
        .catch(error => {
            throw error
        })

}


async function request(locationOrCity) {
    var data
    if (typeof locationOrCity == 'string')
        data = await fetch(
            APIurl + APIkey + APIlang + '&q=' + locationOrCity + APIunits
        )
            .then(async (response) => {
                if (response.status === 200) {
                    return response.json()
                }
                if (response.status === 400) {
                    throw new Error('text field can\'t be empty!')
                } else if(response.status === 401) {
                    throw new RequestProblem(
                        'problems with API key on the web service side',
                        response.status
                    );
                } else if (response.status === 404) {
                    throw new RequestProblem(
                        'wrong API request. Make your sure that you specified existent location!',
                        response.status
                    )
                } else if (response.status === 429) {
                    throw new RequestProblem(
                        'service is using free OpenWeatherMap API. Retry to refresh a page in a few minutes',
                        response.status)
                }
            })

    else
        data = await fetch(
            APIurl + APIkey + APIlang + '&lat=' + locationOrCity[0] + '&lon=' + locationOrCity[1] + '&' + APIunits
        )
            .then(async (response) => {
                return response.json()
            })
    return data
}

function CityWithThisNameHasAlreadyAtLocalStorage(name) {
    this.name = "CityWithThisNameHasAlreadyAtLocalStorage: ";
    this.message = `a card with location ${name} has already been created. You can only create one card for one city!`;
    this.toString = function () {
        return this.name + '. ' + this.message
    };
}

function RequestProblem(message, status) {
    this.name = `RequestProblem`
    this.status = status
    this.message = message
    this.toString = function () {
        return `${this.name}: (${this.status}). ${this.message}`
    }
}



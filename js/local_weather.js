const APIurl = "http://api.openweathermap.org/data/2.5/weather?"
const APIkey = "appid=275483d966e6fd1ad712f36660db4ea6"
const APIlang = "&lang=en"
const APIunits = "&units=metric"
const DEFlocation = "&lat=59.57&lon=30.19"


async function request(location) {
    var tmp
    if (location == null) {
        tmp = await fetch(APIurl + APIkey + APIlang + "&q=Moscow,ru" + APIunits).then(async (response) => {
            let data = await response.json()
            return data
        })
    } else {
        location = "&lat=" + location[0] + "&lon=" + location[1]
        tmp = (await fetch(APIurl + APIkey + APIlang + location + APIunits).then(async (response) => {
            let data = await response.json()
            return data
        }))
    }
    return tmp
}

document.getElementById('refresh').onclick = function () {
    navigator.geolocation.getCurrentPosition(async (position) => {
            await success(position, document.getElementById('mylocationweather'))
        },
        async (errMessage) => {
            await error(errMessage)
        })

}

window.onload = function () {

}

async function createCard(domParent, position) {
    let getRequest = await request(position)
    console.log(getRequest)
    let characteristics = [
        getRequest['wind']['speed'].toFixed(1) + ' m/s,',
        getRequest['weather'][0]['description'],
        getRequest['main']['pressure'] + ' hpa',
        getRequest['main']['humidity'] + '%',
        '[' +getRequest['coord']['lat'].toFixed(2)  + ', ' + getRequest['coord']['lon'].toFixed(2) +  ']'
    ]
    let values = domParent.querySelectorAll('.value')
    for (let i = 0; i < values.length; i++) {
        values[i].innerHTML = characteristics[i]
    }
    domParent.querySelectorAll('.temperature')[0].innerHTML = Math.round(getRequest['main']['temp']) + '°C'
    domParent.querySelectorAll('.weathericon')[0].src = 'img/png/weathericons/' + getRequest['weather'][0]['icon']+'.png'
    domParent.querySelectorAll('.cityname')[0].innerHTML = getRequest['name']
}

async function success(position, domField) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    await createCard(document.getElementById('mylocationweather'), [lat, lng])

}

async function error(errMessage) {
    console.error(errMessage)
    var tmp = await request();
    console.log(tmp)
    let e
    switch (errMessage.code) {
        case 1:
            e = "Please allow access to the use of your geolocation!"
            break
        case 2:
            e = "One internal source of position returned an internal error."
            break
        case 3:
            e = "Waiting limit is reached"
            break
    }
    window.alert(e)
    return errMessage
}




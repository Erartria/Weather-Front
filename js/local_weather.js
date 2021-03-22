const APIurl = "http://api.openweathermap.org/data/2.5/weather?"
const APIkey = "appid=275483d966e6fd1ad712f36660db4ea6"
const APIlang = "&lang=en"
const APIunits = "&units=metric"
const DEFlocation = "&lat=59.57&lon=30.19"


async function request(location) {
    location = "&lat=" + location[0] + "&lon=" + location[1]
    tmp = (await fetch(APIurl + APIkey + APIlang + location + APIunits).then(async (response) => {
        let data = await response.json()
        return data
    }))
    return tmp
}

document.getElementById('refresh').onclick = function () {
    navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(document.getElementsByClassName('mylocationweather')[0])
            await success(document.getElementsByClassName('mylocationweather')[0], 8position)
        },
        async (errMessage) => {
            await error(errMessage)
        })
}





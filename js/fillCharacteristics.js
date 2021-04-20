function htmlToObject(weatherReportList) {
    const keys = weatherReportList.getElementsByClassName('chname');
    const values = weatherReportList.getElementsByClassName('value');
    const obj = {};
    const params = {};
    for (let i = 0; i < keys.length; i += 1) {
        params[keys[i].textContent.toLowerCase()] = values[i];
    }
    obj.params = params;
    obj.temperature = weatherReportList.getElementsByClassName('temperature')[0];
    obj.weathericon = weatherReportList.getElementsByClassName('weathericon')[0];
    obj.cityname = weatherReportList.getElementsByClassName('cityname')[0];

    return obj;
}

function fill(req, params) {
    const report = params;
    report.weathericon.src = 'img/png/weathericons/' + req.icon + '.png';
    report.temperature.textContent = Math.round(req.temperature) + '°C';
    report.params['wind'].textContent = req.wind + ' m/s';
    report.params["cloud cover"].textContent = req.cloud;
    report.params['pressure'].textContent = req.pressure + ' hpa';
    report.params['humidity'].textContent = req.humidity + ' %';
    report.params['coordinates'].textContent = `[${req.coordinates.latitude.toFixed(2)}, ${req.coordinates.longitude.toFixed(2)}]`;
    report.cityname.textContent = `${req.name}`;
    report.city = req.name;
    return report;
}

async function fillCharacteristics(locationOrCity, params) {
    if (typeof locationOrCity === 'string')
        var f = async function () {return requestCity(locationOrCity)};
    else
        var f = async function () {return requestLocation(locationOrCity)};
    return f(locationOrCity)
        .then(req => {
            console.log(req)
            let tmp = fill(req.message, params)
            return tmp;
        }).catch(er => {
            alert(er)
        })

}

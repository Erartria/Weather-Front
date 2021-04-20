async function getCities() {
    const response = await fetch(`${APIurl}/${FAVOURITEroute}`)
    return response;
}

async function postCity(cityName) {
    const response = await fetch(`${APIurl}/${FAVOURITEroute}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({"name": cityName})
    })
    return problemHandler(response, cityName);
}

async function deleteCity(cityName) {
    const response = await fetch(`${APIurl}/${FAVOURITEroute}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({"name": cityName})
    })

    return problemHandler(response, cityName);
}



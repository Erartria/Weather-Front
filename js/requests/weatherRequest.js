async function requestLocation(location) {
    return fetch(
        `${APIurl}/${WEATHERroute}/${LOCATIONroute}?lat=${location[0]}&lon=${location[1]}`
    )
        .then(response => {
                return problemHandler(response, location);
            }
        );
}

async function requestCity(city) {
    return fetch(
        `${APIurl}/${WEATHERroute}/${CITYroute}?q=${city}`
    )
        .then(response => {
                return problemHandler(response, city);
            }
        );
}
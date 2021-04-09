async function requestLocation(location) {
        return fetch(
            APIurl + APIkey + APIlang + '&lat=' + location[0] + '&lon=' + location[1] + '&' + APIunits
        )
            .then(async (response) => {
                return response.json()
            })
}

async function requestCity(city) {
    return fetch(
        APIurl + APIkey + APIlang + '&q=' + city + APIunits
    )
        .then(async (response) => {
            if (response.status === 200) {
                return response.json()
            }
            if (response.status === 400) {
                throw new Error('text field can\'t be empty!')
            } else if (response.status === 401) {
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
}


function RequestProblem(message, status) {
    this.name = `RequestProblem`
    this.status = status
    this.message = message
    this.toString = function () {
        return `${this.name}: (${this.status}). ${this.message}`
    }
}

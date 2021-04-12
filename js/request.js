const APIurl = "https://api.openweathermap.org/data/2.5/weather";
const APIkey = "275483d966e6fd1ad712f36660db4ea6";
const APIlang = "en";
const APIunits = "metric";
const badRequestStatuses = new Map([
        [400, 'Text field can\'t be empty!'],
        [401, 'Problems with API key on the web service side'],
        [404, 'Wrong API request. Make your sure that you specified existent location!'],
        [429, 'Service is using free OpenWeatherMap API. Retry to refresh a page in a few minutes']
    ]
);

function problemHandler(response) {
    if (badRequestStatuses.has(response.status)) {
        throw new RequestProblem(badRequestStatuses.get(response.status), response.status);
    }
    if (response.status === 200) {
        return response.json();
    }
}

async function requestLocation(location) {
    return fetch(
        `${APIurl}?appid=${APIkey}&lang=${APIlang}&lat=${location[0]}&lon=${location[1]}&units=${APIunits}`
    )
        .then(response => {
                return problemHandler(response);
            }
        );
}

async function requestCity(city) {
    return fetch(
        `${APIurl}?appid=${APIkey}&lang=${APIlang}&q=${city}&units=${APIunits}`
    )
        .then(response => {
                return problemHandler(response);
            }
        );
}


function RequestProblem(message, status) {
    this.name = `RequestProblem`;
    this.status = status;
    this.message = message;
    this.toString = function () {
        return `${this.name}: (${this.status}). ${this.message}`;
    };
}

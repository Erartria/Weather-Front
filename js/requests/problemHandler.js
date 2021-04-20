async function problemHandler(response, locationOrCity) {
    if (response.status === 200) {
        return response.json();
    }
    console.log(response.status)
    throw new RequestProblem(await response.json(), response.status, locationOrCity)
}

function RequestProblem(message, status, location) {
    this.name = `RequestProblem`;
    this.message = JSON.stringify(message.message);
    this.status = status;
    this.location = location;
    this.toString = function () {
        return `${this.name} (${this.status}): ${this.message}`
    };
}
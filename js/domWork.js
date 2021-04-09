const APIurl = "https://api.openweathermap.org/data/2.5/weather?"
const APIkey = "appid=275483d966e6fd1ad712f36660db4ea6"
const APIlang = "&lang=en"
const APIunits = "&units=metric"

function initLocalStorage() {
    if (window.localStorage.getItem("defaultCity") === null)
        localStorage["defaultCity"] = "Saint Petersburg"
    if (window.localStorage.getItem("favoritesCities") === null)
        localStorage["favoritesCities"] = JSON.stringify(["Moscow", "Almaty"])
}

async function dataLoad(type, loadingNode, func, delay) {
    if (type === 'current' && loadingNode.parentNode.getElementsByClassName('mylocationweather').length === 2)
        return 0
    const loadingNodeClone = loadingNode.cloneNode()
    const parentNode = loadingNode.parentNode
    const loaderClone = document.getElementById('loader').content.firstElementChild.cloneNode(true)
    const defDisp = loadingNode.style.display
    loadingNodeClone.append(loaderClone)
    loadingNodeClone.firstChild.style.margin = `${loadingNode.scrollHeight.valueOf() / 2}px auto`
    loadingNode.style.display = 'none'
    loadingNodeClone.classList.add("loading")
    loadingNodeClone.style.display = 'block'
    parentNode.insertBefore(loadingNodeClone, parentNode.children[Array.prototype.indexOf.call(parentNode.children, loadingNode) + 1])
    setTimeout(async function () {
        await func()
            loadingNode.style.display = defDisp
            parentNode.removeChild(loadingNodeClone)
    }, delay)
}

async function currentLocationCard() {
    const currentCard = document.querySelector('.mylocationweather')
    await dataLoad('current', currentCard, async function () {
        let params = htmlToObject(currentCard)
        navigator.geolocation.getCurrentPosition(async function (position) {
                await fillCharacteristics([position.coords.latitude, position.coords.longitude], params)
            },
            async function () {
                await fillCharacteristics(this.localStorage['defaultCity'], params)
            })
    }, 1200)
}

async function createCard(type, cityName, templateID) {
    const parent = document.getElementById('favoritescities')
    let clone = document.getElementById(templateID).content.firstElementChild.cloneNode(true)
    parent.append(clone)
    const params = htmlToObject(clone)
    await dataLoad('create', clone,
        async function () {
            fillCharacteristics(cityName, params)
                .then(rep => {
                    if (type === 'create') {
                        const citySet = new Set(JSON.parse(window.localStorage.getItem('favoritesCities')))
                        if (citySet.has(rep.name)) {
                            throw new CityWithThisNameHasAlreadyAtLocalStorage(rep.name)
                        }
                        citySet.add(rep.name)
                        window.localStorage.setItem('favoritesCities', JSON.stringify(Array.from(citySet)))
                    }
                    clone.querySelector('.removecity').addEventListener('click', function () {
                        const citySet = new Set(JSON.parse(window.localStorage.getItem('favoritesCities')))
                        citySet.delete(rep.name)
                        window.localStorage.setItem('favoritesCities', JSON.stringify(Array.from(citySet)))
                        parent.removeChild(clone)
                    })
                })
                .catch(er => {
                    parent.removeChild(clone)
                    alert(er)
                })
        }, 500)
}

async function loadLocalStorageCards() {
    const arr = JSON.parse(window.localStorage.getItem('favoritesCities'))
    for (let i = 0; i < arr.length; i++) {
        await createCard('load', arr[i], 'enCard')
    }
}

function CityWithThisNameHasAlreadyAtLocalStorage(name) {
    this.name = "CityWithThisNameHasAlreadyAtLocalStorage: ";
    this.message = `a card with location ${name} has already been created. You can only create one card for one city!`;
    this.toString = function () {
        return this.name + this.message
    };
}





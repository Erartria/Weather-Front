

async function dataLoad(type, loadingNode, fc) {
    if (type === 'current' && loadingNode.parentNode.getElementsByClassName('mylocationweather').length === 2)
        return 0;
    const loadingNodeClone = loadingNode.cloneNode();
    const parentNode = loadingNode.parentNode;
    const loaderClone = document.getElementById('loader').content.firstElementChild.cloneNode(true);
    const defDisp = loadingNode.style.display;
    loadingNodeClone.append(loaderClone);
    loadingNodeClone.firstChild.style.margin = `${loadingNode.scrollHeight.valueOf() / 2}px auto`;
    loadingNode.style.display = 'none';
    loadingNodeClone.classList.add("loading");
    loadingNodeClone.style.display = 'block';
    parentNode.insertBefore(loadingNodeClone, parentNode.children[Array.prototype.indexOf.call(parentNode.children, loadingNode) + 1]);
    await fc();
    parentNode.removeChild(loadingNodeClone);
    loadingNode.style.display = defDisp;

}

async function currentLocationCard() {
    const currentCard = document.querySelector('.mylocationweather');
    await dataLoad('current', currentCard, async function () {
        let params = htmlToObject(currentCard);
        navigator.geolocation.getCurrentPosition(async function (position) {
                await fillCharacteristics([position.coords.latitude, position.coords.longitude], params);
            },
            async function () {
                await fillCharacteristics(defaultCity, params);
            })
    });
}

function removeCityButtonHandler(elementsParent, element, report) {
    element.querySelector('.removecity').addEventListener('click', async function () {
        console.log(report.city)
        elementsParent.removeChild(element);
        await deleteCity(report.city)
    });
}

async function createCard(cityName, templateID) {
    const parent = document.getElementById('favoritescities');
    let clone = document.getElementById(templateID).content.firstElementChild.cloneNode(true);
    parent.append(clone);
    const params = htmlToObject(clone);
    await dataLoad('create', clone,
        async function () {
            try {
                await postCity(cityName)
                let rep = await fillCharacteristics(cityName, params);
                removeCityButtonHandler(parent, clone, rep)
            } catch (er) {
                parent.removeChild(clone);
                alert(er)
            };
        });
}

async function loadLocalStorageCards() {
    const f = await (await getCities()).json();
    f.forEach(cityStats => {
        const parent = document.getElementById('favoritescities');
        let clone = document.getElementById('enCard').content.firstElementChild.cloneNode(true);
        parent.append(clone);
        const params = htmlToObject(clone);
        dataLoad('create', clone,
            async function () {
                var rep = fill(cityStats, params);
                removeCityButtonHandler(parent, clone, rep)
            });
    })
}
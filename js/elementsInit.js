window.onload = async function () {
    initLocalStorage();
    await Promise.all([loadLocalStorageCards(), currentLocationCard()]);
}

document.getElementById('refresh').onclick = async function () {
    await currentLocationCard();
}

document.getElementById('addcity').onclick = async function () {
    await createCard('create', document.getElementById('searchfield').value, 'enCard');
}


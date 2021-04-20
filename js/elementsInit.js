window.onload = async function () {
    await Promise.all([loadLocalStorageCards(), currentLocationCard()]);
}

document.getElementById('refresh').onclick = async function () {
    await currentLocationCard();
}

document.getElementById('addcity').onclick = async function () {
    await createCard(document.getElementById('searchfield').value, 'enCard');
}
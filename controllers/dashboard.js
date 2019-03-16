//replace expressions in view with params
var userName = getCurrUser().fname + ' ' + getCurrUser().lname;
var currPage = "?page=dashboard";

const fetchArea= (areaName) => {

    fetch(`./../views/dashboard/${areaName}.html`)
        .then((response) => response.text())
        .then((html) => {
            const areaSelector = document.querySelector('area');
            areaSelector.innerHTML = html;
        })
        .catch((error) => {
            console.warn(error);
    });

}
//default
fetchArea('lists');
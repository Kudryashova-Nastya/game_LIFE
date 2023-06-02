let season = "summer"
let create = "grassEater"

function changeSeasonWinter() {
    season = "winter"
}

function changeSeasonSummer() {
    season = "summer"
}

function changeCreateGrass() {
    create = "grass"
        // console.log(create)
}

function changeCreateGrassEater() {
    create = "grassEater"
        // console.log(create)
}

let winter = document.getElementById("winter")
winter.addEventListener("click", changeSeasonWinter)

let summer = document.getElementById("summer")
summer.addEventListener("click", changeSeasonSummer)

let createGrass = document.getElementById("grass")
createGrass.addEventListener("click", changeCreateGrass)

let createGrassEater = document.getElementById("grassEater")
createGrassEater.addEventListener("click", changeCreateGrassEater)
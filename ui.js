let season = "summer"

function changeSeasonWinter() {
    season = "winter"
}

function changeSeasonSummer() {
    season = "summer"
}

let winter = document.getElementById("winter")
winter.addEventListener("click", changeSeasonWinter)

let summer = document.getElementById("summer")
summer.addEventListener("click", changeSeasonSummer)
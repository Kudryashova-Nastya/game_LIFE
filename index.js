// генератор матрицы 60х40
let matrix_width = 60
let matrix_height = 40
let variants = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2]
let matrix = []
for (let i = 0; i < matrix_height; i++) {
    let item = []
    for (let i = 0; i < matrix_width; i++) {
        item.push(variants[Math.floor(Math.random() * variants.length)])
    }
    matrix.push(item)
}

// размер ячейки
let side = 16

// массив с координатами травы
let grassArr = []

// массив с координатами травоядных
let grassEatersArr = []

// инициализация холста
function setup() {
    frameRate(5) // частота кадров в секунду
    createCanvas(matrix[0].length * side, matrix.length * side)
    background('#acacac')

    //   let gr = new Grass(1,2)
    //   let emptyCells = gr.chooseCell(0)
    //   console.log(emptyCells)

    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] === 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] === 2) {
                let ge = new GrassEater(x, y)
                grassEatersArr.push(ge)
            }
            //    else if(matrix[y][x] == 3){
            //    }
        }
    }
}

function mouseClicked() {
    if (mouseX < 960 && mouseY < 640 && mouseX > 0 && mouseY > 0) {
        console.log(mouseX, mouseY)
        let indexY = parseInt(mouseY / side)
        let indexX = parseInt(mouseX / side)
        console.log(indexY, indexX)
        if (matrix[indexY][indexX] === 1) {
            grassArr.splice(grassArr.findIndex(item => item.x === indexX && item.y === indexY), 1)
        }
        if (create == "grassEater") {
            matrix[indexY][indexX] = 2
            let ge = new GrassEater(indexX, indexY)
            grassEatersArr.push(ge)
        } else if (create = "grass") {
            matrix[indexY][indexX] = 1
            let g = new Grass(indexX, indexY)
            grassArr.push(g)
        }

    }
}


// непрерывный вызов рисования
function draw() {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] === 1) {
                if (season == "summer") {
                    fill("green")
                } else if (season == "winter") {
                    fill("white")
                }
            } else if (matrix[y][x] === 0) {
                fill("#acacac")
            } else if (matrix[y][x] === 2) {
                fill("orange")
            }
            rect(x * side, y * side, side, side)

            // координаты внутри ячеек
            // fill("blau")
            // text(x+" "+y, x*side+side/3,y*side+side/3)
        }
    }

    for (let i in grassArr) {
        // let emptyCells = grassArr[i].chooseCell(0)
        // console.log(emptyCells)
        if (season == "winter") {
            grassArr[i].mulInWinter()
        } else {
            grassArr[i].mul()
        }

    }

    for (let i in grassEatersArr) {
        // let emptyCells = grassArr[i].chooseCell(0)
        // console.log(emptyCells)

        grassEatersArr[i].eat()
        if (grassEatersArr[i]) { // если ещё жив
            grassEatersArr[i].mul()
        }
    }
}

class LivingCreature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    // найти все соседние ячейки с индексом character
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}


// Трава
class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    //  размножиться (раз в 5 циклов)
    mul() {
        this.multiply++
            let newCell = random(this.chooseCell(0))
                // console.log(newCell, this.multiply)
        if (this.multiply >= 5 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1])
            grassArr.push(newGrass)
            matrix[newCell[1]][newCell[0]] = 1
            this.multiply = 0
        }
    }

    mulInWinter() {
        this.multiply++
            let newCell = random(this.chooseCell(0))
                // console.log(newCell, this.multiply)
        if (this.multiply >= 10 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1])
            grassArr.push(newGrass)
            matrix[newCell[1]][newCell[0]] = 1
            this.multiply = 0
        }
    }
}


// Травоядное
class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 5 // жизни
        this.ate_well = 0 // регулярность приёма пищи
        this.directions = []
    }

    // узнать новые координаты соседних ячеек после перемещения
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    // найти все соседние ячейки с индексом character
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }

    //  размножиться (после регулярного употребления травы в течение 5 циклов)
    mul() {
        let newCell = random(this.chooseCell(0))
        if (this.ate_well >= 5 && newCell) {
            let newGrassEater = new GrassEater(newCell[0], newCell[1])
            grassEatersArr.push(newGrassEater)
            matrix[newCell[1]][newCell[0]] = 2
            this.ate_well = 0
        }
    }

    // передвинуться в поисках еды
    move() {
        this.energy--
            // если еды нет уже 5 циклов, то смерть
            if (this.energy <= 0) {
                this.die()
            } else {
                let newCell = random(this.chooseCell(0))
                if (newCell) {
                    matrix[this.y][this.x] = 0
                    matrix[newCell[1]][newCell[0]] = 2
                    this.x = newCell[0]
                    this.y = newCell[1]
                    this.getNewCoordinates()
                }
            }
    }

    // покушат (если рядом есть трава, то переместиться на неё)
    eat() {
        let newCell = random(this.chooseCell(1))
        if (newCell) {
            this.ate_well++
                this.energy = 5
            matrix[this.y][this.x] = 0
            matrix[newCell[1]][newCell[0]] = 2
            this.x = newCell[0]
            this.y = newCell[1]
                // удаляем съеденную траву из массива
                // for (let i in grassArr) {
                //     if (grassArr[i].x === newCell[0] && grassArr[i].y === newCell[1]) {
                //         grassArr.splice(i, 1)
                //          break
                //     }
                // }
            grassArr.splice(grassArr.findIndex(item => item.x === newCell[0] && item.y === newCell[1]), 1)
            this.getNewCoordinates()
        } else {
            this.ate_well = 0
            this.move()
        }
    }

    // умереть от голода
    die() {
        matrix[this.y][this.x] = 0
        grassEatersArr.splice(grassEatersArr.findIndex(item => item.x === this.x && item.y === this.y), 1)
    }
}

setInterval(() => {
    fetch('http://localhost:3000/', {
        method: "POST",
        body: `Кол-во травы: ${grassArr.length}, травоядных: ${grassEatersArr.length}`
    })
}, 10000)
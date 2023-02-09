let matrix = [
   [0,0,1,0,0,2,1,0,0,1,0,0,0,2,0,1,0,0,1,0,0,0,1,0,0,1,0,1,0,0],
   [1,0,0,1,0,1,0,0,2,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,1,0,2,0,0,0],
   [0,1,2,0,0,0,2,0,1,0,1,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1],
   [0,0,1,0,0,1,0,1,0,0,0,2,0,0,0,1,0,0,2,1,0,0,0,1,0,1,0,1,0,0],
   [1,1,0,2,1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,1],
   [0,1,0,0,0,2,0,0,0,1,0,0,2,1,0,0,0,0,0,0,1,0,1,0,0,2,0,0,0,0],
   [1,1,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,1,0,0,1,0,1,0,2,1],
   [0,0,0,0,1,0,0,0,0,1,2,0,0,0,1,0,0,0,0,0,0,2,0,1,0,0,0,0,0,0],
   [0,0,2,0,0,0,2,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,1,0,0],
   [1,0,1,0,0,0,0,1,0,1,0,1,0,0,1,0,1,0,0,0,0,2,0,1,0,1,0,0,1,0],
   [0,0,1,0,0,1,0,1,0,0,0,0,0,2,0,1,0,0,1,0,1,0,0,2,0,0,0,1,0,0],
   [1,0,0,2,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,2,0,0,0,1,0,2,0,1,0],
   [1,0,1,0,0,0,0,1,0,1,0,1,0,0,1,0,0,2,0,0,0,2,0,1,0,0,0,0,0,0],
   [0,1,0,0,0,2,0,0,0,1,0,2,0,0,0,1,1,0,2,1,0,0,0,0,0,1,0,1,0,0],
   [1,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0],
   [0,0,1,0,0,1,0,1,0,0,0,0,0,0,2,1,0,0,1,0,1,0,0,2,0,0,0,1,0,0],
   [1,0,0,2,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,2,0,0,0,1,0,2,0,1,0],
   [1,0,1,0,0,0,0,1,0,1,0,1,0,0,1,0,1,0,0,0,0,2,0,1,0,1,0,0,1,0],
   [0,0,1,0,0,1,0,1,0,0,0,2,0,0,0,1,0,0,1,0,1,0,0,2,0,0,0,1,0,0],
   [0,2,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,2,1,0,0,0,1,0,1,0,1,0,0],
];

// размер ячейки
let side = 30;

// массив с координатами травы
let grassArr = [];

// массив с координатами травоядных
let grassEatersArr = [];

// инициализация холста
function setup() {
   frameRate(5);
   createCanvas(matrix[0].length * side, matrix.length * side);
   background('#acacac');

//   let gr = new Grass(1,2);
//   let emptyCells = gr.chooseCell(0);
//   console.log(emptyCells);


  for(let y = 0; y < matrix.length; ++y){
   for(let x = 0; x < matrix[y].length; ++x){
       if(matrix[y][x] === 1){
           let gr = new Grass(x,y);
           grassArr.push(gr);
       }
       else if(matrix[y][x] === 2){
        let ge = new GrassEater(x,y);
        grassArr.push(ge);
       }
    //    else if(matrix[y][x] == 8){

    //    }
   }
}


}

// непрерывный вызов рисования
function draw() {

   for (let y = 0; y < matrix.length; y++) {
       for (let x = 0; x < matrix[y].length; x++) {

           if (matrix[y][x] === 1) {
                fill("green");
           }
           else if (matrix[y][x] === 0) {
                fill("#acacac");
           }
           else if (matrix[y][x] === 2) {
            fill("orange");
       }
        rect(x * side, y * side, side, side);

        // fill("blau")
        // text(x+" "+y, x*side+side/3,y*side+side/3)
       }
   }

    for(let i in grassArr) {
        // let emptyCells = grassArr[i].chooseCell(0);
        // console.log(emptyCells);
        grassArr[i].mul();
    }

}

// Трава
class Grass{
    constructor(x, y) {
       this.x = x;
       this.y = y;
       this.multiply = 0;

        // координаты соседних ячеек
       this.directions = [
        [this.x - 1, this.y - 1],
        [this.x    , this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y    ],
        [this.x + 1, this.y    ],
        [this.x - 1, this.y + 1],
        [this.x    , this.y + 1],
        [this.x + 1, this.y + 1]
        ];
    }

    // найти все соседние ячейки с индексом character
    chooseCell(character) {
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] === character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    //  размножаться раз в 8 циклов
    mul() {
        this.multiply++;
        let newCell = random(this.chooseCell(0));
        console.log(newCell, this.multiply);
        if (this.multiply >= 8 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }

}

// Травоядное
class GrassEater {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.multiply = 0;
        this.directions = [];
    }

    // узнать новые координаты соседних ячеек после перемещения
    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] === character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    //  размножаться
    mul() {
        this.multiply++;
        let newCell = random(this.chooseCell(0));
        console.log(newCell, this.multiply);
        if (this.multiply >= 8 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }

    // передвинуться
    move() {
        this.getNewCoordinates()
        let newCell = random(this.chooseCell(0));
        matrix[this.y][this.x] = 0;
        matrix[newCell[1]][newCell[0]] = 2;
    }

    eat() {

    }
}




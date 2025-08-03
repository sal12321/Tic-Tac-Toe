let boxes = document.querySelectorAll(".gameBtn");
let resetBtn = document.querySelector(".restartBtn");
let turnBox = document.querySelector(".turnBox");
let turnBoxImage = document.querySelector(".turnImage");
let turnBoxText = document.querySelector(".turn");
let gameHeaderBox = document.querySelector(".gameHeader");
let gameBox = document.querySelector(".game");
let humanBtn = document.querySelector(".human");
let robotBtn = document.querySelector(".robot");
var gameFinished = 0;
var turnX = 1;
var moveByRobot;
var indexsForGame = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var setsOfSlicedPatternOfX = [];
var setsOfSlicedPatternOfO = [];
var patternsX = [];
var patternsO = [];
var startForIndex = 0;
// var currentGameType = 1; // 1 is for hunan play and 0 is for robot play

const onClickAudio = new Audio('onClick.wav');
const onResetAudio = new Audio('onReset.wav');
const afterVictoryAudio = new Audio('afterVictory.wav');



const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
]

boxes.forEach((box) => {  /// 1  

    box.setAttribute("index", startForIndex);
    box.setAttribute("disabled", "false");
    startForIndex = startForIndex + 1;
    console.log(box.getAttribute("index"));

}); // we have added the index in all the  game btn


boxes.forEach((box) => { //// 2


    box.addEventListener("click", () => {  ////   3


        if (turnX == 1) {

            if (box.innerHTML == "") { /// box can be edited
                console.log("the box is empty");
                let index = box.getAttribute("index");

                if (box.getAttribute("disabled") == "false") {
                    updateBox(turnX, box, index);

                }

                ///1: sending wether turn of x 0r o 
                // sending the box for updation
                // sending the index to store in patterns of o or x

            }

        }
        else {
            console.log("robot turn");
            

            for (boxForRobot in boxes){
                if(boxForRobot.innerHTML == ""){
                    console.log("This box is empty") ;
                    let randomIndex = Math.floor(Math.random() * indexsForGame.length);
                    updateBox(turnX, boxForRobot, randomIndex);
            }

            else {
                console.log("this box is already occupied");


            }

        });


})


function updateBox(updateBoxTurn, box, index) { //// 4
    onClickAudio.play();


    if (updateBoxTurn == 1) {
        console.log("updating x box");
        box.innerHTML = '<img src="cross.svg" alt="" height = "25px">';
        turnBoxImage.setAttribute("src", "circle.svg");
        patternsX.push(index);
        patternsX.sort();
        console.log("patternsX", patternsX); /// raw patterns of x obtained 
        indexsForGame = removeItemFromArray(indexsForGame, index);



        if (patternsX.length >= 3) {
            setsOfSlicedPatternOfX = getAllSets(patternsX) // recieving the  sliced patterns of uses of lenth 3;
            console.log("sets of slices patterns", setsOfSlicedPatternOfX);
            indexsForGame = checkForWinFunction(turnX, setsOfSlicedPatternOfX);


        }


        turnX = 0;

    }

    else {
        console.log("updating O box");
        box.innerHTML = '<img src="circle.svg" alt="" height = "25px">';
        turnBoxImage.setAttribute("src", "cross.svg");
        patternsO.push(index);
        patternsO.sort();
        console.log("patternsO", patternsO);
        indexsForGame = removeItemFromArray(indexsForGame, index);


        if (patternsO.length >= 3) {
            setsOfSlicedPatternOfO = getAllSets(patternsO) // recieving the  sliced patterns of uses of lenth 3;
            console.log("sets of slices patterns", setsOfSlicedPatternOfO);
            checkForWinFunction(turnX, setsOfSlicedPatternOfO);


        }
        turnX = 1;



    }




} // box has been updated and control has gone for win check




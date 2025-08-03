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
var src;
// var indexsForGame = [0,1,2,3,4,5,6,7,8];
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






gameModeChanger(1);

boxes.forEach((box) => {  /// 1  

    box.setAttribute("index", startForIndex);
    box.setAttribute("disabled", "false");
    startForIndex = startForIndex + 1;
    console.log(box.getAttribute("index"));


}); // we have added the index in all the  game btn


function printVictoryMessage(winner) {

    if (winner == 1) {
        console.log("x won the match");

        turnBoxImage.setAttribute("src", "cross.svg");
        turnBoxText.innerText = "WINS";
        turnBox.style.width = "200px";
        turnBox.style.color = "green";
        turnBox.style.fontSize = "2rem";






    }
    else {
        console.log("o won the match");
        // overflowe game box leagana ha 
        turnBoxImage.setAttribute("src", "circle.svg");
        turnBoxText.innerText = "WINS";
        turnBox.style.width = "200px";
        turnBox.style.color = "green";
        turnBox.style.fontSize = "2rem";



    }
    afterVictoryAudio.currentTime = 0;
    afterVictoryAudio.play();



}



function checkForWinFunction(userTurn, nestedPatterns) {

    switch (userTurn) {

        case 1: {
            {
                console.log("Checking Win for x");


                winPatterns.forEach((patternForWin) => {


                    nestedPatterns.forEach((patternFromNestedList) => {
                        console.log("pattern for check x :", patternFromNestedList);
                        console.log("pattern for win x :", patternForWin);
                        if (patternForWin[0] == patternFromNestedList[0] && patternForWin[1] == patternFromNestedList[1] && patternForWin[2] == patternFromNestedList[2]) {
                            console.log("x wins");
                            printVictoryMessage(1);
                            callFinishedFunction();
                        }

                    })

                })




            }
            break;

        }


        case 0: {
            {
                console.log("Checking Win for o");


                winPatterns.forEach((patternForWin) => {

                    nestedPatterns.forEach((patternFromNestedList) => {
                        console.log("pattern for check o :", patternFromNestedList);
                        console.log("pattern for win o :", patternForWin);
                        if (patternForWin[0] == patternFromNestedList[0] && patternForWin[1] == patternFromNestedList[1] && patternForWin[2] == patternFromNestedList[2]) {
                            console.log("O wins");
                            printVictoryMessage(0);
                            callFinishedFunction();
                        }

                    })

                })




            }
        }
            break;

    }







}

function getAllSets(arr) {




    // function combinationsOfThree(arr) {
    let result = [];

    // Ensure the array has at least 3 elements
    if (arr.length < 3) {
        return [];
    }

    // Generate combinations of 3 numbers
    for (let i = 0; i < arr.length - 2; i++) {
        for (let j = i + 1; j < arr.length - 1; j++) {
            for (let k = j + 1; k < arr.length; k++) {
                result.push([arr[i], arr[j], arr[k]]);
            }
        }
    }
    console.log(result);
    return result;
}

// Example usage:
// let numbers = [1, 2, 3, 4, 55,67,123];
// let combinations = combinationsOfThree(numbers);


// }





function updateBox(updateBoxTurn, box, index) { //// 4
    onClickAudio.play();


    if (updateBoxTurn == 1) {
        console.log("updating x box");
        box.innerHTML = '<img src="cross.svg" alt="" height = "25px">';
        turnBoxImage.setAttribute("src", "circle.svg");
        patternsX.push(index);
        patternsX.sort();
        console.log("patternsX", patternsX); /// raw patterns of x obtained 


        if (patternsX.length >= 3) {
            setsOfSlicedPatternOfX = getAllSets(patternsX) // recieving the  sliced patterns of uses of lenth 3;
            console.log("sets of slices patterns", setsOfSlicedPatternOfX);
            checkForWinFunction(turnX, setsOfSlicedPatternOfX);


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

        if (patternsO.length >= 3) {
            setsOfSlicedPatternOfO = getAllSets(patternsO) // recieving the  sliced patterns of uses of lenth 3;
            console.log("sets of slices patterns", setsOfSlicedPatternOfO);
            checkForWinFunction(turnX, setsOfSlicedPatternOfO);


        }
        turnX = 1;



    }




} // box has been updated and control has gone for win check




boxes.forEach((box) => { //// 2


    box.addEventListener("click", () => {  ////   3

        if (box.innerHTML == "") { /// box can be edited
            console.log("the box is empty");
            let index = box.getAttribute("index");

            if (box.getAttribute("disabled") == "false") {
                updateBox(turnX, box, index);
                // console.log("indexes left for game" , indexsForGame);



            }

            ///1: sending wether turn of x 0r o 
            // sending the box for updation
            // sending the index to store in patterns of o or x

        }
        else {
            console.log("this box is already occupied");


        }

    });


})


function callFinishedFunction() {

    boxes.forEach((box) => {

        box.setAttribute("disabled", "true");

    })

}


function gameBtnClear() {

    boxes.forEach((box) => {

        box.innerHTML  = "";

    })

}
function gameBtnClickable() {

    boxes.forEach((box) => {

        box.setAttribute("disabled" , "false");

    })

}

function resetFunction(){
    afterVictoryAudio.pause();

    onResetAudio.play();

    gameFinished = 0;
    turnX = 1;
    setsOfSlicedPatternOfX = [];
    setsOfSlicedPatternOfO = [];
    patternsX = [];
    patternsO = [];
    startForIndex = 0;
    turnBoxImage.setAttribute("src" , "cross.svg")
    turnBoxText.innerText = 'Turn' ;
    gameBtnClear();
    gameBtnClickable();
    // currentGameType = 1 ; // making to hunman vs human game type
    gameModeChanger(1) ;






}


resetBtn.addEventListener("click",resetFunction )

// resetBtn.addEventListener("click", () => {

//     afterVictoryAudio.pause();

//     onResetAudio.play();

//     gameFinished = 0;
//     turnX = 1;
//     setsOfSlicedPatternOfX = [];
//     setsOfSlicedPatternOfO = [];
//     patternsX = [];
//     patternsO = [];
//     startForIndex = 0;
//     turnBoxImage.setAttribute("src" , "cross.svg")
//     turnBoxText.innerText = 'Turn'



//     boxes.forEach((box) => {  /// 1  


//         box.setAttribute("disabled", "false");
//         startForIndex = startForIndex + 1;
//         box.innerHTML = "";



//     });

//     robotBtn.style.backgroundColor = "#1b3441ae";
//     humanBtn.style.backgroundColor = "#0c181f";
//     humanBtn.style.borderRadius = '10px 0 0  10px ' ;

// })

function gameModeChanger(currentGameType) {
     if(currentGameType){
       
        console.log("human mode was selected");
        robotBtn.style.backgroundColor = "#1b3441ae";
        humanBtn.style.backgroundColor = "#0c181f";
        humanBtn.style.borderRadius = '10px 0 0  10px ' ;
        robotBtn.style.borderRadius = '0' ;
        robotBtn.style.color = '#white' ;
        humanBtn.style.color = '#FF206E' ;



       afterVictoryAudio.pause();

      onResetAudio.play();

    gameFinished = 0;
    turnX = 1;
    setsOfSlicedPatternOfX = [];
    setsOfSlicedPatternOfO = [];
    patternsX = [];
    patternsO = [];
    startForIndex = 0;
    turnBoxImage.setAttribute("src" , "cross.svg")
    turnBoxText.innerText = 'Turn' ;
    // currentGameType = 1 ; // making to hunman vs human game type


    

  

       
     }
     else{
        console.log("robot mode was selected") ;
        
        robotBtn.style.backgroundColor = "#0c181f";
        humanBtn.style.backgroundColor = "#1b3441ae";
        robotBtn.style.borderRadius = ' 0 10px  10px  0' ;
        humanBtn.style.borderRadius = '0' ;
        humanBtn.style.color = 'white' ;
        robotBtn.style.color = '#FF206E' ;



        afterVictoryAudio.pause();

    onResetAudio.play();

    gameFinished = 0;
    turnX = 1;
    setsOfSlicedPatternOfX = [];
    setsOfSlicedPatternOfO = [];
    patternsX = [];
    patternsO = [];
    startForIndex = 0;
    turnBoxImage.setAttribute("src" , "cross.svg")
    turnBoxText.innerText = 'Turn' ;
    // currentGameType = 1 ; // making to hunman vs human game type
   

      
 

     }
   
}



humanBtn.addEventListener("click"   , changeToHumanMode);
robotBtn.addEventListener("click"  ,  changeToRobotMode);


   




// {

// function changeToHumanMode(){

//     gameModeChanger(1);
// }
// function changeToRobotMode(){
//     gameModeChanger(0);

// }} /// ye maine change kiya ha


// function robotModeGame(){



//     for (boxForRobot in boxes){
//         if(boxForRobot.innerHTML == ""){
//             console.log("This box is empty") ;
//             let randomIndex = Math.floor(Math.random() * indexsForGame.length);
//             updateBox(turnX, boxForRobot, randomIndex);
            
        
//             // let randomItem = indexsForGame[randomIndex];
//             // removeItemFromArray(indexsForGame, randomItem);





//         }

//     }



// }



// function removeItemFromArray(array, item) {
//     let index = array.indexOf(item);
//     if (index !== -1) {
//       array.splice(index, 1);
//     }
//     return array;


//   }
  







// while (indexsForGame.length != 0) {
//   console.log(indexsForGame.length);
//   robotModeGame();
//   console.log("Indexes left for game:", indexsForGame);
// }

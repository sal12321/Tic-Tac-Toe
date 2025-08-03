// // // function generateCombinations(arr, k) {
// // //     let result = [];
// // //     let combination = [];

// // //     function backtrack(start) {
// // //         // If the combination is of the desired length, add it to the result
// // //         if (combination.length === k) {
// // //             result.push([...combination]);
// // //             return;
// // //         }

// // //         // Iterate through the array to create combinations
// // //         for (let i = start; i < arr.length; i++) {
// // //             combination.push(arr[i]);
// // //             backtrack(i + 1);
// // //             combination.pop();
// // //         }
// // //     }

// // //     backtrack(0);
// // //     return result;
// // // }

// // // function combinationsOfThree(arr) {
// // //     // Ensure the array has at least 3 elements
// // //     if (arr.length < 3) {
// // //         return [];
// // //     }
// // //     return generateCombinations(arr, 3);
// // // }

// // // // Example usage:
// // // let numbers = [1, 2 , 3 , 5 ,6,9,1,123,13  ];
// // // let combinations = combinationsOfThree(numbers);
// // // console.log(combinations);


// // function combinationsOfThree(arr) {
// //     let result = [];
    
// //     // Ensure the array has at least 3 elements
// //     if (arr.length < 3) { 
// //         return [];
// //     }
    
// //     // Generate combinations of 3 numbers
// //     for (let i = 0; i < arr.length - 2; i++) {
// //         for (let j = i + 1; j < arr.length - 1; j++) {
// //             for (let k = j + 1; k < arr.length; k++) {
// //                 result.push([arr[i], arr[j], arr[k]]);
// //             }
// //         }
// //     }
    
// //     return result;
// // }

// // // Example usage:
// // let numbers = [1, 2, 3, 4,5];
// // let combinations = combinationsOfThree(numbers);
// // console.log(combinations);

// let boxes = document.querySelectorAll(".gameBtn");
// var indexsForGame = [0,1,2,3,4,5,6,7,8];


// function robotModeGame(){
//     boxes.forEach((box), () =>{
//         if(box.innerHTML == ""){
//             console.log("This box is empty") ;
//             let randomIndex = Math.floor(Math.random() * indexsForGame.length);
//             let randomItem = indexsForGame[randomIndex];
//             indexsForGame = removeItemFromArray(indexsForGame, randomItem);


//         }
//     })



// }
// function removeItemFromArray(array, item) {
//     let index = array.indexOf(item);
//     if (index !== -1) {
//       array.splice(index, 1);
//     }
//     return array;
//   }
  

  
// //   indexsForGame = removeItemFromArray(indexsForGame, itemToRemove);
  


// while (indexsForGame.length != 0 ){
//     console.log(indexsForGame.length )
//     robotModeGame();
//     console.log("indexes left for game" , indexsForGame);
// }

let boxes = document.querySelectorAll(".gameBtn");
var indexsForGame = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function robotModeGame() {
  boxes.forEach((box, index) => {
    if (box.innerHTML === "" && indexsForGame.includes(index)) {
      console.log("This box is empty");
      let randomIndex = Math.floor(Math.random() * indexsForGame.length);
      let randomItem = indexsForGame[randomIndex];
      
      // Simulate the robot's move by setting the box's innerHTML
      box.innerHTML = "O"; // Or any other symbol to mark the robot's move
      
      indexsForGame = removeItemFromArray(indexsForGame, randomItem);
    }
  });
}

function removeItemFromArray(array, item) {
  let index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
}

while (indexsForGame.length != 0) {
  console.log(indexsForGame.length);
  robotModeGame();
  console.log("Indexes left for game:", indexsForGame);
}

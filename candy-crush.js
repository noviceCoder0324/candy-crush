const candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
let board = [];
const rows = 9;
const columns = 9;
let score = 0;

let currTile;
let otherTile;

window.onload = () => {
  startGame();

  window.setInterval(() => {
    crushCandy();
  }, 100);
}

function randomCandy() {
  return candies[Math.floor(Math.random()* candies.length)];
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      // <img id="0-0"..."9-9" src="./images/Red.png">
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = "./images/" + randomCandy() + ".png";

      //Grag functionality
      tile.addEventListener("dragstart", dragStart); //click on a candy, initialize drag process
      tile.addEventListener("dragover", dragOver); //clicking on candy, moving mouse to drag the candy
      tile.addEventListener("dragenter", dragEnter); //draging candy onto another candy
      tile.addEventListener("dragleave", dragLeave); //leave candy over another candy
      tile.addEventListener("drop", dragDrop); //dropping a candy over another candy
      tile.addEventListener("dragend", dragEnd); //after drag process conpleted, we swap candies
      

      document.getElementById("board").append(tile);
      row.push(tile)
    }
    board.push(row);
  } 
  console.log(board);
}

function dragStart() {
  //this refers to tile that was clicked on for dragging
  currTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
  otherTile = this;
}

function dragEnd() {

  if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
    return;
  }

  let currCoords = currTile.id.split("-"); //id = "0-0" => ["0", "0"]
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);
  
  let moveLeft = c2 === c-1 && r === r2;
  let moveRight = c2 === c+1 && r === r2;
  let moveUp = c2 === c && r === r2-1;
  let moveDown = c2 === c && r === r2+1;
  
  let isAjacent = moveLeft || moveRight || moveUp || moveDown;
  
  if (isAjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    let validMove = checkValid();
    if (!validMove) {
      //if not valid, switch it back
      let currImg = currTile.src;
      let otherImg = otherTile.src;
      currTile.src = otherImg;
      otherTile.src = currImg;
    }
  }

}

function crushCandy() {
  //crushFive();
  //crushFour();
  crushThree();
}

function crushThree() {
  //check rows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns-2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c+1];
      let candy3 = board[r][c+2];
      if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
      }
    }
  }

  //check columns
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows-2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r+1][c];
      let candy3 = board[r+2][c];
      if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
      }
    }
  }
}

function checkValid() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns-2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c+1];
      let candy3 = board[r][c+2];
      if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
        return true;
      }
    }
  }

  //check columns
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows-2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r+1][c];
      let candy3 = board[r+2][c];
      if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
        return true;
      }
    }
  }
  return false;
}

function slideCandy() {

}
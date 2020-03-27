let num1;
let num2;
let blocksValues = new Array(16).fill(null);
const blocks = document.getElementsByClassName("blocks");

console.log(blocks.length);
//resets all blocks to 0
const resetBlockCount = () => (blocksValues = new Array(16).fill(0));

const reassignRandom = () => {
  num1 = randomNum();
  num2 = generateNum2();
};

//generate first random number between 1 and 16
const randomNum = () => Math.floor(Math.random() * 16);
const generateNum2 = () => {
  num2 = randomNum();
  if (num2 === num1) {
    return generateNum2();
  }
  return num2;
};
num1 = randomNum();
num2 = generateNum2();

//set current count and reset array count

function assignDomBlocks(value, i) {
  console.log(blocks[i], i);
  blocks[i].className = `blocks block-${value}`;
  blocks[i].childNodes[1].innerText = value;
}

const clearDomBlocks = i => {
  blocks[i].className = `blocks`;
  blocks[i].childNodes[1].innerText = null;
};

const assignIndex = (value, i) => (blocksValues[i] = value);

///assign to array
function onAssignArray() {
  blocksValues.forEach((value, i) => {
    if (value) {
      assignDomBlocks(value, i);
    } else {
      clearDomBlocks(i);
    }
  });
}

// initial assign
function InitialassignClasses() {
  //change values
  assignIndex(2, num1);
  assignIndex(2, num2);
  //assign dom

  //console.log(blocksValues);
  onAssignArray();
}

InitialassignClasses();

//fill in the block with the random

$("#reset").click(function() {
  // console.log("reseting")
  clearBlocks();
  resetBlockCount();
  reassignRandom();
  InitialassignClasses();
});

function clearBlocks() {
  return blocks.each(function() {
    $(this).removeClass();
    $(this).addClass("blocks");
    $(this)
      .find("span")
      .text(" ");
  });
}

// blocksArray.forEach(function (b, i) {
//     console.log(i, 'modulus result', i % 4)
// })

///check the next blocks before end right

function remainingRight(num) {
  let rb;
  if (num === 3) {
    rb = 0;
  } else if (num === 2) {
    rb = 1;
  } else if (num === 1) {
    rb = 2;
  } else if (num === 0) {
    rb = 3;
  }
  return rb;
}

function onMoveRight() {
  let currentBlocks = [];

  //get the ones that need to be changed
  blocksValues.forEach(function(value, i) {
    //console.log(value, i);
    if (value) {
      currentBlocks.push({ value, i });
    }
  });

  //clear current blocks if next is empty
  // currentBlocks.forEach(b => {
  //   const rem = remainingRight(b % 4);
  //   console.log(rem);
  //   if (!blocksValues[b + 1] || rem > 0) {
  //     assignIndex(null, b);
  //   }
  // });

  console.log(blocksValues);
  currentBlocks.forEach(({ value, i }) => {
    const r = remainingRight(i % 4);
    console.log(value, i, r);

    if (r !== 0) {
      // if one of the next blocks is
      let found = false;
      for (let c = 1; c < r; c++) {
        if (blocksValues[i + c] && blocksValues[i + c] === value) {
          blocksValues[i] = null;
          blocksValues[i + c] = value * 2;
          found = true;
          break;
        } else if (blocksValues[i + c] && !blocksValues[i + c - 1]) {
          blocksValues[i] = null;
          blocksValues[i + c - 1] = value;
          found = true;
          break;
        }
      }
      if (!found) {
        blocksValues[i + r] = value;
        blocksValues[i] = null;
      }
    }
  });

  console.log(blocksValues);

  onAssignArray();

  return;
  currentBlock.forEach(function(b) {
    //check if next one is same as current
    //check if next one is zero
    //  debugger
    const remainingBlocksRight = calculateRemainingBLocks((b.block + 1) % 4);
    console.log(calculateRemainingBLocks((b.block + 1) % 4));
    console.log("remainder", (b.block + 1) % 4);
    for (let i = 1; i < remainingBlocksRight; i++) {
      console.log(i, remainingBlocksRight, blocksArray[b.block + i]);
      if (blocksArray[b.block + i] === blocksArray[b.block]) {
        blocksArray[b.block + i] =
          blocksArray[b.block + i] + blocksArray[b.block];
        return;
      } else if (blocksArray[b.block + remainingBlocksRight] === 0) {
        blocksArray[b.block + remainingBlocksRight] = blocksArray[b.block];
      }
    }

    // if (blocksArray[b.block] === blocksArray[b.block + 1] || blocksArray[b.block + 1] === 0) {

    //     // blocksArray[b.block + 1] = blocksArray[b.block + 1] + b.num
    //     // blocksArray[b.block] = 0
    // }
  });
  console.log(currentBlock, blocksArray);
  //r clearBlocks()
  onAssignArray();
}

///moving blocks
$(this).keydown(function(e) {
  //console.log(e)
  //w is 87, a is 65, s is 83, d is 68
  // do the math here
  e.preventDefault();
  if (e.keyCode === 87) {
    console.log("move up");
  } else if (e.keyCode === 65) {
    console.log("move left");
  } else if (e.keyCode === 83) {
    console.log("move down");
  } else if (e.keyCode === 68) {
    console.log("move right");
    onMoveRight();
  } else if (e.keyCode === 82) {
    clearBlocks();
    resetBlockCount();
    reassignRandom();
    InitialassignClasses();
  }
});

//putIntoBlock()
// initialAssign()
// reassignBlocks()

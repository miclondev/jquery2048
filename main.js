$('document').ready(function () {
    let num1
    let num2
    let blocksArray = []
    //get all 16 blocks
    var blocks = $('.blocks');



    //generate first random number between 1 and 16
    function randomNum() {
        return Math.floor(Math.random() * 16) + 1
    }
    //generate second random number but check to make sure its not the same as rando number 1
    //use recurssion to retry
    

    function generateNum2() {
        num2 = randomNum()
        if (num2 === num1) {
            return generateNum2()
        }
        return num2;
    }

    // num1 = 2
    // num2 = 3

    num1 = randomNum()
    num2 = generateNum2()

    
    //set current count and reset array count
    function resetBlockCount() {
        blocksArray = []
        for (let i = 0; i < 16; i++) {
            blocksArray.push(0)
        }
    }

    resetBlockCount()

    //reassign random number
    function reassignRandom() {
        num1 = randomNum()
        num2 = generateNum2()
    }


    function assignNumber(num, count) {
        let value = num - 1
        blocksArray[value] = blocksArray[value] + count
    }

    ///assign to array
    function onAssignArray() {
        blocksArray.forEach(function (b, i) {
            if (b !== 0) {
                //console.log(b)
                blocks.eq(parseInt(i)).addClass('block-2')
                blocks.eq(i).find('span').text(b)
            }
        })
    }

    function assing() {
        blocksArray.forEach(function (b, i) {
            // console.log(b)
            blocks.eq(parseInt(i)).addClass('block-2')
            blocks.eq(i).find('span').text(b)
        })
    }


    function InitialassignClasses() {
        blocks.each(function () {
            var currentBlock = $(this)
            var blockNum = currentBlock.attr('data-block')
            if (parseInt(blockNum) === num1 || parseInt(blockNum) === num2) {
                assignNumber(blockNum, 2)
            }
        })
        onAssignArray()
    }

    InitialassignClasses()


    //fill in the block with the random 


    $('#reset').click(function () {
        // console.log("reseting")
        clearBlocks()
        resetBlockCount()
        reassignRandom()
        InitialassignClasses()
    })


    function clearBlocks() {
        return blocks.each(function () {
            $(this).removeClass()
            $(this).addClass('blocks')
            $(this).find('span').text(' ')
        })
    }

    // blocksArray.forEach(function (b, i) {
    //     console.log(i, 'modulus result', i % 4)
    // })


    ///check the next blocks before end right

    function calculateRemainingBLocks(num) {
        num = parseInt(num)
        let rb
        if (num === 1) {
            rb = 3
        } else if (num == 2) {
            rb = 2
        } else if (num == 3) {
            rb = 1
        }
        return rb
    }

    function onMoveRight() {
        let currentBlock = []
        console.log(blocksArray)
        //get the ones that need to be changed
        blocksArray.forEach(function (b, i) {
            //check if not zero and not at end of move/ check if previous has value
            if (b !== 0 && (i + 1) % 4 !== 0) {
                currentBlock.push({ block: i, num: b, id: i+1 })
            }
        })

        currentBlock.forEach(function (b) {
            //check if next one is same as current
            //check if next one is zero
          //  debugger
            const remainingBlocksRight = calculateRemainingBLocks((b.block + 1) % 4)
            console.log(calculateRemainingBLocks((b.block + 1) % 4))
            console.log('remainder', (b.block + 1) % 4)
            for(let i = 1; i < remainingBlocksRight; i++){
                console.log(i, remainingBlocksRight, blocksArray[b.block + i])
              if(blocksArray[b.block + i] === blocksArray[b.block]){
                    blocksArray[b.block + i] = blocksArray[b.block + i] + blocksArray[b.block]
                    return
                }else if(blocksArray[b.block + remainingBlocksRight] === 0){
                    blocksArray[b.block + remainingBlocksRight] = blocksArray[b.block]
                }
            }


            
            // if (blocksArray[b.block] === blocksArray[b.block + 1] || blocksArray[b.block + 1] === 0) {
               
            //     // blocksArray[b.block + 1] = blocksArray[b.block + 1] + b.num
            //     // blocksArray[b.block] = 0
            // }

        })
        console.log(currentBlock, blocksArray)
       //r clearBlocks()
        onAssignArray()
    }


    ///moving blocks
    $(this).keydown(function (e) {
        //console.log(e)
        //w is 87, a is 65, s is 83, d is 68
        // do the math here
        e.preventDefault()
        if (e.keyCode === 87) {
            console.log('move up')
        } else if (e.keyCode === 65) {
            console.log('move left')
        } else if (e.keyCode === 83) {
            console.log('move down')
        } else if (e.keyCode === 68) {
            console.log('move right')
            onMoveRight()
        } else if (e.keyCode === 82) {
            clearBlocks()
            resetBlockCount()
            reassignRandom()
            InitialassignClasses()
        }
    })

    //putIntoBlock()
    // initialAssign()
    // reassignBlocks()
})
$('document').ready(function () {
    //generate first random number between 1 and 16
    function randomNum() {
        return Math.floor(Math.random() * 16) + 1
    }
    //generate second random number but check to make sure its not the same as rando number 1
    //use recurssion to retry
    let num1
    let num2

    function generateNum2() {
        console.log('generating num 2')
        num2 = randomNum()
        if (num2 === num1) {
            console.log('is same regenerating')
            return generateNum2()
        }
        return num2;
    }

    num1 = randomNum()
    num2 = generateNum2()

    let blocksArray = []
    //set current count and reset array count
    function resetBlockCount() {
        blocksArray = []
        for (let i = 0; i < 16; i++) {
            blocksArray.push(0)
        }
    }

    resetBlockCount()
    console.log(blocksArray)
    console.log(num1, num2)

    //reassign random number
    function reassignRandom() {
        num1 = randomNum()
        num2 = generateNum2()
    }

    //get all 16 blocks
    var blocks = $('.blocks');

    blocks.each(function (b, i) {
        var currentBlock = $(this)
        var blockNum = currentBlock.attr('data-block')
        console.log(blockNum)

    })

    function assignNumber(num, count) {
        let value = num - 1
        blocksArray[value] = blocksArray[value] + count
        console.log(blocksArray)
    }

    ///assign to array
    function onAssignArray() {
        blocksArray.forEach(function (b, i) {
            if (b !== 0) {
                console.log(b)
                blocks.eq(parseInt(i)).addClass('block-2')
                blocks.eq(i).find('span').text(b)
            }
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
        console.log("reseting")
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

    function onMoveRight() {
        blocksArray.forEach(function (b, i) {
            if (b !== 0) {
                if (b % 4 !== 0) {
                    console.log(i+1)
                    const nextBlockInArray = i + 1
                    const currentCount = b
                    const nextCount = blocksArray[nextBlockInArray]

                   
                    blocksArray[nextBlockInArray] = currentCount + nextCount 
                    blocksArray[i] = 0
                }
            }
        })
        console.log(blocksArray)
        onAssignArray()
    }


    ///moving blocks
    $(this).keydown(function (e) {
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
        }
    })

    //putIntoBlock()
    // initialAssign()
    // reassignBlocks()
})
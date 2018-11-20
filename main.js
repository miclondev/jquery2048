$('document').ready(function () {

    //generate first random number between 1 and 16
    function randomNum() {
        let num = Math.floor(Math.random() * 16) + 1
        return num
    }

    //generate second random number but check to make sure its not the same as rando number 1
    //use recurssion to retry

    function generateNum2(check) {
        //generate num 2
        var num2 = randomNum()
        //check if num 2 i
        if (num2 === check) {
            console.log('is equal regenerating')
            var num3 = randomNum()
            return num3
        }
        return num2;
    }

    let num1 = randomNum()
    let num2 = generateNum2(num1)

    //make sure num1 is not = to num 2 
    function reassignRandom() {
        num1 = randomNum()
        num2 = generateNum2(num1)
    }

    //get all 16 blocks
    var blocks = $('.blocks');
    //create an array with 1 to 16
    var blocksArray = Array.from(Array(17).keys())
    //function to remove a number
    function removeFilled(num) {
        var index = blocksArray.indexOf(num)
        // console.log(index)
        return blocksArray.splice(index, 1)
    }

    removeFilled(0)

    console.log(blocksArray)
    //find a way to keep track of filled and nums
    //generate array of 16 objects with current number
    //dont thing we need blocksArray now

    let mainArr = []

    blocksArray.forEach(function (num) {
        mainArr.push({
            num: num,
            current: 0,
            filled: false
        })
    })

    console.log(blocksArray)
    //reassign blocks
    function reassignBlocks() {
        return mainArr.forEach(function (n) {
            if (n.filled) {
                blocks.each(function (i) {
                    let blockNumber = $(this).attr('data-block')
                    let currentBlock = $(this)
                    console.log(typeof (blockNumber))
                    if (n.num === parseInt(blockNumber)) {
                        currentBlock.find('span').text('2')
                        currentBlock.addClass('block-2')
                    }
                })
            }
        })
    }


    $('#reset').click(function () {
        console.log("reset red")
        reassignRandom()
        console.log(num1, num2)
        resetCurrentArray()
        clearBlocks()
        putIntoBlock()
        reassignBlocks()
    })


    function clearBlocks() {
        return blocks.each(function () {
            $(this).removeClass()
            $(this).addClass('blocks')
            $(this).find('span').text(' ')
        })
    }

    function putIntoBlock() {
        return blocks.each(function (index) {
            var blockNumber = $(this).attr('data-block')
            if (parseInt(blockNumber) === num1 || parseInt(blockNumber) === num2) {
                mainArr[blockNumber].current = 2
                mainArr[blockNumber].filled = true
            }
        })
    }

    function initialAssign() {
        return mainArr.forEach(function (num) {
            if (num.num === num1 || num.num === num2) {
                console.log('initial')
                console.log(num.num, num1, num2)
                num.current = 2
                num.filled = true
            }
        })
    }

    function resetCurrentArray() {
        let newArr = []
        blocksArray.forEach(function (num) {
            newArr.push({
                num: num,
                current: 0,
                filled: false
            })
        })
        mainArr = newArr
    }

    function onMoveRight() {
        console.log(mainArr)
        mainArr.forEach(function(b){
            //console.log(b)
            let nextnum = b.num + 1

            if(b.current > 0){
                b.current = 0
                b.filled = false
            }

            if(nextnum === b.num){
                b.current = 2
                b.filled = true
            }
        })
        console.log(mainArr)
     clearBlocks() 

        // mainArr.forEach(function (b, i) {
        //     console.log(b,i)
        //     let modI = i + 1
        //     if (modI > 4) {
        //         modI = modI % 4
        //         if (modI === 0) {
        //             modI = 4
        //         } 
        //     }
        //         if (b.filled === true) {
        //             b.filled = false
        //             b.current = 0 

        //             let next = b.num + 1
        //             console.log(b.num)
        //             console.log(next, typeof (next), mainArr[next])
        //             mainArr[next].filled = true
        //             mainArr[next].current = 2
        //         }
        //         //console.log(nextnum, i)
            
        // })
        reassignBlocks()
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
    initialAssign()
    reassignBlocks()
})
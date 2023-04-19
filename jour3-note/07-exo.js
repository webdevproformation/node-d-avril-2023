

function ranger(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("ranger sa chambre")
            resolve()
        } , 1000)

    })
}

function repassage(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("faire le repassage")
            resolve()
        } , 3000)
    })
    
}

function cafe(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("prendre un café")
        } , 1000)
    })

}

async function travail(){
    await ranger()
    await repassage()
    await cafe()
}

travail()
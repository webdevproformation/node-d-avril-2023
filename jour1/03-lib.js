const addition = (a, b) => {
    console.log(a + b)
}

const soustraction = (a , b) => {
    console.log( a - b ) ;
}

// système de module CJS

module.exports = {
    addition : addition ,
    soustraction : soustraction
}
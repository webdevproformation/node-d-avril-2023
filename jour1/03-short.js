
// solution 2 export 
module.exports.division = (a, b) => {
    console.log(a/b)
}

// solution 2 export bis
module.exports.puissance = function(a, b) {
    console.log(a ** b)
}

/* // solution 1 export 
module.exports = {
    division : division
} */

// utiliser directement exports 
exports.multiplication = function(a, b){
    console.log(a * b); 
}


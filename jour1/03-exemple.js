
module.exports.getId = () => {
    console.log(1); 
}

module.exports.a = ["lundi" , "dimanche"];

module.exports.phrase = "lorem ipsum" ;
/* 
module.exports = {
    getId : getId ,
    a : a ,
    phrase : phrase
}
*/
module.exports.test = () => {
    console.log("je suis le test");
}

/* module.exports = { // attention ça écrase les module.exports.a
    test : test
} */
/* module.exports = {
    getId : getId ,
    a : a ,
    phrase : phrase
}
 */
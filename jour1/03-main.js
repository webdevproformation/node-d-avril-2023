// import { addition, soustraction } from "./03-lib.js"
// ES d'import 

// CJS 
// conseil => bonne pratique 
// require au debut
const { addition, soustraction } = require("./03-lib") ; 
const { a, getId , phrase , test} = require("./03-exemple")
const dessinerTriangle = require("./03-fonction")
const tutu = require("./03-fonction") ; // possibilité de renommer le module.exports = 

addition(1,2); // 3

soustraction( 10 , 5 ); // 5

console.log(a);
console.log(phrase);
getId(); 
test()
dessinerTriangle(); 
tutu(); 

// node 03-main.js


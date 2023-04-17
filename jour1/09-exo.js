const _ = require("lodash");

// solution lodash et sa méthode random
const r = [];
for(let i = 0 ; i < 10 ; i++){
    r.push( _.random(0,100) )
}

console.log(r);

// solution sans librairie
const r2 = [];
for(let i = 0 ; i < 10 ; i++){
    r2.push( Math.round(Math.random() * 100 ) )
}
console.log(r2);

// ok
console.log(
    _.fill(Array(10),0)
    .map(el=>_.random(0,100))
)

// autre solution possible 
console.log( Array.from( new Array(10) , function(){ return _.random(0,100) } ))


const tab = new Set() // ES6 => 2015 
while( tab.size < 10 ){
    tab.add(_.random(0,100))
}
console.log(tab);

const tab2 = new Set()
tab2.add(10)
tab2.add(10)
console.log(tab2)


// http => créer des serveurs !! 
// express => couche via en glober le module http natif de nodejs 
// idéal pour créer de API 
// permet de créer très très facilement des serveurs http 

// await async => rappeler 
// fetch ()
// CJS module 
// require module.exports
// ES Module 
// npm init --yes

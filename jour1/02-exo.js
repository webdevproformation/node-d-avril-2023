const semaine = ["lundi", "mardi", "mercredi"];

semaine.push("jeudi"); 

console.log(semaine)
// cls windows 
// clear MacOS 
console.log("solution 1") 
const semaineMajuscule = semaine.map(function(jour){
    return jour.toUpperCase()
})
console.log(semaineMajuscule); 

console.log("solution 2") 
const resultat = [];
for(let jour of semaine){
    resultat.push( jour.toUpperCase());
}
console.log(resultat); 

/**
Autre solution JA

let semaine=["lundi", "mardi", "mercredi"];
console.log(semaine, " avant ajout");

semaine=[...semaine, "jeudi"]; // on préfère travailler sur une copie du tableau et ensuite l'affecter à la variable (qui doit donc être en let)
console.log(semaine, " après ajout");

const semaineToUppercase=semaine.map(jour=>jour.toUpperCase());
console.log(semaineToUppercase, " en majuscule");
 * 
 */
/*
Solution Cédric
const semaine = ["lundi", "mardi", "mercredi"];
console.log(semaine);
semaine.push("jeudi");
console.log(semaine);
for (let index in semaine) {
    semaine[index] = semaine[index].toUpperCase();
}
console.log(semaine);
*/
/*
Solution Faouzi 
const semaine = ["lundi", "mardi", "mercredi"];
semaine.push("jeudi");
let i = 0
semaine.forEach((item)=>{
    semaine[i++] = item.toUpperCase();
})
console.log(semaine);
*/
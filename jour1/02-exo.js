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

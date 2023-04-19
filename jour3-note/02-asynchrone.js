// programmation synchrone : lorsque le code exécute dans l'ordre dans lequel vous l'avez écrit

const a = 1 ;
const b = 2 ;
console.log(a + b); 

// cd ../jour3-note
// node 02-asynchrone.js

// programmation asynchrone ???? : lorsque le code exécute dans un ordre différent ce celui que vous avez écrit 

const c = 1 ;

setTimeout( function(){ // stocker pendant 1 s SANS bloquer la suite du script
    console.log("ici") // exécution à la fin du code  => la fin du code n'est pas la dernière ligne 
}); 

console.log(c); // je passe à la suite execution 


// le fait que javascript n'attende pas que le code du setTimeout() soit exécuté à 100% pour passer à la suite => ça peut entrainer de pb 


const d = 10 ;
let e ;

setTimeout(  function(){
    e = 30 ;
    console.log("fin")
})

console.log("pb" ,d + e); // NaN // e = undefined mais pas 30


// si vous écrivez votre code ainsi => au lieu d'avoir 40 / NaN ??? 
let clients ;

fetch("https://jsonplaceholder.typicode.com/users") 
// fonction asynchrone => prendre un certain temps ET Javascript ne bloque pas la suite de l'exécution 
        .then(reponse => reponse.json())
        .then(data => {
            clients = data
            console.log("fin fetch")
        })

console.log("recupérer les clients" ,clients);

//node 02-asynchrone.js

// => comment faire en sorte que javascript executé le code dans l'ordre dans lequel je l'écris ?
//  3 solutions 
// callback (solution historique) 
// new Promise ()
// await et async avec des Promises  (ES6 de javascript => 2015)
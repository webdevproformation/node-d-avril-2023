console.log("bonjour les amis");

// <script></script>  dans un fichier .html 
// exécuter le fichier .html dans un navigateur web => Open With Live Serveur 
// cd jour1
// node 01-hello.js 
// binaire fichier-a-executer.js 

// tout ce que l'on a vu en javascript 
// variable => string / number / boolean / array / objet 
// traitement sur ces types : concaténation / condition / fonction .map() .reduce()
// + ++ --  ... 
// if switch for for of ...
// function anonyme / fonction () => {}
// objet 

// TOUT SAUF window

console.log(window) ; // n'existe pas => déclenche une erreur fatale  
// erreur dans la console Nodejs 
// at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
// at node:internal/main/run_main_module:23:47

// https://webdevpro.net/reinitialiser-completement-visual-studio-code-windows/

// la stack d'exécution => pile d'execution => l'enchainement de l'exécution
// du terminal => fichier 

// cas pratique 
// créer un fichier 02-exo.js => ce fichier contient une variable 
// un tableau qui s'appelle semaine qui contient les valeurs suivantes 

// ["lundi", "mardi", "mercredi "]

// ajotuer à la fin de la variable le mot "jeudi"
// pouvez transformer le tableau  ["lundi", "mardi", "mercredi ", "jeudi"]
// pouvez transformer le tableau  ["LUNDI", "MARDI", "MERCREDI ", "JEUDI"]
// afficher dans le terminal le tableau transformé 
const express = require("express");
const route = require("./route")
const {connect} = require("mongoose");
require("dotenv").config();

const URI = process.env.NODE_ENV === "production" ? process.env.BDD_PROD : process.env.BDD_DEV

// set NODE_ENV=production  
// set NODE_ENV=
// variable dans un terminal en ligne de commande 
/* console.log("ici" ,process.env.NODE_ENV)
console.log("ici" ,URI) */

connect(URI)
    .then(() => console.log("connexion à MongoDB réussie"))
    .catch((ex) => console.log(ex))

const PORT = 4003 ;

const app = express()

app.use(express.json()) ; // middleware 

app.use(route) ; // ça permet de stocker les routes dans un fichier à partie

app.listen(PORT , () => console.log(`express start sur port ${PORT}`));

// fichier d'entrée de notre API => chef d'orchestre => créer le serveur / appeler tout ce qu'il faut pour qu'il fonctionne 


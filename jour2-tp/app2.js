const express = require("express")
const { articles } = require("./bdd")
const { rechercheArticle } = require("./lib")
const PORT = 4003 ;

const serveur = express();

// CRUD pour les articles 

serveur.use(express.json()); // Attention au middleware

/* serveur.get("/:id", (request, reponse) => {
    reponse.json({msg : "méthode 1"})
}) */

serveur.get("/:id/:id2", (request, reponse) => {
    reponse.json({msg : "méthode 2"})
})


serveur.listen(PORT , () => console.log(`le serveur express est start sur le port ${PORT}`))
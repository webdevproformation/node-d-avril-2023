const express = require("express")
const PORT = 4003 ;

const serveur = express();

// CRUD pour les articles 

serveur.use(express.json()); // Attention au middleware

/* serveur.get("/read/:id", (request, reponse) => { // récupérer un article
    reponse.json({msg : "méthode 1"})
})  */

serveur.get("/read/:id/:id2?", (request, reponse) => { // récupérer le commentaire de l'article :id
    const id = request.params.id
    const id2 = request.params.id2
    if(!id2) return reponse.json({msg : "méthode 1"}) // article 

    reponse.json({msg : "méthode 2"}) // commentaire
})


serveur.listen(PORT , () => console.log(`le serveur express est start sur le port ${PORT}`))
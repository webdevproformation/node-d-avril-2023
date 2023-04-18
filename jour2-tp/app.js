const express = require("express")
const { articles } = require("./bdd")
const { rechercheArticle } = require("./lib")
const PORT = 4003 ;

const serveur = express();

// CRUD pour les articles 

serveur.use(express.json()); // Attention au middleware

serveur.get("/article/:id" , (request , reponse) => {
    const id = request.params.id ;

    if(id === "all") return reponse.json(articles);

    const article = rechercheArticle(articles , id)
    if(!article) return reponse.status(404).json({msg : "erreur 404"})

    return reponse.json(article)

}) ;

serveur.post("/article" , (request , reponse) => {
    const article = request.body ;

    // ajouter l'id
    // ajouter les commandes 
    //article.id = articles[articles.length -1].id + 1
    article.id = Date.now()
    article.commentaires = []
    articles.push(article)
    return reponse.json({msg : "insert ok"})

});

serveur.put("/article/:id" , (request , reponse) => {
    const id = request.params.id ;
    const { body } = request ;
    const article = rechercheArticle(articles , id)
    if(!article) return reponse.status(404).json({msg : "erreur 404"})

    const index = articles.indexOf(article)

    articles[index].titre = body.titre;
    articles[index].contenu = body.contenu;

    return reponse.json({msg : "update ok"})

});

serveur.delete("/article/:id" , (request , reponse) => {
    const id = request.params.id ;
    const article = rechercheArticle(articles , id)
    if(!article) return reponse.status(404).json({msg : "erreur 404"})
    const index = articles.indexOf(article)
    articles.splice(index, 1);
    return reponse.json({msg : "delete ok"})
});


// CRUD pour les commentaires 



serveur.listen(PORT , () => console.log(`le serveur express est start sur le port ${PORT}`))
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

serveur.get("/commentaire/:idArticle" , (request , reponse) => {
    const idArticle = request.params.idArticle ;
    const article = rechercheArticle(articles , idArticle)
    return reponse.json(article.commentaires)
})
serveur.post("/commentaire/:idArticle" , (request , reponse) => {
    const idArticle = request.params.idArticle ;
    const {body} = request
    const article = rechercheArticle(articles , idArticle)
    if(!article) return reponse.status(404).json({msg : "erreur 404"})
    const index = articles.indexOf(article)
    body.id = Date.now()
    articles[index].commentaires.push(body)
    return reponse.json({msg : "insert commentaire ok"})
});

serveur.put("/commentaire/:idArticle/:idCommentaire" , (request , reponse) => {
    const idArticle = request.params.idArticle ;
    const idCommentaire = request.params.idCommentaire ;
    const {body} = request
    const article = rechercheArticle(articles , idArticle)
    if(!article) return reponse.status(404).json({msg : "erreur 404"})
    const index = articles.indexOf(article)

    const commentaireAModifier = articles[index].commentaires.find(function(commentaire){
        return commentaire.id == idCommentaire
    })
    if(!commentaireAModifier) return reponse.status(404).json({msg : "erreur 404 commentaire introuvable"})

    const indexCommentaire =  articles[index].commentaires.indexOf(commentaireAModifier)

    articles[index].commentaires[indexCommentaire].auteur = body.auteur
    articles[index].commentaires[indexCommentaire].message = body.message
    
    return reponse.json({msg : "update commentaire ok"})
})

serveur.delete("/commentaire/:idArticle/:idCommentaire" , (request , reponse) => {
    const idArticle = request.params.idArticle ;
    const idCommentaire = request.params.idCommentaire ;

    const article = rechercheArticle(articles , idArticle)
    if(!article) return reponse.status(404).json({msg : "erreur 404"})
    const index = articles.indexOf(article)

    const commentaireAModifier = articles[index].commentaires.find(function(commentaire){
        return commentaire.id == idCommentaire
    })
    if(!commentaireAModifier) return reponse.status(404).json({msg : "erreur 404 commentaire introuvable"})
    const indexCommentaire =  articles[index].commentaires.indexOf(commentaireAModifier)

    articles[index].commentaires.splice(indexCommentaire , 1)

    return reponse.json({msg : "delete commentaire ok"})
})



serveur.listen(PORT , () => console.log(`le serveur express est start sur le port ${PORT}`))
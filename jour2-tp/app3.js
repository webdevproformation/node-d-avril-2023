const express = require("express");

const serveur = express();

const { articles } = require("./bdd");
const { rechercheArticle, rechercheCommentaire } = require("./lib");

// ARTICLES

serveur.use(express.json());

// Lecture

serveur.get("/article/:idArticle/:idCommentaire?", (request, response) => {

    const id = request.params.idArticle;
    
    if (id == "all") return response.json(articles); // On ne cherche alors ni l'Id de l'article ni celui du commentaire

    const article = rechercheArticle(articles, id); // Méthode de lib qui cherche et récupère l'article ayant son Id équivalent à l'Id en paramètre dans l'Url

    if (!article) return response.status(404).json({ message: "Article introuvable", erreur: 404 });

    if (!request.params.idCommentaire) { // S'il n'y a pas d'Id commentaire en paramètre dans l'Url

        return response.json(article);

    } else { // L'Id commentaire existe

        const idCommentaire = request.params.idCommentaire;    
        const commentaire = rechercheCommentaire(article, idCommentaire);

        if (!commentaire) return response.status(404).json({ message: "Commentaire introuvable", erreur: 404 });

        return response.json(commentaire);

    }
        
});

// Modification

serveur.put("/article/:idArticle/:idCommentaire?", (request, response) => {

    const id = request.params.idArticle;
    const article = rechercheArticle(articles, id);

    if (!article) return response.status(404).json({ message: "Article introuvable", erreur: 404 });

    const { body } = request;

    if (!request.params.idCommentaire) {

        const index = articles.indexOf(article);
        articles[index].titre = body.titre;
        articles[index].contenu = body.contenu;
        return response.json({ message: `L'article à l'Id ${id} a été modifié`, erreur: null });

    } else {

        const idCommentaire = request.params.idCommentaire;    
        const commentaire = rechercheCommentaire(article, idCommentaire);

        if (!commentaire) return response.status(404).json({ message: "Commentaire à modifier introuvable", erreur: 404 });

        const index = article.commentaires.indexOf(commentaire);
        article.commentaires[index].auteur = body.auteur;
        article.commentaires[index].message = body.message;
        return response.json({ message: `Le commentaire à l'Id ${id} a été modifié`, erreur: null });

    }
    
});

// Ajout

serveur.post("/publier/:idArticle?", (request, response) => {

    const { body } = request;

    if (!request.params.idArticle) {

        articles.push(body);
        return response.json({message: `Un nouvel article a été ajouté`, error: null});

    } else {

        const id = request.params.idArticle;
        const article = rechercheArticle(articles, id);

        if (!article) return response.status(404).json({ message: "Article introuvable", erreur: 404 });

        article.commentaires.push(body);
        return response.json({ message: `Un nouveau commentaire a été ajouté`, erreur: null });

    }

});

// Suppression

serveur.delete("/article/:idArticle/:idCommentaire?", (request, response) => {
    
    const id = request.params.idArticle;
    const article = rechercheArticle(articles, id);

    if (!article) return response.status(404).json({ message: "Article introuvable", erreur: 404 });

    if (!request.params.idCommentaire) {

        const index = articles.indexOf(article);
        articles.splice(index, 1);
        return response.json({ message: `L'article à l'Id ${id} a été supprimé`, erreur: null });

    } else {

        const idCommentaire = request.params.idCommentaire;    
        const commentaire = rechercheCommentaire(article, idCommentaire);

        if (!commentaire) return response.status(404).json({ message: "Commentaire à supprimer introuvable", erreur: 404 });

        const index = article.commentaires.indexOf(commentaire);
        article.commentaires.splice(index, 1);
        return response.json({ message: `Le commentaire à l'Id ${id} a été supprimé`, erreur: null });

    }

});

serveur.listen("4003", () => console.log("Le serveur express est démarré"));
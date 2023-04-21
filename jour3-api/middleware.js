// vous venez de créer 2 fonctions middleware 
const { isValidObjectId } = require("mongoose")
const { schemaArticleJoi } = require("./verif")

function traitement1(request, reponse , next){
    console.log("je réalise le traitement 1")
    next();
}

function traitement2(request, reponse , next){ 
    // une fonction middleware prendre TOUJOURS 3 paramètres 

    // request => intercepter la requete 
    // reponse => retourner une réponse si le traitement est faux 
    // next => permet de passer au traitement suivant 
    console.log("je réalise le traitement 2");
    next();
    // https://www.youtube.com/watch?v=22d4_KIqBNc
    // https://grafikart.fr/tutoriels/conteneur-dependance-922
    // https://www.youtube.com/watch?v=Iv4VIBEBHKk
}

function idValid(request , reponse, next){

    const id = request.params.id ;
    // si l'id est invalid => dans le middleware que l'on va stopper l'enchainement des middleware
    if(!isValidObjectId(id)) return reponse.status(400).json({msg : `l'id ${id} n'est pas valide pour MongoDB` , where : "middleware"})
    // sinon au traitement suivant 
    next(); 

}

function isValidArticle(request , reponse, next){
    const { body } = request; 
    const {error} = schemaArticleJoi.validate(body , { abortEarly : false})
    if(error) return  reponse.status(400).json(error.details) // 400 Bad Request
    next();
}

module.exports.traitement1 = traitement1
module.exports.traitement2 = traitement2
module.exports.idValid = idValid
module.exports.isValidArticle = isValidArticle

// 10h50 bon café !!!!!!!!!!!!!
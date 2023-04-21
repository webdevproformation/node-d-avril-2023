// vous venez de créer 2 fonctions middleware 
const { isValidObjectId } = require("mongoose")
const { schemaArticleJoi } = require("./verif")
const JWT = require("jsonwebtoken")

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

function autorisation (request , reponse, next){

    // récupérer une information envoyée dans les header de la requete http 
    const token = request.header("x-token")
    // si elle est absente => erreur 401 // Unauthorized
    if(!token) return reponse.status(401).json({msg : "vous devez avoir un token JWT pour réaliser cette opération"})

    // si elle est présente mais qui a un problème => problème dans la signature (3ème partie) 
    try{
        const payload = JWT.verify(token , process.env.CLE_PRIVEE_JWT)
        request.user = payload // permet d'envoyé le payload de notre JWT vers un autre middleware
        // si tout ok => passer à la suite 
        next();
    }
    catch(ex){
        // 400 => Bad Request 
        reponse.status(400).json({msg : "JWT invalid"})
    }
}

function isAdmin(request, reponse , next){
    if(request.user.role !== "admin") return reponse.status(403).json({msg : "vous n'avez les droits pour effectuer cette action"})
    next()
}


module.exports.traitement1 = traitement1
module.exports.traitement2 = traitement2
module.exports.idValid = idValid
module.exports.isValidArticle = isValidArticle
module.exports.autorisation = autorisation
module.exports.isAdmin = isAdmin


// 10h50 bon café !!!!!!!!!!!!!
const { Router } = require("express")
const { Article } = require("./model")
const { isValidObjectId } = require("mongoose")
const Joi = require("joi"); // librairie qui permet de réaliser des vérifications super if 

const schemaArticleJoi = Joi.object({ // 19 vérifications 
    titre : Joi.string().min(5).max(255).required(),
    contenu : Joi.string().min(5).max(10000).required(),
    like : Joi.number().min(0).required(),
    auteur : Joi.string().min(5).max(255).required(),
})

const route = Router();
// fetch("http://localhost:4003", {method: "GET"})=> récupérer du serveur
// fetch("http://localhost:4003", {method: "POST"})=> envoyer du serveur
// fetch("http://localhost:4003", {method: "DELETE"})=> supprimer du serveur
// fetch("http://localhost:4003", {method: "PUT"})=> mis à jour du serveur
route.get("/", function(request, reponse){
    reponse.json({msg : "fonction"})
})
// route.post("/" , function(request, reponse){})
route.post("/" , async function(request, reponse){
    const { body } = request; 

    /* console.log(error);
    return reponse.json("stop"); */
    const {error} = schemaArticleJoi.validate(body , { abortEarly : false})
    if(error) return  reponse.status(400).json(error.details) // 400 Bad Request

    const newArticle = new Article(body) // exos.push(body)
    await newArticle.save() // MongoDB => traitements qui sont asynchrones  => await 
    reponse.json(newArticle); 
})
// tester via thunder client 
// POST http://localhost:4003
/**
{
  "titre": "premier article",
  "contenu" : "lorem ipsum",
  "like" : 10 ,
  "auteur" : "Alain"
}
*/
// récupérer tous les articles
// GET http://localhost:4003/all
route.get("/all", async (request, reponse) => {
   const tousLesArticles = await Article.find()
   reponse.json(tousLesArticles); 
})

// DELETE http://localhost:4003/643ffd219efc88dd4dfba793
route.delete("/:id" , async (request, reponse) => {
    const id = request.params.id

    if(!isValidObjectId(id)) return reponse.status(400).json({msg : `l'id ${id} n'est pas valide pour MongoDB`})

    const reponseMongo = await Article.findByIdAndRemove(id) // DELETE 

    if(!reponseMongo) return reponse.status(404).json({ msg : `l'article ${id} n'existe pas` })

    reponse.json({ msg : `l'article ${id} est bien supprimé` }); 
} )


module.exports = route ; 
const { Router } = require("express")
const { Article } = require("./model")
const Joi = require("joi"); // librairie qui permet de réaliser des vérifications super if 

const schemaArticleJoi = Joi.object({ // 19 vérifications 
    titre : Joi.string().min(5).max(255).required(),
    contenu : Joi.string().min(5).max(10000).required(),
    like : Joi.number().min(0).required(),
    auteur : Joi.string().min(5).max(255).required(),
})

const route = Router();

route.get("/", function(request, reponse){
    reponse.json({msg : "fonction"})
})

route.post("/" , async function(request, reponse){
    const { body } = request; 

    /* console.log(error);
    return reponse.json("stop"); */
    const {error} = schemaArticleJoi.validate(body , { abortEarly : false})
    if(error) return  reponse.status(400).json(error.details)

    const newArticle = new Article(body) // exos.push(body)
    await newArticle.save()
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


module.exports = route ; 
const Joi = require("joi")

// créer un schéma Joi qui permet de vérifier que les données 
// en POST sont conformes au schéma MongoDB
const schemaJoiUser = Joi.object({
    email : Joi.string().email({ tlds: { allow: false } }).required(),
    password : Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required(),
    role : Joi.string().valid("redacteur","admin").required()
});

const schemaLogin = Joi.object({
    email : Joi.string().email({ tlds: { allow: false } }).required(),
    password : Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required()
});

// on verifie que les données postées contiennent les champs email / password 
// email => email valid 
// password => texte qui contient  au minimun 8 caractères avec Majuscule / minuscule et chiffres


const schemaArticleJoi = Joi.object({ // 19 vérifications 
    titre : Joi.string().min(5).max(255).required(),
    contenu : Joi.string().min(5).max(10000).required(),
    like : Joi.number().min(0).required(),
    auteur : Joi.string().min(5).max(255).required(),
})

module.exports.schemaJoiUser = schemaJoiUser ;
module.exports.schemaArticleJoi = schemaArticleJoi ;
module.exports.schemaLogin = schemaLogin ;

// sorte les verifications => require dans le fichier route-user.js 
const Joi = require("joi")

// créer un schéma Joi qui permet de vérifier que les données 
// en POST sont conformes au schéma MongoDB
const schemaJoiUser = Joi.object({
    email : Joi.string().email({ tlds: { allow: false } }).required(),
    password : Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required()
});
// on verifie que les données postées contiennent les champs email / password 
// email => email valid 
// password => texte qui contient  au minimun 8 caractères avec Majuscule / minuscule et chiffres

module.exports.schemaJoiUser = schemaJoiUser ;

// sorte les verifications => require dans le fichier route-user.js 
const { Router } = require("express")
const { schemaJoiUser } = require("./verif")
const { User } = require("./model")
const { compare } = require("bcrypt")
const JWT = require("jsonwebtoken")

const route = Router();

route.post("/login" , async (request , reponse) => {

    const { body } = request ;

    // vérifier que l'on a bien { email : ... , password : .... }
    // stop => c'est pas bon  400
    const {error} = schemaJoiUser.validate(body , {abortEarly : false})
    if(error) return reponse.status(400).json(error.details);

    // est ce que il y a un profil utilisateur en base de donnée qui a un email transmis ?? ??
    // stop => toto@yahoo.fr => stop 400
    const utilisateurRecherche = await User.findOne({email : body.email}) 
    // User.find({email : body.email}) => [{}] ou []
    // User.findOne({email : body.email}) => {} ou null
    if(!utilisateurRecherche) return  reponse.status(404).json({msg : "aucun profil trouvé avec ces identifiants" });

    // est ce que le password écrit est valable comparer le mot passe // mot de pass hashé 
    const verif = await compare(body.password , utilisateurRecherche.password )
    // il n'est pas de faire une comparaison => laisser à bcrypt.compare( ) le fait de dire si le mot de passe saisit est équivalent du mot de passe hashé 
    // stop => stop 400 
    if(!verif) return reponse.status(404).json({msg : "aucun profil trouvé avec ces identifiants" });

    // si tout est ok 
    // jsonwebtoken => importer une autre librairie 
    // lancer un 2ème terminal
    // cd jour3-api
    // npm i jsonwebtoken

    const profilSansMotPass = {
        _id : utilisateurRecherche._id ,
        email : utilisateurRecherche.email
    }

    const token = JWT.sign(profilSansMotPass , process.env.CLE_PRIVEE_JWT);

    reponse.json( {msg : "bienvenu " , token : token} ) // authentification => qui  ?
                                                        // autorisation => qu'est ce que l'on peut faire ?
    // jsonwebtoken => https://jwt.io/
    // transmis au client (React native) => stocker dans une table SQLITE 
})

module.exports = route 

// ajouter dans le fichier app.js 
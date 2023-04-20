// si vous avez une autre collection avec des routes dédiées
// il est conseillé de créer un fichier dédié aux routes
// pour cette collection 

// (collection en NoSQL) (table en SQL) ===== model ??
const { Router, response } = require("express")
const { User } = require("./model") // import du model pour communiquer avec MongoDB 
const { schemaJoiUser } = require("./verif") // import vérif
const {genSalt , hash } = require("bcrypt"); 
// importer fonction genSalt complexite à déhasher le mot depasse
// hash => "azerty" => "13498498419cniydgduezvddzeugydbuzt"
const { isValidObjectId } = require("mongoose")

const route = Router()

// il faut associer ces routes dans app.js => à notre application
// app.js (fichier entrée de notre application)
// ajouter la route 

route.post("/", async (request, reponse) => {

    const {body} = request // récupérer la partie Body de la requête POST 

    // faire des vérifications email valide / password valid 
    const {error} = schemaJoiUser.validate(body , {abortEarly : false})
    // {abortEarly : false} => permet de dire à Joi => afficher toutes les erreurs trouvées
    // si ko => 400  bad Request 
    if(error) return reponse.status(400).json(error.details)
    // test oublie le password / mettre un password sans chiffre 
    // POST http://localhost:4003/user 

    // on doit vérifier si il n'existe pas un autre user
    // avec l'email proposé 
    // vérifier si l'email propose n'est pas déjà dans un autre Document 
    //User.find() // SELECT * FROM users
    const userRecherche = await User.find({email : body.email}) 
    // SELECT * FROM users WHERE email = body.email

    if(userRecherche.length > 0) return reponse.status(400).json({ msg : "email déjà pris" });
    // si userRecherche = [{}] => l'email est déjà utilisé => stop erreur 400
    // test POST http://localhost:4003/user 
    // password valid et email : "a@yahoo.fr"

    // attention lorsque l'on stocker en base de données 
    // le password => il faut le hashé (crypter)
    // traitement hashage du password  
    // NodeJS => module crypto => https://nodejs.org/dist/latest-v18.x/docs/api/crypto.html
    // https://nodejs.org/dist/latest-v18.x/docs/api/crypto.html
    // Chapitre "comprendre les modules" > chapitre 11 
    // via un module depuis npmjs.org => bcrypt
    // https://www.npmjs.com/package/bcrypt
    // lancer un deuxieme terminal / cd jour3-api / npm i bcrypt
    const salt = await genSalt(10)
    const passwordHashe = await hash(body.password , salt)
    // body.password => "Azazertyuiop1"
    // passwordHashe => "$2b$10$Izn2qul7fgoAn0mjuEFIR.SywsFag.lcxekRbBaT6SH1Ex9nWIdAq"

    // ok
    const userACreer = new User({ email : body.email , password : passwordHashe }) 
    // new mot clé de js => User (class model) => objet userACreer
    // objet userACreer dispose de la méthode .save() => INSERT 
    await userACreer.save() // INSERT => asynchrone (prendre du temps await )
                        // si await il faut ajouter un async devant le callback 

    // quelquesoit la route / quelquesoit la méthode => reponse OBLIGATOIREMENT 
    reponse.json({msg : "profil user créé"}) // affiché dans Thunder client 
                             // status 200 => tout a été traité correctement par NodeJS

    // rdv 13h40 bon appetit !!! 
})
// test POST http://localhost:4003/user (le user dans l'url vient de app.js)
// body de la requete 
/*
{
    "email" : "a@yahoo.fr" ,
    "password" : "123456"
}
*/

// question récupérer tous les profils users de collection users (email et _id)
route.get("/all" , async (request , reponse) => {
    const allUsers = await User.find({}).select({ _id : 1 , email : 1})
    // SELECT _id , email FROM users 
    reponse.json(allUsers); 
})
// GET http://localhost:4003/user/all

// supprimer un profil user via son id 
route.delete("/:id", async (request , reponse) => {
    // récupérer de l'id dans l'url
    const id = request.params.id ; 
    // vérifier que id est un id valid pour MongoDB 
    // si ko => erreur 400 Bad Request  STOP
    // pour vérifier que id est valid => fonction de mongoose => isValidObjectId 
    // pour l'utiliser il faut au préalable l'importer au début du fichier 
    if(!isValidObjectId(id)) return reponse.status(400).json({msg : `id ${id} est invalide`})
    // si ok on continue 
    // lancer la suppression 
    const profilASupprimer = await User.findByIdAndRemove(id)
    // si ko => erreur 404 Profil introuvable avec l'id mentionné STOP 
    if(!profilASupprimer) return reponse.status(404).json({msg : `Profil introuvable avec l'id mentionné : ${id}`})
    // si ok => message "profil supprimé" STOP 
    reponse.json({msg : `profil ${id} est supprimé`})
})
// test 


module.exports = route ;  // route => export default 
// dans le fichier app.js import et renommer la variable route => routeUser 
// module.exports = route === export default => donc on peut nommer comme on veut 
// la variable route dans le fichier app.js 

// si vous avez une autre collection avec des routes dédiées
// il est conseillé de créer un fichier dédié aux routes
// pour cette collection 

// (collection en NoSQL) (table en SQL) ===== model ??
const { Router } = require("express")
const { User } = require("./model") // import du model pour communiquer avec MongoDB 

const route = Router()

// il faut associer ces routes dans app.js => à notre application
// app.js (fichier entrée de notre application)
// ajouter la route 

route.post("/", async (request, reponse) => {

    const {body} = request // récupérer la partie Body de la requête POST 

    // faire des vérifications email valide / password valid 
    // si ko => 400  bad Request 

    // on doit vérifier si il n'existe pas un autre user
    // avec l'email proposé 
    // vérifier si l'email propose n'est pas déjà en

    // attention lorsque l'on stocker en base de données 
    // le password => il faut le hashé (crypter)
    // traitement hashage du password  

    // ok
    const userACreer = new User(body) 
    // new mot clé de js => User (class model) => objet userACreer
    // objet userACreer dispose de la méthode .save() => INSERT 
    await userACreer.save() // INSERT => asynchrone (prendre du temps await )
                        // si await il faut ajouter un async devant le callback 

    // quelquesoit la route / quelquesoit la méthode => reponse OBLIGATOIREMENT 
    reponse.json(userACreer) // affiché dans Thunder client 
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


module.exports = route ;  // route => export default 
// dans le fichier app.js import et renommer la variable route => routeUser 
// module.exports = route === export default => donc on peut nommer comme on veut 
// la variable route dans le fichier app.js 

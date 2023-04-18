// index.js => fichier principal (le point d'entrée de votre application)
// en html => il faut OBLIGATOIREMENT que le fichier d'entrée dans votre projet s'appelle index.html (Apache)
const express = require("express") ; 
const { exos } = require("./bdd")
// import la librairie express depuis le dossier node_modules
// utilise le système de module par défaut de NodeJS => CommunJS 

// dans le monde de nodejs => index.js => main.js / serveur.js / app.js 

// console.log("serveur")
// node index.js 
const serveur = express();

// avec le module http (natif de nodejs)
// serveur.on("request" , function(request , reponse){  
//    if(request.url === "/"){
//    reponse.write("bonjour les amis !");
//    reponse.end(); 
//} })
// node . 

serveur.use(express.json()) // Middleware => traiter correctement les requetes http qui envoie du json 


serveur.delete("/exo/:id", (request, reponse) => {
    const id = request.params.id ;
    // recherche pour trouver l'index 
    const exoASupprimer = exos.find(function(exo){
        return exo.id == id
    })  
    const index = exos.indexOf(exoASupprimer);
    exos.splice(index, 1)
    reponse.json({ message : `exo numéro ${id} supprimé` , error : null })
})
// DELETE http://localhost:4002/exo/1 => réponse ci dessus 
// GET    http://localhost:4002/exo/all => [{},{}]

serveur.post("/new-exo" , function(request, reponse){  // ajouter une nouvelle route POST
    const exo = request.body ; 
    exos.push(exo)
    reponse.json({ message : "exo ajouté" , error : null }); 
})
// POST => /new-exo => "exo ajouté"
// le POST est temporaire => stocké dans la RAM du serveur 
// si vous faîtes un Ctrl + S (nodemon eteindre et restart le serveur => réinitaliser la valeur de exos )
// GET =>  /exo/all => [{},{},{},{}]
// package.json 
// ajouter "dev" : "nodemon ." dans "script"
// npm run dev => lancer la commande nodemon .
// Base de données => mieux qu'un fichier texte
// MongoDB


serveur.get("/" , function(request, reponse){ // route
    reponse.send("bonjour les amis !"); 
})

serveur.get("/produits" , (request, reponse)=>{ //http://localhost:4002/produits
    const p = [
        {id : 1, nom :"PS4"},
        {id : 2, nom :"PS5"},
    ]
    reponse.json(p);
})

serveur.get("/contact", (request, reponse) => {
    const titre = `<h1>nous contacter</h1>`;
    reponse.send(titre); 
    // npm run dev 
});

serveur.get("/pause", (request, reponse) => {
    const formulaire = `<input type="text" placeholder="café"> <button>go</button>`;
    reponse.send(formulaire); 
    // npm run dev 
});

serveur.get("/etudiant/:num", (request, reponse)=> {
    // http://localhost:4002/etudiant/1
    const etudiants = [
        { id : 1 , nom : "Alain"} ,
        { id : 2 , nom : "Céline"} 
    ];

    const id = request.params.num ;

    const etudiantRecherche = etudiants.find(function(etudiant){
        return etudiant.id == id
    })
    // si résultat === undefined

    if(!etudiantRecherche) return reponse.status(404).json({erreur : 404 , message : `etudiant inconnu pour l'id ${id}`})
    // 404 => Protocol HTTP = code erreur qui est envoyé par le serveur pour expliquer que ce qui est demandé
    // Not Found => introuvable 

    // sinon => affiche l'étudiant concerné 
    reponse.json(etudiantRecherche);
})


serveur.get("/exo/:techno", (request, reponse) => {
    const techno = request.params.techno ;
    if(techno === "all") return reponse.json(exos) ;
    const exoRecherche = exos.find(function(exo){
        return exo.nom == techno
    })
    if(!exoRecherche) return reponse.status(404).json({error : 404 , message : `${techno} n'existe dans les exos`});
    reponse.json(exoRecherche); 

    // code 400  => Bad Request 
    // code 403  => Forbidden (pb d'authentification)
    // code 404  => Not Found
    // https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
})




serveur.listen("4002",() => console.log("le serveur express est démarré"))

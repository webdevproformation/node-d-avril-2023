const { connect , Schema , model } = require("mongoose");

// 1ère pour travailler avec une base de données => connecter 
const URI = "mongodb+srv://doranco:q69fQqBwpDwx9uVw@cluster0.5ih2fl4.mongodb.net/demo?retryWrites=true&w=majority";
connect(URI , { useNewUrlParser : true })
    .then(() => console.log("connexion à MongoDB Réussie"))
    .catch((ex) => console.log(ex)); 
// schema => décrire l'aspect des documents que l'on veut enregistrer 
const etudiantSchema = new Schema({
    nom : String ,
    age : Number ,
    dt_creation : Date
})
// collection => TABLE  => Etudiant
const Etudiant = model("etudiants" , etudiantSchema)
// données 
function insert(){
    const cdaEtudiant = { // donnée que l'on va récupérer depuis requête POST 
        nom : "Alain",
        age : 20 ,
        dt_creation : new Date()
    }
    // INSERT 
    const insert = new Etudiant(cdaEtudiant) // créer base IF NOT EXISTS et créer la table  IF NOT EXISTS et INSERER 
    insert.save(); // INSERT INTO en SQL
}
insert()

// opération asynchrone => ... 
async function supprimer(id){
   await Etudiant.findByIdAndRemove(id) // DELETE FROM etudiants WHERE id = "643fb3da379722428bc18038" 
}
 
supprimer("643fb3da379722428bc18038"); // l'id vient de la base de données MongoDB 


async function read(){
   const resultat =  await Etudiant.find() // SELECT * FROM etudiants
   console.log(resultat)
}

read()

async function update(id){ // UPDATE etudiant SET  nom = "Céline" , age = 40 WHERE id = "id"
            await Etudiant.findByIdAndUpdate(id , {
                $set : {
                    nom : "Zorro",
                    age : 21
                }
            })
}

update("643fc180d3d120a9482a8fe1")

// quel est la différence entre mongoose et mongodb 
// => permettent de travailler avec un projet NODE <====> mongodb 


// express + mongoose + joi + dotenv => projet => plus puissante ( PERSISTANCE )

// Thunder => GET url {json} => node => express => serveur.get("url/:id", function(){
    // []
    // logique ?? => 404 
    // OK réponse 
    // fonction  que l'on vient de voir dans mongoose 
    //[].find()
    // Collection.findById(:id)
//})

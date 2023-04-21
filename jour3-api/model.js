const { Schema , model } = require("mongoose")

const articleSchema = new Schema({
    titre : String ,
    contenu : String ,
    like : Number ,
    auteur : String
});

const Article = model("articles", articleSchema) ;

// créer un schema pour la collection (TABLE) users
// les champs des Documents dans la collection 
const userSchema = new Schema({
    email : String ,  // 123@yahoo.fr
    password : String ,
    role : { type : String , enum : ['redacteur' , 'admin'] }
})

// création du model => class qui va nous permettre .find() .findByIdAndUpdate()
// lien entre notre projet et MongoDB 
const User = model("users" , userSchema);
// "users" => nom de la collection (TABLE)
// "user" => par défaut mongoose va ajouté un s à la fin 
// userSchema => structure de chaque enregistrement dans la collection 


module.exports.Article = Article ; 
module.exports.User = User ; // exporter pour pouvoir l'utiliser dans fichier de route 
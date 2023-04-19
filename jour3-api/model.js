const { Schema , model } = require("mongoose")

const articleSchema = new Schema({
    titre : String ,
    contenu : String ,
    like : Number ,
    auteur : String
});

const Article = model("articles", articleSchema) ;


module.exports.Article = Article ; 
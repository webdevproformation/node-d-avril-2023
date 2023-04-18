module.exports.rechercheArticle = (articles , id) => {
    return articles.find(function(article){
        return article.id == id
    })
}
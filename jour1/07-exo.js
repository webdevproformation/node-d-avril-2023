const { readFile } = require("node:fs")
const { createServer } = require("node:http")
const serveur = createServer();
serveur.on("request", function(request, reponse){
    if(request.url === "/"){
        readFile("07-exemple.html" , "utf-8", function(err, fichier){
            if(err) return console.log(err)
            reponse.writeHead(200, {"Content-type" : "text/html; charset=uft-8"})
            reponse.write(fichier)
            reponse.end()
        })
    }
    if(request.url === "/cocktails.json"){
        readFile("07-data.json" , "utf-8", function(err, fichier){
            if(err) return console.log(err)
            reponse.writeHead(200, {"Content-type" : "application/json"})
            reponse.write(fichier)
            reponse.end()
        })
    }
} )
serveur.listen("4001", "localhost")

// 3ème et dernier type de module => module téléchargé => rdv 15h20 bon café !! @ toute suite !!





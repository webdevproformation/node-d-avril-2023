const http = require("http");
// permet de créer un serveur 
// https://nodejs.org/dist/latest-v18.x/docs/api/http.html
// créer un serveur http 
const serveur = http.createServer()
// déterminer qu'est ce qu'il doit répondre en fonction des requêtes que l'on va réaliser 
// document.querySelector("div").addEventListener("click" , function(){})
serveur.on( "request" , function( request , response ){ 
    // dans le callback vous allez stocker les différentes réponses du serveur
    if(request.url === "/"){
        response.write("bonjour les amis");
        response.end()
    }
    if(request.url === "/contact"){
        const html = `<input type='text' placeholder='votre email'>`
        response.write(html);
        response.end()
    }
} );
serveur.listen( 4000 , "localhost" ); 
// node 06-server.js Enter => le terminal est bloqué 
// http://localhost:4000
// http://localhost:4000/contact

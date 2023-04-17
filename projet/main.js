const fs = require("fs");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <script src="script.js"></script>
</body>
</html>`

fs.writeFile(process.argv[2] , html ,  'utf8', function(){
    console.log("le fichier index.html est bien créé")
}) ; 

console.log(process.argv[3])
if(process.argv[3] == "true"  ){
    const css = `
    body{
        margin : 0
    }
    `;
    fs.writeFile("style.css" , css ,  'utf8', function(){
        console.log("le fichier style.css est bien créé")
    }) ; 

    const js = "console.log('coucou')"

    fs.writeFile("script.js" , js ,  'utf8', function(){
        console.log("le fichier  script.js est bien créé")
    }) ; 
}


// npx create-expo-app 
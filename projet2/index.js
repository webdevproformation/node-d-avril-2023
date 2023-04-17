import { writeFile } from "node:fs" // utilisation du système de module ESM 

writeFile("01-test.txt", "fin de journée" , "utf-8", function(){
    console.log("fin de journée");
}); 


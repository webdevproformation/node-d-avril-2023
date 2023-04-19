// pour faire en sorte que le code js s'exécute dans l'ordre que je veux 
// changer la manière de faire 
let clients ;

function getClient(callback){ // paramètre qui va être une fonction 
    fetch("https://jsonplaceholder.typicode.com/users/1") 
        .then(reponse => reponse.json())
        .then(data => {
            clients = data
            console.log("fin fetch")
            callback()  // exécute mon paramètre 
        })
}


getClient(() => {
    console.log("recupérer les clients" ,clients);
})


// const a = () => { } // PHP => OUI call_user_func // call_user_func_array
                       // Python 

// cas pratique

// créer le fichier 04-exo.js (dans jour3-note)
// créer une variable a = 0
// setTimeout( ) => exécuté au bout de 1 seconde augmenter le valeur de a + 1
// setTimeout( ) => exécuté au bout de 2 seconde augmenter le valeur de a + 5
// afficher le console.log() qui a pour valeur 6 => Attendre les 3 secondes (cumulé des 2 setTimeout)=> affiché 6  
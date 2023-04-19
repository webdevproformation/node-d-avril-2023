let a = 0 

function promesse1(){
    return new Promise( function(resolve , reject){
        setTimeout(function(){
            a++;
            console.log("promesse 1") // 1 s
            resolve()
        }, 1000)
    } )
}
function promesse2 (){
    return new Promise( function(resolve , reject){
        setTimeout(function(){
            a += 5;
            console.log("promesse 2") // 3 s 
            resolve()
        }, 2000)
    })
}

// ES 6 
// écrire de l'asynchrone comme du synchrone 

async function getA (){
    await promesse1() // remplace le .then()
    await promesse2() // remplace le .then()
    console.log(a)
}
getA () ; 

// créer le fichier 07-exo.js 

//créer 3 setTimeout
// 1er exécuté au bout de 1 seconde => console.log("ranger sa chambre")
// 1er exécuté au bout de 3 seconde => console.log("faire le repassage")
// 1er exécuté au bout de 1 seconde => console.log("prendre un café")
// ils doivent être emballé dans des Promises 

// dans la console 
// "ranger sa chambre" au bout 1 s
// au bout de 4 s "faire le repassage"
// au bout de 5 s "prendre un café")




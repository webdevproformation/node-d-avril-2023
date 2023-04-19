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

    




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

promesse1()
    .then(() => promesse2 ()) // attend 
    .then( () => console.log(a) ) // attend => affiché a // 3s ... 




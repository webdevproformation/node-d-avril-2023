let a = 0 ;

function traitement1(cb){
    setTimeout(function(){
        a++ ;
        console.log("fin traitement1")
        cb()
    } , 1000)
}

function traitement2(cb){
    setTimeout(function(){
        a += 5 ;
        console.log("fin traitement2")
        cb()
    } , 2000)
}

traitement1(() => {
    traitement2(() => {
        console.log(a)
    })
})

/**
let a = 0;

function timers(callback){
    setTimeout(function(){
        a += 1;
        setTimeout(function(){
            a += 5;
            callback()
        }, 2000)
    }, 1000)
}

timers(() => console.log(a))
 */


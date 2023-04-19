console.time() // lance un timer
const rangerChambre = () => new Promise( (resolve, reject)=>{
    setTimeout(() => {
        console.timeLog()
        console.log("ranger sa chambre : " + new Date());
        resolve();
    }, 1000);
})
  
const faireDuRepassage = () => new Promise( (resolve, reject)=>{
    setTimeout(() => {
        console.timeLog()
        console.log("faire le repassage : " + new Date());
        resolve();
    }, 3000);
})

const prendreUnCafe = () => new Promise( (resolve, reject)=>{
    setTimeout(() => {
        console.timeLog()
        console.log("prendre un café : " + new Date());
        resolve();
    }, 1000);
})

async function todo(){
    await rangerChambre();
    await faireDuRepassage();
    await prendreUnCafe();
}

todo();
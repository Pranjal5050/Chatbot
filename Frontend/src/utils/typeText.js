export const typeText = (text, callback, speed = 20) => {

let index = 0

const interval = setInterval(()=>{

callback(text.slice(0,index))

index++

if(index > text.length){

clearInterval(interval)

}

}, speed)

}
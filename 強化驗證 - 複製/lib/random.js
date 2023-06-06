 const randomNum  = () => Math.floor(Math.random()*10);

 const random = (num)=>{
    let randomNumStr = ""
    for(let i = 0 ;i<num;i++){
        randomNumStr += randomNum().toString();
    }
    return randomNumStr;
 }
export default random;

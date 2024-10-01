const BASE_URL =  "https://api.exchangerate-api.com/v4/latest";

let dropdown=document.querySelectorAll(".select-container select");
let btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");


for(let select of dropdown){
    for(let curCode in countryList ){
        let newOption=document.createElement("option");
        newOption.innerText=curCode;
        newOption.value=curCode;
        select.append(newOption);
        if (select.name === "from" && curCode === "USD") {
            select.value = "USD";  // Set 'USD' as selected for 'from'
          } else if (select.name === "to" && curCode === "INR") {
            select.value = "INR";  // Set 'INR' as selected for 'to'
          }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
     })
}
const updateFlag=(element)=>{
    let curCode=element.value;
    let countryCode=countryList[curCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
  evt.preventDefault();
  let amt=document.querySelector(".amount input");
  let amtValue=amt.value;
  if(amtValue<=0 || amtValue===""){
    amt.value="1";
  }
  console.log(fromCurr.value,toCurr.value);
  
  const fromCurrency = fromCurr.value.toUpperCase();
  const toCurrency = toCurr.value.toUpperCase();
  const URL =`${BASE_URL}/${fromCurrency}`;
  let response=await fetch(URL);
  

  let data = await response.json();
 

  let rate=data.rates[toCurrency];

  let finalValue=amtValue*rate;
  
  
  msg.innerText=`${amtValue}${fromCurrency} = ${finalValue} ${toCurrency}`;
})


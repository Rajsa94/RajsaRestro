import axios from "/axios";
 axios = require('axios')




const addtocart = document.querySelectorAll(".add-to-cart")


function updateCart(pizza){
    axios.post("/update-cart", pizza).then((res)=>{
        console.log(res)
    })
      

}

addtocart.forEach((btn)=>{
    btn.addEventListener("click", (e)=>{
        // let pizza = btn.dataset.pizza
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        
    })
})
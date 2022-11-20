

import axios from "axios";
import Noty from 'noty'
import {initAdmin} from '../js/admin'
 




const addtocart = document.querySelectorAll(".add-to-cart")
let cartcounter = document.querySelector("#cartCounter")


function updateCart(pizza){
    axios.post("/update-cart", pizza).then((res)=>{
        
        cartcounter.innerText = res.data.totalQty
        new Noty({
            type:"success",
            timeout: 1000,
            text: "Item add to Cart",
            
          }).show();
        
    }).catch((err=>{
        new Noty({
            type:"error",
            timeout: 1000,
            text: "Item Not add to Cart",
            
          }).show();

    }))
      

}

addtocart.forEach((btn)=>{
    btn.addEventListener("click", (e)=>{
        // let pizza = btn.dataset.pizza
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        
    })
})
initAdmin()
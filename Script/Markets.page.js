let menudiv=document.querySelector(".menu-container")
let addtocart=document.querySelector(".add-to-cart")
//let Orderdata=JSON.parse(localStorage.getItem("OrderData"))||[]

let id=0
console.log(menudiv)

fetch("https://adorable-boa-shawl.cyclic.app/Products",{
    headers:{
        "Authorization": `${localStorage.getItem("token")}`
    }
}).then((res)=>{
    return res.json()
}).then((res)=>{
    console.log(res)
    setCard(res)
}).catch((err)=>{
    console.log(err)
})


let Orderdata=JSON.parse(localStorage.getItem("OrderData"))||[]


function setCard(res){
   
    for(let i=0; i<res.length; i++){
        if(res[i].type=="Market"){
            let div = document.createElement("div")

            let img=document.createElement("img")
            img.setAttribute("src",`${res[i].img}`)

            let dishName = document.createElement("p")
              dishName.innerText=res[i].dishName

            let Description = document.createElement("p")
              Description.innerText=res[i].Description

            let price=document.createElement("p")
            price.innerText=`₹${res[i].Price}`

            let OrderButton =document.createElement("button")
            OrderButton.innerText="Order Now!"
            OrderButton.addEventListener("click",()=>{
                let flag=true
                Orderdata.forEach(element => {
                     if(element.dishName==res[i].dishName){
                       
                        flag=false

                     }
                })
                if(flag){
             let obj={
               quantity:1,
                img:res[i].img,
                dishName:res[i].dishName,
                Description:res[i].Description,
                Price:res[i].Price
             }

             
                Orderdata.push(obj)
                localStorage.setItem("OrderData",JSON.stringify(Orderdata))
                addtocart.innerHTML=`<div class="cart-popup">
                <div class="cart-popup-inner">
                  <h2>Added to Cart!</h2>
                  <p>Your item has been added to the cart.</p>
                  <button class="cart">View Cart</button>
                </div>
              </div>
              `
              document.querySelector(".cart").addEventListener("click",()=>{
                addtocart.innerHTML=""
              })
            
            }else{
               
                addtocart.innerHTML=`<div class="cart-popup">
                <div class="cart-popup-inner">
                  <h2>Already Added in Cart!</h2>
                  <p>Your item has been already added to the cart.</p>
                  <button class="cart">View Cart</button>
                </div>
              </div>
              `
          document.querySelector(".cart").addEventListener("click",()=>{
            addtocart.innerHTML=""
          })
            }
            
            })

            div.append(img,dishName,Description,price,OrderButton)
            menudiv.append(div)

    }
}
}



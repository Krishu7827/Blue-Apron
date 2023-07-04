let Email = document.getElementById("Email")
let Password = document.getElementById("Password")
let submitButton = document.getElementById("submit")
let logindiv=document.querySelector(".login-Success")


submitButton.addEventListener("click", (el) => {

    let payload = {
        email: Email.value,
        password: Password.value
    }
    console.log(payload)

    fetch("https://hilarious-erin-katydid.cyclic.app/users/login",{
        method: "POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res=>{
        render(res)
        console.log(res)
        localStorage.setItem("token",res.accesToken)
    })
    .catch(err=>console.log(err))

})



function render(res){

    if(res.accesToken){



        logindiv.innerHTML=`<div class="popup-container">
        <div class="popup">
          <div class="popup-content">
            <h2 style=" font-weight: 600; color:green;  font-family:'Poppins', sans-serif ;">Login Success!</h2>
            <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">Welcome to Blue Apron.</p>
            <button style=" font-weight: 500;   font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
          </div>
        </div>
      </div>`

      closebtn=document.querySelector(".popup button")
    
      closebtn.addEventListener("click",()=>{
          logindiv.innerHTML=""

          logindiv.innerHTML=`<div class="loading">
          <div class="loading__spinner"></div>
          <div style="font-weight:500;" class="loading__text">Loading...</div>
        </div>`

       
            setTimeout(function() {
       
                window.location.href="./HTML/Home.page.html"

                 }, 4000);
  
      })

    }else{

        logindiv.innerHTML=`<div class="popup-container">
        <div class="popup">
          <div class="popup-content">
            <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
            <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">Wrong Credentials.</p>
            <button style=" font-weight: 500;   font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
          </div>
        </div>
      </div>`

      closebtn=document.querySelector(".popup button")
    
      closebtn.addEventListener("click",()=>{
          logindiv.innerHTML=""
      })


    }
}

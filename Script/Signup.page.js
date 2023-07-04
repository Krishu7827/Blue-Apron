let Name = document.getElementById("Name")
let Email = document.getElementById("Email")
let Password = document.getElementById("Password")
let repeatPassword = document.getElementById("RepeatPassword")
let Otp = document.getElementById("OTP")
let RegisterButton = document.getElementById("RegisterButton")
let result = document.querySelector(".result")
let otpVerifybutton=document.getElementById("OtpVerify")
let closebtn;


RegisterButton.addEventListener("click", (el) => {
    console.log(Password.value,repeatPassword.value)
    if (Password.value == repeatPassword.value && Name.value) {

        let payload = {
            name: Name.value,
            email: Email.value,
            password: Password.value

        }

        result.innerHTML = `<div class="loading">
        <div class="loading__spinner"></div>
        <div style="font-weight:500;"class="loading__text">Verifying...</div>
      </div>`

      

        console.log(JSON.stringify(payload))


        fetch("https://hilarious-erin-katydid.cyclic.app/users/verifyEmail", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .then(res => {
                render(res)
                console.log(res)

            })
            .catch((err)=>{
                if(err){

                   console.log(err) 
                }
            })



    } else {

        result.innerHTML = `<div class="popup-container">
        <div class="popup">
          <div class="popup-content">
            <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
            <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">Password are not Same.</p>
            <button style=" font-weight: 500;   font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
          </div>
        </div>
      </div>`

      closebtn=document.querySelector(".popup button")
    
      closebtn.addEventListener("click",()=>{
        
          result.innerHTML=""
      })

    }

})


function render(res) {

   

    if (res.message == "You are already exist User") {

        result.innerHTML = `<div class="popup-container">
        <div class="popup">
          <div class="popup-content">
            <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
            <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">You are already exist User.</p>
            <button style=" font-weight: 500;  font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
          </div>
        </div>
      </div>`

      closebtn=document.querySelector(".popup button")
    
      closebtn.addEventListener("click",()=>{
          result.innerHTML=""
      })

    } else if (res.message == "Email is wrong") {

        result.innerHTML = `<div class="popup-container">
        <div class="popup">
          <div class="popup-content">
            <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
            <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">Email is Wrong.</p>
            <button style=" font-weight: 500; font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
          </div>
        </div>
      </div>`

      closebtn=document.querySelector(".popup button")
    
      closebtn.addEventListener("click",()=>{
          result.innerHTML=""
      })

    } else if (res["message"] == "OTP has Sent Succesfully!!") {

        result.innerHTML = `<div class="popup-container">
        <div class="popup">
          <div class="popup-content">
            <h2 style=" font-weight: 600; color:green;  font-family:'Poppins', sans-serif ;">OTP Sent Successfully!</h2>
            <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">OTP has sent on Your Email(${Email.value}).</p>
            <button style=" font-weight: 500;  font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
          </div>
        </div>
      </div>`

      closebtn=document.querySelector(".popup button")
    
      closebtn.addEventListener("click",()=>{
          result.innerHTML=""
      })

    }
}



otpVerifybutton.addEventListener("click",()=>{
    if(Otp.value){

        let payload={
            OTP:Otp.value
        }

        fetch("https://hilarious-erin-katydid.cyclic.app/users/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .then(res => {

                if(res["message"]== "User Registered!!"){
                
                    result.innerHTML = `<div class="popup-container">
                    <div class="popup">
                      <div class="popup-content">
                        <h2 style=" font-weight: 600; color:green;  font-family:'Poppins', sans-serif ;">Registration Successfully!</h2>
                        <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">You are registered Now, ${Name.value}.</p>
                        <button style=" font-weight: 500;  font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
                      </div>
                    </div>
                  </div>`

                  closebtn=document.querySelector(".popup button")
    
      closebtn.addEventListener("click",()=>{
        
          result.innerHTML=`<div class="loading">
          <div class="loading__spinner"></div>
          <div style="font-weight:500;"class="loading__text">data Saving...</div>
        </div>`

        setTimeout(()=>{
            window.location.href="../index.html"
        },4000)

      })


               

                }else if(res["message"]=="OTP is Wrong, Please try again"){

                    result.innerHTML = `<div class="popup-container">
                    <div class="popup">
                      <div class="popup-content">
                        <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
                        <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">OTP is Wrong.</p>
                        <button style=" font-weight: 500;  font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
                      </div>
                    </div>
                  </div>`

                  closebtn=document.querySelector(".popup button")
    
                  closebtn.addEventListener("click",()=>{
                      result.innerHTML=""
                  })

                }else{

                    result.innerHTML = `<div class="popup-container">
                    <div class="popup">
                      <div class="popup-content">
                        <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
                        <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">Something is wrong,Please try again later.</p>
                        <button style=" font-weight: 500;  font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
                      </div>
                    </div>
                  </div>`

                  closebtn=document.querySelector(".popup button")
    
                  closebtn.addEventListener("click",()=>{
                      result.innerHTML=""
                  })

                }
               


            })
            .catch((err)=>{
            console.log(err)
            })

    }else{

        result.innerHTML = `<div class="popup-container">
        <div class="popup">
          <div class="popup-content">
            <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
            <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">Please Enter OTP.</p>
            <button style=" font-weight: 500;  font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
          </div>
        </div>
      </div>`

      closebtn=document.querySelector(".popup button")
    
      closebtn.addEventListener("click",()=>{
          result.innerHTML=""
      })

    }
})
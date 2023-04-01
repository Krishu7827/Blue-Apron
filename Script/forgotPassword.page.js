let Email=document.getElementById("Email")
let Password=document.getElementById("Password")
let Name=document.getElementById("Name")
let OTP=document.getElementById("OTP")
let GenerateOtp=document.getElementById("GenerateOtp")
let VerifyOtp=document.getElementById("VerifyOtp")
let resultdiv=document.querySelector(".result")

console.log(GenerateOtp)

GenerateOtp.addEventListener("click",(el)=>{
    
    if(Email.value && Password.value && Name.value){

        resultdiv.innerHTML=`<div class="loading">
        <div class="loading__spinner"></div>
        <div style="font-weight:500;"class="loading__text">Verifying...</div>
      </div>`

      
    

        let payload={
            name:Name.value,
            email:Email.value,
            password:Password.value
        }

        fetch("http://localhost:469/users/updateVerify", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .then(res => {

              
            
                if(res["message"]=="We have no data about Your email, Please First register"){

                    resultdiv.innerHTML=`<div class="popup-container">
                    <div class="popup">
                      <div class="popup-content">
                        <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
                        <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">You are not registered User.</p>
                        <button style=" font-weight: 500;   font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
                      </div>
                    </div>
                  </div>`

                }else if(res["message"]=="Email is wrong"){

                    resultdiv.innerHTML=`<div class="popup-container">
                    <div class="popup">
                      <div class="popup-content">
                        <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
                        <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">Email Is Wrong.</p>
                        <button style=" font-weight: 500;   font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
                      </div>
                    </div>
                  </div>`

                }else if(res["message"]=="OTP has sent"){

                    resultdiv.innerHTML=`<div class="popup-container">
                    <div class="popup">
                      <div class="popup-content">
                        <h2 style=" font-weight: 600; color:green;  font-family:'Poppins', sans-serif ;">OTP Sent Successfully!</h2>
                        <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">OTP has sent on your Email(${Email.value}).</p>
                        <button style=" font-weight: 500;   font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
                      </div>
                    </div>
                  </div>`

                }

                closebtn=document.querySelector(".popup button")
    
                closebtn.addEventListener("click",()=>{
                    resultdiv.innerHTML=""
                })
          

            })
            .catch((err)=>{
                if(err){

                   console.log(err) 
                }
            })

    }else{

        resultdiv.innerHTML=`<div class="popup-container">
        <div class="popup">
          <div class="popup-content">
            <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
            <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">Enter Email.</p>
            <button style=" font-weight: 500;   font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
          </div>
        </div>
      </div>`

      closebtn=document.querySelector(".popup button")
    
      closebtn.addEventListener("click",()=>{
          resultdiv.innerHTML=""
      })

    }
})


VerifyOtp.addEventListener("click",()=>{


    if(OTP.value){

        let payload={
            OTP:OTP.value
          }

        
        resultdiv.innerHTML=`<div class="loading">
        <div class="loading__spinner"></div>
        <div style="font-weight:500;"class="loading__text">Verifying...</div>
      </div>`

 

 
    fetch("http://localhost:469/users/update",{
        method: "PATCH",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res=>{

        if(res["message"]=="OTP is Wrong, Please try again"){

            resultdiv.innerHTML=`<div class="popup-container">
            <div class="popup">
              <div class="popup-content">
                <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
                <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">OTP is Wrong, Please try again.</p>
                <button style=" font-weight: 500;   font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
              </div>
            </div>
          </div>`

        }else if(res["message"]=="Email is wrong"){

            resultdiv.innerHTML=`<div class="popup-container">
            <div class="popup">
              <div class="popup-content">
                <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
                <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">Email Is Wrong.</p>
                <button style=" font-weight: 500;   font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
              </div>
            </div>
          </div>`

        }else if(res["message"]=="Password Updated"){

            resultdiv.innerHTML=`<div class="popup-container">
            <div class="popup">
              <div class="popup-content">
                <h2 style=" font-weight: 600; color:green;  font-family:'Poppins', sans-serif ;">Password Updated Successfully!</h2>
                <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">Your Updated Password also has Sent Your Email(${Email.value}).</p>
                <button style=" font-weight: 500;   font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
              </div>
            </div>
          </div>`
          closebtn=document.querySelector(".popup button")

          closebtn.addEventListener("click",()=>{
              resultdiv.innerHTML=""

              resultdiv.innerHTML=`<div class="loading">
              <div class="loading__spinner"></div>
              <div style="font-weight:500;"class="loading__text">Data Saving...</div>
            </div>`
            setTimeout(()=>{
                window.location.href="../index.html"
            },4000)
  
              
          })

        }

        closebtn=document.querySelector(".popup button")

        closebtn.addEventListener("click",()=>{
            resultdiv.innerHTML=""

            
        })
  

       
    })
    .catch(err=>console.log(err))

    
} else {

    resultdiv.innerHTML=`<div class="popup-container">
    <div class="popup">
      <div class="popup-content">
        <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
        <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">Enter OTP.</p>
        <button style=" font-weight: 500;   font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
      </div>
    </div>
  </div>`

  closebtn=document.querySelector(".popup button")

  closebtn.addEventListener("click",()=>{
      resultdiv.innerHTML=""
  })


}
})
    
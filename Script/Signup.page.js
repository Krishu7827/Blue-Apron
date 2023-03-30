let Name = document.getElementById("Name")
let Email = document.getElementById("Email")
let Password = document.getElementById("Password")
let repeatPassword = document.getElementById("RepeatPassword")
let Otp = document.getElementById("OTP")
let RegisterButton = document.getElementById("RegisterButton")
let result = document.querySelector(".result")
let otpVerifybutton=document.getElementById("OtpVerify")



RegisterButton.addEventListener("click", (el) => {
    console.log(Password.value,repeatPassword.value)
    if (Password.value == repeatPassword.value) {

        let payload = {
            name: Name.value,
            email: Email.value,
            password: Password.value

        }
        console.log(JSON.stringify(payload))

        fetch("http://localhost:469/users/verifyEmail", {
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

        result.innerHTML = `<h4 style=" font-weight: 1000; color:red; text-align:center; margin-top:50px;  ">Password are not same.</h4>`

    }

})


function render(res) {

    result.innerHTML = `<h4 style=" font-weight: 1000; color:green; text-align:center; margin-top:50px;  ">it maybe take time, wait for while.</h4>`

    if (res.message == "You are already exist User") {

        result.innerHTML = `<h4 style=" font-weight: 1000; color:red; text-align:center; margin-top:50px;  ">You are already Our User, do login direct.</h4>`

    } else if (res.message == "Email is wrong") {

        result.innerHTML = `<h4 style=" font-weight: 1000; color:red; text-align:center; margin-top:50px;  ">Email is wrong.</h4>`

    } else if (res["message"] == "OTP has Sent Succesfully!!") {

        result.innerHTML = `<h4 style=" font-weight: 1000; color:green; text-align:center; margin-top:50px;  ">OTP has sent on your email(${Email.value}).</h4>`

    }
}



otpVerifybutton.addEventListener("click",()=>{
    if(Otp.value){

        let payload={
            OTP:Otp.value
        }

        fetch("http://localhost:469/users/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .then(res => {

                if(res["message"]== "User Registered!!"){
                
                    result.innerHTML = `<h4 style=" font-weight: 1000; color:green; text-align:center; margin-top:50px;  ">Your Are Registered Now, ${Name.value}.</h4>`

                }else if(res["message"]=="OTP is Wrong, Please try again"){

                    result.innerHTML = `<h4 style=" font-weight: 1000; color:red; text-align:center; margin-top:50px;  ">OTP is Wrong, Please try again.</h4>`

                }else{

                    result.innerHTML = `<h4 style=" font-weight: 1000; color:red; text-align:center; margin-top:50px;  ">Something is Wrong...</h4>`

                }
               


            })
            .catch((err)=>{
            console.log(err)
            })

    }else{

        result.innerHTML = `<h4 style=" font-weight: 1000; color:red; text-align:center; margin-top:50px;  ">Please Enter Your OTP.</h4>`

    }
})
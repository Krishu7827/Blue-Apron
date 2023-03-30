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

    fetch("http://localhost:469/users/login",{
        method: "POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res=>{
        render(res)
        console.log(res)
        localStorage.setItem("token",res.token)
    })
    .catch(err=>console.log(err))

})



function render(res){

    if(res.accesToken){

        logindiv.innerHTML=`<h4 style="font-weight: 700; color:green; text-align:center; margin-top:50px;">Login Success!!</h4>`

    }else{

        logindiv.innerHTML=`<h4 style=" font-weight: 700; color:red; text-align:center; margin-top:50px;  ">Wrong Credential!!</h4>`

    }
}

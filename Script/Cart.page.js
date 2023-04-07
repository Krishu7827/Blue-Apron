let cont = document.querySelector(".cont")
let Totalbill = document.getElementById("total")
let item = document.getElementById("items")
let code = document.getElementById("code")
let apply = document.getElementById("apply")

let Cartdata = JSON.parse(localStorage.getItem("OrderData")) || []
totalbill()
items()
console.log(Cartdata)
displaydata()

function displaydata() {
    cont.innerHTML = ""
    for (let i = 0; i < Cartdata.length; i++) {

        let card = document.createElement("div")
        card.setAttribute("class", "card")
        let imgcard = document.createElement("div")
        imgcard.setAttribute("class", "img")
        let detailcard = document.createElement("div")
        detailcard.setAttribute("class", "detail")

        let img = document.createElement("img")
        img.setAttribute("src", Cartdata[i].img)

        let name = document.createElement("h3")
        name.innerText = Cartdata[i].dishName

        let remove = document.createElement("h6")
        remove.innerText = "Remove to Cart"

        let increament = document.createElement("button")
        increament.innerText = "+"

        increament.addEventListener("click", function () {
            Cartdata[i].quantity++

            localStorage.setItem("OrderData", JSON.stringify(Cartdata))
            displaydata()

            totalbill()

        })

        let decreament = document.createElement("button")
        decreament.innerText = "-"

        decreament.addEventListener("click", function () {
            if (Cartdata[i].quantity > 1) {
                Cartdata[i].quantity--

            }
            localStorage.setItem("OrderData", JSON.stringify(Cartdata))
            displaydata()
            totalbill()
        })
        let span = document.createElement("span")
        span.innerText = Cartdata[i].quantity

        remove.addEventListener("click", function () {

            let el = Cartdata.splice(i, 1)

            localStorage.setItem("OrderData", JSON.stringify(Cartdata))
            displaydata()
            items()
            totalbill()
        })
        let price = document.createElement("p")
        price.innerText = "₹" + Cartdata[i].Price




        imgcard.append(img)
        detailcard.append(name, price, increament, span, decreament, remove)
        card.append(imgcard, detailcard)
        cont.append(card)
    }
}

function totalbill() {
    Totalbill.innerText = ""
    total = 0
    for (let i = 0; i < Cartdata.length; i++) {
        total += Cartdata[i].quantity * Cartdata[i].Price
    }
    Totalbill.innerText = "₹" + total
}

function items() {
    item.innerText = ""
    item.innerText = Cartdata.length + " " + "items"
}

apply.addEventListener("click", function () {
    total = 0
    for (let i = 0; i < Cartdata.length; i++) {
        total += Cartdata[i].quantity * Cartdata[i].Price
    }
    if (code.value == "Krishna2004") {
        Totalbill.innerText = ""
        Totalbill.innerText = "$" + (total - (total * 30 / 100))

    } else {
        totalbill()
    }

})

let order = document.getElementById("Order")
let loadingdiv = document.querySelector(".Loading")

order.addEventListener("click", function () {

    if (order.value == "ok" && Cartdata.length > 0) {

        loadingdiv.innerHTML = `<div class="loading">
        <div class="loading__spinner"></div>
        <div style="font-weight:500;"class="loading__text">Loading...</div>
      </div>`

        setTimeout(() => {
            window.location.href = "../HTML/Payment.page.html"
        }, 3000)





    } else {
        loadingdiv.innerHTML = `<div class="popup-container">
        <div class="popup">
          <div class="popup-content">
            <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
            <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">First add something in cart</p>
            <button style=" font-weight: 500; font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
          </div>
        </div>
      </div>`

        let closebtn = document.querySelector(".close-btn")

        closebtn.addEventListener("click", () => {
            loadingdiv.innerHTML = ``
        })
    }
})
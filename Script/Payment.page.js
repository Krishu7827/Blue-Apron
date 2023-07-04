let debitCard = document.getElementById("debit-card")
let container = document.querySelector(".container")
let debitcontainer = document.querySelector(".Debit-card-container")
let cod = document.getElementById("cash-on-delivery")
let address = document.getElementById("address")
let resultdiv = document.querySelector(".result")

debitCard.addEventListener("click", () => {
    if (address.value) {
        container.innerHTML = ""


        debitcontainer.innerHTML = `	<main>
    <section class="payment-container">
        <form>
            <h2>Payment Details</h2>
            <div class="form-group">
                <label for="card-number">Card Number:</label>
                <input type="text" id="card-number" name="card-number" required>
            </div>
            <div class="form-group">
                <label for="cardholder-name">Cardholder Name:</label>
                <input type="text" id="cardholder-name" name="cardholder-name" required>
            </div>
            <div class="form-group">
                <label for="expiry-date">Expiry Date:</label>
                <input type="month" id="expiry-date" name="expiry-date" required>
            </div>
            <div class="form-group">
                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" name="cvv" pattern="" required>
            </div>
            
            <button class="pay-btn">Pay Now</button>
        </form>
    </section>
</main>`


        let paybtn = document.querySelector(".pay-btn")
        let expiry_date = document.getElementById("expiry-date")
        let cardholder_name = document.getElementById("cardholder-name")
        let card_number = document.getElementById("card-number")
        resultdiv = document.querySelector(".result")

        paybtn.addEventListener("click", (el) => {
            resultdiv.innerHTML = `<div class="loading">
  <div class="loading__spinner"></div>
  <div style="font-weight:500;"class="loading__text">Verifying...</div>
</div>`

            if (expiry_date && cardholder_name) {
                let payload = {
                    Address: address.value,
                    Method: `debit card(online)`
                }
                fetch("https://hilarious-erin-katydid.cyclic.app/Payment/add", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(payload)
                }).then(res => res.json())
                    .then(res => {
                        if (res["msg"] == "Payment Success!!") {


                            resultdiv.innerHTML = `<div class="popup-container">
                <div class="popup">
                  <div class="popup-content">
                    <h2 style=" font-weight: 600; color:green;  font-family:'Poppins', sans-serif ;">Payment Successfull!</h2>
                    <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">The Delivery detail also sent on your email(${res.email})</p>
                    <button style=" font-weight: 500; font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
                  </div>
                </div>
              </div>`

                            closebtn = document.querySelector(".close-btn")

                            closebtn.addEventListener("click", () => {

                                localStorage.setItem("OrderData", JSON.stringify([]))

                                resultdiv.innerHTML = ""


                                debitcontainer.innerHTML = `<main>
                  <section class="delivery-card">
                      <h2>Delivery Status</h2>
                      <div class="status-container">
                          <div class="status-item">
                              <div class="status-icon delivered">
                                  <i  class="fas fa-check-circle"></i>
                              </div>
                              <p class="status-name">Delivered</p>
                          </div>
                          <div class="status-item">
                              <div class="status-icon in-transit">
                                  <i class="fas fa-shipping-fast"></i>
                              </div>
                              <p class="status-name">In Transit</p>
                          </div>
                          <div style="background-color:green;"  class="status-item">
                              <div class="status-icon processing">
                                  <i class="fas fa-clipboard-check"></i>
                              </div>
                              <p class="status-name">Processing</p>
                          </div>
                          <div class="status-item">
                              <div class="status-icon pending">
                                  <i class="fas fa-exclamation-circle"></i>
                              </div>
                              <p class="status-name">Pending</p>
                          </div>
                      </div>
                      <div class="shipment-info">
                          <h3>Shipment Information</h3>
                          <p><strong>Tracking Number:</strong>5664457534</p>
                          <p><strong>Delivery Address:</strong> ${address.value}</p>
                          <p><strong>Delivery Date:</strong>${Date()}</p>
                      </div>
                  </section>
              </main>`


                            })



                        }
                    })
                    .catch(err => console.log(err))




            } else {

                resultdiv.innerHTML = `<div class="popup-container">
                <div class="popup">
                  <div class="popup-content">
                    <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
                    <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">Input error</p>
                    <button style=" font-weight: 500; font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
                  </div>
                </div>
              </div>`

                closebtn = document.querySelector(".close-btn")

                closebtn.addEventListener("click", () => {

                    resultdiv.innerHTML = ""

                })
            }

        })


    } else {
        debitcontainer.innerHTML = `<div class="popup-container">
    <div class="popup">
      <div class="popup-content">
        <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
        <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">Enter Your Address.</p>
        <button style=" font-weight: 500; font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
      </div>
    </div>
  </div>`

        closebtn = document.querySelector(".close-btn")

        closebtn.addEventListener("click", () => {

            debitcontainer.innerHTML = ""

        })
    }

})


cod.addEventListener("click", () => {

    resultdiv.innerHTML = `<div class="loading">
  <div class="loading__spinner"></div>
  <div style="font-weight:500;"class="loading__text">Verifying...</div>
</div>`
    if (address.value) {

        let payload = {
            Address: address.value,
            Method: `Cash On Delivery`
        }
        fetch("https://hilarious-erin-katydid.cyclic.app/Payment/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .then(res => {
                if (res["msg"] == "Payment Success!!") {


                    resultdiv.innerHTML = `<div class="popup-container">
            <div class="popup">
              <div class="popup-content">
                <h2 style=" font-weight: 600; color:green;  font-family:'Poppins', sans-serif ;">Delivery Success!</h2>
                <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">the delivery detail also sent on your email(${res.email})</p>
                <button style=" font-weight: 500; font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
              </div>
            </div>
          </div>`

                    closebtn = document.querySelector(".close-btn")

                    closebtn.addEventListener("click", () => {
                        resultdiv.innerHTML = ""
                        container.innerHTML = ""
                        localStorage.setItem("OrderData", JSON.stringify([]))
                        container.innerHTML = `<main>
              <section class="delivery-card">
                  <h2>Delivery Status</h2>
                  <div class="status-container">
                      <div class="status-item">
                          <div style="background-color:green;" class="status-icon delivered">
                              <i class="fas fa-check-circle"></i>
                          </div>
                          <p class="status-name">Delivered</p>
                      </div>
                      <div   class="status-item">
                          <div style="background-color:green;" class="status-icon in-transit">
                              <i class="fas fa-shipping-fast"></i>
                          </div>
                          <p class="status-name">In Transit</p>
                      </div>
                      <div class="status-item">
                          <div style="background-color:green;"  class="status-icon processing">
                              <i class="fas fa-clipboard-check"></i>
                          </div>
                          <p class="status-name">Processing</p>
                      </div>
                      <div class="status-item">
                          <div style="background-color:red;" class="status-icon pending">
                              <i class="fas fa-exclamation-circle"></i>
                          </div>
                          <p class="status-name">Pending</p>
                      </div>
                  </div>
                  <div class="shipment-info">
                      <h3>Shipment Information</h3>
                      <p><strong>Tracking Number:</strong>5664457534</p>
                      <p><strong>Delivery Address:</strong> ${address.value}</p>
                      <p><strong>Order Date:</strong>${Date()}</p>
                  </div>
              </section>
          </main>`


                    })



                }
            })
            .catch(err => console.log(err))




    } else {
        resultdiv.innerHTML = `<div class="popup-container">
    <div class="popup">
      <div class="popup-content">
        <h2 style=" font-weight: 600; color:red;  font-family:'Poppins', sans-serif ;">Error!</h2>
        <p style=" font-weight: 500; color:black;  font-family:'Poppins', sans-serif ;">Enter Your Address.</p>
        <button style=" font-weight: 500; font-family:'Poppins', sans-serif ;" class="close-btn">Close</button>
      </div>
    </div>
  </div>`

        closebtn = document.querySelector(".close-btn")

        closebtn.addEventListener("click", () => {

            resultdiv.innerHTML = ""

        })
    }
})
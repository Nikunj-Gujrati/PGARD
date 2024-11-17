const emailEl = document.getElementById("email1")
const passwordEl = document.getElementById("password1")
const submitEl = document.getElementById("submit")



function submitHandler(event) {
    event.preventDefault();
    console.log("submitHandler called")

    const emailVal = emailEl.value;
    const passwordVal = passwordEl.value;

    if (emailVal == "abc@gmail.com" && passwordVal == "123") {
        console.log(emailVal, passwordVal);
        window.location.href = "main.html"
    }
    else{
        console.log("Login Failed :/")
        console.log(emailVal, passwordVal);
        alert("UserName / Password is incorrect");
    }


}

submitEl.addEventListener('click', submitHandler)  








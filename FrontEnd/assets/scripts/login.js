import { getToken } from "./comAPI.js";

const loginForm = document.getElementById("loginform");
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const response = await getToken(event.target.email.value, event.target.password.value);
    if(response.token){
        window.localStorage.setItem("token", response.token);
        window.location.href = './index.html'
    }
    else{
        const formInputs = document.querySelectorAll(".input-group input");
        const error = document.getElementById("error-style");
        error.style.display = "flex";
        Array.from(formInputs).forEach(input => {
            input.addEventListener("focus", (event) => {
                error.style.display = "none";
            });
        })
    }
});
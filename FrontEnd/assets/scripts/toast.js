const progressBar = document.getElementById("progress-bar");

export const triggerToast = (message) => {
    const toast = document.getElementById("toast");
    const toastContent = document.querySelector("#toast span");
    toastContent.textContent = message;
    toast.classList.add("animateToast");
    let total = 0;
    const timer = setInterval(() => {
        if(total === 8){
            clearInterval(timer);
            progressBar.style.width = "100%";
            toast.classList.remove("animateToast");
        }
        else if(total === 0){
            progressBar.style.width = "0%";
        }
        total++;
    }, 1000);
}

export default {triggerToast};
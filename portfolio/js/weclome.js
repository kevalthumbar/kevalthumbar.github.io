document.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(() => {
        location.href = "./portfolio/main-index.html"        
    },2000)
});

let spans = document.querySelectorAll("span");
spans.forEach((el) => {
    el.style.fontSize = "6vh"
});
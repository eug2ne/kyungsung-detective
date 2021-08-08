window.addEventListener("context -menu", function(event) {
    event.preventDefault();
    let contextElement = document.getElementById("context -menu");
    contextElement.style.top = event.offsety + "px";
    contextElement.style.left = event.offsetx + "px";
    contextElement.classList.add("active");
})

window.addEventListener("click", function() {
    document.getElementById("context -menu").classList.remove("active");
})
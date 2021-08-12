// reload function
document.addEventListener("click", e => {
    if (e.target.matches("h1"))
        location.reload();
})

// options-window function
function options_window(e) {
    const {clientX: mouseX, clientY: mouseY} = e;
    const options_window = document.querySelector("#options-window");

    options_window.style.top = `${mouseY}px`;
    options_window.style.left = `${mouseX}px`;

    options_window.style.display="block";
    options_window.classList.add("visible");

    return e.target;
}

document.body.addEventListener("click", e => {
    if (e.target.matches("td"))
        options_window(e);
});
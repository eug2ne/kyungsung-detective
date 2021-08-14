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

    options_window.classList.add("visible");
}

document.body.addEventListener("click", e => {
    if (e.target.matches("td"))
        options_window(e);
});

// target obj
    // target obj exists only one at a time
    // if new element is set to target, update target obj
var target = {
    "pos" : "null",
    "letter" : "null",
    "merge" : function merge() {
        // merge function
    },
    "word" : function word() {
        // word function
    },
    "blank" : function blank() {
        // blank function
    }
}
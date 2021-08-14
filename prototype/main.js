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
}

document.body.addEventListener("click", e => {
    if (e.target.matches("td"))
        options_window(e);
});

// target obj
    // if new td clicked >> update target obj
let target = {
    pos : null,
    letter : null,
    element : null,
    table : null,
    set clickOnTd(Td) {
        this.element = Td;
        this.letter = Td.innerHTML;
        this.pos = `${Td.ariaColIndex},${Td.ariaRowIndex}`;
        this.table = Td.closest("table");

        this.element.classList.add("target");
    },
    merge : function() {
        // merge method
            // let choosable_array
            // for letter in choosable_array
                // addEventListener("click", e=> {})
                    // try {e.target.innerHTML in valid_mergewordlist.valid[this.element.innerHTML]}
                    // (some error handling)
    },
    word : function() {
        // function method
    },
    blank : function() {
        // blank method
    }
}

document.body.addEventListener("click", e => {
    try {
        target.element.classList.remove("target");
    } catch (TypeError) {}

    if (e.target.matches("td"))
        target.clickOnTd = e.target;
});
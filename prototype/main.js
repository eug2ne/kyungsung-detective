// options-window function
function options_window(e) {
    const { clientX: mouseX, clientY: mouseY } = e;
    const options_window = document.querySelector("#options-window");

    options_window.style.top = `${mouseY}px`;
    options_window.style.left = `${mouseX}px`;

    options_window.style.display = "block";
    options_window.classList.add("visible");
}

// show up option-window when click on td
document.addEventListener("click", e => {
    if (e.target.matches("td"))
        // open up options-window
        options_window(e);

    else {
        // remove options-window
        document.querySelector("#options-window").classList.remove("visible");
        document.querySelector("#options-window").style.display = "none";
    }
});

// target obj
// if new td clicked >> update target obj
let target = {
    x_pos: null,
    y_pos: null,
    letter: null,
    element: null,
    table: null,
    set clickOnTd(Td) {
        this.element = Td;
        this.letter = Td.innerHTML;
        this.x_pos = parseInt(Td.ariaColIndex);
        this.y_pos = parseInt(Td.ariaRowIndex);
        this.table = Td.closest("table");

        this.element.classList.add("target");
    },
    merge: function () {},
    word: function () {},
    blank: function () {}
}

// click event for main page
document.body.addEventListener("click", e => {
    try {
        // delete every td with class (target, choosable)
        document.querySelectorAll("td.target, td.choosable").forEach(element => element.classList.remove("target", "choosable"));
    } catch (TypeError) { }

    finally {
        if (e.target.matches("td"))
            //set target obj
            target.clickOnTd = e.target;

        // reload function
        else if (e.target.matches("h1"))
            location.reload();
    }
});

// set click event for option
document.body.addEventListener("click", e => {
    if (e.target.parentElement.matches("#options-window")) {
        // show target td
        target.element.classList.add("target");

        switch (e.target.id) {
            case "merge":
                // show choosable td
                // event: click >> merge with target
                target.merge();
                break;

            case "word":
                // show choosable td
                // event: click >> append to chosen_letter
                // create word div
                target.word();
                break;

            case "blank":
                // evaluate target + choosable
                target.blank();
                break;
        }
    }
});
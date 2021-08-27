// options-window function
function options_window(e) {
    const { clientX: mouseX, clientY: mouseY } = e;
    const options_window = document.querySelector("#options-window");

    options_window.style.top = `${mouseY}px`;
    options_window.style.left = `${mouseX}px`;

    options_window.style.display = "block";
    options_window.classList.add("visible");
}

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
        this.chosen = { "0,0": target.letter, "1,0": null, "0,1": null, "1,1": null, "0,2": null, "1,2": null };

        Td.className = "target";
    },
    merge: function (input_letter, input_xpos) {
        fetch("valid_mergewordlist.json")
            .then(response => response.json())
            .then(json => {
                try {
                    if (json.valid[`${this.letter}`].includes(input_letter)) {
                        this.table.querySelector(`td[aria-colindex="${Math.min(this.x_pos, input_xpos)}"][aria-rowindex="${this.y_pos}"]`).innerHTML = json.merge[`${this.letter},${input_letter}`];

                        // regression on tr
                        function regression(max_td) {
                            if (max_td.nextElementSibling == null || max_td.nextElementSibling.ariaColIndex != parseInt(max_td.ariaColIndex) + 1 || max_td.nextElementSibling.matches("td.word"))
                                max_td.innerHTML = "";

                            else {
                                max_td.innerHTML = max_td.nextElementSibling.innerHTML;
                                regression(max_td.nextElementSibling);
                            }
                        }

                        regression(this.table.querySelector(`td[aria-colindex="${Math.max(this.x_pos, input_xpos)}"][aria-rowindex="${this.y_pos}"]`));
                        return;
                    } else {
                        throw new Error("MergeImpossibleError");
                    }

                } catch (Error) {
                    alert(Error.message);
                    return;
                }
            });

    },
    word: function (chosen) {
        fetch("wordlist.json")
            .then(response => response.json())
            .then(json => {
                // search word from json
                try {
                    if (Object.values(json).find(element =>
                        compare_obj(element, chosen))) {
                        // create word td
                        this.element.setAttribute("colspan", "2");
                        this.element.setAttribute("rowspan", "3");
                        target.table
                            .querySelectorAll(`td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 2}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 2}"]`)
                            .forEach(element => element.remove());

                        const word = Object.values(json).find(element =>
                            compare_obj(element, chosen));
                        const index = Object.values(json).indexOf(word);
                        this.element.innerHTML
                            = Object.keys(json)[index];
                        this.element.className = "word";
                    }

                    else {
                        throw Error("WordImpossibleError");
                    }
                } catch (Error) {
                    alert(Error.message);
                }
            });
    },
    blank: function (w_space) {
        fetch("valid_wordlist.json")
            .then(response => response.json())
            .then(json => {
                try {
                    if (Object.values(json).includes(w_space))
                    throw Error("BlankImpossibleError");

                    else
                        // blank all td in w_space
                        this.table
                            .querySelectorAll(`td.target, td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 2}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 2}"]`)
                            .forEach(element => {
                                element.innerHTML = "";
                            });
                } catch (error) {
                    alert(error.message);
                }
            });
    }
}

// return { /target_element/ : "0,0", /choosable_element/ : /relative_pos/, ...} object
function word_space() {
    try {
        w_space = {};

        choosables = target.table
            .querySelectorAll(`td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 2}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 2}"]`);

        w_space["0,0"] = target.letter;
        w_space["1,0"] = choosables[0].innerHTML;
        w_space["0,1"] = choosables[1].innerHTML;
        w_space["1,1"] = null;
        w_space["0,2"] = choosables[2].innerHTML;
        w_space["1,2"] = choosables[3].innerHTML;

        return w_space;
    } catch (IndexError) {
        alert(IndexError + "Choose another letter");
    }
}

// compare 2 objects
// if identical, return true
// else, return false
function compare_obj(a, b) {
    let n = 0;
    let compare = true;
    while (compare && n < 6) {
        if (Object.values(a)[n] === Object.values(b)[n])
            n = n + 1;
        else
            compare = false;
    }

    return compare;
}


// main page click event
document.body.addEventListener("click", e => {
    if (e.target.matches("td:not(.choosable)") && e.target.matches("td:not(.chosen)") && e.target.matches("td:not(.word)")) {
        // delete every td with class (target, choosable, chosen)
        document.querySelectorAll("td.target, td.choosable, td.chosen").forEach(element => element.classList.remove("target", "choosable", "chosen"));
        // update target obj
        target.clickOnTd = e.target;

        // open up options-window
        options_window(e);
    }

    // reload function
    else if (e.target.matches("h1"))
        location.reload();

    // click event on td.choosable
    else if (e.target.matches("td.choosable")) {
        if (document.querySelectorAll("td.choosable, td.chosen").length < 5) {
            // merge func.
            target.merge(e.target.innerHTML, parseInt(e.target.ariaColIndex));

            // remove td.choosable + click event
            document.querySelectorAll("td.choosable").forEach(element => {
                element.removeEventListener("click", e => {
                    target.merge(e.target.innerHTML, parseInt(e.target.ariaColIndex));
                });
                element.classList.remove("choosable");
            })
        }
        else {
            // word func.
            e.target.className = "chosen";
            target.chosen[`${parseInt(e.target.ariaColIndex) - target.x_pos},${parseInt(e.target.ariaRowIndex) - target.y_pos}`] = e.target.innerHTML;

            document.querySelector("td.target").addEventListener("click", () => {
                // if target clicked, create word td
                target.word(target.chosen);
            });
        }
    }

    // remove options-window
    else {
        document.querySelector("#options-window").classList.remove("visible");
        document.querySelector("#options-window").style.display = "none";
    }
});



// click event for option - merge
document.querySelector(".option#merge").addEventListener("click", () => {
    // show choosable td
    switch (target.x_pos) {
        case 0:
            target.table.querySelector(`td[aria-colindex="1"][aria-rowindex="${target.y_pos}"]:not(.word)`).className = "choosable";
            break;

        case 14:
            target.table.querySelector(`td[aria-colindex="13"][aria-rowindex="${target.y_pos}"]:not(.word)`).className = "choosable";
            break;

        default:
            target.table.querySelectorAll(`td[aria-colindex="${target.x_pos - 1}"][aria-rowindex="${target.y_pos}"]:not(.word), td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos}"]:not(.word)`)
                .forEach(element => {
                    element.className = "choosable";
                });
            break;
    }
});

// click event for option - word
document.querySelector(".option#word").addEventListener("click", () => {
    try {
        // show choosable td
        if (target.table
            .querySelectorAll(`td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 2}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 2}"]`)
            .length < 5)
            throw ReferenceError;
        else
            target.table
                .querySelectorAll(`td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 2}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 2}"]`)
                .forEach(element => element.className = "choosable");
    } catch (Error) {
        alert("Out of valid index : Choose another target");
    }
});

// click event for option - blank
document.querySelector(".option#blank").addEventListener("click", () => {
    w_space = word_space();
    target.blank(w_space);
});
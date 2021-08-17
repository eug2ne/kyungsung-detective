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

        Td.className = "target";
    },
    merge: function (input_letter, input_xpos) {
        const controller = new AbortController();
        const { siganl } = controller;

        let wordlist = null;
        fetch("valid_mergewordlist.json", { siganl })
            .then(response => response.json())
            .then(json => {
                // import json file
                wordlist = json;

                try {
                    if (wordlist.valid[`${this.letter}`].includes(input_letter)) {
                        console.log(wordlist.merge[`${this.letter},${input_letter}`]);
                        this.table.querySelector(`td[aria-colindex="${Math.min(this.x_pos, input_xpos)}"][aria-rowindex="${this.y_pos}"]`).innerHTML = wordlist.merge[`${this.letter},${input_letter}`];
                        this.table.querySelector(`td[aria-colindex="${Math.max(this.x_pos, input_xpos)}"][aria-rowindex="${this.y_pos}"]`).innerHTML = "";

                        // regression on tr
                        function regression(max_td) {
                            if (parseInt(max_td.ariaColIndex) == 14)
                                max_td.innerHTML = "";

                            else {
                                max_td.innerHTML = max_td.nextElementSibling.innerHTML;
                                regression(max_td.nextElementSibling);
                            }
                        }

                        regression(this.table.querySelector(`td[aria-colindex="${Math.max(this.x_pos, input_xpos)}"][aria-rowindex="${this.y_pos}"]`));

                        // remove choosable
                        this.table.querySelectorAll("td.choosable").forEach(element => element.classList.remove("choosable"));
                    }

                    else
                        throw new Error("MergeImpossibleError");
                } catch (Error) {
                    alert(Error.message);
                }
            });

        // abort fetch()
        controller.abort();
    },
    word: function () { },
    blank: function (word_space) {
        const controller = new AbortController();
        const { siganl } = controller;

        let wordlist = null;
        fetch("valid_wordlist.json", { siganl })
            .then(response => response.json())
            .then(json => {
                // import json file
                wordlist = json;

                // evaluate word_space
                try {
                    // 초성
                    if (!(word_space["0,0"] in wordlist["초성 자음"]["0,0"]))
                        throw Error("Blank Impossible");

                    // 중성 + 종성
                    switch (word_space) {
                        case (word_space["0,1"] == null):
                            if (!(word_space["0,1"] in wordlist["중성 모음1"]["0,1"]))
                                throw Error("WordImpossibleError");
                            break;

                        case (word_space["0,1"] != null):
                            if (wordlist["중성 모음2"]["1,0"].indexOf(word_space["1,0"]) != wordlist["중성 모음2"]["0,1"].indexOf(word_space["0,1"]))
                                throw Error("WordImpossibleError");
                            break;

                        case (word_space["1,2"] == null):
                            if (!(word_space["0,2"] in wordlist["종성 자음1"]["0,2"]))
                                throw Error("WordImpossibleError");
                            break;

                        case (word_space["1,2"] != null):
                            if (wordlist["종성 모음2"]["0,2"].indexOf(word_space["0,2"]) != wordlist["종성 모음2"]["1,2"].indexOf(word_space["1,2"]))
                                throw Error("WordImpossibleError");
                            break;
                    }
                } catch (Error) {
                    // 2x3 element.innerHTML >> ""
                    target.table
                        .querySelectorAll(`td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 2}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 2}"]`)
                        .forEach(element => {
                            element.innerHTML = "";
                        });

                    this.element.innerHTML = "";
                }
            });

        // abort fetch
        controller.abort();
    }
}

// main page click event
document.body.addEventListener("click", e => {
    if (e.target.matches("td:not(.choosable)") && e.target.matches("td:not(.chosen)")) {
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

    else {
        // remove options-window
        document.querySelector("#options-window").classList.remove("visible");
        document.querySelector("#options-window").style.display = "none";
    }
});

// return { /target_element/ : "0,0", /choosable_element/ : /relative_pos/, ...} object
function word_space() {
    try {
        w_space = {};

        choosables = target.table
            .querySelectorAll(`td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 2}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 2}"]`);

        w_space["0,0"] = target.letter;
        w_space["1,0"] = choosables[0].innerHTML;
        w_space["0,1"] = choosables[1].innerHTML;
        w_space["1,1"] = choosables[2].innerHTML;
        w_space["0,2"] = choosables[3].innerHTML;
        w_space["1,2"] = choosables[4].innerHTML;

        return w_space;
    } catch (IndexError) {
        alert(IndexError + "Choose another letter");
    }
}

// set click event for option
document.body.addEventListener("click", e => {
    if (e.target.parentElement.matches("#options-window")) {
        // show target td
        // target.element.classList.add("target");

        switch (e.target.id) {
            case "merge":
                // show choosable td
                switch (target.x_pos) {
                    case 0:
                        target.table.querySelector(`td[aria-colindex="1"][aria-rowindex="${target.y_pos}"]`).className = "choosable";
                        break;

                    case 14:
                        target.table.querySelector(`td[aria-colindex="13"][aria-rowindex="${target.y_pos}"]`).className = "choosable";
                        break;

                    default:
                        target.table.querySelectorAll(`td[aria-colindex="${target.x_pos - 1}"][aria-rowindex="${target.y_pos}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos}"]`).forEach(element => element.className = "choosable");
                        break;
                }

                // click event on td.choosable
                document.querySelectorAll("td.choosable")
                    .forEach(element => {
                        element.addEventListener("click", e => {
                            target.merge(e.target.innerHTML, parseInt(e.target.ariaColIndex));
                        });
                    });
                break;

            case "word":
                try {
                    chosen = { "0,0": target.letter, "1,0": null, "0,1": null, "1,1": null, "0,2": null, "1,2": null };

                    // show choosable td
                    if (target.table
                        .querySelectorAll(`td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 2}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 2}"]`)
                        .length < 5)
                        throw ReferenceError;
                    else
                        target.table
                            .querySelectorAll(`td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 1}"], td[aria-colindex="${target.x_pos}"][aria-rowindex="${target.y_pos + 2}"], td[aria-colindex="${target.x_pos + 1}"][aria-rowindex="${target.y_pos + 2}"]`)
                            .forEach(element => element.className = "choosable");


                    document.querySelectorAll("td.choosable").forEach(element => element.addEventListener("click", e => {
                        // event: click >> append to chosen
                        e.target.className = "chosen";
                        chosen[`${e.target.ariaColIndex - target.x_pos},${e.target.ariaRowIndex - target.y_pos}`] = e.target.innerHTML;
                    }));

                    document.querySelector("td.target").addEventListener("click", e => {
                        // if target clicked, create word div
                        target.word(chosen);
                    });

                } catch (Error) {
                    alert("Out of valid index : Choose another target");
                }

                break;

            case "blank":
                try {
                    w_space = word_space();

                    target.blank(w_space);
                } catch (Error) {
                    alert(Error);
                }

                break;
        }
    }
});
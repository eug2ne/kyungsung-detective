function letterChoose(target, option) {
    // return array of choosable letters for each option
    const table = target.closest("table");
    const x_pos = parseInt(target.ariaColIndex);
    const y_pos = parseInt(target.ariaRowIndex);

    if (option == "merge")
        () => {
            if (target.ariaColIndex == "0")
                table.querySelector(`td[aria-colindex="1"]`).classList.add("choosable");

            else if (target.ariaColIndex == "14")
                table.querySelector(`td[aria-colindex="13"]`).classList.add("choosable");

            else
                for (let x in [ table.querySelector(`td[aria-colindex="${x_pos-1}"]`), table.querySelector(`td[aria-colindex="${x_pos+1}"]`) ]) {
                    x.classList.add("choosable");
                }
        }

    else 
        () => {
            if (target.ariaRowIndex in ["5", "4", "3"])
                () => {
                    for (let x in [ table.querySelector(`td[aria-rowindex="3"][aria-colindex="${x_pos}"]`),
                    table.querySelector(`td[aria-rowindex="3"][aria-colindex="${x_pos+1}"]`),
                    table.querySelector(`td[aria-rowindex="4"][aria-colindex="${x_pos}"]`),
                    table.querySelector(`td[aria-rowindex="4"][aria-colindex="${x_pos+1}"]`),
                    table.querySelector(`td[aria-rowindex="5"][aria-colindex="${x_pos}"]`),
                    table.querySelector(`td[aria-rowindex="5"][aria-colindex="${x_pos+1}"]`) ]) {
                        x.classList.add("choosable");
                    }
                }

            else if (target.ariaRowIndex in ["0", "1", "2"])
                () => {
                    for (let x in [ table.querySelector(`td[aria-rowindex="0"][aria-colindex="${x_pos}"]`),
                    table.querySelector(`td[aria-rowindex="0"][aria-colindex="${x_pos+1}"]`),
                    table.querySelector(`td[aria-rowindex="1"][aria-colindex="${x_pos}"]`),
                    table.querySelector(`td[aria-rowindex="1"][aria-colindex="${x_pos+1}"]`),
                    table.querySelector(`td[aria-rowindex="2"][aria-colindex="${x_pos}"]`),
                    table.querySelector(`td[aria-rowindex="2"][aria-colindex="${x_pos+1}"]`) ]) {
                        x.classList.add("choosable");
                    }
                }

            else
                () => {
                    for (let x in [ table.querySelector(`td[aria-rowindex="${y_pos}"][aria-colindex="${x_pos}"]`),
                    table.querySelector(`td[aria-rowindex="${y_pos}"][aria-colindex="${x_pos+1}"]`),
                    table.querySelector(`td[aria-rowindex="${y_pos+1}"][aria-colindex="${x_pos}"]`),
                    table.querySelector(`td[aria-rowindex="${y_pos+1}"][aria-colindex="${x_pos+1}"]`),
                    table.querySelector(`td[aria-rowindex="${y_pos+2}"][aria-colindex="${x_pos}"]`),
                    table.querySelector(`td[aria-rowindex="${y_pos+2}"][aria-colindex="${x_pos+1}"]`) ]) {
                        x.classList.add("choosable");
                    }
                }
        }
}

function merge(target) {
    // merge selected letters to left
<<<<<<< Updated upstream
    const pre_array = letterChoose(target, "merge");

    for (let pre_letter in pre_array) {
        pre_letter.classList.add("pre");
        // pre_letter.addEventListener("click", e => {
            // if (e.target.innerHTML in possible_merge[`${target.innerHTML}`])
                
        // })
=======
    letterChoose(target, "merge");
    let choosable_array = document.querySelectorAll(`td.choosable`);

    for (let choosable in choosable_array) {
        choosable.addEventListener("click", e => {
            if (e.target.innerHTML in valid_mergewordlist.valid[`${target.innerHTML}`])
                () => {
                target.innerHTML = valid_mergewordlist.merge[`${target.innerHTML},${e.target.innerHTML}`];
                }
            // else
                // error("InvalidMergeError")
        })
>>>>>>> Stashed changes
    }
}

function word(target) {
    // l_array : array of selected letters
    // make word out of selected letters
    // if impossible, WordImpossibleError
    letterChoose(target, "word");
    let choosable_array = document.querySelectorAll(`td.choosable`);
}

function blanck() {
    // if WordImpossibleError + option clicked, make blank space
    letterChoose(target, "word");
    let choosable_array = document.querySelectorAll(`td.choosable`);
}
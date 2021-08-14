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

// letterChoose function
    // return choosable_array for each method
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
            // (error handling using switch?)
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
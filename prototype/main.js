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
function letterChoose(target, table, method) {
    const x_pos = parseInt(target.ariaColIndex);
    const y_pos = parseInt(target.ariaRowIndex);
    let rows = [];

    if (method == "merge")
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
        try {
            rows = [ table.querySelector(`tr[aria-rowindex=${y_pos}]`), this.table.querySelector(`tr[aria-rowindex=${y_pos+1}]`), this.table.querySelector(`tr[aria-rowindex=${y_pos+2}]`) ];
        } catch(Error) {
            rows = [ table.querySelector(`tr[aria-rowindex="3"`), this.table.querySelector(`tr[aria-rowindex="4"`), this.table.querySelector(`tr[aria-rowindex="5"`)];
        }

        for (const row in rows) {
            try {
                for (const x in [ x_pos, x_pos+1 ]) {
                    row.querySelector(`td[aria-colindex="${x}"]`).classList.add("choosable");
                }
            } catch(Error) {
                for (const x in [ 13, 14 ]) {
                    row.querySelector(`td[aria-colindex="${x}"]`).classList.add("choosable");
                }
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
        letterChoose(this.element, this.table, "merge");
        
        document.addEventListener("click", e => {
            if (e.target.matches("td.choosable"))
                () => {
                try {
                    if (e.target.innerHTML in valid_mergewordlist.valid[this.element.innerHTML])
                        () => {
                        this.table.querySelector(`td[aria-colindex="${Math.min(this.element.ariaColIndex, e.target.ariaColIndex)}"]`).innerHTML = valid_mergewordlist.merge[`${this.element.innerHTML},${e.target.innerHTML}`];
                        this.table.querySelector(`td[aria-colindex="${Math.max(this.element.ariaColIndex, e.target.ariaColIndex)}"]`).innerHTML = "";
                        
                        // regression till end of row
                        let row_letter = this.table.querySelector(`td[aria-colindex="${Math.max(this.element.ariaColIndex, e.target.ariaColIndex)}"]`);

                        if (!(row_letter.nextElementSibling))
                            () => {}
                        else
                            () => {
                            row_letter.innerHTML = row_letter.nextElementSibling.innerHTML;
                            row_letter = row_letter.nextElementSibling;
                            }

                        }

                    else
                        throw new Error("MergeImpossibleError");
                } catch(Error) {
                    // show "MegeImpossibleError" on screen
                } finally {
                    e.stopPropagation();
                }
                }
        })
    },
    word : function() {
        // function method
        const x_pos = parseInt(this.element.ariaColIndex);
        const y_pos = parseInt(this.element.ariaRowIndex);
        letterChoose(this.element, this.table, "word");

        let chosen = { "0,0":null, "1,0":null, "0,1":null, "1,1":null, "0,2":null, "1,2":null }
        document.addEventListener("click", e => {
            if (e.target.matches("td.choosable"))
                () => {
                e.target.style.backgroundcolor = "bisque";
                chosen[`${e.target.ariaColIndex - x_pos},${e.target.ariaRowIndex - y_pos}`] = e.target.innerHTML;
                }

            else if (e.target.matches("td.target"))
                return chosen;
        })
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
function letterChoose(target, option) {
    // return array of choosable letters for each option
    const table = target.closest("table");
    const x_pos = parseInt(target.ariaColIndex);
    const y_pos = parseInt(target.ariaRowIndex);

    if (option == "merge")
        () => {
            if (target.ariaColIndex == "0")
                return [ target, table.querySelector(`td[aria-colindex="1"]`) ];

            else if (target.ariaColIndex == "14")
                return [ table.querySelector(`td[aria-colindex="13"]`), target ];

            else
                return [ table.querySelector(`td[aria-colindex="${x_pos-1}"]`), target, table.querySelector(`td[aria-colindex="${x_pos+1}"]`) ]  
        }

    else 
        () => {
            if (target.ariaRowIndex in ["5", "4", "3"])
                return [ table.querySelector(`td[aria-rowindex="3"][aria-colindex="${x_pos}"]`),
                table.querySelector(`td[aria-rowindex="3"][aria-colindex="${x_pos+1}"]`),
                table.querySelector(`td[aria-rowindex="4"][aria-colindex="${x_pos}"]`),
                table.querySelector(`td[aria-rowindex="4"][aria-colindex="${x_pos+1}"]`),
                table.querySelector(`td[aria-rowindex="5"][aria-colindex="${x_pos}"]`),
                table.querySelector(`td[aria-rowindex="5"][aria-colindex="${x_pos+1}"]`) ];

            else
                return [ table.querySelector(`td[aria-rowindex="${y_pos}"][aria-colindex="${x_pos}"]`),
                table.querySelector(`td[aria-rowindex="${y_pos}"][aria-colindex="${x_pos+1}"]`),
                table.querySelector(`td[aria-rowindex="${y_pos+1}"][aria-colindex="${x_pos}"]`),
                table.querySelector(`td[aria-rowindex="${y_pos+1}"][aria-colindex="${x_pos+1}"]`),
                table.querySelector(`td[aria-rowindex="${y_pos+2}"][aria-colindex="${x_pos}"]`),
                table.querySelector(`td[aria-rowindex="${y_pos+2}"][aria-colindex="${x_pos+1}"]`) ];
        }
}

function merge(target) {
    // merge selected letters to left

}

function word() {
    // l_array : array of selected letters
    // make word out of selected letters
    // if impossible, WordImpossibleError
}

function blanck() {
    // if WordImpossibleError + option clicked, make blank space
}
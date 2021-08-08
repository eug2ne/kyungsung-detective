function letterChoose() {
    let l_array = {};

    const letter = document.querySelector("td");
    letter.addEventListener("click", e => {
        l_array[e.target] = e.target.innerHTML;
    })
}

function merge() {
    // merge selected letters to right
}

function word() {
    // l_array : array of selected letters
    // make word out of selected letters
    // if impossible, WordImpossibleError
}

function blanck() {
    // if WordImpossibleError + option clicked, make blank space
}
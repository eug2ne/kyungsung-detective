document.addEventListener("click", e => {
    if (e.target.matches("h1"))
        location.reload();
})

function options(target) {
    let options = document.createElement("div");

    const merge = document.createElement("div");
    merge.innerHTML = "합치기";
    
    const word = document.createElement("div");
    word.innerHTML = "단어 조합";
    
    const blank = document.createElement("div");
    blank.innerHTML = "빈칸";

    options.append([merge, word, blank]);
    options.position = target.position;
    options.style.getPropertyValue("options.css");
}

document.addEventListener("click", e => {
    if (e.target.matches("td"))
        options.call({}, e.target);
})
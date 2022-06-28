
const texts = [
    "1",
    "moscow",
    "inter",
    "godfather",
    "intheend",
    "spring"
];

let pause_dur = 400;

async function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function text_request(fname) {
    return new Promise((accept, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", fname, true);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    accept(this.responseText);
                } else {
                    reject(this.status);
                }
            }
        };
        xhttp.send();
    });
}

async function load_text(fname) {
    let container = document;
    let words = await text_request(fname);
    words = words
        .replace(/\|/g, " | ")
        .replace(/\n/g, " <br> ")
        .split(/\s+/);
    let spans = "";
    for (let word of words) {
        if (word == "<br>") {
            spans += `<br> `;
        } else {
            spans += `<span>${word}</span> `;
        }
    }

    for (let e of container.getElementsByClassName("piano-text")) {
        e.innerHTML = spans;
    }
}

async function play_text() {
    let container = document;
    let nodes = container
        .getElementsByClassName("piano-text")[0]
        .getElementsByTagName("span");

    let word;
    for (let node of nodes) {
        node.classList.add("piano-text-active");
        word = node.innerText.trim();
        if (word == "!END!") {
            break;
        }
        for (let key of word) {
            play(key);
        }
        await sleep(pause_dur);
        node.classList.remove("piano-text-active");
    }
}

function piano_text_view(text_query) {
    let texts_elems = [];
    for (let t of texts) {
        texts_elems.push(`<a href="?q=${t}">${t}</a>`);
    }
    texts_elems = texts_elems.join(" - ");

    if (text_query) {
        window.addEventListener("load", _ =>
            load_text(`texts/${text_query}.txt`));
    }

    return $div([
        $div({
            style: {
                textAlign: "center",
                margin:    "auto"
            }
        }, [
            $br(),
            texts_elems,
            $br(), $br(),
            $button({
                onclick: e => play_text()
            }, "PLAY"),
            $br(),
            $input({
                type: "range",
                min: 10, max: 1000, value: 500,
                oninput: e => {
                    pause_dur = e.target.value;
                    $get("#pause-txt").innerHTML = `${pause_dur}ms pause`;
                }
            }),
            $div({id: "pause-txt"}, `${pause_dur}ms pause`),
            $br(),
            $div({className: "piano-text"})
        ])
    ]);
}

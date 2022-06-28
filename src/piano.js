
const map = new Map([
    ["1", "36-C2"],
    ["!", "37-Cb2"],
    ["2", "38-D2"],
    ["@", "39-Db2"],
    ["3", "40-E2"],
    ["4", "41-F2"],
    ["$", "42-Fb2"],
    ["5", "43-G2"],
    ["%", "44-Gb2"],
    ["6", "45-A2"],
    ["^", "46-Ab2"],
    ["7", "47-B2"],
    ["8", "48-C3"],
    ["*", "49-Cb3"],
    ["9", "50-D3"],
    ["(", "51-Db3"],
    ["0", "52-E3"],
    ["q", "53-F3"],
    ["Q", "54-Fb3"],
    ["w", "55-G3"],
    ["W", "56-Gb3"],
    ["e", "57-A3"],
    ["E", "58-Ab3"],
    ["r", "59-B3"],
    ["t", "60-C4"],
    ["T", "61-Cb4"],
    ["y", "62-D4"],
    ["Y", "63-Db4"],
    ["u", "64-E4"],
    ["i", "65-F4"],
    ["I", "66-Fb4"],
    ["o", "67-G4"],
    ["O", "68-Gb4"],
    ["p", "69-A4"],
    ["P", "70-Ab4"],
    ["a", "71-B4"],
    ["s", "72-C5"],
    ["S", "73-Cb5"],
    ["d", "74-D5"],
    ["D", "75-Db5"],
    ["f", "76-E5"],
    ["g", "77-F5"],
    ["G", "78-Fb5"],
    ["h", "79-G5"],
    ["H", "80-Gb5"],
    ["j", "81-A5"],
    ["J", "82-Ab5"],
    ["k", "83-B5"],
    ["l", "84-C6"],
    ["L", "85-Cb6"],
    ["z", "86-D6"],
    ["Z", "87-Db6"],
    ["x", "88-E6"],
    ["c", "89-F6"],
    ["C", "90-Fb6"],
    ["v", "91-G6"],
    ["V", "92-Gb6"],
    ["b", "93-A6"],
    ["B", "94-Ab6"],
    ["n", "95-B6"],
    ["m", "96-C7"]
]);

const map_keys = Array.from(map.keys());
let brdw = 1;

let font = "casio-ctk533";

function mkaudio(k) {
    let note = `notes/${font}/${map.get(k)}.mp3`;
    let a = new Audio(note);
    a.loop = false;
    return a;
}

async function play(key) {
    if (!map.get(key))
        return;

    try {
        await mkaudio(key).play();
        $get("#note-" + key).classList.add("piano-pressed");
        setTimeout(() =>
            $get("#note-" + key).classList.remove("piano-pressed"),
            500);
    } catch (e) {
        if (!e.message.includes("play() failed")) {
            console.error(e);
        }
    }
}

function piano_view() {
    let h = 100;
    let w = 20;

    let top = [];
    let btm = [];
    let i = 0, j = 0;
    for (let k of map_keys) {
        let white = k.match("[0-9a-z]") != null;
        if (white) {
            btm.push($div({
                id: "note-" + k,
                className: "piano-key piano-white",
                style: {
                    left:   (i * (w + (brdw * 2))) + "px",
                    height: h + "px",
                    width:  w + "px",
                },
                onclick:      e => play(k),
                onmouseover:  e => play(k),
                ontouchstart: e => play(k)
            }, k));
            ++i;

        } else {
            btm.push($div({
                id: "note-" + k,
                className: "piano-key piano-black",
                style: {
                    left:   ((j * .8) * ((w * .7) + brdw * 2)) + "px",
                    height: (h / 2) + "px",
                    width:  (w * .7) + "px",
                },
                onclick:      e => play(k),
                onmouseover:  e => play(k),
                ontouchstart: e => play(k)
            }, k));
        }
        ++j;
    }

    window.addEventListener("load", _ => {
        // prepare all audio files
        for (let k of map_keys) mkaudio(k);

        // keyboard handlers
        let down_keys = {};
        window.addEventListener("keydown", e => {
            if (!down_keys[e.key]) {
                play(e.key);
                down_keys[e.key] = true;
            }
        });
        window.addEventListener("keyup", e =>
            down_keys[e.key] = false);
    });

    return $div({
        className: "piano",
        style: {
            userSelect: "none",
            height:     (h + (brdw * 2)) + "px",
            width:      ((w + (brdw * 2)) * i) + "px"
        }
    }, [...top, ...btm]);
}

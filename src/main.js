
function main() {
    const con = $get("#con");
    const url = new URL(window.location.href);
    const q = url.searchParams.get("q");

    con.appendChild(piano_view());
    
    con.appendChild($div({style: {
        textAlign: "center",
        margin:    "auto"
    }}, [
        $br(),
        q ? $div([
            $button({
                onclick: e => window.location.href = "?q="
            }, "HIDE TEXT"),
            piano_text_view(q)
        ]) : $button({
            onclick: e => window.location.href = "?q=inter"
        }, "SHOW TEXT")
    ]));
}

main();

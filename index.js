import * as fs from "node:fs";
import * as process from "node:process";

const command = process.argv[2];

if (command == "make") {
    fs.readdir("./holy_text", function (err, files) {
        files.forEach((e) => {
            fs.readFile("./holy_text/" + e, "utf8", function (err, data) {
                if (err) throw err;
                console.log(data.toString());
                execute(data.toString());
            });
        });
    });
} else if (command == "test") {
    fs.readFile("test.txt", "utf8", function (err, data) {
        if (err) throw err;
        var a = execute(data.toString());
        console.log(JSON.stringify(a));
        console.dir(a, { depth: null, colors: true });
    });
}

function execute(code) {
    var pointer = 0;
    const token = code.split("");
    const length = token.length;
    var tree = [];
    const grammar = JSON.parse(fs.readFileSync("grammar.json").toString())
    const index = grammar.map(e => {
        return e.name
    })

    console.log(index)

    token.push("EOF");

    const blank = ["\n", "\r", " ", "\t", ","];

    while (pointer < length) {
        let name = getKeyword();

        if (blank.includes(token[pointer])) {
            pointer++;
            continue;
        } else if (token[pointer] == "(") {
            console.log(findCloseBracket());
            let closeIdx = findCloseBracket();
            let insideContent = code.substring(pointer + 1, closeIdx);
            console.log(insideContent);

            var keyGrammar = grammar[index.indexOf(name)]

            console.log(name)

            console.log(keyGrammar)

            if (index.indexOf(name) == undefined) {
                keyGrammar = {
                    name: "any",
                    type:"any",
                    espects: ["any"]
                }
            }

            const seperateContent = scopeCommaSplit(insideContent);
            console.warn(
                "sigma" + JSON.stringify(scopeCommaSplit(insideContent)),
            );
            var inside = [];

            seperateContent.forEach((e, index, array) => {
                const lastIndex = keyGrammar.espects.at(-1)
                const length = keyGrammar.espects.length - 1
                if (length <= index){
                    var nameSpace = lastIndex
                } else {
                    var nameSpace = keyGrammar.espects[index]
                }
                inside.push({ [nameSpace]: execute(e)});
                console.log(execute(e));
            });

            tree.push({
                name: name,
                type: keyGrammar.type,
                arg: inside,
                scope: [pointer, closeIdx]
            });

            pointer = closeIdx + 1;
        } else {
            // It's just a standalone value (like "a" or "10")
            if (name.length > 0) {
                tree.push({ name: name, inside: [] });
            }
        }

        pointer++;
    }
    if (tree.length == 1) {
        return tree[0];
    }
    return tree;

    function findCloseBracket() {
        var newPointer = pointer + 1;
        var buffer = 1;

        while (true) {
            if (token[newPointer] == "(") {
                buffer++;
            } else if (token[newPointer] == ")") {
                buffer--;
                if (buffer == 0) {
                    return newPointer;
                }
            }

            newPointer++;
        }
    }

    function scopeCommaSplit(text) {
        var scope = 0;
        var splitResult = [];
        var cache = [];

        // var commaNum = 0;

        // for (let i = 0; i < text.length; i++) {
        //     if (text[i] == "(") {
        //         scope++;
        //     } else if (text[i] == ")") {
        //         scope--;
        //     } else if (scope == 0 && text[i] == ",") {
        //         commaNum = commaNum + 1;
        //     }
        // }

        // scope = 0;
        // splitResult = [];
        // cache = [];

        var count = 0;

        for (let i = 0; i < text.length; i++) {
            if (text[i] == "(") {
                scope++;
                cache.push(text[i]);
            } else if (text[i] == ")") {
                scope--;
                cache.push(text[i]);
            } else if (scope == 0 && text[i] == ",") {
                splitResult.push(cache.join(""));
                cache = [];
                count = count + 1;
            } else {
                cache.push(text[i]);
            }
        }

        splitResult.push(cache.join(""));

        return splitResult;
    }

    function getKeyword() {
        var keyword = [];
        while (token[pointer] !== "(" && token[pointer] !== "EOF") {
            if (blank.includes(token[pointer])) {
                pointer++;
                continue;
            }
            keyword.push(token[pointer]);
            pointer++;
        }
        // pointer--;
        return keyword.join("");
    }
}

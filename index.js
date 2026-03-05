import * as fs from "node:fs"
import * as process from "node:process";

const command = process.argv[2];

if (command == "make") {
    fs.readdir("./holy_text", function (err, files) {
        
    })
} else if (command == "test") {
    fs.readFile("test.txt", "utf8", function (err, data) {
        if (err) throw err;
        console.log(data.toString());
        execute(data.toString());
    });
}

function execute(code) {
    var pointer = 0;
    const token = code.split("");
    const length = token.length;

    while (pointer < length) {
        if (token[pointer] == "(") {
            console.log(findCloseBrecket());
        }
        pointer++;
    }

    function findCloseBrecket() {
        var newPointer = pointer + 1;
        var buffer = 1;

        while (newPointer < length) {
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

    function parse() {
        var newPointer = pointer + 1;
    }
}

import * as fs from "node:fs";
import * as process from "node:process";

const command = process.argv[2];

if (command == "make") {
    fs.readdir("./holy_text", function (err, files) {
        files.forEach((e) => {
        });
    });
} else if (command == "test") {
    fs.readFile("test.txt", "utf8", function (err, data) {
    });
}


// this change base string code text into an array that idk how to explain
function lexer(code) {

}
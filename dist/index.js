import * as fs from "node:fs";
import * as process from "node:process";
const command = process.argv[2];
if (command == "make") {
    fs.readdir("./holy_text", function (err, files) {
        files.forEach((e) => {
        });
    });
}
else if (command == "test") {
    fs.readFile("test.txt", "utf8", function (err, data) {
        const code = data.toString();
        lexer(code);
    });
}
// this change base string code text into an array that idk how to explain
function lexer(code) {
    var token = tokenize(code);
    console.log(token);
    function tokenize(code) {
        const validFullString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890$_".split("");
        var pointer = 0;
        var result = [];
        var key = [];
        while (validFullString.includes(code.charAt(pointer))) {
            key.push(code);
            pointer += 1;
        }
        return result;
    }
}

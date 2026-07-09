import * as fs from "node:fs";
import * as process from "node:process";
import { default as lexer, Token } from "./src/lexer/lexer.js";
import { default as parser } from "./src/parser/index.js";
import { treeItem } from "./src/parser/treeItems.js";

const command: string | undefined = process.argv[2];

console.log("start");

function logger(title: string, text: unknown) {
    if (typeof text == "number" || typeof text == "string") {
        console.log(`[${title}]: ` + text);
    } else {
        console.log(`[${title}]:`, text);
    }
}

if (command == "make") {
    fs.readdir(
        "./holy_text",
        function (err: NodeJS.ErrnoException | null, files: string[]) {
            files.forEach((e: string) => {});
        },
    );
} else if (command == "test") {
    fs.readFile("test.txt", "utf8", function (err: unknown, data: unknown) {
        const code: string = data.toString();
        logger("code", code);
        execution(code);
    });
}

function execution(code) {
    const token: Token[] = lexer(code);
    // const tree: treeItem[] = parser(token);
}

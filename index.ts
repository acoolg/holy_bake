import * as fs from "node:fs";
import * as process from "node:process";

const command: string | undefined = process.argv[2];

console.log("start");

function logger(title: string, text: any) {
    console.log(`[${title}]: ` + text)
}

if (command == "make") {
    fs.readdir(
        "./holy_text",
        function (err: NodeJS.ErrnoException | null, files: string[]) {
            files.forEach((e: string) => {});
        },
    );
} else if (command == "test") {
    fs.readFile("test.txt", "utf8", function (err: any, data: any) {
        const code: string = data.toString();
        logger("code", code)
        lexer(code);
    });
}

// this change base string code text into an array that idk how to explain
function lexer(code: string): void {
    var token = tokenize(code);
    logger("token", token)
    type Token = {
        type: string;
        value: string;
    };
    function tokenize(code: string): Token[] {
        const validFullString: string[] =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890$_".split(
                    "",
                );
        return getKeyWord(code)
        function getKeyWord(text) {
            var pointer: number = 0;
            var key: string[] = [];
            while (validFullString.includes(code.charAt(pointer))) {
                key.push(code.charAt(pointer));
                pointer += 1;
            }

            return key;
        }
    }
}

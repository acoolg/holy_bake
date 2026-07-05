export type Token = {
    type:
        | "thing"
        | "dot"
        | "number"
        | "exec"
        | "nextLine"
        | "openRoundBracket"
        | "closeRoundBracket"
        | "openSquareBracket"
        | "closeSquareBracket"
        | "openCurlyBracket"
        | "closeCurlyBracket"
        | "comma"
        | "string"
        | "statement"
        | "binaryExpression"
        | "is";
    value: string;
};

const spcialWordList = [
    "function", "const", "if", "var", "repeat"
]

export default function (code: string): Token[] {
    const token = tokenize(code);

    logger("token", token);

    return token;

    function tokenize(code: string): Token[] {
        const validFullString: string[] =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_".split("");
        const validExecCharacter: string[] = "!<>=".split("");
        const numberString: string[] = "0123456789".split("");
        const bracketString: string[] = "()[]{}".split("");

        let slice: number = 0;
        const token: Token[] = [];

        // tokenize loop
        while (code !== "") {
            code = code.slice(slice);

            const keyCharacter = code.charAt(0);

            if (
                validFullString.includes(keyCharacter) &&
                keyCharacter !== "."
            ) {
                // thing situation
                const keyword = getKeyWord(code);
                slice = keyword.slice;

                if (spcialWordList.includes(keyword.key)) {
                    token.push({
                        type: "statement",
                        value: keyword.key,
                    });
                } else {
                    token.push({
                        type: "thing",
                        value: keyword.key,
                    });
                }


                logger("sliced thing", keyword);
            } else if (keyCharacter === ".") {
                token.push({
                    type: "dot",
                    value: ".",
                });
                slice = 1;
            } else if (numberString.includes(keyCharacter)) {
                const keyword = getKeyNumber(code);
                slice = keyword.slice;

                token.push({
                    type: "number",
                    value: keyword.key,
                });

                logger("sliced number", keyword);
            } else if (bracketString.includes(keyCharacter)) {
                // bracket situation
                token.push({
                    type: getKeyBracket(keyCharacter),
                    value: keyCharacter,
                });
                slice = 1;
            } else if (validExecCharacter.includes(keyCharacter)) {
                // !, <, >, = situation
                const keyword = getKeyExec(code);
                slice = keyword.slice;

                if (keyword.key == "=") {
                    token.push({
                        type: "is",
                        value: keyword.key,
                    });
                } else {
                    token.push({
                        type: "binaryExpression",
                        value: keyword.key,
                    });
                }
                
                logger("sliced exec", keyword);
            } else if (keyCharacter == ";") {
                // ; situation
                token.push({
                    type: "nextLine",
                    value: ";",
                });
                slice = 1;
            } else if (keyCharacter == '"') {
                const keyword = getKeyString(code);
                slice = keyword.slice;
                token.push({
                    type: "string",
                    value: keyword.key,
                });
                logger('sliced "', keyword);
                logger("now", code);
            } else if (keyCharacter == ",") {
                token.push({
                    type: "comma",
                    value: ",",
                });
                slice = 1;
                logger("sliced ,", ",");
            } else {
                slice = 1;
                logger("now", code);
            }
        }

        return token;

        function getKeyString(text: string) {
            let pointer: number = 1;
            const key: string[] = ['"'];

            while (text.charAt(pointer) !== '"') {
                key.push(text.charAt(pointer));
                pointer += 1;
            }

            key.push(text.charAt(pointer));
            pointer += 1;

            return {
                key: key.join("").slice(1, key.length - 1),
                slice: pointer,
            };
        }

        function getKeyNumber(text: string) {
            const numberString: string[] = "0123456789.".split("");

            let pointer: number = 0;
            const key: string[] = [];

            while (numberString.includes(text.charAt(pointer))) {
                key.push(text.charAt(pointer));
                pointer += 1;
            }

            return {
                key: key.join(""),
                slice: pointer,
            };
        }

        function getKeyWord(text: string) {
            const validFullString: string[] =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890$_".split(
                    "",
                );
            let pointer: number = 0;
            const key: string[] = [];
            while (validFullString.includes(text.charAt(pointer))) {
                key.push(text.charAt(pointer));
                pointer += 1;
            }
            return {
                key: key.join(""),
                slice: pointer,
            };
        }

        function getKeyExec(text: string) {
            let pointer: number = 0;
            const key: string[] = [];
            while (validExecCharacter.includes(text.charAt(pointer))) {
                key.push(text.charAt(pointer));
                pointer += 1;
            }

            return {
                key: key.join(""),
                slice: pointer,
            };
        }

        function getKeyBracket(text: "(" | ")" | "{" | "}" | "[" | "]") {
            const Bracket = {
                "(": "openRoundBracket",
                ")": "closeRoundBracket",
                "[": "openSquareBracket",
                "]": "closeSquareBracket",
                "{": "openCurlyBracket",
                "}": "closeCurlyBracket",
            } as const;

            return Bracket[text];
        }

        // function isStringedNumber(string: string): boolean {
        //     const numberString: string[] = "0123456789.".split("");
        //     for (let i = 0; i < string.length; i++) {
        //         if (!numberString.includes(string.charAt(i))) {
        //             logger("ain't number", string);
        //             return false;
        //         }
        //     }
        //     return true;
        // }
    }
}

function logger(title: string, text: unknown) {
    if (typeof text == "number" || typeof text == "string") {
        console.log(`[${title}]: ` + text);
    } else {
        console.log(`[${title}]:`, text);
    }
}
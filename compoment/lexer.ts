export type Token = {
    type: string;
    value: string;
};

export default function (code: string): Token[] {
    var token = tokenize(code);

    logger("token", token)

    return token



    function tokenize(code: string): Token[] {
        const validFullString: string[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890$_".split("");
        const validExecCharacter: string[] = "!<>=".split("");

        var slice: number = 0
        var token: Token[] = []

        // tokenize loop
        while (code !== "") {
            code = code.slice(slice)

            const keyCharacter = code.charAt(0)

            if (validFullString.includes(keyCharacter)) { // thing situation
                const keyword = getKeyWord(code)
                slice = keyword.slice
                if (isStringedNumber(keyword.key)) {
                    token.push({
                        type: "number",
                        value: keyword.key
                    })
                } else {
                    token.push({
                        type: "thing",
                        value: keyword.key
                    })
                }

                logger("sliced thing", keyword)
            } else if (keyCharacter == "(") { // bracket situation
                token.push({
                    type: "openRoundBracket",
                    value: "("
                })
                slice = 1
            } else if (keyCharacter == ")") {
                token.push({
                    type: "closeRoundBracket",
                    value: ")"
                })
                slice = 1
            } else if (validExecCharacter.includes(keyCharacter)) { // !, <, >, = situation
                const keyword = getKeyExec(code)
                slice = keyword.slice
                token.push({
                    type: "exec",
                    value: keyword.key
                })
                logger("sliced exec", keyword)
            } else if (keyCharacter == ";") { // ; situation
                token.push({
                    type: "nextLine",
                    value: ";"
                })
                slice = 1
            } else if (keyCharacter == "\"") {
                const keyword = getKeyString(code)
                slice = keyword.slice
                token.push({
                    type: "string",
                    value: keyword.key
                })
                logger("sliced \"", keyword)
                logger("now", code)
            } else {
                slice = 1
                logger("now", code)
            }

        }

        return token

        function getKeyString(text) {
            var pointer: number = 1;
            var key: string[] = ["\""];

            while (text.charAt(pointer) !== "\"") {
                key.push(text.charAt(pointer));
                pointer += 1;
            }

            key.push(text.charAt(pointer));
            pointer += 1;

            return {
                key: key.join(""),
                slice: pointer
            };
        }

        function getKeyWord(text) {
            var pointer: number = 0;
            var key: string[] = [];
            while (validFullString.includes(text.charAt(pointer))) {
                key.push(text.charAt(pointer));
                pointer += 1;
            }
            return {
                key: key.join(""),
                slice: pointer
            };
        }

        function getKeyExec(text) {
            var pointer: number = 0;
            var key: string[] = [];
            while (validExecCharacter.includes(text.charAt(pointer))) {
                key.push(text.charAt(pointer));
                pointer += 1;
            }

            return {
                key: key.join(""),
                slice: pointer
            };
        }

        function isStringedNumber(string: string): boolean {
            const numberString: string[] = "0123456789".split("")
            for (var i = 0; i < string.length; i++) {
                if (!numberString.includes(string.charAt(i))) {
                    logger("ain't number", string)
                    return false
                }
            }
            return true
        }
    }
}

function logger(title: string, text: any) {
    if (typeof text == "number" || typeof text == "string") {
        console.log(`[${title}]: ` + text)
    } else {
        console.log(`[${title}]:`, text)
    }


}

import { Token } from "../lexer.js";

export function cutLine(code: Token[]) {
    const scope = {
        round: 0,
        sqare: 0,
        curly: 0,
    };

    let line: Token[] = [];

    const result: Token[][] = [];

    code.forEach((e) => {
        // logger("egg", e);
        // logger("flour", scope);
        if (e.type == "openRoundBracket") {
            scope.round += 1;
        } else if (e.type == "closeRoundBracket") {
            scope.round -= 1;
        } else if (e.type == "openSquareBracket") {
            scope.sqare += 1;
        } else if (e.type == "closeSquareBracket") {
            scope.sqare -= 1;
        } else if (e.type == "openCurlyBracket") {
            scope.curly += 1;
        } else if (e.type == "closeCurlyBracket") {
            scope.curly -= 1;
        }

        if (scope.curly == 0 && scope.round == 0 && scope.sqare == 0) {
            if (e.type == "nextLine") {
                // logger("bao", "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                result.push(line);
                line = [];
            } else {
                line.push(e);
            }
        } else {
            line.push(e);
        }
    });

    if (line.length !== 0) result.push(line);

    return result;
}



export function tokenSplit(text: Token[], key: string) {
    const result: Token[][] = [];
    let line: Token[] = [];

    let scope = 0;

    text.forEach((element) => {
        if (element.type.endsWith("Bracket")) {
            if (element.type.startsWith("start")) {
                scope += 1;
            } else {
                scope -= 1;
            }
        }
        if (element.type !== key) {
            line.push(element);
        } else if (element.type == key && scope !== 0) {
            line.push(element);
        } else {
            result.push(line);
            line = [];
        }
    });

    result.push(line);
    line = [];

    return result;
}

export function scopeFind(code: Token[], type: string): boolean {
    let scope = 0;

    let valid = false

    code.forEach((element) => {
        if (element.type.endsWith("Bracket") && element.type !== type) {
            if (element.type.startsWith("start")) {
                scope += 1;
            } else {
                scope -= 1;
            }
        }

        if (element.type == type && scope == 0) {
            valid = true
        }
    })

    return valid
}

export function isStringedNumber(string: string): boolean {
    const numberString: string[] = "0123456789.".split("");
    for (let i = 0; i < string.length; i++) {
        if (!numberString.includes(string.charAt(i))) {
            logger("ain't number", string);
            return false;
        }
    }
    return true;
}

function logger(title: string, ...text: unknown[]) {
    console.log(`[${title}]:`, ...text);
}

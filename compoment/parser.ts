import { Token } from "./lexer.js";

declare global {
    interface String {
        scopeSplit(delimiter?: string): string[];
    }
}

type TreeFunctionCall = {
    type: "FunctionCall";
    call: string;
    argg: treeItem[];
};

type TreeString = {
    type: "String";
    value: string;
};

type TreeNumber = {
    type: "Number";
    value: number;
};

type TreeIf = {
    type: "TreeIf";
    condition: treeItem[];
    execution: treeItem[];
};

type TreeVariableDeclaration = {
    type: "VariableDeclaration";
    name: string;
    value: treeItem;
};

type treeItem =
    | TreeFunctionCall
    | TreeString
    | TreeNumber
    | TreeIf
    | TreeVariableDeclaration;



export default function (token: Token[]) {
    let tree: treeItem[] = [];

    logger("egg", cutLine(token));

    prase(token);

    function prase(code: Token[]) {

        cutLine(code).forEach((e) => {
            readLine(e);
        });

        function readLine(token: Token[]):treeItem {
            const keyToken = token[0]

            if (keyToken.type == "thing") {
                if (token[1].type == "openRoundBracket") {
                    const inside = token.slice(2, 1)
                    return {
                        type: "FunctionCall",
                        call: keyToken,
                        argg: 
                    }
                    prase(inside)
                }
            }
        }
    }
}



function cutLine(code: Token[]) {
    const scope = {
        round: 0,
        sqare: 0,
        curly: 0,
    };

    let line: Token[] = [];

    const result: Token[][] = [];

    code.forEach((e) => {
        logger("egg", e);
        logger("flour", scope);
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

        if (e.type !== "nextLine") {
            line.push(e);
        }

        if (scope.curly == 0 && scope.round == 0 && scope.sqare == 0) {
            if (e.type == "nextLine") {
                logger("bao", "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                result.push(line);
                line = [];
            }
        }
    });

    return result;
}

function logger(title: string, text: unknown) {
    if (typeof text == "number" || typeof text == "string") {
        console.log(`[${title}]: ` + text);
    } else {
        console.log(`[${title}]:`, text);
    }
}

String.prototype.scopeSplit = function(delimiter?: string) {
    let quoteScope: boolean = true

    if (scope && this) {

    }
}
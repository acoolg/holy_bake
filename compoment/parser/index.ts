import { Token } from "../lexer.js";
import { TreeFunctionCall, treeItem, TreeNumber, TreeString, TreeVariableUse } from "./treeItems.js";
import { cutLine, scopeFind, tokenSplit } from "./tools.js";
import { error } from "node:console";

export default function (token: Token[]) {

    logger("cutLine", cutLine(token));
    logger("prase", prase(token));

    console.dir(prase(token), { depth: null });
}

function prase(code: Token[]) {
    const result: treeItem[] = [];

    cutLine(code).forEach((e) => {
        result.push(readLine(e));
    });

    // if only a thing output without array
    if (result.length == 1) {
        return result[0];
    }

    return result;

    function readLine(token: Token[]): treeItem {
        const keyToken = token[0];

        logger("readline", token);

        if (keyToken.type == "thing") {
            return handleThing(token);
        }

        if (keyToken.type == "string") {
            return handleString(token)
        }
        
        if (keyToken.type == "number") {
            return handleNumber(token)
        }
        
        throw new Error("unknow token")
    }
}

function handleNumber(token: Token[]):TreeNumber {
    const keyToken = token[0];

    return {
        type: "Number",
        value: keyToken.value,
    };
}

function handleString(token: Token[]):TreeString {
    const keyToken = token[0];
    logger("found string", keyToken);
    return {
        type: "String",
        value: keyToken.value,
    };
}

function handleThing(token: Token[]): TreeFunctionCall | TreeVariableUse{
    const keyToken = token[0];
    // handle functionCall
    logger("find function", scopeFind(token, "openRoundBracket"))

    if (scopeFind(token, "openRoundBracket")) {

        const inside = tokenSplit(
            token.slice(2, token.length - 1),
            "comma"
        );

        return {
            type: "FunctionCall",
            call: keyToken.value,
            argg: inside.map((e) => {
                return prase(e);
            }),
        };
    } else {
        return {
            type: "VariableUse",
            name: keyToken.value
        }
    }
}

function logger(title: string, ...text: unknown) {
    console.log(`[${title}]:`, ...text);
}
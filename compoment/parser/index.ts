import { Token } from "../lexer.js";
import { treeItem } from "./treeItems.js";
import { cutLine, scopeFind, tokenSplit } from "./tools.js";

export default function (token: Token[]) {

    logger("egg", cutLine(token));
    logger("meeee", prase(token));

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
        } else if (keyToken.type == "string") {
            logger("found string", keyToken);
            return handleString(token)
        }
    }
}

function handleString(token: Token[]) {
    const keyToken = token[0];
    logger("found string", keyToken);
    return {
        type: "String",
        value: keyToken.value,
    };
}

function handleThing(token: Token[]) {
    // handle functionCall
    logger("find function", scopeFind(token, "openRoundBracket"))
    if (scopeFind(token, "openRoundBracket")) {
        const keyToken = token[0];
        const inside = tokenSplit(token.slice(2, token.length - 1), "comma");
        logger("1", inside);
        logger("2", token.slice(2, token.length - 1));
        logger("3", token);
        return {
            type: "FunctionCall",
            call: keyToken,
            argg: inside.map((e) => {
                return prase(e);
            }),
        };
        prase(inside);
    }
}

function logger(title: string, ...text: unknown) {
    console.log(`[${title}]:`, ...text);
}
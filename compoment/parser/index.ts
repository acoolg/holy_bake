import { Token } from "../lexer.js";
import {
    TreeBinaryExpression,
    TreeFunctionCall,
    treeItem,
    TreeNumber,
    TreeString,
    TreeVariableDeclaration,
    TreeVariableUse,
} from "./treeItems.js";
import { cutLine, scopeFind, tokenSplit, brackets, findCloseBrackets, isExpresionLine } from "./tools.js";


/**
* the defult output function
* @param {Token[]} token the fresh output from the lexer
*/
export default function (token: Token[]) {
    const FinalTree = parseCodeFile(token);

    logger("cutLine", cutLine(token));

    console.dir(FinalTree, { depth: null });

    return FinalTree
}

/**
* Process the raw code file when it's not cutlined
* @param {Token[]} code the fresh(second-hand) output from the lexer
*/ 
function parseCodeFile(code: Token[]): treeItem[] {
    const result: treeItem[] = [];

    cutLine(code).forEach((e) => {
        result.push(parse(e));
    });

    return result;
}

/**
* Process a line of code
* @param {Token[]} code that line of code
*/ 
function parse(code: Token[]): treeItem {
    const keyToken = code[0];

    logger("readline", code);
    
    // calc expresion handle

    if (isExpresionLine(code)) {
        return handleBinaryExpression(code)
    }

    // normal type handle

    if (keyToken.type == "thing") {
        return handleThing(code);
    }

    if (keyToken.type == "string") {
        return handleString(code);
    }

    if (keyToken.type == "number") {
        return handleNumber(code);
    }

    if (keyToken.type == "sysCall") {
        return handleSysCall(code);
    }

    

    throw new Error("unknow token " + keyToken.type);
}

function handleBinaryExpression(token: Token[]) {
    // pratt parsing
}

function handleSysCall(token: Token[]): TreeVariableDeclaration {
    const keyToken = token[0];
    
    if (keyToken.value == "var") {
        const nameSpace = token[1].value

        return {
            type:"VariableDeclaration",
            nameSpace: nameSpace,
            value: parse(token.slice(3))
        }
    }
    
    throw new Error("not systemCall");
}

/**
* Process the Number type
* @param {Token[]} token the type:"Number" kind of token
*/ 
function handleNumber(token: Token[]): TreeNumber {
    const keyToken = token[0];
    logger("found Number", keyToken);

    return {
        type: "Number",
        value: keyToken.value,
    };
}

/**
* Process the String type
* @param {Token[]} token the type:"String" kind of token
*/ 
function handleString(token: Token[]): TreeString {
    const keyToken = token[0];
    logger("found String", keyToken);

    return {
        type: "String",
        value: keyToken.value,
    };
}

/**
* Process the token type "thing", that means "what ever this is"
* @param {Token[]} token "what ever this is"
*/ 
function handleThing(token: Token[]): TreeFunctionCall | TreeVariableUse {
    const keyToken = token[0];
    // handle functionCall
    logger("find function", scopeFind(token, "openRoundBracket"));

    if (scopeFind(token, "openRoundBracket").valid) {
        const inside = tokenSplit(findCloseBrackets(token, brackets.round).slice, "comma");
        logger("a", findCloseBrackets(token, brackets.round).slice)

        return {
            type: "FunctionCall",
            call: keyToken.value,
            argg: inside.map((e) => {
                return parse(e);
            }),
        };
    } else {
        return {
            type: "VariableUse",
            name: keyToken.value,
        };
    }
}

function logger(title: string, ...text: unknown[]): void {
    console.log(`[${title}]:`, ...text);
}



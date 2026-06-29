export type TreeFunctionCall = {
    type: "FunctionCall";
    call: string;
    argg: treeItem[];
};

export type TreeString = {
    type: "String";
    value: string;
};

export type TreeNumber = {
    type: "Number";
    value: string;
};

export type TreeIf = {
    type: "TreeIf";
    condition: treeItem[];
    execution: treeItem[];
};

export type TreeVariableDeclaration = {
    type: "VariableDeclaration";
    name: string;
    value: treeItem;
};

export type TreeVariableUse = {
    type: "VariableUse";
    name: string;
};

export type TreeBinaryExpression = {
    type: "binaryExpression";
    name: "+" | "-" | "*" | "/" | "=" | "<" | ">" | "!";
    left: treeItem;
    right: treeItem;
};

export type treeItem =
    | TreeFunctionCall
    | TreeString
    | TreeNumber
    | TreeIf
    | TreeVariableDeclaration
    | TreeVariableUse
    | TreeBinaryExpression;
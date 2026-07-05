import lexer from "./lexer.ts"
import test from "node:test"
import assert from 'node:assert/strict';

test("tokenize number", () => {
    const inputCode = "67"

    const result = lexer(inputCode)
    const expect = [
        {
            type:"number",
            value: "67"
        }
    ]

    assert.deepEqual(result, expect)
})

test("tokenize string", () => {
    const inputCode = "\"67\""

    const result = lexer(inputCode)
    const expect = [
        {
            type:"string",
            value: "67"
        }
    ]

    assert.deepEqual(result, expect)
})

test("tokenize statement var", () => {
    const inputCode = "var a = 67"

    const result = lexer(inputCode)
    const expect = [
        { type: 'statement', value: 'var' },
        { type: 'thing', value: 'a' },
        { type: 'is', value: '=' },
        { type: 'number', value: '67' }
    ]

    assert.deepEqual(result, expect)
})

test("tokenize statement if", () => {
    const inputCode = "if (a == b) {\nreturn \"good\"\n}"

    const result = lexer(inputCode)
    const expect = [
        { type: 'statement', value: 'if' },
        { type: 'openRoundBracket', value: '(' },
        { type: 'thing', value: 'a' },
        { type: 'binaryExpression', value: '==' },
        { type: 'thing', value: 'b' },
        { type: 'closeRoundBracket', value: ')' },
        { type: 'openCurlyBracket', value: '{' },
        { type: 'thing', value: 'return' },
        { type: 'string', value: 'good' },
        { type: 'closeCurlyBracket', value: '}' }
    ]

    assert.deepEqual(result, expect)
})

test("tokenize next line", () => {
    const inputCode = ";"

    const result = lexer(inputCode)
    const expect = [
        { type: 'nextLine', value: ';' }
    ]

    assert.deepEqual(result, expect)
})
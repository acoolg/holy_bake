export type Token = {
    type: string;
    value: string;
};

export const characterSet = {
    identifierStart: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_".split(""),
    identifier: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_0123456789".split(""),
    number: "0123456789.".split("")

}

export default function(code: string) {
    const eachLine = code.split("\n")

    for (const e in eachLine) {
        const line = eachLine[e]
        logger("line", line)

        while(line !== "") {
            const keyCharacter: string = line.charAt(0)

            if () {

            }
        }
    }

    function getKeyWord(line: string, set: string[]) {
        let scanDone: boolean = false
        let pointer: number = 0
        const result: string[] = []

        while (!scanDone) {
            const keyCharacter: string = line.charAt(pointer)

            if (set.includes(keyCharacter)) {
                result.push(keyCharacter)
                pointer++
            } else {
                scanDone = true
            }
        }

        return {
            slice: pointer,
            string: result.join("")
        }
    }
}


function logger(title: string, ...text: unknown[]): void {
    console.log(`[${title}]:`, ...text);
}



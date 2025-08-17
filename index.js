var fs = require("fs");
var bakeList = require("./translate_list.js");

// 讀取 holy_text 資料夾
fs.readdir("holy_text", function (err, files) {
    if (err) {
        console.error(err);
    } else {
        files.forEach((file) => {
            // 讀取 holy_text 資料夾內的檔案
            fs.readFile("holy_text/" + file, "utf-8", function (err, data) {
                if (err) {
                    console.error("fuck: " + err);
                } else {
                    fs.writeFile(
                        "holy_function/" + file.split(".")[0] + ".mcfunction",
                        bake(data),
                        (err) => {
                            if (err) console.error(err);
                        }
                    );
                }
            });
        });
    }
});

/**
 * bake into mcfunction thing
 *
 * @param {string} text - The text to be logged.
 * @return {void}
 */
function bake(text) {
    console.log("bake: " + text);
    var seperate = text.split("\n");
    var keyWord = bakeList.map((e) => e.keyword);
    var resultList = [];

    seperate.forEach((element) => {
        var compoment = element.split(" ").map(e => e.replace(/\r$/, ""));
        var method = undefined
        var command = undefined
        for (var i = 0; i < 20; i++) {
            compoment.push(" ")
        }

        console.log("baking: " + element);
        if (element == "" || element == "\n" || element == "\r") {
            console.log("empty: 1");
            resultList.push(element)
            return
        } else if (!keyWord.includes(compoment[1]) && !isNaN(Number(compoment[0])) && compoment[0] != "#") {
            console.log("empty: 2");
            console.log("what the fuck is " + compoment[1]);
            resultList.push(`execute as @a[scores={cutscene.tick=${compoment[0]}},c=1] run ${compoment.slice(1).join(" ").trim()}`);
            return
        } else if (!keyWord.includes(compoment[0]) && isNaN(Number(compoment[0])) && compoment[0] != "#") {
            console.log("empty: 3");
            console.log("what the fuck is " + compoment[0]);
            resultList.push(`execute as @a run ${compoment.slice(1).join(" ").trim()}`);
            return
        }
        else if (!isNaN(Number(compoment[0]))) {
            console.log("empty: 4");
            method = bakeList[keyWord.indexOf(compoment[1])];
            command = {
                keyword: method.translate(compoment.slice(2)),
                tick : compoment[0]
            }
        } else if (keyWord.includes(compoment[0])) {
            console.log("empty: 5");
            method = bakeList[keyWord.indexOf(compoment[0])];
            command = {
                keyword: method.translate(compoment.slice(1)),
                tick : false
            }
        } else if (compoment[0] == "#") {
            console.log("empty: 6");
            command = {
                keyword: "# " + compoment.slice(1).join(" "),
                tick : false
            }
        } else {
            console.log("empty: 7");
            console.log("what the fuck is " + compoment[0]);
            return
        }
        console.log(command);
        var translate = command.keyword.trim();
        if (!(command.tick == false)) {
            
            if (translate.includes("\n")) {
                translate.split("\n").forEach((e) => {
                    resultList.push(`execute as @a[scores={cutscene.tick=${command.tick}},c=1] ${e}`);
                })
            } else {
                resultList.push(`execute as @a[scores={cutscene.tick=${command.tick}},c=1] ${translate}`);
            }
        } else if (command.keyword.startsWith("#")) {
            resultList.push(command.keyword.trim());
        } else if (command.keyword != "#") {
            if (translate.includes("\n")) {
                translate.split("\n").forEach((e) => {
                    resultList.push(`execute as @a ${e}`);
                })
            } else {
                resultList.push(`execute as @a ${translate}`);
            }
        } else {
            console.log("what the hell is " + translate);
        }
    });

    return resultList.join("\n");
}

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
        var compoment = element.split(" ");
        if (!keyWord.includes(compoment[0])) {
            console.log("what the fuck is " + compoment[0]);
            return;
        }
        var method = bakeList[keyWord.indexOf(compoment[0])];
        resultList.push(method.translate(compoment.slice(1)));
        console.log("result: " + method.translate(compoment.slice(1)));
    });
    return resultList.join("\n");
}

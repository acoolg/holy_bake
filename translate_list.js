const list =[
    {
        keyword: "say",
        translate: function (text) {
            // say <text>
            return "run say " + text.join(" ")
        }
    },
    {
        keyword: "command",
        translate: function (text) {
            // command <text>
            return "at @s run " + text.join(" ")
        }
    },
    {
        keyword: "title",
        translate: function (text) {
            // title <text>
            return "at @s run title " + text.join(" ")
        }
    },
    {
        keyword: "node",
        translate: function (text) {
            // node <text: walk> <number: x> <number: y> <number: z> <number: layer>
            // node <text: knock> <number: x> <number: y> <number: z> <text: intensity>
            var e = undefined;
            if (text[0] == "walk") {
                e = `run summon runners:walk_target ${text[1]} ${text[2]} ${text[3]}\npositioned ${text[1]} ${text[2]} ${text[3]} run scoreboard players set @e[c=1] npcmove.index ${text[4]}`
            } else if (text[0] == "knock") {
                e = `run summon runners:knockback ${text[1]} ${text[2]} ${text[3]} 0 90 runners:${text[4]}`
            }
            return e
        }
    }
]

module.exports = list;
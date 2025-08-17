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
            // node <walk | knock>
            // node walk <number: x> <number: y> <number: z> <number: layer>
            // node knock <number: x> <number: y> <number: z> <text: intensity>
            var e = undefined;
            if (text[0] == "walk") {
                e = `run summon runners:walk_target ${text[1]} ${text[2]} ${text[3]}\npositioned ${text[1]} ${text[2]} ${text[3]} run scoreboard players set @e[c=1] npcmove.index ${text[4]}`
            } else if (text[0] == "knock") {
                e = `run summon runners:knockback ${text[1]} ${text[2]} ${text[3]} 0 90 runners:${text[4]}`
            }
            return e
        }
    },
    {
        keyword: "create",
        translate: function(text) {
            // create <scoreboard | entity>
            // create entity <text: id> <number: x> <number: y> <number: z> <number: rot x> <number: rot y> <text: event>
            // create scoreboard <text: name>
            if (text[0] == "entity") {
                return `run summon ${text[1]} ${text[2]} ${text[3]} ${text[4]} ${text[5]} ${text[6]} ${text[7]}`
            } else if (text[0] == "scoreboard") {
                return `run scoreboard objectives add ${text[1]} dummy ${text[1]}`
            }
        }
    },
    {
        keyword: "event",
        translate: function (text) {
            // command event syntax
            return "at @s run event " + text.join(" ")
        }
    },
    {
        keyword: "scoreboard",
        translate: function (text) {
            // command scoreboard syntax
            return "at @s run scoreboard " + text.join(" ")
        }
    },
    {
        keyword: "camera",
        translate: function (text) {
            // command camera syntax
            return "at @s run camera " + text.join(" ")
        }
    },
    {
        keyword: "score",
        translate: function (text) {
            // score <add | set> <selector> <text: name> <number: value>
            if (text[0] == "add") {
                return `run scoreboard players add ${text[1]} ${text[2]} ${text[3]}`
            } else if (text[0] == "set") {
                return `run scoreboard players set ${text[1]} ${text[2]} ${text[3]}`
            }
        }
    }
]

module.exports = list;
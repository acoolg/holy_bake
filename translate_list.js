const list =[
    {
        keyword: "say",
        translate: function (text) {
            return "say " + text.join(" ")
        }
    }
]

module.exports = list;
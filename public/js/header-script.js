var accounts = {
    "users": [
        {
            "user": false,
            "photo": "../ProfilePic/mikuuu.jpg",
            "link1": "profile",
            "link2": "settings"
        }
    ]
}

$(document).ready(function(){
    var tHeader = $("#header-template").html();
    var ctHeader = Handlebars.compile(tHeader);
    var dtHeader = ctHeader(accounts.users[0]);

    $("#header").html(dtHeader);
})
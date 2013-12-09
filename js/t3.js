
var pages = {
    t2: function () {return "https://t-square.gatech.edu/portal"},
    course: function (ident) {return "https://t-square.gatech.edu/portal/site/" + ident;},
    gradebook: function (ident) {
        $.get(pages.course(ident), {}, function (data) {
            var page = $("<output>").append($.parseHTML(data));
            console.log($(".icon-sakai-gradebook-tool", page));
            return $($(".icon-sakai-gradebook-tool", page)[0]).attr("href");
        });
    },

};

function openCourse(ident, title) {
    var gradebookUrl = pages.gradebook(ident);
    console.log(gradebookUrl);
    $.get(gradebookUrl, {}, function (data) {
        console.log(data);
    });
}

$.get(pages.t2(), {}, function (data, textStatus, jqXHR) {
    var page = $("<output>").append($.parseHTML(data));
    $.each($("#siteLinkList a", page), function (i, link) {
        var url = $(link).attr("href"), title = $(link).attr("title");
        if (!title || url == "#") return;
        var ident = url.match(/.*\/(.*)/)[1];
        $("#navigation").append($("<div>" + title + "</div>").click(function () {
            openCourse(ident, title);
        }));
    });
    console.log(textStatus);
    console.log(jqXHR);
});



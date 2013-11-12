
function getGradebook() {
    var table = $('table.listHier.wideTable.lines');

    var gradebook = [];
    function generateEmptyCategory() {
        return {
            "name": "",
            "weight": 0.0,
            "grades": []
        };
    }
    var category = generateEmptyCategory();

    jQuery("table.listHier.wideTable tr").each(function (i, row) {
        row = jQuery(row);
        if (!row.hasClass("external")) {
            if (category.name) {
                gradebook.push(category);
                category = generateEmptyCategory();
            }
            category.name = row.find(".categoryHeading").text();
            category.weight = row.find("td:nth-child(5)").text();
        } else {
            category.grades.push({
                "name": row.find(".left").text(),
                "date": row.find("td:nth-child(3)").text(),
                "value": row.find("td:nth-child(4)").text()
            });
        }
    });
    gradebook.push(category);
    return gradebook;
}

gradebook = getGradebook();

console.log(gradebook);


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
            var rawGrade = row.find("td:nth-child(4)").text().split("/");
            var value = rawGrade[0] == '-' ? rawGrade[0] : parseInt(rawGrade[0]);
            var outof = parseInt(typeof rawGrade[1] !== 'undefined' ? rawGrade[1] : 100);
            category.grades.push({
                "name": row.find(".left").text(),
                "date": row.find("td:nth-child(3)").text(),
                "value": value,
                "outof": outof
            });
        }
    });
    gradebook.push(category);
    return gradebook;
}

var gradebook = getGradebook();

console.log("Gradebook");
console.log(gradebook);

function getAverage(gradebook) {
    var n=0, sumGrade=0;
    for (var i=0 ; i < gradebook.length ; i++) {
        for (var j=0 ; j < gradebook[i].grades.length ; j++) {
            var grade = gradebook[i].grades[j].value;
            var outof = gradebook[i].grades[j].outof;
            if (grade == '-') continue;
            n++;
            sumGrade += grade / outof;
        }
    }
    return sumGrade/n;
}

var grade = getAverage(gradebook);

console.log("Average grade");
console.log(Math.round(grade*100));

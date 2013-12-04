
var itemNamespaceLookupTable = {
    "mark": "grade",
    "duedate": "date",
};

function getGradebook() {
    var table = $("table.listHier.wideTable.lines");

    var gradebook = [];
    function generateCategory(name, weight) {
        return {
            "name": name || "",
            "weight": weight || 0.0,
            "grades": []
        };
    }

    function getName(item) {
        // trim for odd non-printing chars around the work
        var name = $(item).text().toLowerCase().replace(/[^a-z0-9]/, "").trim();
        return itemNamespaceLookupTable[name] || name; 
    }

    var itemNs = {};// item namespace; translates item name to column number
    $("table.listHier.wideTable thead tr th").each(function (i, item) {
        if (item = $(item).children("a")) itemNs[getName(item)] = i+1;
    });

    console.log("itemNs");
    console.log(itemNs);
    
    function isCategory(row) {
        var result = row.has("span.categoryHeading").length > 0;
        console.log(row);
        console.log(result);
        return result;
    }
    
    function hasCategory(row) {
        var result = row.has("td.attach").length > 0;
        return result;
    }
    
    var globalCategory = generateCategory("$GLOBAL");

    var rows = jQuery("table.listHier.wideTable tr");
    var category;
    for (var i=0 ; i < rows.length ; i++) {
        var row = $(rows[i]);
        if (row.has("th").length > 0) continue;
        if (isCategory(row)) {
            if (category) gradebook.push(category);
            var category = generateCategory();
            category.name = $(row.find(".categoryHeading")[0]).text();
            if (itemNs["weight"]) category.weight = row.find("td:nth-child(" + itemNs["weight"] + ")").text();
        } else {
            var rawGrade = row.find("td:nth-child(" + itemNs["grade"] + ")").text().trim().split("/");
            var value = rawGrade[0] == "-" ? rawGrade[0] : parseInt(rawGrade[0]);
            var outof = parseInt(typeof rawGrade[1] !== "undefined" ? rawGrade[1] : 100);
            (hasCategory(row) ? category : globalCategory).grades.push({
                "name": row.find("td:nth-child(" + itemNs["title"] + ")").text(),
                "date": row.find("td:nth-child(" + itemNs["date"] + ")").text(),
                "value": value,
                "outof": outof
            });
        }
    }
    if (category) gradebook.push(category);
    if (globalCategory) gradebook.push(globalCategory);
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
            if (grade == "-") continue;
            n++;
            sumGrade += grade / outof;
        }
    }
    return sumGrade/n;
}

var grade = getAverage(gradebook);

console.log("Average grade");
var formattedGrade = Math.round(grade*100);
console.log(formattedGrade);

$(".itemSummary tbody").append($("<tr><td>T&sup3; Grade</td><td>" + formattedGrade + "%</td></tr>"));

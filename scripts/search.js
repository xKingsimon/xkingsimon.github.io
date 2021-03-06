searchArray = [
    [
        "/simon/verschluesselung/RSA-Beispiel.html",
        [["rsa", 100], ["mathe", 75], ["informatik", 80]]
    ], [
        "/simon/mathe/euklidischer-algorithmus.html",
        [["mathe", 100], ["euklidischer", 150], ["algorithmus", 80]]
    ], [
        "/simon/mathe/gausssche-summenformel.html",
        [["mathe", 100], ["gauss", 150], ["summenformel", 150],["sigma",80],["e",30]]
    ], [
        "/simon/mathe/produktzeichen.html",
        [["mathe", 100], ["produkt", 80], ["zeichen", 40], ["pi", 30]]
    ]
];
const umlautMap = {
    '\u00dc': 'UE',
    '\u00c4': 'AE',
    '\u00d6': 'OE',
    '\u00fc': 'ue',
    '\u00e4': 'ae',
    '\u00f6': 'oe',
    '\u00df': 'ss',
}
urls = [];
urlParams = new URLSearchParams(window.location.search);
returnedArray = search(urlParams.get("s"));
toBeLoaded = [];
function search(originalText) {
    words = originalText.split(" ");
    result = [];
    resultIndex = -1
    for (i = 0; i < searchArray.length; i++) {
        var totalValue = 0;
        for (x = 0; x < words.length; x++) {
            text = replaceUmlaute(words[x].toLowerCase());
            for (_i = 0; _i < searchArray[i][1].length; _i++) {
                var currentWeight = searchArray[i][1][_i][1];
                var currentWord = searchArray[i][1][_i][0];
                var ld = levenshteinDistance(currentWord, text);
                var weight = currentWeight / (1 + ld);
                if (ld <= (currentWord.length*0.70))
                {
                    totalValue += weight;
                }
            }
        }
        if (totalValue > 0) {
            resultIndex++;
            var _array = [searchArray[i][0], totalValue];
            result[resultIndex] = _array;
        }
    }
    if (result.length >= 1) {
        return result.sort(compareArray);
    } else {
        return -1;
    }
}
function compareArray(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}
$(document).ready(function () {
    var totalScore = 0;
    for (var i = 0; i < returnedArray.length; i++) {
        totalScore += returnedArray[i][1];
    }
    for (var i = 0; i < returnedArray.length; i++) {
        var url = returnedArray[i][0];
        toBeLoaded[toBeLoaded.length] = queueLoad(i);
        Promise.all(toBeLoaded);
    }
});
function queueLoad(i) {
    var deferred = new $.Deferred();
    totalScore=0;
    for (var x = 0; x < returnedArray.length; x++) {
        totalScore += returnedArray[x][1];
    }
    $('#searchResults').append($("<div class='result'>").load(returnedArray[i][0] + ' #wrapper', function () {
        var headline = $(this).find("h1:first").text();
        $(this).find("h1:first").remove();
        $(".result > #wrapper").text(function () {
            return cutText($(this).text(), 380);
        });
        $(".result > #wrapper").wrapInner("<p>");
        $(".result > #wrapper").prepend("<h1 class='searchResultHeadline' onclick='href(`" + returnedArray[i][0] + "`);'>" + (1+i) +") "+ headline + "</h1>");
        $(".result > #wrapper").append("<br><div class='flex'><a class='searchContinue' href='" + returnedArray[i][0] + "'>Weiter lesen</a>");
        $(".result > #wrapper > div").append("<p class='searchScore'>"+Math.round(returnedArray[i][1]/totalScore*100)+ "%</p><progress class='searchProgress' max='100' value='"+(returnedArray[i][1]/totalScore*100)+"'></progress>");
        $(".result > #wrapper").contents().unwrap();
        MathJax.typeset();
        deferred.resolve("f");
    }));
    return deferred.promise();
}
function cutText(input, x) {
    if (input.length > x) {
        for (i = x; i < input.length; i++) {
            if (input.charAt(i) == " ")
                return input.substring(0, i);
        }
        return input.substring(0, x);
    }
    return input;
};
//by https://stackoverflow.com/users/9619535/andreas-richter

function replaceUmlaute(str) {
    return str
        .replace(/[\u00dc|\u00c4|\u00d6][a-z]/g, (a) => {
            const big = umlautMap[a.slice(0, 1)];
            return big.charAt(0) + big.charAt(1).toLowerCase() + a.slice(1);
        })
        .replace(new RegExp('[' + Object.keys(umlautMap).join('|') + ']', "g"),
            (a) => umlautMap[a]
        );
}
//--------------------------------------------------------
function levenshteinDistance(a, b) {
    array = makeArray(a.length + 1, b.length + 1)
    for (h = 0; h <= a.length; h++) {
        for (v = 0; v <= b.length; v++) {
            if (Math.min(h, v) == 0) {
                array[h][v] = Math.max(h, v);
            } else {
                aIsb = 0;
                if (a.charAt(h - 1) != b.charAt(v - 1)) {
                    aIsb = 1;
                }
                array[h][v] = Math.min(
                    array[h - 1][v] + 1,
                    array[h][v - 1] + 1,
                    array[h - 1][v - 1] + aIsb
                );
            }
        }
    }
    return (array[a.length][b.length]);
}
function makeArray(a, b) {
    var arr = new Array(a)
    for (var i = 0; i < a; i++)
        arr[i] = new Array(b)
    return arr
}
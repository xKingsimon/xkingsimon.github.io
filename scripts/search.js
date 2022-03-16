searchArray = [
    [
        "/simon/verschluesselung/RSA-Beispiel.html",
        [["rsa", 100], ["mathe", 75],["informatik",80]]
    ], [
        "/simon/mathe/euklidischer-algorithmus.html",
        [["mathe", 100],["euklidischer",150],["euklidscher",140],["algorithmus",80],["algoritmus",80],["algorythmus",80],["algorytmus",80]]
    ],[
        "/simon/mathe/gausssche-summenformel.html",
        [["mathe", 100], ["gauss", 150], ["gaussche",150],["summenformel",150],["gausssche",150],["gausche",150],["gaussische",150],["gausiche",150]]
    ], [
        "/simon/mathe/produktzeichen.html",
        [["mathe", 100], ["produkt", 80],["zeichen",40],["pi",30]]
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
function search(text) {
    text = replaceUmlaute(text.toLowerCase());
    result = [];
    resultIndex = -1
    for (i = 0; i < searchArray.length; i++) {
        console.log("search: Searching at i=" + i + " to i=" + (searchArray.length - 1));
        var totalValue = 0;
        for (h = 0; h < searchArray[i][1].length; h++) {
            console.log("search: Testing if " + searchArray[i][1][h][0] + " == " + text);
            if (searchArray[i][1][h][0] == text) {
                console.log("search: Found " + text);
                totalValue += searchArray[i][1][h][1]
            }
        }
        console.log("search: Search through i=" + i + " complete; resulted in a value of: " + totalValue)
        if (totalValue > 0) {
            resultIndex++;
            var _array = [searchArray[i][0], totalValue];
            result[resultIndex] = _array;
        }
    }
    if (result.length >= 1) {
        console.log("search: Done, returning sorted Array")
        console.log(result.sort(compareArray));
        return result.sort(compareArray);
    } else {
        console.log("search: Done, nothing found, returning -1")
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
$(document).ready(function(){
    for(i=0;i<Math.min(4,returnedArray.length);i++) {
        $('#searchResults').append($("<div class='result'>").load(returnedArray[i][0]+' #wrapper', function(){
            $(".result > #wrapper").text(function() {
                return cutText($(this).text(),380);
            });
            $(".result > #wrapper").wrapInner("<p>");
            $(".result > #wrapper").contents().unwrap();
            MathJax.typeset();
        }));
    }
});
function cutText(input,x) {
    if (input.length > x) {
        for(i=x;i<input.length;i++)
        {
            if(input.charAt(i) == " ")
            return input.substring(0, i) + '...';
        }
        return input.substring(0, x) + '...';
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
      .replace(new RegExp('['+Object.keys(umlautMap).join('|')+']',"g"),
        (a) => umlautMap[a]
      );
  }
  //--------------------------------------------------------
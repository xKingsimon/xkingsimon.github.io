searchArray = [
    [
        "/index.html",
        [["rsa", 100], ["mathe", 15]]
    ], [
        "/simon/index.html",
        [["mathe", 10], ["simon", 100]]
    ]
];
$(window).on('load', function () {
    $("input").keydown(function (e) {
        var inputValue = $(this).val();
        if (e.which == 13) {
            var returnArray = search(inputValue);
        }
    });
    $("#importFooter").load("/global/footer.html")
    $("#importNavbar").load("/global/navbar.html", function () {
        $(window).scroll(function () {
            if ($(document).scrollTop() > 0) {
                $("#navbar").addClass("navbarShadow");
            } else if ($(document).scrollTop() <= 0) {
                $("#navbar").removeClass("navbarShadow");
            }
        });
    });
});
$.getJSON("https://api.countapi.xyz/hit/johnsdorfer.de/visits", function (response) {
    $("#visits").text("Diese Seite wurde " + response.value + " mal geladen");
});
function search(text) {
    text = text.toLowerCase()
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
$(window).on('load', function () {
    $("input").keydown(function (e) {
        var inputValue = $(this).val();
        if (e.which == 13) {
            href("/search.html?s="+inputValue);
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
function href(link) {
    window.location.href = link;
}
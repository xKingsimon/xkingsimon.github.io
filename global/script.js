$(window).on('load', function () {
    $.getJSON("https://api.countapi.xyz/hit/johnsdorfer.de/visits", function (response) {
        $("#visits").text("Diese Seite wurde " + response.value + " mal geladen");
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
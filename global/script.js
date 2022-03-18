$(window).on('load', function () {
    $("#importFooter").load("/global/footer.html", function() {
        $.getJSON("https://api.countapi.xyz/hit/johnsdorfer.de/visits", function (response) {
            $("#visits").text("Diese Seite wurde " + response.value + " mal geladen");
        });
    })
    $("#importNavbar").load("/global/navbar.html", function () {
        $(window).scroll(function () {
            if ($(document).scrollTop() > 0) {
                $("#navbar").addClass("navbarShadow");
            } else if ($(document).scrollTop() <= 0) {
                $("#navbar").removeClass("navbarShadow");
            }
        });
        $("#searchField").keydown(function (e) {
            var inputValue = $(this).val();
            if (e.which == 13) {
                href("/search.html?s="+inputValue);
            }
        });
    });
});
function href(link) {
    window.location.href = link;
}
$(document).ready(function() {
    $("#importFooter").load("/global/footer.html")
    $("#importNavbar").load("/global/navbar.html", function() {
        $(window).resize(changeNavSize);
        changeNavSize();
        $(window).scroll(function() {
            if ($(document).scrollTop() > navbbox_bot) {
                if (!$("#navbar").hasClass("sticky")) {
                    $("#navbar").addClass("sticky");
                    $("#navbarPlaceholder").css("height", navHeight);
                }
            } else if ($(document).scrollTop() <= navbbox_bot) {
                $("#navbar").removeClass("sticky");
                $("#navbarPlaceholder").css("height", 0);
            }
        });
    });
});

$.getJSON("https://api.countapi.xyz/hit/johnsdorfer.de/visits", function(response) {
    $("#visits").text("Diese Seite wurde "+response.value+" mal geladen");
});
function href(url) {
    window.location.replace(url);
}

function changeNavSize() {
    navbbox_bot = document.getElementById("navbarPlaceholder").getBoundingClientRect().bottom + window.scrollY;
    navHeight = $("#navbar").outerHeight();
}
$(document).ready(function() {
    $("#importNavbar").load("/global/navbar.html", function() {
        $(window).resize(changeNavSize);
        changeNavSize();
        $(window).scroll(function() {
            console.log("Current X: "+$(document).scrollTop())
            console.log("Placeholder X: "+navbbox_bot)
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

function href(url) {
    window.location.replace(url);
}

function changeNavSize() {
    navbbox_bot = document.getElementById("navbarPlaceholder").getBoundingClientRect().bottom + window.scrollY;
    navHeight = $("#navbar").outerHeight();
}
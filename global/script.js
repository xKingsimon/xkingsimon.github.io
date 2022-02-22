$(document).ready(function () {
  $("#importNavbar").load("/global/navbar.html", function() {
    var navbbox_bot = document.getElementById("navbar").getBoundingClientRect().height;
    var navHeight = $("#navbar").outerHeight();
    $(window).scroll(function () {
      if ($(document).scrollTop() >= navbbox_bot) {
        if (!$("#navbar").hasClass("sticky"))
        {
          $("#navbar").css("top",-navHeight + "px");
          console.log("set top to: "+-navHeight+"px");
          $("#navbar").addClass("sticky");
          $("#navbarPlaceholder").css("height", navbbox_bot);
          $("#navbar").animate({top: "0px"}, 300);
        }
          } else if($(document).scrollTop() == 0) {
        $("#navbar").removeClass("sticky");
        $("#navbarPlaceholder").css("height", 0);
      }
    });
  });
});
function href(url) {
  console.log("link to" + url)
  window.location.replace(url);
}
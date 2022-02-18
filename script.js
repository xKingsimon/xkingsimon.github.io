$(document).ready(function () {
  var navbbox_bot = document.getElementById("navbar").getBoundingClientRect().height;
  changeArrowDist();
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

$(window).resize(changeArrowDist);
function changeArrowDist() {
  var dist = document.getElementById("computer2bbox").getBoundingClientRect().left - document.getElementById("svg-triangle3").getBoundingClientRect().right;
  document.documentElement.style.setProperty("--arrow_dist", String(Math.max(0,dist-10))+ "px");
}

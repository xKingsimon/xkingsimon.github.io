$(document).ready(function () {
  var navbbox_bot = $("#navbar").getBoundingClientRect().height;
  $(window).scroll(function () {
    if ($(document).scrollTop() >= navbbox_bot) {
      $("#navbar").addClass("sticky");
      $("#navbarPlaceholder").css("height", navbbox_bot);
    } else {
      $("#navbar").removeClass("sticky");
      $("#navbarPlaceholder").css("height", 0);
    }
  });
});
function changeArrowDist() {
  var dist =
    $("#computer2").getBoundingClientRect().left -
    $("#svg-triangle1").getBoundingClientRect().right;
  root.style.setProperty("--arrow_dist", dist);
  
  console.log(dist);
}

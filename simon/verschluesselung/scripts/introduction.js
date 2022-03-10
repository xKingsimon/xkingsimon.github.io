$(document).ready(function () {
    changeArrowDist();
    console.log("ready");
  });
  
$(window).resize(changeArrowDist);
function changeArrowDist() {
    var dist = document.getElementById("computer2bbox").getBoundingClientRect().left - document.getElementById("svg-triangle3").getBoundingClientRect().right;
    document.documentElement.style.setProperty("--arrow_dist", String(Math.max(0,dist-10))+ "px");
    console.log("changed arrow to "+String(Math.max(0,dist-10))+ "px");
}
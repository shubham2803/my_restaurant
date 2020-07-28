var acc = document.getElementsByClassName("top-accordion");
var i;

acc[0].classList.toggle("active");
var panel = acc[0].nextElementSibling;
panel.style.maxHeight = panel.scrollHeight + "px";

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

/* $(function() {
  $( "#top-accordion" ).accordion({active: 0});
}); */
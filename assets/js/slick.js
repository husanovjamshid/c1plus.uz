const windowSize = window.screen.width;
let slideItemNumber = 4;

if (windowSize <= 1200) slideItemNumber = 3;
if (windowSize <= 1024) slideItemNumber = 2;
if (windowSize <= 600) slideItemNumber = 1;

$(document).ready(function () {
  $(".slick-carousel").slick({
    slidesToShow: slideItemNumber,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });
});
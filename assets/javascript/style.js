$(document).ready(function () {
    $('.owl-carousel#corousel').owlCarousel({
        autoplay: true,
        autoplayTimeout: 3000,
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 3,
                margin: 8,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 1,
                nav: true,
                loop: false,
                margin: 20,
            }
        }
    })
})
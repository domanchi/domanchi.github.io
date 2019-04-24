/**
 * Adjust navbar on scroll.
 */
function dynamicallyModifyNavBar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar.fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar.fixed-top").removeClass("top-nav-collapse");
    }
}

dynamicallyModifyNavBar();
$(window).scroll(dynamicallyModifyNavBar);
(function() {
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

    //  Implement smooth scrolling
    $("a.page-scroll").bind("click", (event) => {
        const anchor = $(event.currentTarget).attr("href");
        $("html, body").stop().animate(
            {
                scrollTop: $(anchor).offset().top,
            },
            1500,
            "easeInOutExpo"
        );

        event.preventDefault();
    });
})();
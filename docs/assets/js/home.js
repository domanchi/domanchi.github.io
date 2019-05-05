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

    function toggleBackToTopButton() {
        if ($(".navbar").offset().top > 300) {
            $(".back-to-top").removeClass("hidden");
        } else {
            $(".back-to-top").addClass("hidden");
        }
    }

    dynamicallyModifyNavBar();
    toggleBackToTopButton();

    $(window).scroll(() => {
        dynamicallyModifyNavBar();
        toggleBackToTopButton();
    });

    $(".navbar-header button").click((event) => {
        //  This action happens *before* corresponding changes to the navbar.
        //  Therefore, the state is one-behind.
        if ($(event.currentTarget).attr("aria-expanded") === "true") {
            $(".navbar").removeClass("expand");
        } else {
            $(".navbar").addClass("expand");
        }
    });

    /**
     * @param {number} location
     */
    function smoothScrollTo(location) {
        $("html, body").stop().animate(
            {
                scrollTop: location,
            },
            1500,
            "easeInOutExpo"
        );
    }

    $("a.page-scroll").bind("click", (event) => {
        const anchor = $(event.currentTarget).attr("href");
        smoothScrollTo($(anchor).offset().top);

        event.preventDefault();
    });
})();
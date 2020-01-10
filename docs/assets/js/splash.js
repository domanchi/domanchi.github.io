(function(){
    //  For some reason, there's a difference between where the carousel starts,
    //  and the width when it changes. If we don't modify the start padding, it
    //  won't load the full text.
    const startPaddingToCursorLine = 150;
    const paddingToCursorLine = 30;

    const revealDuration = 1000;

    //  This is a pretty hacky workaround, but it is necessary if we want to
    //  shim the carousel animation. Essentially, we want to stop the event
    //  propagation until we do our animation, but because the event happens
    //  on the same element, we need to distinguish the difference between
    //  the flow that triggers the custom animation, and the flow that moves
    //  the carousel.
    let lock = false;

    $("#banner-carousel .carousel-item.active .carousel-item-wrapper").width(
        $("#banner-carousel .carousel-item.active h1").width() + startPaddingToCursorLine
    );

    //  We're attaching a custom animation to the carousel, derived from
    //  https://github.com/CodyHouse/animated-headline
    $("#banner-carousel").on("slide.bs.carousel", (event) => {
        if (lock) {
            lock = false;
            return;
        }

        lock = true;
        event.preventDefault();

        const currentWord = $(event.currentTarget).find(".carousel-item.active");
        currentWord.children(".carousel-item-wrapper").animate(
            {
                width: "2px"
            },
            revealDuration,
        ).promise().then(() => {
            $("#banner-carousel").carousel(event.to);
        });

        return false;
    });

    $("#banner-carousel").on("slid.bs.carousel", (event) => {
        const currentWord = $(event.currentTarget).find(".carousel-item.active");
        const wrapper = currentWord.children(".carousel-item-wrapper");

        if (wrapper.width() !== 2) {
            //  Make sure it starts hidden first.
            wrapper.width("2px");
        }

        wrapper.animate(
            {
                width: currentWord.find("h1").width() + paddingToCursorLine,
            },
            revealDuration,
        );
    });
})();

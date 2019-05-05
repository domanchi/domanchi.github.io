(function() {
    //  Enable tooltips
    const windowSize = document.documentElement.clientWidth;
    [
        ".progress-bar-wrapper .segment",
        ".progress-bar-wrapper .title-wrapper",
    ].forEach((selector) => {
        $(selector).each((_, item) => {
            const options = {
                container: item,
                trigger: "focus hover",
                html: true,
            };

            //  Adjust it such that it's more responsive
            //  Source: https://stackoverflow.com/a/4601996
            const a = $(item).children("a");
            if (a.offset().left > windowSize - 100) {
                options.placement = "left";
            }
            a.popover(options);
        });
    });

    let progressBarsFilled = false;
    const progressBarsIDs = {};

    function fillProgressBars() {
        if (progressBarsFilled) {
            return;
        }

        const progressBars = $(".progress-bar-wrapper .progress-bar");
        progressBars.each((_, item) => {
            item = $(item);

            const bottomOfWindow = $(window).scrollTop() + $(window).height();
            const bottomOfItem = item.offset().top + item.outerHeight();
            if (bottomOfWindow < bottomOfItem) {
                return;
            }

            const id = item.uniqueId()[0].id;
            if (progressBarsIDs[id]) {
                return;
            }

            progressBarsIDs[id] = true;
            if (progressBars.length === Object.keys(progressBarsIDs).length) {
                progressBarsFilled = true;
            }

            item.width(`${item.attr("aria-valuenow")}%`);
            item.parents(".progress-bar-wrapper").find(".segments .segment").each((_, segment) => {
                if ($(segment).attr("aria-valuenow") <= item.attr("aria-valuenow")) {
                    $(segment).addClass("filled");
                }
            });
        });
    }

    fillProgressBars();
    $(window).scroll(fillProgressBars);
})();
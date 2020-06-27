const Animations = (() => {
  const viewport = window.innerWidth;
  const Duration = {
    Title: viewport * 2,
    Book: {
      Cover: 800,
      Introduction: 800,
      Meeting: 800,
      DomesticExploration: 800,
      Travels: 800,
      Adventures: 800,
      Final: 800,
      Transition: 800,
    }
  };

  function displayScrollIndicator() {
    gsap.to(
      "#landing .scroll-indicator",
      {
        x: 100,
        opacity: 1,
        ease: "bounce.out",
        duration: 2,
      }
    );
  }

  function hideScrollIndicator() {
    gsap.to(
      "#landing .scroll-indicator",
      {
        opacity: 0,
        duration: 0.2,
      }
    );
  }

  function createLandingScene() {
    //  We need to setup the width, because GSAP pinning doesn't magically do this
    //  for us (unlike ScrollMagic).
    document.querySelector("#landing").style.width = `${Duration.Title}px`;

    //  Since the width is changed, we can't place things on the right of the original
    //  viewport (since it will be on the right of the whole image). Therefore, we
    //  set the position manually.
    const scrollIndicator = document.querySelector("#landing .scroll-indicator");
    const scrollIndicatorWidth = Number.parseFloat(getComputedStyle(scrollIndicator).width);
    scrollIndicator.style.left = 
      `${window.innerWidth - scrollIndicatorWidth - 200}px`;
    
    //  Show help if no scroll activity after a period of time.
    setTimeout(displayScrollIndicator, 1500);
    document.addEventListener("scroll", hideScrollIndicator);

    //  Setup parallax scrolling for the sky and the ground elements.
    gsap.to(
      "#landing .landing__background .parallax__sky",
      {
        backgroundPosition: "-30% 0",
        ease: "linear.easeNone",
        scrollTrigger: {
          horizontal: true,
          scrub: true,
          trigger: "#landing",
          start: "left left",
          end: "right right",
          pin: true,
          pinSpacing: false,
        },
      }
    );
    gsap.to(
      "#landing .landing__background .parallax__ground",
      {
        backgroundPosition: "-5% 0",
        ease: "linear.easeNone",
        scrollTrigger: {
          horizontal: true,
          scrub: true,
          trigger: "#landing",
          start: "left left",
          end: "right right",
        }
      }
    );

    //  Fade out and blend into next section.
    gsap.to(
      "#landing .landing__background .parallax__overlay",
      {
        backgroundImage:
          "linear-gradient(to top left, rgba(21, 21, 21, 1), rgba(21, 21, 21, 1), rgba(21, 21, 21, 1), rgba(21, 21, 21, 1))",
        scrollTrigger: {
          horizontal: true,
          scrub: true,
          trigger: "#landing",

          //  Wait for a little bit, before fading out.
          start: "left left-=20%",

          //  Don't completely fade out until the next section is visible.
          end: "right right-=10%"
        }
      }
    );
  }

  function createBookScene() {
    //  Setup 3D stuff with z-index
    const pages = document.querySelectorAll("#book .page");
    for (let i = 0; i < pages.length; i++) {
      if (i % 2 === 0) {
        pages[i].style.zIndex = (pages.length - i);
      }
    }

    //  We also need to setup the width, since GSAP pinning doesn't do it for us.
    const totalDuration = Object.values(Duration.Book).reduce((a, b) => (a + b)) + Duration.Title;
    document.querySelector("#book").style.width = `${totalDuration - viewport * 0.4}px`;

    //  This pins the book section.
    gsap.to(
      "#book",
      {
        scrollTrigger: {
          horizontal: true,
          scrub: true,
          trigger: "#book",
          start: "left left",
          end: "right right-=50%",
          pin: true,
          pinSpacing: false,
        }
      }
    );

    //  Animate the book moving left, so it has space to open the book.
    const timeline = gsap.timeline()
      .to(
        "#book .pages-container",
        {
          x: "1%",
          scrollTrigger: {
            trigger: "#book",
            horizontal: true,
            scrub: true,
            start: Duration.Title - 500,
            end: Duration.Title + Duration.Book.Cover,
          },
        }
      );

    //  Flip the pages when we scroll.
    Object.keys(Duration.Book).slice(1).forEach((key, index) => {
      let delay = 0;
      for (const [k, v] of Object.entries(Duration.Book)) {
        delay += v;
        if (k === key) {
          break;
        }
      }

      timeline.to(
        "#book",
        {
          scrollTrigger: {
            trigger: "#book",
            horizontal: true,

            //  Since we rely on the `toggle` to set the class (which controls the animations)
            //  the `start` and `end` sections merely indicate *when* to trigger the class
            //  change. For fast scrollers, it is possible that they skip over certain checkpoints
            //  (which will cause strange discrepancies with animations).
            //
            //  To avoid this, we enlarge the area when it can be toggled.
            start: Duration.Title + delay,
            end: Duration.Title + delay + 200,
            onToggle: ({direction}) => {
              if (direction > 0) {
                getPageAtIndex(index * 2 + 1).classList.add("flipped");
                getPageAtIndex(index * 2 + 2).classList.add("flipped");
              } else {
                getPageAtIndex(index * 2 + 1).classList.remove("flipped");
                getPageAtIndex(index * 2 + 2).classList.remove("flipped");
              }

              //  There's a bug with this approach that isn't present in the original PoC.
              //  Since it is now possible to hover on the right page, but turn the left page
              //  (and vice versa), it is now possible that the page gets stuck in "hover" stage.
              //  Then, this stage is on-top of all z-indexes, because `transform` puts the element
              //  in a different stack.
              //
              //  To mitigate this, we control which pages can have the hover effect at any given
              //  time.
              if (direction > 0) {
                if (index > 0) {
                  getPageAtIndex(index * 2).classList.remove("flippable");
                }
                getPageAtIndex(index * 2 + 1).classList.remove("flippable");
                getPageAtIndex((index + 1) * 2).classList.add("flippable");
                if (index < Duration.Book.length - 1) {
                  getPageAtIndex((index + 1) * 2 + 1).classList.add("flippable");
                }
              } else {
                getPageAtIndex((index + 1) * 2).classList.remove("flippable");
                if (index < Duration.Book.length - 1) {
                  getPageAtIndex((index + 1) * 2 + 1).classList.remove("flippable");
                }
                if (index > 0) {
                  getPageAtIndex(index * 2).classList.add("flippable");
                }
                getPageAtIndex(index * 2 + 1).classList.add("flippable");
              }
            },
          }
        }
      )
    });

    let originalOffset = null;
    function resetTransform3D() {
      //  This is a hack to get around the strange padding issue.
      //  For some reason, even with `pinSpacing` off, when the end is reached,
      //  #book is set with the `translate3d` attribute with the duration of the
      //  animations as an offset. As a result, there's a giant padding at the
      //  end of the presentation (that I can't seem to get rid of).
      //
      //  I've narrowed it down to the fact that we're putting the pin on #book
      //  as compared to `createLandingScene`, but can't get any further than that.
      //  Due to time constraints, I'm going to hack around this issue.
      if (originalOffset === null) {
        originalOffset = document.querySelector("#book").style.transform.match(/\d+px/)[0];
      }

      document.querySelector("#book").style.transform = "translate3d(0px, 0px, 0px)";
    }

    //  Due to the padding hack, we also need to handle the case where we refresh
    //  on the last section. This logic will only run upon startup, and will emulate
    //  the `onLeave` logic. We add a delay so there isn't a race condition with asset
    //  loading (and therefore, it will always occur last).
    if (window.scrollX > 0) {
      setTimeout(resetTransform3D, 500);
    }

    gsap.to(
      "#book .pages-container",
      {
        x: -1 * Number.parseFloat(getComputedStyle(document.querySelector("#book .page")).width) / 2,
        scrollTrigger: {
          horizontal: true,
          scrub: true,
          trigger: "#book",
          start: "right right-=60%",
          end: "right+=5% right-=50%",

          onLeave: () => {
            resetTransform3D();
          },
          onEnterBack: () => {
            //  Inverse of `onLeave`. Assumes always starts at left.
            document.querySelector("#book").style.transform = `translate3d(${originalOffset}, 0px, 0px)`;
          }
        },
        startAt: {
          x: "1%",
        }
      }
    );

    //  Blend into final scene.
    gsap.to(
      "#countdown .overlay",
      {
        backgroundColor: "rgba(21, 21, 21, 0)",
        scrollTrigger: {
          horizontal: true,
          scrub: true,
          trigger: "#countdown",
          start: "left-=5% left",
          end: "right right",
        },
      }
    );
  }

  /**
   * @param {number} index integer
   * @returns {Element}
   */
  function getPageAtIndex(index) {
    return document.querySelector(`#book .page:nth-child(${index})`);
  }

  return {
    init: async () => {
      gsap.registerPlugin(ScrollTrigger);

      createLandingScene();
      createBookScene();
    },

    /**
     * Run with a barebone presentation (landing => countdown).
     */
    disable: () => {
      //  Fix the images on the landing page.
      for (const component of [".parallax__sky", ".parallax__ground"]) {
        document.querySelector(`#landing ${component}`).style.backgroundSize = "cover";
      }

      //  Hide the title text.
      document.querySelector("#landing .landing__text").style.display = "none";
  
      //  Hide all other "interactive" sections.
      document.querySelectorAll("section").forEach((section) => {
        if (section.id !== "landing" && section.id !== "countdown") {
          section.style.display = "none";
        }
      });

      //  Show error message.
      document.querySelector("#landing .error").style.display = "block";      
    },
  }
})();
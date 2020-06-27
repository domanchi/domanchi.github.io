const Animations = (() => {
  const viewport = window.innerWidth;
  const Duration = {
    Title: viewport * 2,
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
        backgroundColor: "rgb(25, 25, 25)",
        scrollTrigger: {
          horizontal: true,
          scrub: true,
          trigger: "#landing",

          //  Wait for a little bit, before fading out.
          start: "left left-=20%",

          //  Don't completely fade out until the next section is visible.
          end: "right right-=35%",
        }
      }
    );
  }

  return {
    init: async () => {
      gsap.registerPlugin(ScrollTrigger);

      createLandingScene();
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
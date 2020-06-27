const Browser = (() => {
    /**
     * @param element {Element}
     * @returns {Promise}
     */
    function getBackgroundImageDimensions(element) {
      const imageSrc = getComputedStyle(element).backgroundImage
        .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
        .split(",")[0];
      
      return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
          resolve({
            width: image.width,
            height: image.height,
          });
        }

        image.src = imageSrc;
      });
    }
  
    return {
      /**
       * @returns {boolean}
       */
      isCompatibleWithPresentation: async () => {
        //  First, we check whether the dimensions of the screen will make the presentation
        //  look good. This allows us to skip handling multiple screen sizes, and make it
        //  compatible for everyone.
        //
        //  We calculate this by checking the width of the ground (since it's smaller and
        //  will show signs of bad proportions earlier), and comparing the ratio of that
        //  image with the ratio of the window.
        const dimensions = await getBackgroundImageDimensions(
          document.querySelector("#landing .landing__background .parallax__ground")
        );

        //  0.47 == height % of ground element.
        //  1.05 == background movement due to parallax effect.
        const groundWidth = window.innerHeight * 0.47 * dimensions.width / dimensions.height;
        if (groundWidth <= window.innerWidth * 1.05) {
          return false;
        }

        //  TODO: Javascript check.

        return true;
      }
    }
  })();
(function() {
  const eventTime = Date.parse("2020-07-04T10:00:00.000-07:00");

  //  Geolocate time.
  document.querySelector("#countdown .date").innerHTML = new Intl.DateTimeFormat("en", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeZoneName: "short",
  }).format(eventTime);

  let timer;

  function setTime() {
    let time = eventTime - Date.now();
    if (time < 0) {
      time = 0;
      clearInterval(timer);
    }

    //  We don't need that level of detail.
    time /= 1000;

    const days = Math.floor(time / 60 / 60 / 24);
    time -= days * 60 * 60 * 24;

    const hours = Math.floor(time / 60 / 60);
    time -= hours * 60 * 60;

    const minutes = Math.floor(time / 60);
    time -= minutes * 60;

    for (
      const [key, value] of Object.entries({
        "#countdown .timer .timer__days .timer-number--first": leftPad(days).substr(0, 1),
        "#countdown .timer .timer__days .timer-number--second": leftPad(days).substr(1),
        "#countdown .timer .timer__hours .timer-number--first": leftPad(hours).substr(0, 1),
        "#countdown .timer .timer__hours .timer-number--second": leftPad(hours).substr(1),
        "#countdown .timer .timer__minutes .timer-number--first": leftPad(minutes).substr(0, 1),
        "#countdown .timer .timer__minutes .timer-number--second": leftPad(minutes).substr(1),
        "#countdown .timer .timer__seconds .timer-number--first": leftPad(Math.floor(time)).substr(0, 1),
        "#countdown .timer .timer__seconds .timer-number--second": leftPad(Math.floor(time)).substr(1),
      })
    ) {
      animateTransition(key, value);
    }
  }

  function animateTransition(elementString, value) {
    const element = document.querySelector(elementString);

    //  The `top` and `bottom` refer to the top and bottom halves.
    //  The `-back` components refer to the inverse half: the "back" of the card, when flipped.
    const top = element.querySelector(".timer-number__top");
    const topBack = element.querySelector(".timer-number__top-back");
    const bottom = element.querySelector(".timer-number__bottom");
    const bottomBack = element.querySelector(".timer-number__bottom-back")

    if (top.innerHTML === value) {
      //  No need to change this value.
      return;
    }

    topBack.querySelector("span").innerHTML = value;
    bottomBack.querySelector("span").innerHTML = value;

    gsap.to(top, {
      duration: 0.8,
      rotationX: '-180deg',
      transformPerspective: 300,
      ease: "quart.easeOut",
      onComplete: () => {
        top.innerHTML = value;
        bottom.innerHTML = value;

        gsap.set(top, {rotationX: 0});
      }
    });

    gsap.to(topBack, {
      duration: 0.8,
      rotationX: 0,
      transformPerspective: 300,
      ease: "quart.easeOut",
      clearProps: "all"
    });
  }

  function leftPad(number) {
    return number <= 9 ? `0${number}` : `${number}`;
  }
  
  setTime();
  timer = setInterval(setTime, 1000);
})();
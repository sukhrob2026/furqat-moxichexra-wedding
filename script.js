/* =========================================================
   WEDDING INVITATION
   Furqatjon & Mohichexra
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");

const openInvitation = document.getElementById("openInvitation");

const music = document.getElementById("weddingMusic");
const musicControl = document.getElementById("musicControl");
const musicText = document.getElementById("musicText");


/* =========================================================
   OPEN INVITATION
========================================================= */

openInvitation.addEventListener("click", function () {

    /*
        Mobile browsers generally block autoplay until
        the user interacts with the page.

        Since this button is clicked by the guest, this
        is the perfect moment to start the wedding music.
    */

    playMusic();

    document.body.classList.add("invitation-open");

    setTimeout(function () {

        invitation.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 250);

});


/* =========================================================
   MUSIC
========================================================= */

async function playMusic() {

    try {

        await music.play();

        musicControl.classList.add("playing");

        musicText.textContent = "Musiqa";

        musicControl.setAttribute(
            "aria-pressed",
            "true"
        );

    } catch (error) {

        /*
            Some browsers may still block playback.
            The music control remains available for
            manual activation.
        */

        console.log("Music playback was blocked:", error);

    }

}


function pauseMusic() {

    music.pause();

    musicControl.classList.remove("playing");

    musicText.textContent = "Musiqa";

    musicControl.setAttribute(
        "aria-pressed",
        "false"
    );

}


/* =========================================================
   MUSIC BUTTON
========================================================= */

musicControl.addEventListener("click", function () {

    if (music.paused) {

        playMusic();

    } else {

        pauseMusic();

    }

});


/* =========================================================
   COUNTDOWN
========================================================= */

/*
    Wedding date:
    26 August 2026
    18:00

    The browser uses the visitor's local timezone.
*/

const weddingDate = new Date(
    "August 26, 2026 18:00:00"
).getTime();


const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");


function updateCountdown() {

    const now = Date.now();

    const distance = weddingDate - now;


    /* -----------------------------------------------
       Wedding day has arrived
    ------------------------------------------------ */

    if (distance <= 0) {

        clearInterval(countdownTimer);

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        const countdown = document.querySelector(".countdown");

        countdown.innerHTML = `
            <div style="
                width:100%;
                font-family:'Cormorant Garamond', serif;
                font-size:1.5rem;
                color:#947338;
                font-style:italic;
            ">
                To‘y kuni yetib keldi!
            </div>
        `;

        return;

    }


    /* -----------------------------------------------
       Calculations
    ------------------------------------------------ */

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );


    /* -----------------------------------------------
       Display
    ------------------------------------------------ */

    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


/* Run immediately */

updateCountdown();


/* Update every second */

const countdownTimer = setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    /*
                        Once revealed, we don't need to
                        observe the element anymore.
                    */

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12,

            rootMargin: "0px 0px -40px 0px"
        }

    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener("load", function () {

    /*
        Small delay makes the first scroll-reveal
        animation feel smoother.
    */

    setTimeout(function () {

        const firstReveal =
            document.querySelector(".reveal");

        if (firstReveal) {

            firstReveal.classList.add("visible");

        }

    }, 500);

});


/* =========================================================
   PREVENT MUSIC BUTTON FROM AFFECTING SCROLL
========================================================= */

musicControl.addEventListener(
    "touchstart",
    function (event) {

        event.stopPropagation();

    },
    { passive: true }
);


/* =========================================================
   PAGE VISIBILITY
========================================================= */

/*
    If the visitor switches tabs, pause the music.
    When they return, we don't automatically restart it,
    which avoids browsers unexpectedly playing audio.
*/

document.addEventListener(
    "visibilitychange",
    function () {

        if (document.hidden && !music.paused) {

            music.pause();

            musicControl.classList.remove("playing");

        }

    }
);
/* =========================
   FURQATJON & MOXICHEXRA
   WEDDING INVITATION
========================= */


/* =========================
   ELEMENTS
========================= */

const openButton =
    document.getElementById("openInvitation");

const opening =
    document.getElementById("opening");

const invitation =
    document.getElementById("invitation");

const music =
    document.getElementById("weddingMusic");

const musicControl =
    document.getElementById("musicControl");

const musicText =
    document.getElementById("musicText");


/* =========================
   OPEN INVITATION
========================= */

openButton.addEventListener("click", async () => {

    /*
        Start music after the user
        interacts with the page.

        Modern browsers allow audio
        playback after a button click.
    */

    try {

        await music.play();

        musicControl.classList.add("active");

        musicText.textContent = "Music";

    } catch (error) {

        console.log(
            "Music playback was blocked:",
            error
        );

    }


    /*
        Hide opening screen.
    */

    opening.classList.add("hidden");


    /*
        Scroll into the invitation.
    */

    setTimeout(() => {

        invitation.scrollIntoView({
            behavior: "smooth"
        });

    }, 500);

});


/* =========================
   MUSIC CONTROL
========================= */

musicControl.addEventListener("click", () => {

    if (music.paused) {

        music.play()
            .then(() => {

                musicControl.classList.add("active");

                musicText.textContent = "Music";

            })
            .catch(error => {

                console.log(
                    "Music playback failed:",
                    error
                );

            });

    } else {

        music.pause();

        musicControl.classList.remove("active");

        musicText.textContent = "Muted";

    }

});


/* =========================
   UPDATE MUSIC BUTTON
   IF MUSIC ENDS
========================= */

music.addEventListener("pause", () => {

    musicControl.classList.remove("active");

    musicText.textContent = "Muted";

});


music.addEventListener("play", () => {

    musicControl.classList.add("active");

    musicText.textContent = "Music";

});


/* =========================
   COUNTDOWN
========================= */

const weddingDate =
    new Date(
        "August 26, 2026 19:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        weddingDate - now;


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";

        document.getElementById("hours").textContent = "00";

        document.getElementById("minutes").textContent = "00";

        document.getElementById("seconds").textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(
        ".section-inner, .photo-container, .final-content"
    );


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(element);

    }
);
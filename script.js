
// ===================================
// 1. SECRET PASSWORD
// ===================================

// Change this password whenever you want.
const SECRET_PASSWORD = "Patil";

function checkPassword() {

    const enteredPassword =
        document.getElementById("passwordInput").value;

    const error =
        document.getElementById("passwordError");

    if (enteredPassword === SECRET_PASSWORD) {

        error.textContent = "";

        document.getElementById("passwordInput").value = "";

        nextScreen(1);

        // Try starting music after user interaction
        const music = document.getElementById("bgMusic");

        music.play().then(() => {
            musicPlaying = true;
            updateMusicButton();
        }).catch(() => {
            // Music can still be started manually.
        });

    } else {

        error.textContent =
            "Oops! That's not the secret password. Try again ❤️";

        document.getElementById("passwordInput").value = "";
    }
}


// ===================================
// 2. SCREEN NAVIGATION
// ===================================

function nextScreen(screenNumber) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const selectedScreen =
        document.getElementById("screen" + screenNumber);

    if (!selectedScreen) return;

    selectedScreen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (screenNumber === 4) {
        typeLoveLetter();
    }

    if (screenNumber === 6) {
        createConfetti();
    }
}


// ===================================
// 3. BIRTHDAY COUNTDOWN
// ===================================

// Birthday: 6 November every year.
// The countdown automatically selects the next occurrence.


function getNextBirthday() {

    const now = new Date();

    let year = now.getFullYear();

    if (
        now.getMonth() > 10 ||
        (now.getMonth() === 10 && now.getDate() > 6)
    ) {
        year++;
    }

    return new Date(year, 10, 6, 0, 0, 0);
}


const nextBirthday = getNextBirthday();

function updateCountdown() {

    const now = new Date();

    const difference = nextBirthday - now;

    const birthdayStatus =
        document.getElementById("birthdayStatus");

    if (difference <= 0) return;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
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

    birthdayStatus.textContent =
        "Your special day is getting closer! ❤️";
}

function updateBirthdayStatus() {

    const now = new Date();
    if (now.getMonth() === 10 && now.getDate() === 6) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
        document.getElementById(id).textContent = "00";
    });

    document.getElementById("birthdayStatus").textContent =
        "IT'S YOUR SPECIAL DAY! HAPPY BIRTHDAY! 🎉❤️";

    return;
}

    const todayIsBirthday =
        now.getMonth() === 10 &&
        now.getDate() === 6;

    if (todayIsBirthday) {

        document.getElementById("birthdayStatus").textContent =
            "IT'S YOUR SPECIAL DAY! HAPPY BIRTHDAY! 🎉❤️";

    }
}

updateCountdown();
updateBirthdayStatus();

setInterval(updateCountdown, 1000);


// ===================================
// 4. ROMANTIC LOVE LETTER
// ===================================

const message = `My Dearest Patil ❤️,

Today is all about you, and I wish I could put into words how much you mean to me.

Sometimes, I wonder how one person can bring so much happiness into another person's life. You are that person for me.

Your smile makes my difficult days feel easier. Your presence brings me comfort, and even the smallest moments with you become beautiful memories.

I may not always express everything perfectly, but I hope you know how special you are to me.

On your birthday, I wish you endless happiness, good health, success and the courage to achieve every dream you carry in your heart.

I wish to see you smiling, growing, achieving and enjoying all the beautiful things life has waiting for you.

Thank you for being a beautiful part of my life.

No matter how many birthdays come and go, I will always wish the very best for you.

You deserve all the love and happiness in this world.

Happy Birthday, my favourite person!

I LOVE YOU, MR. PATIL. ❤️

Forever with lots of love,
Your special person 💗`;

let typingStarted = false;

function typeLoveLetter() {

    if (typingStarted) return;

    typingStarted = true;

    const letter =
        document.getElementById("loveLetter");

    let index = 0;

    function type() {

        if (index < message.length) {

            letter.textContent += message.charAt(index);

            index++;

            setTimeout(type, 35);
        }
    }

    type();
}


// ===================================
// 5. BLOW BIRTHDAY CANDLES
// ===================================

function blowCandles() {

    const candles =
        document.getElementById("candles");

    candles.textContent = "💨 💨 💨";

    createConfetti();

    const button = document.querySelector(
        "#screen3 button"
    );

    button.textContent = "Wish Made! ✨";

    alert(
        "Close your eyes, make a beautiful wish and smile! ❤️"
    );
}


// ===================================
// 6. FLOATING HEARTS
// ===================================

function createHearts() {

    const container =
        document.getElementById("hearts");

    const heartTypes = [
        "❤️", "💕", "💗", "💖", "🌸", "💘"
    ];

    for (let i = 0; i < 30; i++) {

        const heart =
            document.createElement("div");

        heart.className = "heart";

        heart.textContent =
            heartTypes[
                Math.floor(Math.random() * heartTypes.length)
            ];

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.animationDelay =
            Math.random() * 9 + "s";

        heart.style.animationDuration =
            (7 + Math.random() * 7) + "s";

        heart.style.fontSize =
            (15 + Math.random() * 20) + "px";

        container.appendChild(heart);
    }
}

createHearts();


// ===================================
// 7. BACKGROUND MUSIC
// ===================================

let musicPlaying = false;

function updateMusicButton() {

    const button =
        document.querySelector(".music-btn");

    button.textContent =
        musicPlaying ? "🔊 Music On" : "🎵 Music Off";
}

async function toggleMusic() {

    const music =
        document.getElementById("bgMusic");

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

    } else {

        try {

            await music.play();

            musicPlaying = true;

        } catch (error) {

            alert(
                "Please add romantic.mp3 inside the music folder."
            );

        }
    }

    updateMusicButton();
}


// ===================================
// 8. FINAL CONFETTI SURPRISE
// ===================================

function createConfetti() {

    const container =
        document.getElementById("confetti");

    const emojis = [
        "❤️", "💖", "💕", "✨", "🌸", "🎉", "🌹"
    ];

    for (let i = 0; i < 55; i++) {

        const item =
            document.createElement("div");

        item.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        item.style.position = "absolute";

        item.style.left = Math.random() * 100 + "vw";

        item.style.top = "-30px";

        item.style.fontSize = "22px";

        container.appendChild(item);

        const drift =
            (Math.random() - 0.5) * 250;

        const duration =
            2500 + Math.random() * 3000;

        const animation = item.animate(
            [
                {
                    transform: "translate(0, 0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(${drift}px, 110vh) rotate(720deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "ease-in"
            }
        );

        animation.onfinish = () => item.remove();
    }
}


// ===================================
// 9. RESTART SURPRISE
// ===================================

function restartWebsite() {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById("screen0").classList.add("active");

    // Reset letter
    document.getElementById("loveLetter").textContent = "";

    typingStarted = false;

    // Reset candles
    document.getElementById("candles").textContent =
        "🕯️ 🕯️ 🕯️";

    // Reset birthday button
    document.querySelector("#screen3 button").textContent =
        "Blow Your Candles 🎂";

    // Clear old confetti
    document.getElementById("confetti").innerHTML = "";

    // Stop music
    const music = document.getElementById("bgMusic");

    music.pause();
    music.currentTime = 0;

    musicPlaying = false;

    updateMusicButton();

    window.scrollTo(0, 0);
}

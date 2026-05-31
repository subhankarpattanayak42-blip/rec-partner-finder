// =============================================
// REC Event Partner Finder - Main JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    const splash = document.getElementById('splash');
    const app = document.getElementById('app');
    const form = document.getElementById('matchForm');
    const findBtn = document.getElementById('findBtn');
    const formCard = document.getElementById('formCard');
    const resultCard = document.getElementById('resultCard');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const partnerName = document.getElementById('partnerName');
    const fullNameInput = document.getElementById('fullName');
    const confettiContainer = document.getElementById('confettiContainer');

    // ─── SPLASH SCREEN ───────────────────────
    const statusMessages = [
        'Initializing matching engine...',
        'Scanning REC student database...',
        'Analyzing compatibility metrics...',
        'Calculating optimal matches...',
        'Finalizing results...',
        'Match ready!'
    ];

    const statusEl = splash.querySelector('.splash-status');
    let msgIndex = 0;

    const msgInterval = setInterval(() => {
        msgIndex = Math.min(msgIndex + 1, statusMessages.length - 1);
        if (statusEl) statusEl.textContent = statusMessages[msgIndex];
    }, 500);

    setTimeout(() => {
        clearInterval(msgInterval);
        splash.classList.add('fade-out');
        setTimeout(() => {
            splash.style.display = 'none';
            app.classList.remove('hidden');
            // animate elements in
            document.querySelectorAll('.step, .testi-card').forEach((el, i) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.4s ease';
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100 + i * 150);
            });
        }, 600);
    }, 2800);

    // ─── FORM SUBMISSION ─────────────────────
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = fullNameInput.value.trim();
        if (!name) {
            fullNameInput.focus();
            fullNameInput.style.borderColor = '#e17055';
            setTimeout(() => { fullNameInput.style.borderColor = ''; }, 1500);
            return;
        }

        // ─── SIMULATE SEARCH ─────────────────
        findBtn.classList.add('loading');

        const searchMessages = [
            '🔍 Scanning REC database...',
            '📊 Analyzing 2,847 profiles...',
            '🧮 Computing compatibility...',
            '✨ Found your perfect match!'
        ];

        let searchIdx = 0;
        const loaderEl = findBtn.querySelector('.btn-loader');
        loaderEl.textContent = searchMessages[0];

        const searchInterval = setInterval(() => {
            searchIdx++;
            if (searchIdx < searchMessages.length) {
                loaderEl.textContent = searchMessages[searchIdx];
            }
        }, 700);

        setTimeout(() => {
            clearInterval(searchInterval);
            findBtn.classList.remove('loading');
            showResult(name);
        }, 2800);
    });

    // ─── SHOW RESULT ─────────────────────────
    function showResult(name) {
        formCard.classList.add('hidden');
        resultCard.classList.remove('hidden');

        userNameDisplay.textContent = name;
        partnerName.textContent = 'Subhankar';

        // Generate confetti
        generateConfetti();

        // Scroll to result
        setTimeout(() => {
            resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    // ─── CONFETTI ────────────────────────────
    function generateConfetti() {
        confettiContainer.innerHTML = '';
        const colors = ['#6c5ce7', '#fd79a8', '#00cec9', '#fdcb6e', '#00b894', '#e17055', '#0984e3', '#a29bfe'];
        const shapes = ['circle', 'square'];

        for (let i = 0; i < 60; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 6 + 4;
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = Math.random() * 2 + 1.5;
            const shape = shapes[Math.floor(Math.random() * shapes.length)];

            confetti.style.cssText = `
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: ${shape === 'circle' ? '50%' : '2px'};
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
            `;
            confettiContainer.appendChild(confetti);
        }

        // Clean up after animation
        setTimeout(() => {
            confettiContainer.innerHTML = '';
        }, 4000);
    }

    // ─── RESET ────────────────────────────────
    window.resetForm = function() {
        resultCard.classList.add('hidden');
        formCard.classList.remove('hidden');
        form.reset();
        fullNameInput.focus();
        confettiContainer.innerHTML = '';
    };

    // ─── SHARE ────────────────────────────────
    window.shareMatch = function() {
        const name = userNameDisplay.textContent;
        const text = `🎯 I found my REC Event Partner on REC Match! I got matched with Subhankar — the most well-mannered and polite guy at REC! Try it yourself! 🎉`;

        if (navigator.share) {
            navigator.share({
                title: 'REC Event Partner Finder',
                text: text,
                url: window.location.href
            }).catch(() => {});
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                alert('📋 Copied to clipboard! Share it with your friends!');
            }).catch(() => {
                prompt('Copy this text:', text);
            });
        }
    };

    // ─── FAQ TOGGLE ──────────────────────────
    document.querySelectorAll('.faq-q').forEach(q => {
        q.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isVisible = answer.style.display !== 'none';
            answer.style.display = isVisible ? 'none' : 'block';
            this.style.opacity = isVisible ? '0.7' : '1';
        });
        // Set initial state
        q.nextElementSibling.style.display = 'none';
    });

    // ─── TYPING ANIMATION FOR NAME INPUT ─────
    const placeholders = ['e.g. Arpit Sharma', 'e.g. Priya Singh', 'e.g. Rahul Verma', 'e.g. Sneha Patel'];
    let phIdx = 0;
    setInterval(() => {
        phIdx = (phIdx + 1) % placeholders.length;
        fullNameInput.setAttribute('placeholder', placeholders[phIdx]);
    }, 3000);

    console.log('🎯 REC Event Partner Finder loaded!');
    console.log('💡 Tip: Everyone gets matched with Subhankar 😉');
});

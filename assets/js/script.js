document.addEventListener('DOMContentLoaded', function () {
    // Génération des icônes Lucides
    lucide.createIcons();

    // Navbar scroll effect
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Animation du texte
    const textElement = document.querySelector('.animate-text h2');
    const texts = [
        "Développeur Web Fullstack Junior",
        "Créateur d'expériences web",
        "Passionné de technologie"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        let displayedText = currentText.substring(0, charIndex);
        textElement.innerHTML = `${displayedText}<span class="cursor">|</span>`;

        // Choix de la vitesse du curseur
        let typeSpeed = 100;
        if (isDeleting) {
            typeSpeed /= 2;
        }

        // Condition de fin du curseur
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 50;
        }

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // Animation de la timeline
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    const body = document.body;
    if (window.innerWidth < 768) { // tablette / mobile
        body.setAttribute("data-bs-offset", "60"); // offset réduit
    }
});
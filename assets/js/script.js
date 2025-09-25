document.addEventListener('DOMContentLoaded', function () {
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
});
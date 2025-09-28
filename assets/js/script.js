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

        let typeSpeed = 100;
        if (isDeleting) typeSpeed /= 2;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 50;
        }

        if (isDeleting) charIndex--;
        else charIndex++;

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
    }, { threshold: 0.1 });
    timelineItems.forEach(item => observer.observe(item));

    // Ajustement offset pour mobile / tablette
    const body = document.body;
    if (window.innerWidth < 768) {
        body.setAttribute("data-bs-offset", "60");
    }

    // FORMULAIRE
    const form = document.getElementById("contact-form");
    const nom = document.getElementById("nom");
    const email = document.getElementById("email");
    const sujet = document.getElementById("sujet");
    const message = document.getElementById("message");

    // Crée un div feedback si inexistant
    function ensureFeedbackDiv(input) {
        let feedback = input.nextElementSibling;
        if (!feedback || !feedback.classList.contains('invalid-feedback')) {
            feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            input.parentNode.appendChild(feedback);
        }
        return feedback;
    }

    // Affiche une alert Bootstrap au-dessus du formulaire
    function showBootstrapAlert(message, type = "success") {
        const alertContainer = document.createElement('div');
        alertContainer.className = `alert alert-${type} alert-dismissible text-center fade show mt-3`;
        alertContainer.role = 'alert';
        alertContainer.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
        // Supprime les anciennes alertes
        const oldAlerts = form.parentNode.querySelectorAll('.alert');
        oldAlerts.forEach(a => a.remove());

        form.parentNode.insertBefore(alertContainer, form);
    }

    // Validation email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Affiche les erreurs sur les inputs
    function showError(input, message) {
        input.classList.add("is-invalid");
        const feedback = ensureFeedbackDiv(input);
        feedback.textContent = message;
    }

    // Supprime les erreurs
    function clearErrors() {
        [nom, email, sujet, message].forEach(input => {
            input.classList.remove("is-invalid");
            const feedback = input.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) feedback.textContent = '';
        });
    }

    // Écoute de l'envoi du formulaire
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();
        let hasError = false;

        if (!nom.value.trim() || !/^[a-zA-ZÀ-ÿ\s'-]{2,}$/.test(nom.value.trim())) {
            showError(nom, "Le nom doit contenir au moins 2 lettres et ne pas avoir de chiffres.");
            hasError = true;
        }

        if (!validateEmail(email.value.trim())) {
            showError(email, "Veuillez entrer une adresse email valide.");
            hasError = true;
        }

        if (!sujet.value.trim() || sujet.value.trim().length < 3) {
            showError(sujet, "Le sujet doit contenir au moins 3 caractères.");
            hasError = true;
        }

        if (!message.value.trim() || message.value.trim().length < 10) {
            showError(message, "Le message doit contenir au moins 10 caractères.");
            hasError = true;
        }

        if (!hasError) {
            // Envoi EmailJS (avec Service ID corrigé)
            emailjs.sendForm('service_1xc9g9p', 'template_3yyt6ks', form, 'KVO2nCs2DD5OtEr1E')
                .then(() => {
                    showBootstrapAlert("Formulaire envoyé avec succès !", "success");
                    form.reset();
                }, (err) => {
                    console.error(err);
                    showBootstrapAlert("Erreur lors de l'envoi du formulaire. Veuillez réessayer.", "danger");
                });
        }
    });
});

/**
 * ============================================
 * Samy Bengriche — Portfolio Scripts
 * Version 3.1 — Formspree + RGPD
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {

    'use strict';

    // ==========================================
    // 1. THEME TOGGLE
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    const setTheme = (isDark) => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeIcon.textContent = isDark ? '🌙' : '☀️';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    const getPreferredTheme = () => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    let isDark = getPreferredTheme();
    setTheme(isDark);

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        setTheme(isDark);
    });

    // ==========================================
    // 2. NAVBAR
    // ==========================================
    const navbar = document.getElementById('navbar');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.getElementById('navOverlay');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const toggleMenu = (forceState) => {
        const isOpen = forceState !== undefined ? forceState : !burger.classList.contains('open');
        burger.classList.toggle('open', isOpen);
        navLinks.classList.toggle('open', isOpen);
        navOverlay.classList.toggle('open', isOpen);
        burger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    navOverlay.addEventListener('click', () => {
        if (burger.classList.contains('open')) toggleMenu(false);
    });

    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', () => {
            if (window.innerWidth <= 768 && burger.classList.contains('open')) {
                toggleMenu(false);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && burger.classList.contains('open')) {
            toggleMenu(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && burger.classList.contains('open')) {
            toggleMenu(false);
        }
    });

    const sections = document.querySelectorAll('section[id]');

    const updateNav = () => {
        const scrollY = window.scrollY;
        navbar.classList.toggle('scrolled', scrollY > 60);

        let activeId = '';
        sections.forEach(sec => {
            const offset = sec.offsetTop - 120;
            if (scrollY >= offset) activeId = sec.id;
        });

        navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
        });
    };

    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                const offset = target.offsetTop - 70;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 3. PROGRESS BAR & BACK TO TOP
    // ==========================================
    const progressBar = document.getElementById('progress-bar');
    const backToTop = document.getElementById('backToTop');

    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', Math.round(progress));

        if (scrollTop > 400) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
    };

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // 4. HERO PARALLAX
    // ==========================================
    const heroImageWrapper = document.getElementById('heroImageWrapper');
    const heroContainer = document.getElementById('heroContainer');

    if (heroContainer && heroImageWrapper) {
        heroContainer.addEventListener('mousemove', (e) => {
            const rect = heroImageWrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            heroImageWrapper.style.transform =
                `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.02)`;
        });

        heroImageWrapper.addEventListener('mouseleave', () => {
            heroImageWrapper.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
        });
    }

    // ==========================================
    // 5. TYPING ANIMATION
    // ==========================================
    const typingEl = document.getElementById('hero-typing');
    if (typingEl) {
        const phrases = [
            'Generative AI & Enterprise Technology Specialist',
            'AI Adoption · Data Analytics · Automation',
            'Building AI programs that deliver value'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeEffect = () => {
            const currentPhrase = phrases[phraseIndex];
            const speed = isDeleting ? 25 : 45;

            if (!isDeleting && charIndex < currentPhrase.length) {
                typingEl.textContent += currentPhrase.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, speed);
            } else if (isDeleting && charIndex > 0) {
                typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeEffect, speed);
            } else if (!isDeleting && charIndex === currentPhrase.length) {
                setTimeout(() => { isDeleting = true; typeEffect(); }, 2200);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, 400);
            }
        };

        setTimeout(typeEffect, 600);
    }

    // ==========================================
    // 6. REVEAL ON SCROLL
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 7. PROJECT MODAL
    // ==========================================
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalObjective = document.getElementById('modalObjective');
    const modalRole = document.getElementById('modalRole');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalLanguages');
    const modalClose = document.querySelector('.modal-close');

    const projectData = {
        '42sh': { title: '42sh — POSIX Shell', objective: 'Develop a POSIX-compliant shell in C with a comprehensive test suite.', role: 'Coordinator and Task Monitor', description: 'Spearheaded a team of four in the creation of a POSIX-compliant shell named 42sh. Oversaw task delegation, project planning, and progress tracking.', technologies: 'C, POSIX, Shell scripting' },
        'tiger': { title: 'Tiger Compiler', objective: 'Design and implement a compiler for the Tiger programming language.', role: 'Group Leader', description: 'Led the development of a compiler for the Tiger language, requiring deep understanding of language theory and compiler construction.', technologies: 'C++, Flex, Bison, LLVM' },
        'ping': { title: 'Ping IDE', objective: 'Develop an Integrated Development Environment (IDE) using JavaScript and Java.', role: 'Full Stack Developer', description: 'Contributed to the development of an IDE called Ping, utilizing both JavaScript and Java.', technologies: 'Java, JavaScript, HTML, CSS' },
        'httpd': { title: 'HTTPd', objective: 'Build an HTTP server in C.', role: 'Lead Developer', description: 'Led the development of an HTTP server in C, focusing on low-level socket programming.', technologies: 'C' },
        'PMS': { title: 'PMS — Port Management System', objective: 'Analyze and manage a port\'s financial and material resources for optimal efficiency.', role: 'Project Analyst', description: 'Conducted a comprehensive analysis of port operations.', technologies: 'Analysis, Optimization' },
        'Zoglu': { title: 'Zoglu — Network Redesign', objective: 'Organize the redesign of a company\'s network system.', role: 'Project Manager', description: 'Managed the redesign of a company\'s network infrastructure.', technologies: 'Network Design, Project Management' },
        'chess': { title: 'Chess Engine', objective: 'Build a chess game engine with move simulation capabilities.', role: 'Lead Developer', description: 'Designed and implemented a chess game engine with a fully functional chessboard.', technologies: 'C++, Python' },
        'librubik': { title: 'Librubik', objective: 'Create a library for Rubik\'s Cube manipulation in C++.', role: 'Developer', description: 'Developed a C++ library for Rubik\'s Cube manipulation.', technologies: 'C++' },
        'ERO': { title: 'ERO — Snow Removal Optimization', objective: 'Develop IT solutions for snow removal in Montreal.', role: 'Project Leader', description: 'Led the research and development of a Python program to find the optimal solution.', technologies: 'Python, Optimization' },
        'libbistro': { title: 'Libbistro', objective: 'Create a library for integer arithmetic computation in any base.', role: 'Developer', description: 'Implemented a C++ library for integer arithmetic in any base with arbitrary precision.', technologies: 'C++, Templates' },
        'vorace': { title: 'Vorace — Web Scraper', objective: 'Develop a web scraper tool to extract data from an e-commerce website.', role: 'Developer', description: 'Created a web scraper tool to extract data from an e-commerce website.', technologies: 'JavaScript' },
        'jws': { title: 'Java Web Services', objective: 'Create the backend for a Bomberman game.', role: 'Backend Developer', description: 'Focused on the backend development of the Bomberman game.', technologies: 'Java' },
        'Malloc': { title: 'Malloc', objective: 'Reimplement a memory allocator in C.', role: 'Developer', description: 'Reimplemented a memory allocator with a custom memory management system.', technologies: 'C, Memory Management' },
        'Boot Camps': { title: 'Boot Camps', objective: 'Intensive learning of programming languages and technologies.', role: 'Participant', description: 'Completed a series of boot camps focused on mastering various programming languages.', technologies: 'JavaScript, SQL, Java, C, C++' },
        'Myfind': { title: 'Myfind', objective: 'Implement the find command in C, including various options.', role: 'Developer', description: 'Developed a custom implementation of the find command.', technologies: 'C' }
    };

    const openModal = (projectKey) => {
        const data = projectData[projectKey];
        if (!data) return;
        const card = document.querySelector(`.project-card[data-project="${projectKey}"]`);
        const imgSrc = card ? card.querySelector('img').src : '';
        modalImg.src = imgSrc;
        modalImg.alt = data.title;
        modalTitle.textContent = data.title;
        modalObjective.textContent = data.objective;
        modalRole.textContent = data.role;
        modalDescription.textContent = data.description;
        const techArray = data.technologies.split(',').map(t => t.trim());
        modalTech.innerHTML = techArray.map(t => `<span>${t}</span>`).join('');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => modalClose.focus(), 100);
    };

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => openModal(card.dataset.project));
    });
    document.querySelectorAll('.project-card-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(btn.dataset.project);
        });
    });
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
    });

    // ==========================================
    // 8. SCROLL EVENTS
    // ==========================================
    let scrollTimeout;
    const onScroll = () => {
        if (scrollTimeout) return;
        scrollTimeout = requestAnimationFrame(() => {
            updateNav();
            updateProgress();
            updateStickyCta();
            scrollTimeout = null;
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateNav();
    updateProgress();

    // ==========================================
    // 9. ACCESSIBILITY — modal keyboard trap
    // ==========================================
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // ==========================================
    // 10. COOKIE BANNER (RGPD)
    // ==========================================
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDecline = document.getElementById('cookieDecline');
    const COOKIE_KEY = 'cookie-consent';

    const showCookieBanner = () => {
        if (!localStorage.getItem(COOKIE_KEY)) {
            setTimeout(() => cookieBanner.classList.add('visible'), 1500);
        }
    };

    const hideCookieBanner = (accepted) => {
        cookieBanner.classList.remove('visible');
        localStorage.setItem(COOKIE_KEY, accepted ? 'accepted' : 'declined');
        if (accepted && typeof gtag === 'function') {
            gtag('consent', 'update', { analytics_storage: 'granted' });
        }
    };

    if (cookieBanner) {
        showCookieBanner();
        cookieAccept.addEventListener('click', () => hideCookieBanner(true));
        cookieDecline.addEventListener('click', () => hideCookieBanner(false));
    }

    // ==========================================
    // 11. STICKY MOBILE CTA
    // ==========================================
    const stickyCta = document.getElementById('stickyMobileCta');

    function updateStickyCta() {
        if (!stickyCta) return;
        if (window.innerWidth <= 768 && window.scrollY > 500) {
            stickyCta.classList.add('visible');
            stickyCta.setAttribute('aria-hidden', 'false');
        } else {
            stickyCta.classList.remove('visible');
            stickyCta.setAttribute('aria-hidden', 'true');
        }
    }
    window.addEventListener('resize', updateStickyCta);
    updateStickyCta();

    // ==========================================
    // 12. CONTACT FORM (Formspree + RGPD)
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const submitBtn = document.getElementById('submitBtn');
        const formStatus = document.getElementById('formStatus');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const consentInput = document.getElementById('consent');
        const honeypot = document.getElementById('website');
        const replyToHidden = document.getElementById('replyto-hidden');

        const showError = (input, message) => {
            input.classList.add('error');
            if (input.type === 'checkbox') input.closest('.checkbox-label').classList.add('error');
            const errorEl = document.getElementById('error-' + input.id);
            if (errorEl) errorEl.textContent = message;
        };

        const clearError = (input) => {
            input.classList.remove('error');
            if (input.type === 'checkbox') input.closest('.checkbox-label').classList.remove('error');
            const errorEl = document.getElementById('error-' + input.id);
            if (errorEl) errorEl.textContent = '';
        };

        const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        const validateForm = () => {
            let isValid = true;

            if (nameInput.value.trim().length < 2) {
                showError(nameInput, 'Le nom doit contenir au moins 2 caractères.');
                isValid = false;
            } else clearError(nameInput);

            if (!validateEmail(emailInput.value.trim())) {
                showError(emailInput, 'Veuillez entrer une adresse email valide.');
                isValid = false;
            } else clearError(emailInput);

            if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'Le message doit contenir au moins 10 caractères.');
                isValid = false;
            } else clearError(messageInput);

            if (!consentInput.checked) {
                showError(consentInput, 'Vous devez accepter pour continuer.');
                isValid = false;
            } else clearError(consentInput);

            return isValid;
        };

        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) clearError(input);
            });
        });
        consentInput.addEventListener('change', () => {
            if (consentInput.checked) clearError(consentInput);
        });

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            if (honeypot.value !== '') {
                console.warn('Spam detected (honeypot).');
                return;
            }

            if (!validateForm()) return;

            replyToHidden.value = emailInput.value.trim();

            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                const formData = new FormData(contactForm);
                formData.delete('consent');

                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = '✅ Message envoyé ! Redirection...';
                    formStatus.classList.add('success');
                    contactForm.reset();
                    setTimeout(() => { window.location.href = 'thank-you.html'; }, 800);
                } else {
                    const data = await response.json().catch(() => ({}));
                    const msg = data.errors
                        ? data.errors.map(err => err.message).join(', ')
                        : 'Une erreur est survenue. Veuillez réessayer.';
                    throw new Error(msg);
                }
            } catch (error) {
                console.error('Erreur Formspree:', error);
                formStatus.textContent = '❌ ' + (error.message || 'Erreur réseau. Réessayez plus tard.');
                formStatus.classList.add('error');
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }

        // ==========================================
    // 13. FORCE HTTPS (désactivé sur GitHub Pages — déjà en HTTPS)
    // ==========================================
    // GitHub Pages sert automatiquement en HTTPS, aucune action requise.
    // Ce bloc est conservé pour compatibilité si vous migrez vers un autre hébergeur.
    /*
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        location.replace('https://' + location.host + location.pathname + location.search);
    }
    */

    console.log('🚀 Portfolio Samy Bengriche — Formspree + RGPD Edition');
});
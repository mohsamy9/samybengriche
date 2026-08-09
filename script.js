/**
 * ============================================
 * Samy Bengriche — Portfolio Scripts
 * Version 2.0 — Premium refined (Global AI Expertise)
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
    // 2. NAVBAR — version améliorée (burger + overlay)
    // ==========================================
    const navbar = document.getElementById('navbar');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.getElementById('navOverlay');
    const navAnchors = document.querySelectorAll('.nav-links a');

    // Fonction pour ouvrir/fermer le menu
    const toggleMenu = (forceState) => {
        const isOpen = forceState !== undefined ? forceState : !burger.classList.contains('open');
        burger.classList.toggle('open', isOpen);
        navLinks.classList.toggle('open', isOpen);
        navOverlay.classList.toggle('open', isOpen);
        burger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    // Click sur le burger
    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Click sur l'overlay → fermeture
    navOverlay.addEventListener('click', () => {
        if (burger.classList.contains('open')) {
            toggleMenu(false);
        }
    });

    // Fermeture sur lien cliqué (mobile)
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', () => {
            if (window.innerWidth <= 768 && burger.classList.contains('open')) {
                toggleMenu(false);
            }
        });
    });

    // Fermeture sur touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && burger.classList.contains('open')) {
            toggleMenu(false);
        }
    });

    // Réinitialisation sur redimension > 768px
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && burger.classList.contains('open')) {
            toggleMenu(false);
        }
    });

    // Scroll: navbar shadow + active section
    const sections = document.querySelectorAll('section[id]');

    const updateNav = () => {
        const scrollY = window.scrollY;

        // Navbar shadow
        navbar.classList.toggle('scrolled', scrollY > 60);

        // Active section
        let activeId = '';
        sections.forEach(sec => {
            const offset = sec.offsetTop - 120;
            if (scrollY >= offset) {
                activeId = sec.id;
            }
        });

        navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
        });
    };

    // Smooth scroll for nav links
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

        // Back to top visibility
        if (scrollTop > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // 4. HERO PARALLAX (mouse tracking)
    // ==========================================
    const heroImageWrapper = document.getElementById('heroImageWrapper');

    document.getElementById('heroContainer').addEventListener('mousemove', (e) => {
        const rect = heroImageWrapper.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        heroImageWrapper.style.transform =
            `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) scale(1.02)`;
    });

    heroImageWrapper.addEventListener('mouseleave', () => {
        heroImageWrapper.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
    });

    // ==========================================
    // 5. TYPING ANIMATION
    // ==========================================
    const typingEl = document.getElementById('hero-typing');
    const phrases = [
        'Generative AI & Enterprise Technology Specialist',
        'AI Adoption · Data Analytics · Automation',
        'Building AI programs that deliver value'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    const typeEffect = () => {
        const currentPhrase = phrases[phraseIndex];
        const speed = isDeleting ? 25 : 45;

        if (!isDeleting && charIndex < currentPhrase.length) {
            typingEl.textContent += currentPhrase.charAt(charIndex);
            charIndex++;
            typingTimeout = setTimeout(typeEffect, speed);
        } else if (isDeleting && charIndex > 0) {
            typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingTimeout = setTimeout(typeEffect, speed);
        } else if (!isDeleting && charIndex === currentPhrase.length) {
            typingTimeout = setTimeout(() => {
                isDeleting = true;
                typeEffect();
            }, 2200);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingTimeout = setTimeout(typeEffect, 400);
        }
    };

    setTimeout(typeEffect, 600);

    // ==========================================
    // 6. REVEAL ON SCROLL (IntersectionObserver)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

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

    /**
     * Project data — strictly from the existing portfolio.
     * No inventions, no additions.
     */
    const projectData = {
        '42sh': {
            title: '42sh — POSIX Shell',
            objective: 'Develop a POSIX-compliant shell in C with a comprehensive test suite.',
            role: 'Coordinator and Task Monitor',
            description: 'Spearheaded a team of four in the creation of a POSIX-compliant shell named 42sh. Oversaw task delegation, project planning, and progress tracking. The shell featured essential functionalities such as command execution, piping, and redirection, and was rigorously tested with a custom test suite to ensure robustness and reliability.',
            technologies: 'C, POSIX, Shell scripting'
        },
        'tiger': {
            title: 'Tiger Compiler',
            objective: 'Design and implement a compiler for the Tiger programming language.',
            role: 'Group Leader',
            description: 'Led the development of a compiler for the Tiger language, requiring deep understanding of language theory and compiler construction. The compiler featured lexical analysis, syntax parsing, semantic analysis, and code generation.',
            technologies: 'C++, Flex, Bison, LLVM'
        },
        'ping': {
            title: 'Ping IDE',
            objective: 'Develop an Integrated Development Environment (IDE) using JavaScript and Java.',
            role: 'Full Stack Developer',
            description: 'Contributed to the development of an IDE called Ping, utilizing both JavaScript and Java to create a user-friendly development environment. Implemented features such as syntax highlighting, code completion, and debugging tools.',
            technologies: 'Java, JavaScript, HTML, CSS'
        },
        'httpd': {
            title: 'HTTPd',
            objective: 'Build an HTTP server in C.',
            role: 'Lead Developer',
            description: 'Led the development of an HTTP server in C, focusing on low-level socket programming, request handling, and response generation. The server handles multiple client connections concurrently, ensuring high performance and reliability.',
            technologies: 'C'
        },
        'PMS': {
            title: 'PMS — Port Management System',
            objective: 'Analyze and manage a port\'s financial and material resources for optimal efficiency.',
            role: 'Project Analyst',
            description: 'Conducted a comprehensive analysis of port operations, focusing on financial, material, and efficiency aspects. Developed recommendations for improving management practices and optimizing resource allocation.',
            technologies: 'Analysis, Optimization'
        },
        'Zoglu': {
            title: 'Zoglu — Network Redesign',
            objective: 'Organize the redesign of a company\'s network system.',
            role: 'Project Manager',
            description: 'Managed the redesign of a company\'s network infrastructure, overseeing the evaluation of current systems and planning the integration of new technologies. Coordinated with stakeholders to ensure the new system met organizational needs and improved network performance.',
            technologies: 'Network Design, Project Management'
        },
        'chess': {
            title: 'Chess Engine',
            objective: 'Build a chess game engine with move simulation capabilities.',
            role: 'Lead Developer',
            description: 'Designed and implemented a chess game engine with a fully functional chessboard and move simulation. Developed algorithms for move validation, game state management, and AI opponent strategies.',
            technologies: 'C++, Python'
        },
        'librubik': {
            title: 'Librubik',
            objective: 'Create a library for Rubik\'s Cube manipulation in C++.',
            role: 'Developer',
            description: 'Developed a C++ library for Rubik\'s Cube manipulation, focusing on a clear, general, and easy-to-debug codebase. Implemented features for cube representation, move generation, and solving algorithms.',
            technologies: 'C++'
        },
        'ERO': {
            title: 'ERO — Snow Removal Optimization',
            objective: 'Develop IT solutions for snow removal in Montreal.',
            role: 'Project Leader',
            description: 'Led the research and development of a Python program to find the optimal solution for minimizing the cost of snow removal in Montreal while ensuring maximum efficiency. Studied algorithms including the Traveling Salesman Problem, Chinese Postman Problem, Eulerian circuits, flow problems, and transportation problems.',
            technologies: 'Python, Optimization'
        },
        'libbistro': {
            title: 'Libbistro',
            objective: 'Create a library for integer arithmetic computation in any base with arbitrary precision.',
            role: 'Developer',
            description: 'Implemented a C++ library for integer arithmetic in any base with arbitrary precision. Focused on correctness and reliability, emphasizing generic programming, template usage, and adherence to defined interfaces.',
            technologies: 'C++, Templates'
        },
        'vorace': {
            title: 'Vorace — Web Scraper',
            objective: 'Develop a web scraper tool to extract data from an e-commerce website.',
            role: 'Developer',
            description: 'Created a web scraper tool to extract data from an e-commerce website, overcoming obstacles such as session protection, rate limits, and captchas. Demonstrated proficiency in data extraction and automation.',
            technologies: 'JavaScript'
        },
        'jws': {
            title: 'Java Web Services',
            objective: 'Create the backend for a Bomberman game.',
            role: 'Backend Developer',
            description: 'Focused on the backend development of the Bomberman game, handling server-side logic and game state management. Implemented features such as player interactions, game updates, and network communication, ensuring a smooth and responsive gameplay experience.',
            technologies: 'Java'
        },
        'Malloc': {
            title: 'Malloc',
            objective: 'Reimplement a memory allocator in C.',
            role: 'Developer',
            description: 'Reimplemented a memory allocator, designing a custom memory management system with allocation, deallocation, and efficient memory reuse. Emphasized performance optimization and robustness, reflecting a deep understanding of low-level memory management.',
            technologies: 'C, Memory Management'
        },
        'Boot Camps': {
            title: 'Boot Camps',
            objective: 'Intensive learning of programming languages and technologies.',
            role: 'Participant',
            description: 'Completed a series of boot camps focused on mastering various programming languages, including JavaScript, SQL, Java, C, and C++. These intensive sessions provided a solid foundation in multiple technologies and programming paradigms.',
            technologies: 'JavaScript, SQL, Java, C, C++'
        },
        'Myfind': {
            title: 'Myfind',
            objective: 'Implement the find command in C, including various options.',
            role: 'Developer',
            description: 'Developed a custom implementation of the find command, replicating its core functionalities and options. The command allows for directory traversal and file searching, showcasing the ability to recreate essential command-line utilities.',
            technologies: 'C'
        }
    };

    // Open modal
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

        // Focus management
        setTimeout(() => modalClose.focus(), 100);
    };

    // Close modal
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    // Event: card click
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const key = card.dataset.project;
            openModal(key);
        });
    });

    // Event: "View details" button
    document.querySelectorAll('.project-card-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const key = btn.dataset.project;
            openModal(key);
        });
    });

    // Event: close button
    modalClose.addEventListener('click', closeModal);

    // Event: click outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Event: Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
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
            scrollTimeout = null;
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial calls
    updateNav();
    updateProgress();

    // ==========================================
    // 9. RESIZE HANDLER (déjà intégré avec toggleMenu)
    // ==========================================
    // Le resize est déjà géré dans la section navbar
    // avec la réinitialisation du menu si > 768px

    // ==========================================
    // 10. KEYBOARD NAVIGATION (Accessibility)
    // ==========================================
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusable = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
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
    // 11. PERFORMANCE — Defer non-critical
    // ==========================================
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Any non-critical init can go here
        });
    }

    console.log('🚀 Portfolio Samy Bengriche — Generative AI & Enterprise Technology');
});
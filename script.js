document.addEventListener('DOMContentLoaded', () => {

    // ===== Typing Animation =====
    const typingEl = document.getElementById('typing-text');
    const textToType = "Engineering and Computer Science student";
    typingEl.textContent = '';
    typingEl.classList.add('typing-cursor');

    let charIndex = 0;
    const typeNext = () => {
        if (charIndex < textToType.length) {
            typingEl.textContent += textToType[charIndex++];
            setTimeout(typeNext, 50 + Math.random() * 35);
        } else {
            setTimeout(() => typingEl.classList.remove('typing-cursor'), 1200);
        }
    };
    setTimeout(typeNext, 900);

    // ===== Scroll Progress Bar =====
    const progressBar = document.getElementById('progress-bar');
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
    };

    // ===== Theme Toggle =====
    const toggleThemeBtn = document.querySelector('.toggle-theme');
    let isDarkTheme = true;

    const toggleTheme = (e) => {
        if (e) e.preventDefault();
        isDarkTheme = !isDarkTheme;
        document.body.classList.toggle('light-theme', !isDarkTheme);
        document.body.classList.toggle('dark-theme', isDarkTheme);
        toggleThemeBtn.textContent = isDarkTheme ? '🌙' : '☀️';
        matrixCanvas.style.display = isDarkTheme ? 'block' : 'none';
    };

    toggleThemeBtn.addEventListener('click', toggleTheme);

    // ===== Reveal on Scroll =====
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const wh = window.innerHeight;
        revealElements.forEach(el => {
            el.classList.toggle('active', el.getBoundingClientRect().top < wh - 80);
        });
    };

    // ===== Active Nav Highlight =====
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('nav ul li a');

    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 100;
        let activeId = '';
        sections.forEach(sec => {
            if (scrollPos >= sec.offsetTop) activeId = sec.id;
        });
        navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
        });
    };

    window.addEventListener('scroll', () => {
        updateProgress();
        revealOnScroll();
        updateActiveNav();
    });

    revealOnScroll();
    updateActiveNav();

    // ===== Smooth Scroll =====
    const navLinksContainer = document.querySelector('.nav-links');

    document.querySelectorAll('nav ul li a, .logo').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                const offset = target === document.body ? 0 : target.offsetTop - 58;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
            navLinksContainer.classList.remove('active');
        });
    });

    // ===== Burger Menu =====
    const burger = document.querySelector('.burger');

    burger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!navLinksContainer.contains(e.target) && !burger.contains(e.target)) {
            navLinksContainer.classList.remove('active');
        }
    });

    // ===== Matrix Canvas =====
    const matrixCanvas = document.getElementById('matrixCanvas');
    const ctx = matrixCanvas.getContext('2d');

    const hanzi = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
    const katakana = "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ";
    const characters = hanzi + "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" + katakana;
    const fontSize = 16;
    let drops;

    const initCanvas = () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        const cols = Math.floor(matrixCanvas.width / fontSize);
        if (!drops || drops.length !== cols) {
            drops = Array(cols).fill(1);
        }
    };
    initCanvas();

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    };

    setInterval(draw, 40);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initCanvas, 150);
    });

    // ===== Project Modal =====
    const modal = document.getElementById("projectModal");
    const modalImg = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalObjective = document.getElementById("modalObjective");
    const modalRole = document.getElementById("modalRole");
    const modalDescription = document.getElementById("modalDescription");
    const modalLanguages = document.getElementById("modalLanguages");
    const closeBtn = document.querySelector(".close");

    const projectDetails = {
        "42sh": {
            title: "42sh — POSIX Shell",
            objective: "Develop a POSIX-compliant shell in C, complete with a comprehensive test suite.",
            role: "Coordinator and Task Monitor",
            description: "Spearheaded a team of four in the creation of a POSIX-compliant shell named 42sh. Oversaw task delegation, project planning, and progress tracking. The shell featured essential functionalities such as command execution, piping, and redirection, and was rigorously tested with a custom test suite to ensure robustness and reliability.",
            languages: "C, POSIX, Shell scripting"
        },
        "tiger": {
            title: "Tiger Compiler",
            objective: "Design and implement a compiler for the Tiger programming language.",
            role: "Group Leader",
            description: "Led the development of a compiler for the Tiger language, a project requiring deep understanding of language theory and practical compiler construction. The compiler featured lexical analysis, syntax parsing, semantic analysis, and code generation.",
            languages: "C++, Flex, Bison, LLVM"
        },
        "jws": {
            title: "Java Web Services (JWS)",
            objective: "Create the backend for a Bomberman game.",
            role: "Backend Developer",
            description: "Focused on the backend development of the Bomberman game, handling server-side logic and game state management. Implemented features such as player interactions, game updates, and network communication, ensuring a smooth and responsive gameplay experience.",
            languages: "Java"
        },
        "ping": {
            title: "Ping IDE",
            objective: "Develop an Integrated Development Environment (IDE) using JavaScript and Java.",
            role: "Full Stack Developer",
            description: "Contributed to the development of an IDE called Ping, utilizing both JavaScript and Java to create a user-friendly development environment. Implemented features such as syntax highlighting, code completion, and debugging tools.",
            languages: "Java, JavaScript, HTML, CSS"
        },
        "httpd": {
            title: "HTTPd",
            objective: "Build an HTTP server in C.",
            role: "Lead Developer",
            description: "Led the development of an HTTP server in C, focusing on low-level socket programming, request handling, and response generation. The server handles multiple client connections concurrently, ensuring high performance and reliability.",
            languages: "C"
        },
        "chess": {
            title: "Chess Engine",
            objective: "Build a chess game engine with move simulation capabilities.",
            role: "Lead Developer",
            description: "Designed and implemented a chess game engine with a fully functional chessboard and move simulation. Developed algorithms for move validation, game state management, and AI opponent strategies.",
            languages: "C++, Python"
        },
        "Malloc": {
            title: "Malloc",
            objective: "Reimplement a memory allocator in C.",
            role: "Developer",
            description: "Reimplemented a memory allocator, designing a custom memory management system with allocation, deallocation, and efficient memory reuse. Emphasized performance optimization and robustness, reflecting a deep understanding of low-level memory management.",
            languages: "C"
        },
        "Myfind": {
            title: "Myfind",
            objective: "Implement the find command in C, including various options.",
            role: "Developer",
            description: "Developed a custom implementation of the find command, replicating its core functionalities and options. The command allows for directory traversal and file searching, showcasing the ability to recreate essential command-line utilities.",
            languages: "C"
        },
        "Boot Camps": {
            title: "Boot Camps",
            objective: "Intensive learning of programming languages and technologies.",
            role: "Participant",
            description: "Completed a series of boot camps focused on mastering various programming languages, including JavaScript, SQL, Java, C, and C++. These intensive sessions provided a solid foundation in multiple technologies and programming paradigms.",
            languages: "JavaScript, SQL, Java, C, C++"
        },
        "PMS": {
            title: "PMS — Port Management System",
            objective: "Analyze and manage a port's financial and material resources for optimal efficiency.",
            role: "Project Analyst",
            description: "Conducted a comprehensive analysis of port operations, focusing on financial, material, and efficiency aspects. Developed recommendations for improving management practices and optimizing resource allocation.",
            languages: "N/A"
        },
        "Zoglu": {
            title: "Zoglu — Network Redesign",
            objective: "Organize the redesign of a company's network system.",
            role: "Project Manager",
            description: "Managed the redesign of a company's network infrastructure, overseeing the evaluation of current systems and planning the integration of new technologies. Coordinated with stakeholders to ensure the new system met organizational needs and improved network performance.",
            languages: "N/A"
        },
        "ERO": {
            title: "ERO — Snow Removal Optimization",
            objective: "Develop IT solutions for snow removal in Montreal.",
            role: "Project Leader",
            description: "Led the research and development of a Python program to find the optimal solution for minimizing the cost of snow removal in Montreal while ensuring maximum efficiency. Studied algorithms including the Traveling Salesman Problem, Chinese Postman Problem, Eulerian circuits, flow problems, and transportation problems.",
            languages: "Python"
        },
        "librubik": {
            title: "Librubik",
            objective: "Create a library for Rubik's Cube manipulation in C++.",
            role: "Developer",
            description: "Developed a C++ library for Rubik's Cube manipulation, focusing on a clear, general, and easy-to-debug codebase. Implemented features for cube representation, move generation, and solving algorithms.",
            languages: "C++"
        },
        "libbistro": {
            title: "Libbistro",
            objective: "Create a library for integer arithmetic computation in any base with arbitrary precision.",
            role: "Developer",
            description: "Implemented a C++ library for integer arithmetic in any base with arbitrary precision. Focused on correctness and reliability, emphasizing generic programming, template usage, and adherence to defined interfaces.",
            languages: "C++"
        },
        "vorace": {
            title: "Vorace — Web Scraper",
            objective: "Develop a web scraper tool to extract data from an e-commerce website.",
            role: "Developer",
            description: "Created a web scraper tool to extract data from an e-commerce website, overcoming obstacles such as session protection, rate limits, and captchas. Demonstrated proficiency in data extraction and automation.",
            languages: "JavaScript"
        }
    };

    const openModal = (card) => {
        const projectId = card.getAttribute('data-project');
        const details = projectDetails[projectId];
        if (!details) return;

        modalImg.src = card.querySelector('img').src;
        modalTitle.textContent = details.title;
        modalObjective.textContent = details.objective;
        modalRole.textContent = details.role;
        modalDescription.textContent = details.description;
        modalLanguages.textContent = details.languages;

        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.style.display = "none";
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.expandable-card').forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
    });

});

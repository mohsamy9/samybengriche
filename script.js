document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    const toggleThemeBtn = document.querySelector('.toggle-theme');
    let isDarkTheme = true;

    const skills = [
        
        
        
    ];

    const softskills = [
        
    ];

    const softskillsList = document.getElementById('softskills-list');
    softskills.forEach(skill => {
        const skillElement = document.createElement('pre');
        skillElement.textContent = skill;
        softskillsList.appendChild(skillElement);
    });

    const skillsList = document.getElementById('skills-list');
    skills.forEach(skill => {
        const skillElement = document.createElement('pre');
        skillElement.textContent = skill;
        skillsList.appendChild(skillElement);
    });

    const toggleTheme = () => {
        isDarkTheme = !isDarkTheme;
        document.body.classList.toggle('light-theme', !isDarkTheme);
        document.body.classList.toggle('dark-theme', isDarkTheme);
        toggleThemeBtn.textContent = isDarkTheme ? '🌙' : '☀️';
        
        const matrixCanvas = document.getElementById('matrixCanvas');
        if (isDarkTheme) {
            matrixCanvas.style.display = 'block';
        } else {
            matrixCanvas.style.display = 'none';
        }
    };

    toggleThemeBtn.addEventListener('click', toggleTheme);

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    };

    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    const navLinks = document.querySelectorAll('nav ul li a, .logo');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
    
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });

            // Fermer le menu après le clic sur un lien
            navLinksContainer.classList.remove('active');
        });
    });
    
    const burger = document.querySelector('.burger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        const isClickInsideNav = navLinksContainer.contains(event.target) || burger.contains(event.target);
        if (!isClickInsideNav) {
            navLinksContainer.classList.remove('active');
        }
    });

    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const hanzi = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
    const katakana = "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    const characters = hanzi + latin + numbers + katakana;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        ctx.fillStyle = '#0F0'; // Green text
        ctx.font = fontSize + 'px monospace';  // Font size and style

        for (let i = 0; i < drops.length; i++) { // Loop over the drops
            const text = characters.charAt(Math.floor(Math.random() * characters.length)); // Random character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize); // x, y

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {  // Randomize the reset
                drops[i] = 0;  // Reset the drop
            }
            drops[i]++; // Move the drop down
        }
    };

    setInterval(draw, 40); // Draw every 40 milliseconds

 

        const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalObjective = document.getElementById("modalObjective");
const modalRole = document.getElementById("modalRole");
const modalDescription = document.getElementById("modalDescription");
const modalLanguages = document.getElementById("modalLanguages"); // New element for languages
const projectCards = document.querySelectorAll('.expandable-card');
const closeModal = document.getElementsByClassName("close")[0];

// Project details mapped by project identifier
const projectDetails = {
    "42sh": {
        title: "Projet 42sh",
        objective: "Develop a POSIX-compliant shell in C, complete with a comprehensive test suite.",
        role: "Coordinator and task monitor",
        description: "Spearheaded a team of four in the creation of a POSIX-compliant shell named 42sh. Oversaw task delegation, project planning, and progress tracking. The shell featured essential functionalities such as command execution, piping, and redirection, and was rigorously tested with a custom test suite to ensure robustness and reliability.",
        languages: "C, POSIX, Shell scripting" // Added languages
    },
    "tiger": {
        title: "Tiger Compiler",
        objective: "Design and implement a compiler for the Tiger programming language.",
        role: "Group Leader",
        description: "Led the development of a compiler for the Tiger language, a project that required deep understanding of both language theory and practical compiler construction. The compiler featured lexical analysis, syntax parsing, semantic analysis, and code generation.",
        languages: "C++, Flex, Bison, LLVM" // Added languages
    },
    "jws": {
        title: "Java Web Services (JWS)",
        objective: "Create the backend for a Bomberman game.",
        role: "Backend Developer",
        description: "Focused on the backend development of the Bomberman game, handling server-side logic and game state management. Implemented features such as player interactions, game updates, and network communication. My work ensured a smooth and responsive gameplay experience, demonstrating strong skills in backend development and real-time system handling.",
        languages: "Java" // Added languages
    },
    "ping": {
        title: "Ping IDE",
        objective: "Develop an Integrated Development Environment (IDE) using JavaScript and Java.",
        role: "Full Stack Developer",
        description: "Contributed to the development of an IDE called Ping, utilizing both JavaScript and Java to create a user-friendly and efficient development environment. Implemented features such as syntax highlighting, code completion, and debugging tools, significantly enhancing the user experience.",
        languages: "Java, JavaScript, HTML, CSS" // Added languages
    },
    "httpd": {
        title: "HTTPd",
        objective: "Build an HTTP server in C.",
        role: "Lead Developer",
        description: "Led the development of an HTTP server in C, focusing on low-level socket programming, request handling, and response generation. The server was designed to handle multiple client connections concurrently, ensuring high performance and reliability.",
        languages: "C" // Added languages
    },
    "chess": {
        title: "Chess",
        objective: "Build a chess game engine with move simulation capabilities.",
        role: "Lead Developer",
        description: "Designed and implemented a chess game engine that included a fully functional chessboard and move simulation. Focused on developing algorithms for move validation, game state management, and AI opponent strategies. The project demonstrated my ability to handle complex game logic and ensure accurate representation of chess rules.",
        languages: "C++, Python" // Added languages
    },

    "Malloc": {
        title: "Malloc",
        objective: "Reimplement a memory allocator in C.",
        role: "Developer",
        description: "Undertook the task of reimplementing a memory allocator, a crucial component of system programming. The project involved designing a custom memory management system with features such as allocation, deallocation, and efficient memory reuse. My implementation emphasized performance optimization and robustness, reflecting a deep understanding of low-level memory management.",
        languages: "C" // Added languages
    },

    "Myfind": {
        title: "Myfind",
        objective: "Implement the find command in C, including various options.",
        role: "Developer",
        description: "Developed a custom implementation of the find command, replicating its core functionalities and options. The find command allowed for directory traversal and file searching, showcasing my ability to recreate essential command-line utilities in C.",
        languages: "C" // Added languages
    },

    "Myprintf": {
        title: "Myprintf",
        objective: "Implement the printf command in C, including various options.",
        role: "Developer",
        description: "Developed a custom implementation of the printf command, replicating its core functionalities and options. The printf command handled formatted output, showcasing my ability to recreate essential command-line utilities in C.",
        languages: "C" // Added languages
    },

    "Boot Camps": {
        title: "Boot Camps",
        objective: "Intensive learning of programming languages and technologies.",
        role: "Participant",
        description: "Completed a series of boot camps focused on mastering various programming languages, including JavaScript, SQL, Java, C, and C++. These intensive sessions provided a solid foundation in multiple technologies and programming paradigms, enhancing my versatility and problem-solving skills across different development environments.",
        languages: "JavaScript, SQL, Java, C, C++" // Added languages
    },

    "PMS": {
        title: "PMS",
        objective: "Analyze and manage a port’s financial and material resources for optimal efficiency.",
        role: "Project Analyst",
        description: "Conducted a comprehensive analysis of port operations, focusing on financial, material, and efficiency aspects. Developed recommendations for improving management practices and optimizing resource allocation. This project demonstrated my analytical skills and ability to deliver actionable insights for better port management.",
        languages: "N/A" // Added languages
    },

    "Zoglu": {
        title: "Zoglu",
        objective: "Organize the redesign of a company's network system.",
        role: "Project Manager",
        description: "Managed the redesign of a company's network infrastructure, overseeing the evaluation of current systems and planning the integration of new technologies. Coordinated with stakeholders to ensure the new system met organizational needs and improved network performance. My role involved strategic planning, resource management, and implementation oversight.",
        languages: "N/A" // Added languages

    },

    "ERO": {
        title: "ERO",
        objective: "Develop IT solutions for snow removal in Montreal.",
        role: "Project Leader",
        description: "Led the research and development of a Python program designed to find the optimal solution for minimizing the cost of snow removal in Montreal while ensuring maximum efficiency. The project involved an in-depth study of various algorithms, including the Traveling Salesman Problem (TSP), the Chinese Postman Problem, Eulerian circuits, flow problems, and transportation problems. I presented multiple solutions, each offering different cost structures and resource allocations, demonstrating the flexibility and applicability of these algorithms to real-world logistical challenges.",
        languages: "Python", // Added languages

    },

    "librubik": {
        title: "librubik",
        objective: "Create a library for Rubik's Cube manipulation in C++.",
        role: "Developer",
        description: "Developed a C++ library for Rubik's Cube manipulation, focusing on creating a clear, general, and easy-to-debug codebase. Implemented features for cube representation, move generation, and solving algorithms. The project emphasized code clarity and modularity, showcasing proficiency in C++ programming and algorithm design.",
        languages: "C++", // Added languages
    },

    "libbistro": {
        title: "libbistro",
        objective: "Create a library for integer arithmetic computation in any base with arbitrary precision.",
        role: "Developer",
        description: "Implemented a C++ library for integer arithmetic computation in any base with arbitrary precision. Focused on correctness and reliability, ensuring the library produced accurate results for various arithmetic operations. The project emphasized generic programming, template usage, and adherence to defined interfaces, showcasing proficiency in C++ programming and algorithm design.",
        languages: "C++", // Added languages
    },

    "vorace": { title: "vorace",
        objective: "Develop a web scraper tool to extract data from an e-commerce website.",
        role: "Developer",
        description: "Created a web scraper tool to extract data from an e-commerce website, overcoming obstacles such as user session protection, rate limits, and captchas. The project focused on JavaScript programming and web scraping techniques, demonstrating proficiency in data extraction and automation.",
        languages: "JavaScript", // Added languages
    },



};

projectCards.forEach(card => {
    card.addEventListener('click', function(){
        const projectId = this.getAttribute('data-project');
        const details = projectDetails[projectId];

        modal.style.display = "block";
        modalImg.src = this.querySelector('img').src;
        modalTitle.innerText = details.title;
        modalObjective.innerText = details.objective;
        modalRole.innerText = details.role;
        modalDescription.innerText = details.description;
        modalLanguages.innerText = details.languages; // Display languages and tools
    });
});

closeModal.onclick = function() { 
    modal.style.display = "none"; // Close the modal
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

});

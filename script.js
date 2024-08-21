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
    const captionText = document.getElementById("caption");
    const projectImages = document.querySelectorAll('.expandable-card img');
    const closeModal = document.getElementsByClassName("close")[0];

    projectImages.forEach(img => {
        img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
    });

    closeModal.onclick = function() { 
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

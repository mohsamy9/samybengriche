document.querySelectorAll('.project-image').forEach(image => {
    image.addEventListener('mouseover', () => {
        image.classList.add('scale-110'); // Tailwind classe pour agrandir
    });
    image.addEventListener('mouseout', () => {
        image.classList.remove('scale-110');
    });
});

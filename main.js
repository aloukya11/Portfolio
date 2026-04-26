const girlImage = document.getElementById('girl-image');
const girlContainer = document.getElementById('girl-container');

// Handle Mouse Movement for "3D" effect
girlContainer.addEventListener('mousemove', (e) => {
    const rect = girlContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (more subtle /15 instead of /10)
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    girlImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

// Reset on Mouse Leave
girlContainer.addEventListener('mouseleave', () => {
    girlImage.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    girlImage.style.transition = 'transform 0.5s ease-in-out';
    
    setTimeout(() => {
        girlImage.style.transition = 'transform 0.1s ease-out';
    }, 500);
});

// Intersection Observer for Section Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const projectsSection = document.getElementById('projects');
if (projectsSection) {
    observer.observe(projectsSection);
}

const aboutSection = document.getElementById('about');
if (aboutSection) {
    observer.observe(aboutSection);
}

const adsSection = document.getElementById('ads');
if (adsSection) {
    observer.observe(adsSection);
}

const creativesSection = document.getElementById('creatives');
if (creativesSection) {
    observer.observe(creativesSection);
}

const contactSection = document.getElementById('contact');
if (contactSection) {
    observer.observe(contactSection);
}

// Video Playback Management
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            video.play().catch(e => console.log("Autoplay blocked:", e));
        } else {
            video.pause();
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.ad-item video').forEach(video => {
    videoObserver.observe(video);
});

// Word Reveal for About Section
const revealText = document.querySelector('.reveal-text');
if (revealText) {
    const text = revealText.textContent;
    revealText.innerHTML = ''; // Clear text
    
    // Split by words
    text.split(' ').forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.transitionDelay = `${index * 0.05}s`; // Staggered reveal
        revealText.appendChild(span);
        // Add a space after each word
        revealText.appendChild(document.createTextNode(' '));
    });
}

// Handle class toggling for revealed words
const wrapReveal = () => {
    if (aboutSection && aboutSection.classList.contains('visible')) {
        const spans = revealText.querySelectorAll('span');
        spans.forEach(span => span.classList.add('revealed'));
    }
};

// Check for reveal on scroll (or within observer)
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            wrapReveal();
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Log for confirmation
console.log('Portfolio initialized with 3D interactions and polished UI');

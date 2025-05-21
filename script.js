document.addEventListener('DOMContentLoaded', function() {
    // Typing animation
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = [
        "Bukidnon State University Student",
        "Aspiring Network Engineer",
        "Music Lover",
        "Team Player"
    ];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if(textArray.length) setTimeout(type, newTextDelay + 250);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll event listener for navbar background
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        }
    });

    // Enhanced dynamic quote color effect
    const quoteColors = [
        {bg: 'linear-gradient(90deg, #00ff88 0%, #0a6cff 100%)', color: '#fff'}, // neon green to blue gradient
        {bg: '#101c1a', color: '#00ff88'}, // deep black-green with neon text
        {bg: '#0a6cff', color: '#fff'}, // electric blue
        {bg: '#181818', color: '#fff'}, // soft black
        {bg: '#00ff88', color: '#181818'}, // neon green with black text
    ];

    function cycleQuoteColor() {
        const quote = document.querySelector('.profile-quote');
        if (!quote) return;
        let idx = 0;
        quote.style.transition = 'background 0.7s, color 0.7s';
        setInterval(() => {
            const c = quoteColors[idx % quoteColors.length];
            quote.style.background = c.bg;
            quote.style.color = c.color;
            idx++;
        }, 3000);
    }

    cycleQuoteColor();

    // Contact folder toggle
    const contactFolder = document.getElementById('contactFolder');
    const contactBlessing = document.getElementById('contactBlessing');
    if (contactFolder && contactBlessing) {
        contactFolder.addEventListener('click', function() {
            const isOpen = contactFolder.classList.contains('open');
            if (!isOpen) {
                contactFolder.classList.add('open', 'hide');
                contactBlessing.classList.add('show');
            } else {
                contactFolder.classList.remove('open', 'hide');
                contactBlessing.classList.remove('show');
            }
        });
    }

    // Section scroll animation
    function animateSectionsOnScroll() {
        const sections = document.querySelectorAll('.section');
        const triggerBottom = window.innerHeight * 0.85;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add('section-animate');
            }
        });
    }
    window.addEventListener('scroll', animateSectionsOnScroll);
    window.addEventListener('load', animateSectionsOnScroll);

    // Animate on nav click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(animateSectionsOnScroll, 400);
        });
    });
}); 
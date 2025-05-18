document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    navToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
            }
        });
    });
    
    // Scroll down button
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            window.scrollTo({
                top: document.querySelector('.history-section').offsetTop - document.querySelector('.header').offsetHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Team details toggle
    const showMoreButtons = document.querySelectorAll('.show-more');
    const closeDetailsButtons = document.querySelectorAll('.close-details');
    
    showMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            details.style.display = 'block';
            this.style.display = 'none';
        });
    });
    
    closeDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const details = this.parentElement;
            details.style.display = 'none';
            details.previousElementSibling.style.display = 'block';
        });
    });
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    function checkStatsInView() {
        statNumbers.forEach(stat => {
            const statPosition = stat.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (statPosition < screenPosition && stat.textContent === '0') {
                const target = parseInt(stat.getAttribute('data-count'));
                animateValue(stat, 0, target, 2000);
            }
        });
    }
    
    // Initialize
    window.addEventListener('scroll', checkStatsInView);
    checkStatsInView(); // Check on load in case stats are already in view
});
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    navToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });

    // Filter services
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            serviceCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Toggle service details
    const toggleButtons = document.querySelectorAll('.toggle-details');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            const card = this.closest('.service-card');
            
            if (details.style.display === 'block') {
                details.style.display = 'none';
                this.textContent = 'Подробнее';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                details.style.display = 'block';
                this.textContent = 'Свернуть';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
            }
        });
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

    // Booking buttons
    const bookButtons = document.querySelectorAll('.book-btn');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.closest('.service-card').querySelector('h2').textContent;
            alert(`Спасибо за интерес к услуге "${serviceName}"! Наш менеджер свяжется с вами для уточнения деталей.`);
        });
    });

    // Pricing cards buttons
    const pricingButtons = document.querySelectorAll('.pricing-card .btn');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.closest('.pricing-card').querySelector('h3').textContent;
            alert(`Вы выбрали тариф "${planName}". Наш менеджер свяжется с вами для оформления абонемента.`);
        });
    });
});
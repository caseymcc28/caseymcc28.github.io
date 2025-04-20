/**
 * Main JavaScript for Casey McCollum's website
 */

// DOM ready event listener
document.addEventListener('DOMContentLoaded', function() {
    // Header hide on scroll down, show on scroll up
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll down
            header.classList.add('hidden');
        } else {
            // Scroll up
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });

    // Portfolio filtering system (only on portfolio page)
    const portfolioCategories = document.querySelectorAll('.portfolio-category');
    if (portfolioCategories.length > 0) {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const featuredProject = document.querySelector('.featured-project');
        
        // Add click event to category buttons
        portfolioCategories.forEach(category => {
            category.addEventListener('click', function() {
                // Remove active class from all categories
                portfolioCategories.forEach(cat => cat.classList.remove('active'));
                
                // Add active class to clicked category
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Show/hide featured project based on filter
                if (featuredProject && (filter === 'all' || featuredProject.getAttribute('data-category').includes(filter))) {
                    featuredProject.style.display = 'block';
                } else if (featuredProject) {
                    featuredProject.style.display = 'none';
                }
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filter === 'all' || itemCategory === filter) {
                        item.classList.remove('hidden-item');
                    } else {
                        item.classList.add('hidden-item');
                    }
                });
            });
        });
        
        // Initialize Vimeo API (for future interactive features)
        if (window.Vimeo) {
            const vimeoIframes = document.querySelectorAll('iframe[src*="vimeo.com"]');
            vimeoIframes.forEach(iframe => {
                const player = new Vimeo.Player(iframe);
                // Can add event listeners or other functionality here
            });
        }
    }

    // Contact form handling (only on contact page)
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to your server here
            // This is just a placeholder for demonstration
            
            // Show success message
            contactForm.style.display = 'none';
            if (formSuccess) {
                formSuccess.classList.add('show');
            }
            
            // Reset form
            contactForm.reset();
        });
    }
});
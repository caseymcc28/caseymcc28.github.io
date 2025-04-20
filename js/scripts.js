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

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (!e.target.closest('header')) {
                nav.classList.remove('active');
            }
        });
    }

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
                if (featuredProject && (filter === 'all')) {
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

        // Project Modal functionality
        const modal = document.getElementById('projectModal');
        const modalClose = document.getElementById('modalClose');
        const modalTitle = document.getElementById('modalTitle');
        const modalCategory = document.getElementById('modalCategory');
        const modalEmbed = document.getElementById('modalEmbed');
        const modalDescription = document.getElementById('modalDescription');
        const body = document.body;
        
        // Add click event to portfolio items for opening modal
        portfolioItems.forEach(item => {
            item.addEventListener('click', function() {
                const projectData = this.querySelector('.project-data');
                
                if (projectData) {
                    const type = projectData.getAttribute('data-type');
                    const title = projectData.getAttribute('data-title');
                    const category = projectData.getAttribute('data-category');
                    const description = projectData.getAttribute('data-description');
                    
                    // Set modal content
                    modalTitle.textContent = title;
                    modalCategory.textContent = category;
                    modalDescription.innerHTML = description.replace(/\n/g, '<br>');
                    
                    // Clear previous embed content
                    modalEmbed.innerHTML = '';
                    
                    // Add appropriate embed based on project type
                    if (type === 'video') {
                        const embedUrl = projectData.getAttribute('data-embed');
                        modalEmbed.innerHTML = `
                            <div class="youtube-embed">
                                <iframe src="${embedUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        `;
                    } else if (type === 'written') {
                        const pdfUrl = projectData.getAttribute('data-embed');
                        modalEmbed.innerHTML = `
                            <div class="pdf-embed">
                                <object data="${pdfUrl}" type="application/pdf">
                                    <p>Unable to display PDF. <a href="${pdfUrl}" target="_blank">Download</a> instead.</p>
                                </object>
                            </div>
                        `;
                    } else if (type === 'design') {
                        const imageUrl = projectData.getAttribute('data-embed');
                        modalEmbed.innerHTML = `
                            <div class="design-embed">
                                <img src="${imageUrl}" alt="${title}">
                            </div>
                        `;
                    } else if (type === 'photo') {
                        const gallery = projectData.getAttribute('data-gallery').split(',');
                        let galleryHTML = '<div class="image-gallery">';
                        
                        gallery.forEach((image, index) => {
                            galleryHTML += `
                                <img src="${image}" alt="Gallery image ${index + 1}" class="gallery-image" onclick="expandImage(this)">
                            `;
                        });
                        
                        galleryHTML += '</div>';
                        modalEmbed.innerHTML = galleryHTML;
                    }
                    
                    // Open modal
                    modal.classList.add('active');
                    body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });
        
        // Add click event to featured project for opening modal
        if (featuredProject) {
            featuredProject.addEventListener('click', function() {
                const projectData = this.querySelector('.project-data');
                
                if (projectData) {
                    const type = projectData.getAttribute('data-type');
                    const title = projectData.getAttribute('data-title');
                    const category = projectData.getAttribute('data-category');
                    const description = projectData.getAttribute('data-description');
                    
                    // Set modal content
                    modalTitle.textContent = title;
                    modalCategory.textContent = category;
                    modalDescription.innerHTML = description.replace(/\n/g, '<br>');
                    
                    // Clear previous embed content
                    modalEmbed.innerHTML = '';
                    
                    // Add appropriate embed based on project type
                    if (type === 'video') {
                        const embedUrl = projectData.getAttribute('data-embed');
                        modalEmbed.innerHTML = `
                            <div class="youtube-embed">
                                <iframe src="${embedUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        `;
                    }
                    
                    // Open modal
                    modal.classList.add('active');
                    body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        }
        
        // Close modal when clicking the close button
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                modal.classList.remove('active');
                body.style.overflow = ''; // Restore scrolling
            });
        }
        
        // Close modal when clicking outside the modal content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                body.style.overflow = ''; // Restore scrolling
            }
        });
        
        // Handle escape key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                body.style.overflow = ''; // Restore scrolling
            }
        });
    }

    // Function to expand gallery images
    window.expandImage = function(img) {
        const gallery = img.parentElement;
        const images = gallery.querySelectorAll('.gallery-image');
        
        // If image is already expanded, collapse it
        if (img.classList.contains('active')) {
            img.classList.remove('active');
            return;
        }
        
        // Collapse any other expanded images
        images.forEach(image => {
            image.classList.remove('active');
        });
        
        // Expand clicked image
        img.classList.add('active');
    };

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
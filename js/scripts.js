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
        const modalClientType = document.getElementById('modalClientType');
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
                    const clientType = projectData.getAttribute('data-client-type');
                    const description = projectData.getAttribute('data-description');
                    
                    // Set modal content
                    modalTitle.textContent = title;
                    modalCategory.textContent = category;
                    modalClientType.textContent = clientType;
                    
                    // Add appropriate class to client type tag based on value
                    modalClientType.className = 'modal-client-type';
                    if (clientType === 'PERSONAL') {
                        modalClientType.classList.add('personal');
                    } else if (clientType === 'CLIENT') {
                        modalClientType.classList.add('client');
                    }
                    
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
                        // Check if this design item has a gallery of multiple images
                        if (projectData.hasAttribute('data-gallery')) {
                            // If it has a data-gallery attribute, create a gallery view
                            const gallery = projectData.getAttribute('data-gallery').split(',');
                            let galleryHTML = '<div class="image-gallery">';
                            
                            gallery.forEach((image, index) => {
                                galleryHTML += `
                                    <img src="${image}" alt="Design image ${index + 1}" class="gallery-image" onclick="expandImage(this)">
                                `;
                            });
                            
                            galleryHTML += '</div>';
                            modalEmbed.innerHTML = galleryHTML;
                            setTimeout(() => addGalleryNavigation(document.querySelector('.image-gallery')), 100);
                        } else {
                            // If no gallery, use the original single-image display
                            const imageUrl = projectData.getAttribute('data-embed');
                            modalEmbed.innerHTML = `
                                <div class="design-embed">
                                    <img src="${imageUrl}" alt="${title}">
                                </div>
                            `;
                        }
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
                        setTimeout(() => addGalleryNavigation(document.querySelector('.image-gallery')), 100);
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
                    const clientType = projectData.getAttribute('data-client-type');
                    const description = projectData.getAttribute('data-description');
                    
                    // Set modal content
                    modalTitle.textContent = title;
                    modalCategory.textContent = category;
                    modalClientType.textContent = clientType;
                    
                    // Add appropriate class to client type tag based on value
                    modalClientType.className = 'modal-client-type';
                    if (clientType === 'PERSONAL') {
                        modalClientType.classList.add('personal');
                    } else if (clientType === 'CLIENT') {
                        modalClientType.classList.add('client');
                    }
                    
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

        // Handle keyboard navigation within gallery
        document.addEventListener('keydown', function(e) {
            // Only respond if modal is active
            if (!modal || !modal.classList.contains('active')) return;
            
            const gallery = modal.querySelector('.image-gallery');
            if (!gallery) return;
            
            // Left arrow key
            if (e.key === 'ArrowLeft') {
                navigateGallery('prev');
            }
            // Right arrow key
            else if (e.key === 'ArrowRight') {
                navigateGallery('next');
            }
        });
    }

    // Function to navigate through gallery images
    window.navigateGallery = function(direction) {
        const gallery = document.querySelector('.image-gallery');
        if (!gallery) return;
        
        const images = gallery.querySelectorAll('.gallery-image');
        let currentIndex = -1;
        
        // Find currently active image
        images.forEach((img, index) => {
            if (img.classList.contains('active')) {
                currentIndex = index;
            }
        });
        
        if (currentIndex === -1) return;
        
        // Calculate next index based on direction
        let nextIndex;
        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % images.length;
        } else {
            nextIndex = (currentIndex - 1 + images.length) % images.length;
        }
        
        // Expand the next image
        expandImage(images[nextIndex]);
    }

    // Function to add navigation arrows to gallery
    function addGalleryNavigation(gallery) {
        // Remove any existing navigation
        const existingNavs = gallery.parentNode.querySelectorAll('.gallery-nav');
        existingNavs.forEach(nav => nav.remove());
        
        // Create navigation elements
        const prevButton = document.createElement('div');
        prevButton.className = 'gallery-nav prev hidden';
        prevButton.innerHTML = '&#10094;'; // Left arrow
        prevButton.onclick = function(e) {
            e.stopPropagation(); // Prevent closing modal
            navigateGallery('prev');
        };
        
        const nextButton = document.createElement('div');
        nextButton.className = 'gallery-nav next hidden';
        nextButton.innerHTML = '&#10095;'; // Right arrow
        nextButton.onclick = function(e) {
            e.stopPropagation(); // Prevent closing modal
            navigateGallery('next');
        };
        
        // Append navigation to modal body (parent of gallery)
        gallery.parentNode.appendChild(prevButton);
        gallery.parentNode.appendChild(nextButton);
    }

    // Function to expand gallery images
    window.expandImage = function(img) {
        const gallery = img.parentElement;
        const images = gallery.querySelectorAll('.gallery-image');
        
        // Make sure we have navigation arrows
        if (!gallery.parentNode.querySelector('.gallery-nav')) {
            addGalleryNavigation(gallery);
        }
        
        // Get navigation arrows
        const prevNav = gallery.parentNode.querySelector('.gallery-nav.prev');
        const nextNav = gallery.parentNode.querySelector('.gallery-nav.next');
        
        // If image is already expanded, collapse it
        if (img.classList.contains('active')) {
            img.classList.remove('active');
            img.style.order = ''; // Reset order
            
            // Hide navigation arrows
            if (prevNav) prevNav.classList.add('hidden');
            if (nextNav) nextNav.classList.add('hidden');
            return;
        }
        
        // Collapse any other expanded images
        images.forEach(image => {
            image.classList.remove('active');
            image.style.order = ''; // Reset order
        });
        
        // Expand clicked image and move it to top
        img.classList.add('active');
        img.style.order = '-1'; // Negative order to place it at the top
        
        // Show navigation arrows if we have more than one image
        if (images.length > 1) {
            if (prevNav) prevNav.classList.remove('hidden');
            if (nextNav) nextNav.classList.remove('hidden');
        }
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
    
    // Handle hash-based filtering for direct links
    if (portfolioCategories.length > 0 && window.location.hash) {
        const hash = window.location.hash.substring(1); // Remove the # symbol
        
        // Find the category button that matches the hash
        const targetCategory = Array.from(portfolioCategories).find(
            cat => cat.getAttribute('data-filter') === hash
        );
        
        // If we found a matching category, click it to activate that filter
        if (targetCategory) {
            targetCategory.click();
            
            // Scroll to the portfolio section after a short delay
            setTimeout(() => {
                const portfolioSection = document.querySelector('.portfolio-header');
                if (portfolioSection) {
                    portfolioSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }

});
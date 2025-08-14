// Test Scenarios Overview Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Test Scenarios Overview page loading...');
    
    // Add smooth scrolling for any anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Scroll to target with offset for sticky header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Highlight the target element briefly
                targetElement.style.transition = 'background-color 0.3s ease';
                targetElement.style.backgroundColor = '#fef3c7';
                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                }, 2000);
            }
        });
    });

    // Add hover effects to test scenario cards
    const testCards = document.querySelectorAll('.bg-white.rounded-lg.shadow-md.overflow-hidden');
    testCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click tracking for analytics (if needed)
    const startTestingButtons = document.querySelectorAll('a[href*=".html"]');
    startTestingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const testPage = this.getAttribute('href');
            console.log(`User clicked to start testing: ${testPage}`);
            
            // Add loading state
            const originalContent = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
            this.style.pointerEvents = 'none';
            
            // Reset after a short delay (page will navigate anyway)
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.style.pointerEvents = 'auto';
            }, 1000);
        });
    });

    // Add search functionality for the overview page
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search test scenarios...';
    searchInput.className = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-8 text-lg';
    
    // Insert search box after the hero section
    const heroSection = document.querySelector('.bg-gradient-to-r.from-blue-600.to-purple-700');
    if (heroSection) {
        const container = document.querySelector('.container.mx-auto.px-4');
        if (container) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'container mx-auto px-4';
            searchContainer.appendChild(searchInput);
            heroSection.parentNode.insertBefore(searchContainer, heroSection.nextSibling);
        }
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const testCards = document.querySelectorAll('.bg-white.rounded-lg.shadow-md.overflow-hidden');
        
        testCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.text-xs')).map(tag => tag.textContent.toLowerCase());
            
            const matchesSearch = title.includes(searchTerm) || 
                                description.includes(searchTerm) || 
                                tags.some(tag => tag.includes(searchTerm));
            
            if (matchesSearch || searchTerm === '') {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.opacity = '0.3';
                card.style.transform = 'scale(0.95)';
            }
        });
        
        // Show/hide "no results" message
        const visibleCards = Array.from(testCards).filter(card => 
            card.style.display !== 'none' && card.style.opacity !== '0.3'
        );
        
        let noResultsMessage = document.querySelector('.no-results-message');
        if (visibleCards.length === 0 && searchTerm !== '') {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('div');
                noResultsMessage.className = 'no-results-message text-center py-12';
                noResultsMessage.innerHTML = `
                    <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-600 mb-2">No test scenarios found</h3>
                    <p class="text-gray-500">Try adjusting your search terms or browse all scenarios below.</p>
                `;
                const gridContainer = document.querySelector('.grid.md\\:grid-cols-2.lg\\:grid-cols-3');
                if (gridContainer) {
                    gridContainer.parentNode.insertBefore(noResultsMessage, gridContainer);
                }
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    });

    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Handle tab navigation within the page
            const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });

    // Add progress indicator for page load
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-40';
    progressIndicator.innerHTML = `
        <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm text-gray-600">Test scenarios overview loaded</span>
        </div>
    `;
    document.body.appendChild(progressIndicator);

    // Remove progress indicator after 3 seconds
    setTimeout(() => {
        progressIndicator.style.opacity = '0';
        setTimeout(() => {
            progressIndicator.remove();
        }, 300);
    }, 3000);

    // Add scroll-to-top functionality
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.className = 'fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 z-40 opacity-0';
    scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopButton);

    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.opacity = '1';
        } else {
            scrollToTopButton.style.opacity = '0';
        }
    });

    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add animation on page load
    const testCards = document.querySelectorAll('.bg-white.rounded-lg.shadow-md.overflow-hidden');
    testCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add feature highlight on hover
    const featureCards = document.querySelectorAll('.text-center');
    featureCards.forEach(card => {
        if (card.querySelector('.w-16.h-16')) {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.w-16.h-16');
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.w-16.h-16');
                icon.style.transform = 'scale(1)';
            });
        }
    });

    console.log('Test Scenarios Overview page initialized successfully!');
    
    // Ensure content is visible
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.display = 'block';
        mainContent.style.opacity = '1';
    }
}); 
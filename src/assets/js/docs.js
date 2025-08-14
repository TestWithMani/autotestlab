// Documentation Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Documentation page loading...');

    // Initialize the page
    initializeDocsPage();
    
    function initializeDocsPage() {
        setupCopyToClipboard();
        setupSearchFunctionality();
        setupSmoothScrolling();
        setupCategoryNavigation();
        setupCodeHighlighting();
        console.log('Documentation page initialized successfully!');
    }

    // Setup copy to clipboard functionality
    function setupCopyToClipboard() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const codeElement = document.getElementById(targetId);
                
                if (codeElement) {
                    const textToCopy = codeElement.textContent;
                    
                    // Use modern clipboard API
                    if (navigator.clipboard && window.isSecureContext) {
                        navigator.clipboard.writeText(textToCopy).then(() => {
                            showCopySuccess(this);
                        }).catch(err => {
                            console.error('Failed to copy: ', err);
                            fallbackCopyTextToClipboard(textToCopy, this);
                        });
                    } else {
                        fallbackCopyTextToClipboard(textToCopy, this);
                    }
                }
            });
        });
    }

    // Fallback copy method for older browsers
    function fallbackCopyTextToClipboard(text, button) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showCopySuccess(button);
            } else {
                showCopyError(button);
            }
        } catch (err) {
            console.error('Fallback copy failed: ', err);
            showCopyError(button);
        }
        
        document.body.removeChild(textArea);
    }

    // Show copy success feedback
    function showCopySuccess(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check mr-1"></i>Copied!';
        button.classList.add('bg-green-600');
        button.classList.remove('bg-indigo-600');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('bg-green-600');
            button.classList.add('bg-indigo-600');
        }, 2000);
    }

    // Show copy error feedback
    function showCopyError(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-times mr-1"></i>Failed';
        button.classList.add('bg-red-600');
        button.classList.remove('bg-indigo-600');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('bg-red-600');
            button.classList.add('bg-indigo-600');
        }, 2000);
    }

    // Setup search functionality
    function setupSearchFunctionality() {
        const searchInput = document.getElementById('search-docs');
        const codeContainers = document.querySelectorAll('.code-container');
        
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                
                codeContainers.forEach(container => {
                    const codeElement = container.querySelector('code');
                    const headerText = container.querySelector('.code-header span').textContent.toLowerCase();
                    
                    if (searchTerm === '' || 
                        codeElement.textContent.toLowerCase().includes(searchTerm) ||
                        headerText.includes(searchTerm)) {
                        container.style.display = 'block';
                        highlightSearchTerm(codeElement, searchTerm);
                    } else {
                        container.style.display = 'none';
                    }
                });
                
                updateSearchResults(searchTerm);
            });
        }
    }

    // Highlight search terms in code
    function highlightSearchTerm(codeElement, searchTerm) {
        if (searchTerm === '') {
            codeElement.innerHTML = codeElement.innerHTML.replace(/<mark class="search-highlight">(.*?)<\/mark>/g, '$1');
            return;
        }
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        codeElement.innerHTML = codeElement.innerHTML.replace(/<mark class="search-highlight">(.*?)<\/mark>/g, '$1');
        codeElement.innerHTML = codeElement.innerHTML.replace(regex, '<mark class="search-highlight">$1</mark>');
    }

    // Update search results count
    function updateSearchResults(searchTerm) {
        const visibleContainers = document.querySelectorAll('.code-container[style*="block"], .code-container:not([style*="none"])');
        const totalContainers = document.querySelectorAll('.code-container').length;
        
        // You can add a results counter here if needed
        console.log(`Found ${visibleContainers.length} of ${totalContainers} code examples`);
    }

    // Setup smooth scrolling for navigation
    function setupSmoothScrolling() {
        const categoryLinks = document.querySelectorAll('.category-link');
        
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active category
                    updateActiveCategory(this);
                }
            });
        });
    }

    // Update active category in navigation
    function updateActiveCategory(activeLink) {
        const categoryLinks = document.querySelectorAll('.category-link');
        
        categoryLinks.forEach(link => {
            link.classList.remove('active', 'bg-indigo-100', 'text-indigo-700');
            link.classList.add('text-gray-700');
        });
        
        activeLink.classList.add('active', 'bg-indigo-100', 'text-indigo-700');
        activeLink.classList.remove('text-gray-700');
    }

    // Setup category navigation highlighting
    function setupCategoryNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const categoryLinks = document.querySelectorAll('.category-link');
        
        function updateActiveNavLink() {
            const scrollPos = window.scrollY + 200;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                    if (activeLink) {
                        updateActiveCategory(activeLink);
                    }
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNavLink);
    }

    // Setup code highlighting
    function setupCodeHighlighting() {
        // Prism.js should handle syntax highlighting automatically
        // This function can be used for additional highlighting setup if needed
        
        // Add custom styles for search highlighting
        const style = document.createElement('style');
        style.textContent = `
            .search-highlight {
                background-color: #fbbf24;
                color: #1f2937;
                padding: 2px 4px;
                border-radius: 3px;
                font-weight: bold;
            }
            
            .code-container {
                position: relative;
                margin-bottom: 1.5rem;
            }
            
            .code-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 1rem;
                background-color: #1f2937;
                color: white;
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
            }
            
            .copy-btn {
                background-color: #4f46e5;
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 0.375rem;
                font-size: 0.875rem;
                transition: all 0.2s;
                border: none;
                cursor: pointer;
            }
            
            .copy-btn:hover {
                background-color: #4338ca;
            }
            
            .copy-btn:focus {
                outline: none;
                ring: 2px;
                ring-color: #4f46e5;
            }
            
            pre[class*="language-"] {
                margin: 0;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }
        `;
        document.head.appendChild(style);
    }

    // Add keyboard shortcuts
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('search-docs');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape to clear search
            if (e.key === 'Escape') {
                const searchInput = document.getElementById('search-docs');
                if (searchInput && searchInput.value) {
                    searchInput.value = '';
                    searchInput.dispatchEvent(new Event('input'));
                }
            }
        });
    }

    // Initialize keyboard shortcuts
    setupKeyboardShortcuts();

    // Add loading animation for code blocks
    function addLoadingAnimation() {
        const codeContainers = document.querySelectorAll('.code-container');
        
        codeContainers.forEach(container => {
            const pre = container.querySelector('pre');
            if (pre) {
                pre.style.opacity = '0';
                pre.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    pre.style.transition = 'all 0.3s ease';
                    pre.style.opacity = '1';
                    pre.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }

    // Add loading animation after page load
    setTimeout(addLoadingAnimation, 100);

    // Add tooltips for copy buttons
    function addTooltips() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        
        copyButtons.forEach(button => {
            button.setAttribute('title', 'Copy code to clipboard');
            
            // Add hover effect
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Initialize tooltips
    addTooltips();

    // Add scroll to top functionality
    function addScrollToTop() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 opacity-0 pointer-events-none';
        scrollToTopBtn.id = 'scroll-to-top';
        
        document.body.appendChild(scrollToTopBtn);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.pointerEvents = 'auto';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.pointerEvents = 'none';
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize scroll to top
    addScrollToTop();
}); 
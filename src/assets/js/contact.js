// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page loading...');

    // Formspree is configured in the HTML form action

    // Initialize the page
    initializeContactPage();
    
    function initializeContactPage() {
        setupContactForm();
        setupFormValidation();
        console.log('Contact page initialized successfully!');
    }

    // Setup contact form functionality
    function setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const submitText = document.getElementById('submit-text');
        const submitSpinner = document.getElementById('submit-spinner');
        const formMessages = document.getElementById('form-messages');

        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate form
                if (!validateForm()) {
                    return;
                }

                // Show loading state
                submitButton.disabled = true;
                submitText.textContent = 'Sending...';
                submitSpinner.classList.remove('hidden');
                
                // Get form data
                const formData = new FormData(this);
                const formDataObj = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message'),
                    newsletter: formData.get('newsletter') === 'on'
                };

                // Submit form using Formspree
                fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    console.log('Response status:', response.status);
                    if (response.ok || response.status === 200) {
                        showSuccessMessage(formDataObj);
                        contactForm.reset();
                    } else {
                        throw new Error('Failed to send message');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showErrorMessage('Failed to send message. Please try again later.');
                })
                .finally(() => {
                    // Reset button state
                    submitButton.disabled = false;
                    submitText.textContent = 'Send Message';
                    submitSpinner.classList.add('hidden');
                });
            });
        }
    }

    // Form validation
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;

        // Clear previous errors
        clearAllErrors();

        // Validate name
        if (!name) {
            showFieldError('name', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showFieldError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }

        // Validate email
        if (!email) {
            showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate subject
        if (!subject) {
            showFieldError('subject', 'Please select a subject');
            isValid = false;
        }

        // Validate message
        if (!message) {
            showFieldError('message', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showFieldError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }

        return isValid;
    }

    // Setup form validation on input
    function setupFormValidation() {
        const inputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this.id);
            });
        });
    }

    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        
        switch (fieldId) {
            case 'name':
                if (!value) {
                    showFieldError(fieldId, 'Name is required');
                } else if (value.length < 2) {
                    showFieldError(fieldId, 'Name must be at least 2 characters long');
                } else {
                    clearFieldError(fieldId);
                }
                break;
                
            case 'email':
                if (!value) {
                    showFieldError(fieldId, 'Email is required');
                } else if (!isValidEmail(value)) {
                    showFieldError(fieldId, 'Please enter a valid email address');
                } else {
                    clearFieldError(fieldId);
                }
                break;
                
            case 'subject':
                if (!value) {
                    showFieldError(fieldId, 'Please select a subject');
                } else {
                    clearFieldError(fieldId);
                }
                break;
                
            case 'message':
                if (!value) {
                    showFieldError(fieldId, 'Message is required');
                } else if (value.length < 10) {
                    showFieldError(fieldId, 'Message must be at least 10 characters long');
                } else {
                    clearFieldError(fieldId);
                }
                break;
        }
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show field error
    function showFieldError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const field = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
        
        if (field) {
            field.classList.add('border-red-500');
            field.classList.remove('border-gray-300');
        }
    }

    // Clear field error
    function clearFieldError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const field = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
        
        if (field) {
            field.classList.remove('border-red-500');
            field.classList.add('border-gray-300');
        }
    }

    // Clear all errors
    function clearAllErrors() {
        const errorElements = document.querySelectorAll('[id$="-error"]');
        const fields = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
        
        errorElements.forEach(element => {
            element.classList.add('hidden');
        });
        
        fields.forEach(field => {
            field.classList.remove('border-red-500');
            field.classList.add('border-gray-300');
        });
    }

    // Show success message
    function showSuccessMessage(formData) {
        const formMessages = document.getElementById('form-messages');
        
        const successHTML = `
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <i class="fas fa-check-circle text-green-400 text-xl"></i>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-green-800">Message sent successfully!</h3>
                        <div class="mt-2 text-sm text-green-700">
                            <p>Thank you for contacting us, ${formData.name}. We'll get back to you at ${formData.email} within 24-48 hours.</p>
                            ${formData.newsletter ? '<p class="mt-1">You\'ve been subscribed to our newsletter!</p>' : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        formMessages.innerHTML = successHTML;
        
        // Scroll to message
        formMessages.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            formMessages.innerHTML = '';
        }, 10000);
    }

    // Show error message
    function showErrorMessage(message) {
        const formMessages = document.getElementById('form-messages');
        
        const errorHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <i class="fas fa-exclamation-circle text-red-400 text-xl"></i>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-red-800">Error sending message</h3>
                        <div class="mt-2 text-sm text-red-700">
                            <p>${message}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        formMessages.innerHTML = errorHTML;
        
        // Scroll to message
        formMessages.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Character counter for message
    function setupCharacterCounter() {
        const messageField = document.getElementById('message');
        const maxLength = 1000;
        
        if (messageField) {
            // Create character counter element
            const counter = document.createElement('div');
            counter.className = 'text-sm text-gray-500 mt-1 text-right';
            counter.id = 'message-counter';
            messageField.parentNode.appendChild(counter);
            
            // Update counter on input
            messageField.addEventListener('input', function() {
                const remaining = maxLength - this.value.length;
                counter.textContent = `${remaining} characters remaining`;
                
                if (remaining < 100) {
                    counter.classList.add('text-red-500');
                    counter.classList.remove('text-gray-500');
                } else {
                    counter.classList.remove('text-red-500');
                    counter.classList.add('text-gray-500');
                }
            });
            
            // Initial counter update
            messageField.dispatchEvent(new Event('input'));
        }
    }

    // Initialize character counter
    setupCharacterCounter();

    // Add form animations
    function addFormAnimations() {
        const form = document.getElementById('contact-form');
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach((input, index) => {
            input.style.opacity = '0';
            input.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                input.style.transition = 'all 0.3s ease';
                input.style.opacity = '1';
                input.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Initialize form animations
    setTimeout(addFormAnimations, 500);

    // Add floating labels (optional enhancement)
    function setupFloatingLabels() {
        const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentNode.classList.remove('focused');
                }
            });
            
            // Check if field has value on load
            if (input.value) {
                input.parentNode.classList.add('focused');
            }
        });
    }

    // Initialize floating labels
    setupFloatingLabels();
}); 
// Form Handling JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Form Handling page loading...');

    // Form elements
    const registrationForm = document.getElementById('registration-form');
    const submitButton = document.getElementById('submit-button');
    const submitButtonText = document.getElementById('submit-button-text');
    const submitSpinner = document.getElementById('submit-spinner');
    const formMessage = document.getElementById('form-message');
    const formMessageIcon = document.getElementById('form-message-icon');
    const formMessageText = document.getElementById('form-message-text');
    const formData = document.getElementById('form-data');
    const formDataContent = document.getElementById('form-data-content');

    // Input fields
    const firstNameField = document.getElementById('first-name');
    const lastNameField = document.getElementById('last-name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const bioField = document.getElementById('bio');
    const profilePictureField = document.getElementById('profile-picture');
    const resumeField = document.getElementById('resume');
    const experienceLevelField = document.getElementById('experience-level');

    // Error elements
    const firstNameError = document.getElementById('first-name-error');
    const lastNameError = document.getElementById('last-name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const bioError = document.getElementById('bio-error');
    const profilePictureError = document.getElementById('profile-picture-error');
    const resumeError = document.getElementById('resume-error');
    const experienceLevelError = document.getElementById('experience-level-error');

    // Form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous messages
        clearMessages();
        
        // Validate form
        const isValid = validateForm();
        
        if (!isValid) {
            showMessage('Please fix the validation errors above.', 'error');
            return;
        }

        // Show loading state
        setLoadingState(true);
        
        // Simulate form submission
        setTimeout(() => {
            processFormSubmission();
            setLoadingState(false);
        }, 2000);
    });

    // Validation functions
    function validateForm() {
        let isValid = true;
        
        // Validate first name
        if (!validateRequired(firstNameField, firstNameError, 'First name is required')) {
            isValid = false;
        } else if (!validateMinLength(firstNameField, firstNameError, 2, 'First name must be at least 2 characters')) {
            isValid = false;
        }
        
        // Validate last name
        if (!validateRequired(lastNameField, lastNameError, 'Last name is required')) {
            isValid = false;
        } else if (!validateMinLength(lastNameField, lastNameError, 2, 'Last name must be at least 2 characters')) {
            isValid = false;
        }
        
        // Validate email
        if (!validateRequired(emailField, emailError, 'Email is required')) {
            isValid = false;
        } else if (!validateEmail(emailField, emailError)) {
            isValid = false;
        }
        
        // Validate phone (optional)
        if (phoneField.value.trim() && !validatePhone(phoneField, phoneError)) {
            isValid = false;
        }
        
        // Validate file uploads
        if (profilePictureField.files.length > 0 && !validateFile(profilePictureField, profilePictureError, ['image/jpeg', 'image/png', 'image/gif'], 'Please select a valid image file (JPEG, PNG, GIF)')) {
            isValid = false;
        }
        
        if (resumeField.files.length > 0 && !validateFile(resumeField, resumeError, ['.pdf', '.doc', '.docx'], 'Please select a valid document file (PDF, DOC, DOCX)')) {
            isValid = false;
        }
        
        return isValid;
    }

    function validateRequired(field, errorElement, message) {
        if (!field.value.trim()) {
            showFieldError(errorElement, message);
            return false;
        }
        hideFieldError(errorElement);
        return true;
    }

    function validateMinLength(field, errorElement, minLength, message) {
        if (field.value.trim().length < minLength) {
            showFieldError(errorElement, message);
            return false;
        }
        hideFieldError(errorElement);
        return true;
    }

    function validateEmail(field, errorElement) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            showFieldError(errorElement, 'Please enter a valid email address');
            return false;
        }
        hideFieldError(errorElement);
        return true;
    }

    function validatePhone(field, errorElement) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(field.value.trim().replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(errorElement, 'Please enter a valid phone number');
            return false;
        }
        hideFieldError(errorElement);
        return true;
    }

    function validateFile(field, errorElement, allowedTypes, message) {
        const file = field.files[0];
        if (!file) return true;
        
        const fileName = file.name.toLowerCase();
        const fileType = file.type;
        
        let isValid = false;
        for (let type of allowedTypes) {
            if (type.startsWith('.')) {
                if (fileName.endsWith(type)) {
                    isValid = true;
                    break;
                }
            } else {
                if (fileType === type) {
                    isValid = true;
                    break;
                }
            }
        }
        
        if (!isValid) {
            showFieldError(errorElement, message);
            return false;
        }
        
        hideFieldError(errorElement);
        return true;
    }

    // Form processing
    function processFormSubmission() {
        const formDataObj = new FormData(registrationForm);
        const formValues = {};
        
        // Collect form data
        for (let [key, value] of formDataObj.entries()) {
            if (key === 'interests') {
                if (!formValues[key]) formValues[key] = [];
                formValues[key].push(value);
            } else {
                formValues[key] = value;
            }
        }
        
        // Show success message
        showMessage('Registration submitted successfully! Thank you for your submission.', 'success');
        
        // Display form data
        displayFormData(formValues);
    }

    // UI helper functions
    function setLoadingState(loading) {
        if (loading) {
            submitButton.disabled = true;
            submitButtonText.textContent = 'Submitting...';
            submitSpinner.classList.remove('hidden');
        } else {
            submitButton.disabled = false;
            submitButtonText.textContent = 'Submit Registration';
            submitSpinner.classList.add('hidden');
        }
    }

    function showMessage(text, type) {
        formMessageText.textContent = text;
        
        if (type === 'success') {
            formMessageIcon.className = 'fas fa-check-circle text-green-500';
            formMessage.className = 'mt-6 p-4 rounded-lg bg-green-50 border border-green-200';
        } else {
            formMessageIcon.className = 'fas fa-exclamation-circle text-red-500';
            formMessage.className = 'mt-6 p-4 rounded-lg bg-red-50 border border-red-200';
        }
        
        formMessage.classList.remove('hidden');
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 8000);
    }

    function showFieldError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    function hideFieldError(errorElement) {
        errorElement.classList.add('hidden');
    }

    function clearMessages() {
        formMessage.classList.add('hidden');
        hideFieldError(firstNameError);
        hideFieldError(lastNameError);
        hideFieldError(emailError);
        hideFieldError(phoneError);
        hideFieldError(bioError);
        hideFieldError(profilePictureError);
        hideFieldError(resumeError);
        hideFieldError(experienceLevelError);
    }

    function displayFormData(data) {
        formDataContent.innerHTML = '';
        
        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value = value.join(', ');
            }
            
            if (value) {
                const dataItem = document.createElement('div');
                dataItem.className = 'flex justify-between py-2 border-b border-gray-200';
                dataItem.innerHTML = `
                    <span class="font-medium text-gray-700">${formatFieldName(key)}:</span>
                    <span class="text-gray-600">${value}</span>
                `;
                formDataContent.appendChild(dataItem);
            }
        });
        
        formData.classList.remove('hidden');
    }

    function formatFieldName(key) {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .replace(/([A-Z])/g, ' $1')
            .trim();
    }

    // Quick test buttons
    function createQuickTestButtons() {
        const quickTestContainer = document.createElement('div');
        quickTestContainer.className = 'mt-6 p-4 bg-green-50 rounded-lg';
        quickTestContainer.innerHTML = `
            <h4 class="font-semibold text-green-800 mb-3">Quick Test Buttons</h4>
            <div class="flex flex-wrap gap-2">
                <button class="quick-test-btn bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition duration-200" data-test="valid">
                    Test Valid Form
                </button>
                <button class="quick-test-btn bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition duration-200" data-test="invalid">
                    Test Invalid Form
                </button>
                <button class="quick-test-btn bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition duration-200" data-test="radio">
                    Test Radio Buttons
                </button>
                <button class="quick-test-btn bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700 transition duration-200" data-test="checkbox">
                    Test Checkboxes
                </button>
            </div>
        `;
        
        registrationForm.parentNode.insertBefore(quickTestContainer, registrationForm.nextSibling);
        
        // Add event listeners to quick test buttons
        document.querySelectorAll('.quick-test-btn').forEach(button => {
            button.addEventListener('click', function() {
                const testType = this.getAttribute('data-test');
                
                switch(testType) {
                    case 'valid':
                        fillValidForm();
                        break;
                    case 'invalid':
                        fillInvalidForm();
                        break;
                    case 'radio':
                        testRadioButtons();
                        return;
                    case 'checkbox':
                        testCheckboxes();
                        return;
                }
                
                // Submit form
                registrationForm.dispatchEvent(new Event('submit'));
            });
        });
    }

    function fillValidForm() {
        firstNameField.value = 'John';
        lastNameField.value = 'Doe';
        emailField.value = 'john.doe@example.com';
        phoneField.value = '1234567890';
        bioField.value = 'Software tester with 5 years of experience in automation testing.';
        experienceLevelField.value = 'intermediate';
        
        // Select radio button
        document.getElementById('gender-male').checked = true;
        
        // Select checkboxes
        document.getElementById('interest-programming').checked = true;
        document.getElementById('interest-testing').checked = true;
    }

    function fillInvalidForm() {
        firstNameField.value = 'J';
        lastNameField.value = '';
        emailField.value = 'invalid-email';
        phoneField.value = 'abc';
        bioField.value = '';
        experienceLevelField.value = '';
        
        // Clear all selections
        document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    }

    function testRadioButtons() {
        const radios = document.querySelectorAll('input[name="gender"]');
        let currentIndex = 0;
        
        const interval = setInterval(() => {
            radios.forEach((radio, index) => {
                radio.checked = index === currentIndex;
            });
            
            currentIndex = (currentIndex + 1) % radios.length;
            
            if (currentIndex === 0) {
                clearInterval(interval);
            }
        }, 1000);
    }

    function testCheckboxes() {
        const checkboxes = document.querySelectorAll('input[name="interests"]');
        let currentIndex = 0;
        
        const interval = setInterval(() => {
            checkboxes.forEach((checkbox, index) => {
                checkbox.checked = index === currentIndex;
            });
            
            currentIndex = (currentIndex + 1) % checkboxes.length;
            
            if (currentIndex === 0) {
                clearInterval(interval);
            }
        }, 800);
    }

    // Initialize quick test buttons
    createQuickTestButtons();

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + 1: Valid form
        if ((e.ctrlKey || e.metaKey) && e.key === '1') {
            e.preventDefault();
            fillValidForm();
            registrationForm.dispatchEvent(new Event('submit'));
        }
        
        // Ctrl/Cmd + 2: Invalid form
        if ((e.ctrlKey || e.metaKey) && e.key === '2') {
            e.preventDefault();
            fillInvalidForm();
            registrationForm.dispatchEvent(new Event('submit'));
        }
        
        // Ctrl/Cmd + 3: Test radio buttons
        if ((e.ctrlKey || e.metaKey) && e.key === '3') {
            e.preventDefault();
            testRadioButtons();
        }
        
        // Ctrl/Cmd + 4: Test checkboxes
        if ((e.ctrlKey || e.metaKey) && e.key === '4') {
            e.preventDefault();
            testCheckboxes();
        }
    });

    // Add test case information
    const testInfo = document.createElement('div');
    testInfo.className = 'mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600';
    testInfo.innerHTML = `
        <strong>Keyboard Shortcuts:</strong><br>
        Ctrl/Cmd + 1: Test Valid Form<br>
        Ctrl/Cmd + 2: Test Invalid Form<br>
        Ctrl/Cmd + 3: Test Radio Buttons<br>
        Ctrl/Cmd + 4: Test Checkboxes
    `;
    registrationForm.parentNode.insertBefore(testInfo, registrationForm.nextSibling);

    console.log('Form Handling page initialized successfully!');
}); 
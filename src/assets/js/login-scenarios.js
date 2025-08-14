// Login Scenarios JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Login Scenarios page loading...');

    // Form elements
    const loginForm = document.getElementById('login-form');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('remember-me');
    const loginButton = document.getElementById('login-button');
    const loginButtonText = document.getElementById('login-button-text');
    const loginSpinner = document.getElementById('login-spinner');
    const togglePasswordButton = document.getElementById('toggle-password');
    const passwordIcon = document.getElementById('password-icon');
    const loginMessage = document.getElementById('login-message');
    const messageIcon = document.getElementById('message-icon');
    const messageText = document.getElementById('message-text');
    const testResults = document.getElementById('test-results');
    const resultsContent = document.getElementById('results-content');

    // Error elements
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');

    // Valid credentials for testing
    const validCredentials = {
        username: 'admin',
        password: 'password123'
    };

    // Test case tracking
    let testCaseResults = [];

    // Password toggle functionality
    togglePasswordButton.addEventListener('click', function() {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        
        // Update icon
        if (type === 'text') {
            passwordIcon.className = 'fas fa-eye-slash';
        } else {
            passwordIcon.className = 'fas fa-eye';
        }
    });

    // Real-time validation
    usernameField.addEventListener('blur', function() {
        validateUsername();
    });

    passwordField.addEventListener('blur', function() {
        validatePassword();
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous messages
        clearMessages();
        
        // Validate form
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        
        if (!isUsernameValid || !isPasswordValid) {
            showMessage('Please fix the validation errors above.', 'error');
            return;
        }

        // Show loading state
        setLoadingState(true);
        
        // Simulate login process
        setTimeout(() => {
            performLogin();
            setLoadingState(false);
        }, 1500);
    });

    // Validation functions
    function validateUsername() {
        const username = usernameField.value.trim();
        
        if (!username) {
            showFieldError(usernameError, 'Username is required');
            return false;
        }
        
        if (username.length < 3) {
            showFieldError(usernameError, 'Username must be at least 3 characters');
            return false;
        }
        
        hideFieldError(usernameError);
        return true;
    }

    function validatePassword() {
        const password = passwordField.value.trim();
        
        if (!password) {
            showFieldError(passwordError, 'Password is required');
            return false;
        }
        
        if (password.length < 6) {
            showFieldError(passwordError, 'Password must be at least 6 characters');
            return false;
        }
        
        hideFieldError(passwordError);
        return true;
    }

    // Login logic
    function performLogin() {
        const username = usernameField.value.trim();
        const password = passwordField.value.trim();
        const rememberMe = rememberMeCheckbox.checked;
        
        // Determine test case
        let testCase = '';
        let isSuccess = false;
        let message = '';
        
        if (username === validCredentials.username && password === validCredentials.password) {
            testCase = 'Valid Login';
            isSuccess = true;
            message = 'Login successful! Welcome back, ' + username + '.';
        } else if (username === '' || password === '') {
            testCase = 'Empty Fields';
            isSuccess = false;
            message = 'Please fill in all required fields.';
        } else {
            testCase = 'Invalid Login';
            isSuccess = false;
            message = 'Invalid username or password. Please try again.';
        }
        
        // Show result
        showMessage(message, isSuccess ? 'success' : 'error');
        
        // Track test result
        trackTestResult(testCase, isSuccess, {
            username: username,
            password: password,
            rememberMe: rememberMe,
            message: message
        });
        
        // Show test results
        showTestResults();
    }

    // UI helper functions
    function setLoadingState(loading) {
        if (loading) {
            loginButton.disabled = true;
            loginButtonText.textContent = 'Signing In...';
            loginSpinner.classList.remove('hidden');
        } else {
            loginButton.disabled = false;
            loginButtonText.textContent = 'Sign In';
            loginSpinner.classList.add('hidden');
        }
    }

    function showMessage(text, type) {
        messageText.textContent = text;
        
        // Set icon and styling based on type
        if (type === 'success') {
            messageIcon.className = 'fas fa-check-circle text-green-500';
            loginMessage.className = 'mt-6 p-4 rounded-lg bg-green-50 border border-green-200';
        } else {
            messageIcon.className = 'fas fa-exclamation-circle text-red-500';
            loginMessage.className = 'mt-6 p-4 rounded-lg bg-red-50 border border-red-200';
        }
        
        loginMessage.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            loginMessage.classList.add('hidden');
        }, 5000);
    }

    function showFieldError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    function hideFieldError(errorElement) {
        errorElement.classList.add('hidden');
    }

    function clearMessages() {
        loginMessage.classList.add('hidden');
        hideFieldError(usernameError);
        hideFieldError(passwordError);
    }

    // Test result tracking
    function trackTestResult(testCase, isSuccess, details) {
        const result = {
            testCase: testCase,
            isSuccess: isSuccess,
            timestamp: new Date().toLocaleTimeString(),
            details: details
        };
        
        testCaseResults.push(result);
        
        // Keep only last 10 results
        if (testCaseResults.length > 10) {
            testCaseResults.shift();
        }
    }

    function showTestResults() {
        if (testCaseResults.length === 0) return;
        
        resultsContent.innerHTML = '';
        
        testCaseResults.forEach((result, index) => {
            const resultElement = document.createElement('div');
            resultElement.className = `p-3 rounded-lg border ${
                result.isSuccess 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
            }`;
            
            resultElement.innerHTML = `
                <div class="flex items-center justify-between">
                    <div>
                        <span class="font-semibold ${result.isSuccess ? 'text-green-800' : 'text-red-800'}">
                            ${result.testCase}
                        </span>
                        <span class="text-xs text-gray-500 ml-2">${result.timestamp}</span>
                    </div>
                    <span class="text-xs px-2 py-1 rounded ${
                        result.isSuccess 
                            ? 'bg-green-200 text-green-800' 
                            : 'bg-red-200 text-red-800'
                    }">
                        ${result.isSuccess ? 'PASS' : 'FAIL'}
                    </span>
                </div>
                <div class="text-sm text-gray-600 mt-1">
                    ${result.details.message}
                </div>
            `;
            
            resultsContent.appendChild(resultElement);
        });
        
        testResults.classList.remove('hidden');
    }

    // Quick test buttons (for demonstration)
    function createQuickTestButtons() {
        const quickTestContainer = document.createElement('div');
        quickTestContainer.className = 'mt-6 p-4 bg-blue-50 rounded-lg';
        quickTestContainer.innerHTML = `
            <h4 class="font-semibold text-blue-800 mb-3">Quick Test Buttons</h4>
            <div class="flex flex-wrap gap-2">
                <button class="quick-test-btn bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition duration-200" data-test="valid">
                    Test Valid Login
                </button>
                <button class="quick-test-btn bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition duration-200" data-test="invalid">
                    Test Invalid Login
                </button>
                <button class="quick-test-btn bg-yellow-600 text-white px-3 py-2 rounded text-sm hover:bg-yellow-700 transition duration-200" data-test="empty">
                    Test Empty Fields
                </button>
                <button class="quick-test-btn bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition duration-200" data-test="toggle">
                    Test Password Toggle
                </button>
            </div>
        `;
        
        loginForm.parentNode.insertBefore(quickTestContainer, loginForm.nextSibling);
        
        // Add event listeners to quick test buttons
        document.querySelectorAll('.quick-test-btn').forEach(button => {
            button.addEventListener('click', function() {
                const testType = this.getAttribute('data-test');
                
                switch(testType) {
                    case 'valid':
                        usernameField.value = validCredentials.username;
                        passwordField.value = validCredentials.password;
                        break;
                    case 'invalid':
                        usernameField.value = 'wrong';
                        passwordField.value = 'wrong';
                        break;
                    case 'empty':
                        usernameField.value = '';
                        passwordField.value = '';
                        break;
                    case 'toggle':
                        togglePasswordButton.click();
                        return; // Don't submit form for toggle test
                }
                
                // Submit form
                loginForm.dispatchEvent(new Event('submit'));
            });
        });
    }

    // Initialize quick test buttons
    createQuickTestButtons();

    // Add keyboard shortcuts for testing
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + 1: Valid login
        if ((e.ctrlKey || e.metaKey) && e.key === '1') {
            e.preventDefault();
            usernameField.value = validCredentials.username;
            passwordField.value = validCredentials.password;
            loginForm.dispatchEvent(new Event('submit'));
        }
        
        // Ctrl/Cmd + 2: Invalid login
        if ((e.ctrlKey || e.metaKey) && e.key === '2') {
            e.preventDefault();
            usernameField.value = 'wrong';
            passwordField.value = 'wrong';
            loginForm.dispatchEvent(new Event('submit'));
        }
        
        // Ctrl/Cmd + 3: Empty fields
        if ((e.ctrlKey || e.metaKey) && e.key === '3') {
            e.preventDefault();
            usernameField.value = '';
            passwordField.value = '';
            loginForm.dispatchEvent(new Event('submit'));
        }
    });

    // Add test case information
    const testInfo = document.createElement('div');
    testInfo.className = 'mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600';
    testInfo.innerHTML = `
        <strong>Keyboard Shortcuts:</strong><br>
        Ctrl/Cmd + 1: Test Valid Login<br>
        Ctrl/Cmd + 2: Test Invalid Login<br>
        Ctrl/Cmd + 3: Test Empty Fields
    `;
    loginForm.parentNode.insertBefore(testInfo, loginForm.nextSibling);

    console.log('Login Scenarios page initialized successfully!');
}); 
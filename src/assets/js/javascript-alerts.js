// JavaScript Alerts JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript Alerts page loading...');

    // Alert button elements
    const basicAlertBtn = document.getElementById('basic-alert-btn');
    const confirmAlertBtn = document.getElementById('confirm-alert-btn');
    const promptAlertBtn = document.getElementById('prompt-alert-btn');
    const customAlertBtn = document.getElementById('custom-alert-btn');
    const customAlertMessage = document.getElementById('custom-alert-message');

    // Results display elements
    const alertResults = document.getElementById('alert-results');
    const alertResultsContent = document.getElementById('alert-results-content');

    // Alert result tracking
    let alertResultsList = [];

    // Basic Alert Button
    basicAlertBtn.addEventListener('click', function() {
        const alertText = 'This is a basic alert!';
        alert(alertText);
        
        trackAlertResult('Basic Alert', 'OK', alertText);
        showAlertResults();
    });

    // Confirm Dialog Button
    confirmAlertBtn.addEventListener('click', function() {
        const confirmText = 'Are you sure you want to proceed?';
        const result = confirm(confirmText);
        
        const action = result ? 'OK' : 'Cancel';
        trackAlertResult('Confirm Dialog', action, confirmText);
        showAlertResults();
    });

    // Prompt Dialog Button
    promptAlertBtn.addEventListener('click', function() {
        const promptText = 'Please enter your name:';
        const userInput = prompt(promptText, 'John Doe');
        
        let action = 'Cancel';
        let resultText = promptText;
        
        if (userInput !== null) {
            action = 'OK';
            resultText = `User entered: ${userInput}`;
        }
        
        trackAlertResult('Prompt Dialog', action, resultText);
        showAlertResults();
    });

    // Custom Alert Button
    customAlertBtn.addEventListener('click', function() {
        const message = customAlertMessage.value.trim() || 'This is a custom alert message!';
        alert(message);
        
        trackAlertResult('Custom Alert', 'OK', message);
        showAlertResults();
    });

    // Track alert results
    function trackAlertResult(alertType, action, message) {
        const result = {
            type: alertType,
            action: action,
            message: message,
            timestamp: new Date().toLocaleTimeString()
        };
        
        alertResultsList.push(result);
        
        // Keep only last 10 results
        if (alertResultsList.length > 10) {
            alertResultsList.shift();
        }
    }

    // Display alert results
    function showAlertResults() {
        if (alertResultsList.length === 0) return;
        
        alertResultsContent.innerHTML = '';
        
        alertResultsList.forEach((result, index) => {
            const resultElement = document.createElement('div');
            resultElement.className = `p-4 rounded-lg border ${
                result.action === 'OK' 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-yellow-50 border-yellow-200'
            }`;
            
            resultElement.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <span class="font-semibold ${result.action === 'OK' ? 'text-green-800' : 'text-yellow-800'}">
                        ${result.type}
                    </span>
                    <span class="text-xs px-2 py-1 rounded ${
                        result.action === 'OK' 
                            ? 'bg-green-200 text-green-800' 
                            : 'bg-yellow-200 text-yellow-800'
                    }">
                        ${result.action}
                    </span>
                </div>
                <div class="text-sm text-gray-600 mb-1">
                    ${result.message}
                </div>
                <div class="text-xs text-gray-500">
                    ${result.timestamp}
                </div>
            `;
            
            alertResultsContent.appendChild(resultElement);
        });
        
        alertResults.classList.remove('hidden');
    }

    // Quick test buttons
    function createQuickTestButtons() {
        const quickTestContainer = document.createElement('div');
        quickTestContainer.className = 'mt-6 p-4 bg-yellow-50 rounded-lg';
        quickTestContainer.innerHTML = `
            <h4 class="font-semibold text-yellow-800 mb-3">Quick Test Buttons</h4>
            <div class="flex flex-wrap gap-2">
                <button class="quick-test-btn bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition duration-200" data-test="basic">
                    Test Basic Alert
                </button>
                <button class="quick-test-btn bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition duration-200" data-test="confirm-ok">
                    Test Confirm (OK)
                </button>
                <button class="quick-test-btn bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition duration-200" data-test="confirm-cancel">
                    Test Confirm (Cancel)
                </button>
                <button class="quick-test-btn bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700 transition duration-200" data-test="prompt">
                    Test Prompt
                </button>
            </div>
        `;
        
        basicAlertBtn.parentNode.parentNode.insertBefore(quickTestContainer, basicAlertBtn.parentNode.parentNode.nextSibling);
        
        // Add event listeners to quick test buttons
        document.querySelectorAll('.quick-test-btn').forEach(button => {
            button.addEventListener('click', function() {
                const testType = this.getAttribute('data-test');
                
                switch(testType) {
                    case 'basic':
                        basicAlertBtn.click();
                        break;
                    case 'confirm-ok':
                        // Simulate confirm with OK
                        setTimeout(() => {
                            // This would be handled by Selenium in real testing
                            trackAlertResult('Confirm Dialog', 'OK', 'Are you sure you want to proceed?');
                            showAlertResults();
                        }, 100);
                        confirmAlertBtn.click();
                        break;
                    case 'confirm-cancel':
                        // Simulate confirm with Cancel
                        setTimeout(() => {
                            trackAlertResult('Confirm Dialog', 'Cancel', 'Are you sure you want to proceed?');
                            showAlertResults();
                        }, 100);
                        confirmAlertBtn.click();
                        break;
                    case 'prompt':
                        // Simulate prompt with input
                        setTimeout(() => {
                            trackAlertResult('Prompt Dialog', 'OK', 'User entered: Test User');
                            showAlertResults();
                        }, 100);
                        promptAlertBtn.click();
                        break;
                }
            });
        });
    }

    // Initialize quick test buttons
    createQuickTestButtons();

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + 1: Basic alert
        if ((e.ctrlKey || e.metaKey) && e.key === '1') {
            e.preventDefault();
            basicAlertBtn.click();
        }
        
        // Ctrl/Cmd + 2: Confirm dialog
        if ((e.ctrlKey || e.metaKey) && e.key === '2') {
            e.preventDefault();
            confirmAlertBtn.click();
        }
        
        // Ctrl/Cmd + 3: Prompt dialog
        if ((e.ctrlKey || e.metaKey) && e.key === '3') {
            e.preventDefault();
            promptAlertBtn.click();
        }
        
        // Ctrl/Cmd + 4: Custom alert
        if ((e.ctrlKey || e.metaKey) && e.key === '4') {
            e.preventDefault();
            customAlertBtn.click();
        }
    });

    // Add test case information
    const testInfo = document.createElement('div');
    testInfo.className = 'mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600';
    testInfo.innerHTML = `
        <strong>Keyboard Shortcuts:</strong><br>
        Ctrl/Cmd + 1: Test Basic Alert<br>
        Ctrl/Cmd + 2: Test Confirm Dialog<br>
        Ctrl/Cmd + 3: Test Prompt Dialog<br>
        Ctrl/Cmd + 4: Test Custom Alert
    `;
    basicAlertBtn.parentNode.parentNode.insertBefore(testInfo, basicAlertBtn.parentNode.parentNode.nextSibling);

    // Add Selenium testing tips
    const testingTips = document.createElement('div');
    testingTips.className = 'mt-6 p-4 bg-blue-50 rounded-lg';
    testingTips.innerHTML = `
        <h4 class="font-semibold text-blue-800 mb-2">Selenium Testing Tips</h4>
        <ul class="text-sm text-blue-700 space-y-1">
            <li>• Always switch to alert using <code class="bg-blue-100 px-1 rounded">driver.switchTo().alert()</code></li>
            <li>• Use <code class="bg-blue-100 px-1 rounded">alert.accept()</code> to click OK</li>
            <li>• Use <code class="bg-blue-100 px-1 rounded">alert.dismiss()</code> to click Cancel</li>
            <li>• Use <code class="bg-blue-100 px-1 rounded">alert.sendKeys()</code> for prompt dialogs</li>
            <li>• Get alert text using <code class="bg-blue-100 px-1 rounded">alert.getText()</code></li>
            <li>• Handle NoAlertPresentException for robust testing</li>
        </ul>
    `;
    basicAlertBtn.parentNode.parentNode.insertBefore(testingTips, basicAlertBtn.parentNode.parentNode.nextSibling);

    console.log('JavaScript Alerts page initialized successfully!');
}); 
// Date Picker JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Date Picker page loading...');

    // DOM elements
    const simpleDate = document.getElementById('simple-date');
    const dateWithLimits = document.getElementById('date-with-limits');
    const dateWithPlaceholder = document.getElementById('date-with-placeholder');
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    const meetingDate = document.getElementById('meeting-date');
    const meetingTime = document.getElementById('meeting-time');
    const datetimeLocal = document.getElementById('datetime-local');
    const dateSubmit = document.getElementById('date-submit');
    const dateResults = document.getElementById('date-results');

    // Initialize the page
    function initializePage() {
        setupDateInputs();
        setupQuickTestButtons();
        setupKeyboardShortcuts();
        console.log('Date Picker page initialized successfully!');
    }

    // Setup date input event listeners
    function setupDateInputs() {
        // Simple date input
        simpleDate.addEventListener('change', function() {
            validateSimpleDate(this.value);
        });

        // Date with limits
        dateWithLimits.addEventListener('change', function() {
            validateDateWithLimits(this.value);
        });

        // Date with placeholder (custom format)
        dateWithPlaceholder.addEventListener('input', function() {
            validateCustomDate(this.value);
        });

        // Start date for range
        startDate.addEventListener('change', function() {
            updateDateRange();
        });

        // End date for range
        endDate.addEventListener('change', function() {
            updateDateRange();
        });

        // Meeting date and time
        meetingDate.addEventListener('change', function() {
            validateMeetingDate(this.value);
        });

        meetingTime.addEventListener('change', function() {
            validateMeetingTime(this.value);
        });

        // DateTime local
        datetimeLocal.addEventListener('change', function() {
            validateDateTimeLocal(this.value);
        });

        // Submit button
        dateSubmit.addEventListener('click', handleDateSubmit);
    }

    // Validate simple date
    function validateSimpleDate(dateValue) {
        const errorElement = document.getElementById('simple-date-error');
        
        if (!dateValue) {
            showError('simple-date', 'Date is required');
            return false;
        }

        const selectedDate = new Date(dateValue);
        const today = new Date();
        
        if (selectedDate < today) {
            showError('simple-date', 'Date cannot be in the past');
            return false;
        }

        clearError('simple-date');
        showSuccess('simple-date', `Date selected: ${formatDate(selectedDate)}`);
        return true;
    }

    // Validate date with limits
    function validateDateWithLimits(dateValue) {
        const errorElement = document.getElementById('date-with-limits-error');
        
        if (!dateValue) {
            showError('date-with-limits', 'Date is required');
            return false;
        }

        const selectedDate = new Date(dateValue);
        const minDate = new Date('2024-01-01');
        const maxDate = new Date('2024-12-31');
        
        if (selectedDate < minDate || selectedDate > maxDate) {
            showError('date-with-limits', 'Date must be between Jan 1, 2024 and Dec 31, 2024');
            return false;
        }

        clearError('date-with-limits');
        showSuccess('date-with-limits', `Date selected: ${formatDate(selectedDate)}`);
        return true;
    }

    // Validate custom date format
    function validateCustomDate(dateValue) {
        const errorElement = document.getElementById('date-with-placeholder-error');
        
        if (!dateValue) {
            clearError('date-with-placeholder');
            return true;
        }

        // Check MM/DD/YYYY format
        const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
        
        if (!dateRegex.test(dateValue)) {
            showError('date-with-placeholder', 'Please use MM/DD/YYYY format');
            return false;
        }

        // Validate actual date
        const parts = dateValue.split('/');
        const month = parseInt(parts[0]) - 1;
        const day = parseInt(parts[1]);
        const year = parseInt(parts[2]);
        
        const date = new Date(year, month, day);
        
        if (date.getMonth() !== month || date.getDate() !== day || date.getFullYear() !== year) {
            showError('date-with-placeholder', 'Invalid date');
            return false;
        }

        clearError('date-with-placeholder');
        showSuccess('date-with-placeholder', `Date entered: ${dateValue}`);
        return true;
    }

    // Update date range display
    function updateDateRange() {
        const startValue = startDate.value;
        const endValue = endDate.value;
        const rangeDisplay = document.getElementById('range-display');
        const rangeStart = document.getElementById('range-start');
        const rangeEnd = document.getElementById('range-end');
        const rangeDays = document.getElementById('range-days');

        if (startValue && endValue) {
            const start = new Date(startValue);
            const end = new Date(endValue);
            
            if (end < start) {
                showError('end-date', 'End date cannot be before start date');
                return;
            }

            const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            
            rangeStart.textContent = formatDate(start);
            rangeEnd.textContent = formatDate(end);
            rangeDays.textContent = daysDiff;
            
            rangeDisplay.classList.remove('hidden');
            clearError('start-date');
            clearError('end-date');
            showSuccess('start-date', 'Date range selected');
        }
    }

    // Validate meeting date
    function validateMeetingDate(dateValue) {
        if (!dateValue) {
            showError('meeting-date', 'Meeting date is required');
            return false;
        }

        const selectedDate = new Date(dateValue);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showError('meeting-date', 'Meeting date cannot be in the past');
            return false;
        }

        clearError('meeting-date');
        return true;
    }

    // Validate meeting time
    function validateMeetingTime(timeValue) {
        if (!timeValue) {
            showError('meeting-time', 'Meeting time is required');
            return false;
        }

        const [hours, minutes] = timeValue.split(':').map(Number);
        
        if (hours < 9 || hours > 17) {
            showError('meeting-time', 'Meeting time must be between 9:00 AM and 5:00 PM');
            return false;
        }

        clearError('meeting-time');
        return true;
    }

    // Validate datetime local
    function validateDateTimeLocal(datetimeValue) {
        if (!datetimeValue) {
            showError('datetime-local', 'Date and time is required');
            return false;
        }

        const selectedDateTime = new Date(datetimeValue);
        const now = new Date();
        
        if (selectedDateTime < now) {
            showError('datetime-local', 'Date and time cannot be in the past');
            return false;
        }

        clearError('datetime-local');
        showSuccess('datetime-local', `DateTime selected: ${formatDateTime(selectedDateTime)}`);
        return true;
    }

    // Handle date submission
    function handleDateSubmit() {
        const submitText = document.getElementById('date-submit-text');
        const spinner = document.getElementById('date-spinner');

        // Show loading state
        submitText.textContent = 'Processing...';
        spinner.classList.remove('hidden');
        dateSubmit.disabled = true;

        // Validate all inputs
        const validations = [
            validateSimpleDate(simpleDate.value),
            validateDateWithLimits(dateWithLimits.value),
            validateCustomDate(dateWithPlaceholder.value),
            validateMeetingDate(meetingDate.value),
            validateMeetingTime(meetingTime.value),
            validateDateTimeLocal(datetimeLocal.value)
        ];

        // Simulate processing
        setTimeout(() => {
            const allValid = validations.every(v => v);
            
            if (allValid) {
                showDateResults('success');
            } else {
                showDateResults('error');
            }

            // Reset form
            submitText.textContent = 'Submit Date Selection';
            spinner.classList.add('hidden');
            dateSubmit.disabled = false;
        }, 2000);
    }

    // Show date results
    function showDateResults(type) {
        const results = [];
        
        if (simpleDate.value) {
            results.push(`✅ Simple Date: ${formatDate(new Date(simpleDate.value))}`);
        }
        
        if (dateWithLimits.value) {
            results.push(`✅ Date with Limits: ${formatDate(new Date(dateWithLimits.value))}`);
        }
        
        if (dateWithPlaceholder.value) {
            results.push(`✅ Custom Date: ${dateWithPlaceholder.value}`);
        }
        
        if (startDate.value && endDate.value) {
            const days = Math.ceil((new Date(endDate.value) - new Date(startDate.value)) / (1000 * 60 * 60 * 24));
            results.push(`✅ Date Range: ${formatDate(new Date(startDate.value))} to ${formatDate(new Date(endDate.value))} (${days} days)`);
        }
        
        if (meetingDate.value && meetingTime.value) {
            results.push(`✅ Meeting: ${formatDate(new Date(meetingDate.value))} at ${meetingTime.value}`);
        }
        
        if (datetimeLocal.value) {
            results.push(`✅ DateTime: ${formatDateTime(new Date(datetimeLocal.value))}`);
        }

        dateResults.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-3 text-xl text-${type === 'success' ? 'green' : 'red'}-500"></i>
                <div class="text-sm">
                    <h4 class="font-semibold text-gray-800 mb-1">Date Selection Results</h4>
                    <div class="text-gray-600">${results.join('<br>')}</div>
                </div>
            </div>
        `;
        dateResults.className = `p-4 rounded-lg ${type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`;
        dateResults.classList.remove('hidden');
    }

    // Setup quick test buttons
    function setupQuickTestButtons() {
        const quickTestToday = document.getElementById('quick-test-today');
        const quickTestRange = document.getElementById('quick-test-range');
        const quickTestMeeting = document.getElementById('quick-test-meeting');
        const quickTestClear = document.getElementById('quick-test-clear');

        quickTestToday.addEventListener('click', () => {
            const today = new Date().toISOString().split('T')[0];
            simpleDate.value = today;
            dateWithLimits.value = today;
            validateSimpleDate(today);
            validateDateWithLimits(today);
            showNotification('Today\'s date set', 'success');
        });

        quickTestRange.addEventListener('click', () => {
            const today = new Date();
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            
            startDate.value = today.toISOString().split('T')[0];
            endDate.value = nextWeek.toISOString().split('T')[0];
            updateDateRange();
            showNotification('Date range set', 'success');
        });

        quickTestMeeting.addEventListener('click', () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            meetingDate.value = tomorrow.toISOString().split('T')[0];
            meetingTime.value = '14:00';
            validateMeetingDate(meetingDate.value);
            validateMeetingTime(meetingTime.value);
            showNotification('Meeting date and time set', 'success');
        });

        quickTestClear.addEventListener('click', () => {
            // Clear all date inputs
            simpleDate.value = '';
            dateWithLimits.value = '';
            dateWithPlaceholder.value = '';
            startDate.value = '';
            endDate.value = '';
            meetingDate.value = '';
            meetingTime.value = '';
            datetimeLocal.value = '';
            
            // Clear all errors and results
            clearAllErrors();
            dateResults.classList.add('hidden');
            document.getElementById('range-display').classList.add('hidden');
            
            showNotification('All dates cleared', 'info');
        });
    }

    // Setup keyboard shortcuts
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        document.getElementById('quick-test-today').click();
                        break;
                    case '2':
                        e.preventDefault();
                        document.getElementById('quick-test-range').click();
                        break;
                    case '3':
                        e.preventDefault();
                        document.getElementById('quick-test-meeting').click();
                        break;
                    case '4':
                        e.preventDefault();
                        document.getElementById('quick-test-clear').click();
                        break;
                }
            }
        });
    }

    // Utility functions
    function formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function formatDateTime(date) {
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    function clearError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        errorElement.classList.add('hidden');
    }

    function clearAllErrors() {
        const errorElements = document.querySelectorAll('[id$="-error"]');
        errorElements.forEach(element => {
            element.classList.add('hidden');
        });
    }

    function showSuccess(fieldId, message) {
        // Create temporary success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg z-50';
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
        const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
        
        notification.className = `fixed top-4 right-4 p-4 ${bgColor} text-white rounded-lg shadow-lg z-50`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${icon} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Initialize the page
    initializePage();
}); 
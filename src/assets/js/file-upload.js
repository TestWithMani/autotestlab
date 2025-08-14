// File Upload JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('File Upload page loading...');

    // File size limits (in bytes)
    const FILE_LIMITS = {
        'profile-picture': 10 * 1024 * 1024, // 10MB
        'document-upload': 5 * 1024 * 1024,  // 5MB
        'resume-upload': 2 * 1024 * 1024     // 2MB
    };

    // Allowed file types
    const ALLOWED_TYPES = {
        'profile-picture': ['image/jpeg', 'image/png', 'image/gif'],
        'document-upload': ['.pdf', '.doc', '.docx', '.txt'],
        'resume-upload': ['.pdf', '.doc', '.docx']
    };

    // DOM elements
    const profilePicture = document.getElementById('profile-picture');
    const documentUpload = document.getElementById('document-upload');
    const resumeUpload = document.getElementById('resume-upload');
    const uploadSubmit = document.getElementById('upload-submit');
    const uploadResults = document.getElementById('upload-results');

    // Upload areas for drag & drop
    const profileUploadArea = document.getElementById('profile-upload-area');
    const documentUploadArea = document.getElementById('document-upload-area');
    const resumeUploadArea = document.getElementById('resume-upload-area');

    // Progress elements
    const resumeProgress = document.getElementById('resume-progress');
    const resumeProgressBar = document.getElementById('resume-progress-bar');
    const resumePercentage = document.getElementById('resume-percentage');
    const resumeFilename = document.getElementById('resume-filename');

    // File data storage
    let uploadedFiles = {
        'profile-picture': null,
        'document-upload': [],
        'resume-upload': null
    };

    // Initialize the page
    function initializePage() {
        setupFileInputs();
        setupDragAndDrop();
        setupQuickTestButtons();
        setupKeyboardShortcuts();
        console.log('File Upload page initialized successfully!');
    }

    // Setup file input event listeners
    function setupFileInputs() {
        // Profile picture upload
        profilePicture.addEventListener('change', function(e) {
            handleFileUpload(e.target.files[0], 'profile-picture');
        });

        // Document upload (multiple files)
        documentUpload.addEventListener('change', function(e) {
            handleMultipleFileUpload(Array.from(e.target.files), 'document-upload');
        });

        // Resume upload
        resumeUpload.addEventListener('change', function(e) {
            handleFileUpload(e.target.files[0], 'resume-upload');
        });

        // Submit button
        uploadSubmit.addEventListener('click', handleSubmit);
    }

    // Handle single file upload
    function handleFileUpload(file, uploadType) {
        if (!file) return;

        const validation = validateFile(file, uploadType);
        if (!validation.isValid) {
            showError(uploadType, validation.message);
            return;
        }

        // Store file data
        uploadedFiles[uploadType] = file;

        // Handle different upload types
        switch (uploadType) {
            case 'profile-picture':
                showProfilePreview(file);
                break;
            case 'resume-upload':
                showResumeProgress(file);
                break;
        }

        clearError(uploadType);
        showSuccess(uploadType, `File "${file.name}" uploaded successfully!`);
    }

    // Handle multiple file upload
    function handleMultipleFileUpload(files, uploadType) {
        const validFiles = [];
        const errors = [];

        files.forEach(file => {
            const validation = validateFile(file, uploadType);
            if (validation.isValid) {
                validFiles.push(file);
            } else {
                errors.push(`${file.name}: ${validation.message}`);
            }
        });

        // Store valid files
        uploadedFiles[uploadType] = validFiles;

        // Show file list
        showDocumentList(validFiles);

        // Show errors if any
        if (errors.length > 0) {
            showError(uploadType, errors.join(', '));
        } else {
            clearError(uploadType);
            showSuccess(uploadType, `${validFiles.length} files uploaded successfully!`);
        }
    }

    // Validate file
    function validateFile(file, uploadType) {
        // Check file size
        if (file.size > FILE_LIMITS[uploadType]) {
            return {
                isValid: false,
                message: `File size exceeds ${formatFileSize(FILE_LIMITS[uploadType])} limit`
            };
        }

        // Check file type
        const allowedTypes = ALLOWED_TYPES[uploadType];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        const isValidType = allowedTypes.some(type => {
            if (type.startsWith('.')) {
                return fileExtension === type;
            } else {
                return file.type === type;
            }
        });

        if (!isValidType) {
            return {
                isValid: false,
                message: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
            };
        }

        return { isValid: true, message: '' };
    }

    // Show profile picture preview
    function showProfilePreview(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('profile-preview');
            const previewImg = document.getElementById('profile-preview-img');
            const removeBtn = document.getElementById('remove-profile');

            previewImg.src = e.target.result;
            preview.classList.remove('hidden');

            // Remove button functionality
            removeBtn.onclick = function() {
                uploadedFiles['profile-picture'] = null;
                preview.classList.add('hidden');
                profilePicture.value = '';
                showSuccess('profile-picture', 'Profile picture removed');
            };
        };
        reader.readAsDataURL(file);
    }

    // Show document list
    function showDocumentList(files) {
        const documentList = document.getElementById('document-list');
        documentList.innerHTML = '';

        files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg';
            fileItem.innerHTML = `
                <div class="flex items-center space-x-3">
                    <i class="fas fa-file-alt text-blue-600"></i>
                    <div>
                        <p class="text-sm font-medium text-gray-900">${file.name}</p>
                        <p class="text-xs text-gray-500">${formatFileSize(file.size)}</p>
                    </div>
                </div>
                <button class="text-red-600 hover:text-red-800 text-sm" onclick="removeDocument(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            documentList.appendChild(fileItem);
        });
    }

    // Remove document from list
    window.removeDocument = function(index) {
        uploadedFiles['document-upload'].splice(index, 1);
        showDocumentList(uploadedFiles['document-upload']);
        showSuccess('document-upload', 'Document removed');
    };

    // Show resume upload progress
    function showResumeProgress(file) {
        resumeProgress.classList.remove('hidden');
        resumeFilename.textContent = file.name;
        
        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    resumeProgress.classList.add('hidden');
                }, 1000);
            }
            
            resumeProgressBar.style.width = progress + '%';
            resumePercentage.textContent = Math.round(progress) + '%';
        }, 200);
    }

    // Setup drag and drop functionality
    function setupDragAndDrop() {
        const uploadAreas = [
            { element: profileUploadArea, type: 'profile-picture' },
            { element: documentUploadArea, type: 'document-upload' },
            { element: resumeUploadArea, type: 'resume-upload' }
        ];

        uploadAreas.forEach(({ element, type }) => {
            element.addEventListener('dragover', function(e) {
                e.preventDefault();
                element.classList.add('border-green-400', 'bg-green-50');
            });

            element.addEventListener('dragleave', function(e) {
                e.preventDefault();
                element.classList.remove('border-green-400', 'bg-green-50');
            });

            element.addEventListener('drop', function(e) {
                e.preventDefault();
                element.classList.remove('border-green-400', 'bg-green-50');
                
                const files = Array.from(e.dataTransfer.files);
                if (type === 'document-upload') {
                    handleMultipleFileUpload(files, type);
                } else {
                    handleFileUpload(files[0], type);
                }
            });
        });
    }

    // Handle form submission
    function handleSubmit() {
        const submitText = document.getElementById('upload-submit-text');
        const spinner = document.getElementById('upload-spinner');

        // Show loading state
        submitText.textContent = 'Uploading...';
        spinner.classList.remove('hidden');
        uploadSubmit.disabled = true;

        // Simulate upload process
        setTimeout(() => {
            const results = [];
            
            // Check profile picture
            if (uploadedFiles['profile-picture']) {
                results.push(`✅ Profile picture: ${uploadedFiles['profile-picture'].name}`);
            } else {
                results.push('❌ Profile picture: Required');
            }

            // Check documents
            if (uploadedFiles['document-upload'].length > 0) {
                results.push(`✅ Documents: ${uploadedFiles['document-upload'].length} files uploaded`);
            } else {
                results.push('ℹ️ Documents: No files uploaded (optional)');
            }

            // Check resume
            if (uploadedFiles['resume-upload']) {
                results.push(`✅ Resume: ${uploadedFiles['resume-upload'].name}`);
            } else {
                results.push('ℹ️ Resume: No file uploaded (optional)');
            }

            // Show results
            showUploadResults(results.join('<br>'), uploadedFiles['profile-picture'] ? 'success' : 'error');

            // Reset form
            submitText.textContent = 'Submit Uploads';
            spinner.classList.add('hidden');
            uploadSubmit.disabled = false;
        }, 2000);
    }

    // Show upload results
    function showUploadResults(message, type) {
        uploadResults.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-3 text-xl text-${type === 'success' ? 'green' : 'red'}-500"></i>
                <div class="text-sm">
                    <h4 class="font-semibold text-gray-800 mb-1">Upload Results</h4>
                    <div class="text-gray-600">${message}</div>
                </div>
            </div>
        `;
        uploadResults.className = `p-4 rounded-lg ${type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`;
        uploadResults.classList.remove('hidden');
    }

    // Show error message
    function showError(uploadType, message) {
        const errorElement = document.getElementById(`${uploadType}-error`);
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    // Clear error message
    function clearError(uploadType) {
        const errorElement = document.getElementById(`${uploadType}-error`);
        errorElement.classList.add('hidden');
    }

    // Show success message
    function showSuccess(uploadType, message) {
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

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Setup quick test buttons
    function setupQuickTestButtons() {
        const quickTestValid = document.getElementById('quick-test-valid');
        const quickTestInvalid = document.getElementById('quick-test-invalid');
        const quickTestLarge = document.getElementById('quick-test-large');
        const quickTestMultiple = document.getElementById('quick-test-multiple');

        quickTestValid.addEventListener('click', () => {
            // Simulate valid file upload
            const mockFile = new File(['mock content'], 'test-image.jpg', { type: 'image/jpeg' });
            handleFileUpload(mockFile, 'profile-picture');
            showSuccess('profile-picture', 'Valid file test completed');
        });

        quickTestInvalid.addEventListener('click', () => {
            // Simulate invalid file upload
            const mockFile = new File(['mock content'], 'test-file.exe', { type: 'application/x-msdownload' });
            handleFileUpload(mockFile, 'profile-picture');
        });

        quickTestLarge.addEventListener('click', () => {
            // Simulate large file upload
            const mockFile = new File(['x'.repeat(15 * 1024 * 1024)], 'large-file.jpg', { type: 'image/jpeg' });
            handleFileUpload(mockFile, 'profile-picture');
        });

        quickTestMultiple.addEventListener('click', () => {
            // Simulate multiple file upload
            const mockFiles = [
                new File(['content1'], 'document1.pdf', { type: 'application/pdf' }),
                new File(['content2'], 'document2.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
                new File(['content3'], 'document3.txt', { type: 'text/plain' })
            ];
            handleMultipleFileUpload(mockFiles, 'document-upload');
        });
    }

    // Setup keyboard shortcuts
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        document.getElementById('quick-test-valid').click();
                        break;
                    case '2':
                        e.preventDefault();
                        document.getElementById('quick-test-invalid').click();
                        break;
                    case '3':
                        e.preventDefault();
                        document.getElementById('quick-test-large').click();
                        break;
                    case '4':
                        e.preventDefault();
                        document.getElementById('quick-test-multiple').click();
                        break;
                }
            }
        });
    }

    // Initialize the page
    initializePage();
}); 
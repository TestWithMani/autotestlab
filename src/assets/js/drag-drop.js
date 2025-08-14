// Drag & Drop JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Drag & Drop page loading...');

    // File data storage
    let uploadedFiles = {
        singleFile: null,
        multipleFiles: []
    };

    // Drag & drop state
    let draggedElement = null;
    let cardsMoved = 0;

    // DOM elements
    const singleFileDropzone = document.getElementById('single-file-dropzone');
    const multipleFilesDropzone = document.getElementById('multiple-files-dropzone');
    const uploadSubmit = document.getElementById('upload-submit');
    const uploadResults = document.getElementById('upload-results');
    const reorderableList = document.getElementById('reorderable-list');
    const currentOrder = document.getElementById('current-order');
    const cardsMovedCounter = document.getElementById('cards-moved');

    // Initialize the page
    function initializePage() {
        setupFileDragAndDrop();
        setupListReordering();
        setupCardSorting();
        setupQuickTestButtons();
        setupKeyboardShortcuts();
        console.log('Drag & Drop page initialized successfully!');
    }

    // Setup file drag and drop functionality
    function setupFileDragAndDrop() {
        // Single file dropzone
        setupDropzone(singleFileDropzone, 'single');
        
        // Multiple files dropzone
        setupDropzone(multipleFilesDropzone, 'multiple');

        // Upload submit button
        uploadSubmit.addEventListener('click', handleFileUpload);
    }

    // Setup individual dropzone
    function setupDropzone(dropzone, type) {
        dropzone.addEventListener('dragover', function(e) {
            e.preventDefault();
            dropzone.classList.add('border-purple-400', 'bg-purple-50');
        });

        dropzone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            dropzone.classList.remove('border-purple-400', 'bg-purple-50');
        });

        dropzone.addEventListener('drop', function(e) {
            e.preventDefault();
            dropzone.classList.remove('border-purple-400', 'bg-purple-50');
            
            const files = Array.from(e.dataTransfer.files);
            if (type === 'single') {
                handleSingleFileDrop(files[0]);
            } else {
                handleMultipleFilesDrop(files);
            }
        });

        // Click to browse functionality
        dropzone.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = type === 'multiple';
            input.accept = '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif';
            
            input.addEventListener('change', function(e) {
                const files = Array.from(e.target.files);
                if (type === 'single') {
                    handleSingleFileDrop(files[0]);
                } else {
                    handleMultipleFilesDrop(files);
                }
            });
            
            input.click();
        });
    }

    // Handle single file drop
    function handleSingleFileDrop(file) {
        if (!file) return;

        uploadedFiles.singleFile = file;
        showSingleFilePreview(file);
        showNotification(`File "${file.name}" uploaded successfully!`, 'success');
    }

    // Handle multiple files drop
    function handleMultipleFilesDrop(files) {
        if (!files || files.length === 0) return;

        uploadedFiles.multipleFiles = [...uploadedFiles.multipleFiles, ...files];
        showMultipleFilesList();
        showNotification(`${files.length} files uploaded successfully!`, 'success');
    }

    // Show single file preview
    function showSingleFilePreview(file) {
        const preview = document.getElementById('single-file-preview');
        const fileName = document.getElementById('single-file-name');
        const fileSize = document.getElementById('single-file-size');
        const removeBtn = document.getElementById('remove-single-file');

        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);
        preview.classList.remove('hidden');

        // Remove button functionality
        removeBtn.onclick = function() {
            uploadedFiles.singleFile = null;
            preview.classList.add('hidden');
            showNotification('File removed', 'info');
        };
    }

    // Show multiple files list
    function showMultipleFilesList() {
        const filesList = document.getElementById('multiple-files-list');
        filesList.innerHTML = '';

        uploadedFiles.multipleFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'flex items-center justify-between p-3 bg-pink-50 rounded-lg';
            fileItem.innerHTML = `
                <div class="flex items-center space-x-3">
                    <i class="fas fa-file-alt text-pink-600"></i>
                    <div>
                        <p class="text-sm font-medium text-gray-900">${file.name}</p>
                        <p class="text-xs text-gray-500">${formatFileSize(file.size)}</p>
                    </div>
                </div>
                <button class="text-red-600 hover:text-red-800 text-sm" onclick="removeMultipleFile(${index})" aria-label="Remove file">
                    <i class="fas fa-times"></i>
                </button>
            `;
            filesList.appendChild(fileItem);
        });
    }

    // Remove multiple file (global function for onclick)
    window.removeMultipleFile = function(index) {
        uploadedFiles.multipleFiles.splice(index, 1);
        showMultipleFilesList();
        showNotification('File removed', 'info');
    };

    // Handle file upload submission
    function handleFileUpload() {
        const submitText = document.getElementById('upload-submit-text');
        const spinner = document.getElementById('upload-spinner');

        // Show loading state
        submitText.textContent = 'Uploading...';
        spinner.classList.remove('hidden');
        uploadSubmit.disabled = true;

        // Simulate upload process
        setTimeout(() => {
            const results = [];
            
            if (uploadedFiles.singleFile) {
                results.push(`✅ Single file: ${uploadedFiles.singleFile.name}`);
            } else {
                results.push('❌ Single file: Required');
            }

            if (uploadedFiles.multipleFiles.length > 0) {
                results.push(`✅ Multiple files: ${uploadedFiles.multipleFiles.length} files`);
            } else {
                results.push('ℹ️ Multiple files: No files uploaded (optional)');
            }

            showUploadResults(results.join('<br>'), uploadedFiles.singleFile ? 'success' : 'error');

            // Reset form
            submitText.textContent = 'Upload Files';
            spinner.classList.add('hidden');
            uploadSubmit.disabled = false;
        }, 2000);
    }

    // Setup list reordering functionality
    function setupListReordering() {
        const draggableItems = document.querySelectorAll('.draggable-item');
        
        draggableItems.forEach(item => {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
        });

        reorderableList.addEventListener('dragover', handleDragOver);
        reorderableList.addEventListener('drop', handleListDrop);
    }

    // Handle drag start for list items
    function handleDragStart(e) {
        draggedElement = this;
        this.classList.add('opacity-50', 'scale-95');
        e.dataTransfer.effectAllowed = 'move';
    }

    // Handle drag end for list items
    function handleDragEnd(e) {
        this.classList.remove('opacity-50', 'scale-95');
        draggedElement = null;
    }

    // Handle drag over for list container
    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    // Handle drop for list reordering
    function handleListDrop(e) {
        e.preventDefault();
        
        if (!draggedElement) return;

        const items = Array.from(reorderableList.children);
        const draggedIndex = items.indexOf(draggedElement);
        const dropTarget = e.target.closest('.draggable-item');
        
        if (!dropTarget || dropTarget === draggedElement) return;

        const dropIndex = items.indexOf(dropTarget);
        
        // Reorder the list
        if (draggedIndex < dropIndex) {
            dropTarget.parentNode.insertBefore(draggedElement, dropTarget.nextSibling);
        } else {
            dropTarget.parentNode.insertBefore(draggedElement, dropTarget);
        }

        // Update order display
        updateOrderDisplay();
        showNotification('List reordered successfully!', 'success');
    }

    // Update order display
    function updateOrderDisplay() {
        const items = Array.from(reorderableList.children);
        const order = items.map(item => item.getAttribute('data-id')).join(', ');
        currentOrder.textContent = order;
    }

    // Setup card sorting functionality
    function setupCardSorting() {
        const cardItems = document.querySelectorAll('.card-item');
        const columns = document.querySelectorAll('#todo-column, #progress-column, #done-column');
        
        cardItems.forEach(card => {
            card.addEventListener('dragstart', handleCardDragStart);
            card.addEventListener('dragend', handleCardDragEnd);
        });

        columns.forEach(column => {
            column.addEventListener('dragover', handleColumnDragOver);
            column.addEventListener('drop', handleColumnDrop);
        });
    }

    // Handle drag start for cards
    function handleCardDragStart(e) {
        draggedElement = this;
        this.classList.add('opacity-50', 'scale-95');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.getAttribute('data-category'));
    }

    // Handle drag end for cards
    function handleCardDragEnd(e) {
        this.classList.remove('opacity-50', 'scale-95');
        draggedElement = null;
    }

    // Handle drag over for columns
    function handleColumnDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.classList.add('bg-blue-100');
    }

    // Handle drop for card sorting
    function handleColumnDrop(e) {
        e.preventDefault();
        this.classList.remove('bg-blue-100');
        
        if (!draggedElement) return;

        const targetColumn = this;
        const sourceColumn = draggedElement.parentElement;
        
        if (targetColumn !== sourceColumn) {
            targetColumn.appendChild(draggedElement);
            cardsMoved++;
            cardsMovedCounter.textContent = cardsMoved;
            
            // Update card category
            const columnId = targetColumn.id;
            let newCategory = 'todo';
            if (columnId === 'progress-column') newCategory = 'progress';
            else if (columnId === 'done-column') newCategory = 'done';
            
            draggedElement.setAttribute('data-category', newCategory);
            
            showNotification(`Card moved to ${newCategory}`, 'success');
        }
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

    // Show notification
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
        const quickTestFile = document.getElementById('quick-test-file');
        const quickTestReorder = document.getElementById('quick-test-reorder');
        const quickTestSort = document.getElementById('quick-test-sort');
        const quickTestReset = document.getElementById('quick-test-reset');

        quickTestFile.addEventListener('click', () => {
            // Simulate file drop
            const mockFile = new File(['mock content'], 'test-document.pdf', { type: 'application/pdf' });
            handleSingleFileDrop(mockFile);
            showNotification('File drop test completed', 'success');
        });

        quickTestReorder.addEventListener('click', () => {
            // Simulate list reordering
            const items = Array.from(reorderableList.children);
            if (items.length > 1) {
                const firstItem = items[0];
                const lastItem = items[items.length - 1];
                reorderableList.insertBefore(firstItem, lastItem.nextSibling);
                updateOrderDisplay();
                showNotification('List reorder test completed', 'success');
            }
        });

        quickTestSort.addEventListener('click', () => {
            // Simulate card sorting
            const todoColumn = document.getElementById('todo-column');
            const progressColumn = document.getElementById('progress-column');
            const firstCard = todoColumn.querySelector('.card-item');
            
            if (firstCard) {
                progressColumn.appendChild(firstCard);
                firstCard.setAttribute('data-category', 'progress');
                cardsMoved++;
                cardsMovedCounter.textContent = cardsMoved;
                showNotification('Card sort test completed', 'success');
            }
        });

        quickTestReset.addEventListener('click', () => {
            // Reset all states
            uploadedFiles = { singleFile: null, multipleFiles: [] };
            cardsMoved = 0;
            
            // Reset file displays
            document.getElementById('single-file-preview').classList.add('hidden');
            document.getElementById('multiple-files-list').innerHTML = '';
            
            // Reset list order
            const items = Array.from(reorderableList.children);
            items.sort((a, b) => parseInt(a.getAttribute('data-id')) - parseInt(b.getAttribute('data-id')));
            items.forEach(item => reorderableList.appendChild(item));
            updateOrderDisplay();
            
            // Reset card positions
            resetCardPositions();
            
            // Reset counters
            cardsMovedCounter.textContent = '0';
            
            showNotification('All states reset', 'info');
        });
    }

    // Reset card positions to original
    function resetCardPositions() {
        const todoColumn = document.getElementById('todo-column');
        const progressColumn = document.getElementById('progress-column');
        const doneColumn = document.getElementById('done-column');
        
        // Move all cards back to todo
        const allCards = document.querySelectorAll('.card-item');
        allCards.forEach(card => {
            todoColumn.appendChild(card);
            card.setAttribute('data-category', 'todo');
        });
    }

    // Setup keyboard shortcuts
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        document.getElementById('quick-test-file').click();
                        break;
                    case '2':
                        e.preventDefault();
                        document.getElementById('quick-test-reorder').click();
                        break;
                    case '3':
                        e.preventDefault();
                        document.getElementById('quick-test-sort').click();
                        break;
                    case '4':
                        e.preventDefault();
                        document.getElementById('quick-test-reset').click();
                        break;
                }
            }
        });
    }

    // Initialize the page
    initializePage();
}); 
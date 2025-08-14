// Dynamic Tables JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dynamic Tables page loading...');

    // Sample employee data
    let employees = [
        { id: 1, name: 'John Smith', email: 'john.smith@company.com', department: 'Engineering', salary: 75000, status: 'Active' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', department: 'Marketing', salary: 65000, status: 'Active' },
        { id: 3, name: 'Michael Brown', email: 'michael.brown@company.com', department: 'Sales', salary: 70000, status: 'Active' },
        { id: 4, name: 'Emily Davis', email: 'emily.davis@company.com', department: 'HR', salary: 60000, status: 'Active' },
        { id: 5, name: 'David Wilson', email: 'david.wilson@company.com', department: 'Engineering', salary: 80000, status: 'Active' },
        { id: 6, name: 'Lisa Anderson', email: 'lisa.anderson@company.com', department: 'Finance', salary: 70000, status: 'Inactive' },
        { id: 7, name: 'Robert Taylor', email: 'robert.taylor@company.com', department: 'Sales', salary: 65000, status: 'Active' },
        { id: 8, name: 'Jennifer Martinez', email: 'jennifer.martinez@company.com', department: 'Marketing', salary: 60000, status: 'On Leave' },
        { id: 9, name: 'Christopher Garcia', email: 'christopher.garcia@company.com', department: 'Engineering', salary: 85000, status: 'Active' },
        { id: 10, name: 'Amanda Rodriguez', email: 'amanda.rodriguez@company.com', department: 'HR', salary: 55000, status: 'Active' },
        { id: 11, name: 'James Lee', email: 'james.lee@company.com', department: 'Finance', salary: 75000, status: 'Active' },
        { id: 12, name: 'Michelle White', email: 'michelle.white@company.com', department: 'Sales', salary: 70000, status: 'Active' }
    ];

    let filteredEmployees = [...employees];
    let currentSort = { column: 'id', direction: 'asc' };
    let currentPage = 1;
    let rowsPerPage = 10;
    let editingRowId = null;

    // DOM elements
    const tableBody = document.getElementById('table-body');
    const tableSearch = document.getElementById('table-search');
    const departmentFilter = document.getElementById('department-filter');
    const addRowBtn = document.getElementById('add-row-btn');
    const refreshTableBtn = document.getElementById('refresh-table-btn');
    const rowsPerPageSelect = document.getElementById('rows-per-page');
    const showingCount = document.getElementById('showing-count');
    const totalCount = document.getElementById('total-count');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const closeModal = document.getElementById('close-modal');
    const cancelEdit = document.getElementById('cancel-edit');

    // Initialize the table
    function initializeTable() {
        renderTable();
        setupEventListeners();
        createQuickTestButtons();
        setupKeyboardShortcuts();
        console.log('Dynamic Tables page initialized successfully!');
    }

    // Render the table with current data
    function renderTable() {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const pageData = filteredEmployees.slice(startIndex, endIndex);

        tableBody.innerHTML = '';

        pageData.forEach(employee => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50 transition duration-200';
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${employee.id}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${employee.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.email}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDepartmentBadgeClass(employee.department)}">
                        ${employee.department}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$${employee.salary.toLocaleString()}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(employee.status)}">
                        ${employee.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="edit-row-btn text-blue-600 hover:text-blue-900 mr-3" data-id="${employee.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-row-btn text-red-600 hover:text-red-900" data-id="${employee.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        updateTableInfo();
    }

    // Get department badge class
    function getDepartmentBadgeClass(department) {
        const classes = {
            'Engineering': 'bg-blue-100 text-blue-800',
            'Marketing': 'bg-green-100 text-green-800',
            'Sales': 'bg-purple-100 text-purple-800',
            'HR': 'bg-yellow-100 text-yellow-800',
            'Finance': 'bg-red-100 text-red-800'
        };
        return classes[department] || 'bg-gray-100 text-gray-800';
    }

    // Get status badge class
    function getStatusBadgeClass(status) {
        const classes = {
            'Active': 'bg-green-100 text-green-800',
            'Inactive': 'bg-red-100 text-red-800',
            'On Leave': 'bg-yellow-100 text-yellow-800'
        };
        return classes[status] || 'bg-gray-100 text-gray-800';
    }

    // Update table info (showing count, total count)
    function updateTableInfo() {
        showingCount.textContent = Math.min(filteredEmployees.length, rowsPerPage);
        totalCount.textContent = filteredEmployees.length;
    }

    // Sort table data
    function sortTable(column) {
        if (currentSort.column === column) {
            currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            currentSort.column = column;
            currentSort.direction = 'asc';
        }

        filteredEmployees.sort((a, b) => {
            let aVal = a[column];
            let bVal = b[column];

            // Handle numeric values
            if (column === 'id' || column === 'salary') {
                aVal = Number(aVal);
                bVal = Number(bVal);
            } else {
                aVal = String(aVal).toLowerCase();
                bVal = String(bVal).toLowerCase();
            }

            if (currentSort.direction === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

        updateSortIcons();
        renderTable();
    }

    // Update sort icons in table headers
    function updateSortIcons() {
        const headers = document.querySelectorAll('th[data-sort]');
        headers.forEach(header => {
            const icon = header.querySelector('i');
            const column = header.getAttribute('data-sort');
            
            if (column === currentSort.column) {
                icon.className = currentSort.direction === 'asc' 
                    ? 'fas fa-sort-up ml-2 text-blue-600' 
                    : 'fas fa-sort-down ml-2 text-blue-600';
            } else {
                icon.className = 'fas fa-sort ml-2 text-gray-400';
            }
        });
    }

    // Filter table data
    function filterTable() {
        const searchTerm = tableSearch.value.toLowerCase();
        const departmentFilterValue = departmentFilter.value;

        filteredEmployees = employees.filter(employee => {
            const matchesSearch = !searchTerm || 
                employee.name.toLowerCase().includes(searchTerm) ||
                employee.email.toLowerCase().includes(searchTerm) ||
                employee.department.toLowerCase().includes(searchTerm) ||
                employee.status.toLowerCase().includes(searchTerm) ||
                employee.id.toString().includes(searchTerm) ||
                employee.salary.toString().includes(searchTerm);

            const matchesDepartment = !departmentFilterValue || employee.department === departmentFilterValue;

            return matchesSearch && matchesDepartment;
        });

        currentPage = 1;
        renderTable();
    }

    // Add new row
    function addNewRow() {
        const newId = Math.max(...employees.map(emp => emp.id)) + 1;
        const newEmployee = {
            id: newId,
            name: 'New Employee',
            email: `new.employee${newId}@company.com`,
            department: 'Engineering',
            salary: 60000,
            status: 'Active'
        };

        employees.push(newEmployee);
        filterTable();
        
        // Show success message
        showNotification('New employee added successfully!', 'success');
    }

    // Edit row
    function editRow(id) {
        const employee = employees.find(emp => emp.id === id);
        if (!employee) return;

        editingRowId = id;
        
        // Populate form
        document.getElementById('edit-name').value = employee.name;
        document.getElementById('edit-email').value = employee.email;
        document.getElementById('edit-department').value = employee.department;
        document.getElementById('edit-salary').value = employee.salary;
        document.getElementById('edit-status').value = employee.status;

        // Show modal
        editModal.classList.remove('hidden');
    }

    // Save edited row
    function saveEditedRow() {
        if (editingRowId === null) return;

        const employee = employees.find(emp => emp.id === editingRowId);
        if (!employee) return;

        // Update employee data
        employee.name = document.getElementById('edit-name').value;
        employee.email = document.getElementById('edit-email').value;
        employee.department = document.getElementById('edit-department').value;
        employee.salary = parseInt(document.getElementById('edit-salary').value);
        employee.status = document.getElementById('edit-status').value;

        // Close modal
        closeEditModal();
        
        // Refresh table
        filterTable();
        
        // Show success message
        showNotification('Employee updated successfully!', 'success');
    }

    // Delete row
    function deleteRow(id) {
        if (confirm('Are you sure you want to delete this employee?')) {
            employees = employees.filter(emp => emp.id !== id);
            filterTable();
            showNotification('Employee deleted successfully!', 'success');
        }
    }

    // Close edit modal
    function closeEditModal() {
        editModal.classList.add('hidden');
        editingRowId = null;
        editForm.reset();
    }

    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Setup event listeners
    function setupEventListeners() {
        // Sort headers
        document.querySelectorAll('th[data-sort]').forEach(header => {
            header.addEventListener('click', () => {
                const column = header.getAttribute('data-sort');
                sortTable(column);
            });
        });

        // Search and filter
        tableSearch.addEventListener('input', filterTable);
        departmentFilter.addEventListener('change', filterTable);

        // Buttons
        addRowBtn.addEventListener('click', addNewRow);
        refreshTableBtn.addEventListener('click', () => {
            filterTable();
            showNotification('Table refreshed!', 'success');
        });

        // Rows per page
        rowsPerPageSelect.addEventListener('change', (e) => {
            rowsPerPage = parseInt(e.target.value);
            currentPage = 1;
            renderTable();
        });

        // Edit modal
        closeModal.addEventListener('click', closeEditModal);
        cancelEdit.addEventListener('click', closeEditModal);
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveEditedRow();
        });

        // Close modal on outside click
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) {
                closeEditModal();
            }
        });

        // Table row actions (using event delegation)
        tableBody.addEventListener('click', (e) => {
            if (e.target.closest('.edit-row-btn')) {
                const id = parseInt(e.target.closest('.edit-row-btn').getAttribute('data-id'));
                editRow(id);
            } else if (e.target.closest('.delete-row-btn')) {
                const id = parseInt(e.target.closest('.delete-row-btn').getAttribute('data-id'));
                deleteRow(id);
            }
        });
    }

    // Create quick test buttons
    function createQuickTestButtons() {
        const quickTestSort = document.getElementById('quick-test-sort');
        const quickTestSearch = document.getElementById('quick-test-search');
        const quickTestFilter = document.getElementById('quick-test-filter');
        const quickTestEdit = document.getElementById('quick-test-edit');

        quickTestSort.addEventListener('click', () => {
            // Test sorting by name
            sortTable('name');
            showNotification('Testing sort functionality - sorted by name', 'success');
        });

        quickTestSearch.addEventListener('click', () => {
            // Test search functionality
            tableSearch.value = 'john';
            filterTable();
            showNotification('Testing search functionality - searching for "john"', 'success');
        });

        quickTestFilter.addEventListener('click', () => {
            // Test department filter
            departmentFilter.value = 'Engineering';
            filterTable();
            showNotification('Testing filter functionality - filtered by Engineering', 'success');
        });

        quickTestEdit.addEventListener('click', () => {
            // Test edit functionality
            if (employees.length > 0) {
                editRow(employees[0].id);
                showNotification('Testing edit functionality - opened edit modal', 'success');
            }
        });
    }

    // Setup keyboard shortcuts
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        document.getElementById('quick-test-sort').click();
                        break;
                    case '2':
                        e.preventDefault();
                        document.getElementById('quick-test-search').click();
                        break;
                    case '3':
                        e.preventDefault();
                        document.getElementById('quick-test-filter').click();
                        break;
                    case '4':
                        e.preventDefault();
                        document.getElementById('quick-test-edit').click();
                        break;
                }
            }
        });
    }

    // Initialize the table
    initializeTable();
}); 
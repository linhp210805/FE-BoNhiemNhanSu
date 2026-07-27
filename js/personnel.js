/* ============================================================
   Personnel Record Management Module
   UDN Appointment Lifecycle Management System
   ============================================================ */

function renderPersonnel(container) {

    // ── Mock Data ──────────────────────────────────────────────
    const personnel = [
        {
            id: 'UD-2018-001',
            name: 'Prof. Dr. Nguyen Van An',
            initials: 'NA',
            department: 'Faculty of Information Technology',
            position: 'Dean',
            status: 'Active',
            lastUpdated: '2026-05-28',
            email: 'nvan@udn.vn',
            phone: '+84 236 3822 041',
            joinDate: '2018-03-15',
            dob: '1975-08-12',
            gender: 'Male',
            nationality: 'Vietnamese',
            degree: 'Doctor of Philosophy',
            specialization: 'Artificial Intelligence & Machine Learning'
        },
        {
            id: 'UD-2019-042',
            name: 'Dr. Le Thi Bich Ngoc',
            initials: 'LN',
            department: 'Faculty of Economics',
            position: 'Vice Dean',
            status: 'Active',
            lastUpdated: '2026-05-26',
            email: 'ltbngoc@udn.vn',
            phone: '+84 236 3827 112',
            joinDate: '2019-08-20',
            dob: '1980-03-25',
            gender: 'Female',
            nationality: 'Vietnamese',
            degree: 'Doctor of Philosophy',
            specialization: 'Development Economics'
        },
        {
            id: 'UD-2017-103',
            name: 'Dr. Tran Quoc Hung',
            initials: 'TH',
            department: 'Faculty of Engineering',
            position: 'Department Head',
            status: 'Active',
            lastUpdated: '2026-05-25',
            email: 'tqhung@udn.vn',
            phone: '+84 236 3841 205',
            joinDate: '2017-01-10',
            dob: '1978-11-03',
            gender: 'Male',
            nationality: 'Vietnamese',
            degree: 'Doctor of Philosophy',
            specialization: 'Civil Engineering & Structural Analysis'
        },
        {
            id: 'UD-2016-078',
            name: 'Assoc. Prof. Pham Thi Mai',
            initials: 'PM',
            department: 'Faculty of Education',
            position: 'Professor',
            status: 'Active',
            lastUpdated: '2026-05-22',
            email: 'ptmai@udn.vn',
            phone: '+84 236 3856 390',
            joinDate: '2016-09-01',
            dob: '1972-06-18',
            gender: 'Female',
            nationality: 'Vietnamese',
            degree: 'Associate Professor',
            specialization: 'Educational Psychology'
        },
        {
            id: 'UD-2020-156',
            name: 'Dr. Vo Minh Tuan',
            initials: 'VT',
            department: 'Faculty of Law',
            position: 'Lecturer',
            status: 'On Leave',
            lastUpdated: '2026-05-20',
            email: 'vmtuan@udn.vn',
            phone: '+84 236 3890 455',
            joinDate: '2020-02-15',
            dob: '1985-01-30',
            gender: 'Male',
            nationality: 'Vietnamese',
            degree: 'Doctor of Philosophy',
            specialization: 'International Commercial Law'
        },
        {
            id: 'UD-2018-089',
            name: 'Dr. Hoang Thi Lan',
            initials: 'HL',
            department: 'Faculty of Medicine',
            position: 'Researcher',
            status: 'Active',
            lastUpdated: '2026-05-18',
            email: 'htlan@udn.vn',
            phone: '+84 236 3874 622',
            joinDate: '2018-07-01',
            dob: '1983-09-14',
            gender: 'Female',
            nationality: 'Vietnamese',
            degree: 'Doctor of Philosophy',
            specialization: 'Biomedical Research & Pharmacology'
        },
        {
            id: 'UD-2019-201',
            name: 'Dr. Dang Van Khoa',
            initials: 'DK',
            department: 'Faculty of Science',
            position: 'Lab Director',
            status: 'Active',
            lastUpdated: '2026-05-15',
            email: 'dvkhoa@udn.vn',
            phone: '+84 236 3833 718',
            joinDate: '2019-04-10',
            dob: '1981-12-07',
            gender: 'Male',
            nationality: 'Vietnamese',
            degree: 'Doctor of Philosophy',
            specialization: 'Physical Chemistry & Materials Science'
        },
        {
            id: 'UD-2021-045',
            name: 'MSc. Bui Thi Huong',
            initials: 'BH',
            department: 'Administrative Office',
            position: 'HR Specialist',
            status: 'Active',
            lastUpdated: '2026-05-30',
            email: 'bthuong@udn.vn',
            phone: '+84 236 3820 900',
            joinDate: '2021-06-01',
            dob: '1990-04-22',
            gender: 'Female',
            nationality: 'Vietnamese',
            degree: 'Master of Science',
            specialization: 'Human Resource Management'
        }
    ];

    // ── Lucide SVG Icons ───────────────────────────────────────
    const icons = {
        users: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        userCheck: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>',
        briefcase: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
        clock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
        plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
        download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
        eye: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',
        edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>',
        x: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
        mail: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
        phone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
        calendar: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
        chevronLeft: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
        chevronRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
        building: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
        idCard: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 10h2"/><path d="M16 14h2"/><path d="M6.17 15a3 3 0 0 1 5.66 0"/><circle cx="9" cy="11" r="2"/><rect x="2" y="5" width="20" height="14" rx="2"/></svg>'
    };

    function statusBadge(status) {
        return App.renderStatusBadge(status, status);
    }

    // ── Format Date Helper ─────────────────────────────────────
    function fmtDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    // ── Build Table Rows ───────────────────────────────────────
    function buildRows() {
        return personnel.map((p, idx) => `
            <tr>
                <td>
                    <div class="person-cell">
                        <div class="avatar" style="background: ${getAvatarColor(p.name)}">${p.initials}</div>
                        <div>
                            <div class="person-name">${p.name}</div>
                            <div class="person-title">${p.position}</div>
                        </div>
                    </div>
                </td>
                <td><span style="font-family: monospace; font-size: var(--font-size-xs); color: var(--text-secondary);">${p.id}</span></td>
                <td>${p.department}</td>
                <td>${p.position}</td>
                <td>${statusBadge(p.status)}</td>
                <td style="color: var(--text-secondary); font-size: var(--font-size-xs);">${fmtDate(p.lastUpdated)}</td>
                <td>
                    <div style="display: flex; gap: var(--space-2);">
                        <button class="btn btn-ghost btn-sm btn-view-personnel" data-index="${idx}" title="View Details">
                            ${icons.eye} View
                        </button>
                        <button class="btn btn-ghost btn-sm" title="Edit">
                            ${icons.edit} Edit
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // ── Main HTML ──────────────────────────────────────────────
    container.innerHTML = `
        <div class="main-content">

            <!-- Breadcrumb -->
            <nav class="breadcrumb">
                <a href="#dashboard">Dashboard</a>
                <span class="separator">/</span>
                <span class="current">Personnel Records</span>
            </nav>

            <!-- Page Header -->
            <div class="page-header">
                <div class="page-header-left">
                    <h1>Personnel Records</h1>
                    <p>Manage centralized electronic personnel dossiers</p>
                </div>
                <div class="page-header-actions">
                    <button class="btn btn-secondary">
                        ${icons.download}
                        Export
                    </button>
                    <button class="btn btn-primary">
                        ${icons.plus}
                        Add Personnel
                    </button>
                </div>
            </div>

            <!-- Stats Row -->
            <div class="stats-grid">
                <div class="stat-card primary">
                    <div class="stat-icon primary">${icons.users}</div>
                    <div class="stat-content">
                        <div class="stat-label">Total Personnel</div>
                        <div class="stat-value">486</div>
                        <div class="stat-change up">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                            +12 this quarter
                        </div>
                    </div>
                </div>
                <div class="stat-card success">
                    <div class="stat-icon success">${icons.userCheck}</div>
                    <div class="stat-content">
                        <div class="stat-label">Active Faculty</div>
                        <div class="stat-value">312</div>
                        <div class="stat-change up">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                            +5 this month
                        </div>
                    </div>
                </div>
                <div class="stat-card info">
                    <div class="stat-icon info">${icons.briefcase}</div>
                    <div class="stat-content">
                        <div class="stat-label">Administrative Staff</div>
                        <div class="stat-value">127</div>
                        <div class="stat-change up">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                            +3 this month
                        </div>
                    </div>
                </div>
                <div class="stat-card warning">
                    <div class="stat-icon warning">${icons.clock}</div>
                    <div class="stat-content">
                        <div class="stat-label">Pending Updates</div>
                        <div class="stat-value">23</div>
                        <div class="stat-change down">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                            -8 from last week
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabs -->
            <div class="tabs" id="personnel-tabs">
                <button class="tab-btn active" data-tab="all">
                    All Personnel <span class="tab-count">486</span>
                </button>
                <button class="tab-btn" data-tab="faculty">
                    Faculty <span class="tab-count">312</span>
                </button>
                <button class="tab-btn" data-tab="staff">
                    Staff <span class="tab-count">127</span>
                </button>
                <button class="tab-btn" data-tab="recent">
                    Recently Updated <span class="tab-count">45</span>
                </button>
            </div>

            <!-- Personnel Table -->
            <div class="table-container">
                <!-- Table Toolbar -->
                <div class="table-toolbar">
                    <div class="table-filters">
                        <div class="table-search">
                            ${icons.search}
                            <input type="text" placeholder="Search personnel..." id="personnel-search" />
                        </div>
                        <select class="filter-select" id="filter-department">
                            <option value="">All Departments</option>
                            <option value="Faculty of Information Technology">Information Technology</option>
                            <option value="Faculty of Economics">Economics</option>
                            <option value="Faculty of Engineering">Engineering</option>
                            <option value="Faculty of Education">Education</option>
                            <option value="Faculty of Law">Law</option>
                            <option value="Faculty of Medicine">Medicine</option>
                            <option value="Faculty of Science">Science</option>
                            <option value="Administrative Office">Administrative Office</option>
                        </select>
                        <select class="filter-select" id="filter-position">
                            <option value="">All Positions</option>
                            <option value="Dean">Dean</option>
                            <option value="Vice Dean">Vice Dean</option>
                            <option value="Department Head">Department Head</option>
                            <option value="Professor">Professor</option>
                            <option value="Lecturer">Lecturer</option>
                            <option value="Researcher">Researcher</option>
                            <option value="Lab Director">Lab Director</option>
                            <option value="HR Specialist">HR Specialist</option>
                        </select>
                        <select class="filter-select" id="filter-status">
                            <option value="">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="On Leave">On Leave</option>
                            <option value="Retired">Retired</option>
                        </select>
                    </div>
                </div>

                <!-- Data Table -->
                <table class="data-table" id="personnel-table">
                    <thead>
                        <tr>
                            <th style="min-width: 240px;">Name</th>
                            <th>Employee ID</th>
                            <th>Department</th>
                            <th>Position</th>
                            <th>Status</th>
                            <th>Last Updated</th>
                            <th style="min-width: 140px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${buildRows()}
                    </tbody>
                </table>

                <!-- Pagination -->
                <div class="table-pagination">
                    <div class="pagination-info">
                        Showing <strong>1-8</strong> of <strong>486</strong> personnel
                    </div>
                    <div class="pagination-buttons">
                        <button class="pagination-btn" title="Previous page">${icons.chevronLeft}</button>
                        <button class="pagination-btn active">1</button>
                        <button class="pagination-btn">2</button>
                        <button class="pagination-btn">3</button>
                        <span style="padding: 0 4px; color: var(--text-tertiary); font-size: var(--font-size-sm);">...</span>
                        <button class="pagination-btn">61</button>
                        <button class="pagination-btn" title="Next page">${icons.chevronRight}</button>
                    </div>
                </div>
            </div>

            <!-- Personnel Detail Modal -->
            <div class="modal-overlay" id="personnel-modal">
                <div class="modal" style="max-width: 800px; max-height: 90vh;">
                    <div class="modal-header">
                        <h3 class="modal-title">Personnel Detail</h3>
                        <button class="modal-close" id="modal-close-btn">${icons.x}</button>
                    </div>
                    <div class="modal-body" style="padding: 0; overflow-y: auto;">
                        <div id="modal-content-area"></div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="modal-cancel-btn">Close</button>
                        <button class="btn btn-primary">
                            ${icons.edit} Edit Record
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // ── Bind Tab Switching ─────────────────────────────────────
    const tabContainer = container.querySelector('#personnel-tabs');
    tabContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;
        tabContainer.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
    });

    // ── Bind Modal Open (View Buttons) ─────────────────────────
    function openModal(index) {
        const p = personnel[index];
        const contentArea = container.querySelector('#modal-content-area');

        contentArea.innerHTML = `
            <!-- Profile Header -->
            <div class="profile-header">
                <div class="profile-avatar">${p.initials}</div>
                <div class="profile-info">
                    <div class="profile-name">${p.name}</div>
                    <div class="profile-position">${p.position} — ${p.department}</div>
                    <div class="profile-meta">
                        <div class="profile-meta-item">
                            ${icons.mail}
                            <span>${p.email}</span>
                        </div>
                        <div class="profile-meta-item">
                            ${icons.phone}
                            <span>${p.phone}</span>
                        </div>
                        <div class="profile-meta-item">
                            ${icons.calendar}
                            <span>Joined ${fmtDate(p.joinDate)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Detail Tabs -->
            <div style="padding: 0 var(--space-6);">
                <div class="tabs" id="modal-detail-tabs" style="margin-bottom: 0;">
                    <button class="tab-btn active" data-detail-tab="profile">Profile</button>
                    <button class="tab-btn" data-detail-tab="degrees">Degrees</button>
                    <button class="tab-btn" data-detail-tab="certificates">Certificates</button>
                    <button class="tab-btn" data-detail-tab="documents">Documents</button>
                    <button class="tab-btn" data-detail-tab="history">History</button>
                </div>
            </div>

            <!-- Tab Content -->
            <div style="padding: var(--space-6);" id="modal-tab-content">
                <!-- Profile Tab (default) -->
                <div class="grid-2" style="gap: var(--space-5);">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input class="form-input" value="${p.name}" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Employee ID</label>
                        <input class="form-input" value="${p.id}" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Date of Birth</label>
                        <input class="form-input" value="${fmtDate(p.dob)}" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Gender</label>
                        <input class="form-input" value="${p.gender}" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Nationality</label>
                        <input class="form-input" value="${p.nationality}" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Status</label>
                        <div style="padding-top: var(--space-2);">${statusBadge(p.status)}</div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Highest Degree</label>
                        <input class="form-input" value="${p.degree}" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Specialization</label>
                        <input class="form-input" value="${p.specialization}" readonly />
                    </div>
                    <div class="form-group" style="grid-column: 1 / -1;">
                        <label class="form-label">Department</label>
                        <input class="form-input" value="${p.department}" readonly />
                    </div>
                </div>
            </div>
        `;

        // Bind detail tabs within modal
        const detailTabContainer = contentArea.querySelector('#modal-detail-tabs');
        const tabContent = contentArea.querySelector('#modal-tab-content');

        detailTabContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.tab-btn');
            if (!btn) return;
            detailTabContainer.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const tab = btn.dataset.detailTab;

            if (tab === 'profile') {
                tabContent.innerHTML = `
                    <div class="grid-2" style="gap: var(--space-5);">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input class="form-input" value="${p.name}" readonly />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Employee ID</label>
                            <input class="form-input" value="${p.id}" readonly />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Date of Birth</label>
                            <input class="form-input" value="${fmtDate(p.dob)}" readonly />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Gender</label>
                            <input class="form-input" value="${p.gender}" readonly />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Nationality</label>
                            <input class="form-input" value="${p.nationality}" readonly />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Status</label>
                            <div style="padding-top: var(--space-2);">${statusBadge(p.status)}</div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Highest Degree</label>
                            <input class="form-input" value="${p.degree}" readonly />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Specialization</label>
                            <input class="form-input" value="${p.specialization}" readonly />
                        </div>
                        <div class="form-group" style="grid-column: 1 / -1;">
                            <label class="form-label">Department</label>
                            <input class="form-input" value="${p.department}" readonly />
                        </div>
                    </div>
                `;
            } else if (tab === 'degrees') {
                tabContent.innerHTML = `
                    <div class="card" style="margin-bottom: var(--space-4);">
                        <div class="card-body" style="padding: var(--space-4) var(--space-5);">
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <div>
                                    <div style="font-weight: 600; color: var(--text-primary); font-size: var(--font-size-sm);">${p.degree}</div>
                                    <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 2px;">${p.specialization}</div>
                                    <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: 2px;">University of Da Nang • ${parseInt(p.joinDate) - 5}</div>
                                </div>
                                <span class="badge badge-success"><span class="badge-dot"></span>Verified</span>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body" style="padding: var(--space-4) var(--space-5);">
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <div>
                                    <div style="font-weight: 600; color: var(--text-primary); font-size: var(--font-size-sm);">Master of Science</div>
                                    <div style="font-size: var(--font-size-xs); color: var(--text-secondary); margin-top: 2px;">${p.specialization}</div>
                                    <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: 2px;">Hanoi University of Science and Technology • ${parseInt(p.joinDate) - 10}</div>
                                </div>
                                <span class="badge badge-success"><span class="badge-dot"></span>Verified</span>
                            </div>
                        </div>
                    </div>
                `;
            } else if (tab === 'certificates') {
                tabContent.innerHTML = `
                    <div class="card" style="margin-bottom: var(--space-4);">
                        <div class="card-body" style="padding: var(--space-4) var(--space-5);">
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <div>
                                    <div style="font-weight: 600; color: var(--text-primary); font-size: var(--font-size-sm);">Certificate of Advanced Political Theory</div>
                                    <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: 2px;">Ho Chi Minh National Academy of Politics • 2022</div>
                                </div>
                                <span class="badge badge-success"><span class="badge-dot"></span>Valid</span>
                            </div>
                        </div>
                    </div>
                    <div class="card" style="margin-bottom: var(--space-4);">
                        <div class="card-body" style="padding: var(--space-4) var(--space-5);">
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <div>
                                    <div style="font-weight: 600; color: var(--text-primary); font-size: var(--font-size-sm);">State Management Certificate</div>
                                    <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: 2px;">National Academy of Public Administration • 2021</div>
                                </div>
                                <span class="badge badge-success"><span class="badge-dot"></span>Valid</span>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body" style="padding: var(--space-4) var(--space-5);">
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <div>
                                    <div style="font-weight: 600; color: var(--text-primary); font-size: var(--font-size-sm);">IELTS Academic — Band 7.0</div>
                                    <div style="font-size: var(--font-size-xs); color: var(--text-tertiary); margin-top: 2px;">British Council • 2023</div>
                                </div>
                                <span class="badge badge-info"><span class="badge-dot"></span>Expires 2025</span>
                            </div>
                        </div>
                    </div>
                `;
            } else if (tab === 'documents') {
                tabContent.innerHTML = `
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Document</th>
                                <th>Type</th>
                                <th>Uploaded</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-weight: 600;">CV_${p.initials}_2026.pdf</td>
                                <td><span class="badge badge-primary">CV</span></td>
                                <td style="font-size: var(--font-size-xs); color: var(--text-secondary);">May 15, 2026</td>
                                <td><span class="badge badge-success">Current</span></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600;">PhD_Diploma_${p.initials}.pdf</td>
                                <td><span class="badge badge-info">Diploma</span></td>
                                <td style="font-size: var(--font-size-xs); color: var(--text-secondary);">Jan 10, 2020</td>
                                <td><span class="badge badge-success">Verified</span></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600;">Contract_${p.id}.pdf</td>
                                <td><span class="badge badge-warning">Contract</span></td>
                                <td style="font-size: var(--font-size-xs); color: var(--text-secondary);">${fmtDate(p.joinDate)}</td>
                                <td><span class="badge badge-success">Active</span></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600;">ID_Card_Scan.pdf</td>
                                <td><span class="badge badge-neutral">Identity</span></td>
                                <td style="font-size: var(--font-size-xs); color: var(--text-secondary);">Mar 8, 2019</td>
                                <td><span class="badge badge-success">Valid</span></td>
                            </tr>
                        </tbody>
                    </table>
                `;
            } else if (tab === 'history') {
                tabContent.innerHTML = `
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-dot completed"></div>
                            <div class="timeline-content">
                                <div class="timeline-title">Profile Updated</div>
                                <div class="timeline-desc">Contact information and specialization fields were updated by HR Admin.</div>
                                <div class="timeline-time">${fmtDate(p.lastUpdated)}</div>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-dot completed"></div>
                            <div class="timeline-content">
                                <div class="timeline-title">New Certificate Added</div>
                                <div class="timeline-desc">Certificate of Advanced Political Theory uploaded and verified.</div>
                                <div class="timeline-time">Apr 12, 2026</div>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-dot completed"></div>
                            <div class="timeline-content">
                                <div class="timeline-title">Annual Review Completed</div>
                                <div class="timeline-desc">Annual performance review completed with rating: Excellent.</div>
                                <div class="timeline-time">Jan 15, 2026</div>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-content">
                                <div class="timeline-title">Position Appointment</div>
                                <div class="timeline-desc">Appointed as ${p.position} of ${p.department}.</div>
                                <div class="timeline-time">${fmtDate(p.joinDate)}</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        // Show modal
        const modal = container.querySelector('#personnel-modal');
        modal.classList.add('active');
    }

    function closeModal() {
        const modal = container.querySelector('#personnel-modal');
        modal.classList.remove('active');
    }

    // Bind view buttons
    container.querySelectorAll('.btn-view-personnel').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            openModal(index);
        });
    });

    // Bind modal close
    container.querySelector('#modal-close-btn')?.addEventListener('click', closeModal);
    container.querySelector('#modal-cancel-btn')?.addEventListener('click', closeModal);
    container.querySelector('#personnel-modal')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    // ── Bind Search / Filter (visual only) ─────────────────────
    const searchInput = container.querySelector('#personnel-search');
    const tableBody = container.querySelector('#personnel-table tbody');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach((row, idx) => {
            const p = personnel[idx];
            const match = p.name.toLowerCase().includes(query)
                || p.id.toLowerCase().includes(query)
                || p.department.toLowerCase().includes(query)
                || p.position.toLowerCase().includes(query);
            row.style.display = match ? '' : 'none';
        });
    });

    // Pagination buttons visual click
    container.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.textContent.trim() && !btn.querySelector('svg')) {
                container.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    });
}

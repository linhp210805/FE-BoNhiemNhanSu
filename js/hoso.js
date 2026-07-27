/* ============================================================
   Module 1: Quản lý hồ sơ nhân sự phục vụ bổ nhiệm (MD01)
   ============================================================ */

function renderHoSo(container) {
    if (App && App.clearFullPage) App.clearFullPage();
    const personnel = PersonnelController.getList();
    
    const html = `
        <div class="page-header">
            <div class="page-header-left">
                <h1>Quản lý hồ sơ nhân sự</h1>
                <p>Dữ liệu nền của nhân sự phục vụ công tác bổ nhiệm/bổ nhiệm lại</p>
            </div>
            <div class="page-header-actions">
                <button class="btn btn-secondary" id="btn-track-docs" title="Theo dõi hiệu lực tài liệu">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    Theo dõi tài liệu
                </button>
                <button class="btn btn-secondary" id="btn-import-personnel">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    Import danh sách
                </button>
                <button class="btn btn-primary" id="btn-add-personnel">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Thêm mới hồ sơ
                </button>
            </div>
        </div>

        <!-- Standalone Search & Filter Card -->
        <div class="module-filter-card">
            <div class="module-filter-header">
                <div class="module-filter-title">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    BỘ LỌC & TRA CỨU HỒ SƠ NHÂN SỰ
                </div>
            </div>

            <!-- Search Input Bar -->
            <div class="filter-search-bar">
                <div class="filter-search-wrapper">
                    <svg class="search-icon-inside" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" class="form-input" id="person-search" placeholder="Nhập từ khóa tìm kiếm (Tên cán bộ, Mã NS [NS-xxxx], Email...)">
                </div>
                <button type="button" class="btn btn-secondary" id="btn-reset-ho-so-filters" style="display: flex; align-items: center; gap: 6px; height: 42px; padding: 0 18px; font-weight: 600; border-radius: 8px; font-size: 13.5px; white-space: nowrap;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                    Đặt lại
                </button>
                <button type="button" class="btn btn-primary" id="btn-exec-ho-so-search" style="display: flex; align-items: center; gap: 8px; height: 42px; padding: 0 22px; font-weight: 700; border-radius: 8px; font-size: 13.5px; white-space: nowrap;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    Tra cứu
                </button>
            </div>

            <!-- Filter Selects Grid -->
            <div class="filter-grid-4">
                <div>
                    <label class="form-label">Đơn vị công tác</label>
                    <select class="form-input" id="filter-unit">
                        <option value="">Tất cả Đơn vị</option>
                        <option value="Ban Đào tạo">Ban Đào tạo</option>
                        <option value="Ban Tổ chức Cán bộ">Ban Tổ chức Cán bộ</option>
                        <option value="Khoa Công nghệ Thông tin">Khoa Công nghệ Thông tin</option>
                    </select>
                </div>
                <div>
                    <label class="form-label">Phòng ban, bộ môn</label>
                    <select class="form-input" id="filter-department">
                        <option value="">Tất cả Phòng ban</option>
                    </select>
                </div>
                <div>
                    <label class="form-label">Chức vụ hiện tại</label>
                    <select class="form-input" id="filter-position">
                        <option value="">Tất cả Chức vụ</option>
                        <option value="Trưởng ban">Trưởng ban</option>
                        <option value="Phó Trưởng ban">Phó Trưởng ban</option>
                        <option value="Trưởng khoa">Trưởng khoa</option>
                        <option value="Giảng viên">Giảng viên</option>
                        <option value="Chuyên viên">Chuyên viên</option>
                    </select>
                </div>
                <div>
                    <label class="form-label">Trạng thái công tác</label>
                    <select class="form-input" id="filter-status">
                        <option value="">Tất cả Trạng thái</option>
                        <option value="active">Đang hoạt động</option>
                        <option value="locked">Đã khóa</option>
                    </select>
                </div>
            </div>

            <!-- Active Filter Pills Container -->
            <div id="hoso-active-pills" class="active-filter-pills" style="display: none;">
                <span class="active-filter-title">Đang lọc theo:</span>
                <div id="hoso-pills-list" style="display: flex; flex-wrap: wrap; gap: 6px;"></div>
            </div>
        </div>

        <!-- Standalone Table Card -->
        <div class="card" style="border: 1px solid var(--border); border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04); background: #ffffff;">
            <div class="table-container" style="border: none;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 10%;">Mã NS</th>
                            <th style="width: 22%;">Họ và Tên</th>
                            <th style="width: 18%;">Đơn vị công tác</th>
                            <th style="width: 16%;">Phòng ban</th>
                            <th style="width: 14%;">Chức vụ</th>
                            <th style="width: 10%; text-align: center; white-space: nowrap;">Trạng thái</th>
                            <th style="width: 10%; text-align: center; white-space: nowrap;">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody id="personnel-table-body">
                        ${personnel.map(person => `
                            <tr data-unit="${person.unit}" data-department="${person.department || ''}" data-position="${person.position}" data-status="${person.status}" data-name="${(person.name || '').toLowerCase()}" data-id="${(person.id || '').toLowerCase()}" data-email="${(person.email || '').toLowerCase()}">
                                <td style="font-weight: 600">${person.id}</td>
                                <td>
                                    <div class="person-cell">
                                        <div class="avatar" style="background: ${person.accent || 'var(--primary)'}">${person.initials || 'NS'}</div>
                                        <div>
                                            <div class="person-name">${person.name}</div>
                                            <div class="person-title">${person.email || ''}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${person.unit}</td>
                                <td>${person.department || '-'}</td>
                                <td>${person.position}</td>
                                <td style="text-align: center; white-space: nowrap;"><span class="badge ${person.status === 'active' ? 'badge-success' : 'badge-danger'}">${person.status === 'active' ? 'Đang hoạt động' : 'Đã khóa'}</span></td>
                                <td style="text-align: center;">
                                    <div class="table-actions">
                                        <button class="btn-icon btn-icon-primary btn-view-profile" data-id="${person.id}" title="Xem chi tiết hồ sơ">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                        ${personnel.length === 0 ? '<tr id="no-personnel-row"><td colspan="7" style="text-align: center; padding: 32px; color: var(--text-tertiary);">Không tìm thấy hồ sơ nhân sự nào phù hợp</td></tr>' : '<tr id="no-personnel-row" style="display: none;"><td colspan="7" style="text-align: center; padding: 32px; color: var(--text-tertiary);">Không tìm thấy hồ sơ nhân sự nào phù hợp</td></tr>'}
                    </tbody>
                </table>
            </div>
            
            <div class="table-pagination">
                <div class="pagination-info">Hiển thị ${personnel.length} hồ sơ nhân sự</div>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Danh mục phòng ban mô phỏng
    const DEPARTMENTS = {
        'Ban Đào tạo': ['Phòng Hành chính - Tổng hợp', 'Phòng Quản lý Đào tạo', 'Phòng Khảo thí'],
        'Ban Tổ chức Cán bộ': ['Phòng Tổ chức - Cán bộ', 'Phòng Bảo vệ Chính trị Nội bộ'],
        'Khoa Công nghệ Thông tin': ['Bộ môn Hệ thống thông tin', 'Bộ môn Khoa học máy tính']
    };

    const filterUnit = container.querySelector('#filter-unit');
    const filterDept = container.querySelector('#filter-department');

    // Cập nhật filter department khi chọn unit
    filterUnit?.addEventListener('change', () => {
        const unit = filterUnit.value;
        filterDept.innerHTML = '<option value="">Tất cả Phòng ban</option>';
        if (unit && DEPARTMENTS[unit]) {
            DEPARTMENTS[unit].forEach(dept => {
                filterDept.innerHTML += `<option value="${dept}">${dept}</option>`;
            });
        }
        applyFilters();
    });

    // Lọc / Xem danh sách
    const applyFilters = () => {
        const unit = filterUnit ? filterUnit.value : '';
        const dept = filterDept ? filterDept.value : '';
        const position = container.querySelector('#filter-position')?.value || '';
        const status = container.querySelector('#filter-status')?.value || '';
        const search = container.querySelector('#person-search')?.value.toLowerCase().trim() || '';
        const rows = container.querySelectorAll('#personnel-table-body tr');
        let visibleCount = 0;
        rows.forEach(row => {
            if (row.id === 'no-personnel-row') return;
            const rowName = row.dataset.name || '';
            const rowId = row.dataset.id || '';
            const rowEmail = row.dataset.email || '';
            const matchUnit = !unit || row.dataset.unit === unit;
            const matchDept = !dept || row.dataset.department === dept;
            const matchPosition = !position || row.dataset.position === position;
            const matchStatus = !status || row.dataset.status === status;
            const matchSearch = !search || rowName.includes(search) || rowId.includes(search) || rowEmail.includes(search);
            
            if (matchUnit && matchDept && matchPosition && matchStatus && matchSearch) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        const noRow = container.querySelector('#no-personnel-row');
        if (noRow) {
            noRow.style.display = visibleCount === 0 ? '' : 'none';
        }

        const pagInfo = container.querySelector('.pagination-info');
        if (pagInfo) pagInfo.textContent = `Hiển thị ${visibleCount} hồ sơ nhân sự`;

        // Render active filter pills
        updateActivePills(unit, dept, position, status, search);
    };

    const updateActivePills = (unit, dept, position, status, search) => {
        const pillsBox = container.querySelector('#hoso-active-pills');
        const pillsList = container.querySelector('#hoso-pills-list');
        if (!pillsBox || !pillsList) return;

        let pillsHtml = '';
        if (search) {
            pillsHtml += `<span class="filter-tag-pill">Từ khóa: "${search}" <span class="remove-pill" data-clear="search">×</span></span>`;
        }
        if (unit) {
            pillsHtml += `<span class="filter-tag-pill">Đơn vị: ${unit} <span class="remove-pill" data-clear="unit">×</span></span>`;
        }
        if (dept) {
            pillsHtml += `<span class="filter-tag-pill">Phòng ban: ${dept} <span class="remove-pill" data-clear="dept">×</span></span>`;
        }
        if (position) {
            pillsHtml += `<span class="filter-tag-pill">Chức vụ: ${position} <span class="remove-pill" data-clear="position">×</span></span>`;
        }
        if (status) {
            pillsHtml += `<span class="filter-tag-pill">Trạng thái: ${status === 'active' ? 'Đang hoạt động' : 'Đã khóa'} <span class="remove-pill" data-clear="status">×</span></span>`;
        }

        if (pillsHtml) {
            pillsList.innerHTML = pillsHtml;
            pillsBox.style.display = 'flex';

            pillsList.querySelectorAll('.remove-pill').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const field = e.target.dataset.clear;
                    if (field === 'search') container.querySelector('#person-search').value = '';
                    if (field === 'unit') {
                        container.querySelector('#filter-unit').value = '';
                        container.querySelector('#filter-department').innerHTML = '<option value="">Tất cả Phòng ban</option>';
                    }
                    if (field === 'dept') container.querySelector('#filter-department').value = '';
                    if (field === 'position') container.querySelector('#filter-position').value = '';
                    if (field === 'status') container.querySelector('#filter-status').value = '';
                    applyFilters();
                });
            });
        } else {
            pillsBox.style.display = 'none';
        }
    };
    ['#filter-department', '#filter-position', '#filter-status', '#person-search'].forEach(selector => {
        container.querySelector(selector)?.addEventListener('input', applyFilters);
        container.querySelector(selector)?.addEventListener('change', applyFilters);
    });

    container.querySelector('#btn-exec-ho-so-search')?.addEventListener('click', applyFilters);
    container.querySelector('#btn-reset-ho-so-filters')?.addEventListener('click', () => {
        container.querySelector('#filter-unit').value = '';
        container.querySelector('#filter-department').value = '';
        container.querySelector('#filter-department').innerHTML = '<option value="">Tất cả Phòng ban</option>';
        container.querySelector('#filter-position').value = '';
        container.querySelector('#filter-status').value = '';
        container.querySelector('#person-search').value = '';
        applyFilters();
    });

    // Thêm mới hồ sơ
    container.querySelector('#btn-add-personnel')?.addEventListener('click', () => {
        renderAddPersonnel(container);
    });

    // Import danh sách nhân sự
    container.querySelector('#btn-import-personnel')?.addEventListener('click', () => {
        renderImportPersonnel(container);
    });

    // Màn hình theo dõi hiệu lực tài liệu
    container.querySelector('#btn-track-docs')?.addEventListener('click', () => {
        renderTrackDocs(container);
    });

    // UC01.04, UC01.05, Xem chi tiết, cập nhật, tài liệu
    container.querySelectorAll('.btn-view-profile').forEach(btn => {
        btn.addEventListener('click', () => {
            renderViewPersonnel(container, btn.dataset.id);
        });
    });
}

// Thêm mới hồ sơ (Full Screen)
function renderAddPersonnel(container) {
    const html = `
        <div class="full-page-container" style="background: var(--bg-app); min-height: 100vh; padding-bottom: 40px;">
            <!-- Full Page Header Bar -->
            <div class="page-header-alt" style="padding: 20px 32px; background: #ffffff; border-bottom: 1px solid var(--border); width: 100%;">
                <div style="width: 100%;">
                    <div class="breadcrumb-bar" style="margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
                        <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                            <span class="bc-back-btn" id="bc-back-list" style="cursor: pointer; font-weight: 700; color: var(--primary); display: flex; align-items: center; gap: 4px;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                                QUẢN LÝ HỒ SƠ NHÂN SỰ
                            </span>
                            <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                            <span class="bc-current" style="font-weight: 700; color: var(--text-secondary);">THÊM MỚI HỒ SƠ</span>
                        </div>
                    </div>
                    <h2 style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin: 0;">Thêm mới hồ sơ nhân sự</h2>
                    <p style="color: var(--text-secondary); margin-top: 4px; font-size: 13px;">Khởi tạo hồ sơ nhân sự mới kèm theo các tài liệu minh chứng liên quan trên hệ thống</p>
                </div>
            </div>

            <!-- Main Content Container -->
            <div style="padding: 24px 32px 0; width: 100%; max-width: 1400px; margin: 0 auto;">
                <form id="add-personnel-form">
                    <!-- Khối 1: Thông tin cơ bản cán bộ -->
                    <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                        <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            1. Thông tin cơ bản cán bộ
                        </h3>
                        <div class="grid-2" style="gap: 16px;">
                            <div class="form-group" style="margin: 0;">
                                <label class="form-label" style="font-weight: 600; color: #334155; margin-bottom: 8px;">Mã cán bộ</label>
                                <input type="text" class="form-input" id="add-id" placeholder="Hệ thống tự sinh nếu để trống" style="height: 40px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 12px;">
                            </div>
                            <div class="form-group" style="margin: 0;">
                                <label class="form-label" style="font-weight: 600; color: #334155; margin-bottom: 8px;">Họ tên cán bộ <span class="text-danger">*</span></label>
                                <input type="text" class="form-input" id="add-name" placeholder="Nhập đầy đủ họ và tên" required style="height: 40px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 12px;">
                            </div>
                            <div class="form-group" style="margin: 0;">
                                <label class="form-label" style="font-weight: 600; color: #334155; margin-bottom: 8px;">Giới tính <span class="text-danger">*</span></label>
                                <select class="form-input" id="add-gender" required style="height: 40px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 12px;">
                                    <option value="">Chọn giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin: 0;">
                                <label class="form-label" style="font-weight: 600; color: #334155; margin-bottom: 8px;">Email <span class="text-danger">*</span></label>
                                <input type="email" class="form-input" id="add-email" placeholder="example@udn.vn" required style="height: 40px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 12px;">
                            </div>
                        </div>
                    </div>

                    <!-- Khối 2: Thông tin công tác -->
                    <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                        <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                            2. Thông tin công tác
                        </h3>
                        <div class="grid-2" style="gap: 16px;">
                            <div class="form-group" style="margin: 0;">
                                <label class="form-label" style="font-weight: 600; color: #334155; margin-bottom: 8px;">Đơn vị công tác <span class="text-danger">*</span></label>
                                <select class="form-input" id="add-unit" required style="height: 40px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 12px;">
                                    <option value="">Chọn đơn vị trực thuộc</option>
                                    <option value="Ban Đào tạo">Ban Đào tạo</option>
                                    <option value="Ban Tổ chức Cán bộ">Ban Tổ chức Cán bộ</option>
                                    <option value="Khoa Công nghệ Thông tin">Khoa Công nghệ Thông tin</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin: 0;">
                                <label class="form-label" style="font-weight: 600; color: #334155; margin-bottom: 8px;">Phòng ban <span class="text-danger">*</span></label>
                                <select class="form-input" id="add-dept" required style="height: 40px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 12px;">
                                    <option value="">Chọn phòng ban</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin: 0;">
                                <label class="form-label" style="font-weight: 600; color: #334155; margin-bottom: 8px;">Chức vụ hiện tại <span class="text-danger">*</span></label>
                                <select class="form-input" id="add-position" required style="height: 40px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 12px;">
                                    <option value="">Chọn chức vụ</option>
                                    <option value="Trưởng ban">Trưởng ban</option>
                                    <option value="Phó Trưởng ban">Phó Trưởng ban</option>
                                    <option value="Trưởng khoa">Trưởng khoa</option>
                                    <option value="Giảng viên">Giảng viên</option>
                                    <option value="Chuyên viên">Chuyên viên</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin: 0;">
                                <label class="form-label" style="font-weight: 600; color: #334155; margin-bottom: 8px;">Cấp bậc học vị</label>
                                <select class="form-input" id="add-degree" style="height: 40px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 12px;">
                                    <option value="">Chọn học vị</option>
                                    <option value="Cử nhân">Cử nhân</option>
                                    <option value="Thạc sĩ">Thạc sĩ</option>
                                    <option value="Tiến sĩ">Tiến sĩ</option>
                                    <option value="Giáo sư, Tiến sĩ">Giáo sư, Tiến sĩ</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Khối 3: Tài liệu minh chứng ban đầu -->
                    <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                            <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0; display: flex; align- items: center; gap: 8px;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                                3. Tài liệu minh chứng đính kèm
                            </h3>
                            <button type="button" class="btn btn-primary btn-sm" id="btn-trigger-upload" style="background: var(--primary); border: none; border-radius: 6px; display: flex; align-items: center; gap: 6px; padding: 6px 14px; font-weight: 600;">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                Tải lên tài liệu
                            </button>
                        </div>
                        <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                            <table class="data-table" style="width: 100%; border-collapse: collapse;">
                                <thead>
                                    <tr style="background: #f8fafc;">
                                        <th style="padding: 12px; font-size: 12px; color: #64748b; font-weight: 600;">STT</th>
                                        <th style="padding: 12px; font-size: 12px; color: #64748b; font-weight: 600;">TÊN TÀI LIỆU</th>
                                        <th style="padding: 12px; font-size: 12px; color: #64748b; font-weight: 600;">LOẠI</th>
                                        <th style="padding: 12px; font-size: 12px; color: #64748b; font-weight: 600;">HIỆU LỰC</th>
                                        <th style="padding: 12px; font-size: 12px; color: #64748b; font-weight: 600;">HẾT HẠN</th>
                                        <th style="padding: 12px; font-size: 12px; color: #64748b; font-weight: 600;">TRẠNG THÁI</th>
                                        <th style="padding: 12px; font-size: 12px; color: #64748b; font-weight: 600; text-align: right;">THAO TÁC</th>
                                    </tr>
                                </thead>
                                <tbody id="add-docs-table-body">
                                    <tr>
                                        <td colspan="7" style="text-align:center; padding: 28px; color: #94a3b8; font-size: 13.5px;">Chưa có tài liệu đính kèm nào</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Bottom action buttons: Hủy bỏ & Lưu hồ sơ -->
                    <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; padding-bottom: 40px;">
                        <button type="button" class="btn btn-secondary" id="btn-cancel-add" style="border: 1px solid #cbd5e1; background: #ffffff; color: #475569; font-weight: 600; padding: 10px 24px; border-radius: 8px;">Hủy bỏ</button>
                        <button type="button" class="btn btn-primary" id="btn-save-personnel" style="background: var(--primary); border: none; color: #ffffff; font-weight: 700; padding: 10px 24px; border-radius: 8px; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(7, 88, 154, 0.25);">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                            Lưu hồ sơ cán bộ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    container.innerHTML = html;
    if (App && App.setFullPage) App.setFullPage();

    // Tabs scrolling logic
    container.querySelectorAll('.tab-btn-underline').forEach(btn => {

        btn.addEventListener('click', (e) => {
            container.querySelectorAll('.tab-btn-underline').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });

    // Navigation (Back/Cancel)
    const goBack = () => {
        renderHoSo(container);
    };
    container.querySelector('#bc-back-list')?.addEventListener('click', goBack);
    container.querySelector('#btn-cancel-add')?.addEventListener('click', goBack);

    // Department Cascade
    const DEPARTMENTS = {
        'Ban Đào tạo': ['Phòng Hành chính - Tổng hợp', 'Phòng Quản lý Đào tạo', 'Phòng Khảo thí'],
        'Ban Tổ chức Cán bộ': ['Phòng Tổ chức - Cán bộ', 'Phòng Bảo vệ Chính trị Nội bộ'],
        'Khoa Công nghệ Thông tin': ['Bộ môn Hệ thống thông tin', 'Bộ môn Khoa học máy tính']
    };
    const addUnit = container.querySelector('#add-unit');
    const addDept = container.querySelector('#add-dept');
    addUnit.addEventListener('change', () => {
        const u = addUnit.value;
        addDept.innerHTML = '<option value="">Chọn phòng ban</option>';
        if (u && DEPARTMENTS[u]) {
            DEPARTMENTS[u].forEach(d => {
                addDept.innerHTML += `<option value="${d}">${d}</option>`;
            });
        }
    });

    // Check duplicate Personnel ID on blur (BR02 UC01.01)
    const addIdInput = container.querySelector('#add-id');
    addIdInput?.addEventListener('blur', () => {
        const val = addIdInput.value.trim();
        if (val && PersonnelController.getDetail(val)) {
            App.notify(`Mã cán bộ "${val}" đã tồn tại trong hệ thống. Vui lòng sử dụng mã khác!`, 'warning');
        }
    });

    // Mock Upload Logic
    let uploadedDocs = [];
    const updateDocsTable = () => {
        const tbody = container.querySelector('#add-docs-table-body');
        if (uploadedDocs.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color: var(--text-tertiary);">Chưa có tài liệu đính kèm</td></tr>`;
            return;
        }
        tbody.innerHTML = uploadedDocs.map((doc, idx) => `
            <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px;">${(idx + 1).toString().padStart(2, '0')}</td>
                <td style="padding: 12px; font-weight: 600; color: #0f172a;">${doc.name}</td>
                <td style="padding: 12px; color: #334155;">${doc.type}</td>
                <td style="padding: 12px; color: #334155;">${doc.effectiveDate || '-'}</td>
                <td style="padding: 12px; color: #334155;">${doc.expireDate || '-'}</td>
                <td style="padding: 12px;">
                    <span class="badge ${doc.status === 'Còn hiệu lực' ? 'badge-success' : doc.status === 'Hết hiệu lực' ? 'badge-danger' : 'badge-warning'}">${doc.status}</span>
                </td>
                <td style="padding: 12px; text-align: right;">
                    <button type="button" class="btn btn-ghost btn-sm btn-del-doc" data-idx="${idx}" title="Xóa" style="background: transparent; border: none; cursor: pointer;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </td>
            </tr>
        `).join('');
        
        tbody.querySelectorAll('.btn-del-doc').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.dataset.idx);
                uploadedDocs.splice(idx, 1);
                updateDocsTable();
            });
        });
    };

    container.querySelector('#btn-trigger-upload')?.addEventListener('click', () => {
        const formHTML = `
            <div class="grid-2">
                <div class="form-group"><label class="form-label">Tên tài liệu <span class="text-danger">*</span></label><input type="text" class="form-input" id="add-modal-doc-name" required></div>
                <div class="form-group">
                    <label class="form-label">Loại tài liệu <span class="text-danger">*</span></label>
                    <select class="form-input" id="add-modal-doc-type" required>
                        <option value="">Chọn loại tài liệu</option>
                        <option value="Sơ yếu lý lịch 2C/TCTW">Sơ yếu lý lịch 2C/TCTW</option>
                        <option value="Bản kê khai tài sản">Bản kê khai tài sản</option>
                        <option value="Giấy khám sức khỏe">Giấy khám sức khỏe</option>
                        <option value="Văn bằng và chứng chỉ">Văn bằng và chứng chỉ</option>
                    </select>
                </div>
                <div class="form-group"><label class="form-label">Cơ quan ban hành</label><input type="text" class="form-input" id="add-modal-doc-issuer"></div>
                <div class="form-group"><label class="form-label">Tệp đính kèm <span class="text-danger">*</span></label><input type="file" class="form-input" id="add-modal-doc-file" required></div>
                <div class="form-group"><label class="form-label">Ngày cấp</label><input type="date" class="form-input" id="add-modal-issue-date"></div>
                <div class="form-group"><label class="form-label">Ngày hiệu lực</label><input type="date" class="form-input" id="add-modal-eff-date"></div>
                <div class="form-group"><label class="form-label">Ngày hết hiệu lực</label><input type="date" class="form-input" id="add-modal-exp-date"></div>
                <div class="form-group"><label class="form-label">Ghi chú</label><input type="text" class="form-input" id="add-modal-doc-note"></div>
            </div>
            <div style="text-align:right; margin-top:24px;">
                <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right: 8px;">Hủy</button>
                <button class="btn btn-primary" id="btn-save-doc-custom">Lưu tài liệu</button>
            </div>
        `;

        App.openModal('Khai báo tài liệu minh chứng', formHTML);
        
        // Ẩn nút confirm mặc định của modal
        const overlay = document.getElementById('app-modal');
        const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

        overlay.querySelector('#btn-save-doc-custom').addEventListener('click', () => {
            const name = overlay.querySelector('#add-modal-doc-name').value.trim();
            const type = overlay.querySelector('#add-modal-doc-type').value;
            const fileEl = overlay.querySelector('#add-modal-doc-file');
            const effVal = overlay.querySelector('#add-modal-eff-date').value;
            const expVal = overlay.querySelector('#add-modal-exp-date').value;
            const issuer = overlay.querySelector('#add-modal-doc-issuer').value;
            const issueDate = overlay.querySelector('#add-modal-issue-date').value;
            const note = overlay.querySelector('#add-modal-doc-note').value;

            if (!name || !type || !fileEl.files.length) {
                App.notify('Vui lòng nhập tên tài liệu, loại tài liệu và đính kèm tệp.', 'warning');
                return;
            }

            if (effVal && expVal && new Date(expVal) < new Date(effVal)) {
                App.notify('Ngày hết hiệu lực không được nhỏ hơn Ngày hiệu lực.', 'warning');
                return;
            }

            const reFmt = (dStr) => {
                if (!dStr) return '';
                const parts = dStr.split('-');
                if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
                return '';
            };

            let newStatus = 'Còn hiệu lực';
            const today = new Date();
            today.setHours(0,0,0,0);
            
            if (effVal && new Date(effVal) > today) {
                newStatus = 'Chưa có hiệu lực';
            } else if (expVal && new Date(expVal) < today) {
                newStatus = 'Hết hiệu lực';
            }

            uploadedDocs.push({
                name: name,
                type: type,
                issuer: issuer,
                issueDate: reFmt(issueDate),
                effectiveDate: reFmt(effVal),
                expireDate: reFmt(expVal),
                status: newStatus,
                note: note,
                uploadDate: new Date().toLocaleDateString('vi-VN')
            });
            updateDocsTable();
            App.closeModal();
            App.notify('Đã thêm tài liệu thành công', 'success');
        });
    });

    // Save Personnel
    container.querySelector('#btn-save-personnel')?.addEventListener('click', () => {
        const data = {
            id: container.querySelector('#add-id').value.trim(),
            name: container.querySelector('#add-name').value.trim(),
            email: container.querySelector('#add-email').value.trim(),
            gender: container.querySelector('#add-gender').value,
            unit: container.querySelector('#add-unit').value,
            department: container.querySelector('#add-dept').value,
            position: container.querySelector('#add-position').value,
            degree: container.querySelector('#add-degree').value,
            documents: uploadedDocs.map(d => ({
                id: Database.generateId('personnel', 'DOC'),
                type: d.type,
                name: d.name,
                issuer: d.issuer || 'Cá nhân cung cấp',
                issueDate: d.issueDate || d.uploadDate,
                effectiveDate: d.effectiveDate || d.uploadDate,
                expireDate: d.expireDate,
                status: d.status,
                note: d.note
            }))
        };
        
        const success = PersonnelController.addPersonnel(data, container);

        if (success) {
            App.notify('Lưu hồ sơ cán bộ thành công!', 'success');
            goBack(); // Return to list
        }
    });
}

// Theo dõi hiệu lực tài liệu (Full Screen)
function renderTrackDocs(container) {
    let allDocs = [];
    PersonnelController.getList().forEach(p => {
        if (p.documents) {
            p.documents.forEach(d => {
                allDocs.push({ ...d, personName: p.name, personId: p.id, unit: p.unit, department: p.department });
            });
        }
    });

    const activeCount = allDocs.filter(d => d.status === 'Còn hiệu lực').length;
    const warningCount = allDocs.filter(d => d.status === 'Sắp hết hạn').length;
    const expiredCount = allDocs.filter(d => d.status === 'Hết hiệu lực').length;

    const html = `
        <div class="full-page-container">
            <div class="page-header-alt">
                <div class="breadcrumb-bar">
                    <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                        <span class="bc-back-btn" id="bc-back-list" style="cursor:pointer; display:flex; align-items:center; gap:6px; color:var(--text-secondary); font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; transition:color 0.2s;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                            QUẢN LÝ HỒ SƠ
                        </span>
                        <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                        <span style="color:var(--primary); text-transform:uppercase; font-weight:700; font-size:12px; letter-spacing:0.05em;">THEO DÕI TÀI LIỆU MINH CHỨNG</span>
                    </div>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
                    <div>
                        <h2>Theo dõi hiệu lực tài liệu minh chứng</h2>
                        <p style="color: var(--text-tertiary); margin-top: 4px; font-size: 13px;">Quản lý, tra cứu và cảnh báo trạng thái hiệu lực của các tài liệu đính kèm trên toàn hệ thống</p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <span class="badge badge-success" style="padding: 6px 12px; font-size: 13px;">${activeCount} Còn hiệu lực</span>
                        <span class="badge badge-warning" style="padding: 6px 12px; font-size: 13px;">${warningCount} Sắp hết hạn</span>
                        <span class="badge badge-danger" style="padding: 6px 12px; font-size: 13px;">${expiredCount} Hết hiệu lực</span>
                    </div>
                </div>
            </div>

            <div class="page-content-alt" style="overflow-y: auto; background: #f8fafc; padding: 24px 32px 48px;">
                <div style="width: 100%; display: flex; flex-direction: column; gap: 24px;">
                    <!-- Filter Toolbar Box -->
                    <div class="form-section" style="border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <div class="form-section-header" style="background: #ffffff; padding: 16px 20px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 700; color: #0f172a; display: flex; align-items: center; justify-content: space-between;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185b9d" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                Tra cứu & Lọc tài liệu minh chứng
                            </div>
                            <button type="button" class="btn btn-secondary btn-sm" id="btn-reset-trk-filters" style="font-size: 12px;">Đặt lại lọc</button>
                        </div>
                        <div class="form-section-body" style="background: #ffffff; padding: 20px;">
                            <!-- Top search input -->
                            <div style="margin-bottom: 16px;">
                                <div style="position: relative; display: flex; align-items: center;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5" style="position: absolute; left: 14px; pointer-events: none;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                    <input type="text" class="form-input" id="trk-search" placeholder="Nhập tên tài liệu, tên cán bộ, mã hồ sơ [NS-xxxx]..." style="width: 100%; padding: 11px 14px 11px 44px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 14px; background: #f8fafc;">
                                </div>
                            </div>
                            <!-- 4 Select filters -->
                            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
                                <div>
                                    <label style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Đơn vị công tác</label>
                                    <select class="form-input" id="trk-unit" style="margin-top: 4px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; font-size: 13px; width: 100%;">
                                        <option value="">Tất cả Đơn vị</option>
                                        <option value="Ban Đào tạo">Ban Đào tạo</option>
                                        <option value="Ban Tổ chức Cán bộ">Ban Tổ chức Cán bộ</option>
                                        <option value="Khoa Công nghệ Thông tin">Khoa Công nghệ Thông tin</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Phòng ban bộ môn</label>
                                    <select class="form-input" id="trk-department" style="margin-top: 4px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; font-size: 13px; width: 100%;">
                                        <option value="">Tất cả Phòng ban</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Loại tài liệu</label>
                                    <select class="form-input" id="trk-type" style="margin-top: 4px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; font-size: 13px; width: 100%;">
                                        <option value="">Tất cả loại tài liệu</option>
                                        <option value="Sơ yếu lý lịch 2C/TCTW">Sơ yếu lý lịch 2C/TCTW</option>
                                        <option value="Bản kê khai tài sản">Bản kê khai tài sản</option>
                                        <option value="Giấy khám sức khỏe">Giấy khám sức khỏe</option>
                                        <option value="Văn bằng và chứng chỉ">Văn bằng và chứng chỉ</option>
                                        <option value="PDF">PDF</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Trạng thái hiệu lực</label>
                                    <select class="form-input" id="trk-status" style="margin-top: 4px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; font-size: 13px; width: 100%;">
                                        <option value="">Tất cả trạng thái</option>
                                        <option value="Còn hiệu lực">Còn hiệu lực</option>
                                        <option value="Hết hiệu lực">Hết hiệu lực</option>
                                        <option value="Sắp hết hạn">Sắp hết hạn</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Table Card (Scrollable & Responsive) -->
                    <div class="form-section" style="border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <div class="form-section-header" style="background: #ffffff; padding: 16px 20px; border-bottom: 1px solid #e2e8f0; font-size: 15px; font-weight: 700; color: #0f172a; display: flex; align-items: center; justify-content: space-between;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185b9d" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                                Danh sách tài liệu minh chứng
                            </div>
                            <span id="trk-count-info" style="font-size: 13px; color: var(--text-secondary); font-weight: 500;">Hiển thị ${allDocs.length} tài liệu</span>
                        </div>
                        <div class="form-section-body" style="background: #ffffff; padding: 0;">
                            <!-- TABLE WRAPPER (Full width fit) -->
                            <div class="table-container" style="width: 100%; border: none; border-radius: 0;">
                                <table class="data-table" style="width: 100%; border-collapse: collapse; min-width: 900px;">
                                    <thead>
                                        <tr style="border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
                                            <th style="padding: 14px 20px; font-size: 12px; color: #64748b; font-weight: 600; text-align: left; width: 18%;">CÁN BỘ SỞ HỮU</th>
                                            <th style="padding: 14px 20px; font-size: 12px; color: #64748b; font-weight: 600; text-align: left; width: 22%;">ĐƠN VỊ / PHÒNG BAN</th>
                                            <th style="padding: 14px 20px; font-size: 12px; color: #64748b; font-weight: 600; text-align: left; width: 22%;">TÊN TÀI LIỆU</th>
                                            <th style="padding: 14px 20px; font-size: 12px; color: #64748b; font-weight: 600; text-align: left; width: 12%;">NGÀY HIỆU LỰC</th>
                                            <th style="padding: 14px 20px; font-size: 12px; color: #64748b; font-weight: 600; text-align: left; width: 12%;">NGÀY HẾT HẠN</th>
                                            <th style="padding: 14px 20px; font-size: 12px; color: #64748b; font-weight: 600; text-align: left; width: 8%;">TRẠNG THÁI</th>
                                            <th style="padding: 14px 20px; font-size: 12px; color: #64748b; font-weight: 600; text-align: center; width: 6%;">THAO TÁC</th>
                                        </tr>
                                    </thead>
                                    <tbody id="trk-table-body">
                                        ${allDocs.map(doc => `
                                            <tr class="trk-row" style="border-bottom: 1px solid #e2e8f0;" data-name="${doc.personName.toLowerCase()}" data-id="${doc.personId.toLowerCase()}" data-docname="${doc.name.toLowerCase()}" data-unit="${doc.unit}" data-department="${doc.department || ''}" data-type="${doc.type}" data-status="${doc.status}" data-expire="${doc.expireDate ? doc.expireDate.split('/').reverse().join('-') : ''}">
                                                <td style="padding: 14px 20px;">
                                                    <div style="font-weight: 600; color: #0f172a;">${doc.personName}</div>
                                                    <div style="color: #64748b; font-size: 12px; font-family: monospace;">${doc.personId}</div>
                                                </td>
                                                <td style="padding: 14px 20px; color: #334155; font-size: 13px;">
                                                    <div>${doc.unit}</div>
                                                    <div style="color: #64748b; font-size: 12px;">${doc.department || '-'}</div>
                                                </td>
                                                <td style="padding: 14px 20px;">
                                                    <div style="font-weight: 600; color: #0f172a;">${doc.name}</div>
                                                    <div style="color: #185b9d; font-size: 12px; font-weight: 500;">${doc.type}</div>
                                                </td>
                                                <td style="padding: 14px 20px; color: #334155; font-size: 13px;">${doc.effectiveDate || '-'}</td>
                                                <td style="padding: 14px 20px; color: #334155; font-size: 13px;">${doc.expireDate || '-'}</td>
                                                <td style="padding: 14px 20px;">
                                                    <span class="badge ${doc.status === 'Còn hiệu lực' ? 'badge-success' : doc.status === 'Hết hiệu lực' ? 'badge-danger' : 'badge-warning'}">${doc.status}</span>
                                                </td>
                                                <td style="padding: 14px 20px; text-align: center;">
                                                    <button type="button" class="btn-update-doc btn btn-ghost btn-sm" data-pid="${doc.personId}" data-dname="${doc.name}" data-eff="${doc.effectiveDate || ''}" data-exp="${doc.expireDate || ''}" style="color: #185b9d;" title="Cập nhật thông tin tài liệu">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        `).join('')}
                                        ${allDocs.length === 0 ? '<tr><td colspan="7" style="text-align:center; padding: 48px; color: #94a3b8;">Chưa có dữ liệu tài liệu minh chứng</td></tr>' : ''}
                                    </tbody>
                                </table>
                            </div>
                            <div id="trk-no-result" style="display:none; text-align:center; padding: 48px; color: #64748b;">
                                Không có tài liệu nào phù hợp với tiêu chí tra cứu.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Update Modal (Hidden by default) -->
            <div id="update-doc-modal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9999; align-items: center; justify-content: center;">
                <div style="background: #ffffff; border-radius: 12px; width: 450px; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.15);">
                    <h3 style="margin: 0 0 16px 0; color: #0f172a; font-size: 18px; font-weight: 700;">Cập nhật thông tin tài liệu</h3>
                    <input type="hidden" id="upd-person-id">
                    <input type="hidden" id="upd-doc-orig-name">
                    
                    <div class="form-group" style="margin-bottom: 16px;">
                        <label class="form-label" style="font-weight: 600; color: #334155; margin-bottom: 8px;">Tên tài liệu <span class="text-danger">*</span></label>
                        <input type="text" class="form-input" id="upd-doc-name" style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 12px; width: 100%; box-sizing: border-box;">
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 16px;">
                        <label class="form-label" style="font-weight: 600; color: #334155; margin-bottom: 8px;">Tệp thay thế (Tùy chọn)</label>
                        <input type="file" class="form-input" id="upd-doc-file" style="border: 1px dashed #cbd5e1; border-radius: 6px; padding: 10px 12px; width: 100%; box-sizing: border-box;">
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="form-group" style="margin-bottom: 0;">
                            <label class="form-label" style="font-weight: 600; color: #334155; margin-bottom: 8px;">Ngày hiệu lực</label>
                            <input type="date" class="form-input" id="upd-eff-date" style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 12px; width: 100%; box-sizing: border-box;">
                        </div>
                        <div class="form-group" style="margin-bottom: 0;">
                            <label class="form-label" style="font-weight: 600; color: #334155; margin-bottom: 8px;">Ngày hết hiệu lực</label>
                            <input type="date" class="form-input" id="upd-exp-date" style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 12px; width: 100%; box-sizing: border-box;">
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
                        <button type="button" id="btn-close-upd" class="btn btn-secondary">Hủy bỏ</button>
                        <button type="button" id="btn-save-upd" class="btn btn-primary" style="background: #185b9d; border: none;">Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
    if (App && App.setFullPage) App.setFullPage();

    // Navigation
    container.querySelector('#bc-back-list')?.addEventListener('click', () => {
        renderHoSo(container);
    });

    // Reset filters
    container.querySelector('#btn-reset-trk-filters')?.addEventListener('click', () => {
        container.querySelector('#trk-search').value = '';
        container.querySelector('#trk-unit').value = '';
        container.querySelector('#trk-department').value = '';
        container.querySelector('#trk-department').innerHTML = '<option value="">Tất cả Phòng ban</option>';
        container.querySelector('#trk-type').value = '';
        container.querySelector('#trk-status').value = '';
        applyTrackFilters();
    });

    // Filter Logic
    const DEPARTMENTS = {
        'Ban Đào tạo': ['Phòng Hành chính - Tổng hợp', 'Phòng Quản lý Đào tạo', 'Phòng Khảo thí'],
        'Ban Tổ chức Cán bộ': ['Phòng Tổ chức - Cán bộ', 'Phòng Bảo vệ Chính trị Nội bộ'],
        'Khoa Công nghệ Thông tin': ['Bộ môn Hệ thống thông tin', 'Bộ môn Khoa học máy tính']
    };

    const trkUnit = container.querySelector('#trk-unit');
    const trkDept = container.querySelector('#trk-department');

    trkUnit?.addEventListener('change', () => {
        const unit = trkUnit.value;
        trkDept.innerHTML = '<option value="">Tất cả Phòng ban</option>';
        if (unit && DEPARTMENTS[unit]) {
            DEPARTMENTS[unit].forEach(dept => {
                trkDept.innerHTML += `<option value="${dept}">${dept}</option>`;
            });
        }
        applyTrackFilters();
    });

    const applyTrackFilters = () => {
        const search = container.querySelector('#trk-search').value.toLowerCase();
        const unit = container.querySelector('#trk-unit').value;
        const dept = container.querySelector('#trk-department').value;
        const type = container.querySelector('#trk-type').value;
        const status = container.querySelector('#trk-status').value;

        let visible = 0;
        const today = new Date();
        today.setHours(0,0,0,0);
        const soonDate = new Date(today);
        soonDate.setDate(soonDate.getDate() + 30);

        container.querySelectorAll('.trk-row').forEach(row => {
            const mSearch = !search || row.dataset.name.includes(search) || row.dataset.id.includes(search) || row.dataset.docname.includes(search);
            const mUnit = !unit || row.dataset.unit === unit;
            const mDept = !dept || row.dataset.department === dept;
            const mType = !type || row.dataset.type === type;
            
            let mStatus = true;
            if (status === 'Sắp hết hạn') {
                const expStr = row.dataset.expire;
                if (!expStr) {
                    mStatus = false;
                } else {
                    const expDate = new Date(expStr);
                    mStatus = (expDate >= today && expDate <= soonDate);
                }
            } else if (status) {
                mStatus = row.dataset.status === status;
            }

            if (mSearch && mUnit && mDept && mType && mStatus) {
                row.style.display = '';
                visible++;
            } else {
                row.style.display = 'none';
            }
        });

        const noResult = container.querySelector('#trk-no-result');
        const countInfo = container.querySelector('#trk-count-info');
        if (countInfo) countInfo.textContent = `Hiển thị ${visible} tài liệu`;

        const table = container.querySelector('.data-table');
        if (visible === 0 && allDocs.length > 0) {
            table.style.display = 'none';
            noResult.style.display = 'block';
        } else {
            table.style.display = 'table';
            noResult.style.display = 'none';
        }
    };

    ['#trk-search', '#trk-unit', '#trk-department', '#trk-type', '#trk-status'].forEach(sel => {
        const el = container.querySelector(sel);
        if(el) {
            el.addEventListener('input', applyTrackFilters);
            el.addEventListener('change', applyTrackFilters);
        }
    });

    // Update Modal Logic
    const fmtDateToISO = (dStr) => {
        if (!dStr) return '';
        const parts = dStr.split('/');
        if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
        return '';
    };
    
    container.querySelectorAll('.btn-update-doc').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pid = e.currentTarget.dataset.pid;
            const dname = e.currentTarget.dataset.dname;
            const eff = e.currentTarget.dataset.eff;
            const exp = e.currentTarget.dataset.exp;
            
            container.querySelector('#upd-person-id').value = pid;
            container.querySelector('#upd-doc-orig-name').value = dname;
            container.querySelector('#upd-doc-name').value = dname;
            container.querySelector('#upd-doc-file').value = '';
            
            container.querySelector('#upd-eff-date').value = fmtDateToISO(eff);
            container.querySelector('#upd-exp-date').value = fmtDateToISO(exp);
            
            container.querySelector('#update-doc-modal').style.display = 'flex';
        });
    });

    container.querySelector('#btn-close-upd')?.addEventListener('click', () => {
        container.querySelector('#update-doc-modal').style.display = 'none';
    });

    container.querySelector('#btn-save-upd')?.addEventListener('click', () => {
        const pid = container.querySelector('#upd-person-id').value;
        const origDname = container.querySelector('#upd-doc-orig-name').value;
        const newDname = container.querySelector('#upd-doc-name').value.trim();
        const effVal = container.querySelector('#upd-eff-date').value;
        const expVal = container.querySelector('#upd-exp-date').value;
        const fileInput = container.querySelector('#upd-doc-file');
        
        if (!newDname) {
            if(App.notify) App.notify('Vui lòng nhập tên tài liệu.', 'warning');
            return;
        }

        const reFmt = (dStr) => {
            if (!dStr) return '';
            const parts = dStr.split('-');
            if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
            return '';
        };
        const effDate = reFmt(effVal);
        const expDate = reFmt(expVal);

        const person = PersonnelController.getDetail(pid);
        if (person && person.documents) {
            const doc = person.documents.find(d => d.name === origDname);
            if (doc) {
                doc.name = newDname;
                doc.effectiveDate = effDate;
                doc.expireDate = expDate;
                
                if (fileInput.files && fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    doc.type = file.type.includes('pdf') ? 'PDF' : 'Tài liệu';
                }
                
                let newStatus = 'Còn hiệu lực';
                const today = new Date();
                today.setHours(0,0,0,0);
                
                if (effVal && new Date(effVal) > today) {
                    newStatus = 'Chưa có hiệu lực';
                } else if (expVal && new Date(expVal) < today) {
                    newStatus = 'Hết hiệu lực';
                }
                
                doc.status = newStatus;
                
                Database.update('personnel', pid, { documents: person.documents });
                if(App.notify) App.notify('Cập nhật tài liệu thành công!', 'success');
                renderTrackDocs(container);
            }
        }
    });
}
// Import danh sách nhân sự (Full Screen)
function renderImportPersonnel(container) {
    const html = `
        <div class="full-page-container">
            <div class="page-header-alt">
                <div class="breadcrumb-bar">
                        <span class="bc-back-btn" id="bc-back-list" style="cursor:pointer; display:flex; align-items:center; gap:6px; color:var(--text-secondary); font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; transition:color 0.2s;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                            QUẢN LÝ HỒ SƠ
                        </span>
                        <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                        <span style="color:var(--primary); text-transform:uppercase; font-weight:700; font-size:12px; letter-spacing:0.05em;">IMPORT DANH SÁCH</span>
                    </div>
                <h2>Import danh sách nhân sự</h2>
                <p style="color: var(--text-tertiary); margin-top: 4px; font-size: 13px;">Nhập hàng loạt hồ sơ nhân sự từ tệp dữ liệu Excel</p>
            </div>
            <div class="page-content-alt">
                <div class="saas-layout">
                    <div class="saas-main">
                    <div class="form-section">
                        <div class="form-section-header">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#185b9d" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                            Tải lên tệp dữ liệu
                        </div>
                        <div class="form-section-body">
                            <div class="alert-box alert-info" style="margin-bottom: 24px; display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: var(--info-bg); border-radius: 8px; border: 1px solid rgba(11, 99, 229, 0.2);">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--info)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                                <div>Vui lòng lập tệp Excel theo biểu mẫu chuẩn để Import. <a href="#" id="download-template" style="color:var(--primary); font-weight: 600;">Tải tệp mẫu tại đây</a></div>
                            </div>
                            
                            <div style="border: 2px dashed var(--border); border-radius: var(--radius-xl); padding: 48px 20px; text-align: center; background: #ffffff; cursor: pointer; transition: all 0.3s ease;" id="drag-drop-area">
                                <div style="width: 64px; height: 64px; background: var(--primary-bg); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                </div>
                                <div style="font-weight: 600; font-size: 16px; margin-bottom: 8px; color: var(--text-primary);">Kéo thả tệp vào đây hoặc <span style="color: var(--primary)">Chọn tệp</span></div>
                                <div style="font-size: 14px; color: var(--text-tertiary);">Hỗ trợ định dạng .xlsx, .xls (Tối đa 10MB)</div>
                                <input type="file" id="import-file" style="display:none" accept=".xlsx, .xls">
                            </div>
                            
                            <div id="import-progress" style="display:none; margin-top:32px; background: #ffffff; border: 1px solid var(--border); padding: 24px; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
                                <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:14px; font-weight: 600; color: var(--text-primary);">
                                    <span>Đang xử lý dữ liệu nhập...</span>
                                    <span id="import-percent" style="color: var(--primary);">0%</span>
                                </div>
                                <div style="height:8px; background:var(--bg-hover); border-radius:4px; overflow:hidden;">
                                    <div id="import-bar" style="height:100%; width:0%; background:var(--gradient-primary); transition:width 0.3s ease;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = html;
    if (App && App.setFullPage) App.setFullPage();
    
    container.querySelector('#bc-back-list')?.addEventListener('click', () => {
        renderHoSo(container);
    });
    
    container.querySelector('#download-template')?.addEventListener('click', (e) => {
        e.preventDefault();
        if(App.notify) App.notify('Đang tải biểu mẫu Excel...', 'info');
    });
    
    container.querySelector('#drag-drop-area')?.addEventListener('click', () => {
        container.querySelector('#import-file').click();
    });
    
    container.querySelector('#import-file')?.addEventListener('change', function() {
        if (this.files[0]) {
            const dragArea = container.querySelector('#drag-drop-area');
            const progressArea = container.querySelector('#import-progress');
            dragArea.style.display = 'none';
            progressArea.style.display = 'block';
            
            let p = 0;
            const interval = setInterval(() => {
                p += 15;
                if (p > 100) p = 100;
                container.querySelector('#import-bar').style.width = p + '%';
                container.querySelector('#import-percent').textContent = p + '%';
                if (p >= 100) {
                    clearInterval(interval);
                    if(App.notify) App.notify('Import danh sách thành công!', 'success');
                    setTimeout(() => {
                        renderHoSo(container);
                    }, 800);
                }
            }, 250);
        }
    });
}


// Xem chi tiết hồ sơ nhân sự (Full Screen - Premium 2-Column Dashboard Layout)
function renderViewPersonnel(container, personId) {
    const person = PersonnelController.getDetail(personId);
    if (!person) return;
    
    // Tìm các bản ghi nghiệp vụ liên quan
    const allProposals = App.state.proposals || [];
    const relatedProposals = allProposals.filter(p => p.person === person.name || (p.personId && p.personId === person.id));
    
    const allDecisions = App.state.decisions || [];
    const relatedDecisions = allDecisions.filter(d => d.person === person.name || (d.personId && d.personId === person.id));

    const html = `
        <div class="full-page-container">
            <!-- Header Section -->
            <div class="page-header-alt" style="padding: 16px 32px; background: #ffffff; border-bottom: 1px solid var(--border);">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 24px;">
                    <div class="breadcrumb-bar" style="margin: 0;">
                        <span class="bc-back-btn" id="bc-back-list">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                            QUẢN LÝ HỒ SƠ
                        </span>
                        <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                        <span class="bc-current">CHI TIẾT HỒ SƠ NHÂN SỰ</span>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <button class="btn btn-secondary" id="btn-back-to-list" style="display:flex; align-items:center; gap:6px; padding: 8px 14px; font-size: 13px;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                            Quay lại
                        </button>
                        <button class="btn btn-primary" id="btn-goto-edit" style="display:flex; align-items:center; gap:6px; padding: 8px 16px; font-size: 13px;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            Cập nhật hồ sơ
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="page-content-alt" style="overflow-y: auto; background: #f8fafc; padding: 24px 32px 48px;">
                <div style="width: 100%; display: grid; grid-template-columns: 300px 1fr; gap: 24px; align-items: start;">
                    
                    <!-- LEFT COLUMN: Profile Card Sidebar -->
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        <!-- Main Summary Profile Box -->
                        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <div style="width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: white; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; margin: 0 auto 16px; box-shadow: 0 6px 16px rgba(7, 88, 154, 0.25);">
                                ${person.initials || 'NS'}
                            </div>
                            <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: #0f172a;">${person.name}</h3>
                            <div style="margin-top: 6px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                                <span style="font-size: 12px; font-weight: 700; color: var(--primary); background: var(--primary-bg); padding: 3px 8px; border-radius: 4px; font-family: monospace;">${person.id}</span>
                                <span class="badge ${person.status === 'active' ? 'badge-success' : 'badge-danger'}">${person.status === 'active' ? 'Đang hoạt động' : 'Đã khóa'}</span>
                            </div>
                            <div style="margin-top: 12px; font-size: 13.5px; font-weight: 600; color: #334155;">
                                ${person.position}
                            </div>
                            <div style="font-size: 12.5px; color: #64748b; margin-top: 2px;">
                                ${person.department ? person.department + ' · ' : ''}${person.unit}
                            </div>

                            <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 20px 0;">

                            <!-- Contact Meta List -->
                            <div style="display: flex; flex-direction: column; gap: 14px; text-align: left;">
                                <div style="display: flex; align-items: center; gap: 10px; font-size: 13px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="flex-shrink:0;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                    <span style="color: #0f172a; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${person.email || 'Chưa cập nhật email'}</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 10px; font-size: 13px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="flex-shrink:0;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                    <span style="color: #334155;">${person.phone || '0905 123 456'}</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 10px; font-size: 13px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="flex-shrink:0;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                    <span style="color: #334155;">${person.dob ? person.dob.split('-').reverse().join('/') : '12/05/1980'}</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 10px; font-size: 13px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="flex-shrink:0;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                    <span style="color: #334155; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${person.home || 'TP. Đà Nẵng'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT COLUMN: Tabbed Detail Content -->
                    <div style="display: flex; flex-direction: column; gap: 20px; min-width: 0;">
                        <!-- Navigation Tabs -->
                        <div style="display: flex; gap: 20px; border-bottom: 2px solid var(--border); background: #ffffff; padding: 0 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <div class="tab-link active" data-tab="info" style="padding: 14px 0; font-weight: 700; color: var(--primary); border-bottom: 3px solid var(--primary); cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 14px;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                Thông tin lý lịch
                            </div>
                            <div class="tab-link" data-tab="docs" style="padding: 14px 0; font-weight: 600; color: var(--text-secondary); border-bottom: 3px solid transparent; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 14px;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                Tài liệu đính kèm (${(person.documents || []).length})
                            </div>
                            <div class="tab-link" data-tab="records" style="padding: 14px 0; font-weight: 600; color: var(--text-secondary); border-bottom: 3px solid transparent; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 14px;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                                Hồ sơ & Quyết định (${relatedProposals.length + relatedDecisions.length})
                            </div>
                        </div>
                        
                        <!-- TAB 1: THÔNG TIN LÝ LỊCH -->
                        <div class="tab-content" id="tab-info" style="display: block;">
                            <div style="display: flex; flex-direction: column; gap: 20px;">
                                <!-- Section 1: Thông tin cá nhân -->
                                <div style="border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                                    <div style="background: #ffffff; padding: 14px 20px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 8px;">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                        Thông tin hành chính & Cá nhân
                                    </div>
                                    <div style="padding: 20px;">
                                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px 24px;">
                                            <div>
                                                <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Mã cán bộ</div>
                                                <div style="font-weight: 700; color: var(--primary); font-size: 14px; margin-top: 4px; font-family: monospace;">${person.id}</div>
                                            </div>
                                            <div>
                                                <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Họ và Tên cán bộ</div>
                                                <div style="font-weight: 700; color: #0f172a; font-size: 14px; margin-top: 4px;">${person.name}</div>
                                            </div>
                                            <div>
                                                <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Giới tính</div>
                                                <div style="font-weight: 500; color: #334155; font-size: 13.5px; margin-top: 4px;">${person.gender || 'Nam'}</div>
                                            </div>
                                            <div>
                                                <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Email</div>
                                                <div style="font-weight: 500; color: #0f172a; font-size: 13.5px; margin-top: 4px;">${person.email || '-'}</div>
                                            </div>
                                            <div>
                                                <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Số CCCD và CMND</div>
                                                <div style="font-weight: 500; color: #334155; font-size: 13.5px; margin-top: 4px; font-family: monospace;">${person.cccd || '048075001234'}</div>
                                            </div>
                                            <div>
                                                <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Địa chỉ thường trú</div>
                                                <div style="font-weight: 500; color: #334155; font-size: 13.5px; margin-top: 4px;">${person.home || 'Thành phố Đà Nẵng'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Section 2: Thông tin công tác & Học vị -->
                                <div style="border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                                    <div style="background: #ffffff; padding: 14px 20px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 8px;">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                        Thông tin công tác & Học vị
                                    </div>
                                    <div style="padding: 20px;">
                                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px 24px;">
                                            <div>
                                                <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Đơn vị công tác</div>
                                                <div style="font-weight: 700; color: #0f172a; font-size: 14px; margin-top: 4px;">${person.unit}</div>
                                            </div>
                                            <div>
                                                <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Phòng ban / Bộ môn</div>
                                                <div style="font-weight: 600; color: #334155; font-size: 13.5px; margin-top: 4px;">${person.department || 'Chưa phân bổ'}</div>
                                            </div>
                                            <div>
                                                <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Chức vụ hiện tại</div>
                                                <div style="font-weight: 700; color: var(--primary); font-size: 14px; margin-top: 4px;">${person.position}</div>
                                            </div>
                                            <div>
                                                <div style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase;">Cấp bậc học vị</div>
                                                <div style="font-weight: 600; color: #334155; font-size: 13.5px; margin-top: 4px;">${person.degree || 'Cử nhân'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- TAB 2: TÀI LIỆU MINH CHỨNG (Icon Actions gọn gàng) -->
                        <div class="tab-content" id="tab-docs" style="display: none;">
                            <div style="border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                                <div style="background: #ffffff; padding: 14px 20px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 700; color: #0f172a; display: flex; justify-content: space-between; align-items: center;">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                        Tài liệu minh chứng của cán bộ
                                    </div>
                                    <button class="btn btn-primary" id="btn-add-doc-view" style="display: flex; align-items: center; gap: 6px; padding: 6px 14px; font-size: 12.5px;">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                        Thêm tài liệu
                                    </button>
                                </div>
                                <div style="padding: 0;">
                                    <div class="table-container" style="overflow-x: auto; width: 100%; border: none;">
                                        <table class="data-table" style="width: 100%; border-collapse: collapse;">
                                            <thead>
                                                <tr style="border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
                                                    <th style="padding: 12px 16px; font-size: 12px; color: #64748b; font-weight: 600;">TÊN TÀI LIỆU</th>
                                                    <th style="padding: 12px 16px; font-size: 12px; color: #64748b; font-weight: 600;">LOẠI TÀI LIỆU</th>
                                                    <th style="padding: 12px 16px; font-size: 12px; color: #64748b; font-weight: 600;">HIỆU LỰC</th>
                                                    <th style="padding: 12px 16px; font-size: 12px; color: #64748b; font-weight: 600;">TRẠNG THÁI</th>
                                                    <th style="padding: 12px 16px; font-size: 12px; color: #64748b; font-weight: 600; text-align: center; width: 100px;">THAO TÁC</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${(person.documents || []).map(doc => `
                                                    <tr style="border-bottom: 1px solid #e2e8f0;">
                                                        <td style="padding: 12px 16px; font-weight: 600; color: #0f172a;">${doc.name}</td>
                                                        <td style="padding: 12px 16px; color: #334155; font-size: 13px;">${doc.type}</td>
                                                        <td style="padding: 12px 16px; color: #334155; font-size: 13px;">${doc.effectiveDate || '-'} ${doc.expireDate ? 'đến ' + doc.expireDate : ''}</td>
                                                        <td style="padding: 12px 16px;">
                                                            <span class="badge ${doc.status === 'Còn hiệu lực' ? 'badge-success' : doc.status === 'Hết hiệu lực' ? 'badge-danger' : 'badge-warning'}">${doc.status}</span>
                                                        </td>
                                                        <td style="padding: 12px 16px; text-align: center;">
                                                            <div style="display: flex; gap: 4px; justify-content: center; align-items: center;">
                                                                <button type="button" class="btn btn-ghost btn-sm" title="Xem trước tài liệu" onclick="App.notify('Đang mở bản xem trước tài liệu...', 'info')" style="padding: 4px 6px;">
                                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                                                </button>
                                                                <button type="button" class="btn btn-ghost btn-sm" title="Tải xuống tài liệu" onclick="App.notify('Đang tải xuống tài liệu minh chứng...', 'success')" style="padding: 4px 6px;">
                                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                `).join('')}
                                                ${!(person.documents && person.documents.length) ? '<tr><td colspan="5" style="text-align: center; padding: 32px; color: #94a3b8;">Chưa có tài liệu minh chứng nào được liên kết</td></tr>' : ''}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- TAB 3: BẢN GHI NGHIỆP VỤ LIÊN QUAN -->
                        <div class="tab-content" id="tab-records" style="display: none;">
                            <div style="display: flex; flex-direction: column; gap: 20px;">
                                <div style="border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                                    <div style="background: #ffffff; padding: 14px 20px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 700; color: #0f172a;">
                                        Đề xuất & Hồ sơ bổ nhiệm liên quan
                                    </div>
                                    <div style="padding: 0;">
                                        <div class="table-container" style="overflow-x: auto; width: 100%; border: none;">
                                            <table class="data-table" style="width: 100%; border-collapse: collapse;">
                                                <thead>
                                                    <tr style="border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
                                                        <th style="padding: 12px 16px; font-size: 12px; color: #64748b;">MÃ ĐỀ XUẤT</th>
                                                        <th style="padding: 12px 16px; font-size: 12px; color: #64748b;">CHỨC VỤ ĐỀ NGHỊ</th>
                                                        <th style="padding: 12px 16px; font-size: 12px; color: #64748b;">ĐƠN VỊ</th>
                                                        <th style="padding: 12px 16px; font-size: 12px; color: #64748b;">TRẠNG THÁI</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    ${relatedProposals.map(prop => `
                                                        <tr style="border-bottom: 1px solid #e2e8f0;">
                                                            <td style="padding: 12px 16px; font-weight: 600; font-family: monospace;">${prop.id}</td>
                                                            <td style="padding: 12px 16px;">${prop.position}</td>
                                                            <td style="padding: 12px 16px;">${prop.unit}</td>
                                                            <td style="padding: 12px 16px;"><span class="badge badge-info">${prop.status}</span></td>
                                                        </tr>
                                                    `).join('')}
                                                    ${relatedProposals.length === 0 ? '<tr><td colspan="4" style="text-align: center; padding: 24px; color: #94a3b8;">Chưa có đề xuất bổ nhiệm nào</td></tr>' : ''}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                                    <div style="background: #ffffff; padding: 14px 20px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 700; color: #0f172a;">
                                        Quyết định bổ nhiệm đã ban hành
                                    </div>
                                    <div style="padding: 0;">
                                        <div class="table-container" style="overflow-x: auto; width: 100%; border: none;">
                                            <table class="data-table" style="width: 100%; border-collapse: collapse;">
                                                <thead>
                                                    <tr style="border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
                                                        <th style="padding: 12px 16px; font-size: 12px; color: #64748b;">SỐ QUYẾT ĐỊNH</th>
                                                        <th style="padding: 12px 16px; font-size: 12px; color: #64748b;">CHỨC VỤ BỔ NHIỆM</th>
                                                        <th style="padding: 12px 16px; font-size: 12px; color: #64748b;">NGÀY BAN HÀNH</th>
                                                        <th style="padding: 12px 16px; font-size: 12px; color: #64748b;">TRẠNG THÁI</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    ${relatedDecisions.map(dec => `
                                                        <tr style="border-bottom: 1px solid #e2e8f0;">
                                                            <td style="padding: 12px 16px; font-weight: 600; font-family: monospace;">${dec.id}</td>
                                                            <td style="padding: 12px 16px;">${dec.position}</td>
                                                            <td style="padding: 12px 16px;">${dec.date}</td>
                                                            <td style="padding: 12px 16px;"><span class="badge badge-success">${dec.status}</span></td>
                                                        </tr>
                                                    `).join('')}
                                                    ${relatedDecisions.length === 0 ? '<tr><td colspan="4" style="text-align: center; padding: 24px; color: #94a3b8;">Chưa có quyết định bổ nhiệm nào</td></tr>' : ''}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    if (App && App.setFullPage) App.setFullPage();
    
    // Navigation Events
    const goBack = () => renderHoSo(container);
    container.querySelector('#bc-back-list')?.addEventListener('click', goBack);
    container.querySelector('#btn-back-to-list')?.addEventListener('click', goBack);
    
    // Switch to Edit Mode
    container.querySelector('#btn-goto-edit')?.addEventListener('click', () => {
        renderEditPersonnel(container, personId);
    });
    
    // Tab switching
    const tabs = container.querySelectorAll('.tab-link');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.style.color = 'var(--text-secondary)';
                t.style.borderBottomColor = 'transparent';
                t.style.fontWeight = '600';
            });
            tab.classList.add('active');
            tab.style.color = 'var(--primary)';
            tab.style.borderBottomColor = 'var(--primary)';
            tab.style.fontWeight = '700';
            
            container.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
            container.querySelector('#tab-' + tab.dataset.tab).style.display = 'block';
        });
    });
    
    // Add Doc Trigger
    container.querySelector('#btn-add-doc-view')?.addEventListener('click', () => {
        const formHTML = `
            <div class="grid-2">
                <div class="form-group"><label class="form-label">Tên tài liệu <span class="text-danger">*</span></label><input type="text" class="form-input" id="add-modal-doc-name" required></div>
                <div class="form-group">
                    <label class="form-label">Loại tài liệu <span class="text-danger">*</span></label>
                    <select class="form-input" id="add-modal-doc-type" required>
                        <option value="">Chọn loại tài liệu</option>
                        <option value="Sơ yếu lý lịch 2C/TCTW">Sơ yếu lý lịch 2C/TCTW</option>
                        <option value="Bản kê khai tài sản">Bản kê khai tài sản</option>
                        <option value="Giấy khám sức khỏe">Giấy khám sức khỏe</option>
                        <option value="Văn bằng và chứng chỉ">Văn bằng và chứng chỉ</option>
                    </select>
                </div>
                <div class="form-group"><label class="form-label">Cơ quan ban hành</label><input type="text" class="form-input" id="add-modal-doc-issuer"></div>
                <div class="form-group"><label class="form-label">Tệp đính kèm <span class="text-danger">*</span></label><input type="file" class="form-input" id="add-modal-doc-file" required></div>
                <div class="form-group"><label class="form-label">Ngày cấp</label><input type="date" class="form-input" id="add-modal-issue-date"></div>
                <div class="form-group"><label class="form-label">Ngày hiệu lực</label><input type="date" class="form-input" id="add-modal-eff-date"></div>
                <div class="form-group"><label class="form-label">Ngày hết hiệu lực</label><input type="date" class="form-input" id="add-modal-exp-date"></div>
                <div class="form-group"><label class="form-label">Ghi chú</label><input type="text" class="form-input" id="add-modal-doc-note"></div>
            </div>
            <div style="text-align:right; margin-top:24px;">
                <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right: 8px;">Hủy</button>
                <button class="btn btn-primary" id="btn-save-doc-view-custom">Lưu tài liệu</button>
            </div>
        `;
        App.openModal('Khai báo tài liệu minh chứng mới', formHTML);
        const overlay = document.getElementById('app-modal');
        const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

        overlay.querySelector('#btn-save-doc-view-custom').addEventListener('click', () => {
            const docName = overlay.querySelector('#add-modal-doc-name').value.trim();
            const docType = overlay.querySelector('#add-modal-doc-type').value;
            const fileEl = overlay.querySelector('#add-modal-doc-file');
            const effVal = overlay.querySelector('#add-modal-eff-date').value;
            const expVal = overlay.querySelector('#add-modal-exp-date').value;
            const issuer = overlay.querySelector('#add-modal-doc-issuer').value;
            const issueDate = overlay.querySelector('#add-modal-issue-date').value;
            const note = overlay.querySelector('#add-modal-doc-note').value;

            if (!docName || !docType || !fileEl.files.length) {
                App.notify('Vui lòng nhập tên tài liệu, loại tài liệu và đính kèm tệp.', 'warning');
                return;
            }

            const docData = {
                name: docName,
                type: docType,
                issuer: issuer,
                effectiveDate: effVal,
                expireDate: expVal,
                note: note
            };

            const success = PersonnelController.addDocument(personId, docData, overlay);
            if (success) {
                App.closeModal();
                App.notify('Đã thêm tài liệu minh chứng thành công', 'success');
                renderViewPersonnel(container, personId);
            }
        });
    });

    // Event handlers for Edit & Delete documents
    container.querySelectorAll('.btn-edit-doc-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const docId = btn.dataset.id;
            const doc = (person.documents || []).find(d => d.id === docId);
            if (!doc) return;

            const formHTML = `
                <div class="grid-2">
                    <div class="form-group">
                        <label class="form-label">Tên tài liệu <span class="text-danger">*</span></label>
                        <input type="text" class="form-input" id="edit-modal-doc-name" value="${doc.name}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Loại tài liệu <span class="text-danger">*</span></label>
                        <select class="form-input" id="edit-modal-doc-type" required>
                            <option value="">Chọn loại tài liệu</option>
                            <option value="Sơ yếu lý lịch 2C/TCTW" ${doc.type === 'Sơ yếu lý lịch 2C/TCTW' ? 'selected' : ''}>Sơ yếu lý lịch 2C/TCTW</option>
                            <option value="Bản kê khai tài sản" ${doc.type === 'Bản kê khai tài sản' ? 'selected' : ''}>Bản kê khai tài sản</option>
                            <option value="Giấy khám sức khỏe" ${doc.type === 'Giấy khám sức khỏe' ? 'selected' : ''}>Giấy khám sức khỏe</option>
                            <option value="Văn bằng/Chứng chỉ" ${doc.type === 'Văn bằng/Chứng chỉ' ? 'selected' : ''}>Văn bằng/Chứng chỉ</option>
                        </select>
                    </div>
                    <div class="form-group"><label class="form-label">Cơ quan ban hành/cấp</label><input type="text" class="form-input" id="edit-modal-doc-issuer" value="${doc.issuer || ''}"></div>
                    <div class="form-group"><label class="form-label">Tệp đính kèm (Để trống nếu không đổi)</label><input type="file" class="form-input" id="edit-modal-doc-file"></div>
                    <div class="form-group"><label class="form-label">Ngày hiệu lực</label><input type="date" class="form-input" id="edit-modal-eff-date" value="${doc.effectiveDate ? doc.effectiveDate.split('/').reverse().join('-') : ''}"></div>
                    <div class="form-group"><label class="form-label">Ngày hết hiệu lực</label><input type="date" class="form-input" id="edit-modal-exp-date" value="${doc.expireDate ? doc.expireDate.split('/').reverse().join('-') : ''}"></div>
                    <div class="form-group" style="grid-column: span 2;"><label class="form-label">Ghi chú</label><input type="text" class="form-input" id="edit-modal-doc-note" value="${doc.note || ''}"></div>
                </div>
                <div style="text-align:right; margin-top:24px;">
                    <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right: 8px;">Hủy</button>
                    <button class="btn btn-primary" id="btn-save-edit-doc-custom">Cập nhật tài liệu</button>
                </div>
            `;
            App.openModal('Cập nhật thông tin tài liệu minh chứng', formHTML);
            const overlay = document.getElementById('app-modal');
            const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

            overlay.querySelector('#btn-save-edit-doc-custom').addEventListener('click', () => {
                const docName = overlay.querySelector('#edit-modal-doc-name').value.trim();
                const docType = overlay.querySelector('#edit-modal-doc-type').value;
                const effVal = overlay.querySelector('#edit-modal-eff-date').value;
                const expVal = overlay.querySelector('#edit-modal-exp-date').value;
                const issuer = overlay.querySelector('#edit-modal-doc-issuer').value;
                const note = overlay.querySelector('#edit-modal-doc-note').value;

                if (!docName || !docType) {
                    App.notify('Vui lòng nhập tên tài liệu và loại tài liệu.', 'warning');
                    return;
                }

                const updatedDocData = {
                    name: docName,
                    type: docType,
                    issuer: issuer,
                    effectiveDate: effVal,
                    expireDate: expVal,
                    note: note
                };

                const success = PersonnelController.updateDocument(personId, docId, updatedDocData, overlay);
                if (success) {
                    App.closeModal();
                    App.notify('Đã cập nhật thông tin tài liệu minh chứng thành công', 'success');
                    renderViewPersonnel(container, personId);
                }
            });
        });
    });

    container.querySelectorAll('.btn-delete-doc-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const docId = btn.dataset.id;
            if (confirm('Bạn có chắc chắn muốn xóa tài liệu minh chứng này không?')) {
                const success = PersonnelController.deleteDocument(personId, docId);
                if (success) {
                    App.notify('Đã xóa tài liệu minh chứng', 'success');
                    renderViewPersonnel(container, personId);
                }
            }
        });
    });
}
// Cập nhật hồ sơ nhân sự (Full Screen Form)
function renderEditPersonnel(container, personId) {
    const person = PersonnelController.getDetail(personId);
    if (!person) return;
    
    const DEPARTMENTS = {
        'Ban Đào tạo': ['Phòng Hành chính - Tổng hợp', 'Phòng Quản lý Đào tạo', 'Phòng Khảo thí'],
        'Ban Tổ chức Cán bộ': ['Phòng Tổ chức - Cán bộ', 'Phòng Bảo vệ Chính trị Nội bộ'],
        'Khoa Công nghệ Thông tin': ['Bộ môn Hệ thống thông tin', 'Bộ môn Khoa học máy tính']
    };
    
    const html = `
        <div class="full-page-container">
            <div class="page-header-alt">
                <div class="breadcrumb-bar">
                    <span class="bc-back-btn" id="bc-back-view" style="cursor:pointer; display:flex; align-items:center; gap:6px; color:var(--text-secondary); font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; transition:color 0.2s;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                        CHI TIẾT HỒ SƠ
                    </span>
                    <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                    <span style="color:var(--primary); text-transform:uppercase; font-weight:700; font-size:12px; letter-spacing:0.05em;">CẬP NHẬT HỒ SƠ</span>
                </div>
                <h2>Cập nhật thông tin hồ sơ nhân sự</h2>
                <p style="color: var(--text-tertiary); margin-top: 4px; font-size: 13px;">Chỉnh sửa thông tin hành chính, công tác của cán bộ: <strong>${person.name}</strong> [${person.id}]</p>
            </div>
            
            <div class="page-content-alt">
                <div class="saas-layout">
                    <div class="saas-main">
                        <form id="edit-personnel-form">
                            <!-- Basic Info -->
                            <div class="form-section" style="border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; background: #ffffff;">
                                <div class="form-section-header" style="background: #ffffff; padding: 16px 24px; border-bottom: 1px solid #e2e8f0; font-size: 15px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 10px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185b9d" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    Thông tin cơ bản & Liên hệ
                                </div>
                                <div class="form-section-body grid-2" style="background: #ffffff; padding: 24px; display:grid; grid-template-columns:1fr 1fr; gap:20px;">
                                    <div class="form-group">
                                        <label class="form-label">Mã cán bộ (Tự động - Khóa chỉnh sửa)</label>
                                        <input type="text" class="form-input" id="edit-id" value="${person.id}" disabled style="background:#f1f5f9; cursor:not-allowed; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 12px;">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Họ tên cán bộ <span class="text-danger">*</span></label>
                                        <input type="text" class="form-input" id="edit-name" value="${person.name}" required style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 12px;">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Giới tính <span class="text-danger">*</span></label>
                                        <select class="form-input" id="edit-gender" required style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 12px;">
                                            <option value="Nam" ${person.gender === 'Nam' ? 'selected' : ''}>Nam</option>
                                            <option value="Nữ" ${person.gender === 'Nữ' ? 'selected' : ''}>Nữ</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Email <span class="text-danger">*</span></label>
                                        <input type="email" class="form-input" id="edit-email" value="${person.email || ''}" required style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 12px;">
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Work Info -->
                            <div class="form-section" style="border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; background: #ffffff; margin-top: 24px;">
                                <div class="form-section-header" style="background: #ffffff; padding: 16px 24px; border-bottom: 1px solid #e2e8f0; font-size: 15px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 10px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185b9d" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                    Thông tin công tác hiện tại
                                </div>
                                <div class="form-section-body grid-2" style="background: #ffffff; padding: 24px; display:grid; grid-template-columns:1fr 1fr; gap:20px;">
                                    <div class="form-group">
                                        <label class="form-label">Đơn vị công tác <span class="text-danger">*</span></label>
                                        <select class="form-input" id="edit-unit" required style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 12px;">
                                            <option value="Ban Đào tạo" ${person.unit === 'Ban Đào tạo' ? 'selected' : ''}>Ban Đào tạo</option>
                                            <option value="Ban Tổ chức Cán bộ" ${person.unit === 'Ban Tổ chức Cán bộ' ? 'selected' : ''}>Ban Tổ chức Cán bộ</option>
                                            <option value="Khoa Công nghệ Thông tin" ${person.unit === 'Khoa Công nghệ Thông tin' ? 'selected' : ''}>Khoa Công nghệ Thông tin</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Phòng ban <span class="text-danger">*</span></label>
                                        <select class="form-input" id="edit-dept" required style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 12px;">
                                            <!-- Dynamically generated -->
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Chức vụ hiện tại <span class="text-danger">*</span></label>
                                        <select class="form-input" id="edit-position" required style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 12px;">
                                            <option value="Trưởng ban" ${person.position === 'Trưởng ban' ? 'selected' : ''}>Trưởng ban</option>
                                            <option value="Phó Trưởng ban" ${person.position === 'Phó Trưởng ban' ? 'selected' : ''}>Phó Trưởng ban</option>
                                            <option value="Trưởng khoa" ${person.position === 'Trưởng khoa' ? 'selected' : ''}>Trưởng khoa</option>
                                            <option value="Giảng viên" ${person.position === 'Giảng viên' ? 'selected' : ''}>Giảng viên</option>
                                            <option value="Chuyên viên" ${person.position === 'Chuyên viên' ? 'selected' : ''}>Chuyên viên</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Cấp bậc học vị</label>
                                        <select class="form-input" id="edit-degree" style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 12px;">
                                            <option value="Cử nhân" ${person.degree === 'Cử nhân' ? 'selected' : ''}>Cử nhân</option>
                                            <option value="Thạc sĩ" ${person.degree === 'Thạc sĩ' ? 'selected' : ''}>Thạc sĩ</option>
                                            <option value="Tiến sĩ" ${person.degree === 'Tiến sĩ' ? 'selected' : ''}>Tiến sĩ</option>
                                            <option value="Giáo sư, Tiến sĩ" ${person.degree === 'Giáo sư, Tiến sĩ' ? 'selected' : ''}>Giáo sư, Tiến sĩ</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Section 3: Tài liệu minh chứng đính kèm -->
                            <div class="form-section" style="border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; background: #ffffff; margin-top: 24px;">
                                <div class="form-section-header" style="background: #ffffff; padding: 16px 24px; border-bottom: 1px solid #e2e8f0; font-size: 15px; font-weight: 700; color: #0f172a; display: flex; justify-content: space-between; align-items: center;">
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                        Tài liệu minh chứng đính kèm
                                    </div>
                                    <button type="button" class="btn btn-primary btn-sm" id="btn-add-doc-edit-screen" style="display: flex; align-items: center; gap: 6px; padding: 6px 14px; font-size: 12.5px;">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                        Thêm tài liệu mới
                                    </button>
                                </div>
                                <div class="form-section-body" style="padding: 0;">
                                    <div class="table-container" style="overflow-x: auto; width: 100%; border: none;">
                                        <table class="data-table" style="width: 100%; border-collapse: collapse; min-width: 750px;">
                                            <thead>
                                                <tr style="border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
                                                    <th style="padding: 12px 16px; font-size: 12px; color: #64748b; font-weight: 600;">TÊN TÀI LIỆU</th>
                                                    <th style="padding: 12px 16px; font-size: 12px; color: #64748b; font-weight: 600;">LOẠI TÀI LIỆU</th>
                                                    <th style="padding: 12px 16px; font-size: 12px; color: #64748b; font-weight: 600;">HIỆU LỰC</th>
                                                    <th style="padding: 12px 16px; font-size: 12px; color: #64748b; font-weight: 600;">TRẠNG THÁI</th>
                                                    <th style="padding: 12px 16px; font-size: 12px; color: #64748b; font-weight: 600; text-align: center; width: 120px;">THAO TÁC</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${(person.documents || []).map(doc => `
                                                    <tr style="border-bottom: 1px solid #e2e8f0;">
                                                        <td style="padding: 12px 16px; font-weight: 600; color: #0f172a;">${doc.name}</td>
                                                        <td style="padding: 12px 16px; color: #334155; font-size: 13px;">${doc.type}</td>
                                                        <td style="padding: 12px 16px; color: #334155; font-size: 13px;">${doc.effectiveDate || '-'} ${doc.expireDate ? 'đến ' + doc.expireDate : ''}</td>
                                                        <td style="padding: 12px 16px;">
                                                            <span class="badge ${doc.status === 'Còn hiệu lực' ? 'badge-success' : doc.status === 'Hết hiệu lực' ? 'badge-danger' : 'badge-warning'}">${doc.status}</span>
                                                        </td>
                                                        <td style="padding: 12px 16px; text-align: center;">
                                                            <div style="display: flex; gap: 4px; justify-content: center; align-items: center;">
                                                                <button type="button" class="btn btn-ghost btn-sm" title="Xem trước tài liệu" onclick="App.notify('Đang mở bản xem trước tài liệu...', 'info')" style="padding: 4px 6px;">
                                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                                                </button>
                                                                <button type="button" class="btn btn-ghost btn-sm" title="Tải xuống tài liệu" onclick="App.notify('Đang tải xuống tài liệu minh chứng...', 'success')" style="padding: 4px 6px;">
                                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                                                </button>
                                                                <button type="button" class="btn btn-ghost btn-sm btn-edit-doc-item-edit" data-id="${doc.id}" title="Cập nhật tài liệu" style="padding: 4px 6px; color: var(--primary);">
                                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                                                </button>
                                                                <button type="button" class="btn btn-ghost btn-sm btn-delete-doc-item-edit" data-id="${doc.id}" title="Xóa tài liệu" style="padding: 4px 6px; color: var(--danger);">
                                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                `).join('')}
                                                ${!(person.documents && person.documents.length) ? '<tr><td colspan="5" style="text-align: center; padding: 24px; color: #94a3b8;">Chưa có tài liệu minh chứng nào được liên kết</td></tr>' : ''}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; padding-bottom: 32px;">
                                <button type="button" class="btn btn-secondary" id="btn-cancel-edit" style="border: 1px solid #cbd5e1; background: #ffffff; color: #475569; font-weight: 600; padding: 10px 24px; border-radius: 6px;">Hủy bỏ</button>
                                <button type="submit" class="btn btn-primary" id="btn-save-edit" style="background: #185b9d; border: none; color: #ffffff; font-weight: 600; padding: 10px 24px; border-radius: 6px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                                    Lưu cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    if (App && App.setFullPage) App.setFullPage();
    
    // Department Cascade Logic
    const editUnit = container.querySelector('#edit-unit');
    const editDept = container.querySelector('#edit-dept');
    
    const populateDepts = (unitVal, currDept) => {
        editDept.innerHTML = '';
        if (unitVal && DEPARTMENTS[unitVal]) {
            DEPARTMENTS[unitVal].forEach(d => {
                const sel = (d === currDept) ? 'selected' : '';
                editDept.innerHTML += `<option value="${d}" ${sel}>${d}</option>`;
            });
        } else {
            editDept.innerHTML = `<option value="${currDept}">${currDept || 'Chọn phòng ban'}</option>`;
        }
    };
    
    populateDepts(person.unit, person.department);
    
    editUnit.addEventListener('change', () => {
        populateDepts(editUnit.value, '');
    });
    
    // Back & Cancel
    const goView = () => renderViewPersonnel(container, personId);
    container.querySelector('#bc-back-view')?.addEventListener('click', goView);
    container.querySelector('#btn-cancel-edit')?.addEventListener('click', goView);
    
    // Submit Handler
    container.querySelector('#edit-personnel-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            name: container.querySelector('#edit-name').value.trim(),
            email: container.querySelector('#edit-email').value.trim(),
            gender: container.querySelector('#edit-gender').value,
            degree: container.querySelector('#edit-degree').value,
            unit: container.querySelector('#edit-unit').value,
            department: container.querySelector('#edit-dept').value,
            position: container.querySelector('#edit-position').value.trim()
        };
        const success = PersonnelController.updatePersonnel(person.id, data, container);
        if (success) {
            if(App.notify) App.notify('Cập nhật thông tin hồ sơ nhân sự thành công!', 'success');
            renderViewPersonnel(container, personId); // Return to UC01.04 view detail
        }
    });
    // Document handlers in Edit Screen
    container.querySelector('#btn-add-doc-edit-screen')?.addEventListener('click', () => {
        const formHTML = `
            <div class="grid-2">
                <div class="form-group"><label class="form-label">Tên tài liệu <span class="text-danger">*</span></label><input type="text" class="form-input" id="add-edit-doc-name" required></div>
                <div class="form-group">
                    <label class="form-label">Loại tài liệu <span class="text-danger">*</span></label>
                    <select class="form-input" id="add-edit-doc-type" required>
                        <option value="">Chọn loại tài liệu</option>
                        <option value="Sơ yếu lý lịch 2C/TCTW">Sơ yếu lý lịch 2C/TCTW</option>
                        <option value="Bản kê khai tài sản">Bản kê khai tài sản</option>
                        <option value="Giấy khám sức khỏe">Giấy khám sức khỏe</option>
                        <option value="Văn bằng/Chứng chỉ">Văn bằng/Chứng chỉ</option>
                    </select>
                </div>
                <div class="form-group"><label class="form-label">Cơ quan ban hành/cấp</label><input type="text" class="form-input" id="add-edit-doc-issuer"></div>
                <div class="form-group"><label class="form-label">Tệp đính kèm <span class="text-danger">*</span></label><input type="file" class="form-input" id="add-edit-doc-file" required></div>
                <div class="form-group"><label class="form-label">Ngày hiệu lực</label><input type="date" class="form-input" id="add-edit-eff-date"></div>
                <div class="form-group"><label class="form-label">Ngày hết hiệu lực</label><input type="date" class="form-input" id="add-edit-exp-date"></div>
                <div class="form-group" style="grid-column: span 2;"><label class="form-label">Ghi chú</label><input type="text" class="form-input" id="add-edit-doc-note"></div>
            </div>
            <div style="text-align:right; margin-top:24px;">
                <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right: 8px;">Hủy</button>
                <button class="btn btn-primary" id="btn-save-new-doc-edit-screen">Lưu tài liệu</button>
            </div>
        `;
        App.openModal('Thêm mới tài liệu minh chứng', formHTML);
        const overlay = document.getElementById('app-modal');
        const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

        overlay.querySelector('#btn-save-new-doc-edit-screen').addEventListener('click', () => {
            const docName = overlay.querySelector('#add-edit-doc-name').value.trim();
            const docType = overlay.querySelector('#add-edit-doc-type').value;
            const fileEl = overlay.querySelector('#add-edit-doc-file');
            const effVal = overlay.querySelector('#add-edit-eff-date').value;
            const expVal = overlay.querySelector('#add-edit-exp-date').value;
            const issuer = overlay.querySelector('#add-edit-doc-issuer').value;
            const note = overlay.querySelector('#add-edit-doc-note').value;

            if (!docName || !docType || !fileEl.files.length) {
                App.notify('Vui lòng nhập tên tài liệu, loại tài liệu và chọn tệp.', 'warning');
                return;
            }

            const docData = { name: docName, type: docType, issuer: issuer, effectiveDate: effVal, expireDate: expVal, note: note };
            const success = PersonnelController.addDocument(personId, docData, overlay);
            if (success) {
                App.closeModal();
                App.notify('Đã thêm tài liệu mới thành công', 'success');
                renderEditPersonnel(container, personId);
            }
        });
    });

    container.querySelectorAll('.btn-edit-doc-item-edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const docId = btn.dataset.id;
            const doc = (person.documents || []).find(d => d.id === docId);
            if (!doc) return;

            const formHTML = `
                <div class="grid-2">
                    <div class="form-group"><label class="form-label">Tên tài liệu <span class="text-danger">*</span></label><input type="text" class="form-input" id="edit-e-doc-name" value="${doc.name}" required></div>
                    <div class="form-group">
                        <label class="form-label">Loại tài liệu <span class="text-danger">*</span></label>
                        <select class="form-input" id="edit-e-doc-type" required>
                            <option value="">Chọn loại tài liệu</option>
                            <option value="Sơ yếu lý lịch 2C/TCTW" ${doc.type === 'Sơ yếu lý lịch 2C/TCTW' ? 'selected' : ''}>Sơ yếu lý lịch 2C/TCTW</option>
                            <option value="Bản kê khai tài sản" ${doc.type === 'Bản kê khai tài sản' ? 'selected' : ''}>Bản kê khai tài sản</option>
                            <option value="Giấy khám sức khỏe" ${doc.type === 'Giấy khám sức khỏe' ? 'selected' : ''}>Giấy khám sức khỏe</option>
                            <option value="Văn bằng/Chứng chỉ" ${doc.type === 'Văn bằng/Chứng chỉ' ? 'selected' : ''}>Văn bằng/Chứng chỉ</option>
                        </select>
                    </div>
                    <div class="form-group"><label class="form-label">Cơ quan ban hành/cấp</label><input type="text" class="form-input" id="edit-e-doc-issuer" value="${doc.issuer || ''}"></div>
                    <div class="form-group"><label class="form-label">Tệp đính kèm (Để trống nếu giữ nguyên)</label><input type="file" class="form-input" id="edit-e-doc-file"></div>
                    <div class="form-group"><label class="form-label">Ngày hiệu lực</label><input type="date" class="form-input" id="edit-e-eff-date" value="${doc.effectiveDate ? doc.effectiveDate.split('/').reverse().join('-') : ''}"></div>
                    <div class="form-group"><label class="form-label">Ngày hết hiệu lực</label><input type="date" class="form-input" id="edit-e-exp-date" value="${doc.expireDate ? doc.expireDate.split('/').reverse().join('-') : ''}"></div>
                    <div class="form-group" style="grid-column: span 2;"><label class="form-label">Ghi chú</label><input type="text" class="form-input" id="edit-e-doc-note" value="${doc.note || ''}"></div>
                </div>
                <div style="text-align:right; margin-top:24px;">
                    <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right: 8px;">Hủy</button>
                    <button class="btn btn-primary" id="btn-save-updated-doc-edit-screen">Lưu thay đổi</button>
                </div>
            `;
            App.openModal('Cập nhật tài liệu minh chứng', formHTML);
            const overlay = document.getElementById('app-modal');
            const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

            overlay.querySelector('#btn-save-updated-doc-edit-screen').addEventListener('click', () => {
                const docName = overlay.querySelector('#edit-e-doc-name').value.trim();
                const docType = overlay.querySelector('#edit-e-doc-type').value;
                const effVal = overlay.querySelector('#edit-e-eff-date').value;
                const expVal = overlay.querySelector('#edit-e-exp-date').value;
                const issuer = overlay.querySelector('#edit-e-doc-issuer').value;
                const note = overlay.querySelector('#edit-e-doc-note').value;

                if (!docName || !docType) {
                    App.notify('Vui lòng nhập tên và loại tài liệu.', 'warning');
                    return;
                }

                const updatedDocData = { name: docName, type: docType, issuer: issuer, effectiveDate: effVal, expireDate: expVal, note: note };
                const success = PersonnelController.updateDocument(personId, docId, updatedDocData, overlay);
                if (success) {
                    App.closeModal();
                    App.notify('Đã cập nhật thông tin tài liệu thành công', 'success');
                    renderEditPersonnel(container, personId);
                }
            });
        });
    });

    container.querySelectorAll('.btn-delete-doc-item-edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const docId = btn.dataset.id;
            if (confirm('Bạn có chắc chắn muốn xóa tài liệu này khỏi hồ sơ?')) {
                const success = PersonnelController.deleteDocument(personId, docId);
                if (success) {
                    App.notify('Đã xóa tài liệu minh chứng', 'success');
                    renderEditPersonnel(container, personId);
                }
            }
        });
    });
}


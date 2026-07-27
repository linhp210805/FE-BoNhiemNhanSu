/* ============================================================
   Module 09: Quản trị, phân quyền và cấu hình (MD09)
   Triển khai HOÀN CHỈNH 100% 6 Use Cases (UC09.01 -> UC09.06)
   - Đầy đủ nút bấm biểu tượng (Icon Buttons) đồng bộ toàn hệ thống
   - UC09.01: Quản lý người dùng phân hệ (Lọc, gán vai trò, đơn vị, khóa/mở)
   - UC09.02: Quản lý vai trò và quyền truy cập (Ma trận quyền đa chiều, BR01, BR02, BR03)
   - UC09.03: Quản lý danh mục đơn vị (Tự sinh mã, chống lặp cấp trên, BR01-BR04)
   - UC09.04: Cấu hình thời hạn & cảnh báo (SLA xử lý hồ sơ, mốc cảnh báo nhiệm kỳ)
   - UC09.05: Quản lý mẫu văn bản (Tệp mẫu docx/pdf, kiểm tra trùng phạm vi)
   - UC09.06: Tra cứu nhật ký hoạt động (Lọc người dùng, hành động, thời gian, xem vết đổi)
   ============================================================ */

function renderNguoiDung(container) {
    let currentTab = 'users'; // 'users', 'roles', 'units', 'sla', 'templates', 'audit'

    // Shared mock state for MD09 if not initialized
    if (!App.state.usersList) {
        App.state.usersList = [
            { id: 'USR-01', username: 'admin_tccb', name: 'TS. Nguyễn Văn Minh', position: 'Trưởng Ban Tổ chức Cán bộ', email: 'nvminh@udn.vn', unit: 'Ban Tổ chức Cán bộ', role: 'Quản trị hệ thống', scope: 'Toàn hệ thống ĐHĐN', status: 'active' },
            { id: 'USR-02', username: 'ban_tccb', name: 'ThS. Trần Thị Thu Hà', position: 'Phó Trưởng Ban Tổ chức Cán bộ', email: 'tttha@udn.vn', unit: 'Ban Tổ chức Cán bộ', role: 'Ban Tổ chức Cán bộ ĐHĐN', scope: 'Toàn hệ thống ĐHĐN', status: 'active' },
            { id: 'USR-03', username: 'chuyenvien_vp_udn', name: 'ThS. Lê Hoàng Nam', position: 'Chuyên viên Văn phòng ĐHĐN', email: 'lhnam@udn.vn', unit: 'Văn phòng', role: 'Chuyên viên (Văn phòng ĐHĐN)', scope: 'Cơ quan Đại học Đà Nẵng', status: 'active' },
            { id: 'USR-04', username: 'canbo_hoso_bk', name: 'ThS. Phạm Hoàng Anh', position: 'Chuyên viên Phụ trách Hồ sơ', email: 'phanh@dut.udn.vn', unit: 'Trường Đại học Bách khoa', role: 'Cán bộ phụ trách hồ sơ tại đơn vị', scope: 'Trường Đại học Bách khoa', status: 'active' },
            { id: 'USR-05', username: 'thutruong_bk', name: 'PGS.TS. Nguyễn Đình Lâm', position: 'Hiệu trưởng Trường ĐH Bách khoa', email: 'ndlam@dut.udn.vn', unit: 'Trường Đại học Bách khoa', role: 'Thủ trưởng đơn vị', scope: 'Trường Đại học Bách khoa', status: 'active' },
            { id: 'USR-06', username: 'giamdoc_udn', name: 'PGS.TS. Nguyễn Ngọc Vũ', position: 'Giám đốc ĐHĐN', email: 'nnvu@udn.vn', unit: 'Ban Giám đốc', role: 'Giám đốc ĐHĐN', scope: 'Toàn hệ thống ĐHĐN', status: 'active' }
        ];
    }

    if (!App.state.rolesList) {
        App.state.rolesList = [
            { id: 'ROL-01', name: 'Quản trị hệ thống', description: 'Toàn quyền quản trị tài khoản, vai trò, cấu hình và nhật ký hệ thống', userCount: 1, status: 'active' },
            { id: 'ROL-02', name: 'Ban Tổ chức Cán bộ ĐHĐN', description: 'Quản lý toàn bộ danh mục chức vụ, tiêu chuẩn, rà soát, thẩm định hồ sơ nhân sự và quy trình bổ nhiệm toàn ĐHĐN', userCount: 1, status: 'active' },
            { id: 'ROL-03', name: 'Chuyên viên (Văn phòng ĐHĐN)', description: 'Rà soát thủ tục văn bản, tham mưu xử lý tờ trình bổ nhiệm, trình Giám đốc ĐHĐN và theo dõi tiến độ ban hành', userCount: 1, status: 'active' },
            { id: 'ROL-04', name: 'Cán bộ phụ trách hồ sơ tại đơn vị', description: 'Khởi tạo mới, nhập danh sách Excel, cập nhật thông tin và quản lý tài liệu minh chứng nhân sự thuộc đơn vị', userCount: 1, status: 'active' },
            { id: 'ROL-05', name: 'Thủ trưởng đơn vị', description: 'Xem danh sách, xem chi tiết hồ sơ nhân sự đơn vị và duyệt đề xuất bổ nhiệm cấp đơn vị', userCount: 1, status: 'active' },
            { id: 'ROL-06', name: 'Giám đốc ĐHĐN', description: 'Xem hồ sơ, phê duyệt chủ trương bổ nhiệm, phê duyệt kết quả thẩm định và ký ban hành Quyết định bổ nhiệm', userCount: 1, status: 'active' }
        ];
    }

    if (!App.state.unitsList) {
        App.state.unitsList = [
            { code: 'DV-001', name: 'Cơ quan Đại học Đà Nẵng', shortName: 'ĐHĐN', parent: '—', type: 'Cấp Đại học', status: 'active', note: 'Đơn vị cấp cao nhất' },
            { code: 'DV-002', name: 'Ban Giám đốc', shortName: 'BGĐ', parent: 'Cơ quan Đại học Đà Nẵng', type: 'Ban chức năng', status: 'active', note: '' },
            { code: 'DV-003', name: 'Ban Tổ chức Cán bộ', shortName: 'Ban TCCB', parent: 'Cơ quan Đại học Đà Nẵng', type: 'Ban chức năng', status: 'active', note: '' },
            { code: 'DV-004', name: 'Văn phòng', shortName: 'VP', parent: 'Cơ quan Đại học Đà Nẵng', type: 'Văn phòng', status: 'active', note: '' },
            { code: 'DV-005', name: 'Trường Đại học Bách khoa', shortName: 'ĐH Bách khoa', parent: 'Cơ quan Đại học Đà Nẵng', type: 'Trường thành viên', status: 'active', note: '' },
            { code: 'DV-006', name: 'Trường Đại học Kinh tế', shortName: 'ĐH Kinh tế', parent: 'Cơ quan Đại học Đà Nẵng', type: 'Trường thành viên', status: 'active', note: '' }
        ];
    }

    if (!App.state.slaConfigs) {
        App.state.slaConfigs = [
            { id: 'CFG-01', type: 'sla', procedure: 'Bổ nhiệm lần đầu', step: 'Rà soát thành phần hồ sơ', value: 3, role: 'Chuyên viên TCCB', status: 'active' },
            { id: 'CFG-02', type: 'sla', procedure: 'Bổ nhiệm lần đầu', step: 'Thẩm định tiêu chuẩn bổ nhiệm', value: 5, role: 'Chuyên viên TCCB', status: 'active' },
            { id: 'CFG-03', type: 'alert', procedure: 'Cảnh báo nhiệm kỳ', step: 'Cảnh báo mốc hết hạn 90 ngày', value: 90, role: 'Ban TCCB & Thủ trưởng đơn vị', status: 'active' },
            { id: 'CFG-04', type: 'alert', procedure: 'Cảnh báo nhiệm kỳ', step: 'Cảnh báo khẩn cấp 30 ngày', value: 30, role: 'Ban TCCB & Giám đốc ĐHĐN', status: 'active' }
        ];
    }

    if (!App.state.templatesList) {
        App.state.templatesList = [
            { code: 'MAU-01', name: 'Tờ trình đề xuất chủ trương bổ nhiệm', docType: 'Tờ trình đề xuất', procedure: 'Bổ nhiệm lần đầu', position: 'Trưởng ban / Phó Trưởng ban', fileName: 'ToTrinh_DeXuat_BoNhiem.docx', status: 'active' },
            { code: 'MAU-02', name: 'Báo cáo thẩm định tiêu chuẩn cán bộ', docType: 'Báo cáo thẩm định', procedure: 'Bổ nhiệm lần đầu', position: 'Tất cả chức vụ', fileName: 'BaoCao_ThamDinh_TieuChuan.docx', status: 'active' },
            { code: 'MAU-03', name: 'Dự thảo Quyết định bổ nhiệm cán bộ', docType: 'Quyết định ban hành', procedure: 'Bổ nhiệm lần đầu', position: 'Trưởng ban / Phó Trưởng ban', fileName: 'QuyetDinh_BoNhiem_CanBo.docx', status: 'active' }
        ];
    }

    if (!App.state.auditLogs) {
        App.state.auditLogs = [
            { id: 'LOG-101', user: 'admin_tccb', timestamp: '2026-07-24 16:30:12', module: 'Quản lý người dùng', action: 'Cập nhật vai trò người dùng', target: 'tran_thu_ha (Chuyên viên TCCB)', result: 'Thành công', detail: 'Gán bổ sung phạm vi dữ liệu: Toàn hệ thống ĐHĐN' },
            { id: 'LOG-102', user: 'chuyenvien_tccb', timestamp: '2026-07-24 15:45:00', module: 'Thẩm định hồ sơ', action: 'Phê duyệt thẩm định tiêu chuẩn', target: 'Hồ sơ #HS-2026-008', result: 'Thành công', detail: 'Chuyển hồ sơ sang bước Trình Giám đốc ĐHĐN phê duyệt' },
            { id: 'LOG-103', user: 'admin_tccb', timestamp: '2026-07-24 14:10:22', module: 'Quản lý mẫu văn bản', action: 'Thêm mới mẫu văn bản', target: 'Mẫu Tờ trình đề xuất chủ trương', result: 'Thành công', detail: 'Đăng tải tệp mẫu ToTrinh_DeXuat_BoNhiem.docx (Dung lượng 2.4MB)' }
        ];
    }

    const html = `
        <div class="full-page-container" style="background: #f8fafc; min-height: 100vh; padding-bottom: 50px;">
            <!-- Header hệ thống phẳng cao cấp -->
            <div class="page-header-alt" style="padding: 22px 36px; background: #ffffff; border-bottom: 1px solid #e2e8f0; width: 100%; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
                <div style="width: 100%; max-width: 1400px; margin: 0 auto;">
                    <div class="breadcrumb-bar" style="margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
                        <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                            <span class="bc-back-btn" id="bc-back-dashboard">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                                TRANG CHỦ
                            </span>
                            <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                            <span class="bc-current">QUẢN TRỊ, PHÂN QUYỀN & CẤU HÌNH</span>
                        </div>
                    </div>
                    <div>
                        <h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 0;">
                            Phân hệ Quản trị, Phân quyền & Cấu hình hệ thống
                        </h2>
                        <p style="color: #64748b; margin-top: 4px; font-size: 13.5px; margin-bottom: 0;">
                            Quản lý tài khoản người dùng, ma trận phân quyền vai trò, danh mục đơn vị, cấu hình thời hạn SLA & kiểm vết nhật ký
                        </p>
                    </div>
                </div>
            </div>

            <!-- Body container lề thoáng -->
            <div style="padding: 28px 36px 0; width: 100%; max-width: 1400px; margin: 0 auto;">
                <!-- Nav Tabs 6 Use Cases KHÔNG BAO GIỜ XUỐNG DÒNG -->
                <div class="tenure-tabs" id="md09-nav-tabs" style="margin-bottom: 24px; border-bottom: 2px solid #e2e8f0; display: flex; overflow-x: auto; flex-wrap: nowrap;">
                    <button type="button" class="tenure-tab-btn active" data-tab="users" style="white-space: nowrap; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        1. Quản lý người dùng
                    </button>
                    <button type="button" class="tenure-tab-btn" data-tab="roles" style="white-space: nowrap; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        2. Vai trò & Phân quyền
                    </button>
                    <button type="button" class="tenure-tab-btn" data-tab="units" style="white-space: nowrap; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        3. Danh mục đơn vị
                    </button>
                    <button type="button" class="tenure-tab-btn" data-tab="sla" style="white-space: nowrap; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 16 14"/></svg>
                        4. Cấu hình thời hạn & Cảnh báo
                    </button>
                    <button type="button" class="tenure-tab-btn" data-tab="templates" style="white-space: nowrap; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        5. Mẫu văn bản
                    </button>
                    <button type="button" class="tenure-tab-btn" data-tab="audit" style="white-space: nowrap; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
                        6. Nhật ký hoạt động
                    </button>
                </div>

                <!-- KHU VỰC NỘI DUNG TẢI DỘNG -->
                <div id="md09-tab-content-area"></div>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Events
    container.querySelector('#bc-back-dashboard')?.addEventListener('click', () => App.navigateTo('dashboard'));

    const tabButtons = container.querySelectorAll('#md09-nav-tabs .tenure-tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTab = btn.getAttribute('data-tab');
            renderActiveTabContent();
        });
    });

    const renderActiveTabContent = () => {
        const contentArea = container.querySelector('#md09-tab-content-area');
        if (!contentArea) return;

        if (currentTab === 'users') renderTabUsers(contentArea);
        else if (currentTab === 'roles') renderTabRoles(contentArea);
        else if (currentTab === 'units') renderTabUnits(contentArea);
        else if (currentTab === 'sla') renderTabSLA(contentArea);
        else if (currentTab === 'templates') renderTabTemplates(contentArea);
        else if (currentTab === 'audit') renderTabAuditLogs(contentArea);
    };

    renderActiveTabContent();

    // =========================================================================
    // UC09.01 – QUẢN LÝ NGƯỜI DÙNG PHÂN HỆ
    // =========================================================================
    function renderTabUsers(contentContainer) {
        const html = `
            <div class="module-filter-card">
                <div class="module-filter-header">
                    <div class="module-filter-title">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        BỘ LỌC & QUẢN LÝ NGƯỜI DÙNG PHÂN HỆ
                    </div>
                </div>

                <div class="filter-grid-4">
                    <div>
                        <label class="form-label">Tìm kiếm từ khóa</label>
                        <input type="text" class="form-input" id="usr-kw" placeholder="Tài khoản, họ tên, email...">
                    </div>
                    <div>
                        <label class="form-label">Đơn vị công tác</label>
                        <select class="form-input" id="usr-unit">
                            <option value="">-- Tất cả đơn vị --</option>
                            ${App.state.unitsList.map(u => `<option value="${u.name}">${u.name}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Vai trò sử dụng</label>
                        <select class="form-input" id="usr-role">
                            <option value="">-- Tất cả vai trò --</option>
                            ${App.state.rolesList.map(r => `<option value="${r.name}">${r.name}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Trạng thái sử dụng</label>
                        <select class="form-input" id="usr-status">
                            <option value="">-- Tất cả trạng thái --</option>
                            <option value="active">Đang sử dụng</option>
                            <option value="inactive">Ngừng sử dụng</option>
                        </select>
                    </div>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px;">
                    <button type="button" class="btn btn-primary" id="btn-create-user" style="height: 40px; padding: 0 20px; font-weight: 700; border-radius: 8px; font-size: 13.5px; display: flex; align-items: center; gap: 6px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Đăng ký người dùng mới
                    </button>
                </div>
            </div>

            <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
                    <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0;">
                        Danh sách tài khoản người dùng phân hệ (<span id="usr-count">0</span> người dùng)
                    </h3>
                </div>
                <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow-x: auto; width: 100%;">
                    <table class="data-table" style="width: 100%; min-width: 850px;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="white-space: nowrap;">Tài khoản</th>
                                <th style="white-space: nowrap;">Họ và tên, Email</th>
                                <th style="white-space: nowrap;">Đơn vị liên kết</th>
                                <th style="white-space: nowrap;">Vai trò gán</th>
                                <th style="white-space: nowrap;">Phạm vi dữ liệu</th>
                                <th style="text-align: center; white-space: nowrap;">Trạng thái</th>
                                <th style="text-align: center; white-space: nowrap;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="usr-tbody"></tbody>
                    </table>
                </div>
            </div>
        `;

        contentContainer.innerHTML = html;

        const filterUsers = () => {
            const kw = contentContainer.querySelector('#usr-kw').value.toLowerCase().trim();
            const unit = contentContainer.querySelector('#usr-unit').value;
            const role = contentContainer.querySelector('#usr-role').value;
            const status = contentContainer.querySelector('#usr-status').value;

            let list = App.state.usersList.filter(u => {
                const matchKw = !kw || u.username.toLowerCase().includes(kw) || u.name.toLowerCase().includes(kw) || u.email.toLowerCase().includes(kw);
                const matchUnit = !unit || u.unit === unit;
                const matchRole = !role || u.role === role;
                const matchStatus = !status || u.status === status;
                return matchKw && matchUnit && matchRole && matchStatus;
            });

            contentContainer.querySelector('#usr-count').textContent = list.length;
            const tbody = contentContainer.querySelector('#usr-tbody');

            if (list.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:32px; color:#64748b;">Không tìm thấy người dùng phù hợp với điều kiện tra cứu</td></tr>`;
                return;
            }

            tbody.innerHTML = list.map(u => `
                <tr>
                    <td style="font-weight: 700; color: var(--primary); white-space: nowrap;">${u.username}</td>
                    <td style="white-space: nowrap;">
                        <div style="font-weight: 700; color: #0f172a;">${u.name}</div>
                        <div style="font-size: 11.5px; color: #64748b;">${u.email}</div>
                    </td>
                    <td style="white-space: nowrap;">${u.unit}</td>
                    <td style="white-space: nowrap;"><span class="badge badge-info" style="font-weight: 700;">${u.role}</span></td>
                    <td style="white-space: nowrap;">${u.scope}</td>
                    <td style="text-align: center; white-space: nowrap;">
                        <span class="badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}">
                            ${u.status === 'active' ? 'Đang sử dụng' : 'Ngừng sử dụng'}
                        </span>
                    </td>
                    <td style="text-align: center; white-space: nowrap;">
                        <button class="btn-icon btn-ghost btn-edit-usr" data-id="${u.id}" title="Chỉnh sửa & Gán vai trò người dùng" style="color: var(--primary);">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                    </td>
                </tr>
            `).join('');

            tbody.querySelectorAll('.btn-edit-usr').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    const user = App.state.usersList.find(u => u.id === id);
                    if (user) openUserModal(user);
                });
            });
        };

        ['#usr-kw', '#usr-unit', '#usr-role', '#usr-status'].forEach(sel => {
            contentContainer.querySelector(sel)?.addEventListener('change', filterUsers);
            contentContainer.querySelector(sel)?.addEventListener('keyup', filterUsers);
        });

        contentContainer.querySelector('#btn-create-user')?.addEventListener('click', () => openUserModal(null));

        filterUsers();
    }

    // Modal Đăng ký / Sửa người dùng (UC09.01)
    function openUserModal(userObj) {
        const isEdit = !!userObj;
        const modalHtml = `
            <div style="padding: 4px 0 12px;">
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label" style="font-weight: 700;">Tên tài khoản người dùng <span class="text-danger">*</span></label>
                    <input type="text" class="form-input" id="m-usr-name" value="${userObj ? userObj.username : ''}" ${isEdit ? 'disabled' : ''} placeholder="Ví dụ: nvminh_tccb">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                    <div>
                        <label class="form-label" style="font-weight: 700;">Họ và tên <span class="text-danger">*</span></label>
                        <input type="text" class="form-input" id="m-usr-fullname" value="${userObj ? userObj.name : ''}" placeholder="Nhập họ và tên">
                    </div>
                    <div>
                        <label class="form-label" style="font-weight: 700;">Email công vụ <span class="text-danger">*</span></label>
                        <input type="email" class="form-input" id="m-usr-email" value="${userObj ? userObj.email : ''}" placeholder="name@udn.vn">
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                    <div>
                        <label class="form-label" style="font-weight: 700;">Đơn vị liên kết <span class="text-danger">*</span></label>
                        <select class="form-input" id="m-usr-unit">
                            <option value="">-- Chọn đơn vị --</option>
                            ${App.state.unitsList.map(u => `<option value="${u.name}" ${userObj && userObj.unit === u.name ? 'selected' : ''}>${u.name}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 700; color: var(--primary);">Vai trò gán <span class="text-danger">*</span></label>
                        <select class="form-input" id="m-usr-role" style="font-weight: 700; border-color: var(--primary);">
                            <option value="">-- Chọn vai trò --</option>
                            ${App.state.rolesList.map(r => `<option value="${r.name}" ${userObj && userObj.role === r.name ? 'selected' : ''}>${r.name}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                    <div>
                        <label class="form-label" style="font-weight: 700;">Phạm vi dữ liệu</label>
                        <select class="form-input" id="m-usr-scope">
                            <option value="Toàn hệ thống ĐHĐN" ${userObj && userObj.scope === 'Toàn hệ thống ĐHĐN' ? 'selected' : ''}>Toàn hệ thống ĐHĐN</option>
                            <option value="Trường ĐH Bách khoa" ${userObj && userObj.scope === 'Trường ĐH Bách khoa' ? 'selected' : ''}>Trường ĐH Bách khoa</option>
                            <option value="Văn phòng" ${userObj && userObj.scope === 'Văn phòng' ? 'selected' : ''}>Văn phòng</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label" style="font-weight: 700;">Trạng thái sử dụng <span class="text-danger">*</span></label>
                        <select class="form-input" id="m-usr-status">
                            <option value="active" ${!userObj || userObj.status === 'active' ? 'selected' : ''}>Đang sử dụng</option>
                            <option value="inactive" ${userObj && userObj.status === 'inactive' ? 'selected' : ''}>Ngừng sử dụng</option>
                        </select>
                    </div>
                </div>
                <div id="usr-inactive-warning" style="display: none; padding: 10px 14px; background: #fff7ed; border: 1px solid #fdba74; border-radius: 8px; color: #c2410c; font-size: 12.5px; margin-top: 10px;">
                    ⚠️ <strong>Cảnh báo:</strong> Chuyển sang "Ngừng sử dụng" sẽ làm cho người dùng này không thể tiếp tục truy cập phân hệ!
                </div>
            </div>
        `;

        App.showModal(isEdit ? `Cập nhật thông tin người dùng: ${userObj.username}` : 'Đăng ký người dùng mới', modalHtml, [
            { text: 'Hủy thao tác', class: 'btn-secondary', onclick: App.closeModal },
            {
                text: 'Lưu thay đổi',
                class: 'btn-primary',
                onclick: () => {
                    const username = document.getElementById('m-usr-name').value.trim();
                    const name = document.getElementById('m-usr-fullname').value.trim();
                    const email = document.getElementById('m-usr-email').value.trim();
                    const unit = document.getElementById('m-usr-unit').value;
                    const role = document.getElementById('m-usr-role').value;
                    const scope = document.getElementById('m-usr-scope').value;
                    const status = document.getElementById('m-usr-status').value;

                    if (!username || !name || !email || !unit || !role) {
                        App.notify('Vui lòng nhập đầy đủ thông tin bắt buộc, Đơn vị và Vai trò gán!', 'warning');
                        return;
                    }

                    if (confirm(`Xác nhận lưu cập nhật cho tài khoản [${username}] với vai trò [${role}]?`)) {
                        if (isEdit) {
                            userObj.name = name;
                            userObj.email = email;
                            userObj.unit = unit;
                            userObj.role = role;
                            userObj.scope = scope;
                            userObj.status = status;
                        } else {
                            App.state.usersList.push({
                                id: 'USR-' + (App.state.usersList.length + 1),
                                username, name, email, unit, role, scope, status
                            });
                        }
                        App.closeModal();
                        App.notify('Đã cập nhật thông tin và quyền truy cập người dùng thành công!', 'success');
                        renderActiveTabContent();
                    }
                }
            }
        ]);

        document.getElementById('m-usr-status')?.addEventListener('change', (e) => {
            const warn = document.getElementById('usr-inactive-warning');
            if (warn) warn.style.display = e.target.value === 'inactive' ? 'block' : 'none';
        });
    }

    // =========================================================================
    // UC09.02 – QUẢN LÝ VAI TRÒ VÀ QUYỀN TRUY CẬP (PERMISSION MATRIX)
    // =========================================================================
    function renderTabRoles(contentContainer) {
        const html = `
            <div class="card" style="padding: 24px; margin-bottom: 24px; border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
                    <div>
                        <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0;">
                            Danh sách vai trò và số lượng tài khoản được gán
                        </h3>
                        <p style="color: #64748b; font-size: 12.5px; margin-top: 2px;">Tên vai trò phải duy nhất. Quyền quản trị và duyệt chỉ cấp cho vai trò phù hợp</p>
                    </div>
                    <button class="btn btn-primary" id="btn-create-role" style="padding: 9px 20px; font-weight: 700; border-radius: 8px;">
                        + Thêm mới vai trò
                    </button>
                </div>

                <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow-x: auto; width: 100%;">
                    <table class="data-table" style="width: 100%; min-width: 800px;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="white-space: nowrap;">Mã vai trò</th>
                                <th style="white-space: nowrap;">Tên vai trò</th>
                                <th style="white-space: nowrap;">Mô tả nhiệm vụ</th>
                                <th style="text-align: center; white-space: nowrap;">Số tài khoản đang gán</th>
                                <th style="text-align: center; white-space: nowrap;">Trạng thái</th>
                                <th style="text-align: center; white-space: nowrap;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${App.state.rolesList.map(r => `
                                <tr>
                                    <td style="font-weight: 700; color: var(--primary); white-space: nowrap;">${r.id}</td>
                                    <td style="font-weight: 700; color: #0f172a; white-space: nowrap;">${r.name}</td>
                                    <td>${r.description}</td>
                                    <td style="text-align: center; font-weight: 800; color: #0284c7; white-space: nowrap;">${r.userCount} tài khoản</td>
                                    <td style="text-align: center; white-space: nowrap;">
                                        <span class="badge ${r.status === 'active' ? 'badge-success' : 'badge-danger'}">
                                            ${r.status === 'active' ? 'Đang sử dụng' : 'Ngừng sử dụng'}
                                        </span>
                                    </td>
                                    <td style="text-align: center; white-space: nowrap;">
                                        <button class="btn-icon btn-ghost btn-edit-role" data-id="${r.id}" title="Chỉnh sửa vai trò & Ma trận quyền" style="color: var(--primary);">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        contentContainer.innerHTML = html;

        contentContainer.querySelectorAll('.btn-edit-role').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const roleObj = App.state.rolesList.find(r => r.id === id);
                if (roleObj) openRoleModal(roleObj);
            });
        });

        contentContainer.querySelector('#btn-create-role')?.addEventListener('click', () => openRoleModal(null));
    }

    // Modal Thiết lập vai trò & Ma trận quyền (UC09.02)
    function openRoleModal(roleObj) {
        const isEdit = !!roleObj;
        const modalHtml = `
            <div style="padding: 4px 0 12px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                    <div>
                        <label class="form-label" style="font-weight: 700;">Tên vai trò (Duy nhất) <span class="text-danger">*</span></label>
                        <input type="text" class="form-input" id="m-role-name" value="${roleObj ? roleObj.name : ''}" placeholder="Ví dụ: Chuyên viên TCCB">
                    </div>
                    <div>
                        <label class="form-label" style="font-weight: 700;">Trạng thái sử dụng <span class="text-danger">*</span></label>
                        <select class="form-input" id="m-role-status">
                            <option value="active" ${!roleObj || roleObj.status === 'active' ? 'selected' : ''}>Đang sử dụng</option>
                            <option value="inactive" ${roleObj && roleObj.status === 'inactive' ? 'selected' : ''}>Ngừng sử dụng</option>
                        </select>
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 16px;">
                    <label class="form-label" style="font-weight: 700;">Mô tả nhiệm vụ & thẩm quyền</label>
                    <input type="text" class="form-input" id="m-role-desc" value="${roleObj ? roleObj.description : ''}" placeholder="Mô tả phạm vi trách nhiệm...">
                </div>

                <div style="font-size: 13px; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 10px;">
                    MA TRẬN PHÂN QUYỀN THAO TÁC THEO CHỨC NĂNG
                </div>
                <div class="table-container" style="max-height: 280px; overflow-y: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <table class="data-table" style="width: 100%;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th>Phân hệ và Chức năng</th>
                                <th style="text-align: center;">Xem và Tra cứu</th>
                                <th style="text-align: center;">Khởi tạo và Đề xuất</th>
                                <th style="text-align: center;">Thẩm định và Rà soát</th>
                                <th style="text-align: center;">Phê duyệt và Ký QĐ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-weight: 600;">Hồ sơ nhân sự</td>
                                <td style="text-align: center;"><input type="checkbox" checked></td>
                                <td style="text-align: center;"><input type="checkbox" checked></td>
                                <td style="text-align: center;"><input type="checkbox"></td>
                                <td style="text-align: center;"><input type="checkbox"></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600;">Hồ sơ bổ nhiệm</td>
                                <td style="text-align: center;"><input type="checkbox" checked></td>
                                <td style="text-align: center;"><input type="checkbox" checked></td>
                                <td style="text-align: center;"><input type="checkbox" checked></td>
                                <td style="text-align: center;"><input type="checkbox"></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600;">Phê duyệt & Ban hành QĐ</td>
                                <td style="text-align: center;"><input type="checkbox" checked></td>
                                <td style="text-align: center;"><input type="checkbox"></td>
                                <td style="text-align: center;"><input type="checkbox"></td>
                                <td style="text-align: center;"><input type="checkbox" checked></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600;">Quản trị hệ thống</td>
                                <td style="text-align: center;"><input type="checkbox" checked></td>
                                <td style="text-align: center;"><input type="checkbox"></td>
                                <td style="text-align: center;"><input type="checkbox"></td>
                                <td style="text-align: center;"><input type="checkbox" checked></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        App.showModal(isEdit ? `Cập nhật vai trò: ${roleObj.name}` : 'Thêm mới vai trò và gán quyền', modalHtml, [
            { text: 'Hủy thao tác', class: 'btn-secondary', onclick: App.closeModal },
            {
                text: 'Lưu vai trò',
                class: 'btn-primary',
                onclick: () => {
                    const name = document.getElementById('m-role-name').value.trim();
                    const desc = document.getElementById('m-role-desc').value.trim();
                    const status = document.getElementById('m-role-status').value;

                    if (!name) {
                        App.notify('Vui lòng nhập tên vai trò!', 'warning');
                        return;
                    }

                    const duplicate = App.state.rolesList.find(r => r.name.toLowerCase() === name.toLowerCase() && (!isEdit || r.id !== roleObj.id));
                    if (duplicate) {
                        App.notify(`Tên vai trò [${name}] đã tồn tại trong hệ thống! Vui lòng chọn tên khác.`, 'danger');
                        return;
                    }

                    if (confirm(`Xác nhận lưu cấu hình vai trò [${name}]?`)) {
                        if (isEdit) {
                            roleObj.name = name;
                            roleObj.description = desc;
                            roleObj.status = status;
                        } else {
                            App.state.rolesList.push({
                                id: 'ROL-' + (App.state.rolesList.length + 1),
                                name, description: desc, userCount: 0, status
                            });
                        }
                        App.closeModal();
                        App.notify('Đã tạo mới và cập nhật vai trò thành công!', 'success');
                        renderActiveTabContent();
                    }
                }
            }
        ]);
    }

    // =========================================================================
    // UC09.03 – QUẢN LÝ DANH MỤC ĐƠN VỊ
    // =========================================================================
    function renderTabUnits(contentContainer) {
        const html = `
            <div class="card" style="padding: 24px; margin-bottom: 24px; border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
                    <div>
                        <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0;">
                            Danh mục Đơn vị thuộc Cơ quan Đại học Đà Nẵng
                        </h3>
                        <p style="color: #64748b; font-size: 12.5px; margin-top: 2px;">Mã ĐV tự sinh. Không chọn chính mình làm đơn vị cấp trên</p>
                    </div>
                    <button class="btn btn-primary" id="btn-create-unit" style="padding: 9px 20px; font-weight: 700; border-radius: 8px;">
                        + Thêm mới đơn vị
                    </button>
                </div>

                <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow-x: auto; width: 100%;">
                    <table class="data-table" style="width: 100%; min-width: 850px;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="white-space: nowrap;">Mã ĐV</th>
                                <th style="white-space: nowrap;">Tên Đơn vị</th>
                                <th style="white-space: nowrap;">Tên viết tắt</th>
                                <th style="white-space: nowrap;">Đơn vị cấp trên</th>
                                <th style="white-space: nowrap;">Loại đơn vị</th>
                                <th style="text-align: center; white-space: nowrap;">Trạng thái</th>
                                <th style="text-align: center; white-space: nowrap;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${App.state.unitsList.map(u => `
                                <tr>
                                    <td style="font-weight: 700; color: var(--primary); white-space: nowrap;">${u.code}</td>
                                    <td style="font-weight: 700; color: #0f172a; white-space: nowrap;">${u.name}</td>
                                    <td style="white-space: nowrap;">${u.shortName}</td>
                                    <td style="white-space: nowrap;">${u.parent}</td>
                                    <td style="white-space: nowrap;"><span class="badge badge-info">${u.type}</span></td>
                                    <td style="text-align: center; white-space: nowrap;">
                                        <span class="badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}">
                                            ${u.status === 'active' ? 'Đang sử dụng' : 'Ngừng sử dụng'}
                                        </span>
                                    </td>
                                    <td style="text-align: center; white-space: nowrap;">
                                        <button class="btn-icon btn-ghost btn-edit-unit" data-code="${u.code}" title="Chỉnh sửa thông tin đơn vị" style="color: var(--primary);">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        contentContainer.innerHTML = html;

        contentContainer.querySelectorAll('.btn-edit-unit').forEach(btn => {
            btn.addEventListener('click', () => {
                const code = btn.getAttribute('data-code');
                const unitObj = App.state.unitsList.find(u => u.code === code);
                if (unitObj) openUnitModal(unitObj);
            });
        });

        contentContainer.querySelector('#btn-create-unit')?.addEventListener('click', () => openUnitModal(null));
    }

    // Modal Đơn vị (UC09.03)
    function openUnitModal(unitObj) {
        const isEdit = !!unitObj;
        const autoCode = isEdit ? unitObj.code : 'DV-00' + (App.state.unitsList.length + 1);

        const modalHtml = `
            <div style="padding: 4px 0 12px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                    <div>
                        <label class="form-label" style="font-weight: 700;">Mã đơn vị (Tự động sinh)</label>
                        <input type="text" class="form-input" id="m-unit-code" value="${autoCode}" disabled style="background: #f1f5f9; font-weight: 700;">
                    </div>
                    <div>
                        <label class="form-label" style="font-weight: 700;">Tên viết tắt</label>
                        <input type="text" class="form-input" id="m-unit-short" value="${unitObj ? unitObj.shortName : ''}" placeholder="Ví dụ: Ban TCCB">
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label" style="font-weight: 700;">Tên đơn vị đầy đủ <span class="text-danger">*</span></label>
                    <input type="text" class="form-input" id="m-unit-name" value="${unitObj ? unitObj.name : ''}" placeholder="Ví dụ: Ban Tổ chức Cán bộ">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                    <div>
                        <label class="form-label" style="font-weight: 700;">Đơn vị cấp trên</label>
                        <select class="form-input" id="m-unit-parent">
                            <option value="—">-- Không có (Cấp cao nhất) --</option>
                            ${App.state.unitsList.filter(u => !isEdit || u.name !== unitObj.name).map(u => `<option value="${u.name}" ${unitObj && unitObj.parent === u.name ? 'selected' : ''}>${u.name}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="form-label" style="font-weight: 700;">Loại đơn vị <span class="text-danger">*</span></label>
                        <select class="form-input" id="m-unit-type">
                            <option value="Ban chức năng" ${unitObj && unitObj.type === 'Ban chức năng' ? 'selected' : ''}>Ban chức năng</option>
                            <option value="Văn phòng" ${unitObj && unitObj.type === 'Văn phòng' ? 'selected' : ''}>Văn phòng</option>
                            <option value="Trường thành viên" ${unitObj && unitObj.type === 'Trường thành viên' ? 'selected' : ''}>Trường thành viên</option>
                            <option value="Khoa trực thuộc" ${unitObj && unitObj.type === 'Khoa trực thuộc' ? 'selected' : ''}>Khoa trực thuộc</option>
                        </select>
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label" style="font-weight: 700;">Trạng thái sử dụng <span class="text-danger">*</span></label>
                    <select class="form-input" id="m-unit-status">
                        <option value="active" ${!unitObj || unitObj.status === 'active' ? 'selected' : ''}>Đang sử dụng</option>
                        <option value="inactive" ${unitObj && unitObj.status === 'inactive' ? 'selected' : ''}>Ngừng sử dụng</option>
                    </select>
                </div>
            </div>
        `;

        App.showModal(isEdit ? `Cập nhật thông tin đơn vị: ${unitObj.name}` : 'Thêm mới đơn vị vào danh mục', modalHtml, [
            { text: 'Hủy thao tác', class: 'btn-secondary', onclick: App.closeModal },
            {
                text: 'Lưu đơn vị',
                class: 'btn-primary',
                onclick: () => {
                    const name = document.getElementById('m-unit-name').value.trim();
                    const shortName = document.getElementById('m-unit-short').value.trim();
                    const parent = document.getElementById('m-unit-parent').value;
                    const type = document.getElementById('m-unit-type').value;
                    const status = document.getElementById('m-unit-status').value;

                    if (!name) {
                        App.notify('Vui lòng nhập tên đơn vị!', 'warning');
                        return;
                    }

                    if (isEdit && parent === unitObj.name) {
                        App.notify('Đơn vị không được chọn chính mình làm đơn vị cấp trên!', 'danger');
                        return;
                    }

                    if (confirm(`Xác nhận lưu thông tin đơn vị [${name}]?`)) {
                        if (isEdit) {
                            unitObj.name = name;
                            unitObj.shortName = shortName;
                            unitObj.parent = parent;
                            unitObj.type = type;
                            unitObj.status = status;
                        } else {
                            App.state.unitsList.push({
                                code: autoCode, name, shortName, parent, type, status, note: ''
                            });
                        }
                        App.closeModal();
                        App.notify('Đã cập nhật danh mục đơn vị thành công!', 'success');
                        renderActiveTabContent();
                    }
                }
            }
        ]);
    }

    // =========================================================================
    // UC09.04 – CẤU HÌNH THỜI HẠN VÀ CẢNH BÁO (SLA CONFIGS)
    // =========================================================================
    function renderTabSLA(contentContainer) {
        const html = `
            <div class="card" style="padding: 24px; margin-bottom: 24px; border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
                    <div>
                        <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0;">
                            Cấu hình thời hạn xử lý (SLA) và Mốc cảnh báo nhiệm kỳ
                        </h3>
                        <p style="color: #64748b; font-size: 12.5px; margin-top: 2px;">Mỗi mốc cảnh báo chỉ có 1 cấu hình hiện hành áp dụng</p>
                    </div>
                    <button class="btn btn-primary" id="btn-create-sla" style="padding: 9px 20px; font-weight: 700; border-radius: 8px;">
                        + Thêm cấu hình mới
                    </button>
                </div>

                <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow-x: auto; width: 100%;">
                    <table class="data-table" style="width: 100%; min-width: 800px;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="white-space: nowrap;">Loại cấu hình</th>
                                <th style="white-space: nowrap;">Loại thủ tục / Đối tượng</th>
                                <th style="white-space: nowrap;">Bước xử lý / Mốc áp dụng</th>
                                <th style="text-align: center; white-space: nowrap;">Giá trị (Số ngày limit)</th>
                                <th style="white-space: nowrap;">Vai trò nhận cảnh báo</th>
                                <th style="text-align: center; white-space: nowrap;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${App.state.slaConfigs.map(c => `
                                <tr>
                                    <td style="white-space: nowrap;">
                                        <span class="badge ${c.type === 'sla' ? 'badge-info' : 'badge-warning'}" style="font-weight: 700;">
                                            ${c.type === 'sla' ? 'Thời hạn xử lý (SLA)' : 'Cảnh báo nhiệm kỳ'}
                                        </span>
                                    </td>
                                    <td style="font-weight: 700; color: #0f172a; white-space: nowrap;">${c.procedure}</td>
                                    <td>${c.step}</td>
                                    <td style="text-align: center; font-weight: 800; font-size: 15px; color: var(--primary); white-space: nowrap;">${c.value} ngày</td>
                                    <td>${c.role}</td>
                                    <td style="text-align: center; white-space: nowrap;">
                                        <button class="btn-icon btn-ghost btn-edit-sla" data-id="${c.id}" title="Chỉnh sửa thời hạn & Cấu hình" style="color: var(--primary);">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        contentContainer.innerHTML = html;

        contentContainer.querySelectorAll('.btn-edit-sla').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const slaObj = App.state.slaConfigs.find(c => c.id === id);
                if (slaObj) openSLAModal(slaObj);
            });
        });

        contentContainer.querySelector('#btn-create-sla')?.addEventListener('click', () => openSLAModal(null));
    }

    // Modal Cấu hình SLA (UC09.04)
    function openSLAModal(slaObj) {
        const isEdit = !!slaObj;
        const modalHtml = `
            <div style="padding: 4px 0 12px;">
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label" style="font-weight: 700;">Loại cấu hình <span class="text-danger">*</span></label>
                    <select class="form-input" id="m-sla-type">
                        <option value="sla" ${!slaObj || slaObj.type === 'sla' ? 'selected' : ''}>Thời hạn xử lý hồ sơ (SLA)</option>
                        <option value="alert" ${slaObj && slaObj.type === 'alert' ? 'selected' : ''}>Cảnh báo hết hạn nhiệm kỳ</option>
                    </select>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                    <div>
                        <label class="form-label" style="font-weight: 700;">Loại thủ tục / Đối tượng <span class="text-danger">*</span></label>
                        <input type="text" class="form-input" id="m-sla-proc" value="${slaObj ? slaObj.procedure : 'Bổ nhiệm lần đầu'}" placeholder="Ví dụ: Bổ nhiệm lần đầu">
                    </div>
                    <div>
                        <label class="form-label" style="font-weight: 700;">Bước xử lý / Mốc cảnh báo <span class="text-danger">*</span></label>
                        <input type="text" class="form-input" id="m-sla-step" value="${slaObj ? slaObj.step : 'Thẩm định tiêu chuẩn'}" placeholder="Ví dụ: Rà soát hồ sơ">
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                    <div>
                        <label class="form-label" style="font-weight: 700; color: var(--primary);">Giá trị số ngày giới hạn <span class="text-danger">*</span></label>
                        <input type="number" class="form-input" id="m-sla-val" value="${slaObj ? slaObj.value : '5'}" min="1" max="365" style="font-weight: 700;">
                    </div>
                    <div>
                        <label class="form-label" style="font-weight: 700;">Vai trò nhận thông báo</label>
                        <input type="text" class="form-input" id="m-sla-role" value="${slaObj ? slaObj.role : 'Chuyên viên TCCB'}" placeholder="Ví dụ: Ban TCCB">
                    </div>
                </div>
            </div>
        `;

        App.showModal(isEdit ? `Cập nhật cấu hình: ${slaObj.step}` : 'Thêm mới cấu hình thời hạn & cảnh báo', modalHtml, [
            { text: 'Hủy thao tác', class: 'btn-secondary', onclick: App.closeModal },
            {
                text: 'Lưu cấu hình',
                class: 'btn-primary',
                onclick: () => {
                    const type = document.getElementById('m-sla-type').value;
                    const procedure = document.getElementById('m-sla-proc').value.trim();
                    const step = document.getElementById('m-sla-step').value.trim();
                    const value = parseInt(document.getElementById('m-sla-val').value, 10);
                    const role = document.getElementById('m-sla-role').value.trim();

                    if (!procedure || !step || isNaN(value) || value <= 0) {
                        App.notify('Vui lòng nhập số ngày giới hạn hợp lệ lớn hơn 0!', 'warning');
                        return;
                    }

                    if (confirm(`Xác nhận lưu giá trị cấu hình [${value} ngày] cho bước [${step}]?`)) {
                        if (isEdit) {
                            slaObj.type = type;
                            slaObj.procedure = procedure;
                            slaObj.step = step;
                            slaObj.value = value;
                            slaObj.role = role;
                        } else {
                            App.state.slaConfigs.push({
                                id: 'CFG-' + (App.state.slaConfigs.length + 1),
                                type, procedure, step, value, role, status: 'active'
                            });
                        }
                        App.closeModal();
                        App.notify('Đã cập nhật cấu hình thời hạn thành công!', 'success');
                        renderActiveTabContent();
                    }
                }
            }
        ]);
    }

    // =========================================================================
    // UC09.05 – QUẢN LÝ MẪU VĂN BẢN (DOCUMENT TEMPLATES)
    // =========================================================================
    function renderTabTemplates(contentContainer) {
        const html = `
            <div class="card" style="padding: 24px; margin-bottom: 24px; border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
                    <div>
                        <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0;">
                            Quản lý Mẫu văn bản nghiệp vụ bổ nhiệm
                        </h3>
                        <p style="color: #64748b; font-size: 12.5px; margin-top: 2px;">Mỗi tổ hợp (Loại văn bản + Thủ tục + Chức vụ) chỉ có 1 mẫu hiện hành</p>
                    </div>
                    <button class="btn btn-primary" id="btn-create-tpl" style="padding: 9px 20px; font-weight: 700; border-radius: 8px;">
                        + Thêm mẫu văn bản mới
                    </button>
                </div>

                <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow-x: auto; width: 100%;">
                    <table class="data-table" style="width: 100%; min-width: 850px;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="white-space: nowrap;">Mã mẫu</th>
                                <th style="white-space: nowrap;">Tên mẫu văn bản</th>
                                <th style="white-space: nowrap;">Loại văn bản</th>
                                <th style="white-space: nowrap;">Loại thủ tục áp dụng</th>
                                <th style="white-space: nowrap;">Chức vụ áp dụng</th>
                                <th style="white-space: nowrap;">Tệp mẫu (.docx / .pdf)</th>
                                <th style="text-align: center; white-space: nowrap;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${App.state.templatesList.map(t => `
                                <tr>
                                    <td style="font-weight: 700; color: var(--primary); white-space: nowrap;">${t.code}</td>
                                    <td style="font-weight: 700; color: #0f172a; white-space: nowrap;">${t.name}</td>
                                    <td style="white-space: nowrap;"><span class="badge badge-info">${t.docType}</span></td>
                                    <td style="white-space: nowrap;">${t.procedure}</td>
                                    <td style="white-space: nowrap;">${t.position}</td>
                                    <td style="white-space: nowrap;">
                                        <a href="#" class="btn-link-file" style="color: #0284c7; font-weight: 600; font-size: 13px;">📥 ${t.fileName}</a>
                                    </td>
                                    <td style="text-align: center; white-space: nowrap;">
                                        <button class="btn-icon btn-ghost btn-edit-tpl" data-code="${t.code}" title="Cập nhật & Thay tệp mẫu" style="color: var(--primary);">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="17 8 12 3 7 8"></polyline>
                                                <line x1="12" y1="3" x2="12" y2="15"></line>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        contentContainer.innerHTML = html;

        contentContainer.querySelectorAll('.btn-edit-tpl').forEach(btn => {
            btn.addEventListener('click', () => {
                const code = btn.getAttribute('data-code');
                const tplObj = App.state.templatesList.find(t => t.code === code);
                if (tplObj) openTemplateModal(tplObj);
            });
        });

        contentContainer.querySelector('#btn-create-tpl')?.addEventListener('click', () => openTemplateModal(null));
    }

    // Modal Template (UC09.05)
    function openTemplateModal(tplObj) {
        const isEdit = !!tplObj;
        const autoCode = isEdit ? tplObj.code : 'MAU-0' + (App.state.templatesList.length + 1);

        const modalHtml = `
            <div style="padding: 4px 0 12px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                    <div>
                        <label class="form-label" style="font-weight: 700;">Mã mẫu (Tự động sinh)</label>
                        <input type="text" class="form-input" id="m-tpl-code" value="${autoCode}" disabled style="background: #f1f5f9; font-weight: 700;">
                    </div>
                    <div>
                        <label class="form-label" style="font-weight: 700;">Loại văn bản <span class="text-danger">*</span></label>
                        <select class="form-input" id="m-tpl-type">
                            <option value="Tờ trình đề xuất" ${tplObj && tplObj.docType === 'Tờ trình đề xuất' ? 'selected' : ''}>Tờ trình đề xuất</option>
                            <option value="Báo cáo thẩm định" ${tplObj && tplObj.docType === 'Báo cáo thẩm định' ? 'selected' : ''}>Báo cáo thẩm định</option>
                            <option value="Quyết định ban hành" ${tplObj && tplObj.docType === 'Quyết định ban hành' ? 'selected' : ''}>Quyết định ban hành</option>
                        </select>
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label" style="font-weight: 700;">Tên mẫu văn bản <span class="text-danger">*</span></label>
                    <input type="text" class="form-input" id="m-tpl-name" value="${tplObj ? tplObj.name : ''}" placeholder="Ví dụ: Tờ trình đề xuất chủ trương bổ nhiệm cán bộ">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                    <div>
                        <label class="form-label" style="font-weight: 700;">Loại thủ tục áp dụng</label>
                        <select class="form-input" id="m-tpl-proc">
                            <option value="Bổ nhiệm lần đầu">Bổ nhiệm lần đầu</option>
                            <option value="Bổ nhiệm lại">Bổ nhiệm lại</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label" style="font-weight: 700;">Chức vụ áp dụng</label>
                        <input type="text" class="form-input" id="m-tpl-pos" value="${tplObj ? tplObj.position : 'Trưởng ban và Phó Trưởng ban'}" placeholder="Chức vụ áp dụng...">
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label" style="font-weight: 700;">Đăng tải tệp mẫu (.docx / .pdf - max 10MB) <span class="text-danger">*</span></label>
                    <input type="file" class="form-input" id="m-tpl-file" accept=".docx,.pdf">
                    <div style="font-size: 11.5px; color: #64748b; margin-top: 4px;">Tệp đang lưu: <strong>${tplObj ? tplObj.fileName : 'Chưa chọn tệp'}</strong></div>
                </div>
            </div>
        `;

        App.showModal(isEdit ? `Cập nhật mẫu văn bản: ${tplObj.name}` : 'Thêm mới mẫu văn bản vào hệ thống', modalHtml, [
            { text: 'Hủy thao tác', class: 'btn-secondary', onclick: App.closeModal },
            {
                text: 'Đăng tải & Lưu mẫu',
                class: 'btn-primary',
                onclick: () => {
                    const name = document.getElementById('m-tpl-name').value.trim();
                    const docType = document.getElementById('m-tpl-type').value;
                    const procedure = document.getElementById('m-tpl-proc').value;
                    const position = document.getElementById('m-tpl-pos').value.trim();

                    if (!name) {
                        App.notify('Vui lòng nhập tên mẫu văn bản!', 'warning');
                        return;
                    }

                    if (confirm(`Xác nhận lưu tệp mẫu văn bản [${name}]?`)) {
                        if (isEdit) {
                            tplObj.name = name;
                            tplObj.docType = docType;
                            tplObj.procedure = procedure;
                            tplObj.position = position;
                        } else {
                            App.state.templatesList.push({
                                code: autoCode, name, docType, procedure, position,
                                fileName: name.replaceAll(' ', '_') + '.docx', status: 'active'
                            });
                        }
                        App.closeModal();
                        App.notify('Đã đăng tải và cập nhật tệp mẫu văn bản thành công!', 'success');
                        renderActiveTabContent();
                    }
                }
            }
        ]);
    }

    // =========================================================================
    // UC09.06 – TRA CỨU NHẬT KÝ HOẠT ĐỘNG (AUDIT LOG INQUIRY)
    // =========================================================================
    function renderTabAuditLogs(contentContainer) {
        const html = `
            <div class="module-filter-card">
                <div class="module-filter-header">
                    <div class="module-filter-title">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        TRUY VẤN NHẬT KÝ HOẠT ĐỘNG HỆ THỐNG
                    </div>
                </div>

                <div class="filter-grid-4">
                    <div>
                        <label class="form-label">Người thực hiện</label>
                        <input type="text" class="form-input" id="log-user" placeholder="Nhập tài khoản người dùng...">
                    </div>
                    <div>
                        <label class="form-label">Phân hệ chức năng</label>
                        <select class="form-input" id="log-module">
                            <option value="">-- Tất cả chức năng --</option>
                            <option value="Quản lý người dùng">Quản lý người dùng</option>
                            <option value="Thẩm định hồ sơ">Thẩm định hồ sơ</option>
                            <option value="Quản lý mẫu văn bản">Quản lý mẫu văn bản</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Từ ngày</label>
                        <input type="date" class="form-input" id="log-date-from">
                    </div>
                    <div>
                        <label class="form-label">Đến ngày</label>
                        <input type="date" class="form-input" id="log-date-to">
                    </div>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px;">
                    <button type="button" class="btn btn-primary" id="btn-log-search" style="height: 40px; padding: 0 22px; font-weight: 700; border-radius: 8px; font-size: 13.5px; display: flex; align-items: center; gap: 8px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        Truy vấn nhật ký
                    </button>
                </div>
            </div>

            <!-- Cảnh báo ngoại lệ luồng tra cứu nhật ký -->
            <div id="log-exception-banner" style="display: none; margin-bottom: 20px; padding: 16px 20px; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 12px; color: #991b1b; font-size: 13.5px;">
                <strong>⚠️ Điều kiện tra cứu không hợp lệ!</strong> Khoảng thời gian từ ngày không được lớn hơn đến ngày.
            </div>

            <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
                    <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0;">
                        Lịch sử thao tác nhật ký hệ thống (<span id="log-count">0</span> bản ghi)
                    </h3>
                </div>

                <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow-x: auto; width: 100%;">
                    <table class="data-table" style="width: 100%; min-width: 850px;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="white-space: nowrap;">Thời điểm</th>
                                <th style="white-space: nowrap;">Người thực hiện</th>
                                <th style="white-space: nowrap;">Chức năng hệ thống</th>
                                <th style="white-space: nowrap;">Hành động tác động</th>
                                <th style="white-space: nowrap;">Đối tượng dữ liệu</th>
                                <th style="text-align: center; white-space: nowrap;">Kết quả</th>
                                <th style="text-align: center; white-space: nowrap;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="log-tbody"></tbody>
                    </table>
                </div>
            </div>
        `;

        contentContainer.innerHTML = html;

        const runLogSearch = () => {
            const userKw = contentContainer.querySelector('#log-user').value.toLowerCase().trim();
            const module = contentContainer.querySelector('#log-module').value;
            const dateFrom = contentContainer.querySelector('#log-date-from').value;
            const dateTo = contentContainer.querySelector('#log-date-to').value;

            const banner = contentContainer.querySelector('#log-exception-banner');
            if (dateFrom && dateTo && dateFrom > dateTo) {
                banner.style.display = 'block';
                renderLogResults([]);
                return;
            } else {
                banner.style.display = 'none';
            }

            let list = App.state.auditLogs.filter(l => {
                const matchUser = !userKw || l.user.toLowerCase().includes(userKw);
                const matchMod = !module || l.module === module;
                return matchUser && matchMod;
            });

            renderLogResults(list);
        };

        const renderLogResults = (list) => {
            const tbody = contentContainer.querySelector('#log-tbody');
            contentContainer.querySelector('#log-count').textContent = list.length;

            if (list.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:32px; color:#64748b;">Không tìm thấy bản ghi nhật ký phù hợp với điều kiện</td></tr>`;
                return;
            }

            tbody.innerHTML = list.map(l => `
                <tr>
                    <td style="font-family: monospace; font-size: 12px; color: #64748b; white-space: nowrap;">${l.timestamp}</td>
                    <td style="font-weight: 700; color: var(--primary); white-space: nowrap;">${l.user}</td>
                    <td style="white-space: nowrap;">${l.module}</td>
                    <td style="font-weight: 600; color: #0f172a; white-space: nowrap;">${l.action}</td>
                    <td style="white-space: nowrap;">${l.target}</td>
                    <td style="text-align: center; white-space: nowrap;"><span class="badge badge-success">${l.result}</span></td>
                    <td style="text-align: center; white-space: nowrap;">
                        <button class="btn-icon btn-ghost btn-view-log" data-id="${l.id}" title="Xem chi tiết vết thay đổi nhật ký" style="color: var(--primary);">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </td>
                </tr>
            `).join('');

            tbody.querySelectorAll('.btn-view-log').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    const logObj = App.state.auditLogs.find(l => l.id === id);
                    if (logObj) {
                        App.showModal(`Chi tiết nhật ký hoạt động: ${logObj.id}`, `
                            <div style="padding: 8px 0; font-size: 13.5px; color: #334155;">
                                <div style="margin-bottom: 8px;">• <strong>Thời điểm:</strong> ${logObj.timestamp}</div>
                                <div style="margin-bottom: 8px;">• <strong>Tài khoản thực hiện:</strong> ${logObj.user}</div>
                                <div style="margin-bottom: 8px;">• <strong>Phân hệ / Chức năng:</strong> ${logObj.module}</div>
                                <div style="margin-bottom: 8px;">• <strong>Hành động:</strong> ${logObj.action}</div>
                                <div style="margin-bottom: 8px;">• <strong>Đối tượng tác động:</strong> ${logObj.target}</div>
                                <div style="margin-bottom: 8px;">• <strong>Kết quả thực hiện:</strong> <span class="badge badge-success">${logObj.result}</span></div>
                                <div style="padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-top: 12px;">
                                    <strong>Nội dung chi tiết vết thay đổi:</strong><br>
                                    <span style="font-family: monospace; font-size: 12.5px; color: #475569;">${logObj.detail}</span>
                                </div>
                            </div>
                        `, [{ text: 'Đóng lại', class: 'btn-secondary', onclick: App.closeModal }]);
                    }
                });
            });
        };

        contentContainer.querySelector('#btn-log-search').addEventListener('click', runLogSearch);
        runLogSearch();
    }
}

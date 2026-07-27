function renderBoNhiem(container) {
    if (App && App.clearFullPage) App.clearFullPage();

    // Khởi tạo dữ liệu mẫu nếu chưa có đầy đủ trường theo đặc tả
    if (!App.state.dossiers || App.state.dossiers.length === 0) {
        App.state.dossiers = [
            {
                id: 'HS-2026-001',
                proposalId: 'DX-2026-012',
                type: 'Bổ nhiệm mới',
                typeCode: 'moi',
                person: 'TS. Nguyễn Văn Quang',
                personId: 'NV005',
                position: 'Trưởng ban',
                unit: 'Ban Kế hoạch - Tài chính',
                source: 'Nhân sự tại chỗ',
                officer: 'Trần Văn Cường (Chuyên viên TCCB)',
                deadline: '2026-07-15',
                status: 'Chưa gửi thẩm định',
                statusCode: 'draft',
                createdAt: '2026-06-20',
                reason: 'Kiện toàn vị trí Trưởng ban Kế hoạch - Tài chính theo quy hoạch',
                basis: 'Nghị quyết số 12-NQ/ĐHĐN và Quyết định 4343/QĐ-ĐHĐN',
                approvalInfo: 'Thống nhất chủ trương theo Thông báo 45-TB/ĐHĐN ngày 15/06/2026',
                components: [
                    { id: 'c1', name: 'Tờ trình đề nghị bổ nhiệm của đơn vị', required: true, status: 'Đã có tài liệu', doc: { name: 'ToTrinh_BoNhiem_KHTC.pdf', code: '12/TT-KHTC', date: '2026-06-18', agency: 'Ban Kế hoạch - Tài chính' } },
                    { id: 'c2', name: 'Sơ yếu lý lịch (Mẫu 2C/TCTW)', required: true, status: 'Đã có tài liệu', doc: { name: 'SyLL_NguyenVanQuang_2026.pdf', code: 'SYLL-05', date: '2026-05-10', agency: 'UBND Phường Hòa Cường' } },
                    { id: 'c3', name: 'Bản kê khai tài sản, thu nhập', required: true, status: 'Đã có tài liệu', doc: { name: 'KeKhaiTaiSan_NVQuang.pdf', code: 'KKTS-2026', date: '2026-05-12', agency: 'Ban TCCB' } },
                    { id: 'c4', name: 'Bản nhận xét, đánh giá của tập thể lãnh đạo', required: true, status: 'Chưa có tài liệu', doc: null },
                    { id: 'c5', name: 'Kết luận tiêu chuẩn chính trị của cấp ủy', required: true, status: 'Chưa có tài liệu', doc: null }
                ],
                standards: [
                    { id: 'st1', name: 'Trình độ chuyên môn: Tiến sĩ chuyên ngành Kinh tế/Tài chính', status: 'Đạt' },
                    { id: 'st2', name: 'Lý luận chính trị: Cao cấp lý luận chính trị', status: 'Đạt' },
                    { id: 'st3', name: 'Quản lý nhà nước: Chứng chỉ Quản lý nhà nước ngạch Chuyên viên chính', status: 'Đạt' },
                    { id: 'st4', name: 'Kinh nghiệm: Đã kinh qua chức vụ Phó Trưởng ban tối thiểu 2 năm', status: 'Đạt' }
                ],
                history: [
                    { time: '2026-06-20 09:30', user: 'Cán bộ TCCB', action: 'Tạo hồ sơ bổ nhiệm mới từ Đề xuất DX-2026-012' }
                ]
            },
            {
                id: 'HS-2026-002',
                proposalId: 'DX-2026-010',
                type: 'Bổ nhiệm lại',
                typeCode: 'lai',
                person: 'PGS.TS. Trần Thị Hoa',
                personId: 'NV009',
                position: 'Phó Chánh Văn phòng',
                unit: 'Văn phòng',
                source: 'Nhân sự tại chỗ',
                officer: 'Nguyễn Thị Mai (Chuyên viên VP)',
                deadline: '2026-07-20',
                status: 'Chờ xác nhận gửi',
                statusCode: 'pending_confirm',
                createdAt: '2026-06-22',
                currentDecision: '145/QĐ-ĐHĐN (Nhiệm kỳ 01/09/2021 - 31/08/2026)',
                reason: 'Hết nhiệm kỳ 5 năm theo quy định',
                basis: 'Quyết định 4343/QĐ-ĐHĐN',
                approvalInfo: 'Thống nhất chủ trương theo Thông báo 42-TB/ĐHĐN',
                components: [
                    { id: 'c1', name: 'Tờ trình đề nghị bổ nhiệm lại', required: true, status: 'Đã có tài liệu', doc: { name: 'TT_BoNhiemLai_TTHoa.pdf', code: '45/TT-VP', date: '2026-06-21', agency: 'Văn phòng' } },
                    { id: 'c2', name: 'Báo cáo tự nhận xét đánh giá nhiệm kỳ', required: true, status: 'Đã có tài liệu', doc: { name: 'BaoCao_DanhGiaNhiemKy.pdf', code: 'BC-09', date: '2026-06-20', agency: 'Cá nhân' } },
                    { id: 'c3', name: 'Bản kê khai tài sản, thu nhập', required: true, status: 'Đã có tài liệu', doc: { name: 'KeKhaiTaiSan_TTHoa.pdf', code: 'KKTS-2026', date: '2026-05-15', agency: 'Văn phòng' } }
                ],
                standards: [
                    { id: 'st1', name: 'Hoàn thành tốt nhiệm vụ trong nhiệm kỳ vừa qua', status: 'Đạt' },
                    { id: 'st2', name: 'Đủ sức khỏe hoàn thành nhiệm vụ', status: 'Đạt' }
                ],
                history: [
                    { time: '2026-06-22 10:00', user: 'Cán bộ TCCB', action: 'Tạo hồ sơ bổ nhiệm lại từ Đề xuất DX-2026-010' },
                    { time: '2026-06-22 14:15', user: 'Cán bộ TCCB', action: 'Trình Thủ trưởng đơn vị xác nhận gửi thẩm định' }
                ]
            }
        ];
    }

    // --------------------------------------------------------------------------------
    // 1. UC04.04 – XEM DANH SÁCH HỒ SƠ BỔ NHIỆM (Màn hình chính)
    // --------------------------------------------------------------------------------
    const renderListView = () => {
        if (App && App.clearFullPage) App.clearFullPage();

        const dossiers = App.state.dossiers || [];
        const proposals = App.state.proposals || [];
        const approvedProposals = proposals.filter(p => p.statusCode === 'approved');

        const stats = {
            total: dossiers.length,
            draft: dossiers.filter(d => d.statusCode === 'draft').length,
            pending_review: dossiers.filter(d => d.statusCode === 'pending_review' || d.statusCode === 'pending_confirm').length,
            approved: dossiers.filter(d => d.statusCode === 'approved' || d.statusCode === 'issued').length
        };

        const html = `
            <div class="page-header">
                <div class="page-header-left">
                    <h1 style="font-size: 22px; font-weight: 800; color: var(--text-primary);">Quản lý hồ sơ bổ nhiệm</h1>
                    <p style="color: var(--text-tertiary); margin-top: 4px; font-size: 13px;">Lập, hoàn thiện, tra cứu và trình thẩm định hồ sơ bổ nhiệm cán bộ</p>
                </div>
                <div class="page-header-actions" style="display: flex; gap: 10px;">
                    <button class="btn btn-primary" id="btn-open-create-page" style="font-weight: 700;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Tạo hồ sơ bổ nhiệm
                    </button>
                </div>
            </div>

            <!-- Thống kê trạng thái Hồ sơ bổ nhiệm (Đồng bộ với Hồ sơ nhân sự & Đề xuất chủ trương) -->
            <div class="stats-grid grid-4" style="margin-bottom: 1.5rem; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
                <div class="card" style="margin: 0; padding: 18px 20px; border-left: 4px solid var(--primary);">
                    <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Tổng số hồ sơ bổ nhiệm</div>
                    <div style="font-size: 26px; font-weight: 800; color: var(--text-primary); margin-top: 4px;">${stats.total}</div>
                </div>
                <div class="card" style="margin: 0; padding: 18px 20px; border-left: 4px solid #F59E0B;">
                    <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Chưa gửi thẩm định</div>
                    <div style="font-size: 26px; font-weight: 800; color: #B45309; margin-top: 4px;">${stats.draft}</div>
                </div>
                <div class="card" style="margin: 0; padding: 18px 20px; border-left: 4px solid #8B5CF6;">
                    <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Chờ thẩm định</div>
                    <div style="font-size: 26px; font-weight: 800; color: #6D28D9; margin-top: 4px;">${stats.pending_review}</div>
                </div>
                <div class="card" style="margin: 0; padding: 18px 20px; border-left: 4px solid #16A34A;">
                    <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Đã hoàn thành / Ban hành QĐ</div>
                    <div style="font-size: 26px; font-weight: 800; color: #15803D; margin-top: 4px;">${stats.approved}</div>
                </div>
            </div>

            <!-- Khung tìm kiếm & lọc nâng cao (Standalone Filter Card) -->
            <div class="module-filter-card">
                <div class="module-filter-header">
                    <div class="module-filter-title">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        BỘ LỌC & TRA CỨU HỒ SƠ BỔ NHIỆM
                    </div>
                </div>

                <!-- Main Search Bar -->
                <div class="filter-search-bar">
                    <div class="filter-search-wrapper">
                        <svg class="search-icon-inside" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <input type="text" class="form-input" id="filter-keyword" placeholder="Nhập từ khóa tìm kiếm (Mã hồ sơ [HS-xxxx], tên nhân sự...)">
                    </div>
                    <button type="button" class="btn btn-secondary" id="btn-reset-filters" style="display: flex; align-items: center; gap: 6px; height: 42px; padding: 0 18px; font-weight: 600; border-radius: 8px; font-size: 13.5px; white-space: nowrap;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        Đặt lại
                    </button>
                    <button type="button" class="btn btn-primary" id="btn-apply-filters" style="display: flex; align-items: center; gap: 8px; height: 42px; padding: 0 22px; font-weight: 700; border-radius: 8px; font-size: 13.5px; white-space: nowrap;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        Tra cứu
                    </button>
                </div>

                <!-- Clean Grid Filter Controls -->
                <div class="filter-grid-3">
                    <div>
                        <label class="form-label">Loại thủ tục</label>
                        <select class="form-input" id="filter-type">
                            <option value="">Tất cả loại thủ tục</option>
                            <option value="moi">Bổ nhiệm mới</option>
                            <option value="lai">Bổ nhiệm lại</option>
                            <option value="keodai">Kéo dài thời gian giữ chức vụ</option>
                            <option value="kiemnhiem">Bổ nhiệm kiêm nhiệm</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Đơn vị trình</label>
                        <select class="form-input" id="filter-unit">
                            <option value="">Tất cả đơn vị</option>
                            <option value="Ban Giám đốc">Ban Giám đốc</option>
                            <option value="Văn phòng">Văn phòng</option>
                            <option value="Ban Tổ chức Cán bộ">Ban Tổ chức Cán bộ</option>
                            <option value="Ban Đào tạo">Ban Đào tạo</option>
                            <option value="Ban Kế hoạch - Tài chính">Ban Kế hoạch - Tài chính</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Trạng thái hồ sơ</label>
                        <select class="form-input" id="filter-status">
                            <option value="">Tất cả trạng thái</option>
                            <option value="draft">Chưa gửi thẩm định</option>
                            <option value="pending_confirm">Chờ xác nhận gửi</option>
                            <option value="pending_review">Chờ thẩm định</option>
                            <option value="approved">Đã phê duyệt</option>
                            <option value="issued">Đã ban hành QĐ</option>
                            <option value="cancelled">Đã hủy</option>
                        </select>
                    </div>
                </div>
            </div>
                    </div>
                </div>

                <!-- Active Filter Pills Container -->
                <div id="bonhiem-active-pills" class="active-filter-pills" style="display: none;">
                    <span class="active-filter-title">Đang lọc theo:</span>
                    <div id="bonhiem-pills-list" style="display: flex; flex-wrap: wrap; gap: 6px;"></div>
                </div>
            </div>

            <!-- Standalone Table Card -->
            <div class="card" style="border-radius: 12px; border: 1px solid var(--border); background: #ffffff; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <div style="padding: 16px 20px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; background: #fafafa;">
                    <span style="font-weight: 700; font-size: 14px; color: var(--text-primary);">Danh sách hồ sơ bổ nhiệm (<span id="count-total">${dossiers.length}</span>)</span>
                </div>
                <div class="table-container" style="border: none; overflow-x: auto;">
                    <table class="data-table" style="width: 100%; min-width: 980px;">
                        <thead>
                            <tr>
                                <th style="width: 9%; white-space: nowrap;">Mã hồ sơ</th>
                                <th style="width: 11%; text-align: center; white-space: nowrap;">Loại thủ tục</th>
                                <th style="width: 16%; white-space: nowrap;">Nhân sự đề nghị</th>
                                <th style="width: 17%; white-space: nowrap;">Đơn vị trình</th>
                                <th style="width: 11%; white-space: nowrap;">Cán bộ phụ trách</th>
                                <th style="width: 11%; text-align: center; white-space: nowrap;">Hạn xử lý</th>
                                <th style="width: 15%; text-align: center; white-space: nowrap;">Trạng thái</th>
                                <th style="width: 10%; min-width: 90px; text-align: center; white-space: nowrap;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="dossier-table-body">
                            ${renderDossierRows(dossiers)}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Event listeners
        container.querySelector('#btn-open-create-page')?.addEventListener('click', () => renderCreateDossierPage(approvedProposals, container));
        container.querySelector('#btn-apply-filters')?.addEventListener('click', () => applyListFilters());
        
        ['#filter-type', '#filter-unit', '#filter-status'].forEach(sel => {
            container.querySelector(sel)?.addEventListener('change', () => applyListFilters());
        });

        container.querySelector('#filter-keyword')?.addEventListener('input', () => applyListFilters());

        container.querySelector('#btn-reset-filters')?.addEventListener('click', () => {
            container.querySelector('#filter-keyword').value = '';
            container.querySelector('#filter-type').value = '';
            container.querySelector('#filter-unit').value = '';
            container.querySelector('#filter-status').value = '';
            applyListFilters();
        });

        bindTableActionEvents();
    };

    // Helper calculate deadline text (Red font if overdue)
    const getDossierDeadlineBadge = (item) => App.renderDeadlineText(item.deadline);

    // Helper render rows
    const renderDossierRows = (list) => {
        if (!list || list.length === 0) {
            return `<tr><td colspan="8" style="text-align: center; padding: 32px; color: var(--text-tertiary);">Không tìm thấy hồ sơ bổ nhiệm phù hợp</td></tr>`;
        }
        return list.map(item => {
            const stBadge = getStatusBadge(item.statusCode, item.status);
            const typeBadge = getProcedureTypeBadge(item.typeCode, item.type);
            const deadlineBadge = getDossierDeadlineBadge(item);
            return `
                <tr data-id="${item.id}" class="clickable-row btn-view-dossier" style="cursor: pointer;">
                    <td style="font-weight: 700; color: var(--primary); white-space: nowrap;">${item.id}</td>
                    <td style="text-align: center; white-space: nowrap;">${typeBadge}</td>
                    <td>
                        <div class="person-cell">
                            <div class="avatar sm" style="background: var(--primary); color:#fff; font-size:11px; font-weight:700; flex-shrink: 0;">
                                ${item.person.split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                            </div>
                            <div style="font-weight: 600; color: var(--text-primary);">${item.person}</div>
                        </div>
                    </td>
                    <td>
                        <div style="font-weight: 600; color: #0f172a; font-size: 13px;">${item.position}</div>
                        <div style="font-size: 11.5px; color: #64748b;">${item.unit}</div>
                    </td>
                    <td style="font-size: 12.5px; color: var(--text-secondary); white-space: nowrap;">${item.officer || 'Chưa phân công'}</td>
                    <td style="text-align: center; white-space: nowrap;">${deadlineBadge}</td>
                    <td style="text-align: center; white-space: nowrap;">${stBadge}</td>
                    <td style="text-align: center; white-space: nowrap;" onclick="event.stopPropagation()">
                        <div class="table-actions">
                            <button class="btn-icon btn-icon-primary btn-view-dossier" data-id="${item.id}" title="Xem chi tiết hồ sơ">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            </button>
                            ${item.statusCode === 'draft' ? `
                                <button class="btn-icon btn-icon-primary btn-edit-dossier" data-id="${item.id}" title="Cập nhật thông tin quản lý">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                </button>
                            ` : ''}
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    };

    const getProcedureTypeBadge = (typeCode, typeText) => {
        let code = typeCode;
        if (!code && typeText) {
            if (typeText.includes('lại')) code = 'lai';
            else if (typeText.includes('kéo dài') || typeText.includes('Kéo dài')) code = 'keodai';
            else if (typeText.includes('kiêm') || typeText.includes('Kiêm')) code = 'kiemnhiem';
            else code = 'moi';
        }
        switch (code) {
            case 'moi':
                return `<span class="badge" style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; font-size: 12px; font-weight: 600; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">${typeText || 'Bổ nhiệm mới'}</span>`;
            case 'lai':
                return `<span class="badge" style="background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; font-size: 12px; font-weight: 600; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">${typeText || 'Bổ nhiệm lại'}</span>`;
            case 'keodai':
                return `<span class="badge" style="background: #fffbeb; color: #b45309; border: 1px solid #fde68a; font-size: 12px; font-weight: 600; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">${typeText || 'Kéo dài thời gian'}</span>`;
            case 'kiemnhiem':
                return `<span class="badge" style="background: #ecfeff; color: #0891b2; border: 1px solid #a5f3fc; font-size: 12px; font-weight: 600; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">${typeText || 'Bổ nhiệm kiêm nhiệm'}</span>`;
            default:
                return `<span class="badge badge-info" style="font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">${typeText || code}</span>`;
        }
    };

    // Helper status badges delegated to global App helper
    const getStatusBadge = (statusCode, statusText) => App.renderStatusBadge(statusCode, statusText);

    // Table filter handler
    const applyListFilters = () => {
        const kw = container.querySelector('#filter-keyword')?.value.toLowerCase().trim();
        const type = container.querySelector('#filter-type')?.value;
        const unit = container.querySelector('#filter-unit')?.value;
        const status = container.querySelector('#filter-status')?.value;

        const filtered = App.state.dossiers.filter(d => {
            const matchKw = !kw || d.id.toLowerCase().includes(kw) || d.person.toLowerCase().includes(kw);
            const matchType = !type || d.typeCode === type;
            const matchUnit = !unit || d.unit === unit;
            const matchStatus = !status || d.statusCode === status;
            return matchKw && matchType && matchUnit && matchStatus;
        });

        const tbody = container.querySelector('#dossier-table-body');
        const countSpan = container.querySelector('#count-total');
        if (tbody) tbody.innerHTML = renderDossierRows(filtered);
        if (countSpan) countSpan.innerText = filtered.length;

        updateBoNhiemActivePills(kw, type, unit, status);
        bindTableActionEvents();
    };

    const updateBoNhiemActivePills = (kw, type, unit, status) => {
        const pillsBox = container.querySelector('#bonhiem-active-pills');
        const pillsList = container.querySelector('#bonhiem-pills-list');
        if (!pillsBox || !pillsList) return;

        let pillsHtml = '';
        if (kw) pillsHtml += `<span class="filter-tag-pill">Từ khóa: "${kw}" <span class="remove-pill" data-clear="kw">×</span></span>`;
        if (type) {
            const typeTextMap = { 'moi': 'Bổ nhiệm mới', 'lai': 'Bổ nhiệm lại', 'keodai': 'Kéo dài thời gian', 'kiemnhiem': 'Bổ nhiệm kiêm nhiệm' };
            pillsHtml += `<span class="filter-tag-pill">Thủ tục: ${typeTextMap[type] || type} <span class="remove-pill" data-clear="type">×</span></span>`;
        }
        if (unit) pillsHtml += `<span class="filter-tag-pill">Đơn vị: ${unit} <span class="remove-pill" data-clear="unit">×</span></span>`;
        if (status) {
            const stTextMap = { 'draft': 'Chưa gửi thẩm định', 'pending_confirm': 'Chờ xác nhận gửi', 'pending_review': 'Chờ thẩm định', 'pending_supplement': 'Chờ bổ sung', 'approved': 'Đã phê duyệt', 'cancelled': 'Đã hủy' };
            pillsHtml += `<span class="filter-tag-pill">Trạng thái: ${stTextMap[status] || status} <span class="remove-pill" data-clear="status">×</span></span>`;
        }

        if (pillsHtml) {
            pillsList.innerHTML = pillsHtml;
            pillsBox.style.display = 'flex';
            pillsList.querySelectorAll('.remove-pill').forEach(b => {
                b.addEventListener('click', (e) => {
                    const field = e.target.dataset.clear;
                    if (field === 'kw') container.querySelector('#filter-keyword').value = '';
                    if (field === 'type') container.querySelector('#filter-type').value = '';
                    if (field === 'unit') container.querySelector('#filter-unit').value = '';
                    if (field === 'status') container.querySelector('#filter-status').value = '';
                    applyListFilters();
                });
            });
        } else {
            pillsBox.style.display = 'none';
        }
    };

    // Action button bindings
    const bindTableActionEvents = () => {
        container.querySelectorAll('.btn-view-dossier').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = App.state.dossiers.find(d => d.id === btn.dataset.id);
                if (item) renderViewDossierDetail(item, container);
            });
        });

        container.querySelectorAll('.btn-edit-dossier').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = App.state.dossiers.find(d => d.id === btn.dataset.id);
                if (item) renderEditDossierPage(item, container);
            });
        });
    };

    // --------------------------------------------------------------------------------
    // 2. UC04.01 – TẠO HỒ SƠ BỔ NHIỆM (Màn hình Full-Page chuyên nghiệp)
    // --------------------------------------------------------------------------------
    const renderCreateDossierPage = (approvedProposals, container) => {
        if (App && App.setFullPage) App.setFullPage();

        const proposalsToSelect = (approvedProposals && approvedProposals.length > 0) 
            ? approvedProposals 
            : (App.state.proposals || [
                { id: 'DX-2026-001', person: 'GS.TS. Trần Văn Nam', position: 'Trưởng khoa CNTT', unit: 'Trường Đại học Bách khoa' },
                { id: 'DX-2026-002', person: 'PGS.TS. Lê Thị Hoa', position: 'Phó Hiệu trưởng', unit: 'Trường Đại học Kinh tế' },
                { id: 'DX-2026-003', person: 'TS. Nguyễn Văn Bình', position: 'Trưởng phòng Đào tạo', unit: 'Trường Đại học Sư phạm' }
            ]);

        const html = `
            <div class="full-page-container" style="background: var(--bg-app); min-height: 100vh; padding-bottom: 40px;">
                <!-- Full Page Header Bar -->
                <div class="page-header-alt" style="padding: 20px 32px; background: #ffffff; border-bottom: 1px solid var(--border); width: 100%;">
                    <div style="width: 100%;">
                        <div class="breadcrumb-bar" style="margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
                            <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                                <span class="bc-back-btn" id="bc-back-list" style="cursor: pointer; font-weight: 700; color: var(--primary); display: flex; align-items: center; gap: 4px;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                                    QUẢN LÝ HỒ SƠ BỔ NHIỆM
                                </span>
                                <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                <span class="bc-current" style="font-weight: 700; color: var(--text-secondary);">TẠO HỒ SƠ BỔ NHIỆM MỚI</span>
                            </div>
                        </div>
                        <h2 style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin: 0;">
                            Thêm mới hồ sơ bổ nhiệm
                        </h2>
                        <p style="color: var(--text-secondary); margin-top: 4px; font-size: 13px;">Khởi tạo hồ sơ bổ nhiệm mới dựa trên đề xuất chủ trương đã được cấp có thẩm quyền chấp thuận</p>
                    </div>
                </div>

                <!-- Main Form Body -->
                <div style="padding: 24px 32px 0; width: 100%; max-width: 1400px; margin: 0 auto;">
                    <div style="display: grid; grid-template-columns: 1fr 360px; gap: 24px;">

                        <!-- LEFT COLUMN: Main Form Cards -->
                        <div>
                            <!-- Card 1: Select Source Proposal & Inheritance Preview -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                                    1. Chọn Đề xuất chủ trương nguồn
                                </h3>

                                <div class="form-group" style="margin-bottom: 18px;">
                                    <label class="form-label" style="font-weight: 700; font-size: 13.5px; color: #0f172a;">
                                        Chọn đề xuất chủ trương đã chấp thuận <span class="text-danger">*</span>
                                    </label>
                                    <select class="form-input" id="create-select-proposal" style="height: 44px; font-size: 14px; font-weight: 600; border-radius: 8px;">
                                        <option value="">-- Chọn đề xuất đã chấp thuận --</option>
                                        ${proposalsToSelect.map(p => `
                                            <option value="${p.id}">${p.id} — ${p.person || 'Nhân sự chưa tên'} (${p.position} - ${p.unit})</option>
                                        `).join('')}
                                    </select>
                                </div>

                                <div id="create-inherited-preview" style="display: none; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 20px; margin-bottom: 10px;">
                                    <div style="font-size: 12px; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                        THÔNG TIN KẾ THỪA TỰ ĐỘNG TỪ ĐỀ XUẤT NGUỒN
                                    </div>
                                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; font-size: 13.5px;">
                                        <div><span style="color: #64748b; font-size: 11.5px; font-weight: 700; text-transform: uppercase; display: block;">Mã đề xuất nguồn:</span> <strong id="prev-prop-id" style="color: var(--primary);">—</strong></div>
                                        <div><span style="color: #64748b; font-size: 11.5px; font-weight: 700; text-transform: uppercase; display: block;">Loại thủ tục:</span> <strong id="prev-prop-type">—</strong></div>
                                        <div><span style="color: #64748b; font-size: 11.5px; font-weight: 700; text-transform: uppercase; display: block;">Nhân sự đề nghị:</span> <strong id="prev-prop-person" style="color: #0f172a; font-size: 14px;">—</strong></div>
                                        <div><span style="color: #64748b; font-size: 11.5px; font-weight: 700; text-transform: uppercase; display: block;">Chức vụ đề xuất:</span> <strong id="prev-prop-pos">—</strong></div>
                                        <div><span style="color: #64748b; font-size: 11.5px; font-weight: 700; text-transform: uppercase; display: block;">Đơn vị trình:</span> <strong id="prev-prop-unit">—</strong></div>
                                        <div><span style="color: #64748b; font-size: 11.5px; font-weight: 700; text-transform: uppercase; display: block;">Trạng thái phê duyệt:</span> <span class="badge badge-success" style="font-weight: 700;">Đã chấp thuận chủ trương</span></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card 2: Management Parameters -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    2. Phân công quản lý & Hạn hoàn thiện
                                </h3>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 16px;">
                                    <div class="form-group">
                                        <label class="form-label" style="font-weight: 700;">Cán bộ phụ trách hồ sơ <span class="text-danger">*</span></label>
                                        <input type="text" class="form-input" id="create-officer" value="Trần Văn Cường (Chuyên viên TCCB)" style="height: 40px;" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" style="font-weight: 700;">Thời hạn hoàn thiện hồ sơ <span class="text-danger">*</span></label>
                                        <input type="date" class="form-input" id="create-deadline" value="${new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0]}" style="height: 40px;" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" style="font-weight: 700;">Ghi chú quản lý & chỉ đạo thực hiện</label>
                                    <textarea class="form-input" id="create-note" rows="3" placeholder="Nhập ghi chú hoặc yêu cầu chỉ đạo hoàn thiện hồ sơ..."></textarea>
                                </div>
                            </div>

                            <!-- Card 3: Required Document Components Checklist -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                                    3. Danh mục thành phần hồ sơ bắt buộc
                                </h3>
                                <div style="display: flex; flex-direction: column; gap: 10px;">
                                    <div style="padding: 12px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; display: flex; justify-content: space-between; align-items: center;">
                                        <span>1. Tờ trình đề nghị bổ nhiệm của đơn vị <span class="text-danger">*</span></span>
                                        <span class="badge badge-success">Sẵn sàng</span>
                                    </div>
                                    <div style="padding: 12px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; display: flex; justify-content: space-between; align-items: center;">
                                        <span>2. Sơ yếu lý lịch (Mẫu 2C/TCTW) <span class="text-danger">*</span></span>
                                        <span class="badge badge-success">Sẵn sàng</span>
                                    </div>
                                    <div style="padding: 12px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; display: flex; justify-content: space-between; align-items: center;">
                                        <span>3. Bản kê khai tài sản, thu nhập <span class="text-danger">*</span></span>
                                        <span class="badge badge-success">Sẵn sàng</span>
                                    </div>
                                    <div style="padding: 12px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; display: flex; justify-content: space-between; align-items: center;">
                                        <span>4. Bản nhận xét, đánh giá của tập thể lãnh đạo <span class="text-danger">*</span></span>
                                        <span class="badge badge-warning">Cần cập nhật bổ sung</span>
                                    </div>
                                    <div style="padding: 12px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; display: flex; justify-content: space-between; align-items: center;">
                                        <span>5. Kết luận tiêu chuẩn chính trị của cấp ủy <span class="text-danger">*</span></span>
                                        <span class="badge badge-warning">Cần cập nhật bổ sung</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- RIGHT COLUMN: Action & Guidance Panel -->
                        <div>
                            <div class="card" style="padding: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04); position: sticky; top: 20px;">
                                <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0 0 14px; display: flex; align-items: center; gap: 6px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                    Thao tác
                                </h4>

                                <div style="display: flex; flex-direction: column; gap: 12px;">
                                    <button type="button" class="btn btn-primary" id="btn-submit-create-dossier-full" style="width: 100%; justify-content: center; font-weight: 700; height: 42px; font-size: 14px;">
                                        Tạo hồ sơ bổ nhiệm
                                    </button>
                                    <button type="button" class="btn btn-secondary" id="btn-cancel-create-dossier-full" style="width: 100%; justify-content: center; height: 40px;">
                                        Hủy bỏ
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Bind events
        container.querySelector('#bc-back-list')?.addEventListener('click', () => renderListView());
        container.querySelector('#btn-cancel-create-dossier-full')?.addEventListener('click', () => renderListView());

        const selectProp = container.querySelector('#create-select-proposal');
        const prevBox = container.querySelector('#create-inherited-preview');

        selectProp?.addEventListener('change', (e) => {
            const propId = e.target.value;
            const prop = approvedProposals.find(p => p.id === propId);
            if (prop && prevBox) {
                prevBox.style.display = 'block';
                container.querySelector('#prev-prop-id').innerText = prop.id;
                container.querySelector('#prev-prop-type').innerText = prop.type;
                container.querySelector('#prev-prop-person').innerText = prop.person || 'Nhân sự dự kiến';
                container.querySelector('#prev-prop-pos').innerText = prop.position;
                container.querySelector('#prev-prop-unit').innerText = prop.unit;
            } else if (prevBox) {
                prevBox.style.display = 'none';
            }
        });

        container.querySelector('#btn-submit-create-dossier-full')?.addEventListener('click', () => {
            const propId = selectProp?.value;
            const officer = container.querySelector('#create-officer')?.value.trim();
            const deadline = container.querySelector('#create-deadline')?.value;
            const note = container.querySelector('#create-note')?.value.trim();

            if (!propId) {
                App.notify('Vui lòng chọn Đề xuất chủ trương nguồn làm căn cứ lập hồ sơ.', 'warning');
                return;
            }

            const existDossier = App.state.dossiers.find(d => d.proposalId === propId);
            if (existDossier) {
                App.notify(`Đề xuất ${propId} đã được sử dụng để lập hồ sơ ${existDossier.id} (Trạng thái: ${existDossier.status}).`, 'error');
                return;
            }

            const prop = approvedProposals.find(p => p.id === propId);
            if (!prop) return;

            const newId = `HS-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

            const newDossier = {
                id: newId,
                proposalId: prop.id,
                type: prop.type,
                typeCode: prop.typeCode || 'moi',
                person: prop.person || 'TS. Nguyễn Văn Quang',
                personId: 'NV' + Math.floor(100 + Math.random() * 900),
                position: prop.position,
                unit: prop.unit,
                source: prop.source || 'Nhân sự tại chỗ',
                officer: officer || 'Chuyên viên TCCB',
                deadline: deadline,
                note: note,
                status: 'Chưa gửi thẩm định',
                statusCode: 'draft',
                createdAt: new Date().toISOString().split('T')[0],
                reason: prop.reason || 'Kiện toàn vị trí theo quy hoạch đã được duyệt',
                basis: prop.basis || 'Quyết định 4343/QĐ-ĐHĐN',
                approvalInfo: 'Thống nhất chủ trương theo kết luận của cấp có thẩm quyền',
                components: [
                    { id: 'c1', name: 'Tờ trình đề nghị bổ nhiệm của đơn vị', required: true, status: 'Đã có tài liệu', doc: { name: `ToTrinh_${prop.id}.pdf`, code: '15/TT-' + prop.unit, date: new Date().toISOString().split('T')[0], agency: prop.unit } },
                    { id: 'c2', name: 'Sơ yếu lý lịch (Mẫu 2C/TCTW)', required: true, status: 'Đã có tài liệu', doc: { name: `SYLL_${prop.person || 'NhanSu'}.pdf`, code: 'SYLL-2026', date: '2026-04-10', agency: 'Cơ quan có thẩm quyền' } },
                    { id: 'c3', name: 'Bản kê khai tài sản, thu nhập', required: true, status: 'Đã có tài liệu', doc: { name: `KKTS_${prop.person || 'NhanSu'}.pdf`, code: 'KKTS-2026', date: '2026-05-01', agency: 'Ban TCCB' } },
                    { id: 'c4', name: 'Bản nhận xét, đánh giá của tập thể lãnh đạo', required: true, status: 'Chưa có tài liệu', doc: null },
                    { id: 'c5', name: 'Kết luận tiêu chuẩn chính trị của cấp ủy', required: true, status: 'Chưa có tài liệu', doc: null }
                ],
                standards: [
                    { id: 'st1', name: 'Trình độ chuyên môn đáp ứng tiêu chuẩn vị trí việc làm', status: 'Đạt' },
                    { id: 'st2', name: 'Lý luận chính trị: Trung cấp/Cao cấp lý luận chính trị', status: 'Đạt' },
                    { id: 'st3', name: 'Năng lực quản lý và kinh nghiệm công tác', status: 'Đạt' }
                ],
                history: [
                    { time: new Date().toLocaleString('vi-VN'), user: App.user ? App.user.name : 'Cán bộ TCCB', action: `Tạo hồ sơ bổ nhiệm ${newId} từ Đề xuất ${prop.id}` }
                ]
            };

            App.state.dossiers.unshift(newDossier);
            App.notify(`Tạo hồ sơ ${newId} thành công ở trạng thái "Chưa gửi thẩm định"!`, 'success');
            renderListView();
        });
    };

    // --------------------------------------------------------------------------------
    // 3. UC04.02 – CẬP NHẬT HỒ SƠ BỔ NHIỆM (Màn hình Full-Page chuyên nghiệp)
    // --------------------------------------------------------------------------------
    const renderEditDossierPage = (item, container) => {
        if (App && App.setFullPage) App.setFullPage();

        if (item.statusCode !== 'draft') {
            App.notify('Hồ sơ chỉ được phép cập nhật khi đang ở trạng thái "Chưa gửi thẩm định".', 'warning');
            renderListView();
            return;
        }

        const html = `
            <div class="full-page-container" style="background: var(--bg-app); min-height: 100vh; padding-bottom: 40px;">
                <div class="page-header-alt" style="padding: 20px 32px; background: #ffffff; border-bottom: 1px solid var(--border); width: 100%;">
                    <div style="width: 100%;">
                        <div class="breadcrumb-bar" style="margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
                            <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                                <span class="bc-back-btn" id="bc-back-list" style="cursor: pointer; font-weight: 700; color: var(--primary); display: flex; align-items: center; gap: 4px;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                                    QUẢN LÝ HỒ SƠ BỔ NHIỆM
                                </span>
                                <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                <span class="bc-current" style="font-weight: 700; color: var(--text-secondary);">CẬP NHẬT THÔNG TIN THAM SỐ QUẢN LÝ</span>
                            </div>
                        </div>
                        <h2 style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin: 0;">
                            Cập nhật thông tin quản lý hồ sơ bổ nhiệm ${item.id} — ${item.person}
                        </h2>
                    </div>
                </div>

                <div style="padding: 24px 32px 0; width: 100%; max-width: 1400px; margin: 0 auto;">
                    <div style="display: grid; grid-template-columns: 1fr 360px; gap: 24px;">

                        <div>
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 18px; margin-bottom: 20px; font-size: 13.5px; color: #1e40af;">
                                    <strong>📌 Lưu ý quy định:</strong> Các thông tin gốc kế thừa từ Đề xuất chủ trương (Họ tên nhân sự, Chức vụ đề xuất, Đơn vị công tác, Loại thủ tục) bị khóa cố định để đảm bảo tính pháp lý. Bạn chỉ được phép điều chỉnh thông tin tham số quản lý.
                                </div>

                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    Cập nhật phân công cán bộ phụ trách & thời hạn
                                </h3>

                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 16px;">
                                    <div class="form-group">
                                        <label class="form-label" style="font-weight: 700;">Cán bộ phụ trách hồ sơ <span class="text-danger">*</span></label>
                                        <input type="text" class="form-input" id="edit-officer" value="${item.officer || ''}" style="height: 40px;" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" style="font-weight: 700;">Thời hạn hoàn thiện hồ sơ <span class="text-danger">*</span></label>
                                        <input type="date" class="form-input" id="edit-deadline" value="${item.deadline || ''}" style="height: 40px;" required>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="form-label" style="font-weight: 700;">Ghi chú quản lý bổ sung</label>
                                    <textarea class="form-input" id="edit-note" rows="4" placeholder="Nhập ghi chú quản lý...">${item.note || ''}</textarea>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="card" style="padding: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04); position: sticky; top: 20px;">
                                <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0 0 14px; display: flex; align-items: center; gap: 6px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                                    Lưu thay đổi
                                </h4>

                                <div style="display: flex; flex-direction: column; gap: 12px;">
                                    <button type="button" class="btn btn-primary" id="btn-save-edit-dossier-full" style="width: 100%; justify-content: center; font-weight: 700; height: 42px; font-size: 14px;">
                                        Lưu thông tin cập nhật
                                    </button>
                                    <button type="button" class="btn btn-secondary" id="btn-cancel-edit-dossier-full" style="width: 100%; justify-content: center; height: 40px;">
                                        Hủy bỏ
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;

        container.querySelector('#bc-back-list')?.addEventListener('click', () => renderListView());
        container.querySelector('#btn-cancel-edit-dossier-full')?.addEventListener('click', () => renderListView());

        container.querySelector('#btn-save-edit-dossier-full')?.addEventListener('click', () => {
            const officer = container.querySelector('#edit-officer')?.value.trim();
            const deadline = container.querySelector('#edit-deadline')?.value;
            const note = container.querySelector('#edit-note')?.value.trim();

            if (!officer || !deadline) {
                App.notify('Vui lòng điền đầy đủ các thông tin quản lý bắt buộc.', 'warning');
                return;
            }

            item.officer = officer;
            item.deadline = deadline;
            item.note = note;
            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: App.user ? App.user.name : 'Cán bộ TCCB',
                action: 'Cập nhật thông tin quản lý hồ sơ (Cán bộ phụ trách, thời hạn)'
            });

            App.notify('Đã cập nhật thông tin hồ sơ bổ nhiệm thành công!', 'success');
            renderListView();
        });
    };

    // --------------------------------------------------------------------------------
    // 4. UC04.05 – XEM CHI TIẾT HỒ SƠ BỔ NHIỆM (Màn hình full-page)
    // --------------------------------------------------------------------------------
    const renderViewDossierDetail = (item, container) => {
        const html = `
            <div class="full-page-container" style="background: var(--bg-app); min-height: 100vh; padding-bottom: 40px;">
                <!-- Header chuẩn đồng bộ master system -->
                <div class="page-header-alt" style="padding: 20px 32px; background: #ffffff; border-bottom: 1px solid var(--border); width: 100%;">
                    <div style="width: 100%;">
                        <div class="breadcrumb-bar" style="margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
                            <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                                <span class="bc-back-btn" id="bc-back-list">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                                    QUẢN LÝ HỒ SƠ BỔ NHIỆM
                                </span>
                                <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                <span class="bc-current">CHI TIẾT HỒ SƠ BỔ NHIỆM</span>
                            </div>
                            <div>${getStatusBadge(item.statusCode, item.status)}</div>
                        </div>
                        <h2 style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin: 0;">
                            Hồ sơ ${item.id} — ${item.person} (${item.position})
                        </h2>
                    </div>
                </div>

                <div style="padding: 24px 32px 0; width: 100%;">
                    <div style="display: grid; grid-template-columns: 1fr 340px; gap: 24px;">

                        <!-- CỘT TRÁI CHÍNH -->
                        <div>
                            <!-- Thẻ 1: Thông tin chung & Đề xuất nguồn -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    1. Thông tin chung & Liên kết Đề xuất nguồn
                                </h3>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; font-size: 13.5px;">
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Mã hồ sơ:</span> <div style="font-weight:700; color: var(--primary);">${item.id}</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Đề xuất chủ trương nguồn:</span> <div style="font-weight:700;">${item.proposalId}</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Loại thủ tục:</span> <div>${item.type}</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Cán bộ phụ trách:</span> <div style="font-weight:600;">${item.officer || 'Chưa phân công'}</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Thời hạn hoàn thiện:</span> <div>${item.deadline || 'Chưa thiết lập'}</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Ngày tạo hồ sơ:</span> <div>${item.createdAt}</div></div>
                                </div>
                            </div>

                            <!-- Thẻ 2: Thông tin nhân sự & Chức vụ đề xuất -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    2. Thông tin nhân sự & Chức vụ đề xuất
                                </h3>
                                <div style="display: flex; gap: 16px; align-items: center; background: #eff6ff; padding: 16px; border-radius: 10px; border: 1px solid #bfdbfe; margin-bottom: 16px;">
                                    <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; flex-shrink: 0;">
                                        ${item.person.split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <div style="font-size: 16px; font-weight: 700; color: #0f172a;">${item.person}</div>
                                        <div style="font-size: 13px; color: #475569; margin-top: 2px;">
                                            Chức vụ đề xuất: <strong>${item.position}</strong> · Đơn vị: <strong>${item.unit}</strong> · Nguồn: <strong>${item.source || 'Nhân sự tại chỗ'}</strong>
                                        </div>
                                    </div>
                                </div>
                                ${item.currentDecision ? `
                                    <div style="padding: 12px 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 13px;">
                                        <strong>Quyết định & Nhiệm kỳ hiện tại:</strong> ${item.currentDecision}
                                    </div>
                                ` : ''}
                            </div>

                            <!-- Thẻ 3: Thành phần hồ sơ & Quản lý tài liệu -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
                                    <span style="display: flex; align-items: center; gap: 8px;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                                        3. Thành phần hồ sơ & Quản lý tài liệu
                                    </span>
                                </h3>
                                <div style="display: flex; flex-direction: column; gap: 12px;">
                                    ${(item.components || []).map((comp, idx) => `
                                        <div style="padding: 14px 16px; border-radius: 10px; border: 1px solid ${comp.doc ? '#cbd5e1' : '#fca5a5'}; background: ${comp.doc ? '#f8fafc' : '#fef2f2'}; display: flex; justify-content: space-between; align-items: center;">
                                            <div style="display: flex; align-items: center; gap: 12px;">
                                                <div style="width: 28px; height: 28px; border-radius: 50%; background: ${comp.doc ? '#16a34a' : '#dc2626'}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800;">
                                                    ${comp.doc ? '✓' : '!'}
                                                </div>
                                                <div>
                                                    <div style="font-weight: 700; font-size: 13.5px; color: #0f172a;">
                                                        ${comp.name} ${comp.required ? '<span class="text-danger">*</span>' : ''}
                                                    </div>
                                                    <div style="font-size: 12px; color: #64748b; margin-top: 2px;">
                                                        Tình trạng: <span class="badge ${comp.doc ? 'badge-success' : 'badge-danger'}" style="font-size: 10.5px;">${comp.status}</span>
                                                        ${comp.doc ? ` · Tệp: <strong>${comp.doc.name}</strong> (${comp.doc.code || ''})` : ' (Chưa có tệp)'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="display: flex; gap: 8px;">
                                                ${comp.doc ? `
                                                    <button type="button" class="btn-icon btn-icon-primary" title="Xem / Tải tệp tài liệu" onclick="App.notify('Đang tải tài liệu ${comp.doc.name}...', 'info')">
                                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                                    </button>
                                                    ${item.statusCode === 'draft' ? `
                                                        <button type="button" class="btn-icon btn-unlink-doc" data-comp-id="${comp.id}" title="Gỡ liên kết tài liệu" style="color: #dc2626; border: 1px solid #fecdd3; background: #fff1f2; border-radius: 6px; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer;">
                                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                                        </button>
                                                    ` : ''}
                                                ` : `
                                                    ${item.statusCode === 'draft' ? `
                                                        <button type="button" class="btn btn-secondary btn-sm btn-upload-comp-doc" data-comp-id="${comp.id}" title="Tải tài liệu lên" style="display: inline-flex; align-items: center; gap: 4px; padding: 5px 10px; font-weight: 600; font-size: 12px;">
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Tải tệp lên
                                                        </button>
                                                    ` : ''}
                                                `}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Thẻ 4: Tiêu chuẩn bổ nhiệm áp dụng -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                    4. Đánh giá Tiêu chuẩn bổ nhiệm áp dụng
                                </h3>
                                <div style="display: flex; flex-direction: column; gap: 10px;">
                                    ${(item.standards || []).map(st => `
                                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 13px;">
                                            <span style="font-weight: 600; color: #334155;">${st.name}</span>
                                            <span class="badge ${st.status === 'Đạt' ? 'badge-success' : 'badge-warning'}">${st.status}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                        </div>

                        <!-- CỘT PHẢI: LUỒNG THAO TÁC HỒ SƠ -->
                        <div>
                            <div class="card" style="padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0 0 14px; display: flex; align-items: center; gap: 6px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2-2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                                    Thao tác hồ sơ bổ nhiệm
                                </h4>

                                <div style="display: flex; flex-direction: column; gap: 10px;">
                                    ${item.statusCode === 'draft' ? `
                                        <button type="button" class="btn btn-primary" id="btn-action-submit-confirm" style="width: 100%; justify-content: center; font-weight: 700;">
                                            Trình xác nhận gửi
                                        </button>
                                        <button type="button" class="btn btn-secondary" id="btn-action-edit-dossier" style="width: 100%; justify-content: center;">
                                            Cập nhật thông tin quản lý
                                        </button>
                                    ` : ''}

                                    ${item.statusCode === 'pending_confirm' ? `
                                        <button type="button" class="btn btn-primary" id="btn-action-head-confirm" style="width: 100%; justify-content: center; font-weight: 700; background: #0284c7 !important;">
                                            Thủ trưởng xác nhận gửi thẩm định
                                        </button>
                                    ` : ''}

                                    ${item.statusCode === 'pending_supplement' ? `
                                        <button type="button" class="btn btn-primary" id="btn-action-submit-supplement" style="width: 100%; justify-content: center; font-weight: 700; background: #d97706 !important;">
                                            Bổ sung & Trình gửi lại
                                        </button>
                                    ` : ''}

                                    ${item.statusCode !== 'cancelled' && item.statusCode !== 'approved' ? `
                                        <button type="button" class="btn btn-secondary" id="btn-action-cancel-dossier" style="width: 100%; justify-content: center; color: #dc2626; border-color: #fecaca;">
                                            Hủy hồ sơ bổ nhiệm
                                        </button>
                                    ` : ''}
                                </div>
                            </div>

                            <!-- Lịch sử xử lý -->
                            <div class="card" style="padding: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0 0 14px; display: flex; align-items: center; gap: 6px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    Lịch sử xử lý hồ sơ
                                </h4>
                                <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12.5px;">
                                    ${(item.history || []).map(h => `
                                        <div style="border-left: 2px solid var(--primary); padding-left: 10px;">
                                            <div style="font-weight: 700; color: #0f172a;">${h.action}</div>
                                            <div style="font-size: 11px; color: #64748b;">${h.user} · ${h.time}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Back
        container.querySelector('#bc-back-list')?.addEventListener('click', () => renderListView());

        // Event actions
        container.querySelector('#btn-action-edit-dossier')?.addEventListener('click', () => showEditDossierModal(item, container));

        // Trình xác nhận gửi (Cán bộ phụ trách)
        container.querySelector('#btn-action-submit-confirm')?.addEventListener('click', () => {
            const missing = (item.components || []).filter(c => c.required && !c.doc);
            if (missing.length > 0) {
                App.notify(`Hồ sơ còn thiếu ${missing.length} thành phần tài liệu bắt buộc. Vui lòng bổ sung trước khi trình.`, 'warning');
                return;
            }

            item.statusCode = 'pending_confirm';
            item.status = 'Chờ xác nhận gửi';
            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: App.user ? App.user.name : 'Cán bộ TCCB',
                action: 'Trình hồ sơ lên Thủ trưởng đơn vị xác nhận gửi thẩm định'
            });

            App.notify('Đã trình hồ sơ lên Thủ trưởng đơn vị xác nhận gửi thẩm định!', 'success');
            renderViewDossierDetail(item, container);
        });

        // Thủ trưởng xác nhận gửi thẩm định
        container.querySelector('#btn-action-head-confirm')?.addEventListener('click', () => {
            item.statusCode = 'pending_review';
            item.status = 'Chờ thẩm định';
            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: 'Thủ trưởng đơn vị',
            });

            App.notify('Xác nhận gửi thẩm định thành công. Hồ sơ đã chuyển sang Ban TCCB!', 'success');
            renderViewDossierDetail(item, container);
        });

        // Thủ trưởng yêu cầu điều chỉnh
        container.querySelector('#btn-action-reject-confirm')?.addEventListener('click', () => {
            item.statusCode = 'draft';
            item.status = 'Chưa gửi thẩm định';
            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: 'Thủ trưởng đơn vị',
                action: 'Yêu cầu Cán bộ phụ trách rà soát lại thông tin trước khi gửi'
            });

            App.notify('Đã chuyển hồ sơ về trạng thái Chưa gửi thẩm định để điều chỉnh.', 'info');
            renderViewDossierDetail(item, container);
        });

        // UC04.07: Bổ sung & Trình gửi lại
        container.querySelector('#btn-action-supplement-resubmit')?.addEventListener('click', () => {
            item.statusCode = 'pending_confirm';
            item.status = 'Chờ xác nhận gửi';
            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: App.user ? App.user.name : 'Cán bộ TCCB',
                action: 'Hoàn tất bổ sung tài liệu và trình Thủ trưởng đơn vị xác nhận gửi lại'
            });

            App.notify('Đã trình gửi lại hồ sơ bổ nhiệm sau bổ sung!', 'success');
            renderViewDossierDetail(item, container);
        });

        // UC04.08: Hủy hồ sơ bổ nhiệm
        container.querySelector('#btn-action-cancel-dossier')?.addEventListener('click', () => {
            showCancelDossierModal(item, container);
        });

        // Upload doc modal
        container.querySelectorAll('.btn-upload-comp-doc').forEach(btn => {
            btn.addEventListener('click', () => {
                const compId = btn.dataset.compId;
                const comp = (item.components || []).find(c => c.id === compId);
                if (comp) showUploadDocModal(item, comp, container);
            });
        });
    };

    // --------------------------------------------------------------------------------
    // UC04.03 – TẢI VÀ KHAI BÁO TÀI LIỆU HỒ SƠ BỔ NHIỆM
    // --------------------------------------------------------------------------------
    const showUploadDocModal = (item, comp, container) => {
        const html = `
            <div style="padding: 8px 0 16px;">
                <p style="color: #334155; font-size: 13.5px; margin-bottom: 16px;">
                    Tải lên và khai báo thông tin tài liệu cho thành phần: <strong>${comp.name}</strong>
                </p>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Tên tài liệu <span class="text-danger">*</span></label>
                    <input type="text" class="form-input" id="doc-title" value="${comp.name}" style="height: 38px;" required>
                </div>
                <div class="grid-2" style="gap: 14px; margin-bottom: 14px;">
                    <div class="form-group">
                        <label class="form-label">Số văn bản</label>
                        <input type="text" class="form-input" id="doc-code" placeholder="Ví dụ: 15/TT-TCCB" style="height: 38px;">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Cơ quan ban hành / cấp</label>
                        <input type="text" class="form-input" id="doc-agency" value="${item.unit}" style="height: 38px;">
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 16px;">
                    <label class="form-label">Chọn tệp đính kèm (PDF, DOCX) <span class="text-danger">*</span></label>
                    <input type="file" class="form-input" id="doc-file-input" style="padding: 6px;" required>
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Hủy bỏ</button>
                <button type="button" class="btn btn-primary" id="btn-save-comp-doc">Lưu tài liệu</button>
            </div>
        `;

        App.openModal(`Tải tài liệu: ${comp.name}`, html);

        document.getElementById('btn-save-comp-doc')?.addEventListener('click', () => {
            const title = document.getElementById('doc-title')?.value.trim();
            const code = document.getElementById('doc-code')?.value.trim();
            const agency = document.getElementById('doc-agency')?.value.trim();

            if (!title) {
                App.notify('Vui lòng nhập tên tài liệu.', 'warning');
                return;
            }

            comp.doc = {
                name: title + '.pdf',
                code: code || 'Văn bản đính kèm',
                date: new Date().toISOString().split('T')[0],
                agency: agency || item.unit
            };
            comp.status = 'Đã có tài liệu';

            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: App.user ? App.user.name : 'Cán bộ TCCB',
                action: `Tải lên tài liệu cho thành phần: ${comp.name}`
            });

            App.closeModal();
            App.notify(`Đã bổ sung tài liệu thành công cho ${comp.name}!`, 'success');
            renderViewDossierDetail(item, container);
        });
    };

    // --------------------------------------------------------------------------------
    // UC04.08 – HỦY HỒ SƠ BỔ NHIỆM
    // --------------------------------------------------------------------------------
    const showCancelDossierModal = (item, container) => {
        const html = `
            <div style="padding: 8px 0 16px;">
                <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-size: 13px; color: #991b1b;">
                    <strong>Cảnh báo:</strong> Hủy hồ sơ sẽ chấm dứt quy trình xử lý. Dữ liệu và lịch sử đã phát sinh sẽ được bảo toàn để tra cứu.
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Lý do hủy hồ sơ <span class="text-danger">*</span></label>
                    <textarea class="form-input" id="cancel-reason" rows="3" placeholder="Nhập cụ thể lý do hủy hồ sơ (thay đổi nhu cầu, phát hiện sai sót...)..." required></textarea>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Căn cứ / Văn bản đính kèm (nếu có)</label>
                    <input type="text" class="form-input" id="cancel-basis" placeholder="Ví dụ: Công văn số 88/ĐHĐN..." style="height: 38px;">
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Hủy thao tác</button>
                <button type="button" class="btn btn-primary" id="btn-confirm-cancel-dossier" style="background: #dc2626 !important;">
                    Xác nhận hủy hồ sơ
                </button>
            </div>
        `;

        App.openModal(`Hủy hồ sơ bổ nhiệm: ${item.id}`, html);

        document.getElementById('btn-confirm-cancel-dossier')?.addEventListener('click', () => {
            const reason = document.getElementById('cancel-reason')?.value.trim();
            const basis = document.getElementById('cancel-basis')?.value.trim();

            if (!reason) {
                App.notify('Vui lòng nhập lý do hủy hồ sơ.', 'warning');
                return;
            }

            item.statusCode = 'cancelled';
            item.status = 'Đã hủy';
            item.cancelReason = reason;
            item.cancelBasis = basis;
            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: App.user ? App.user.name : 'Thủ trưởng / Cán bộ TCCB',
                action: `Hủy hồ sơ bổ nhiệm. Lý do: ${reason}`
            });

            App.closeModal();
            App.notify(`Đã hủy hồ sơ ${item.id}. Hồ sơ đã chuyển sang trạng thái "Đã hủy".`, 'info');
            renderViewDossierDetail(item, container);
        });
    };

    // Khởi tạo giao diện mặc định ban đầu là danh sách hồ sơ
    renderListView();
}

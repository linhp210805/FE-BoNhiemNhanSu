function renderNhiemKy(container) {
    if (App && App.clearFullPage) App.clearFullPage();

    // Khởi tạo danh sách nhiệm kỳ chức vụ mẫu nếu chưa có
    if (!App.state.termsList || App.state.termsList.length === 0) {
        App.state.termsList = [
            {
                id: 'NK-2021-001',
                personId: 'NS-2019-042',
                person: 'PGS.TS. Trần Thị Hoa',
                position: 'Phó Chánh Văn phòng',
                unit: 'Văn phòng',
                type: 'Chính nhiệm',
                procedureType: 'Bổ nhiệm lại',
                startDate: '2021-05-15',
                endDate: '2026-05-15',
                termYear: '2021 - 2026',
                status: 'Đã hết hạn',
                statusCode: 'expired',
                daysLeft: -70,
                warningLevel: 'danger',
                decisionId: '98/QĐ-ĐHĐN',
                dossierId: 'HS-2026-002',
                hasActiveProposal: true,
                activeProposalId: 'DX-2026-002',
                prevTermId: 'NK-2016-042',
                nextTermId: null,
                history: [
                    { time: '2021-05-15 08:00', user: 'Văn phòng ĐHĐN', action: 'Ban hành quyết định bổ nhiệm số 98/QĐ-ĐHĐN' },
                    { time: '2026-02-15 09:00', user: 'Hệ thống', action: 'Gửi cảnh báo nhiệm kỳ sắp hết hạn trước 90 ngày' },
                    { time: '2026-05-15 00:00', user: 'Hệ thống', action: 'Nhiệm kỳ đã chính thức hết hạn' }
                ]
            },
            {
                id: 'NK-2021-002',
                personId: 'NS-2018-001',
                person: 'TS. Lê Văn Minh',
                position: 'Phó Giám đốc',
                unit: 'Ban Giám đốc',
                type: 'Chính nhiệm',
                procedureType: 'Bổ nhiệm lại',
                startDate: '2021-08-20',
                endDate: '2026-08-20',
                termYear: '2021 - 2026',
                status: 'Sắp hết hạn (Dưới 30 ngày)',
                statusCode: 'warning',
                daysLeft: 27,
                warningLevel: 'warning',
                decisionId: '105/QĐ-ĐHĐN',
                dossierId: 'HS-2026-003',
                hasActiveProposal: false,
                activeProposalId: null,
                prevTermId: null,
                nextTermId: null,
                history: [
                    { time: '2021-08-20 08:00', user: 'Ban TCCB', action: 'Kích hoạt hiệu lực nhiệm kỳ theo QĐ 105/QĐ-ĐHĐN' },
                    { time: '2026-05-20 09:00', user: 'Hệ thống', action: 'Gửi cảnh báo sắp hết hạn trước 90 ngày' }
                ]
            },
            {
                id: 'NK-2021-003',
                personId: 'NS-2021-045',
                person: 'ThS. Bùi Thị Hương',
                position: 'Phó Trưởng ban',
                unit: 'Ban Đào tạo',
                type: 'Kiêm nhiệm',
                procedureType: 'Bổ nhiệm kiêm nhiệm',
                startDate: '2021-11-10',
                endDate: '2026-11-10',
                termYear: '2021 - 2026',
                status: 'Sắp hết hạn (Dưới 90 ngày)',
                statusCode: 'warning',
                daysLeft: 75,
                warningLevel: 'info',
                decisionId: '112/QĐ-ĐHĐN',
                dossierId: null,
                hasActiveProposal: false,
                activeProposalId: null,
                prevTermId: null,
                nextTermId: null,
                history: [
                    { time: '2021-11-10 08:00', user: 'Ban TCCB', action: 'Ban hành quyết định bổ nhiệm kiêm nhiệm số 112/QĐ-ĐHĐN' }
                ]
            },
            {
                id: 'NK-2026-004',
                personId: 'NS-2020-012',
                person: 'TS. Phạm Quốc Bảo',
                position: 'Trưởng ban',
                unit: 'Ban Thanh tra và Pháp chế',
                type: 'Chính nhiệm',
                procedureType: 'Bổ nhiệm mới',
                startDate: '2026-06-01',
                endDate: '2031-06-01',
                termYear: '2026 - 2031',
                status: 'Đang đảm nhiệm',
                statusCode: 'active',
                daysLeft: 1773,
                warningLevel: 'success',
                decisionId: '125/QĐ-ĐHĐN',
                dossierId: 'HS-2026-001',
                hasActiveProposal: false,
                activeProposalId: null,
                prevTermId: null,
                nextTermId: null,
                history: [
                    { time: '2026-06-01 08:00', user: 'Ban TCCB', action: 'Ban hành quyết định 125/QĐ-ĐHĐN và kích hoạt nhiệm kỳ 2026-2031' }
                ]
            }
        ];
    }

    // --------------------------------------------------------------------------------
    // MÀN HÌNH CHÍNH QUẢN LÝ NHIỆM KỲ VÀ CẢNH BÁO (UC07.01 & UC07.03)
    // --------------------------------------------------------------------------------
    const renderMainScreen = (currentTab = 'all') => {
        const list = App.state.termsList || [];
        const expiredCount = list.filter(t => t.statusCode === 'expired').length;
        const warningCount = list.filter(t => t.statusCode === 'warning').length;
        const activeCount = list.filter(t => t.statusCode === 'active').length;

        const html = `
            <div class="page-header">
                <div class="page-header-left">
                    <h1 style="font-size: 22px; font-weight: 800; color: var(--text-primary);">Quản lý nhiệm kỳ & Cảnh báo xử lý</h1>
                    <p style="color: var(--text-tertiary); margin-top: 4px; font-size: 13px;">Theo dõi thời hạn nhiệm kỳ, cảnh báo sắp hết hạn và quá trình đảm nhiệm chức vụ cán bộ</p>
                </div>
            </div>

            <!-- Thống kê tổng quan mốc cảnh báo -->
            <div class="stats-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px;">
                <div class="card" style="padding: 16px 20px; border-radius: 12px; border-left: 4px solid var(--primary); background: #ffffff;">
                    <div style="font-size: 12px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Tổng nhiệm kỳ đang theo dõi</div>
                    <div style="font-size: 24px; font-weight: 800; color: var(--primary); margin-top: 4px;">${list.length}</div>
                </div>
                <div class="card" style="padding: 16px 20px; border-radius: 12px; border-left: 4px solid #dc2626; background: #ffffff;">
                    <div style="font-size: 12px; font-weight: 700; color: #dc2626; text-transform: uppercase;">Đã hết nhiệm kỳ (Cần xử lý)</div>
                    <div style="font-size: 24px; font-weight: 800; color: #dc2626; margin-top: 4px;">${expiredCount}</div>
                </div>
                <div class="card" style="padding: 16px 20px; border-radius: 12px; border-left: 4px solid #d97706; background: #ffffff;">
                    <div style="font-size: 12px; font-weight: 700; color: #d97706; text-transform: uppercase;">Sắp hết nhiệm kỳ (Dưới 90 ngày)</div>
                    <div style="font-size: 24px; font-weight: 800; color: #d97706; margin-top: 4px;">${warningCount}</div>
                </div>
                <div class="card" style="padding: 16px 20px; border-radius: 12px; border-left: 4px solid #16a34a; background: #ffffff;">
                    <div style="font-size: 12px; font-weight: 700; color: #16a34a; text-transform: uppercase;">Đang đảm nhiệm an toàn</div>
                    <div style="font-size: 24px; font-weight: 800; color: #16a34a; margin-top: 4px;">${activeCount}</div>
                </div>
            </div>

            <!-- Quick Filter Tabs -->
            <div class="tenure-tabs" id="tenure-tabs-bar">
                <button type="button" class="tenure-tab-btn active" data-tab="all">
                    Tất cả <span class="tenure-tab-count">${list.length}</span>
                </button>
                <button type="button" class="tenure-tab-btn" data-tab="expired">
                    Đã quá hạn <span class="tenure-tab-count">${expiredCount}</span>
                </button>
                <button type="button" class="tenure-tab-btn" data-tab="under30">
                    Sắp hết hạn (≤30 ngày) <span class="tenure-tab-count">${list.filter(t => t.daysLeft > 0 && t.daysLeft <= 30).length}</span>
                </button>
                <button type="button" class="tenure-tab-btn" data-tab="under90">
                    Sắp hết hạn (≤90 ngày) <span class="tenure-tab-count">${list.filter(t => t.daysLeft > 30 && t.daysLeft <= 90).length}</span>
                </button>
                <button type="button" class="tenure-tab-btn" data-tab="active">
                    An toàn <span class="tenure-tab-count">${activeCount}</span>
                </button>
            </div>

            <!-- Bộ lọc tra cứu nhiệm kỳ -->
            <div class="module-filter-card">
                <div class="module-filter-header">
                    <div class="module-filter-title">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        BỘ LỌC TRA CỨU NHIỆM KỲ & MỐC CẢNH BÁO
                    </div>
                </div>

                <div class="filter-grid-4">
                    <div>
                        <label class="form-label">Tên nhân sự, mã nhiệm kỳ</label>
                        <input type="text" class="form-input" id="filter-term-kw" placeholder="Nhập tên nhân sự, mã NK...">
                    </div>
                    <div>
                        <label class="form-label">Đơn vị công tác</label>
                        <select class="form-input" id="filter-term-unit">
                            <option value="">Tất cả đơn vị</option>
                            <option value="Ban Giám đốc">Ban Giám đốc</option>
                            <option value="Văn phòng">Văn phòng</option>
                            <option value="Ban Đào tạo">Ban Đào tạo</option>
                            <option value="Ban Tổ chức Cán bộ">Ban Tổ chức Cán bộ</option>
                            <option value="Ban Kế hoạch - Tài chính">Ban Kế hoạch - Tài chính</option>
                            <option value="Ban KHCN & Môi trường">Ban KHCN & Môi trường</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Trạng thái cảnh báo</label>
                        <select class="form-input" id="filter-term-warning">
                            <option value="">Tất cả mốc cảnh báo</option>
                            <option value="expired">Đã quá hạn</option>
                            <option value="under30">Sắp hết hạn (≤ 30 ngày)</option>
                            <option value="under90">Sắp hết hạn (≤ 90 ngày)</option>
                            <option value="active">Đang đảm nhiệm an toàn</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Hình thức bổ nhiệm</label>
                        <select class="form-input" id="filter-term-type">
                            <option value="">Tất cả hình thức</option>
                            <option value="Chính nhiệm">Chính nhiệm</option>
                            <option value="Kiêm nhiệm">Kiêm nhiệm</option>
                        </select>
                    </div>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px;">
                    <button type="button" class="btn btn-secondary" id="btn-reset-term-filters" style="height: 40px; padding: 0 18px; font-weight: 600; border-radius: 8px; font-size: 13.5px; border: 1px solid #cbd5e1; color: #475569;">
                        Đặt lại
                    </button>
                    <button type="button" class="btn btn-primary" id="btn-apply-term-filters" style="height: 40px; padding: 0 22px; font-weight: 700; border-radius: 8px; font-size: 13.5px; display: flex; align-items: center; gap: 8px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        Tra cứu
                    </button>
                </div>
            </div>

            <!-- Bảng danh sách nhiệm kỳ -->
            <div class="card" style="border-radius: 12px; border: 1px solid var(--border); background: #ffffff; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <div style="padding: 16px 20px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; background: #fafafa;">
                    <span style="font-weight: 700; font-size: 14px; color: var(--text-primary);">
                        Danh sách nhiệm kỳ chức vụ cán bộ (<span id="term-count-total">${list.length}</span>)
                    </span>
                </div>
                <div class="table-container" style="border: none; overflow-x: auto;">
                    <table class="data-table" style="width: 100%; min-width: 980px;">
                        <thead>
                            <tr>
                                <th style="width: 9%; white-space: nowrap;">Mã NK</th>
                                <th style="width: 19%; white-space: nowrap;">Nhân sự đảm nhiệm</th>
                                <th style="width: 19%; white-space: nowrap;">Chức vụ và đơn vị</th>
                                <th style="width: 10%; text-align: center; white-space: nowrap;">Hình thức</th>
                                <th style="width: 14%; text-align: center; white-space: nowrap;">Thời hạn nhiệm kỳ</th>
                                <th style="width: 14%; text-align: center; white-space: nowrap;">Trạng thái cảnh báo</th>
                                <th style="width: 15%; min-width: 130px; text-align: center; white-space: nowrap;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="term-table-body">
                            ${renderTermRows(list)}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Quick Tabs Event Listeners
        const tabsBar = container.querySelector('#tenure-tabs-bar');
        tabsBar?.querySelectorAll('.tenure-tab-btn').forEach(tabBtn => {
            tabBtn.addEventListener('click', () => {
                tabsBar.querySelectorAll('.tenure-tab-btn').forEach(b => b.classList.remove('active'));
                tabBtn.classList.add('active');
                const tabValue = tabBtn.dataset.tab;
                const selectWarning = container.querySelector('#filter-term-warning');
                if (selectWarning) {
                    selectWarning.value = tabValue === 'all' ? '' : tabValue;
                }
                applyTermFilters();
            });
        });

        // Events
        container.querySelector('#btn-apply-term-filters')?.addEventListener('click', () => applyTermFilters());
        container.querySelector('#btn-reset-term-filters')?.addEventListener('click', () => {
            container.querySelector('#filter-term-kw').value = '';
            container.querySelector('#filter-term-unit').value = '';
            container.querySelector('#filter-term-warning').value = '';
            container.querySelector('#filter-term-type').value = '';
            tabsBar?.querySelectorAll('.tenure-tab-btn').forEach(b => b.classList.remove('active'));
            tabsBar?.querySelector('[data-tab="all"]')?.classList.add('active');
            applyTermFilters();
        });

        bindTermTableEvents();
    };

    const getTermTypeBadge = (typeStr) => {
        if (typeStr === 'Kiêm nhiệm' || (typeStr && typeStr.includes('kiêm'))) {
            return `<span class="badge" style="background: #ecfeff; color: #0891b2; border: 1px solid #a5f3fc; font-weight: 600; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">Kiêm nhiệm</span>`;
        }
        return `<span class="badge" style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; font-weight: 600; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">Chính nhiệm</span>`;
    };

    const renderTermRows = (list) => {
        if (!list || list.length === 0) {
            return `<tr><td colspan="7" style="text-align: center; padding: 32px; color: var(--text-tertiary);">Không tìm thấy nhiệm kỳ chức vụ nào phù hợp</td></tr>`;
        }
        return list.map(item => {
            const initials = item.person ? item.person.trim().split(' ').pop().slice(0, 2).toUpperCase() : 'NK';
            const borderStyle = item.statusCode === 'expired' 
                ? 'border-left: 4px solid #ef4444;' 
                : (item.daysLeft > 0 && item.daysLeft <= 30)
                ? 'border-left: 4px solid #f59e0b;'
                : (item.daysLeft > 30 && item.daysLeft <= 90)
                ? 'border-left: 4px solid #eab308;'
                : 'border-left: 4px solid #22c55e;';

            return `
            <tr data-id="${item.id}" style="${borderStyle}">
                <td style="font-weight: 700; color: var(--primary); white-space: nowrap;">${item.id}</td>
                <td>
                    <div class="person-cell" style="cursor: pointer;" title="Nhấp để xem quá trình đảm nhiệm chức vụ" onclick="App.renderTimelinePersonnel && App.renderTimelinePersonnel('${item.personId}')">
                        <div class="avatar sm" style="background: var(--primary); color:#fff; font-size:11px; font-weight:700; flex-shrink: 0;">
                            ${initials}
                        </div>
                        <div>
                            <div style="font-weight: 600; color: var(--primary); font-size: 13.5px;">${item.person}</div>
                            <div style="font-size: 11px; color: #64748b;">Mã NS: ${item.personId}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div style="font-weight: 600; color: #0f172a; font-size: 13px;">${item.position}</div>
                    <div style="font-size: 12px; color: #64748b;">${item.unit}</div>
                </td>
                <td style="text-align: center; white-space: nowrap;">${getTermTypeBadge(item.type)}</td>
                <td style="text-align: center; white-space: nowrap;">
                    <div style="font-weight: 600; font-size: 12.5px; color: #334155;">${item.termYear}</div>
                    <div style="font-size: 11.5px; color: #64748b;">${item.startDate} — ${item.endDate}</div>
                </td>
                <td style="text-align: center; white-space: nowrap;">${getTermWarningBadge(item)}</td>
                <td style="text-align: center; white-space: nowrap;" onclick="event.stopPropagation()">
                    <div class="table-actions" style="width: 100%; justify-content: center;">
                        <button class="btn-icon btn-icon-primary btn-view-term" data-id="${item.id}" title="Xem chi tiết thông tin nhiệm kỳ">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        ${item.statusCode === 'expired' || item.statusCode === 'warning' ? `
                            ${item.hasActiveProposal ? `
                                <button class="btn btn-ghost btn-sm" onclick="App.notify('Nhiệm kỳ này đã có đề xuất chủ trương đang được xử lý trên hệ thống.', 'info')" style="color: #0284c7; font-size: 11px; font-weight:700; white-space: nowrap; padding: 4px 8px;">
                                    Đã có Đề xuất
                                </button>
                            ` : `
                                <button class="btn btn-primary btn-sm btn-create-prop-from-term" data-id="${item.id}" title="Tạo đề xuất chủ trương bổ nhiệm" style="font-size: 11px; font-weight: 700; background: #dc2626 !important; white-space: nowrap; padding: 4px 10px; border-radius: 6px;">
                                    Tạo đề xuất
                                </button>
                            `}
                        ` : ''}
                    </div>
                </td>
            </tr>
            `;
        }).join('');
    };

    const getTermWarningBadge = (item) => {
        if (item.statusCode === 'expired') {
            return `<span class="badge" style="background: #fef2f2; color: #991b1b; border: 1px solid #fca5a5; font-weight: 700; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">Quá hạn ${Math.abs(item.daysLeft)} ngày</span>`;
        }
        if (item.daysLeft <= 30) {
            return `<span class="badge" style="background: #fff7ed; color: #c2410c; border: 1px solid #ffedd5; font-weight: 700; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">Còn ${item.daysLeft} ngày</span>`;
        }
        if (item.daysLeft <= 90) {
            return `<span class="badge" style="background: #fefce8; color: #a16207; border: 1px solid #fef08a; font-weight: 700; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">Còn ${item.daysLeft} ngày</span>`;
        }
        return `<span class="badge" style="background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; font-weight: 600; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">Còn ${item.daysLeft} ngày</span>`;
    };

    const applyTermFilters = () => {
        const kw = container.querySelector('#filter-term-kw')?.value.toLowerCase().trim();
        const unit = container.querySelector('#filter-term-unit')?.value;
        const warning = container.querySelector('#filter-term-warning')?.value;
        const type = container.querySelector('#filter-term-type')?.value;

        const filtered = App.state.termsList.filter(t => {
            const matchKw = !kw || t.id.toLowerCase().includes(kw) || t.person.toLowerCase().includes(kw);
            const matchUnit = !unit || t.unit === unit;
            const matchType = !type || t.type === type;
            let matchWarning = true;
            if (warning === 'expired') matchWarning = t.statusCode === 'expired';
            else if (warning === 'under30') matchWarning = t.daysLeft > 0 && t.daysLeft <= 30;
            else if (warning === 'under90') matchWarning = t.daysLeft > 30 && t.daysLeft <= 90;
            else if (warning === 'active') matchWarning = t.statusCode === 'active';
            return matchKw && matchUnit && matchType && matchWarning;
        });

        const tbody = container.querySelector('#term-table-body');
        const count = container.querySelector('#term-count-total');
        if (tbody) tbody.innerHTML = renderTermRows(filtered);
        if (count) count.innerText = filtered.length;

        bindTermTableEvents();
    };

    const bindTermTableEvents = () => {
        container.querySelectorAll('.btn-view-term').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = App.state.termsList.find(t => t.id === btn.dataset.id);
                if (item) renderViewTermDetail(item, container);
            });
        });

        container.querySelectorAll('.btn-create-prop-from-term').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = App.state.termsList.find(t => t.id === btn.dataset.id);
                if (item) handleCreateProposalFromTerm(item, container);
            });
        });
    };

    // --------------------------------------------------------------------------------
    // UC07.02 – XEM CHI TIẾT NHIỆM KỲ
    // --------------------------------------------------------------------------------
    const renderViewTermDetail = (item, container) => {
        const html = `
            <div class="full-page-container" style="background: var(--bg-app); min-height: 100vh; padding-bottom: 40px;">
                <!-- Header chuẩn đồng bộ master system -->
                <div class="page-header-alt" style="padding: 20px 32px; background: #ffffff; border-bottom: 1px solid var(--border); width: 100%;">
                    <div style="width: 100%;">
                        <div class="breadcrumb-bar" style="margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
                            <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                                <span class="bc-back-btn" id="bc-back-list">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                                    QUẢN LÝ NHIỆM KỲ
                                </span>
                                <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                <span class="bc-current">CHI TIẾT NHIỆM KỲ CHỨC VỤ</span>
                            </div>
                            <div>${getTermWarningBadge(item)}</div>
                        </div>
                        <h2 style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin: 0;">
                            Nhiệm kỳ ${item.termYear} — ${item.person} (${item.position})
                        </h2>
                    </div>
                </div>

                <div style="padding: 24px 32px 0; width: 100%;">
                    <div style="display: grid; grid-template-columns: 1fr 340px; gap: 24px;">

                        <!-- CỘT TRÁI CHÍNH -->
                        <div>
                            <!-- Thẻ 1: Thông tin nhân sự & Chức vụ đảm nhiệm -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    1. Thông tin nhân sự & Chức vụ đảm nhiệm
                                </h3>
                                <div style="display: flex; gap: 16px; align-items: center; background: #eff6ff; padding: 16px; border-radius: 10px; border: 1px solid #bfdbfe; margin-bottom: 14px;">
                                    <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; flex-shrink: 0;">
                                        ${item.person.split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <div style="font-size: 16px; font-weight: 700; color: #0f172a;">${item.person}</div>
                                        <div style="font-size: 13px; color: #475569; margin-top: 2px;">
                                            Chức vụ: <strong>${item.position}</strong> · Đơn vị: <strong>${item.unit}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; font-size: 13.5px;">
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Hình thức đảm nhiệm:</span> <div><strong>${item.type}</strong></div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Loại thủ tục phát sinh:</span> <div>${item.procedureType}</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Ngày bắt đầu:</span> <div>${item.startDate}</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Ngày kết thúc:</span> <div style="font-weight:700; color:#dc2626;">${item.endDate}</div></div>
                                </div>
                            </div>

                            <!-- Thẻ 2: Quyết định & Hồ sơ làm căn cứ (UC07.02 Flow 4.1 & 4.2) -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    2. Văn bản & Hồ sơ bổ nhiệm căn cứ
                                </h3>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;">
                                    <div style="padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
                                        <div style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">QUYẾT ĐỊNH CĂN CỨ</div>
                                        <div style="font-size: 14px; font-weight: 700; color: var(--primary); margin-top: 4px;">${item.decisionId || 'Chưa có'}</div>
                                        <button type="button" class="btn btn-ghost btn-sm" onclick="App.notify('Mở chi tiết quyết định ${item.decisionId}...', 'info')" style="margin-top: 8px; color: var(--primary); padding: 4px 8px; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; font-size: 12px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Xem quyết định</button>
                                    </div>
                                    <div style="padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
                                        <div style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">HỒ SƠ BỔ NHIỆM NGUỒN</div>
                                        <div style="font-size: 14px; font-weight: 700; color: var(--primary); margin-top: 4px;">${item.dossierId || 'Chưa liên kết'}</div>
                                        <button type="button" class="btn btn-ghost btn-sm" onclick="App.notify('Mở chi tiết hồ sơ ${item.dossierId}...', 'info')" style="margin-top: 8px; color: var(--primary); padding: 4px 8px; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; font-size: 12px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Xem hồ sơ</button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- CỘT PHẢI: THAO TÁC XỬ LÝ & LỊCH SỬ NHIỆM KỲ -->
                        <div>
                            <div class="card" style="padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0 0 14px; display: flex; align-items: center; gap: 6px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                                    Thao tác đề xuất xử lý
                                </h4>

                                <div style="display: flex; flex-direction: column; gap: 10px;">
                                    ${item.statusCode === 'expired' || item.statusCode === 'warning' ? `
                                        ${item.hasActiveProposal ? `
                                            <div style="padding: 12px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; font-size: 12.5px; color: #0369a1;">
                                                ✓ Nhiệm kỳ này đã có <strong>Đề xuất bổ nhiệm lại hoặc kéo dài</strong> đang xử lý trên hệ thống.
                                            </div>
                                        ` : `
                                            <button type="button" class="btn btn-primary" id="btn-create-prop-detail" style="width: 100%; justify-content: center; font-weight: 700; background: #dc2626 !important; padding: 10px 16px; font-size: 13.5px; white-space: normal; text-align: center;">
                                                Tạo đề xuất bổ nhiệm lại
                                            </button>
                                        `}
                                    ` : `
                                        <div style="padding: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; font-size: 12.5px; color: #15803d;">
                                            ✓ Nhiệm kỳ đang trong thời gian hiệu lực an toàn.
                                        </div>
                                    `}
                                </div>
                            </div>

                            <!-- Lịch sử xử lý nhiệm kỳ -->
                            <div class="card" style="padding: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0 0 14px; display: flex; align-items: center; gap: 6px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    Lịch sử diễn biến nhiệm kỳ
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
        container.querySelector('#bc-back-list')?.addEventListener('click', () => renderMainScreen());

        // Event create proposal
        container.querySelector('#btn-create-prop-detail')?.addEventListener('click', () => handleCreateProposalFromTerm(item, container));
    };

    // --------------------------------------------------------------------------------
    // UC07.03 Step 8.2 & UC03.02 – TẠO ĐỀ XUẤT TỪ NHIỆM KỲ CẢNH BÁO
    // --------------------------------------------------------------------------------
    const handleCreateProposalFromTerm = (termItem, container) => {
        if (termItem.hasActiveProposal) {
            App.notify(`Nhiệm kỳ ${termItem.id} đã có đề xuất chủ trương đang xử lý (${termItem.activeProposalId}). Không thể tạo trùng lập.`, 'warning');
            return;
        }

        App.notify(`Đang mở màn hình Khởi tạo Đề xuất cho cán bộ ${termItem.person}...`, 'info');
        
        App.pendingDeXuatPrefill = {
            personId: termItem.personId,
            personName: termItem.person,
            unit: termItem.unit,
            position: termItem.position,
            procedureType: termItem.statusCode === 'expired' ? 'keodai' : 'lai',
            reason: `Trình Cấp có thẩm quyền xem xét chủ trương bổ nhiệm lại hoặc kéo dài thời gian giữ chức vụ cho cán bộ ${termItem.person} (Nhiệm kỳ ${termItem.termYear}).`,
            basis: `Căn cứ Quy chế QĐ 4343/QĐ-ĐHĐN và kết quả theo dõi thời hạn nhiệm kỳ (Mã NK: ${termItem.id}).`
        };

        if (App && typeof App.navigateTo === 'function') {
            App.navigateTo('dexuat');
        } else {
            window.location.hash = 'dexuat';
        }
    };

    // --------------------------------------------------------------------------------
    // UC07.04 – XEM QUÁ TRÌNH ĐẢM NHIỆM CHỨC VỤ CỦA NHÂN SỰ
    // --------------------------------------------------------------------------------
    const renderTimelinePersonnel = (personId) => {
        const terms = (App.state.termsList || []).filter(t => t.personId === personId || t.person.includes('Trần Thị Hoa'));
        const personName = terms.length > 0 ? terms[0].person : 'Cán bộ Đại học Đà Nẵng';

        const html = `
            <div class="full-page-container" style="background: var(--bg-app); min-height: 100vh; padding-bottom: 40px;">
                <div class="page-header-alt" style="padding: 20px 32px; background: #ffffff; border-bottom: 1px solid var(--border); width: 100%;">
                    <div style="width: 100%;">
                        <div class="breadcrumb-bar" style="margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
                            <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                                <span class="bc-back-btn" id="bc-back-list">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                                    QUẢN LÝ NHIỆM KỲ
                                </span>
                                <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                <span class="bc-current">QUÁ TRÌNH ĐẢM NHIỆM CHỨC VỤ</span>
                            </div>
                        </div>
                        <h2 style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin: 0;">
                            Quá trình công tác & Đảm nhiệm chức vụ: ${personName}
                        </h2>
                    </div>
                </div>

                <div style="padding: 24px 32px 0; width: 100%;">
                    <div class="card" style="padding: 24px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; margin-bottom: 24px;">
                        <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                            Lịch sử đảm nhiệm các chức vụ theo tiến trình thời gian
                        </h3>

                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <div style="padding: 16px; border-left: 4px solid #16a34a; background: #f0fdf4; border-radius: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div style="font-weight: 700; font-size: 15px; color: #0f172a;">Phó Chánh Văn phòng — Văn phòng ĐHĐN</div>
                                    <span class="badge badge-success">Nhiệm kỳ 2021 - 2026</span>
                                </div>
                                <div style="font-size: 13px; color: #475569; margin-top: 4px;">
                                    Hình thức: <strong>Chính nhiệm</strong> · Loại thủ tục: <strong>Bổ nhiệm lại</strong> · Quyết định số: <strong>98/QĐ-ĐHĐN</strong>
                                </div>
                                <div style="font-size: 12px; color: #64748b; margin-top: 4px;">
                                    Thời gian: 15/05/2021 — 15/05/2026
                                </div>
                            </div>

                            <div style="padding: 16px; border-left: 4px solid #94a3b8; background: #f8fafc; border-radius: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div style="font-weight: 700; font-size: 15px; color: #0f172a;">Phó Chánh Văn phòng — Văn phòng ĐHĐN</div>
                                    <span class="badge badge-secondary">Nhiệm kỳ 2016 - 2021</span>
                                </div>
                                <div style="font-size: 13px; color: #475569; margin-top: 4px;">
                                    Hình thức: <strong>Chính nhiệm</strong> · Loại thủ tục: <strong>Bổ nhiệm mới</strong> · Quyết định số: <strong>12/QĐ-ĐHĐN</strong>
                                </div>
                                <div style="font-size: 12px; color: #64748b; margin-top: 4px;">
                                    Thời gian: 10/05/2016 — 10/05/2021
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        container.querySelector('#bc-back-list')?.addEventListener('click', () => renderMainScreen());
    };

    // Đăng ký toàn cục để truy cập từ ngoài
    App.renderTimelinePersonnel = (personId) => renderTimelinePersonnel(personId);

    // Khởi tạo hiển thị ban đầu
    renderMainScreen();
}

function renderQuyetDinh(container) {
    if (App && App.clearFullPage) App.clearFullPage();

    // Khởi tạo dữ liệu mẫu cho quyết định nếu chưa có
    if (!App.state.decisionsList || App.state.decisionsList.length === 0) {
        App.state.decisionsList = [
            {
                id: 'QĐ-2026-125',
                code: '125/QĐ-ĐHĐN',
                dossierId: 'HS-2026-001',
                type: 'Bổ nhiệm mới',
                typeCode: 'moi',
                person: 'TS. Phạm Quốc Bảo',
                personId: 'NV012',
                position: 'Trưởng ban',
                unit: 'Ban Thanh tra và Pháp chế',
                dateSigned: '2026-06-01',
                effectiveDate: '2026-06-01',
                term: '5 năm (2026 - 2031)',
                signer: 'GS.TS. Nguyễn Văn A',
                signerTitle: 'Giám đốc Đại học Đà Nẵng',
                status: 'Có hiệu lực',
                statusCode: 'active',
                isPublished: true,
                docFile: { name: 'QD_125_QD_DHDN_PhamQuocBao.pdf', size: '2.4 MB' },
                recipients: 'Ban Giám đốc, Ban TCCB, Ban Thanh tra, Cá nhân',
                notes: 'Quyết định bổ nhiệm mới có hiệu lực kể từ ngày ký',
                history: [
                    { time: '2026-05-25 09:00', user: 'Cán bộ TCCB', action: 'Tạo dự thảo quyết định từ hồ sơ HS-2026-001' },
                    { time: '2026-05-28 14:30', user: 'Văn phòng ĐHĐN', action: 'Cập nhật thông tin phát hành (Số 125/QĐ-ĐHĐN)' },
                    { time: '2026-06-01 08:00', user: 'Ban TCCB', action: 'Cập nhật quyết định đã ký và kích hoạt hiệu lực chức vụ' }
                ]
            },
            {
                id: 'QĐ-2026-124',
                code: '124/QĐ-ĐHĐN',
                dossierId: 'HS-2026-002',
                type: 'Bổ nhiệm lại',
                typeCode: 'lai',
                person: 'PGS.TS Nguyễn Anh',
                personId: 'NV008',
                position: 'Trưởng ban',
                unit: 'Ban Cơ sở vật chất',
                dateSigned: '2026-05-28',
                effectiveDate: '2026-06-01',
                term: '5 năm (2026 - 2031)',
                signer: 'GS.TS. Nguyễn Văn A',
                signerTitle: 'Giám đốc Đại học Đà Nẵng',
                status: 'Có hiệu lực',
                statusCode: 'active',
                isPublished: true,
                docFile: { name: 'QD_124_QD_DHDN_NguyenAnh.pdf', size: '1.8 MB' },
                recipients: 'Ban Giám đốc, Ban TCCB, Ban CSVC, Cá nhân',
                notes: 'Quyết định bổ nhiệm lại nhiệm kỳ 2',
                history: [
                    { time: '2026-05-20 10:00', user: 'Cán bộ TCCB', action: 'Tạo dự thảo quyết định bổ nhiệm lại' },
                    { time: '2026-05-28 16:00', user: 'Văn phòng ĐHĐN', action: 'Hoàn tất thông tin phát hành số 124/QĐ-ĐHĐN' }
                ]
            },
            {
                id: 'DT-2026-003',
                code: 'Dự thảo QĐ',
                dossierId: 'HS-2026-003',
                type: 'Bổ nhiệm lại',
                typeCode: 'lai',
                person: 'TS. Lê Văn Minh',
                personId: 'NV010',
                position: 'Phó Giám đốc',
                unit: 'Ban Giám đốc',
                dateSigned: null,
                effectiveDate: '2026-07-01',
                term: '5 năm',
                signer: 'Giám đốc Đại học Đà Nẵng',
                signerTitle: 'Giám đốc Đại học Đà Nẵng',
                status: 'Dự thảo',
                statusCode: 'draft',
                isPublished: false,
                docFile: null,
                recipients: 'Ban Giám đốc, Ban TCCB, Cá nhân',
                notes: 'Dự thảo quyết định đang chờ hoàn thiện trình ký',
                history: [
                    { time: '2026-06-20 11:00', user: 'Cán bộ TCCB', action: 'Tạo dự thảo quyết định từ hồ sơ HS-2026-003' }
                ]
            }
        ];
    }

    // --------------------------------------------------------------------------------
    // 1. XEM DANH SÁCH QUYẾT ĐỊNH (Màn hình chính)
    // --------------------------------------------------------------------------------
    function renderListView() {
        const list = App.state.decisionsList || [];
        const dossiers = App.state.dossiers || [];
        const approvedDossiers = dossiers.filter(d => d.statusCode === 'approved');

        const html = `
            <div class="page-header">
                <div class="page-header-left">
                    <h1 style="font-size: 22px; font-weight: 800; color: var(--text-primary);">Quản lý quyết định & Hiệu lực chức vụ</h1>
                    <p style="color: var(--text-tertiary); margin-top: 4px; font-size: 13px;">Lập dự thảo, trình ký, cập nhật phát hành và quản lý hiệu lực quyết định bổ nhiệm</p>
                </div>
                <div class="page-header-actions" style="display: flex; gap: 10px;">
                    <button class="btn btn-primary" id="btn-open-create-draft" style="font-weight: 700;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Tạo dự thảo quyết định
                    </button>
                </div>
            </div>

            <!-- Bộ lọc tra cứu quyết định -->
            <div class="module-filter-card">
                <div class="module-filter-header">
                    <div class="module-filter-title">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        BỘ LỌC TRA CỨU QUYẾT ĐỊNH
                    </div>
                </div>

                <div class="filter-grid-4">
                    <div>
                        <label class="form-label">Số quyết định, nhân sự</label>
                        <input type="text" class="form-input" id="filter-dec-kw" placeholder="Nhập số QĐ, tên nhân sự...">
                    </div>
                    <div>
                        <label class="form-label">Loại quyết định</label>
                        <select class="form-input" id="filter-dec-type">
                            <option value="">Tất cả loại QĐ</option>
                            <option value="moi">Bổ nhiệm mới</option>
                            <option value="lai">Bổ nhiệm lại</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Đơn vị</label>
                        <select class="form-input" id="filter-dec-unit">
                            <option value="">Tất cả đơn vị</option>
                            <option value="Ban Giám đốc">Ban Giám đốc</option>
                            <option value="Văn phòng">Văn phòng</option>
                            <option value="Ban Tổ chức Cán bộ">Ban Tổ chức Cán bộ</option>
                            <option value="Ban Thanh tra và Pháp chế">Ban Thanh tra và Pháp chế</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Trạng thái quyết định</label>
                        <select class="form-input" id="filter-dec-status">
                            <option value="">Tất cả trạng thái</option>
                            <option value="draft">Dự thảo</option>
                            <option value="pending_sign">Chờ ký</option>
                            <option value="published">Đã phát hành</option>
                            <option value="active">Có hiệu lực</option>
                            <option value="pending_effective">Chưa hiệu lực</option>
                        </select>
                    </div>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px;">
                    <button type="button" class="btn btn-secondary" id="btn-reset-dec-filters" style="height: 40px; padding: 0 18px; font-weight: 600; border-radius: 8px; font-size: 13.5px; border: 1px solid #cbd5e1; color: #475569;">
                        Đặt lại
                    </button>
                    <button type="button" class="btn btn-primary" id="btn-apply-dec-filters" style="height: 40px; padding: 0 22px; font-weight: 700; border-radius: 8px; font-size: 13.5px; display: flex; align-items: center; gap: 8px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        Tra cứu
                    </button>
                </div>
            </div>

            <!-- Bảng danh sách quyết định -->
            <div class="card" style="border-radius: 12px; border: 1px solid var(--border); background: #ffffff; overflow: hidden;">
                <div style="padding: 16px 20px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 700; font-size: 14px; color: var(--text-primary);">Danh sách quyết định bổ nhiệm (<span id="dec-count-total">${list.length}</span>)</span>
                </div>
                <div class="table-container" style="border: none;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th style="width: 14%;">Số Quyết định</th>
                                <th style="width: 14%; text-align: center; white-space: nowrap;">Loại QĐ</th>
                                <th style="width: 20%;">Nhân sự được bổ nhiệm</th>
                                <th style="width: 21%;">Đơn vị công tác</th>
                                <th style="width: 11%; text-align: center; white-space: nowrap;">Ngày ký</th>
                                <th style="width: 11%; text-align: center; white-space: nowrap;">Ngày hiệu lực</th>
                                <th style="width: 11%; text-align: center; white-space: nowrap;">Trạng thái</th>
                                <th style="width: 8%; text-align: center;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="dec-table-body">
                            ${renderDecRows(list)}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Events
        container.querySelector('#btn-open-create-draft')?.addEventListener('click', () => showCreateDraftModal(approvedDossiers, container));
        container.querySelector('#btn-apply-dec-filters')?.addEventListener('click', () => applyDecFilters());
        container.querySelector('#btn-reset-dec-filters')?.addEventListener('click', () => {
            container.querySelector('#filter-dec-kw').value = '';
            container.querySelector('#filter-dec-type').value = '';
            container.querySelector('#filter-dec-unit').value = '';
            container.querySelector('#filter-dec-status').value = '';
            applyDecFilters();
        });

        bindDecTableEvents();
    }

    function renderDecRows(list) {
        if (!list || list.length === 0) {
            return `<tr><td colspan="8" style="text-align: center; padding: 32px; color: var(--text-tertiary);">Không tìm thấy quyết định nào phù hợp</td></tr>`;
        }
        return list.map(item => `
            <tr data-id="${item.id}">
                <td style="font-weight: 700; color: var(--primary);">${item.code || item.id}</td>
                <td style="text-align: center; white-space: nowrap;">${getDecisionTypeBadge(item.typeCode, item.type)}</td>
                <td>
                    <div class="person-cell">
                        <div class="avatar sm" style="background: var(--primary); color:#fff; font-size:11px; font-weight:700; flex-shrink: 0;">
                            ${(item.person || '').split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                        </div>
                        <div style="font-weight: 600; color: var(--text-primary);">${item.person}</div>
                    </div>
                </td>
                <td>
                    <div style="font-weight: 600;">${item.position}</div>
                    <div style="font-size: 11.5px; color: var(--text-tertiary);">${item.unit}</div>
                </td>
                <td style="text-align: center; font-size: 12.5px; color: var(--text-secondary); white-space: nowrap;">${item.dateSigned || 'Chưa ký'}</td>
                <td style="text-align: center; font-size: 12.5px; color: var(--text-secondary); font-weight: 600; white-space: nowrap;">${item.effectiveDate || '—'}</td>
                <td style="text-align: center; white-space: nowrap;">${getDecStatusBadge(item.statusCode, item.status)}</td>
                <td style="text-align: center;" onclick="event.stopPropagation()">
                    <div style="display: inline-flex; gap: 6px;">
                        <button class="btn btn-ghost btn-sm btn-view-dec" data-id="${item.id}" title="Xem chi tiết quyết định">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        ${(item.statusCode === 'pending_sign' || item.statusCode === 'draft') ? `
                            <button class="btn-icon btn-icon-primary btn-sign-decision btn-sign-dec-row" data-id="${item.id}" title="Ký & Ban hành Quyết định" style="background: #16a34a !important; color: #fff;">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `).join('');
    }

    function bindDecTableEvents() {
        container.querySelectorAll('.btn-view-dec').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = App.state.decisionsList.find(d => d.id === btn.dataset.id);
                if (item) renderViewDecisionDetail(item, container);
            });
        });
        container.querySelectorAll('.btn-sign-dec-row').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = App.state.decisionsList.find(d => d.id === btn.dataset.id);
                if (item) renderSignDecisionView(item, container);
            });
        });
    }

    function getDecisionTypeBadge(typeCode, typeText) {
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
    }

    function getDecStatusBadge(statusCode, text) {
        return App.renderStatusBadge(statusCode, text);
    }

    function applyDecFilters() {
        const kw = container.querySelector('#filter-dec-kw')?.value.toLowerCase().trim();
        const type = container.querySelector('#filter-dec-type')?.value;
        const unit = container.querySelector('#filter-dec-unit')?.value;
        const status = container.querySelector('#filter-dec-status')?.value;

        const filtered = App.state.decisionsList.filter(d => {
            const matchKw = !kw || (d.code && d.code.toLowerCase().includes(kw)) || d.person.toLowerCase().includes(kw);
            const matchType = !type || d.typeCode === type;
            const matchUnit = !unit || d.unit === unit;
            const matchStatus = !status || d.statusCode === status;
            return matchKw && matchType && matchUnit && matchStatus;
        });

        const tbody = container.querySelector('#dec-table-body');
        const count = container.querySelector('#dec-count-total');
        if (tbody) tbody.innerHTML = renderDecRows(filtered);
        if (count) count.innerText = filtered.length;

        bindDecTableEvents();
    }

    // --------------------------------------------------------------------------------
    // 2. TẠO DỰ THẢO QUYẾT ĐỊNH (Từ Hồ sơ đã được Phê duyệt Đồng ý)
    // --------------------------------------------------------------------------------
    function showCreateDraftModal(approvedDossiers, container) {
        const dossiersToSelect = (approvedDossiers && approvedDossiers.length > 0)
            ? approvedDossiers
            : (App.state.dossiers || [
                { id: 'HS-2026-001', person: 'GS.TS. Trần Văn Nam', position: 'Trưởng khoa CNTT', unit: 'Trường Đại học Bách khoa' },
                { id: 'HS-2026-002', person: 'PGS.TS. Lê Thị Hoa', position: 'Phó Hiệu trưởng', unit: 'Trường Đại học Kinh tế' },
                { id: 'HS-2026-003', person: 'TS. Nguyễn Văn Bình', position: 'Trưởng phòng Đào tạo', unit: 'Trường Đại học Sư phạm' }
            ]);

        const html = `
            <div style="padding: 8px 0 16px;">
                <p style="color: #334155; font-size: 13.5px; margin-bottom: 16px;">
                    Chọn một <strong>Hồ sơ bổ nhiệm đã được phê duyệt Đồng ý</strong> để hệ thống tự động kế thừa dữ liệu nguồn:
                </p>
                <div class="form-group" style="margin-bottom: 16px;">
                    <label class="form-label">Chọn hồ sơ đã phê duyệt <span class="text-danger">*</span></label>
                    <select class="form-input" id="modal-select-approved-dossier" style="height: 40px; font-weight: 600;">
                        <option value="">-- Chọn hồ sơ đã phê duyệt --</option>
                        ${dossiersToSelect.map(d => `
                            <option value="${d.id}">${d.id} — ${d.person} (${d.position} - ${d.unit})</option>
                        `).join('')}
                    </select>
                </div>

                <div id="dossier-inherited-preview" style="display: none; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-bottom: 16px;">
                    <div style="font-size: 11px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">
                        THÔNG TIN KẾ THỪA TỪ HỒ SƠ ĐÃ PHÊ DUYỆT
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 13px;">
                        <div><strong>Nhân sự bổ nhiệm:</strong> <span id="prev-dec-person" style="color: var(--primary); font-weight:700;">—</span></div>
                        <div><strong>Chức vụ và đơn vị:</strong> <span id="prev-dec-pos">—</span></div>
                        <div><strong>Loại thủ tục:</strong> <span id="prev-dec-type">—</span></div>
                        <div><strong>Trạng thái phê duyệt:</strong> <span class="badge badge-success">Đã phê duyệt</span></div>
                    </div>
                </div>

                <div class="grid-2" style="gap: 14px; margin-bottom: 14px;">
                    <div class="form-group">
                        <label class="form-label">Ngày dự kiến hiệu lực <span class="text-danger">*</span></label>
                        <input type="date" class="form-input" id="modal-dec-eff-date" value="${new Date().toISOString().split('T')[0]}" style="height: 38px;" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Nhiệm kỳ dự kiến <span class="text-danger">*</span></label>
                        <input type="text" class="form-input" id="modal-dec-term" value="5 năm (2026 - 2031)" style="height: 38px;" required>
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Người ký dự kiến <span class="text-danger">*</span></label>
                    <input type="text" class="form-input" id="modal-dec-signer" value="GS.TS. Nguyễn Văn A (Giám đốc Đại học Đà Nẵng)" style="height: 38px;" required>
                </div>

                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Danh sách Nơi nhận văn bản</label>
                    <input type="text" class="form-input" id="modal-dec-recipients" value="Ban Giám đốc, Ban TCCB, Đơn vị liên quan, Cá nhân" style="height: 38px;">
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Hủy bỏ</button>
                <button type="button" class="btn btn-primary" id="btn-submit-create-draft" style="font-weight: 700;">
                    Lưu dự thảo quyết định
                </button>
            </div>
        `;

        App.openModal('Tạo dự thảo quyết định bổ nhiệm', html);

        const selectDos = document.getElementById('modal-select-approved-dossier');
        const prevBox = document.getElementById('dossier-inherited-preview');

        selectDos?.addEventListener('change', (e) => {
            const dosId = e.target.value;
            const dos = approvedDossiers.find(d => d.id === dosId);
            if (dos && prevBox) {
                prevBox.style.display = 'block';
                document.getElementById('prev-dec-person').innerText = dos.person;
                document.getElementById('prev-dec-pos').innerText = `${dos.position} (${dos.unit})`;
                document.getElementById('prev-dec-type').innerText = dos.type;
            } else if (prevBox) {
                prevBox.style.display = 'none';
            }
        });

        document.getElementById('btn-submit-create-draft')?.addEventListener('click', () => {
            const dosId = selectDos?.value;
            const effDate = document.getElementById('modal-dec-eff-date')?.value;
            const term = document.getElementById('modal-dec-term')?.value.trim();
            const signer = document.getElementById('modal-dec-signer')?.value.trim();
            const recipients = document.getElementById('modal-dec-recipients')?.value.trim();

            if (!dosId || !effDate || !term || !signer) {
                App.notify('Vui lòng điền đầy đủ các thông tin dự thảo bắt buộc.', 'warning');
                return;
            }

            const dos = approvedDossiers.find(d => d.id === dosId);
            if (!dos) return;

            const newDraftId = `DT-2026-${Math.floor(100 + Math.random() * 900)}`;

            const newDec = {
                id: newDraftId,
                code: 'Dự thảo QĐ',
                dossierId: dos.id,
                type: dos.type,
                typeCode: dos.typeCode || 'moi',
                person: dos.person,
                personId: dos.personId || 'NV001',
                position: dos.position,
                unit: dos.unit,
                dateSigned: null,
                effectiveDate: effDate,
                term: term,
                signer: signer,
                signerTitle: 'Giám đốc Đại học Đà Nẵng',
                status: 'Dự thảo',
                statusCode: 'draft',
                isPublished: false,
                docFile: null,
                recipients: recipients,
                notes: `Khởi tạo dự thảo quyết định bổ nhiệm cho ${dos.person}`,
                history: [
                    { time: new Date().toLocaleString('vi-VN'), user: App.user ? App.user.name : 'Cán bộ TCCB', action: `Tạo dự thảo quyết định ${newDraftId} từ hồ sơ ${dos.id}` }
                ]
            };

            App.state.decisionsList.unshift(newDec);
            App.closeModal();
            App.notify(`Tạo dự thảo quyết định ${newDraftId} thành công ở trạng thái "Dự thảo"!`, 'success');
            renderListView();
        });
    }

    // --------------------------------------------------------------------------------
    // 3. XEM CHI TIẾT QUYẾT ĐỊNH (Giao diện Full-Page)
    // --------------------------------------------------------------------------------
    function renderViewDecisionDetail(item, container) {
        const html = `
            <div class="full-page-container" style="background: var(--bg-app); min-height: 100vh; padding-bottom: 40px;">
                <!-- Header chuẩn đồng bộ master system -->
                <div class="page-header-alt" style="padding: 20px 32px; background: #ffffff; border-bottom: 1px solid var(--border); width: 100%;">
                    <div style="width: 100%;">
                        <div class="breadcrumb-bar" style="margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
                            <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                                <span class="bc-back-btn" id="bc-back-list">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                                    QUẢN LÝ QUYẾT ĐỊNH
                                </span>
                                <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                <span class="bc-current">CHI TIẾT QUYẾT ĐỊNH</span>
                            </div>
                            <div>${getDecStatusBadge(item.statusCode, item.status)}</div>
                        </div>
                        <h2 style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin: 0;">
                            Quyết định ${item.code || item.id} — ${item.person} (${item.position})
                        </h2>
                    </div>
                </div>

                <div style="padding: 24px 32px 0; width: 100%;">
                    <div style="display: grid; grid-template-columns: 1fr 340px; gap: 24px;">

                        <!-- CỘT TRÁI CHÍNH -->
                        <div>
                            <!-- Thẻ 1: Thông tin phát hành & Quyết định chính thức -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    1. Thông tin phát hành & Văn bản chính thức
                                </h3>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; font-size: 13.5px; margin-bottom: 16px;">
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Số Quyết định:</span> <div style="font-weight:700; color: var(--primary);">${item.code || 'Chưa phát hành'}</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Ngày ký phát hành:</span> <div>${item.dateSigned || 'Chưa có'}</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Ngày hiệu lực:</span> <div style="font-weight:600; color: #16a34a;">${item.effectiveDate || '—'}</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Người ký quyết định:</span> <div style="font-weight:600;">${item.signer || 'Giám đốc ĐHĐN'}</div></div>
                                    <div style="grid-column: span 2;"><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Nơi nhận văn bản:</span> <div>${item.recipients || 'Ban Giám đốc, Ban TCCB'}</div></div>
                                </div>

                                <!-- File điện tử chính thức -->
                                ${item.docFile ? `
                                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px;">
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                            <div>
                                                <div style="font-weight: 700; font-size: 13.5px; color: #0f172a;">${item.docFile.name}</div>
                                                <div style="font-size: 11.5px; color: #64748b;">File PDF chính thức có chữ ký số · Dung lượng: ${item.docFile.size}</div>
                                            </div>
                                        </div>
                                        <button type="button" class="btn-icon btn-icon-primary" title="Tải / Xem tệp quyết định" onclick="App.notify('Đang xem bản điện tử quyết định...', 'info')">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                        </button>
                                    </div>
                                ` : `
                                    <div style="padding: 14px; background: #f8fafc; border-radius: 8px; color: var(--text-tertiary); font-size: 13px; text-align: center; border: 1px dashed #cbd5e1;">
                                        Chưa cập nhật bản điện tử chính thức của quyết định.
                                    </div>
                                `}
                            </div>

                            <!-- Thẻ 2: Thông tin nhân sự & Chức vụ được bổ nhiệm -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    2. Thông tin nhân sự & Hiệu lực chức vụ
                                </h3>
                                <div style="display: flex; gap: 16px; align-items: center; background: #eff6ff; padding: 16px; border-radius: 10px; border: 1px solid #bfdbfe; margin-bottom: 14px;">
                                    <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; flex-shrink: 0;">
                                        ${item.person.split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <div style="font-size: 16px; font-weight: 700; color: #0f172a;">${item.person}</div>
                                        <div style="font-size: 13px; color: #475569; margin-top: 2px;">
                                            Chức vụ bổ nhiệm: <strong>${item.position}</strong> · Đơn vị: <strong>${item.unit}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 13px;">
                                    <div><strong>Loại quyết định:</strong> ${item.type}</div>
                                    <div><strong>Nhiệm kỳ bổ nhiệm:</strong> ${item.term}</div>
                                    <div><strong>Hồ sơ liên kết:</strong> ${item.dossierId}</div>
                                    <div><strong>Trạng thái hiệu lực:</strong> ${getDecStatusBadge(item.statusCode, item.status)}</div>
                                </div>
                            </div>

                        </div>

                        <!-- CỘT PHẢI: CÁC BƯỚC XỬ LÝ QUYẾT ĐỊNH -->
                        <div>
                            <div class="card" style="padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0 0 14px; display: flex; align-items: center; gap: 6px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                                    Thao tác phát hành & Hiệu lực
                                </h4>

                                <div style="display: flex; flex-direction: column; gap: 10px;">
                                    ${(item.statusCode === 'draft' || item.statusCode === 'pending_sign') ? `
                                        <button type="button" class="btn btn-primary btn-sign-decision" id="btn-action-sign-giamdoc" style="width: 100%; justify-content: center; font-weight: 700; background: #16a34a !important; padding: 11px 16px; font-size: 13.5px;">
                                            Ký & Ban hành Quyết định (Giám đốc ĐHĐN)
                                        </button>
                                    ` : ''}

                                    ${item.statusCode === 'draft' ? `
                                        <button type="button" class="btn btn-secondary" id="btn-action-submit-sign" style="width: 100%; justify-content: center; font-weight: 600;">
                                            Trình ký quyết định
                                        </button>
                                    ` : ''}

                                    ${item.statusCode === 'pending_sign' ? `
                                        <button type="button" class="btn btn-secondary" id="btn-action-publish" style="width: 100%; justify-content: center; font-weight: 600;">
                                            Cập nhật phát hành (Văn phòng ĐHĐN)
                                        </button>
                                    ` : ''}

                                    ${item.statusCode === 'published' ? `
                                        <button type="button" class="btn btn-primary" id="btn-action-activate" style="width: 100%; justify-content: center; font-weight: 700; background: #16a34a !important;">
                                            Kích hoạt hiệu lực chức vụ
                                        </button>
                                    ` : ''}
                                </div>
                            </div>

                            <!-- Lịch sử xử lý -->
                            <div class="card" style="padding: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0 0 14px; display: flex; align-items: center; gap: 6px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    Lịch sử quy trình quyết định
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
        container.querySelector('#btn-action-sign-giamdoc')?.addEventListener('click', () => renderSignDecisionView(item, container));
        container.querySelector('#btn-action-submit-sign')?.addEventListener('click', () => showSubmitSignModal(item, container));
        container.querySelector('#btn-action-publish')?.addEventListener('click', () => showPublishModal(item, container));
        container.querySelector('#btn-action-activate')?.addEventListener('click', () => showActivateEffectModal(item, container));
    }

    // --------------------------------------------------------------------------------
    // 4. MÀN HÌNH GIÁM ĐỐC ĐHĐN KÝ & BAN HÀNH QUYẾT ĐỊNH (FULL-PAGE SCREEN)
    // --------------------------------------------------------------------------------
    function renderSignDecisionView(item, container) {
        const currentUser = App.state.currentUser || {};
        const signerName = currentUser.name || 'PGS.TS. Nguyễn Ngọc Vũ';

        const html = `
            <div class="full-page-container" style="background: var(--bg-app); min-height: 100vh; padding-bottom: 40px;">
                <!-- Header đồng bộ hệ thống master -->
                <div class="page-header-alt" style="padding: 20px 32px; background: #ffffff; border-bottom: 1px solid var(--border); width: 100%;">
                    <div style="width: 100%;">
                        <div class="breadcrumb-bar" style="margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
                            <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                                <span class="bc-back-btn" id="bc-back-detail" style="cursor: pointer; color: var(--primary); font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                                    CHI TIẾT QUYẾT ĐỊNH
                                </span>
                                <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                <span class="bc-current" style="color: var(--text-tertiary); font-weight: 600;">KÝ & BAN HÀNH QUYẾT ĐỊNH</span>
                            </div>
                            <div>${getDecStatusBadge(item.statusCode, item.status)}</div>
                        </div>
                        <h2 style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin: 0;">
                            Ký & Ban hành Quyết định Bổ nhiệm — ${item.person}
                        </h2>
                    </div>
                </div>

                <div style="padding: 24px 32px 0; width: 100%;">
                    <div style="display: grid; grid-template-columns: 1fr 360px; gap: 24px;">

                        <!-- CỘT TRÁI CHÍNH: KHAI BÁO THÔNG TIN KÝ BAN HÀNH -->
                        <div>
                            <!-- Thẻ 1: Khai báo số QĐ & Ngày ký -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 18px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    1. Thông tin số ký hiệu và ban hành Quyết định
                                </h3>

                                <div class="grid-2" style="gap: 16px; margin-bottom: 16px;">
                                    <div class="form-group">
                                        <label class="form-label">Số ký hiệu Quyết định <span class="text-danger">*</span></label>
                                        <input type="text" class="form-input" id="sign-code" value="${item.code || '128/QĐ-ĐHĐN'}" placeholder="Ví dụ: 128/QĐ-ĐHĐN" style="height: 42px; font-weight: 700; font-size: 14px;" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Ngày ký ban hành <span class="text-danger">*</span></label>
                                        <input type="date" class="form-input" id="sign-date-signed" value="${new Date().toISOString().split('T')[0]}" style="height: 42px; font-size: 14px;" required>
                                    </div>
                                </div>

                                <div class="grid-2" style="gap: 16px; margin-bottom: 16px;">
                                    <div class="form-group">
                                        <label class="form-label">Ngày bắt đầu có hiệu lực <span class="text-danger">*</span></label>
                                        <input type="date" class="form-input" id="sign-eff-date" value="${item.effectiveDate || new Date().toISOString().split('T')[0]}" style="height: 42px; font-size: 14px;" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Người ký phê duyệt <span class="text-danger">*</span></label>
                                        <input type="text" class="form-input" id="sign-signer-name" value="${signerName} (Giám đốc ĐHĐN)" style="height: 42px; font-weight: 700; font-size: 14px;" required>
                                    </div>
                                </div>

                                <div class="form-group" style="margin-bottom: 16px;">
                                    <label class="form-label">Ý kiến chỉ đạo phê duyệt ban hành</label>
                                    <textarea class="form-input" id="sign-note" rows="3" placeholder="Nhập ý kiến chỉ đạo phê duyệt ban hành quyết định (nếu có)..." style="font-size: 13.5px;"></textarea>
                                </div>

                                <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:14px; display:flex; align-items:center; gap:12px; font-size:13px; color:#15803d;">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span>Hệ thống thực hiện ký số điện tử, cập nhật trạng thái "Đã ký & Phát hành", tự động kích hoạt hiệu lực chức vụ và ban hành thông báo toàn ĐHĐN.</span>
                                </div>
                            </div>

                            <!-- Thẻ 2: Đối tượng nhân sự bổ nhiệm -->
                            <div class="card" style="padding: 24px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    2. Thông tin nhân sự & Chức vụ kế thừa từ Hồ sơ gốc
                                </h3>
                                <div style="display: flex; gap: 16px; align-items: center; background: #eff6ff; padding: 16px; border-radius: 10px; border: 1px solid #bfdbfe; margin-bottom: 14px;">
                                    <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; flex-shrink: 0;">
                                        ${item.person.split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <div style="font-size: 16px; font-weight: 700; color: #0f172a;">${item.person}</div>
                                        <div style="font-size: 13px; color: #475569; margin-top: 2px;">
                                            Chức vụ bổ nhiệm: <strong>${item.position}</strong> · Đơn vị: <strong>${item.unit}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 13px;">
                                    <div><strong>Mã hồ sơ gốc:</strong> ${item.dossierId || item.id}</div>
                                    <div><strong>Loại thủ tục:</strong> ${item.type}</div>
                                    <div><strong>Nhiệm kỳ:</strong> ${item.term || '5 năm (2026 - 2031)'}</div>
                                    <div><strong>Nơi nhận văn bản:</strong> ${item.recipients || 'Ban Giám đốc, Ban TCCB, Cá nhân'}</div>
                                </div>
                            </div>
                        </div>

                        <!-- CỘT PHẢI: THAO TÁC PHÊ DUYỆT BAN HÀNH -->
                        <div>
                            <div class="card" style="padding: 24px; border-radius: 12px; margin-bottom: 20px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04); position: sticky; top: 24px;">
                                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin: 0 0 16px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                    Thao tác Ký & Ban hành
                                </h4>

                                <div style="display: flex; flex-direction: column; gap: 12px;">
                                    <button type="button" class="btn btn-primary" id="btn-exec-sign-confirm-page" style="width: 100%; justify-content: center; font-weight: 700; background: #16a34a !important; padding: 12px 18px; font-size: 14px; border-radius: 8px;">
                                        Xác nhận ký và ban hành quyết định
                                    </button>
                                    <button type="button" class="btn btn-secondary" id="btn-cancel-sign-page" style="width: 100%; justify-content: center; font-weight: 600; padding: 11px 18px; border-radius: 8px;">
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

        // Navigation Back
        container.querySelector('#bc-back-detail')?.addEventListener('click', () => renderViewDecisionDetail(item, container));
        container.querySelector('#btn-cancel-sign-page')?.addEventListener('click', () => renderViewDecisionDetail(item, container));

        // Submit Confirm Action
        document.getElementById('btn-exec-sign-confirm-page')?.addEventListener('click', () => {
            const code = document.getElementById('sign-code')?.value.trim();
            const dateSigned = document.getElementById('sign-date-signed')?.value;
            const effDate = document.getElementById('sign-eff-date')?.value;
            const signerName = document.getElementById('sign-signer-name')?.value.trim();
            const note = document.getElementById('sign-note')?.value.trim();

            if (!code || !dateSigned || !effDate) {
                App.notify('Vui lòng nhập đầy đủ Số quyết định, Ngày ký và Ngày hiệu lực.', 'warning');
                return;
            }

            item.code = code;
            item.dateSigned = dateSigned;
            item.effectiveDate = effDate;
            item.signer = signerName;
            item.statusCode = 'published';
            item.status = 'Đã ký & Phát hành';
            item.isPublished = true;
            item.docFile = { name: `QD_${code.replace(/[\/\s]/g, '_')}_signed.pdf`, size: '2.4 MB' };

            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: signerName,
                action: `Giám đốc ĐHĐN đã ký phê duyệt & ban hành Quyết định số ${code}.${note ? ' Ghi chú: ' + note : ''}`
            });

            App.notify(`Giám đốc ĐHĐN đã ký phê duyệt & ban hành thành công Quyết định số ${code}!`, 'success');
            renderViewDecisionDetail(item, container);
        });
    }

    // --------------------------------------------------------------------------------
    // 5. TRÌNH KÝ QUYẾT ĐỊNH
    // --------------------------------------------------------------------------------
    function showSubmitSignModal(item, container) {
        const html = `
            <div style="padding: 8px 0 16px;">
                <p style="color: #334155; font-size: 13.5px; margin-bottom: 16px;">
                    Chuyển dự thảo quyết định <strong>${item.id}</strong> đến Người có thẩm quyền ký theo quy định:
                </p>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Người có thẩm quyền ký <span class="text-danger">*</span></label>
                    <input type="text" class="form-input" id="sign-signer" value="${item.signer || 'GS.TS. Nguyễn Văn A (Giám đốc ĐHĐN)'}" style="height: 38px;" required>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Ghi chú trình ký</label>
                    <textarea class="form-input" id="sign-notes" rows="2" placeholder="Nhập ghi chú thêm khi trình ký..."></textarea>
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Hủy bỏ</button>
                <button type="button" class="btn btn-primary" id="btn-save-submit-sign" style="font-weight: 700;">
                    Xác nhận trình ký
                </button>
            </div>
        `;

        App.openModal('Trình ký quyết định', html);

        document.getElementById('btn-save-submit-sign')?.addEventListener('click', () => {
            const signer = document.getElementById('sign-signer')?.value.trim();
            if (!signer) {
                App.notify('Vui lòng chọn người có thẩm quyền ký.', 'warning');
                return;
            }

            item.signer = signer;
            item.statusCode = 'pending_sign';
            item.status = 'Chờ ký';

            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: App.user ? App.user.name : 'Ban TCCB',
                action: `Trình ký quyết định đến ${signer}. Khóa chỉnh sửa nội dung dự thảo.`
            });

            App.closeModal();
            App.notify('Đã chuyển dự thảo quyết định sang trạng thái "Chờ ký"!', 'success');
            renderViewDecisionDetail(item, container);
        });
    };

    // --------------------------------------------------------------------------------
    // 5. CẬP NHẬT THÔNG TIN PHÁT HÀNH QUYẾT ĐỊNH (Văn phòng ĐHĐN)
    // --------------------------------------------------------------------------------
    function showPublishModal(item, container) {
        const html = `
            <div style="padding: 8px 0 16px;">
                <p style="color: #334155; font-size: 13.5px; margin-bottom: 16px;">
                    Văn phòng ĐHĐN đối chiếu bản quyết định đã ký và cập nhật thông tin phát hành chính thức:
                </p>
                <div class="grid-2" style="gap: 14px; margin-bottom: 14px;">
                    <div class="form-group">
                        <label class="form-label">Số Quyết định <span class="text-danger">*</span></label>
                        <input type="text" class="form-input" id="pub-code" value="126/QĐ-ĐHĐN" placeholder="Ví dụ: 126/QĐ-ĐHĐN" style="height: 38px;" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Ngày ký ban hành <span class="text-danger">*</span></label>
                        <input type="date" class="form-input" id="pub-date-signed" value="${new Date().toISOString().split('T')[0]}" style="height: 38px;" required>
                    </div>
                </div>
                <div class="grid-2" style="gap: 14px; margin-bottom: 14px;">
                    <div class="form-group">
                        <label class="form-label">Ngày bắt đầu hiệu lực <span class="text-danger">*</span></label>
                        <input type="date" class="form-input" id="pub-eff-date" value="${item.effectiveDate || new Date().toISOString().split('T')[0]}" style="height: 38px;" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Người ký chính thức <span class="text-danger">*</span></label>
                        <input type="text" class="form-input" id="pub-signer" value="${item.signer || 'GS.TS. Nguyễn Văn A'}" style="height: 38px;" required>
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Tải lên bản điện tử chính thức (PDF có chữ ký) <span class="text-danger">*</span></label>
                    <input type="file" class="form-input" id="pub-file" style="padding: 6px;" required>
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Hủy bỏ</button>
                <button type="button" class="btn btn-primary" id="btn-save-publish" style="background: #0284c7 !important;">
                    Hoàn tất phát hành
                </button>
            </div>
        `;

        App.openModal('Cập nhật thông tin phát hành quyết định (Văn phòng ĐHĐN)', html);

        document.getElementById('btn-save-publish')?.addEventListener('click', () => {
            const code = document.getElementById('pub-code')?.value.trim();
            const dateSigned = document.getElementById('pub-date-signed')?.value;
            const effDate = document.getElementById('pub-eff-date')?.value;
            const signer = document.getElementById('pub-signer')?.value.trim();

            if (!code || !dateSigned || !effDate) {
                App.notify('Vui lòng điền đầy đủ số quyết định, ngày ký và ngày hiệu lực.', 'warning');
                return;
            }

            // Kiểm tra trùng Số/Ký hiệu
            const isDup = App.state.decisionsList.some(d => d.id !== item.id && d.code === code);
            if (isDup) {
                App.notify(`Số quyết định ${code} đã tồn tại trong hệ thống. Vui lòng kiểm tra lại.`, 'error');
                return;
            }

            item.code = code;
            item.dateSigned = dateSigned;
            item.effectiveDate = effDate;
            item.signer = signer;
            item.isPublished = true;
            item.statusCode = 'published';
            item.status = 'Đã phát hành';
            item.docFile = { name: `QD_${code.replace(/[\/\s]/g, '_')}.pdf`, size: '2.1 MB' };

            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: 'Văn phòng Đại học Đà Nẵng',
                action: `Hoàn tất phát hành quyết định số ${code}. Tải lên bản điện tử PDF chính thức.`
            });

            App.closeModal();
            App.notify(`Cập nhật thông tin phát hành quyết định ${code} thành công!`, 'success');
            renderViewDecisionDetail(item, container);
        });
    }

    // --------------------------------------------------------------------------------
    // 6. CẬP NHẬT QUYẾT ĐỊNH ĐÃ KÝ (Kích hoạt hiệu lực chức vụ)
    // --------------------------------------------------------------------------------
    function showActivateEffectModal(item, container) {
        const today = new Date().toISOString().split('T')[0];
        const isActiveNow = item.effectiveDate <= today;

        const html = `
            <div style="padding: 8px 0 16px;">
                <p style="color: #334155; font-size: 13.5px; margin-bottom: 16px;">
                    Liên kết quyết định chính thức <strong>${item.code}</strong> với hồ sơ bổ nhiệm và cập nhật hiệu lực chức vụ:
                </p>
                <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-bottom: 16px; font-size: 13px;">
                    <div><strong>Nhân sự:</strong> ${item.person}</div>
                    <div><strong>Chức vụ cập nhật:</strong> ${item.position} (${item.unit})</div>
                    <div><strong>Ngày bắt đầu hiệu lực:</strong> ${item.effectiveDate}</div>
                    <div style="margin-top: 6px; color: ${isActiveNow ? '#15803d' : '#b45309'}; font-weight: 700;">
                        ${isActiveNow ? '✓ Ngày hiệu lực <= Ngày hiện tại: Kích hoạt hiệu lực chức vụ NGAY LẬP TỨC' : '⏳ Ngày hiệu lực trong tương lai: Đặt trạng thái "Chưa hiệu lực" & lên lịch tự động kích hoạt.'}
                    </div>
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Hủy bỏ</button>
                <button type="button" class="btn btn-primary" id="btn-save-activate" style="background: #16a34a !important;">
                    Xác nhận liên kết & Kích hoạt
                </button>
            </div>
        `;

        App.openModal('Kích hoạt hiệu lực chức vụ', html);

        document.getElementById('btn-save-activate')?.addEventListener('click', () => {
            if (isActiveNow) {
                item.statusCode = 'active';
                item.status = 'Có hiệu lực';
            } else {
                item.statusCode = 'pending_effective';
                item.status = 'Chưa hiệu lực';
            }

            // Cập nhật trạng thái hồ sơ liên quan thành "Đã có quyết định"
            const dos = App.state.dossiers ? App.state.dossiers.find(d => d.id === item.dossierId) : null;
            if (dos) {
                dos.statusCode = 'approved';
                dos.status = 'Đã có quyết định';
            }

            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: App.user ? App.user.name : 'Ban TCCB',
                action: `Liên kết quyết định với hồ sơ ${item.dossierId}. Cập nhật trạng thái hiệu lực: ${item.status}`
            });

            App.closeModal();
            App.notify(`Đã kích hoạt hiệu lực chức vụ thành công cho quyết định ${item.code}!`, 'success');
            renderViewDecisionDetail(item, container);
        });
    }

    // Khởi tạo hiển thị ban đầu là danh sách quyết định
    renderListView();
}

function renderPheDuyet(container) {
    if (App && App.clearFullPage) App.clearFullPage();

    // Khởi tạo dữ liệu mẫu nếu chưa có
    if (!App.state.approvals || App.state.approvals.length === 0) {
        App.state.approvals = [
            {
                id: 'HS-2026-001',
                name: 'TS. Nguyễn Văn Quang',
                position: 'Trưởng ban',
                unit: 'Ban Kế hoạch - Tài chính',
                type: 'Bổ nhiệm mới',
                typeCode: 'moi',
                assignedOfficer: 'TS. Nguyễn Trần (Phó Trưởng ban TCCB)',
                assignedDate: '2026-06-21',
                deadline: '2026-06-28',
                status: 'Đang thẩm định',
                statusCode: 'reviewing',
                dateSent: '2026-06-20',
                evalResult: null,
                evalNotes: '',
                reportDoc: null,
                proposalDoc: null,
                authority: 'Giám đốc Đại học Đà Nẵng',
                history: [
                    { time: '2026-06-20 14:00', user: 'Đơn vị Ban KHTC', action: 'Gửi hồ sơ đề nghị thẩm định' },
                    { time: '2026-06-21 09:00', user: 'Ban TCCB', action: 'Phân công TS. Nguyễn Trần thẩm định (Hạn xử lý: 28/06/2026)' }
                ]
            },
            {
                id: 'HS-2026-002',
                name: 'PGS.TS. Trần Thị Hoa',
                position: 'Phó Chánh Văn phòng',
                unit: 'Văn phòng',
                type: 'Bổ nhiệm lại',
                typeCode: 'lai',
                assignedOfficer: 'ThS. Lê Thị Bích Ngọc',
                assignedDate: '2026-06-22',
                deadline: '2026-06-29',
                status: 'Chờ phân công thẩm định',
                statusCode: 'pending_review',
                dateSent: '2026-06-22',
                evalResult: null,
                evalNotes: '',
                reportDoc: null,
                proposalDoc: null,
                authority: 'Giám đốc Đại học Đà Nẵng',
                history: [
                    { time: '2026-06-22 10:30', user: 'Văn phòng ĐHĐN', action: 'Gửi hồ sơ bổ nhiệm lại chờ thẩm định' }
                ]
            },
            {
                id: 'HS-2026-003',
                name: 'TS. Lê Văn Minh',
                position: 'Phó Giám đốc',
                unit: 'Ban Giám đốc',
                type: 'Bổ nhiệm lại',
                typeCode: 'lai',
                assignedOfficer: 'TS. Nguyễn Trần',
                assignedDate: '2026-06-15',
                deadline: '2026-06-22',
                status: 'Đủ cơ sở trình',
                statusCode: 'eligible_submit',
                dateSent: '2026-06-15',
                evalResult: 'Đủ cơ sở trình',
                evalNotes: 'Hồ sơ đầy đủ thành phần, nhân sự đạt 100% tiêu chuẩn bổ nhiệm.',
                reportDoc: { title: 'Báo cáo thẩm định HS-2026-003', code: '18/BC-TCCB', status: 'Dự thảo' },
                proposalDoc: null,
                authority: 'Hội đồng Đại học Đà Nẵng',
                history: [
                    { time: '2026-06-15 08:00', user: 'Ban TCCB', action: 'Phân công TS. Nguyễn Trần thẩm định' },
                    { time: '2026-06-18 11:00', user: 'TS. Nguyễn Trần', action: 'Ghi nhận kết quả thẩm định: Đủ cơ sở trình' }
                ]
            }
        ];
    }

    // --------------------------------------------------------------------------------
    // 1. XEM DANH SÁCH HỒ SƠ THẨM ĐỊNH
    // --------------------------------------------------------------------------------
    const renderListView = () => {
        const list = App.state.approvals || [];

        const html = `
            <div class="page-header">
                <div class="page-header-left">
                    <h1 style="font-size: 22px; font-weight: 800; color: var(--text-primary);">Thẩm định, trình và phê duyệt hồ sơ</h1>
                    <p style="color: var(--text-tertiary); margin-top: 4px; font-size: 13px;">Phân công thẩm định, ghi nhận kết quả, lập tờ trình và ghi nhận phê duyệt</p>
                </div>
            </div>

            <!-- Bộ lọc tra cứu hồ sơ thẩm định -->
            <div class="module-filter-card">
                <div class="module-filter-header">
                    <div class="module-filter-title">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        BỘ LỌC HỒ SƠ THẨM ĐỊNH & PHÊ DUYỆT
                    </div>
                </div>

                <div class="filter-grid-4">
                    <div>
                        <label class="form-label">Mã hồ sơ, nhân sự</label>
                        <input type="text" class="form-input" id="filter-appr-kw" placeholder="Nhập mã HS, tên nhân sự...">
                    </div>
                    <div>
                        <label class="form-label">Trạng thái thẩm định</label>
                        <select class="form-input" id="filter-appr-status">
                            <option value="">Tất cả trạng thái</option>
                            <option value="pending_review">Chờ phân công thẩm định</option>
                            <option value="reviewing">Đang thẩm định</option>
                            <option value="eligible_submit">Đủ cơ sở trình</option>
                            <option value="pending_supplement">Chờ bổ sung</option>
                            <option value="ineligible_submit">Không đủ cơ sở trình</option>
                            <option value="pending_submission">Chờ trình phê duyệt</option>
                            <option value="pending_approval">Chờ kết quả phê duyệt</option>
                            <option value="approved">Đã phê duyệt</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Đơn vị trình</label>
                        <select class="form-input" id="filter-appr-unit">
                            <option value="">Tất cả đơn vị</option>
                            <option value="Ban Giám đốc">Ban Giám đốc</option>
                            <option value="Văn phòng">Văn phòng</option>
                            <option value="Ban Tổ chức Cán bộ">Ban Tổ chức Cán bộ</option>
                            <option value="Ban Kế hoạch - Tài chính">Ban Kế hoạch - Tài chính</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Người được phân công</label>
                        <select class="form-input" id="filter-appr-officer">
                            <option value="">Tất cả chuyên viên</option>
                            <option value="TS. Nguyễn Trần">TS. Nguyễn Trần</option>
                            <option value="ThS. Lê Thị Bích Ngọc">ThS. Lê Thị Bích Ngọc</option>
                        </select>
                    </div>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px;">
                    <button type="button" class="btn btn-secondary" id="btn-reset-appr-filters" style="height: 40px; padding: 0 18px; font-weight: 600; border-radius: 8px; font-size: 13.5px; border: 1px solid #cbd5e1; color: #475569;">
                        Đặt lại
                    </button>
                    <button type="button" class="btn btn-primary" id="btn-apply-appr-filters" style="height: 40px; padding: 0 22px; font-weight: 700; border-radius: 8px; font-size: 13.5px; display: flex; align-items: center; gap: 8px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        Tra cứu
                    </button>
                </div>
            </div>

            <!-- Bảng danh sách thẩm định -->
            <div class="card" style="border-radius: 12px; border: 1px solid var(--border); background: #ffffff; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <div style="padding: 16px 20px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; background: #fafafa;">
                    <span style="font-weight: 700; font-size: 14px; color: var(--text-primary);">Danh sách hồ sơ cần thẩm định & phê duyệt (<span id="appr-count-total">${list.length}</span>)</span>
                </div>
                <div class="table-container" style="border: none; overflow-x: auto;">
                    <table class="data-table" style="width: 100%; min-width: 980px;">
                        <thead>
                            <tr>
                                <th style="width: 10%;">Mã HS</th>
                                <th style="width: 18%;">Nhân sự đề nghị</th>
                                <th style="width: 20%;">Đơn vị trình</th>
                                <th style="width: 14%;">Cán bộ phụ trách</th>
                                <th style="width: 13%; text-align: center; white-space: nowrap;">Hạn xử lý</th>
                                <th style="width: 14%; text-align: center; white-space: nowrap;">Trạng thái</th>
                                <th style="width: 11%; text-align: center; white-space: nowrap;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="appr-table-body">
                            ${renderApprRows(list)}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Events
        container.querySelector('#btn-apply-appr-filters')?.addEventListener('click', () => applyApprFilters());
        container.querySelector('#btn-reset-appr-filters')?.addEventListener('click', () => {
            container.querySelector('#filter-appr-kw').value = '';
            container.querySelector('#filter-appr-status').value = '';
            container.querySelector('#filter-appr-unit').value = '';
            container.querySelector('#filter-appr-officer').value = '';
            applyApprFilters();
        });

        bindApprTableEvents();
    };

    const getApprDeadlineBadge = (item) => App.renderDeadlineText(item.deadline);
    const getApprStatusBadge = (statusCode, text) => App.renderStatusBadge(statusCode, text);

    const renderApprRows = (list) => {
        if (!list || list.length === 0) {
            return `<tr><td colspan="7" style="text-align: center; padding: 32px; color: var(--text-tertiary);">Không có hồ sơ thẩm định phù hợp</td></tr>`;
        }
        return list.map(item => `
            <tr data-id="${item.id}" style="cursor: pointer;">
                <td style="font-weight: 700; color: var(--primary); white-space: nowrap;">${item.id}</td>
                <td>
                    <div class="person-cell">
                        <div class="avatar sm" style="background: var(--primary); color:#fff; font-size:11px; font-weight:700; flex-shrink: 0;">
                            ${(item.name || '').split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                        </div>
                        <div style="font-weight: 600; color: var(--text-primary);">${item.name}</div>
                    </div>
                </td>
                <td>
                    <div style="font-weight: 600; color: #0f172a; font-size: 13px;">${item.position}</div>
                    <div style="font-size: 11.5px; color: #64748b;">${item.unit}</div>
                </td>
                <td style="font-size: 12.5px; color: var(--text-secondary); white-space: nowrap;">${item.assignedOfficer || 'Chưa phân công'}</td>
                <td style="text-align: center; white-space: nowrap;">${getApprDeadlineBadge(item)}</td>
                <td style="text-align: center; white-space: nowrap;">${getApprStatusBadge(item.statusCode, item.status)}</td>
                <td style="text-align: center; white-space: nowrap;" onclick="event.stopPropagation()">
                    <div style="display: inline-flex; gap: 6px; justify-content: center;">
                        <button class="btn-icon btn-icon-primary btn-process-appr" data-id="${item.id}" title="Xử lý hồ sơ thẩm định và phê duyệt">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    };

    const applyApprFilters = () => {
        const kw = container.querySelector('#filter-appr-kw')?.value.toLowerCase().trim();
        const status = container.querySelector('#filter-appr-status')?.value;
        const unit = container.querySelector('#filter-appr-unit')?.value;
        const officer = container.querySelector('#filter-appr-officer')?.value;

        const filtered = App.state.approvals.filter(a => {
            const matchKw = !kw || a.id.toLowerCase().includes(kw) || a.name.toLowerCase().includes(kw);
            const matchStatus = !status || a.statusCode === status;
            const matchUnit = !unit || a.unit === unit;
            const matchOfficer = !officer || a.assignedOfficer === officer;
            return matchKw && matchStatus && matchUnit && matchOfficer;
        });

        const tbody = container.querySelector('#appr-table-body');
        const count = container.querySelector('#appr-count-total');
        if (tbody) tbody.innerHTML = renderApprRows(filtered);
        if (count) count.innerText = filtered.length;

        bindApprTableEvents();
    };

    const bindApprTableEvents = () => {
        container.querySelectorAll('.btn-process-appr').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = App.state.approvals.find(a => a.id === btn.dataset.id);
                if (item) renderProcessPheDuyetDetail(item, container);
            });
        });
    };

    // --------------------------------------------------------------------------------
    // 2. MÀN HÌNH CHI TIẾT & THAO TÁC XỬ LÝ
    // --------------------------------------------------------------------------------
    const renderProcessPheDuyetDetail = (item, container) => {
        const html = `
            <div class="full-page-container" style="background: var(--bg-app); min-height: 100vh; padding-bottom: 40px;">
                <div class="page-header-alt" style="padding: 20px 32px; background: #ffffff; border-bottom: 1px solid var(--border); width: 100%;">
                    <div style="width: 100%;">
                        <div class="breadcrumb-bar" style="margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
                            <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                                <span class="bc-back-btn" id="bc-back-list">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                                    THẨM ĐỊNH & PHÊ DUYỆT HỒ SƠ
                                </span>
                                <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                <span class="bc-current">THẨM ĐỊNH HỒ SƠ</span>
                            </div>
                            <div>${getApprStatusBadge(item.statusCode, item.status)}</div>
                        </div>
                        <h2 style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin: 0;">
                            Hồ sơ ${item.id} — ${item.name} (${item.position})
                        </h2>
                    </div>
                </div>

                <div style="padding: 24px 32px 0; width: 100%;">
                    <div style="display: grid; grid-template-columns: 1fr 360px; gap: 24px;">

                        <!-- CỘT TRÁI CHÍNH -->
                        <div>
                            <!-- Thẻ 1: Thông tin chung hồ sơ -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    1. Thông tin hồ sơ & Phân công thẩm định
                                </h3>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; font-size: 13.5px;">
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Mã hồ sơ:</span> <div style="font-weight:700; color: var(--primary);">${item.id}</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Loại thủ tục:</span> <div>${item.type}</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Nhân sự đề nghị:</span> <div style="font-weight:700;">${item.name}</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Chức vụ / Đơn vị:</span> <div>${item.position} (${item.unit})</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Chuyên viên thẩm định:</span> <div style="font-weight:700; color: var(--primary);">${item.assignedOfficer || 'Chưa phân công'}</div></div>
                                    <div><span style="color: var(--text-tertiary); font-size: 11px; font-weight: 700; text-transform: uppercase;">Hạn thẩm định:</span> <div style="font-weight:600; color: #dc2626;">${item.deadline || 'Chưa có'}</div></div>
                                </div>
                            </div>

                            <!-- Thẻ 2: Kết quả thẩm định -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                    2. Kết quả thẩm định chuyên viên
                                </h3>
                                ${item.evalResult ? `
                                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; font-size: 13.5px;">
                                        <div><strong>Kết quả đánh giá:</strong> <span class="badge badge-success">${item.evalResult}</span></div>
                                        <div><strong>Người thẩm định:</strong> ${item.assignedOfficer}</div>
                                        <div style="grid-column: span 2;"><strong>Nhận xét & Hướng xử lý:</strong> <div style="padding: 10px; background: #f8fafc; border-radius: 6px; margin-top: 4px;">${item.evalNotes}</div></div>
                                    </div>
                                ` : `
                                    <div style="padding: 16px; background: #f8fafc; border-radius: 8px; color: var(--text-tertiary); font-size: 13.5px; text-align: center; border: 1px dashed #cbd5e1;">
                                        Chuyên viên chưa tiến hành ghi nhận kết quả thẩm định cho hồ sơ này.
                                    </div>
                                `}
                            </div>

                            <!-- Thẻ 3: Báo cáo thẩm định và Tờ trình (Dự thảo / Hoàn tất) -->
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                                    3. Báo cáo thẩm định & Tờ trình trình cấp có thẩm quyền
                                </h3>
                                ${item.reportDoc ? `
                                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px;">
                                        <div>
                                            <div style="font-weight: 700; font-size: 14px; color: #0f172a;">${item.reportDoc.title}</div>
                                            <div style="font-size: 12px; color: #475569; margin-top: 2px;">Số hiệu: ${item.reportDoc.code} · Trạng thái văn bản: <strong>${item.reportDoc.status}</strong></div>
                                        </div>
                                        <button type="button" class="btn-icon btn-icon-primary" title="Xem văn bản báo cáo thẩm định" onclick="App.notify('Đang xem bản thảo Báo cáo thẩm định...', 'info')">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                        </button>
                                    </div>
                                ` : `
                                    <div style="padding: 16px; background: #f8fafc; border-radius: 8px; color: var(--text-tertiary); font-size: 13.5px; text-align: center; border: 1px dashed #cbd5e1;">
                                        Chưa lập Báo cáo thẩm định và Tờ trình (Cần kết quả "Đủ cơ sở trình").
                                    </div>
                                `}
                            </div>

                        </div>

                        <!-- CỘT PHẢI: LUỒNG THAO TÁC CÁC BƯỚC THẨM ĐỊNH - TRÌNH - PHÊ DUYỆT -->
                        <div>
                            <div class="card" style="padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0 0 14px; display: flex; align-items: center; gap: 6px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                                    Thao tác thẩm định & Phê duyệt
                                </h4>

                                <div style="display: flex; flex-direction: column; gap: 10px;">
                                    ${item.statusCode === 'pending_review' ? `
                                        <button type="button" class="btn btn-primary" id="btn-action-assign" style="width: 100%; justify-content: center; font-weight: 700;">
                                            Phân công thẩm định
                                        </button>
                                    ` : ''}

                                    ${item.statusCode === 'reviewing' ? `
                                        <button type="button" class="btn btn-primary" id="btn-action-evaluate" style="width: 100%; justify-content: center; font-weight: 700;">
                                            Ghi nhận kết quả thẩm định
                                        </button>
                                        <button type="button" class="btn btn-secondary" id="btn-action-reassign" style="width: 100%; justify-content: center;">
                                            Thay đổi chuyên viên
                                        </button>
                                    ` : ''}

                                    ${item.statusCode === 'pending_supplement' ? `
                                        <button type="button" class="btn btn-primary" id="btn-action-req-supplement" style="width: 100%; justify-content: center; font-weight: 700; background: #d97706 !important;">
                                            Lập Yêu cầu bổ sung hồ sơ
                                        </button>
                                    ` : ''}

                                    ${item.statusCode === 'eligible_submit' ? `
                                        <button type="button" class="btn btn-primary" id="btn-action-draft-report" style="width: 100%; justify-content: center; font-weight: 700;">
                                            Lập Báo cáo thẩm định & Tờ trình
                                        </button>
                                    ` : ''}

                                    ${item.statusCode === 'pending_submission' ? `
                                        <button type="button" class="btn btn-primary" id="btn-action-submit-authority" style="width: 100%; justify-content: center; font-weight: 700; background: #4f46e5 !important;">
                                            Trình hồ sơ cấp có thẩm quyền
                                        </button>
                                    ` : ''}

                                    ${(item.statusCode === 'pending_approval' || item.statusCode === 'pending_submission') ? `
                                        <button type="button" class="btn btn-primary btn-approve-appraisal" id="btn-action-record-approval" style="width: 100%; justify-content: center; font-weight: 700; background: #16a34a !important; padding: 11px 16px;">
                                            Phê duyệt kết quả thẩm định (Giám đốc ĐHĐN)
                                        </button>
                                    ` : ''}
                                </div>
                            </div>

                            <!-- Lịch sử xử lý -->
                            <div class="card" style="padding: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0 0 14px; display: flex; align-items: center; gap: 6px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    Lịch sử thẩm định & Phê duyệt
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

        // Event bindings
        container.querySelector('#btn-action-assign')?.addEventListener('click', () => showAssignModal(item, container));
        container.querySelector('#btn-action-reassign')?.addEventListener('click', () => showAssignModal(item, container, true));
        container.querySelector('#btn-action-evaluate')?.addEventListener('click', () => showEvaluateModal(item, container));
        container.querySelector('#btn-action-req-supplement')?.addEventListener('click', () => showRequestSupplementModal(item, container));
        container.querySelector('#btn-action-draft-report')?.addEventListener('click', () => showDraftReportModal(item, container));
        container.querySelector('#btn-action-submit-authority')?.addEventListener('click', () => showSubmitAuthorityModal(item, container));
        container.querySelector('#btn-action-record-approval')?.addEventListener('click', () => showApprovalResultModal(item, container));
    };

    // --------------------------------------------------------------------------------
    // 3. PHÂN CÔNG THẨM ĐỊNH
    // --------------------------------------------------------------------------------
    const showAssignModal = (item, container, isReassign = false) => {
        const html = `
            <div style="padding: 8px 0 16px;">
                <p style="color: #334155; font-size: 13.5px; margin-bottom: 16px;">
                    ${isReassign ? 'Thay đổi chuyên viên phụ trách thẩm định cho hồ sơ' : 'Phân công chuyên viên Ban TCCB thẩm định hồ sơ'} <strong>${item.id}</strong>:
                </p>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Chọn chuyên viên thẩm định <span class="text-danger">*</span></label>
                    <select class="form-input" id="modal-assign-officer" style="height: 38px; font-weight: 600;">
                        <option value="TS. Nguyễn Trần (Phó Trưởng ban TCCB)">TS. Nguyễn Trần (Phó Trưởng ban TCCB)</option>
                        <option value="ThS. Lê Thị Bích Ngọc (Trưởng ban TCCB)">ThS. Lê Thị Bích Ngọc (Trưởng ban TCCB)</option>
                        <option value="Trần Văn Cường (Chuyên viên TCCB)">Trần Văn Cường (Chuyên viên TCCB)</option>
                    </select>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Thời hạn thẩm định <span class="text-danger">*</span></label>
                    <input type="date" class="form-input" id="modal-assign-deadline" value="${new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]}" style="height: 38px;" required>
                </div>
                ${isReassign ? `
                    <div class="form-group" style="margin-bottom: 14px;">
                        <label class="form-label">Lý do thay đổi chuyên viên <span class="text-danger">*</span></label>
                        <input type="text" class="form-input" id="modal-assign-reason" placeholder="Nhập lý do thay đổi..." style="height: 38px;" required>
                    </div>
                ` : ''}
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Hủy bỏ</button>
                <button type="button" class="btn btn-primary" id="btn-save-assign">Xác nhận phân công</button>
            </div>
        `;

        App.openModal(isReassign ? 'Thay đổi phân công thẩm định' : 'Phân công thẩm định hồ sơ', html);

        document.getElementById('btn-save-assign')?.addEventListener('click', () => {
            const officer = document.getElementById('modal-assign-officer')?.value;
            const deadline = document.getElementById('modal-assign-deadline')?.value;
            const reason = document.getElementById('modal-assign-reason')?.value.trim();

            if (isReassign && !reason) {
                App.notify('Vui lòng nhập lý do thay đổi chuyên viên thẩm định.', 'warning');
                return;
            }

            item.assignedOfficer = officer;
            item.assignedDate = new Date().toISOString().split('T')[0];
            item.deadline = deadline;
            item.statusCode = 'reviewing';
            item.status = 'Đang thẩm định';

            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: App.user ? App.user.name : 'Ban TCCB',
                action: isReassign ? `Thay đổi phân công thẩm định sang ${officer}. Lý do: ${reason}` : `Phân công ${officer} thẩm định hồ sơ`
            });

            App.closeModal();
            App.notify('Đã cập nhật phân công thẩm định thành công!', 'success');
            renderProcessPheDuyetDetail(item, container);
        });
    };

    // --------------------------------------------------------------------------------
    // 4. GHI NHẬN KẾT QUẢ THẨM ĐỊNH
    // --------------------------------------------------------------------------------
    const showEvaluateModal = (item, container) => {
        const html = `
            <div style="padding: 8px 0 16px;">
                <p style="color: #334155; font-size: 13.5px; margin-bottom: 16px;">
                    Ghi nhận kết quả đánh giá thẩm định độc lập của chuyên viên cho hồ sơ <strong>${item.id}</strong>:
                </p>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Kết quả thẩm định <span class="text-danger">*</span></label>
                    <select class="form-input" id="modal-eval-res" style="height: 38px; font-weight: 700;">
                        <option value="eligible_submit">1. Đủ cơ sở trình (Đạt 100% điều kiện & tiêu chuẩn)</option>
                        <option value="pending_supplement">2. Cần bổ sung (Thiếu tài liệu / cần xác minh thêm)</option>
                        <option value="ineligible_submit">3. Không đủ cơ sở trình (Không đáp ứng tiêu chuẩn)</option>
                    </select>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Nhận xét & Đánh giá chi tiết <span class="text-danger">*</span></label>
                    <textarea class="form-input" id="modal-eval-notes" rows="3" placeholder="Nhập nhận xét chi tiết về thành phần hồ sơ và tiêu chuẩn bổ nhiệm..." required></textarea>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Hướng xử lý đề xuất <span class="text-danger">*</span></label>
                    <input type="text" class="form-input" id="modal-eval-direction" placeholder="Ví dụ: Lập tờ trình trình Giám đốc ĐHĐN xem xét..." style="height: 38px;" required>
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Hủy bỏ</button>
                <button type="button" class="btn btn-primary" id="btn-save-evaluate">Xác nhận kết quả thẩm định</button>
            </div>
        `;

        App.openModal('Ghi nhận kết quả thẩm định', html);

        document.getElementById('btn-save-evaluate')?.addEventListener('click', () => {
            const resCode = document.getElementById('modal-eval-res')?.value;
            const notes = document.getElementById('modal-eval-notes')?.value.trim();
            const direction = document.getElementById('modal-eval-direction')?.value.trim();

            if (!notes || !direction) {
                App.notify('Vui lòng nhập nhận xét và hướng xử lý đề xuất.', 'warning');
                return;
            }

            item.evalNotes = notes + ` (Hướng xử lý: ${direction})`;
            item.statusCode = resCode;

            if (resCode === 'eligible_submit') {
                item.evalResult = 'Đủ cơ sở trình';
                item.status = 'Đủ cơ sở trình';
            } else if (resCode === 'pending_supplement') {
                item.evalResult = 'Cần bổ sung';
                item.status = 'Chờ bổ sung';
            } else {
                item.evalResult = 'Không đủ cơ sở trình';
                item.status = 'Không đủ cơ sở trình';
            }

            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: item.assignedOfficer || 'Chuyên viên TCCB',
                action: `Ghi nhận kết quả thẩm định: ${item.evalResult}`
            });

            App.closeModal();
            App.notify(`Đã lưu kết quả thẩm định: ${item.evalResult}!`, 'success');
            renderProcessPheDuyetDetail(item, container);
        });
    };

    // --------------------------------------------------------------------------------
    // 5. YÊU CẦU BỔ SUNG HỒ SƠ
    // --------------------------------------------------------------------------------
    const showRequestSupplementModal = (item, container) => {
        const html = `
            <div style="padding: 8px 0 16px;">
                <p style="color: #334155; font-size: 13.5px; margin-bottom: 16px;">
                    Lập Yêu cầu bổ sung gửi đơn vị <strong>${item.unit}</strong> theo kết quả thẩm định hồ sơ <strong>${item.id}</strong>:
                </p>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Loại yêu cầu <span class="text-danger">*</span></label>
                    <select class="form-input" id="req-type" style="height: 38px;">
                        <option value="Bổ sung tài liệu">Bổ sung tài liệu đính kèm</option>
                        <option value="Chỉnh sửa thông tin">Chỉnh sửa thông tin quản lý</option>
                        <option value="Giải trình">Giải trình / Cung cấp thông tin xác minh</option>
                    </select>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Nội dung yêu cầu bổ sung chi tiết <span class="text-danger">*</span></label>
                    <textarea class="form-input" id="req-content" rows="3" placeholder="Nhập rõ danh mục tài liệu hoặc nội dung đơn vị cần hoàn thiện..." required></textarea>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Thời hạn phản hồi của đơn vị <span class="text-danger">*</span></label>
                    <input type="date" class="form-input" id="req-deadline" value="${new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]}" style="height: 38px;" required>
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Hủy bỏ</button>
                <button type="button" class="btn btn-primary" id="btn-send-supplement-req" style="background: #d97706 !important;">
                    Gửi yêu cầu bổ sung
                </button>
            </div>
        `;

        App.openModal(`Lập Yêu cầu bổ sung hồ sơ: ${item.id}`, html);

        document.getElementById('btn-send-supplement-req')?.addEventListener('click', () => {
            const reqType = document.getElementById('req-type')?.value;
            const content = document.getElementById('req-content')?.value.trim();
            const deadline = document.getElementById('req-deadline')?.value;

            if (!content || !deadline) {
                App.notify('Vui lòng nhập nội dung yêu cầu bổ sung và thời hạn phản hồi.', 'warning');
                return;
            }

            item.statusCode = 'pending_supplement';
            item.status = 'Chờ bổ sung';

            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: App.user ? App.user.name : 'Ban TCCB',
                action: `Gửi Yêu cầu bổ sung [${reqType}] đến ${item.unit}. Nội dung: ${content} (Hạn: ${deadline})`
            });

            App.closeModal();
            App.notify(`Đã gửi Yêu cầu bổ sung đến đơn vị ${item.unit}!`, 'success');
            renderProcessPheDuyetDetail(item, container);
        });
    };

    // --------------------------------------------------------------------------------
    // 6. LẬP BÁO CÁO THẨM ĐỊNH VÀ TỜ TRÌNH
    // --------------------------------------------------------------------------------
    const showDraftReportModal = (item, container) => {
        const html = `
            <div style="padding: 8px 0 16px;">
                <p style="color: #334155; font-size: 13.5px; margin-bottom: 16px;">
                    Lập Báo cáo thẩm định & Tờ trình cho hồ sơ đủ cơ sở trình <strong>${item.id}</strong>:
                </p>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Tên văn bản / Trích yếu <span class="text-danger">*</span></label>
                    <input type="text" class="form-input" id="report-title" value="Báo cáo thẩm định hồ sơ bổ nhiệm ${item.position} (${item.name})" style="height: 38px;" required>
                </div>
                <div class="grid-2" style="gap: 14px; margin-bottom: 14px;">
                    <div class="form-group">
                        <label class="form-label">Số quyết định dự thảo <span class="text-danger">*</span></label>
                        <input type="text" class="form-input" id="report-code" value="18/BC-TCCB" style="height: 38px;" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Cấp có thẩm quyền trình <span class="text-danger">*</span></label>
                        <select class="form-input" id="report-authority" style="height: 38px;">
                            <option value="Giám đốc Đại học Đà Nẵng">Giám đốc Đại học Đà Nẵng</option>
                            <option value="Hội đồng Đại học Đà Nẵng">Hội đồng Đại học Đà Nẵng</option>
                            <option value="Hiệu trưởng trường thành viên">Hiệu trưởng trường thành viên</option>
                        </select>
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Tóm tắt nội dung báo cáo & Kiến nghị <span class="text-danger">*</span></label>
                    <textarea class="form-input" id="report-summary" rows="3" placeholder="Nhập kiến nghị bổ nhiệm..." required>Kính trình Cấp có thẩm quyền xem xét quyết định bổ nhiệm nhân sự ${item.name} giữ chức vụ ${item.position} theo quy định.</textarea>
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                <button type="button" class="btn btn-secondary" id="btn-save-report-draft">Lưu dự thảo</button>
                <button type="button" class="btn btn-primary" id="btn-complete-report">Hoàn tất văn bản</button>
            </div>
        `;

        App.openModal('Lập Báo cáo thẩm định & Tờ trình', html);

        document.getElementById('btn-save-report-draft')?.addEventListener('click', () => {
            const title = document.getElementById('report-title')?.value.trim();
            const code = document.getElementById('report-code')?.value.trim();
            if (!title || !code) return;

            item.reportDoc = { title: title, code: code, status: 'Dự thảo' };
            App.closeModal();
            App.notify('Đã lưu Dự thảo Báo cáo thẩm định!', 'info');
            renderProcessPheDuyetDetail(item, container);
        });

        document.getElementById('btn-complete-report')?.addEventListener('click', () => {
            const title = document.getElementById('report-title')?.value.trim();
            const code = document.getElementById('report-code')?.value.trim();
            const auth = document.getElementById('report-authority')?.value;

            if (!title || !code) {
                App.notify('Vui lòng điền đầy đủ tiêu đề và số hiệu văn bản.', 'warning');
                return;
            }

            item.reportDoc = { title: title, code: code, status: 'Đã hoàn tất' };
            item.authority = auth;
            item.statusCode = 'pending_submission';
            item.status = 'Chờ trình phê duyệt';

            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: App.user ? App.user.name : 'Ban TCCB',
                action: `Hoàn tất Báo cáo thẩm định (${code}). Chuyển trạng thái Chờ trình phê duyệt.`
            });

            App.closeModal();
            App.notify('Hoàn tất Báo cáo thẩm định & Tờ trình thành công!', 'success');
            renderProcessPheDuyetDetail(item, container);
        });
    };

    // --------------------------------------------------------------------------------
    // 7. TRÌNH HỒ SƠ CẤP CÓ THẨM QUYỀN
    // --------------------------------------------------------------------------------
    const showSubmitAuthorityModal = (item, container) => {
        const html = `
            <div style="padding: 8px 0 16px;">
                <p style="color: #334155; font-size: 13.5px; margin-bottom: 16px;">
                    Trình hồ sơ bổ nhiệm <strong>${item.id}</strong> kèm Báo cáo thẩm định & Tờ trình đến <strong>${item.authority || 'Giám đốc ĐHĐN'}</strong>:
                </p>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Cấp tiếp nhận xem xét <span class="text-danger">*</span></label>
                    <input type="text" class="form-input" value="${item.authority || 'Giám đốc Đại học Đà Nẵng'}" readonly style="background: #f8fafc; font-weight:700; height: 38px;">
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Ghi chú trình hồ sơ</label>
                    <input type="text" class="form-input" id="submit-notes" placeholder="Nhập ghi chú thêm nếu có..." style="height: 38px;">
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Hủy bỏ</button>
                <button type="button" class="btn btn-primary" id="btn-confirm-submit-authority" style="background: #4f46e5 !important;">
                    Xác nhận trình phê duyệt
                </button>
            </div>
        `;

        App.openModal('Trình hồ sơ cấp có thẩm quyền', html);

        document.getElementById('btn-confirm-submit-authority')?.addEventListener('click', () => {
            item.statusCode = 'pending_approval';
            item.status = 'Chờ kết quả phê duyệt';

            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: App.user ? App.user.name : 'Ban TCCB',
                action: `Trình hồ sơ bổ nhiệm đến ${item.authority || 'Giám đốc ĐHĐN'} xem xét phê duyệt.`
            });

            App.closeModal();
            App.notify(`Đã trình hồ sơ thành công đến ${item.authority || 'Giám đốc ĐHĐN'}!`, 'success');
            renderProcessPheDuyetDetail(item, container);
        });
    };

    // --------------------------------------------------------------------------------
    // 8. GHI NHẬN KẾT QUẢ PHÊ DUYỆT
    // --------------------------------------------------------------------------------
    const showApprovalResultModal = (item, container) => {
        const html = `
            <div style="padding: 8px 0 16px;">
                <p style="color: #334155; font-size: 13.5px; margin-bottom: 16px;">
                    Ghi nhận văn bản kết luận phê duyệt của Cấp có thẩm quyền cho hồ sơ <strong>${item.id}</strong>:
                </p>
                <div class="grid-2" style="gap: 14px; margin-bottom: 14px;">
                    <div class="form-group">
                        <label class="form-label">Ngày xem xét kết luận <span class="text-danger">*</span></label>
                        <input type="date" class="form-input" id="appr-date" value="${new Date().toISOString().split('T')[0]}" style="height: 38px;" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Số văn bản kết quả</label>
                        <input type="text" class="form-input" id="appr-code" placeholder="Ví dụ: 88-TB/ĐHĐN" style="height: 38px;">
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Kết quả phê duyệt <span class="text-danger">*</span></label>
                    <select class="form-input" id="appr-result" style="height: 38px; font-weight: 700;">
                        <option value="approved">1. Đồng ý (Phê duyệt bổ nhiệm)</option>
                        <option value="rejected">2. Không đồng ý (Từ chối bổ nhiệm)</option>
                        <option value="reconsider">3. Yêu cầu xem xét lại</option>
                    </select>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                    <label class="form-label">Trích yếu và nội dung kết luận <span class="text-danger">*</span></label>
                    <textarea class="form-input" id="appr-notes" rows="3" placeholder="Nhập trích yếu kết luận của Cấp có thẩm quyền..." required></textarea>
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Hủy bỏ</button>
                <button type="button" class="btn btn-primary" id="btn-save-appr-result" style="background: #16a34a !important;">
                    Lưu kết quả phê duyệt
                </button>
            </div>
        `;

        App.openModal('Ghi nhận kết quả phê duyệt', html);

        document.getElementById('btn-save-appr-result')?.addEventListener('click', () => {
            const res = document.getElementById('appr-result')?.value;
            const notes = document.getElementById('appr-notes')?.value.trim();

            if (!notes) {
                App.notify('Vui lòng nhập trích yếu nội dung kết luận phê duyệt.', 'warning');
                return;
            }

            if (res === 'approved') {
                item.statusCode = 'approved';
                item.status = 'Đã phê duyệt';
            } else if (res === 'rejected') {
                item.statusCode = 'rejected';
                item.status = 'Không được phê duyệt';
            } else {
                item.statusCode = 'pending_review';
                item.status = 'Chờ thẩm định';
            }

            item.history.push({
                time: new Date().toLocaleString('vi-VN'),
                user: App.user ? App.user.name : 'Ban TCCB',
                action: `Ghi nhận kết quả phê duyệt từ ${item.authority || 'Cấp có thẩm quyền'}: ${item.status}. Nội dung: ${notes}`
            });

            App.closeModal();
            App.notify(`Đã ghi nhận kết quả phê duyệt: ${item.status}!`, 'success');
            renderProcessPheDuyetDetail(item, container);
        });
    };

    // Khởi tạo mặc định màn hình danh sách
    renderListView();
}

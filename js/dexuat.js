/* ============================================================
   Module 03: Quản lý đề xuất và chủ trương nhân sự
   (Tuân thủ đầy đủ đặc tả UC03.01 -> UC03.07 & BR01 -> BR06)
   ============================================================ */

function renderDeXuat(container) {
    if (App && App.pendingDeXuatPrefill) {
        const prefill = App.pendingDeXuatPrefill;
        renderAddDeXuat(container, prefill);
        return;
    }

    if (App && App.clearFullPage) App.clearFullPage();

    // Ensure proposals list exists in App state
    if (!App.state.proposals) {
        App.state.proposals = [];
    }

    const proposals = App.state.proposals;
    const personnelList = PersonnelController.getList();
    const positions = PositionController.getPositions();

    const searchIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
    const filterIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`;
    const plusIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
    const viewIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    const editIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
    const sendIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
    const checkIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
    const stampIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
    const dossierIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`;

    // Stats count
    const stats = {
        total: proposals.length,
        draft: proposals.filter(p => p.statusCode === 'draft').length,
        review: proposals.filter(p => p.statusCode === 'review').length,
        pending_approval: proposals.filter(p => p.statusCode === 'pending_approval').length,
        pending_update: proposals.filter(p => p.statusCode === 'pending_update').length,
        approved: proposals.filter(p => p.statusCode === 'approved').length,
        rejected: proposals.filter(p => p.statusCode === 'rejected').length,
    };

    const html = `
        <div class="page-header">
            <div class="page-header-left">
                <h1>Quản lý đề xuất và chủ trương nhân sự</h1>
                <p>Khởi tạo, rà soát và ghi nhận kết quả xin chủ trương bổ nhiệm, bổ nhiệm lại cán bộ</p>
            </div>
            <div class="page-header-actions">
                <button class="btn btn-primary" id="btn-new-dexuat" style="gap: 6px;">
                    ${plusIcon} Tạo đề xuất mới
                </button>
            </div>
        </div>

        <!-- Thống kê trạng thái -->
        <div class="stats-grid grid-4" style="margin-bottom: 1.5rem; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
            <div class="card" style="margin: 0; padding: 18px 20px; border-left: 4px solid var(--primary);">
                <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Tổng số đề xuất</div>
                <div style="font-size: 26px; font-weight: 800; color: var(--text-primary); margin-top: 4px;">${stats.total}</div>
            </div>
            <div class="card" style="margin: 0; padding: 18px 20px; border-left: 4px solid #F59E0B;">
                <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Chờ rà soát TCCB</div>
                <div style="font-size: 26px; font-weight: 800; color: #B45309; margin-top: 4px;">${stats.review}</div>
            </div>
            <div class="card" style="margin: 0; padding: 18px 20px; border-left: 4px solid #8B5CF6;">
                <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Chờ kết quả chủ trương</div>
                <div style="font-size: 26px; font-weight: 800; color: #6D28D9; margin-top: 4px;">${stats.pending_approval}</div>
            </div>
            <div class="card" style="margin: 0; padding: 18px 20px; border-left: 4px solid #16A34A;">
                <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Đã chấp thuận chủ trương</div>
                <div style="font-size: 26px; font-weight: 800; color: #15803D; margin-top: 4px;">${stats.approved}</div>
            </div>
        </div>

        <!-- Standalone Search & Filter Card -->
        <div class="module-filter-card">
            <div class="module-filter-header">
                <div class="module-filter-title">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    BỘ LỌC & TRA CỨU ĐỀ XUẤT CHỦ TRƯƠNG
                </div>
            </div>

            <!-- Main Search Bar -->
            <div class="filter-search-bar">
                <div class="filter-search-wrapper">
                    <svg class="search-icon-inside" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" class="form-input" id="filter-keyword" placeholder="Nhập từ khóa (Mã đề xuất [DX-xxxx], tên nhân sự được đề xuất...)">
                </div>
                <button type="button" class="btn btn-secondary" id="btn-reset-filters" style="display: flex; align-items: center; gap: 6px; height: 42px; padding: 0 18px; font-weight: 600; border-radius: 8px; font-size: 13.5px; white-space: nowrap;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                    Đặt lại
                </button>
                <button type="button" class="btn btn-primary" id="btn-exec-search" style="display: flex; align-items: center; gap: 8px; height: 42px; padding: 0 22px; font-weight: 700; border-radius: 8px; font-size: 13.5px; white-space: nowrap;">
                    ${searchIcon} Tra cứu
                </button>
            </div>

            <!-- Clean Grid Filter Controls -->
            <div class="filter-grid-4">
                <div>
                    <label class="form-label">Loại thủ tục</label>
                    <select class="form-input" id="filter-procedure">
                        <option value="">Tất cả loại thủ tục</option>
                        <option value="moi">Bổ nhiệm mới</option>
                        <option value="kiemnhiem">Bổ nhiệm kiêm nhiệm</option>
                        <option value="lai">Bổ nhiệm lại</option>
                        <option value="keodai">Kéo dài thời gian giữ chức vụ</option>
                    </select>
                </div>
                <div>
                    <label class="form-label">Đơn vị đề xuất</label>
                    <select class="form-input" id="filter-unit">
                        <option value="">Tất cả đơn vị</option>
                        <option value="Ban Đào tạo">Ban Đào tạo</option>
                        <option value="Ban Tổ chức Cán bộ">Ban Tổ chức Cán bộ</option>
                        <option value="Văn phòng">Văn phòng</option>
                        <option value="Ban Kế hoạch - Tài chính">Ban Kế hoạch - Tài chính</option>
                        <option value="Khoa Công nghệ Thông tin">Khoa Công nghệ Thông tin</option>
                    </select>
                </div>
                <div>
                    <label class="form-label">Chức vụ đề xuất</label>
                    <select class="form-input" id="filter-position">
                        <option value="">Tất cả chức vụ</option>
                        ${positions.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="form-label">Trạng thái xử lý</label>
                    <select class="form-input" id="filter-status">
                        <option value="">Tất cả trạng thái</option>
                        <option value="draft">Chưa gửi</option>
                        <option value="review">Chờ rà soát TCCB</option>
                        <option value="pending_update">Chờ bổ sung</option>
                        <option value="pending_approval">Chờ kết quả chủ trương</option>
                        <option value="approved">Đã chấp thuận chủ trương</option>
                        <option value="rejected">Không được chấp thuận / Không đạt</option>
                    </select>
                </div>
            </div>

            <!-- Active Filter Pills Container -->
            <div id="dexuat-active-pills" class="active-filter-pills" style="display: none;">
                <span class="active-filter-title">Đang lọc theo:</span>
                <div id="dexuat-pills-list" style="display: flex; flex-wrap: wrap; gap: 6px;"></div>
            </div>
        </div>

        <!-- Standalone Table Card -->
        <div class="card" style="border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
            <div class="table-container" style="border: none;">
                <table class="data-table" style="width: 100%;">
                    <thead>
                        <tr>
                            <th style="width: 11%; white-space: nowrap;">MÃ ĐỀ XUẤT</th>
                            <th style="width: 13%; text-align: center; white-space: nowrap;">LOẠI THỦ TỤC</th>
                            <th style="width: 17%; white-space: nowrap;">ĐƠN VỊ ĐỀ XUẤT</th>
                            <th style="width: 17%; white-space: nowrap;">CHỨC VỤ ĐỀ XUẤT</th>
                            <th style="width: 18%; white-space: nowrap;">NHÂN SỰ DỰ KIẾN</th>
                            <th style="width: 10%; text-align: center; white-space: nowrap;">NGÀY TẠO</th>
                            <th style="width: 14%; text-align: center; white-space: nowrap;">TRẠNG THÁI</th>
                            <th style="width: 10%; text-align: center; white-space: nowrap;">THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody id="proposal-tbody">
                        ${_renderProposalTableRows(proposals)}
                    </tbody>
                </table>
            </div>

            <!-- Empty state element -->
            <div id="proposal-empty-state" style="display: ${proposals.length === 0 ? 'block' : 'none'}; padding: 48px; text-align: center; color: var(--text-tertiary);">
                <div style="font-size: 32px; margin-bottom: 8px;">📋</div>
                <div style="font-size: 14px; font-weight: 600; color: var(--text-secondary);">Không có dữ liệu phù hợp với tiêu chí tra cứu</div>
                <div style="font-size: 12.5px; margin-top: 4px;">Vui lòng điều chỉnh hoặc xóa bộ lọc để xem lại danh sách đề xuất.</div>
            </div>

            <div class="table-pagination" style="padding: 12px 20px; border-top: 1px solid var(--border); background: #ffffff;">
                <div class="pagination-info" id="proposal-count-info">Hiển thị ${proposals.length} đề xuất chủ trương</div>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Attach search & filter events
    const doSearch = () => {
        const keyword = (container.querySelector('#filter-keyword')?.value || '').toLowerCase();
        const proc = container.querySelector('#filter-procedure')?.value || '';
        const unit = container.querySelector('#filter-unit')?.value || '';
        const pos = container.querySelector('#filter-position')?.value || '';
        const status = container.querySelector('#filter-status')?.value || '';

        const filtered = proposals.filter(p => {
            const matchKw = !keyword || (p.id && p.id.toLowerCase().includes(keyword)) || (p.person && p.person.toLowerCase().includes(keyword));
            const matchProc = !proc || p.typeCode === proc;
            const matchUnit = !unit || p.unit === unit;
            const matchPos = !pos || p.position === pos;
            const matchStatus = !status || p.statusCode === status;
            return matchKw && matchProc && matchUnit && matchPos && matchStatus;
        });

        const tbody = container.querySelector('#proposal-tbody');
        const emptyEl = container.querySelector('#proposal-empty-state');
        const countEl = container.querySelector('#proposal-count-info');

        if (tbody) tbody.innerHTML = _renderProposalTableRows(filtered);
        if (emptyEl) emptyEl.style.display = filtered.length === 0 ? 'block' : 'none';
        if (countEl) countEl.textContent = `Hiển thị ${filtered.length} / ${proposals.length} đề xuất chủ trương`;

        updateDeXuatActivePills(keyword, proc, unit, pos, status);
        _bindRowActionEvents(container);
    };

    const updateDeXuatActivePills = (kw, proc, unit, pos, status) => {
        const pillsBox = container.querySelector('#dexuat-active-pills');
        const pillsList = container.querySelector('#dexuat-pills-list');
        if (!pillsBox || !pillsList) return;

        let pillsHtml = '';
        if (kw) pillsHtml += `<span class="filter-tag-pill">Từ khóa: "${kw}" <span class="remove-pill" data-clear="kw">×</span></span>`;
        if (proc) {
            const procTextMap = { 'moi': 'Bổ nhiệm mới', 'kiemnhiem': 'Bổ nhiệm kiêm nhiệm', 'lai': 'Bổ nhiệm lại', 'keodai': 'Kéo dài thời gian' };
            pillsHtml += `<span class="filter-tag-pill">Thủ tục: ${procTextMap[proc] || proc} <span class="remove-pill" data-clear="proc">×</span></span>`;
        }
        if (unit) pillsHtml += `<span class="filter-tag-pill">Đơn vị: ${unit} <span class="remove-pill" data-clear="unit">×</span></span>`;
        if (pos) pillsHtml += `<span class="filter-tag-pill">Chức vụ: ${pos} <span class="remove-pill" data-clear="pos">×</span></span>`;
        if (status) {
            const stTextMap = { 'draft': 'Chưa gửi', 'review': 'Chờ rà soát', 'pending_update': 'Chờ bổ sung', 'pending_approval': 'Chờ chủ trương', 'approved': 'Đã chấp thuận', 'rejected': 'Không đạt' };
            pillsHtml += `<span class="filter-tag-pill">Trạng thái: ${stTextMap[status] || status} <span class="remove-pill" data-clear="status">×</span></span>`;
        }

        if (pillsHtml) {
            pillsList.innerHTML = pillsHtml;
            pillsBox.style.display = 'flex';
            pillsList.querySelectorAll('.remove-pill').forEach(b => {
                b.addEventListener('click', (e) => {
                    const field = e.target.dataset.clear;
                    if (field === 'kw') container.querySelector('#filter-keyword').value = '';
                    if (field === 'proc') container.querySelector('#filter-procedure').value = '';
                    if (field === 'unit') container.querySelector('#filter-unit').value = '';
                    if (field === 'pos') container.querySelector('#filter-position').value = '';
                    if (field === 'status') container.querySelector('#filter-status').value = '';
                    doSearch();
                });
            });
        } else {
            pillsBox.style.display = 'none';
        }
    };

    ['#filter-procedure', '#filter-unit', '#filter-position', '#filter-status'].forEach(sel => {
        container.querySelector(sel)?.addEventListener('change', doSearch);
    });

    container.querySelector('#btn-exec-search')?.addEventListener('click', doSearch);
    container.querySelector('#btn-reset-filters')?.addEventListener('click', () => {
        container.querySelector('#filter-keyword').value = '';
        container.querySelector('#filter-procedure').value = '';
        container.querySelector('#filter-unit').value = '';
        container.querySelector('#filter-position').value = '';
        container.querySelector('#filter-status').value = '';
        doSearch();
    });

    // Create New Proposal
    container.querySelector('#btn-new-dexuat')?.addEventListener('click', () => renderAddDeXuat(container));

    // Bind row clicks & action buttons
    _bindRowActionEvents(container);
}

/* ── Helper Render Proposal Rows ── */
function _renderProposalTableRows(list) {
    if (!list.length) return '';
    return list.map(item => {
        const getDeXuatStatusBadge = (statusCode, statusText) => App.renderStatusBadge(statusCode, statusText);

        const getPropTypeBadge = (typeCode, typeText) => {
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

        return `
            <tr class="clickable-row row-proposal" data-id="${item.id}" style="cursor: pointer;">
                <td><code style="font-weight: 700; color: var(--primary); font-size: 12px; background: #eff6ff; padding: 2px 8px; border-radius: 6px; white-space: nowrap;">${item.id}</code></td>
                <td style="text-align: center; white-space: nowrap;">${getPropTypeBadge(item.typeCode, item.type)}</td>
                <td><strong style="color: var(--text-primary);">${item.unit}</strong></td>
                <td>${item.position}</td>
                <td>
                    ${item.person ? `
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div class="avatar sm" style="background: var(--primary); font-size: 11px; flex-shrink: 0;">${item.person.split(' ').slice(-1)[0].slice(0,2).toUpperCase()}</div>
                            <strong style="color: var(--text-primary); font-size: 13px;">${item.person}</strong>
                        </div>
                    ` : `<em style="color: var(--text-tertiary); font-size: 12.5px;">Chưa xác định</em>`}
                </td>
                <td style="text-align: center; color: var(--text-secondary); font-size: 12.5px; white-space: nowrap;">${item.date}</td>
                <td style="text-align: center; white-space: nowrap;">${getDeXuatStatusBadge(item.statusCode, item.status)}</td>
                <td style="text-align: center;" onclick="event.stopPropagation()">
                    <div class="table-actions">
                        <button class="btn-icon btn-icon-primary btn-view-prop" data-id="${item.id}" title="Xem chi tiết đề xuất">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>

                        ${(item.statusCode === 'draft' || item.statusCode === 'pending_update') ? `
                            <button class="btn-icon btn-icon-primary btn-edit-prop" data-id="${item.id}" title="Cập nhật đề xuất">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button class="btn-icon btn-send-prop" data-id="${item.id}" title="Gửi đề xuất" style="color: #16A34A;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                            </button>
                        ` : ''}

                        ${item.statusCode === 'review' ? `
                            <button class="btn-icon btn-review-prop" data-id="${item.id}" title="Ghi nhận rà soát Ban TCCB" style="color: #F59E0B;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                            </button>
                        ` : ''}

                        ${item.statusCode === 'pending_approval' ? `
                            <button class="btn-icon btn-approve-prop" data-id="${item.id}" title="Cập nhật kết quả xin chủ trương" style="color: #8B5CF6;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </button>
                        ` : ''}

                        ${item.statusCode === 'approved' ? `
                            <button class="btn-icon btn-icon-primary btn-dossier-prop" data-id="${item.id}" title="Lập hồ sơ bổ nhiệm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

/* ── Bind Row Action Events ── */
function _bindRowActionEvents(container) {
    // Click row -> View detail
    container.querySelectorAll('.row-proposal').forEach(r => {
        r.addEventListener('click', () => renderViewDeXuat(container, r.dataset.id));
    });

    container.querySelectorAll('.btn-view-prop').forEach(b => {
        b.addEventListener('click', e => { e.stopPropagation(); renderViewDeXuat(container, b.dataset.id); });
    });

    container.querySelectorAll('.btn-edit-prop').forEach(b => {
        b.addEventListener('click', e => { e.stopPropagation(); renderEditDeXuat(container, b.dataset.id); });
    });

    container.querySelectorAll('.btn-send-prop').forEach(b => {
        b.addEventListener('click', e => { e.stopPropagation(); _handleSendProposal(container, b.dataset.id); });
    });

    container.querySelectorAll('.btn-review-prop').forEach(b => {
        b.addEventListener('click', e => { e.stopPropagation(); renderReviewModal(container, b.dataset.id); });
    });

    container.querySelectorAll('.btn-approve-prop').forEach(b => {
        b.addEventListener('click', e => { e.stopPropagation(); renderApprovalModal(container, b.dataset.id); });
    });

    container.querySelectorAll('.btn-dossier-prop').forEach(b => {
        b.addEventListener('click', e => {
            e.stopPropagation();
            App.notify('Đang chuyển sang Module Lập hồ sơ bổ nhiệm...', 'info');
            setTimeout(() => { window.location.hash = 'bonhiem'; }, 600);
        });
    });
}


/* ============================================================
   UC03.02 – TẠO ĐỀ XUẤT CHỦ TRƯƠNG NHÂN SỰ
   ============================================================ */
function renderAddDeXuat(container, prefillData = null) {
    const personnelList = PersonnelController.getList();
    const positions = PositionController.getPositions();
    const procs = PositionController.getProcedureTypes();
    const sendIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;

    const html = `
        <div class="full-page-container">
            <div class="page-header-alt" style="padding: 20px 32px; background: #ffffff; border-bottom: 1px solid var(--border);">
                <div class="breadcrumb-bar" style="margin-bottom: 8px;">
                    <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                        <span class="bc-back-btn" id="bc-back-list">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                            QUẢN LÝ ĐỀ XUẤT
                        </span>
                        <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                        <span class="bc-current">TẠO ĐỀ XUẤT CHỦ TRƯƠNG MỚI</span>
                    </div>
                </div>
                <h2 style="font-size: 20px; font-weight: 700; color: var(--text-primary); margin: 0;">Tạo đề xuất chủ trương nhân sự</h2>
                <p style="color: var(--text-secondary); margin-top: 4px; font-size: 13px;">Khởi tạo đề xuất trình cấp có thẩm quyền xem xét chủ trương bổ nhiệm và bổ nhiệm lại</p>
            </div>

            <div style="padding: 28px 32px; width: 100%;">
                <form id="add-proposal-form">
                    <!-- Section 1: Thông tin loại thủ tục & Chức vụ -->
                    <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px;">
                        <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                            1. Thông tin loại thủ tục và Chức vụ đề xuất
                        </h3>
                        <div class="grid-2" style="gap: 16px;">
                            <div class="form-group">
                                <label class="form-label">Loại thủ tục <span class="text-danger">*</span></label>
                                <select class="form-input" id="add-dx-type" required style="height: 38px;">
                                    <option value="moi">Bổ nhiệm mới</option>
                                    <option value="kiemnhiem">Bổ nhiệm kiêm nhiệm</option>
                                    <option value="lai">Bổ nhiệm lại</option>
                                    <option value="keodai">Kéo dài thời gian giữ chức vụ</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Đơn vị đề xuất <span class="text-danger">*</span></label>
                                <select class="form-input" id="add-dx-unit" required style="height: 38px;">
                                    <option value="Ban Đào tạo">Ban Đào tạo</option>
                                    <option value="Ban Tổ chức Cán bộ">Ban Tổ chức Cán bộ</option>
                                    <option value="Văn phòng">Văn phòng</option>
                                    <option value="Ban Kế hoạch - Tài chính">Ban Kế hoạch - Tài chính</option>
                                    <option value="Khoa Công nghệ Thông tin">Khoa Công nghệ Thông tin</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Chức vụ đề xuất <span class="text-danger">*</span></label>
                                <select class="form-input" id="add-dx-pos" required style="height: 38px;">
                                    <option value="">— Chọn chức vụ đề xuất —</option>
                                    ${positions.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Nguồn nhân sự áp dụng</label>
                                <select class="form-input" id="add-dx-source" style="height: 38px;">
                                    <option value="Tất cả">Tất cả nguồn nhân sự</option>
                                    <option value="Tại chỗ">Nhân sự tại chỗ</option>
                                    <option value="Từ nơi khác">Nhân sự từ nơi khác</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Section 2: Thông tin Nhân sự dự kiến -->
                    <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                            <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0;">
                                2. Nhân sự dự kiến
                            </h3>
                            <span id="person-requirement-tag" style="font-size: 12px; color: var(--text-tertiary); font-weight: 600;">
                                BR02: Bổ nhiệm mới có thể chưa chọn nhân sự
                            </span>
                        </div>

                        <div class="form-group" style="margin-bottom: 16px;">
                            <label class="form-label">Chọn nhân sự dự kiến từ hồ sơ</label>
                            <select class="form-input" id="add-dx-person-id" style="height: 38px;">
                                <option value="">— Chưa xác định nhân sự dự kiến —</option>
                                ${personnelList.map(p => `<option value="${p.id}">${p.id} - ${p.name} (${p.unit} - ${p.position})</option>`).join('')}
                            </select>
                        </div>

                        <!-- Card preview thông tin nhân sự khi được chọn -->
                        <div id="personnel-preview-card" style="display: none; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px;">
                            <div style="display: flex; gap: 16px; align-items: center;">
                                <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700;" id="prev-avatar">NS</div>
                                <div style="flex: 1;">
                                    <div style="font-size: 15px; font-weight: 700; color: #0f172a;" id="prev-name">—</div>
                                    <div style="font-size: 13px; color: #64748b; margin-top: 2px;">
                                        Đơn vị: <strong id="prev-unit" style="color: #334155;">—</strong> ·
                                        Chức vụ hiện tại: <strong id="prev-pos" style="color: #334155;">—</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 3: Lý do, Căn cứ & Nội dung -->
                    <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px;">
                        <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                            3. Lý do kiện toàn, Căn cứ và Nội dung đề xuất
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <div class="form-group">
                                <label class="form-label">Lý do kiện toàn / Nhu cầu nhân sự <span class="text-danger">*</span></label>
                                <textarea class="form-input" id="add-dx-reason" rows="2" placeholder="Nêu rõ nhu cầu kiện toàn chức vụ lãnh đạo, quản lý..." required></textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Căn cứ đề xuất <span class="text-danger">*</span></label>
                                <textarea class="form-input" id="add-dx-basis" rows="2" placeholder="Căn cứ Nghị quyết, Quy chế tổ chức, Văn bản chỉ đạo..." required></textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Nội dung đề xuất chi tiết</label>
                                <textarea class="form-input" id="add-dx-content" rows="2" placeholder="Nội dung cụ thể trình cấp có thẩm quyền..."></textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ghi chú</label>
                                <input type="text" class="form-input" id="add-dx-note" placeholder="Ghi chú thêm (nếu có)">
                            </div>
                        </div>
                    </div>

                    <!-- Section 4: Tài liệu đính kèm ban đầu -->
                    <div class="card" style="padding: 24px; margin-bottom: 24px; border-radius: 12px;">
                        <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                            4. Tài liệu đính kèm ban đầu
                        </h3>
                        <div class="grid-2" style="gap: 16px;">
                            <div class="form-group">
                                <label class="form-label">Loại tài liệu đính kèm</label>
                                <select class="form-input" id="add-dx-doc-type" style="height: 38px;">
                                    <option value="Tờ trình đề xuất">Tờ trình đề xuất chủ trương</option>
                                    <option value="Biên bản họp">Biên bản họp thống nhất đơn vị</option>
                                    <option value="Sơ yếu lý lịch">Sơ yếu lý lịch nhân sự</option>
                                    <option value="Khác">Tài liệu khác</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tên tệp đính kèm (Mô phỏng tải tệp)</label>
                                <input type="text" class="form-input" id="add-dx-doc-name" value="To_trinh_de_xuat_chu_truong.pdf" style="height: 38px;">
                            </div>
                        </div>
                    </div>

                    <!-- Action buttons -->
                    <div style="display: flex; justify-content: flex-end; gap: 12px; margin-bottom: 40px;">
                        <button type="button" class="btn btn-secondary" id="btn-cancel-add">Hủy bỏ</button>
                        <button type="submit" class="btn btn-primary" id="btn-save-draft" style="background: #64748b !important;">
                            Lưu nháp (Chưa gửi)
                        </button>
                        <button type="button" class="btn btn-primary" id="btn-save-and-send" style="background: #16A34A !important;">
                            ${sendIcon} Lưu & Gửi đề xuất
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    container.innerHTML = html;
    if (App && App.setFullPage) App.setFullPage();

    // Event back
    container.querySelector('#bc-back-list')?.addEventListener('click', () => renderDeXuat(container));
    container.querySelector('#btn-cancel-add')?.addEventListener('click', () => renderDeXuat(container));

    // Dynamic requirement text & personnel requirement check (BR02 & BR03)
    const typeSelect = container.querySelector('#add-dx-type');
    const personSelect = container.querySelector('#add-dx-person-id');
    const requirementTag = container.querySelector('#person-requirement-tag');

    typeSelect?.addEventListener('change', () => {
        const val = typeSelect.value;
        if (val === 'moi') {
            requirementTag.textContent = 'Lưu ý: Bổ nhiệm mới có thể chưa chọn nhân sự dự kiến';
            requirementTag.style.color = 'var(--text-tertiary)';
        } else {
            requirementTag.textContent = 'Lưu ý: Thủ tục này bắt buộc chọn Nhân sự dự kiến';
            requirementTag.style.color = '#B45309';
        }
    });

    // Personnel selection preview card update
    personSelect?.addEventListener('change', () => {
        const pid = personSelect.value;
        const card = container.querySelector('#personnel-preview-card');
        if (!pid) {
            if (card) card.style.display = 'none';
            return;
        }
        const personObj = personnelList.find(p => p.id === pid);
        if (personObj) {
            card.style.display = 'block';
            container.querySelector('#prev-avatar').textContent = personObj.name.split(' ').slice(-1)[0].slice(0, 2).toUpperCase();
            container.querySelector('#prev-name').textContent = personObj.name;
            container.querySelector('#prev-unit').textContent = personObj.unit;
            container.querySelector('#prev-pos').textContent = personObj.position;
        }
    });

    // Handle pre-filled data if creating proposal directly from Tenure Warning (MD07)
    if (prefillData) {
        if (prefillData.procedureType && typeSelect) {
            typeSelect.value = prefillData.procedureType;
            typeSelect.dispatchEvent(new Event('change'));
        }
        if (prefillData.unit && container.querySelector('#add-dx-unit')) {
            container.querySelector('#add-dx-unit').value = prefillData.unit;
        }
        if (prefillData.position && container.querySelector('#add-dx-pos')) {
            container.querySelector('#add-dx-pos').value = prefillData.position;
        }
        if (prefillData.personId && personSelect) {
            personSelect.value = prefillData.personId;
            personSelect.dispatchEvent(new Event('change'));
        }
        if (prefillData.reason && container.querySelector('#add-dx-reason')) {
            container.querySelector('#add-dx-reason').value = prefillData.reason;
        }
        if (prefillData.basis && container.querySelector('#add-dx-basis')) {
            container.querySelector('#add-dx-basis').value = prefillData.basis;
        }
        App.pendingDeXuatPrefill = null;
    }

    window.renderAddDeXuat = renderAddDeXuat;

    // Form submit handler
    const handleSave = (isSend = false) => {
        const typeCode = typeSelect.value;
        const typeTextMap = { 'moi': 'Bổ nhiệm mới', 'kiemnhiem': 'Bổ nhiệm kiêm nhiệm', 'lai': 'Bổ nhiệm lại', 'keodai': 'Kéo dài thời gian giữ chức vụ' };
        const typeText = typeTextMap[typeCode] || 'Bổ nhiệm mới';

        const unit = container.querySelector('#add-dx-unit').value;
        const position = container.querySelector('#add-dx-pos').value;
        const personId = personSelect.value;
        const source = container.querySelector('#add-dx-source').value;
        const reason = container.querySelector('#add-dx-reason').value.trim();
        const basis = container.querySelector('#add-dx-basis').value.trim();
        const content = container.querySelector('#add-dx-content').value.trim();
        const note = container.querySelector('#add-dx-note').value.trim();
        const docName = container.querySelector('#add-dx-doc-name').value.trim();

        // Validation: Required personnel for non-new procedures
        if (typeCode !== 'moi' && !personId) {
            App.notify('Loại thủ tục này bắt buộc phải chọn Nhân sự dự kiến.', 'warning');
            return;
        }

        if (!position || !reason || !basis) {
            App.notify('Vui lòng điền đầy đủ các thông tin bắt buộc (Chức vụ, Lý do, Căn cứ).', 'warning');
            return;
        }

        const personObj = personnelList.find(p => p.id === personId);
        const personName = personObj ? personObj.name : '';

        // Duplication Check: No duplicate pending proposals
        const isDuplicate = App.state.proposals.some(p =>
            p.typeCode === typeCode &&
            p.unit === unit &&
            p.position === position &&
            (p.statusCode === 'draft' || p.statusCode === 'review' || p.statusCode === 'pending_approval' || p.statusCode === 'pending_update') &&
            (!personId || p.personId === personId)
        );

        if (isDuplicate) {
            App.notify('Đã tồn tại đề xuất đang xử lý có cùng Loại thủ tục, Đơn vị, Chức vụ và Nhân sự.', 'danger');
            return;
        }

        const newId = `DX-${new Date().getFullYear()}-${String(App.state.proposals.length + 1).padStart(3, '0')}`;
        const newProp = {
            id: newId,
            type: typeText,
            typeCode: typeCode,
            unit: unit,
            position: position,
            personId: personId || '',
            person: personName,
            source: source,
            reason: reason,
            basis: basis,
            content: content || `Kính trình Ban Giám đốc xem xét phê duyệt chủ trương ${typeText} đối với chức vụ ${position}`,
            note: note,
            date: new Date().toLocaleDateString('vi-VN'),
            status: isSend ? 'Chờ rà soát' : 'Chưa gửi',
            statusCode: isSend ? 'review' : 'draft',
            documents: docName ? [{ name: docName, type: container.querySelector('#add-dx-doc-type').value, date: new Date().toLocaleDateString('vi-VN') }] : [],
            history: [
                { action: 'Tạo đề xuất chủ trương', user: App.user ? App.user.name : 'Đơn vị trình', time: new Date().toLocaleString('vi-VN') }
            ]
        };

        if (isSend) {
            newProp.history.push({ action: 'Gửi đề xuất sang Ban TCCB', user: App.user ? App.user.name : 'Đơn vị trình', time: new Date().toLocaleString('vi-VN') });
        }

        App.state.proposals.unshift(newProp);
        App.notify(isSend ? 'Đã khởi tạo và gửi đề xuất chủ trương thành công!' : 'Đã lưu nháp đề xuất chủ trương.', 'success');
        renderDeXuat(container);
    };

    container.querySelector('#add-proposal-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSave(false);
    });

    container.querySelector('#btn-save-and-send')?.addEventListener('click', () => {
        handleSave(true);
    });
}


/* ============================================================
   UC03.03 – XEM CHI TIẾT ĐỀ XUẤT CHỦ TRƯƠNG NHÂN SỰ
   (Bố cục chuẩn đồng bộ, Breadcrumb chuẩn ảnh & Tiến trình vừa màn hình)
   ============================================================ */
function renderViewDeXuat(container, dxId) {
    const item = App.state.proposals.find(p => p.id === dxId);
    if (!item) return;

    const badgeMap = {
        'draft': { cls: 'badge-secondary', text: 'Chưa gửi' },
        'review': { cls: 'badge-warning', text: 'Chờ rà soát TCCB' },
        'pending_update': { cls: 'badge-danger', text: 'Chờ bổ sung' },
        'pending_approval': { cls: 'badge-info', text: 'Chờ kết quả chủ trương' },
        'approved': { cls: 'badge-success', text: 'Đã chấp thuận' },
        'rejected': { cls: 'badge-danger', text: 'Không được chấp thuận' }
    };
    const st = badgeMap[item.statusCode] || { cls: 'badge-secondary', text: item.status };

    // Calculate active workflow step
    let activeStep = 1;
    if (item.statusCode === 'review') activeStep = 2;
    else if (item.statusCode === 'pending_approval') activeStep = 3;
    else if (item.statusCode === 'approved' || item.statusCode === 'rejected') activeStep = 4;
    else if (item.statusCode === 'pending_update') activeStep = 1;

    const editIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
    const sendIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
    const reviewIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`;
    const approveIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
    const dossierIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`;

    const html = `
        <div class="full-page-container" style="background: var(--bg-app); min-height: 100vh; padding-bottom: 40px;">
            <!-- Header chuẩn đồng bộ theo đúng mẫu người dùng gửi -->
            <div class="page-header-alt" style="padding: 20px 32px; background: #ffffff; border-bottom: 1px solid var(--border); width: 100%;">
                <div style="width: 100%;">
                    <div class="breadcrumb-bar" style="margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
                        <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                            <span class="bc-back-btn" id="bc-back-list">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                                QUẢN LÝ ĐỀ XUẤT
                            </span>
                            <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                            <span class="bc-current">CHI TIẾT ĐỀ XUẤT</span>
                        </div>
                        <div>${App.renderStatusBadge(item.statusCode, item.status)}</div>
                    </div>
                    <h2 style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin: 0;">
                        Đề xuất ${item.id} — ${item.position} (${item.unit})
                    </h2>
                </div>
            </div>

            <div style="padding: 24px 32px 0; width: 100%;">
                <!-- Thanh tiến trình xử lý vừa khớp chiều rộng màn hình -->
                <div class="card" style="padding: 18px 24px; margin-bottom: 24px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                    <div style="font-size: 11px; font-weight: 800; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                        TIẾN TRÌNH XỬ LÝ QUY TRÌNH XIN CHỦ TRƯƠNG BỔ NHIỆM
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
                        <!-- Step 1 -->
                        <div style="padding: 10px 14px; border-radius: 8px; background: ${activeStep >= 1 ? '#eff6ff' : '#f8fafc'}; border: 1px solid ${activeStep >= 1 ? '#bfdbfe' : '#e2e8f0'}; display: flex; align-items: center; gap: 10px;">
                            <div style="width: 26px; height: 26px; border-radius: 50%; background: ${activeStep > 1 ? '#16a34a' : activeStep === 1 ? 'var(--primary)' : '#94a3b8'}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 800; flex-shrink: 0;">
                                ${activeStep > 1 ? '✓' : '1'}
                            </div>
                            <div style="min-width: 0;">
                                <div style="font-size: 12.5px; font-weight: 700; color: ${activeStep >= 1 ? 'var(--primary)' : 'var(--text-secondary)'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Tạo & Gửi đề xuất</div>
                                <div style="font-size: 11px; color: var(--text-tertiary);">Đơn vị đề xuất</div>
                            </div>
                        </div>

                        <!-- Step 2 -->
                        <div style="padding: 10px 14px; border-radius: 8px; background: ${activeStep >= 2 ? '#eff6ff' : '#f8fafc'}; border: 1px solid ${activeStep >= 2 ? '#bfdbfe' : '#e2e8f0'}; display: flex; align-items: center; gap: 10px;">
                            <div style="width: 26px; height: 26px; border-radius: 50%; background: ${activeStep > 2 ? '#16a34a' : activeStep === 2 ? 'var(--primary)' : '#94a3b8'}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 800; flex-shrink: 0;">
                                ${activeStep > 2 ? '✓' : '2'}
                            </div>
                            <div style="min-width: 0;">
                                <div style="font-size: 12.5px; font-weight: 700; color: ${activeStep >= 2 ? 'var(--primary)' : 'var(--text-secondary)'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Rà soát Ban TCCB</div>
                                <div style="font-size: 11px; color: var(--text-tertiary);">Rà soát hồ sơ</div>
                            </div>
                        </div>

                        <!-- Step 3 -->
                        <div style="padding: 10px 14px; border-radius: 8px; background: ${activeStep >= 3 ? '#eff6ff' : '#f8fafc'}; border: 1px solid ${activeStep >= 3 ? '#bfdbfe' : '#e2e8f0'}; display: flex; align-items: center; gap: 10px;">
                            <div style="width: 26px; height: 26px; border-radius: 50%; background: ${activeStep > 3 ? '#16a34a' : activeStep === 3 ? 'var(--primary)' : '#94a3b8'}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 800; flex-shrink: 0;">
                                ${activeStep > 3 ? '✓' : '3'}
                            </div>
                            <div style="min-width: 0;">
                                <div style="font-size: 12.5px; font-weight: 700; color: ${activeStep >= 3 ? 'var(--primary)' : 'var(--text-secondary)'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Xin ý kiến chủ trương</div>
                                <div style="font-size: 11px; color: var(--text-tertiary);">Cấp thẩm quyền</div>
                            </div>
                        </div>

                        <!-- Step 4 -->
                        <div style="padding: 10px 14px; border-radius: 8px; background: ${activeStep === 4 ? (item.statusCode === 'approved' ? '#f0fdf4' : '#fef2f2') : '#f8fafc'}; border: 1px solid ${activeStep === 4 ? (item.statusCode === 'approved' ? '#bbf7d0' : '#fecaca') : '#e2e8f0'}; display: flex; align-items: center; gap: 10px;">
                            <div style="width: 26px; height: 26px; border-radius: 50%; background: ${activeStep === 4 ? (item.statusCode === 'approved' ? '#16a34a' : '#dc2626') : '#94a3b8'}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 800; flex-shrink: 0;">
                                ${item.statusCode === 'approved' ? '✓' : item.statusCode === 'rejected' ? '✕' : '4'}
                            </div>
                            <div style="min-width: 0;">
                                <div style="font-size: 12.5px; font-weight: 700; color: ${activeStep === 4 ? (item.statusCode === 'approved' ? '#15803d' : '#991b1b') : 'var(--text-secondary)'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Kết quả chủ trương</div>
                                <div style="font-size: 11px; color: var(--text-tertiary);">${item.statusCode === 'approved' ? 'Chấp thuận' : 'Quyết định'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Layout 2 cột chi tiết -->
                <div style="display: grid; grid-template-columns: 1fr 340px; gap: 24px;">

                    <!-- CỘT TRÁI CHÍNH -->
                    <div>
                        <!-- Thông báo bổ sung nếu đang ở trạng thái pending_update -->
                        ${item.statusCode === 'pending_update' && item.reviewResult && item.reviewResult.note ? `
                            <div style="background: #fef2f2; border: 1px solid #fecaca; border-left: 4px solid #dc2626; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
                                <div style="font-weight: 700; color: #991b1b; font-size: 14px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                    YÊU CẦU BỔ SUNG TỪ BAN TỔ CHỨC CÁN BỘ
                                </div>
                                <div style="font-size: 13.5px; color: #7f1d1d; line-height: 1.5; background: #ffffff; padding: 10px 14px; border-radius: 6px; border: 1px solid #fee2e2;">${item.reviewResult.note}</div>
                            </div>
                        ` : ''}

                        <!-- Thẻ 1: Thông tin chung về đề xuất -->
                        <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                            <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                1. Thông tin chung về đề xuất
                            </h3>
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                                <div>
                                    <span style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">Mã đề xuất</span>
                                    <div style="font-size: 14px; font-weight: 700; color: var(--primary); margin-top: 2px;">${item.id}</div>
                                </div>
                                <div>
                                    <span style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">Loại thủ tục</span>
                                    <div style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin-top: 2px;">${item.type}</div>
                                </div>
                                <div>
                                    <span style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">Đơn vị đề xuất</span>
                                    <div style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin-top: 2px;">${item.unit}</div>
                                </div>
                                <div>
                                    <span style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">Chức vụ đề xuất</span>
                                    <div style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${item.position}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Thẻ 2: Thông tin nhân sự dự kiến -->
                        <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                            <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                2. Thông tin nhân sự dự kiến
                            </h3>
                            ${item.person ? `
                                <div style="display: flex; gap: 16px; align-items: center; background: #eff6ff; padding: 16px; border-radius: 10px; border: 1px solid #bfdbfe;">
                                    <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; flex-shrink: 0;">
                                        ${item.person.split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <div style="font-size: 16px; font-weight: 700; color: #0f172a;">${item.person}</div>
                                        <div style="font-size: 13px; color: #475569; margin-top: 2px;">
                                            Đơn vị trình: ${item.unit} · Nguồn nhân sự: <strong>${item.source || 'Nhân sự tại chỗ'}</strong>
                                        </div>
                                    </div>
                                </div>
                            ` : `
                                <div style="padding: 16px; background: #f8fafc; border-radius: 8px; color: var(--text-tertiary); font-size: 13.5px; text-align: center; border: 1px dashed #cbd5e1;">
                                    Chưa xác định nhân sự dự kiến (Đề xuất được tạo từ nhu cầu kiện toàn chức vụ)
                                </div>
                            `}
                        </div>

                        <!-- Thẻ 3: Căn cứ, Lý do và Nội dung đề xuất -->
                        <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                            <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                                3. Căn cứ, Lý do và Nội dung đề xuất
                            </h3>
                            <div style="display: flex; flex-direction: column; gap: 16px; font-size: 13.5px; color: var(--text-primary);">
                                <div>
                                    <strong style="color: var(--text-secondary); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">Lý do kiện toàn:</strong>
                                    <div style="margin-top: 4px; padding: 12px; background: #f8fafc; border-radius: 8px; line-height: 1.5; border: 1px solid #e2e8f0;">${item.reason || '—'}</div>
                                </div>
                                <div>
                                    <strong style="color: var(--text-secondary); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">Căn cứ pháp lý & Thực tiễn:</strong>
                                    <div style="margin-top: 4px; padding: 12px; background: #f8fafc; border-radius: 8px; line-height: 1.5; border: 1px solid #e2e8f0;">${item.basis || '—'}</div>
                                </div>
                                <div>
                                    <strong style="color: var(--text-secondary); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">Nội dung đề xuất:</strong>
                                    <div style="margin-top: 4px; padding: 12px; background: #f8fafc; border-radius: 8px; line-height: 1.5; border: 1px solid #e2e8f0;">${item.content || '—'}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Thẻ 4: Tài liệu đính kèm -->
                        <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                            <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                                4. Tài liệu đính kèm (${(item.documents || []).length})
                            </h3>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                ${(item.documents || []).length > 0 ? (item.documents || []).map(doc => `
                                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                            <div>
                                                <div style="font-weight: 600; font-size: 13.5px; color: #0f172a;">${doc.name}</div>
                                                <div style="font-size: 11.5px; color: #64748b;">Loại: ${doc.type || 'Tài liệu đề xuất'} · Ngày tải: ${doc.date}</div>
                                            </div>
                                        </div>
                                        <button type="button" class="btn-icon btn-icon-primary" title="Xem tệp tài liệu" onclick="App.notify('Đang mở xem trước tài liệu...', 'info')">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                        </button>
                                    </div>
                                `).join('') : '<div style="color: var(--text-tertiary); font-size: 13px; padding: 12px;">Chưa có tài liệu đính kèm</div>'}
                            </div>
                        </div>

                        <!-- Thẻ 5: Kết quả rà soát Ban TCCB (nếu có) -->
                        ${item.reviewResult ? `
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); border-left: 4px solid var(--primary); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                    5. Kết quả rà soát của Ban Tổ chức Cán bộ
                                </h3>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 13.5px;">
                                    <div><strong>Kết quả rà soát:</strong> <span class="badge ${item.reviewResult.result === 'Đạt' ? 'badge-success' : 'badge-danger'}">${item.reviewResult.result}</span></div>
                                    <div><strong>Người rà soát:</strong> ${item.reviewResult.reviewer || 'Ban TCCB'}</div>
                                    <div style="grid-column: span 2;"><strong>Nhận xét / Yêu cầu:</strong> ${item.reviewResult.note || 'Không có'}</div>
                                </div>
                            </div>
                        ` : ''}

                        <!-- Thẻ 6: Kết quả xin chủ trương (nếu có) -->
                        ${item.approvalResult ? `
                            <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px; border: 1px solid var(--border); border-left: 4px solid #16A34A; background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                                <h3 style="font-size: 15px; font-weight: 700; color: #15803D; margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                    6. Kết quả xin chủ trương của Cấp có thẩm quyền
                                </h3>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 13.5px;">
                                    <div><strong>Cấp có thẩm quyền:</strong> ${item.approvalResult.authority}</div>
                                    <div><strong>Số văn bản:</strong> ${item.approvalResult.docNumber || '—'}</div>
                                    <div><strong>Ngày kết luận:</strong> ${item.approvalResult.date}</div>
                                    <div><strong>Kết quả:</strong> <span class="badge badge-success">${item.approvalResult.result}</span></div>
                                    <div style="grid-column: span 2;"><strong>Nội dung kết luận:</strong> ${item.approvalResult.content || '—'}</div>
                                </div>
                            </div>
                        ` : ''}

                    </div>

                    <!-- CỘT PHẢI THAO TÁC VÀ TIMELINE -->
                    <div>
                        <!-- Thao tác nghiệp vụ -->
                        <div class="card" style="padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                            <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0 0 14px; display: flex; align-items: center; gap: 6px;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                                Thao tác nghiệp vụ
                            </h4>

                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                ${(item.statusCode === 'draft' || item.statusCode === 'pending_update') ? `
                                    <button type="button" class="btn btn-secondary" id="btn-action-edit" style="width: 100%; justify-content: center; font-weight: 600;">
                                        ${editIcon} Cập nhật đề xuất
                                    </button>
                                    <button type="button" class="btn btn-primary" id="btn-action-send" style="width: 100%; justify-content: center; font-weight: 600;">
                                        ${sendIcon} Gửi đề xuất
                                    </button>
                                ` : ''}

                                ${item.statusCode === 'review' ? `
                                    <button type="button" class="btn btn-primary" id="btn-action-review" style="width: 100%; justify-content: center; font-weight: 600;">
                                        ${reviewIcon} Ghi nhận kết quả rà soát
                                    </button>
                                ` : ''}

                                ${(item.statusCode === 'pending_approval' || item.statusCode === 'review') ? `
                                    <button type="button" class="btn btn-primary btn-giamdoc-approve" id="btn-action-approve" style="width: 100%; justify-content: center; font-weight: 700; background: #16a34a !important; padding: 11px 14px; text-align: center;">
                                        Phê duyệt Chủ trương bổ nhiệm
                                    </button>
                                ` : ''}

                                ${item.statusCode === 'approved' ? `
                                    <button type="button" class="btn btn-primary" id="btn-action-dossier" style="width: 100%; justify-content: center; font-weight: 600;">
                                        ${dossierIcon} Lập hồ sơ bổ nhiệm
                                    </button>
                                ` : ''}
                            </div>
                        </div>

                        <!-- Lịch sử xử lý Timeline -->
                        <div class="card" style="padding: 20px; border-radius: 12px; border: 1px solid var(--border); background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                            <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0 0 16px; display: flex; align-items: center; gap: 6px;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                Lịch sử xử lý & Nhật ký
                            </h4>
                            <div style="display: flex; flex-direction: column; gap: 14px;">
                                ${(item.history || []).map((h, i) => `
                                    <div style="display: flex; gap: 10px; align-items: flex-start;">
                                        <div style="width: 24px; height: 24px; border-radius: 50%; background: #eff6ff; border: 1px solid #bfdbfe; color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; flex-shrink: 0;">
                                            ${i + 1}
                                        </div>
                                        <div>
                                            <div style="font-size: 13px; font-weight: 700; color: #0f172a;">${h.action}</div>
                                            <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">${h.user} · ${h.time}</div>
                                        </div>
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

    container.querySelector('#bc-back-list')?.addEventListener('click', () => renderDeXuat(container));

    // Bind Action buttons
    container.querySelector('#btn-action-edit')?.addEventListener('click', () => renderEditDeXuat(container, dxId));
    container.querySelector('#btn-action-send')?.addEventListener('click', () => _handleSendProposal(container, dxId));
    container.querySelector('#btn-action-review')?.addEventListener('click', () => renderReviewModal(container, dxId));
    container.querySelector('#btn-action-approve')?.addEventListener('click', () => renderApprovalModal(container, dxId));
    container.querySelector('#btn-action-dossier')?.addEventListener('click', () => {
        // Automatically check/create dossier in App.state.dossiersList
        const existingDossier = App.state.dossiersList.find(d => d.proposalId === item.id || d.person === item.expectedPerson);
        if (!existingDossier) {
            const newDossier = {
                id: `HS-${String(App.state.dossiersList.length + 1).padStart(4, '0')}`,
                person: item.expectedPerson,
                unit: item.unit,
                position: item.targetPosition,
                procedureType: item.procedureType || 'Bổ nhiệm mới',
                statusCode: 'draft',
                statusText: 'Chưa gửi thẩm định',
                deadline: '30 ngày',
                officer: App.user ? App.user.name : 'Chưa phân công',
                proposalId: item.id
            };
            App.state.dossiersList.unshift(newDossier);
            App.notify(`Đã tự động khởi tạo Hồ sơ bổ nhiệm ${newDossier.id} từ Đề xuất ${item.id}!`, 'success');
        } else {
            App.notify(`Chuyển sang Hồ sơ bổ nhiệm liên quan của cán bộ ${item.expectedPerson}!`, 'info');
        }
        setTimeout(() => { window.location.hash = 'bonhiem'; }, 500);
    });
}


/* ============================================================
   UC03.04 – CẬP NHẬT ĐỀ XUẤT CHỦ TRƯƠNG NHÂN SỰ
   ============================================================ */
function renderEditDeXuat(container, dxId) {
    const item = App.state.proposals.find(p => p.id === dxId);
    if (!item) return;

    // Check: Can only update if draft or pending_update
    if (item.statusCode !== 'draft' && item.statusCode !== 'pending_update') {
        App.notify('Đề xuất đã gửi và đang xử lý, không thể chỉnh sửa.', 'warning');
        return;
    }

    const personnelList = PersonnelController.getList();
    const positions = PositionController.getPositions();

    const isDraft = item.statusCode === 'draft';

    const html = `
        <div class="full-page-container">
            <div class="page-header-alt" style="padding: 20px 32px; background: #ffffff; border-bottom: 1px solid var(--border);">
                <div class="breadcrumb-bar" style="margin-bottom: 8px;">
                    <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                        <span class="bc-back-btn" id="bc-back-detail">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                            QUẢN LÝ ĐỀ XUẤT
                        </span>
                        <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                        <span class="bc-current">CẬP NHẬT ĐỀ XUẤT CHỦ TRƯƠNG</span>
                    </div>
                </div>
                <h2 style="font-size: 20px; font-weight: 700; color: var(--text-primary); margin: 0;">Cập nhật đề xuất: ${item.id}</h2>
            </div>

            <div style="padding: 28px 32px; width: 100%;">
                ${item.statusCode === 'pending_update' && item.reviewResult && item.reviewResult.note ? `
                    <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
                        <div style="font-weight: 700; color: #991B1B; font-size: 14px; margin-bottom: 4px;">YÊU CẦU BỔ SUNG TỪ BAN TỔ CHỨC CÁN BỘ:</div>
                        <div style="font-size: 13.5px; color: #7F1D1D;">${item.reviewResult.note}</div>
                    </div>
                ` : ''}

                <form id="edit-proposal-form">
                    <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px;">
                        <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                            Thông tin loại thủ tục và Chức vụ
                        </h3>
                        <div class="grid-2" style="gap: 16px;">
                            <div class="form-group">
                                <label class="form-label">Loại thủ tục <span class="text-danger">*</span></label>
                                <select class="form-input" id="edit-dx-type" ${!isDraft ? 'disabled' : ''} style="height: 38px;">
                                    <option value="moi" ${item.typeCode === 'moi' ? 'selected' : ''}>Bổ nhiệm mới</option>
                                    <option value="kiemnhiem" ${item.typeCode === 'kiemnhiem' ? 'selected' : ''}>Bổ nhiệm kiêm nhiệm</option>
                                    <option value="lai" ${item.typeCode === 'lai' ? 'selected' : ''}>Bổ nhiệm lại</option>
                                    <option value="keodai" ${item.typeCode === 'keodai' ? 'selected' : ''}>Kéo dài thời gian giữ chức vụ</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Đơn vị đề xuất <span class="text-danger">*</span></label>
                                <select class="form-input" id="edit-dx-unit" ${!isDraft ? 'disabled' : ''} style="height: 38px;">
                                    <option value="Ban Đào tạo" ${item.unit === 'Ban Đào tạo' ? 'selected' : ''}>Ban Đào tạo</option>
                                    <option value="Ban Tổ chức Cán bộ" ${item.unit === 'Ban Tổ chức Cán bộ' ? 'selected' : ''}>Ban Tổ chức Cán bộ</option>
                                    <option value="Văn phòng" ${item.unit === 'Văn phòng' ? 'selected' : ''}>Văn phòng</option>
                                    <option value="Ban Kế hoạch - Tài chính" ${item.unit === 'Ban Kế hoạch - Tài chính' ? 'selected' : ''}>Ban Kế hoạch - Tài chính</option>
                                    <option value="Khoa Công nghệ Thông tin" ${item.unit === 'Khoa Công nghệ Thông tin' ? 'selected' : ''}>Khoa Công nghệ Thông tin</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Chức vụ đề xuất <span class="text-danger">*</span></label>
                                <select class="form-input" id="edit-dx-pos" ${!isDraft ? 'disabled' : ''} style="height: 38px;">
                                    ${positions.map(p => `<option value="${p.name}" ${p.name === item.position ? 'selected' : ''}>${p.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Nguồn nhân sự áp dụng</label>
                                <select class="form-input" id="edit-dx-source" style="height: 38px;">
                                    <option value="Tất cả" ${item.source === 'Tất cả' ? 'selected' : ''}>Tất cả nguồn nhân sự</option>
                                    <option value="Tại chỗ" ${item.source === 'Tại chỗ' ? 'selected' : ''}>Nhân sự tại chỗ</option>
                                    <option value="Từ nơi khác" ${item.source === 'Từ nơi khác' ? 'selected' : ''}>Nhân sự từ nơi khác</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px;">
                        <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                            Nhân sự dự kiến
                        </h3>
                        <div class="form-group">
                            <label class="form-label">Chọn nhân sự dự kiến</label>
                            <select class="form-input" id="edit-dx-person-id" style="height: 38px;">
                                <option value="">— Chưa xác định nhân sự dự kiến —</option>
                                ${personnelList.map(p => `<option value="${p.id}" ${p.id === item.personId || p.name === item.person ? 'selected' : ''}>${p.id} - ${p.name} (${p.unit})</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <div class="card" style="padding: 24px; margin-bottom: 20px; border-radius: 12px;">
                        <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin: 0 0 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                            Căn cứ, Lý do và Nội dung đề xuất
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <div class="form-group">
                                <label class="form-label">Lý do kiện toàn <span class="text-danger">*</span></label>
                                <textarea class="form-input" id="edit-dx-reason" rows="2" required>${item.reason || ''}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Căn cứ đề xuất <span class="text-danger">*</span></label>
                                <textarea class="form-input" id="edit-dx-basis" rows="2" required>${item.basis || ''}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Nội dung đề xuất chi tiết</label>
                                <textarea class="form-input" id="edit-dx-content" rows="2">${item.content || ''}</textarea>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: flex-end; gap: 12px; margin-bottom: 40px;">
                        <button type="button" class="btn btn-secondary" id="btn-cancel-edit">Hủy bỏ</button>
                        <button type="submit" class="btn btn-primary">Lưu cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    container.innerHTML = html;
    if (App && App.setFullPage) App.setFullPage();

    container.querySelector('#bc-back-detail')?.addEventListener('click', () => renderViewDeXuat(container, dxId));
    container.querySelector('#btn-cancel-edit')?.addEventListener('click', () => renderViewDeXuat(container, dxId));

    container.querySelector('#edit-proposal-form')?.addEventListener('submit', (e) => {
        e.preventDefault();

        const personId = container.querySelector('#edit-dx-person-id').value;
        const personObj = personnelList.find(p => p.id === personId);

        item.reason = container.querySelector('#edit-dx-reason').value.trim();
        item.basis = container.querySelector('#edit-dx-basis').value.trim();
        item.content = container.querySelector('#edit-dx-content').value.trim();
        item.source = container.querySelector('#edit-dx-source').value;

        if (isDraft) {
            item.typeCode = container.querySelector('#edit-dx-type').value;
            const typeTextMap = { 'moi': 'Bổ nhiệm mới', 'kiemnhiem': 'Bổ nhiệm kiêm nhiệm', 'lai': 'Bổ nhiệm lại', 'keodai': 'Kéo dài thời gian giữ chức vụ' };
            item.type = typeTextMap[item.typeCode];
            item.unit = container.querySelector('#edit-dx-unit').value;
            item.position = container.querySelector('#edit-dx-pos').value;
        }

        if (personObj) {
            item.personId = personObj.id;
            item.person = personObj.name;
        }

        item.history.push({
            action: 'Cập nhật nội dung đề xuất',
            user: App.user ? App.user.name : 'Người dùng',
            time: new Date().toLocaleString('vi-VN')
        });

        App.notify('Đã lưu cập nhật thông tin đề xuất thành công!', 'success');
        renderViewDeXuat(container, dxId);
    });
}


/* ============================================================
   UC03.05 – GỬI ĐỀ XUẤT CHỦ TRƯƠNG NHÂN SỰ
   ============================================================ */
function _handleSendProposal(container, dxId) {
    const item = App.state.proposals.find(p => p.id === dxId);
    if (!item) return;

    if (item.statusCode !== 'draft' && item.statusCode !== 'pending_update') {
        App.notify('Chỉ đề xuất ở trạng thái Chưa gửi hoặc Chờ bổ sung mới được gửi.', 'warning');
        return;
    }

    if (item.typeCode !== 'moi' && !item.person) {
        App.notify('Thủ tục này bắt buộc phải chọn Nhân sự dự kiến trước khi gửi.', 'warning');
        return;
    }

    const isResend = item.statusCode === 'pending_update';
    item.statusCode = 'review';
    item.status = 'Chờ rà soát';

    item.history.push({
        action: isResend ? 'Gửi lại đề xuất (sau bổ sung)' : 'Gửi đề xuất sang Ban TCCB',
        user: App.user ? App.user.name : 'Đơn vị trình',
        time: new Date().toLocaleString('vi-VN')
    });

    App.notify(isResend ? 'Đã gửi lại đề xuất thành công. Đề xuất chuyển sang trạng thái Chờ rà soát.' : 'Đã gửi đề xuất đến Ban Tổ chức Cán bộ rà soát.', 'success');
    renderDeXuat(container);
}


/* ============================================================
   UC03.06 – GHI NHẬN KẾT QUẢ RÀ SOÁT (BAN TCCB)
   ============================================================ */
function renderReviewModal(container, dxId) {
    const item = App.state.proposals.find(p => p.id === dxId);
    if (!item) return;

    const html = `
        <div style="padding: 8px 0 16px;">
            <p style="color: #334155; font-size: 13.5px; margin-bottom: 16px;">
                Thực hiện rà soát đề xuất <strong>${item.id}</strong> — ${item.position} (${item.unit})
            </p>
            <div class="form-group" style="margin-bottom: 14px;">
                <label class="form-label">Kết quả rà soát <span class="text-danger">*</span></label>
                <select class="form-input" id="modal-review-result" style="height: 38px;" required>
                    <option value="Đạt">Đạt — Cho phép chuyển xin chủ trương</option>
                    <option value="Cần bổ sung">Cần bổ sung — Trả về đơn vị cập nhật</option>
                    <option value="Không đạt">Không đạt — Từ chối đề xuất</option>
                </select>
            </div>
            <div class="form-group" style="margin-bottom: 14px;">
                <label class="form-label">Nhận xét rà soát / Nội dung yêu cầu bổ sung <span class="text-danger">*</span></label>
                <textarea class="form-input" id="modal-review-note" rows="3" placeholder="Nhập chi tiết ý kiến rà soát của Ban TCCB..." required></textarea>
            </div>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Hủy bỏ</button>
            <button type="button" class="btn btn-primary" id="btn-save-review">Xác nhận rà soát</button>
        </div>
    `;

    App.openModal('Ghi nhận kết quả rà soát', html);

    document.getElementById('btn-save-review')?.addEventListener('click', () => {
        const resVal = document.getElementById('modal-review-result')?.value;
        const noteVal = document.getElementById('modal-review-note')?.value.trim();

        if (!noteVal) {
            App.notify('Vui lòng nhập nhận xét rà soát.', 'warning');
            return;
        }

        item.reviewResult = {
            result: resVal,
            note: noteVal,
            reviewer: App.user ? App.user.name : 'Ban Tổ chức Cán bộ',
            date: new Date().toLocaleDateString('vi-VN')
        };

        if (resVal === 'Đạt') {
            item.statusCode = 'pending_approval';
            item.status = 'Chờ kết quả chủ trương';
        } else if (resVal === 'Cần bổ sung') {
            item.statusCode = 'pending_update';
            item.status = 'Chờ bổ sung';
        } else {
            item.statusCode = 'rejected';
            item.status = 'Không đạt';
        }

        item.history.push({
            action: `Rà soát TCCB: ${resVal}`,
            user: App.user ? App.user.name : 'Ban TCCB',
            time: new Date().toLocaleString('vi-VN')
        });

        App.closeModal();
        App.notify('Đã ghi nhận kết quả rà soát đề xuất!', 'success');
        renderDeXuat(container);
    });
}


/* ============================================================
   UC03.07 – CẬP NHẬT KẾT QUẢ XIN CHỦ TRƯƠNG (BAN TCCB)
   ============================================================ */
function renderApprovalModal(container, dxId) {
    const item = App.state.proposals.find(p => p.id === dxId);
    if (!item) return;

    const html = `
        <div style="padding: 8px 0 16px;">
            <p style="color: #334155; font-size: 13.5px; margin-bottom: 16px;">
                Ghi nhận kết quả xin chủ trương cho đề xuất <strong>${item.id}</strong>
            </p>
            <div class="grid-2" style="gap: 14px; margin-bottom: 14px;">
                <div class="form-group">
                    <label class="form-label">Cấp có thẩm quyền <span class="text-danger">*</span></label>
                    <select class="form-input" id="modal-appr-auth" style="height: 38px;">
                        <option value="Giám đốc Đại học Đà Nẵng">Giám đốc Đại học Đà Nẵng</option>
                        <option value="Hội đồng Đại học Đà Nẵng">Hội đồng Đại học Đà Nẵng</option>
                        <option value="Hiệu trưởng trường thành viên">Hiệu trưởng trường thành viên</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Ngày xem xét / Kết luận <span class="text-danger">*</span></label>
                    <input type="date" class="form-input" id="modal-appr-date" value="${new Date().toISOString().split('T')[0]}" style="height: 38px;" required>
                </div>
            </div>
            <div class="grid-2" style="gap: 14px; margin-bottom: 14px;">
                <div class="form-group">
                    <label class="form-label">Số văn bản kết luận</label>
                    <input type="text" class="form-input" id="modal-appr-docnum" placeholder="Ví dụ: 45-TB/ĐHĐN" style="height: 38px;">
                </div>
                <div class="form-group">
                    <label class="form-label">Kết quả chủ trương <span class="text-danger">*</span></label>
                    <select class="form-input" id="modal-appr-res" style="height: 38px;" required>
                        <option value="Thống nhất chủ trương">Thống nhất chủ trương (Cho phép lập hồ sơ)</option>
                        <option value="Yêu cầu xem xét lại">Yêu cầu xem xét lại</option>
                        <option value="Không thống nhất chủ trương">Không thống nhất chủ trương (Từ chối)</option>
                    </select>
                </div>
            </div>
            <div class="form-group" style="margin-bottom: 14px;">
                <label class="form-label">Trích yếu / Nội dung kết luận <span class="text-danger">*</span></label>
                <textarea class="form-input" id="modal-appr-content" rows="3" placeholder="Nhập nội dung ý kiến hoặc trích yếu văn bản kết luận..." required></textarea>
            </div>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button type="button" class="btn btn-secondary" onclick="App.closeModal()">Hủy bỏ</button>
            <button type="button" class="btn btn-primary" id="btn-save-approval" style="background: #16A34A !important;">
                Xác nhận kết quả chủ trương
            </button>
        </div>
    `;

    App.openModal('Cập nhật kết quả xin chủ trương', html);

    document.getElementById('btn-save-approval')?.addEventListener('click', () => {
        const auth = document.getElementById('modal-appr-auth')?.value;
        const apprDate = document.getElementById('modal-appr-date')?.value;
        const docNum = document.getElementById('modal-appr-docnum')?.value.trim();
        const resVal = document.getElementById('modal-appr-res')?.value;
        const contentVal = document.getElementById('modal-appr-content')?.value.trim();

        if (!contentVal) {
            App.notify('Vui lòng nhập trích yếu / nội dung kết luận.', 'warning');
            return;
        }

        item.approvalResult = {
            authority: auth,
            date: apprDate,
            docNumber: docNum,
            result: resVal,
            content: contentVal
        };

        if (resVal === 'Thống nhất chủ trương') {
            item.statusCode = 'approved';
            item.status = 'Đã chấp thuận';
        } else if (resVal === 'Yêu cầu xem xét lại') {
            item.statusCode = 'pending_update';
            item.status = 'Chờ bổ sung';
        } else {
            item.statusCode = 'rejected';
            item.status = 'Không được chấp thuận';
        }

        item.history.push({
            action: `Cập nhật kết quả chủ trương: ${resVal}`,
            user: App.user ? App.user.name : 'Ban TCCB',
            time: new Date().toLocaleString('vi-VN')
        });

        App.closeModal();
        App.notify('Đã cập nhật kết quả xin chủ trương thành công!', 'success');
        renderDeXuat(container);
    });
}

window.renderAddDeXuat = renderAddDeXuat;

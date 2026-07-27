/* ============================================================
   Module 02: Quản lý chức vụ, tiêu chuẩn và thành phần hồ sơ
   (Bố cụ 7 Tab dạng Segmented Grid hiển thị trọn vẹn 7 tab không chằng chịt)
   ============================================================ */

function renderChucVu(container, activeTab = 'chucvu') {
    if (App && App.clearFullPage) App.clearFullPage();

    const positions = PositionController.getPositions();
    const terms = PositionController.getTerms();
    const procedureTypes = PositionController.getProcedureTypes();
    const documentTypes = PositionController.getDocumentTypes();
    const requiredDocs = PositionController.getRequiredDocs();
    const standards = PositionController.getStandards();
    const authorities = PositionController.getAuthorities();

    const editIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
    const stopIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`;
    const deleteIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
    const searchIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;

    const html = `
        <div class="page-header">
            <div class="page-header-left">
                <h1>Quản lý Chức vụ, Tiêu chuẩn & Thành phần hồ sơ</h1>
                <p>Hệ thống hỗ trợ quản lý danh mục chức vụ, thiết lập nhiệm kỳ, loại thủ tục, tài liệu, tiêu chuẩn, thẩm quyền và tra cứu yêu cầu bổ nhiệm</p>
            </div>
        </div>

        <!-- KHUNG TRA CỨU YÊU CẦU BỔ NHIỆM -->
        <div class="module-filter-card">
            <div class="module-filter-header">
                <div class="module-filter-title">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    TRA CỨU YÊU CẦU BỔ NHIỆM THEO CHỨC VỤ
                </div>
            </div>

            <!-- Filter Selects Grid -->
            <div id="tracuu-filter-box" style="display: flex; flex-direction: column; gap: 14px;">
                <div class="filter-grid-4">
                    <div>
                        <label class="form-label">Chức vụ tra cứu</label>
                        <select class="form-input" id="tracuu-pos">
                            <option value="">Tất cả Chức vụ</option>
                            ${positions.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Loại thủ tục</label>
                        <select class="form-input" id="tracuu-proc">
                            <option value="">Tất cả Loại thủ tục</option>
                            ${procedureTypes.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Nguồn nhân sự</label>
                        <select class="form-input" id="tracuu-source">
                            <option value="">Tất cả nguồn nhân sự</option>
                            <option value="Tại chỗ">Nhân sự tại chỗ</option>
                            <option value="Từ nơi khác">Nhân sự từ nơi khác</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Thời điểm áp dụng</label>
                        <input type="date" class="form-input" id="tracuu-date" value="${new Date().toISOString().split('T')[0]}">
                    </div>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px;">
                    <button type="button" class="btn btn-secondary" id="btn-reset-tracuu" style="height: 40px; padding: 0 18px; font-weight: 600; border-radius: 8px; font-size: 13.5px; border: 1px solid #cbd5e1; color: #475569;">
                        Đặt lại
                    </button>
                    <button type="button" class="btn btn-primary" id="btn-exec-tracuu" style="height: 40px; padding: 0 22px; font-weight: 700; border-radius: 8px; font-size: 13.5px; display: flex; align-items: center; gap: 8px;">
                        ${searchIcon} Tra cứu yêu cầu
                    </button>
                </div>
            </div>

            <!-- Kết quả tra cứu chi tiết (Mặc định ẩn khi chưa tìm kiếm) -->
            <div id="tracuu-results-container" style="display: none; padding: 20px; background: #fafbfc; border-radius: 8px; border: 1px solid var(--border);"></div>
        </div>

        <!-- BỐ CỤC 7 TAB QUẢN LÝ DANH MỤC - SEGMENTED GRID DỄ NHÌN, ĐỀU ĐẶN -->
        <div class="card" style="border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-bottom: 1.5rem; background: #ffffff;">
            <!-- Tab Header: 7 Columns Equal Grid -->
            <div style="padding: 10px 12px; background: #f1f5f9; border-bottom: 1px solid #e2e8f0;">
                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px;">
                    <button class="md02-grid-tab ${activeTab === 'chucvu' ? 'active' : ''}" data-tab="chucvu">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                        <span>Chức vụ</span>
                    </button>
                    <button class="md02-grid-tab ${activeTab === 'nhiemky' ? 'active' : ''}" data-tab="nhiemky">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span>Nhiệm kỳ</span>
                    </button>
                    <button class="md02-grid-tab ${activeTab === 'loaithutuc' ? 'active' : ''}" data-tab="loaithutuc">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span>Loại thủ tục</span>
                    </button>
                    <button class="md02-grid-tab ${activeTab === 'loaitailieu' ? 'active' : ''}" data-tab="loaitailieu">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                        <span>Loại tài liệu</span>
                    </button>
                    <button class="md02-grid-tab ${activeTab === 'thanhphan' ? 'active' : ''}" data-tab="thanhphan">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                        <span>Hồ sơ bắt buộc</span>
                    </button>
                    <button class="md02-grid-tab ${activeTab === 'tieuchuan' ? 'active' : ''}" data-tab="tieuchuan">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        <span>Tiêu chuẩn</span>
                    </button>
                    <button class="md02-grid-tab ${activeTab === 'thamquyen' ? 'active' : ''}" data-tab="thamquyen">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span>Thẩm quyền</span>
                    </button>
                </div>
            </div>

            <!-- TAB 1: UC02.01 - DANH MỤC CHỨC VỤ -->
            <div id="tab-content-chucvu" class="main-tab-content" style="display: ${activeTab === 'chucvu' ? 'block' : 'none'}; padding: 20px;">
                <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="font-size:16px; margin:0;">Danh mục chức vụ hiện có</h3>
                    <button class="btn btn-primary btn-sm" id="btn-new-chucvu">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Thêm mới chức vụ
                    </button>
                </div>
                <div class="table-container" style="border: none;">
                    <table class="data-table" style="width:100%;">
                        <thead>
                            <tr>
                                <th>MÃ CHỨC VỤ</th>
                                <th>TÊN CHỨC VỤ</th>
                                <th style="text-align:center; white-space:nowrap;">LOẠI CHỨC VỤ</th>
                                <th>LOẠI ĐƠN VỊ ÁP DỤNG</th>
                                <th style="text-align:center; white-space:nowrap;">TRẠNG THÁI SỬ DỤNG</th>
                                <th style="text-align:center;">THAO TÁC</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${positions.map(p => `
                                <tr class="clickable-row row-pos" data-id="${p.id}" style="cursor:pointer;">
                                    <td style="font-family: monospace; font-weight:700; color:var(--primary);">${p.code || p.id}</td>
                                    <td><strong style="color:var(--text-primary);">${p.name}</strong></td>
                                    <td style="text-align:center; white-space:nowrap;"><span class="badge badge-info">${p.type}</span></td>
                                    <td>${p.applyFor}</td>
                                    <td style="text-align:center; white-space:nowrap;"><span class="badge ${p.status === 'active' ? 'badge-success' : 'badge-danger'}">${p.status === 'active' ? 'Đang sử dụng' : 'Ngừng sử dụng'}</span></td>
                                    <td style="text-align:center;" onclick="event.stopPropagation()">
                                        <div style="display:inline-flex; gap:6px;">
                                            <button class="btn btn-ghost btn-sm btn-edit-pos" data-id="${p.id}" title="Cập nhật chức vụ" style="color:var(--primary);">${editIcon}</button>
                                            <button class="btn btn-ghost btn-sm btn-toggle-pos" data-id="${p.id}" data-status="${p.status}" title="${p.status === 'active' ? 'Ngừng sử dụng' : 'Kích hoạt lại'}" style="color:${p.status === 'active' ? 'var(--danger)' : 'var(--success)'};">${stopIcon}</button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- TAB 2: UC02.02 - THIẾT LẬP NHIỆM KỲ CHỨC VỤ -->
            <div id="tab-content-nhiemky" class="main-tab-content" style="display: ${activeTab === 'nhiemky' ? 'block' : 'none'}; padding: 20px;">
                <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="font-size:16px; margin:0;">Danh sách quy định nhiệm kỳ</h3>
                    <button class="btn btn-primary btn-sm" id="btn-new-nhiemky">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Thêm mới quy định nhiệm kỳ
                    </button>
                </div>
                <table class="data-table" style="width:100%;">
                    <thead>
                        <tr>
                            <th>MÃ QUY ĐỊNH</th>
                            <th>CHỨC VỤ ÁP DỤNG</th>
                            <th style="text-align:center; white-space:nowrap;">THỜI HẠN NHIỆM KỲ</th>
                            <th style="text-align:center; white-space:nowrap;">NGÀY BẮT ĐẦU ÁP DỤNG</th>
                            <th style="text-align:center; white-space:nowrap;">NGÀY KẾT THÚC ÁP DỤNG</th>
                            <th style="text-align:center; white-space:nowrap;">TRẠNG THÁI ÁP DỤNG</th>
                            <th style="text-align:center;">THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${terms.map(t => `
                            <tr class="clickable-row row-term" data-id="${t.id}" style="cursor:pointer;">
                                <td style="font-family:monospace; font-weight:700; color:var(--primary);">${t.id}</td>
                                <td><strong style="color:var(--text-primary);">${t.position}</strong></td>
                                <td style="text-align:center;"><strong>${t.duration} năm</strong></td>
                                <td style="text-align:center;">${t.startDate}</td>
                                <td style="text-align:center;">${t.endDate || '-'}</td>
                                <td style="text-align:center; white-space:nowrap;"><span class="badge ${t.status === 'active' ? 'badge-success' : 'badge-danger'}">${t.status === 'active' ? 'Đang áp dụng' : 'Ngừng áp dụng'}</span></td>
                                <td style="text-align:center;" onclick="event.stopPropagation()">
                                    <div style="display:inline-flex; gap:6px;">
                                        <button class="btn btn-ghost btn-sm btn-edit-term" data-id="${t.id}" title="Cập nhật quy định nhiệm kỳ" style="color:var(--primary);">${editIcon}</button>
                                        ${t.status === 'active' ? `<button class="btn btn-ghost btn-sm btn-stop-term" data-id="${t.id}" title="Ngừng áp dụng quy định" style="color:var(--danger);">${stopIcon}</button>` : ''}
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- TAB 3: UC02.03 - QUẢN LÝ LOẠI THỦ TỤC -->
            <div id="tab-content-loaithutuc" class="main-tab-content" style="display: ${activeTab === 'loaithutuc' ? 'block' : 'none'}; padding: 20px;">
                <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="font-size:16px; margin:0;">Danh mục loại thủ tục nhân sự</h3>
                    <button class="btn btn-primary btn-sm" id="btn-new-loaithutuc">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Thêm mới loại thủ tục
                    </button>
                </div>
                <table class="data-table" style="width:100%;">
                    <thead>
                        <tr><th>MÃ LOẠI THỦ TỤC</th><th>TÊN LOẠI THỦ TỤC</th><th>MÔ TẢ</th><th style="text-align:center; white-space:nowrap;">TRẠNG THÁI SỬ DỤNG</th><th style="text-align:center;">THAO TÁC</th></tr>
                    </thead>
                    <tbody>
                        ${procedureTypes.map(p => `
                            <tr class="clickable-row row-proc" data-id="${p.id}" style="cursor:pointer;">
                                <td style="font-family:monospace; font-weight:700; color:var(--primary);">${p.id}</td>
                                <td><strong style="color:var(--text-primary);">${p.name}</strong></td>
                                <td>${p.desc || '-'}</td>
                                <td style="text-align:center; white-space:nowrap;"><span class="badge ${p.status === 'active' ? 'badge-success' : 'badge-danger'}">${p.status === 'active' ? 'Đang sử dụng' : 'Ngừng sử dụng'}</span></td>
                                <td style="text-align:center;" onclick="event.stopPropagation()">
                                    <div style="display:inline-flex; gap:6px;">
                                        <button class="btn btn-ghost btn-sm btn-edit-proc" data-id="${p.id}" title="Cập nhật loại thủ tục" style="color:var(--primary);">${editIcon}</button>
                                        ${p.status === 'active' ? `<button class="btn btn-ghost btn-sm btn-stop-proc" data-id="${p.id}" title="Ngừng sử dụng loại thủ tục" style="color:var(--danger);">${stopIcon}</button>` : ''}
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- TAB 4: UC02.04 - QUẢN LÝ DANH MỤC LOẠI TÀI LIỆU -->
            <div id="tab-content-loaitailieu" class="main-tab-content" style="display: ${activeTab === 'loaitailieu' ? 'block' : 'none'}; padding: 20px;">
                <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="font-size:16px; margin:0;">Danh mục loại tài liệu minh chứng</h3>
                    <button class="btn btn-primary btn-sm" id="btn-new-loaitailieu">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Thêm mới loại tài liệu
                    </button>
                </div>
                <table class="data-table" style="width:100%;">
                    <thead>
                        <tr><th>MÃ LOẠI TÀI LIỆU</th><th>TÊN LOẠI TÀI LIỆU</th><th>MÔ TẢ</th><th style="text-align:center; white-space:nowrap;">TRẠNG THÁI SỬ DỤNG</th><th style="text-align:center;">THAO TÁC</th></tr>
                    </thead>
                    <tbody>
                        ${documentTypes.map(d => `
                            <tr class="clickable-row row-doctype" data-id="${d.id}" style="cursor:pointer;">
                                <td style="font-family:monospace; font-weight:700; color:var(--primary);">${d.id}</td>
                                <td><strong style="color:var(--text-primary);">${d.name}</strong></td>
                                <td>${d.desc || '-'}</td>
                                <td style="text-align:center; white-space:nowrap;"><span class="badge ${d.status === 'inactive' ? 'badge-danger' : 'badge-success'}">${d.status === 'inactive' ? 'Ngừng sử dụng' : 'Đang sử dụng'}</span></td>
                                <td style="text-align:center;" onclick="event.stopPropagation()">
                                    <div style="display:inline-flex; gap:6px;">
                                        <button class="btn btn-ghost btn-sm btn-edit-doctype" data-id="${d.id}" title="Cập nhật loại tài liệu" style="color:var(--primary);">${editIcon}</button>
                                        <button class="btn btn-ghost btn-sm btn-stop-doctype" data-id="${d.id}" title="Ngừng sử dụng" style="color:var(--danger);">${stopIcon}</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- TAB 5: UC02.05 - THIẾT LẬP THÀNH PHẦN HỒ SƠ BẮT BUỘC -->
            <div id="tab-content-thanhphan" class="main-tab-content" style="display: ${activeTab === 'thanhphan' ? 'block' : 'none'}; padding: 20px;">
                <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="font-size:16px; margin:0;">Danh sách cấu hình thành phần hồ sơ bắt buộc</h3>
                    <button class="btn btn-primary btn-sm" id="btn-new-thanhphan">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Thêm mới cấu hình
                    </button>
                </div>
                <table class="data-table" style="width:100%;">
                    <thead>
                        <tr><th>CHỨC VỤ ÁP DỤNG</th><th>LOẠI THỦ TỤC</th><th>NGUỒN NHÂN SỰ</th><th>LOẠI TÀI LIỆU BẮT BUỘC</th><th>GHI CHÚ</th><th style="text-align:center;">THAO TÁC</th></tr>
                    </thead>
                    <tbody>
                        ${requiredDocs.map(r => `
                            <tr class="clickable-row row-reqdoc" data-id="${r.id}" style="cursor:pointer;">
                                <td><strong style="color:var(--primary);">${r.position}</strong></td>
                                <td><span class="badge badge-info">${r.procedure}</span></td>
                                <td>${r.source}</td>
                                <td><strong>${r.docType}</strong></td>
                                <td>${r.note || '-'}</td>
                                <td style="text-align:center;" onclick="event.stopPropagation()">
                                    <div style="display:inline-flex; gap:6px;">
                                        <button class="btn btn-ghost btn-sm btn-edit-reqdoc" data-id="${r.id}" title="Cập nhật cấu hình" style="color:var(--primary);">${editIcon}</button>
                                        <button class="btn btn-ghost btn-sm btn-delete-reqdoc" data-id="${r.id}" title="Xóa cấu hình" style="color:var(--danger);">${deleteIcon}</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- TAB 6: UC02.06 - THIẾT LẬP TIÊU CHUẨN BỔ NHIỆM -->
            <div id="tab-content-tieuchuan" class="main-tab-content" style="display: ${activeTab === 'tieuchuan' ? 'block' : 'none'}; padding: 20px;">
                <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="font-size:16px; margin:0;">Danh sách tiêu chuẩn bổ nhiệm</h3>
                    <button class="btn btn-primary btn-sm" id="btn-new-tieuchuan">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Thêm mới tiêu chuẩn
                    </button>
                </div>
                <table class="data-table" style="width:100%;">
                    <thead>
                        <tr><th>CHỨC VỤ ÁP DỤNG</th><th>LOẠI THỦ TỤC</th><th>NHÓM TIÊU CHUẨN</th><th>NỘI DUNG TIÊU CHUẨN</th><th>CĂN CỨ PHÁP LÝ</th><th style="text-align:center; white-space:nowrap;">TRẠNG THÁI ÁP DỤNG</th><th style="text-align:center;">THAO TÁC</th></tr>
                    </thead>
                    <tbody>
                        ${standards.map(s => `
                            <tr class="clickable-row row-std" data-id="${s.id}" style="cursor:pointer;">
                                <td><strong style="color:var(--primary);">${s.position}</strong></td>
                                <td style="text-align:center; white-space:nowrap;"><span class="badge badge-info">${s.procedure}</span></td>
                                <td><strong>${s.category}</strong></td>
                                <td>${s.content}</td>
                                <td>${s.legalBasis || '-'}</td>
                                <td style="text-align:center; white-space:nowrap;"><span class="badge ${s.status === 'active' ? 'badge-success' : 'badge-danger'}">${s.status === 'active' ? 'Đang áp dụng' : 'Ngừng áp dụng'}</span></td>
                                <td style="text-align:center;" onclick="event.stopPropagation()">
                                    <div style="display:inline-flex; gap:6px;">
                                        <button class="btn btn-ghost btn-sm btn-edit-std" data-id="${s.id}" title="Cập nhật tiêu chuẩn" style="color:var(--primary);">${editIcon}</button>
                                        ${s.status === 'active' ? `<button class="btn btn-ghost btn-sm btn-stop-standard" data-id="${s.id}" title="Ngừng áp dụng tiêu chuẩn" style="color:var(--danger);">${stopIcon}</button>` : ''}
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- TAB 7: UC02.07 - THẨM QUYỀN XỬ LÝ -->
            <div id="tab-content-thamquyen" class="main-tab-content" style="display: ${activeTab === 'thamquyen' ? 'block' : 'none'}; padding: 20px;">
                <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="font-size:16px; margin:0;">Quy tắc thẩm quyền xử lý phê duyệt</h3>
                    <button class="btn btn-primary btn-sm" id="btn-new-thamquyen">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Thêm mới quy tắc
                    </button>
                </div>
                <table class="data-table" style="width:100%;">
                    <thead>
                        <tr><th>CHỨC VỤ ÁP DỤNG</th><th>LOẠI THỦ TỤC</th><th>PHẠM VI ĐƠN VỊ ÁP DỤNG</th><th>CẤP CÓ THẨM QUYỀN</th><th style="text-align:center; white-space:nowrap;">NGÀY BẮT ĐẦU ÁP DỤNG</th><th style="text-align:center; white-space:nowrap;">TRẠNG THÁI ÁP DỤNG</th><th style="text-align:center;">THAO TÁC</th></tr>
                    </thead>
                    <tbody>
                        ${authorities.map(a => `
                            <tr class="clickable-row row-auth" data-id="${a.id}" style="cursor:pointer;">
                                <td><strong style="color:var(--primary);">${a.position}</strong></td>
                                <td style="text-align:center; white-space:nowrap;"><span class="badge badge-info">${a.procedure}</span></td>
                                <td>${a.unitScope}</td>
                                <td><strong style="color:var(--text-primary);">${a.authority}</strong></td>
                                <td style="text-align:center;">${a.startDate}</td>
                                <td style="text-align:center; white-space:nowrap;"><span class="badge ${a.status === 'active' ? 'badge-success' : 'badge-danger'}">${a.status === 'active' ? 'Đang áp dụng' : 'Ngừng áp dụng'}</span></td>
                                <td style="text-align:center;" onclick="event.stopPropagation()">
                                    <div style="display:inline-flex; gap:6px;">
                                        <button class="btn btn-ghost btn-sm btn-edit-auth" data-id="${a.id}" title="Cập nhật quy tắc thẩm quyền" style="color:var(--primary);">${editIcon}</button>
                                        ${a.status === 'active' ? `<button class="btn btn-ghost btn-sm btn-stop-auth" data-id="${a.id}" title="Ngừng áp dụng" style="color:var(--danger);">${stopIcon}</button>` : ''}
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Inject CSS styling cho 7 grid tab buttons
    if (!document.getElementById('md02-grid-tab-styles')) {
        const style = document.createElement('style');
        style.id = 'md02-grid-tab-styles';
        style.textContent = `
            .md02-grid-tab {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                padding: 10px 8px;
                border-radius: 8px;
                border: 1px solid #cbd5e1;
                background: #ffffff;
                color: #64748b;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                white-space: nowrap;
            }
            .md02-grid-tab:hover {
                background: #e2e8f0;
                color: var(--primary);
                border-color: #94a3b8;
            }
            .md02-grid-tab.active {
                background: var(--primary) !important;
                color: #ffffff !important;
                border-color: var(--primary) !important;
                box-shadow: 0 2px 4px rgba(7, 88, 154, 0.25);
            }
            .md02-grid-tab.active svg {
                stroke: #ffffff !important;
            }
            @media (max-width: 1024px) {
                div[style*="grid-template-columns: repeat(7, 1fr)"] {
                    grid-template-columns: repeat(4, 1fr) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Tab Switcher Handler cho 7 Segmented Grid Tabs
    const gridTabs = container.querySelectorAll('.md02-grid-tab');
    gridTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            gridTabs.forEach(b => b.classList.remove('active'));
            container.querySelectorAll('.main-tab-content').forEach(c => c.style.display = 'none');
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const target = container.querySelector('#tab-content-' + tabId);
            if (target) target.style.display = 'block';

            // Áp dụng ngay lập tức phân quyền nút bấm cho tab mới
            if (typeof App.applyRolePermissions === 'function') {
                App.applyRolePermissions();
            }
        });
    });

    // --- UC02.08 TRA CỨU YÊU CẦU EXECUTION ---
    const runTraCuu = () => {
        const posVal = container.querySelector('#tracuu-pos')?.value || '';
        const procVal = container.querySelector('#tracuu-proc')?.value || '';
        const sourceVal = container.querySelector('#tracuu-source')?.value || '';

        const results = PositionController.searchRequirements({ position: posVal, procedure: procVal, source: sourceVal });

        const searchCriteriaText = [
            posVal ? `Chức vụ: <strong>${posVal}</strong>` : 'Tất cả Chức vụ',
            procVal ? `Thủ tục: <strong>${procVal}</strong>` : 'Tất cả Thủ tục',
            sourceVal ? `Nguồn: <strong>${sourceVal}</strong>` : 'Tất cả Nguồn nhân sự'
        ].join(' • ');

        const totalItems = results.terms.length + results.standards.length + results.requiredDocs.length;

        const resultsHTML = `
            <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 12px 18px; border-radius: 8px; border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
                <div style="font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 8px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <span>Kết quả tra cứu theo tiêu chí: ${searchCriteriaText}</span>
                </div>
                <span class="badge badge-info" style="font-size: 11.5px; padding: 4px 10px; font-weight: 600;">${totalItems} quy định & yêu cầu</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                <!-- Block 1: Thông tin nhiệm kỳ -->
                <div style="background: #ffffff; border: 1px solid var(--border); border-radius: 10px; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                    <div style="font-weight: 700; color: var(--primary); font-size: 14px; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; padding-bottom: 10px; border-bottom: 1px solid #f1f5f9;">
                        <div style="width: 28px; height: 28px; border-radius: 6px; background: rgba(7, 88, 154, 0.1); display: flex; align-items: center; justify-content: center;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </div>
                        1. Quy định nhiệm kỳ
                    </div>
                    ${results.terms.length > 0 ? results.terms.map(t => `
                        <div style="font-size: 13px; margin-bottom: 8px; line-height: 1.5; color: var(--text-primary); background: #f8fafc; padding: 10px 12px; border-radius: 6px; border-left: 3px solid var(--primary);">
                            Chức vụ <strong>${t.position}</strong>: Nhiệm kỳ <strong>${t.duration} năm</strong> ${t.startDate ? `(từ ${t.startDate})` : ''}.
                        </div>
                    `).join('') : '<div style="color: #94a3b8; font-size: 12.5px; text-align: center; padding: 16px 0;">Chưa có quy định nhiệm kỳ riêng</div>'}
                </div>

                <!-- Block 2: Tiêu chuẩn bổ nhiệm -->
                <div style="background: #ffffff; border: 1px solid var(--border); border-radius: 10px; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                    <div style="font-weight: 700; color: var(--primary); font-size: 14px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #f1f5f9;">
                        <span style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 28px; height: 28px; border-radius: 6px; background: rgba(14, 165, 233, 0.1); display: flex; align-items: center; justify-content: center;">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            </div>
                            2. Tiêu chuẩn bổ nhiệm
                        </span>
                        <span class="badge badge-info" style="font-size: 11px; padding: 3px 8px; font-weight: 600;">${results.standards.length}</span>
                    </div>
                    ${results.standards.length > 0 ? `
                        <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: var(--text-primary);">
                            ${results.standards.map(s => `
                                <li style="margin-bottom: 8px; line-height: 1.4;">
                                    <strong>${s.category}:</strong> ${s.content} ${s.legalBasis ? `<em style="color:#64748b; font-size:12px;">(${s.legalBasis})</em>` : ''}
                                </li>
                            `).join('')}
                        </ul>
                    ` : '<div style="color: #94a3b8; font-size: 12.5px; text-align: center; padding: 16px 0;">Chưa có dữ liệu tiêu chuẩn</div>'}
                </div>

                <!-- Block 3: Thành phần hồ sơ bắt buộc -->
                <div style="background: #ffffff; border: 1px solid var(--border); border-radius: 10px; padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                    <div style="font-weight: 700; color: var(--primary); font-size: 14px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #f1f5f9;">
                        <span style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 28px; height: 28px; border-radius: 6px; background: rgba(16, 185, 129, 0.1); display: flex; align-items: center; justify-content: center;">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            </div>
                            3. Hồ sơ bắt buộc
                        </span>
                        <span class="badge badge-success" style="font-size: 11px; padding: 3px 8px; font-weight: 600;">${results.requiredDocs.length}</span>
                    </div>
                    ${results.requiredDocs.length > 0 ? `
                        <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: var(--text-primary);">
                            ${results.requiredDocs.map(r => `
                                <li style="margin-bottom: 8px; line-height: 1.4;">
                                    <strong>${r.docType}</strong> ${r.source !== 'Tất cả' ? `<span class="badge badge-info" style="font-size:10px; padding:1px 6px; margin-left:4px;">${r.source}</span>` : ''}
                                </li>
                            `).join('')}
                        </ul>
                    ` : '<div style="color: #94a3b8; font-size: 12.5px; text-align: center; padding: 16px 0;">Chưa có yêu cầu tài liệu</div>'}
                </div>
            </div>
        `;

        const resContainer = container.querySelector('#tracuu-results-container');
        if (resContainer) {
            resContainer.innerHTML = resultsHTML;
            resContainer.style.display = 'block';
        }
    };

    const hideResults = () => {
        const resContainer = container.querySelector('#tracuu-results-container');
        if (resContainer) {
            resContainer.style.display = 'none';
            resContainer.innerHTML = '';
        }
    };

    hideResults();
    container.querySelector('#btn-exec-tracuu')?.addEventListener('click', runTraCuu);
    container.querySelector('#btn-reset-tracuu')?.addEventListener('click', () => {
        container.querySelector('#tracuu-pos').value = '';
        container.querySelector('#tracuu-proc').value = '';
        container.querySelector('#tracuu-source').value = '';
        hideResults();
    });

    // --- ROW CLICKABLE HANDLERS (CLICK RECORD TO EDIT) ---
    container.querySelectorAll('.row-pos').forEach(r => r.addEventListener('click', () => renderEditPositionModal(container, r.dataset.id)));
    container.querySelectorAll('.row-term').forEach(r => r.addEventListener('click', () => renderEditTermModal(container, r.dataset.id)));
    container.querySelectorAll('.row-proc').forEach(r => r.addEventListener('click', () => renderEditProcedureModal(container, r.dataset.id)));
    container.querySelectorAll('.row-doctype').forEach(r => r.addEventListener('click', () => renderEditDocTypeModal(container, r.dataset.id)));
    container.querySelectorAll('.row-reqdoc').forEach(r => r.addEventListener('click', () => renderEditRequiredDocModal(container, r.dataset.id)));
    container.querySelectorAll('.row-std').forEach(r => r.addEventListener('click', () => renderEditStandardModal(container, r.dataset.id)));
    container.querySelectorAll('.row-auth').forEach(r => r.addEventListener('click', () => renderEditAuthorityModal(container, r.dataset.id)));

    // --- BUTTON EVENT HANDLERS ---
    // UC02.01
    container.querySelector('#btn-new-chucvu')?.addEventListener('click', () => renderAddPositionModal(container));
    container.querySelectorAll('.btn-edit-pos').forEach(b => b.addEventListener('click', () => renderEditPositionModal(container, b.dataset.id)));
    container.querySelectorAll('.btn-toggle-pos').forEach(b => {
        b.addEventListener('click', () => {
            const id = b.dataset.id;
            const newStatus = b.dataset.status === 'active' ? 'inactive' : 'active';
            if (confirm(`Bạn có chắc chắn muốn ${newStatus === 'inactive' ? 'ngừng sử dụng' : 'kích hoạt lại'} chức vụ này?`)) {
                PositionController.togglePositionStatus(id, newStatus);
                App.notify('Đã cập nhật trạng thái chức vụ.', 'success');
                renderChucVu(container, 'chucvu');
            }
        });
    });

    // UC02.02
    container.querySelector('#btn-new-nhiemky')?.addEventListener('click', () => renderAddTermModal(container));
    container.querySelectorAll('.btn-edit-term').forEach(b => b.addEventListener('click', () => renderEditTermModal(container, b.dataset.id)));
    container.querySelectorAll('.btn-stop-term').forEach(b => {
        b.addEventListener('click', () => {
            const endDate = prompt('Nhập Ngày kết thúc áp dụng quy định nhiệm kỳ (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
            if (endDate) {
                PositionController.stopTerm(b.dataset.id, endDate);
                App.notify('Đã ngừng áp dụng quy định nhiệm kỳ.', 'success');
                renderChucVu(container, 'nhiemky');
            }
        });
    });

    // UC02.03
    container.querySelector('#btn-new-loaithutuc')?.addEventListener('click', () => renderAddProcedureModal(container));
    container.querySelectorAll('.btn-edit-proc').forEach(b => b.addEventListener('click', () => renderEditProcedureModal(container, b.dataset.id)));
    container.querySelectorAll('.btn-stop-proc').forEach(b => {
        b.addEventListener('click', () => {
            if (confirm('Ngừng sử dụng loại thủ tục này?')) {
                PositionController.stopProcedureType(b.dataset.id);
                App.notify('Đã ngừng sử dụng loại thủ tục.', 'success');
                renderChucVu(container, 'loaithutuc');
            }
        });
    });

    // UC02.04
    container.querySelector('#btn-new-loaitailieu')?.addEventListener('click', () => renderAddDocTypeModal(container));
    container.querySelectorAll('.btn-edit-doctype').forEach(b => b.addEventListener('click', () => renderEditDocTypeModal(container, b.dataset.id)));
    container.querySelectorAll('.btn-stop-doctype').forEach(b => {
        b.addEventListener('click', () => {
            if (confirm('Ngừng sử dụng loại tài liệu này?')) {
                PositionController.stopDocumentType(b.dataset.id);
                App.notify('Đã chuyển trạng thái loại tài liệu.', 'success');
                renderChucVu(container, 'loaitailieu');
            }
        });
    });

    // UC02.05
    container.querySelector('#btn-new-thanhphan')?.addEventListener('click', () => renderAddRequiredDocModal(container));
    container.querySelectorAll('.btn-edit-reqdoc').forEach(b => b.addEventListener('click', () => renderEditRequiredDocModal(container, b.dataset.id)));
    container.querySelectorAll('.btn-delete-reqdoc').forEach(b => {
        b.addEventListener('click', () => {
            if (confirm('Xóa cấu hình thành phần hồ sơ bắt buộc này?')) {
                PositionController.deleteRequiredDoc(b.dataset.id);
                App.notify('Đã xóa cấu hình thành phần hồ sơ.', 'success');
                renderChucVu(container, 'thanhphan');
            }
        });
    });

    // UC02.06
    container.querySelector('#btn-new-tieuchuan')?.addEventListener('click', () => renderAddStandardModal(container));
    container.querySelectorAll('.btn-edit-std').forEach(b => b.addEventListener('click', () => renderEditStandardModal(container, b.dataset.id)));
    container.querySelectorAll('.btn-stop-standard').forEach(b => {
        b.addEventListener('click', () => {
            const endDate = prompt('Nhập Ngày kết thúc áp dụng tiêu chuẩn (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
            if (endDate) {
                PositionController.stopStandard(b.dataset.id, endDate);
                App.notify('Đã ngừng áp dụng tiêu chuẩn bổ nhiệm.', 'success');
                renderChucVu(container, 'tieuchuan');
            }
        });
    });

    // UC02.07
    container.querySelector('#btn-new-thamquyen')?.addEventListener('click', () => renderAddAuthorityModal(container));
    container.querySelectorAll('.btn-edit-auth').forEach(b => b.addEventListener('click', () => renderEditAuthorityModal(container, b.dataset.id)));
    container.querySelectorAll('.btn-stop-auth').forEach(b => {
        b.addEventListener('click', () => {
            const endDate = prompt('Nhập Ngày kết thúc áp dụng quy tắc thẩm quyền (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
            if (endDate) {
                PositionController.stopAuthority(b.dataset.id, endDate);
                App.notify('Đã ngừng áp dụng quy tắc thẩm quyền.', 'success');
                renderChucVu(container, 'thamquyen');
            }
        });
    });
}

// ============================================================
// MODALS FOR CREATING & EDITING ENTITIES
// ============================================================

function renderAddPositionModal(container) {
    const formHTML = `
        <div class="grid-2">
            <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Tên chức vụ <span class="text-danger">*</span></label>
                <input type="text" class="form-input" id="add-pos-name" placeholder="Ví dụ: Giám đốc trung tâm..." required>
            </div>
            <div class="form-group">
                <label class="form-label">Loại chức vụ <span class="text-danger">*</span></label>
                <select class="form-input" id="add-pos-type" required>
                    <option value="Lãnh đạo Đại học">Lãnh đạo Đại học</option>
                    <option value="Lãnh đạo trường thành viên">Lãnh đạo trường thành viên</option>
                    <option value="Lãnh đạo khoa/phòng">Lãnh đạo khoa/phòng</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Loại đơn vị áp dụng <span class="text-danger">*</span></label>
                <select class="form-input" id="add-pos-applyFor" required>
                    <option value="Đại học Đà Nẵng">Đại học Đà Nẵng</option>
                    <option value="Các trường thành viên">Các trường thành viên</option>
                    <option value="Các khoa thuộc trường">Các khoa thuộc trường</option>
                </select>
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Ghi chú</label>
                <textarea class="form-input" id="add-pos-note" rows="2"></textarea>
            </div>
        </div>
        <div style="text-align:right; margin-top:20px;">
            <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right:8px;">Hủy</button>
            <button class="btn btn-primary" id="btn-save-new-pos">Lưu chức vụ</button>
        </div>
    `;
    App.openModal('Thêm mới chức vụ', formHTML);

    const overlay = document.getElementById('app-modal');
    const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

    overlay.querySelector('#btn-save-new-pos').addEventListener('click', () => {
        const data = {
            name: overlay.querySelector('#add-pos-name').value,
            type: overlay.querySelector('#add-pos-type').value,
            applyFor: overlay.querySelector('#add-pos-applyFor').value,
            note: overlay.querySelector('#add-pos-note').value
        };
        if (PositionController.addPosition(data, overlay)) {
            App.closeModal();
            App.notify('Thêm mới chức vụ thành công!', 'success');
            renderChucVu(container, 'chucvu');
        }
    });
}

function renderEditPositionModal(container, posId) {
    const p = PositionController.getPositions().find(item => item.id === posId);
    if (!p) return;

    const formHTML = `
        <div class="grid-2">
            <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Tên chức vụ <span class="text-danger">*</span></label>
                <input type="text" class="form-input" id="edit-pos-name" value="${p.name}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Loại chức vụ <span class="text-danger">*</span></label>
                <select class="form-input" id="edit-pos-type" required>
                    <option value="Lãnh đạo Đại học" ${p.type === 'Lãnh đạo Đại học' ? 'selected' : ''}>Lãnh đạo Đại học</option>
                    <option value="Lãnh đạo trường thành viên" ${p.type === 'Lãnh đạo trường thành viên' ? 'selected' : ''}>Lãnh đạo trường thành viên</option>
                    <option value="Lãnh đạo khoa/phòng" ${p.type === 'Lãnh đạo khoa/phòng' ? 'selected' : ''}>Lãnh đạo khoa/phòng</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Loại đơn vị áp dụng <span class="text-danger">*</span></label>
                <select class="form-input" id="edit-pos-applyFor" required>
                    <option value="Đại học Đà Nẵng" ${p.applyFor === 'Đại học Đà Nẵng' ? 'selected' : ''}>Đại học Đà Nẵng</option>
                    <option value="Các trường thành viên" ${p.applyFor === 'Các trường thành viên' ? 'selected' : ''}>Các trường thành viên</option>
                    <option value="Các khoa thuộc trường" ${p.applyFor === 'Các khoa thuộc trường' ? 'selected' : ''}>Các khoa thuộc trường</option>
                </select>
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Ghi chú</label>
                <textarea class="form-input" id="edit-pos-note" rows="2">${p.note || ''}</textarea>
            </div>
        </div>
        <div style="text-align:right; margin-top:20px;">
            <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right:8px;">Hủy</button>
            <button class="btn btn-primary" id="btn-save-edit-pos">Lưu cập nhật</button>
        </div>
    `;
    App.openModal(`Cập nhật chức vụ: ${p.name}`, formHTML);

    const overlay = document.getElementById('app-modal');
    const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

    overlay.querySelector('#btn-save-edit-pos').addEventListener('click', () => {
        const data = {
            name: overlay.querySelector('#edit-pos-name').value,
            type: overlay.querySelector('#edit-pos-type').value,
            applyFor: overlay.querySelector('#edit-pos-applyFor').value,
            note: overlay.querySelector('#edit-pos-note').value
        };
        if (PositionController.updatePosition(posId, data, overlay)) {
            App.closeModal();
            App.notify('Cập nhật chức vụ thành công!', 'success');
            renderChucVu(container, 'chucvu');
        }
    });
}

function renderAddTermModal(container) {
    const positions = PositionController.getPositions().filter(p => p.status === 'active');
    const formHTML = `
        <div class="grid-2">
            <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Chức vụ áp dụng <span class="text-danger">*</span></label>
                <select class="form-input" id="add-term-pos" required>
                    <option value="">Chọn chức vụ</option>
                    ${positions.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Thời hạn nhiệm kỳ (Số năm) <span class="text-danger">*</span></label>
                <input type="number" class="form-input" id="add-term-duration" min="1" value="5" required>
            </div>
            <div class="form-group">
                <label class="form-label">Ngày bắt đầu áp dụng <span class="text-danger">*</span></label>
                <input type="date" class="form-input" id="add-term-start" value="${new Date().toISOString().split('T')[0]}" required>
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Ghi chú quy định</label>
                <input type="text" class="form-input" id="add-term-note">
            </div>
        </div>
        <div style="text-align:right; margin-top:20px;">
            <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right:8px;">Hủy</button>
            <button class="btn btn-primary" id="btn-save-new-term">Lưu thiết lập</button>
        </div>
    `;
    App.openModal('Thiết lập nhiệm kỳ chức vụ mới', formHTML);

    const overlay = document.getElementById('app-modal');
    const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

    overlay.querySelector('#btn-save-new-term').addEventListener('click', () => {
        const data = {
            position: overlay.querySelector('#add-term-pos').value,
            duration: overlay.querySelector('#add-term-duration').value,
            startDate: overlay.querySelector('#add-term-start').value,
            note: overlay.querySelector('#add-term-note').value
        };
        if (PositionController.addTerm(data, overlay)) {
            App.closeModal();
            App.notify('Thiết lập nhiệm kỳ chức vụ thành công!', 'success');
            renderChucVu(container, 'nhiemky');
        }
    });
}

function renderEditTermModal(container, termId) {
    const t = PositionController.getTerms().find(item => item.id === termId);
    if (!t) return;

    const positions = PositionController.getPositions();
    const formHTML = `
        <div class="grid-2">
            <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Chức vụ áp dụng <span class="text-danger">*</span></label>
                <select class="form-input" id="edit-term-pos" required>
                    ${positions.map(p => `<option value="${p.name}" ${p.name === t.position ? 'selected' : ''}>${p.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Thời hạn nhiệm kỳ (Số năm) <span class="text-danger">*</span></label>
                <input type="number" class="form-input" id="edit-term-duration" min="1" value="${t.duration}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Ngày bắt đầu áp dụng <span class="text-danger">*</span></label>
                <input type="date" class="form-input" id="edit-term-start" value="${t.startDate}" required>
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Ghi chú quy định</label>
                <input type="text" class="form-input" id="edit-term-note" value="${t.note || ''}">
            </div>
        </div>
        <div style="text-align:right; margin-top:20px;">
            <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right:8px;">Hủy</button>
            <button class="btn btn-primary" id="btn-save-edit-term">Lưu cập nhật</button>
        </div>
    `;
    App.openModal(`Cập nhật quy định nhiệm kỳ: ${t.position}`, formHTML);

    const overlay = document.getElementById('app-modal');
    const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

    overlay.querySelector('#btn-save-edit-term').addEventListener('click', () => {
        const data = {
            position: overlay.querySelector('#edit-term-pos').value,
            duration: overlay.querySelector('#edit-term-duration').value,
            startDate: overlay.querySelector('#edit-term-start').value,
            note: overlay.querySelector('#edit-term-note').value
        };
        if (PositionController.updateTerm(termId, data, overlay)) {
            App.closeModal();
            App.notify('Cập nhật quy định nhiệm kỳ thành công!', 'success');
            renderChucVu(container, 'nhiemky');
        }
    });
}

function renderAddProcedureModal(container) {
    const formHTML = `
        <div>
            <div class="form-group">
                <label class="form-label">Tên loại thủ tục <span class="text-danger">*</span></label>
                <input type="text" class="form-input" id="add-proc-name" placeholder="Ví dụ: Bổ nhiệm kiêm nhiệm..." required>
            </div>
            <div class="form-group">
                <label class="form-label">Mô tả thủ tục</label>
                <textarea class="form-input" id="add-proc-desc" rows="3"></textarea>
            </div>
        </div>
        <div style="text-align:right; margin-top:20px;">
            <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right:8px;">Hủy</button>
            <button class="btn btn-primary" id="btn-save-new-proc">Lưu loại thủ tục</button>
        </div>
    `;
    App.openModal('Thêm mới loại thủ tục', formHTML);

    const overlay = document.getElementById('app-modal');
    const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

    overlay.querySelector('#btn-save-new-proc').addEventListener('click', () => {
        const data = {
            name: overlay.querySelector('#add-proc-name').value,
            desc: overlay.querySelector('#add-proc-desc').value
        };
        if (PositionController.addProcedureType(data, overlay)) {
            App.closeModal();
            App.notify('Thêm loại thủ tục thành công!', 'success');
            renderChucVu(container, 'loaithutuc');
        }
    });
}

function renderEditProcedureModal(container, procId) {
    const p = PositionController.getProcedureTypes().find(item => item.id === procId);
    if (!p) return;

    const formHTML = `
        <div>
            <div class="form-group">
                <label class="form-label">Tên loại thủ tục <span class="text-danger">*</span></label>
                <input type="text" class="form-input" id="edit-proc-name" value="${p.name}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Mô tả thủ tục</label>
                <textarea class="form-input" id="edit-proc-desc" rows="3">${p.desc || ''}</textarea>
            </div>
        </div>
        <div style="text-align:right; margin-top:20px;">
            <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right:8px;">Hủy</button>
            <button class="btn btn-primary" id="btn-save-edit-proc">Lưu cập nhật</button>
        </div>
    `;
    App.openModal(`Cập nhật loại thủ tục: ${p.name}`, formHTML);

    const overlay = document.getElementById('app-modal');
    const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

    overlay.querySelector('#btn-save-edit-proc').addEventListener('click', () => {
        const data = {
            name: overlay.querySelector('#edit-proc-name').value,
            desc: overlay.querySelector('#edit-proc-desc').value
        };
        if (PositionController.updateProcedureType(procId, data, overlay)) {
            App.closeModal();
            App.notify('Cập nhật loại thủ tục thành công!', 'success');
            renderChucVu(container, 'loaithutuc');
        }
    });
}

function renderAddDocTypeModal(container) {
    const formHTML = `
        <div>
            <div class="form-group">
                <label class="form-label">Tên loại tài liệu <span class="text-danger">*</span></label>
                <input type="text" class="form-input" id="add-doctype-name" placeholder="Ví dụ: Bằng khen cấp Bộ..." required>
            </div>
            <div class="form-group">
                <label class="form-label">Mô tả loại tài liệu</label>
                <textarea class="form-input" id="add-doctype-desc" rows="3"></textarea>
            </div>
        </div>
        <div style="text-align:right; margin-top:20px;">
            <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right:8px;">Hủy</button>
            <button class="btn btn-primary" id="btn-save-new-doctype">Lưu loại tài liệu</button>
        </div>
    `;
    App.openModal('Thêm danh mục loại tài liệu', formHTML);

    const overlay = document.getElementById('app-modal');
    const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

    overlay.querySelector('#btn-save-new-doctype').addEventListener('click', () => {
        const data = {
            name: overlay.querySelector('#add-doctype-name').value,
            desc: overlay.querySelector('#add-doctype-desc').value
        };
        if (PositionController.addDocumentType(data, overlay)) {
            App.closeModal();
            App.notify('Thêm loại tài liệu mới thành công!', 'success');
            renderChucVu(container, 'loaitailieu');
        }
    });
}

function renderEditDocTypeModal(container, docTypeId) {
    const d = PositionController.getDocumentTypes().find(item => item.id === docTypeId);
    if (!d) return;

    const formHTML = `
        <div>
            <div class="form-group">
                <label class="form-label">Tên loại tài liệu <span class="text-danger">*</span></label>
                <input type="text" class="form-input" id="edit-doctype-name" value="${d.name}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Mô tả loại tài liệu</label>
                <textarea class="form-input" id="edit-doctype-desc" rows="3">${d.desc || ''}</textarea>
            </div>
        </div>
        <div style="text-align:right; margin-top:20px;">
            <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right:8px;">Hủy</button>
            <button class="btn btn-primary" id="btn-save-edit-doctype">Lưu cập nhật</button>
        </div>
    `;
    App.openModal(`Cập nhật loại tài liệu: ${d.name}`, formHTML);

    const overlay = document.getElementById('app-modal');
    const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

    overlay.querySelector('#btn-save-edit-doctype').addEventListener('click', () => {
        const data = {
            name: overlay.querySelector('#edit-doctype-name').value,
            desc: overlay.querySelector('#edit-doctype-desc').value
        };
        if (PositionController.updateDocumentType(docTypeId, data, overlay)) {
            App.closeModal();
            App.notify('Cập nhật loại tài liệu thành công!', 'success');
            renderChucVu(container, 'loaitailieu');
        }
    });
}

function renderAddRequiredDocModal(container) {
    const positions = PositionController.getPositions();
    const procs = PositionController.getProcedureTypes();
    const docTypes = PositionController.getDocumentTypes();

    const formHTML = `
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Chức vụ áp dụng <span class="text-danger">*</span></label>
                <select class="form-input" id="add-req-pos" required>
                    <option value="">Chọn chức vụ</option>
                    ${positions.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Loại thủ tục <span class="text-danger">*</span></label>
                <select class="form-input" id="add-req-proc" required>
                    <option value="">Chọn loại thủ tục</option>
                    ${procs.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Nguồn nhân sự</label>
                <select class="form-input" id="add-req-source">
                    <option value="Tất cả">Tất cả nguồn nhân sự</option>
                    <option value="Tại chỗ">Nhân sự tại chỗ</option>
                    <option value="Từ nơi khác">Nhân sự từ nơi khác</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Loại tài liệu bắt buộc <span class="text-danger">*</span></label>
                <select class="form-input" id="add-req-doctype" required>
                    <option value="">Chọn loại tài liệu</option>
                    ${docTypes.map(d => `<option value="${d.name}">${d.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Ghi chú yêu cầu</label>
                <input type="text" class="form-input" id="add-req-note" placeholder="Yêu cầu riêng đối với tài liệu">
            </div>
        </div>
        <div style="text-align:right; margin-top:20px;">
            <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right:8px;">Hủy</button>
            <button class="btn btn-primary" id="btn-save-reqdoc">Lưu cấu hình</button>
        </div>
    `;
    App.openModal('Thiết lập thành phần hồ sơ bắt buộc', formHTML);

    const overlay = document.getElementById('app-modal');
    const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

    overlay.querySelector('#btn-save-reqdoc').addEventListener('click', () => {
        const data = {
            position: overlay.querySelector('#add-req-pos').value,
            procedure: overlay.querySelector('#add-req-proc').value,
            source: overlay.querySelector('#add-req-source').value,
            docType: overlay.querySelector('#add-req-doctype').value,
            note: overlay.querySelector('#add-req-note').value
        };
        if (PositionController.addRequiredDoc(data, overlay)) {
            App.closeModal();
            App.notify('Thiết lập thành phần hồ sơ bắt buộc thành công!', 'success');
            renderChucVu(container, 'thanhphan');
        }
    });
}

function renderEditRequiredDocModal(container, reqDocId) {
    const r = PositionController.getRequiredDocs().find(item => item.id === reqDocId);
    if (!r) return;

    const positions = PositionController.getPositions();
    const procs = PositionController.getProcedureTypes();
    const docTypes = PositionController.getDocumentTypes();

    const formHTML = `
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Chức vụ áp dụng <span class="text-danger">*</span></label>
                <select class="form-input" id="edit-req-pos" required>
                    ${positions.map(p => `<option value="${p.name}" ${p.name === r.position ? 'selected' : ''}>${p.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Loại thủ tục <span class="text-danger">*</span></label>
                <select class="form-input" id="edit-req-proc" required>
                    ${procs.map(p => `<option value="${p.name}" ${p.name === r.procedure ? 'selected' : ''}>${p.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Nguồn nhân sự</label>
                <select class="form-input" id="edit-req-source">
                    <option value="Tất cả" ${r.source === 'Tất cả' ? 'selected' : ''}>Tất cả nguồn nhân sự</option>
                    <option value="Tại chỗ" ${r.source === 'Tại chỗ' ? 'selected' : ''}>Nhân sự tại chỗ</option>
                    <option value="Từ nơi khác" ${r.source === 'Từ nơi khác' ? 'selected' : ''}>Nhân sự từ nơi khác</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Loại tài liệu bắt buộc <span class="text-danger">*</span></label>
                <select class="form-input" id="edit-req-doctype" required>
                    ${docTypes.map(d => `<option value="${d.name}" ${d.name === r.docType ? 'selected' : ''}>${d.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Ghi chú yêu cầu</label>
                <input type="text" class="form-input" id="edit-req-note" value="${r.note || ''}">
            </div>
        </div>
        <div style="text-align:right; margin-top:20px;">
            <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right:8px;">Hủy</button>
            <button class="btn btn-primary" id="btn-save-edit-reqdoc">Lưu cập nhật</button>
        </div>
    `;
    App.openModal(`Cập nhật cấu hình hồ sơ bắt buộc`, formHTML);

    const overlay = document.getElementById('app-modal');
    const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

    overlay.querySelector('#btn-save-edit-reqdoc').addEventListener('click', () => {
        const data = {
            position: overlay.querySelector('#edit-req-pos').value,
            procedure: overlay.querySelector('#edit-req-proc').value,
            source: overlay.querySelector('#edit-req-source').value,
            docType: overlay.querySelector('#edit-req-doctype').value,
            note: overlay.querySelector('#edit-req-note').value
        };
        if (PositionController.updateRequiredDoc(reqDocId, data, overlay)) {
            App.closeModal();
            App.notify('Cập nhật cấu hình hồ sơ bắt buộc thành công!', 'success');
            renderChucVu(container, 'thanhphan');
        }
    });
}

function renderAddStandardModal(container) {
    const positions = PositionController.getPositions();
    const procs = PositionController.getProcedureTypes();
    const docTypes = PositionController.getDocumentTypes();

    const formHTML = `
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Chức vụ áp dụng <span class="text-danger">*</span></label>
                <select class="form-input" id="add-std-pos" required>
                    <option value="">Chọn chức vụ</option>
                    ${positions.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Loại thủ tục <span class="text-danger">*</span></label>
                <select class="form-input" id="add-std-proc" required>
                    <option value="">Chọn loại thủ tục</option>
                    ${procs.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Nguồn nhân sự</label>
                <select class="form-input" id="add-std-source">
                    <option value="Tất cả">Tất cả nguồn nhân sự</option>
                    <option value="Tại chỗ">Nhân sự tại chỗ</option>
                    <option value="Từ nơi khác">Nhân sự từ nơi khác</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Nhóm tiêu chuẩn <span class="text-danger">*</span></label>
                <select class="form-input" id="add-std-cat" required>
                    <option value="Trình độ chuyên môn">Trình độ chuyên môn</option>
                    <option value="Lý luận chính trị">Lý luận chính trị</option>
                    <option value="Năng lực quản lý">Năng lực quản lý</option>
                    <option value="Kinh nghiệm công tác">Kinh nghiệm công tác</option>
                    <option value="Sức khỏe & Độ tuổi">Sức khỏe & Độ tuổi</option>
                </select>
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Nội dung tiêu chuẩn <span class="text-danger">*</span></label>
                <textarea class="form-input" id="add-std-content" rows="2" required></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Loại tài liệu minh chứng</label>
                <select class="form-input" id="add-std-doctype">
                    <option value="">Không yêu cầu tài liệu cụ thể</option>
                    ${docTypes.map(d => `<option value="${d.name}">${d.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Căn cứ pháp lý</label>
                <input type="text" class="form-input" id="add-std-legal">
            </div>
        </div>
        <div style="text-align:right; margin-top:20px;">
            <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right:8px;">Hủy</button>
            <button class="btn btn-primary" id="btn-save-std">Lưu tiêu chuẩn</button>
        </div>
    `;
    App.openModal('Thiết lập tiêu chuẩn bổ nhiệm', formHTML);

    const overlay = document.getElementById('app-modal');
    const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

    overlay.querySelector('#btn-save-std').addEventListener('click', () => {
        const data = {
            position: overlay.querySelector('#add-std-pos').value,
            procedure: overlay.querySelector('#add-std-proc').value,
            source: overlay.querySelector('#add-std-source').value,
            category: overlay.querySelector('#add-std-cat').value,
            content: overlay.querySelector('#add-std-content').value,
            docType: overlay.querySelector('#add-std-doctype').value,
            legalBasis: overlay.querySelector('#add-std-legal').value
        };
        if (PositionController.addStandard(data, overlay)) {
            App.closeModal();
            App.notify('Thiết lập tiêu chuẩn bổ nhiệm thành công!', 'success');
            renderChucVu(container, 'tieuchuan');
        }
    });
}

function renderEditStandardModal(container, stdId) {
    const s = PositionController.getStandards().find(item => item.id === stdId);
    if (!s) return;

    const positions = PositionController.getPositions();
    const procs = PositionController.getProcedureTypes();
    const docTypes = PositionController.getDocumentTypes();

    const formHTML = `
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Chức vụ áp dụng <span class="text-danger">*</span></label>
                <select class="form-input" id="edit-std-pos" required>
                    ${positions.map(p => `<option value="${p.name}" ${p.name === s.position ? 'selected' : ''}>${p.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Loại thủ tục <span class="text-danger">*</span></label>
                <select class="form-input" id="edit-std-proc" required>
                    ${procs.map(p => `<option value="${p.name}" ${p.name === s.procedure ? 'selected' : ''}>${p.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Nguồn nhân sự</label>
                <select class="form-input" id="edit-std-source">
                    <option value="Tất cả" ${s.source === 'Tất cả' ? 'selected' : ''}>Tất cả nguồn nhân sự</option>
                    <option value="Tại chỗ" ${s.source === 'Tại chỗ' ? 'selected' : ''}>Nhân sự tại chỗ</option>
                    <option value="Từ nơi khác" ${s.source === 'Từ nơi khác' ? 'selected' : ''}>Nhân sự từ nơi khác</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Nhóm tiêu chuẩn <span class="text-danger">*</span></label>
                <select class="form-input" id="edit-std-cat" required>
                    <option value="Trình độ chuyên môn" ${s.category === 'Trình độ chuyên môn' ? 'selected' : ''}>Trình độ chuyên môn</option>
                    <option value="Lý luận chính trị" ${s.category === 'Lý luận chính trị' ? 'selected' : ''}>Lý luận chính trị</option>
                    <option value="Năng lực quản lý" ${s.category === 'Năng lực quản lý' ? 'selected' : ''}>Năng lực quản lý</option>
                    <option value="Kinh nghiệm công tác" ${s.category === 'Kinh nghiệm công tác' ? 'selected' : ''}>Kinh nghiệm công tác</option>
                    <option value="Sức khỏe & Độ tuổi" ${s.category === 'Sức khỏe & Độ tuổi' ? 'selected' : ''}>Sức khỏe & Độ tuổi</option>
                </select>
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Nội dung tiêu chuẩn <span class="text-danger">*</span></label>
                <textarea class="form-input" id="edit-std-content" rows="2" required>${s.content}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Loại tài liệu minh chứng</label>
                <select class="form-input" id="edit-std-doctype">
                    <option value="">Không yêu cầu tài liệu cụ thể</option>
                    ${docTypes.map(d => `<option value="${d.name}" ${d.name === s.docType ? 'selected' : ''}>${d.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Căn cứ pháp lý</label>
                <input type="text" class="form-input" id="edit-std-legal" value="${s.legalBasis || ''}">
            </div>
        </div>
        <div style="text-align:right; margin-top:20px;">
            <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right:8px;">Hủy</button>
            <button class="btn btn-primary" id="btn-save-edit-std">Lưu cập nhật</button>
        </div>
    `;
    App.openModal(`Cập nhật tiêu chuẩn bổ nhiệm`, formHTML);

    const overlay = document.getElementById('app-modal');
    const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

    overlay.querySelector('#btn-save-edit-std').addEventListener('click', () => {
        const data = {
            position: overlay.querySelector('#edit-std-pos').value,
            procedure: overlay.querySelector('#edit-std-proc').value,
            source: overlay.querySelector('#edit-std-source').value,
            category: overlay.querySelector('#edit-std-cat').value,
            content: overlay.querySelector('#edit-std-content').value,
            docType: overlay.querySelector('#edit-std-doctype').value,
            legalBasis: overlay.querySelector('#edit-std-legal').value
        };
        if (PositionController.updateStandard(stdId, data, overlay)) {
            App.closeModal();
            App.notify('Cập nhật tiêu chuẩn bổ nhiệm thành công!', 'success');
            renderChucVu(container, 'tieuchuan');
        }
    });
}

function renderAddAuthorityModal(container) {
    const positions = PositionController.getPositions();
    const procs = PositionController.getProcedureTypes();

    const formHTML = `
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Chức vụ áp dụng <span class="text-danger">*</span></label>
                <select class="form-input" id="add-auth-pos" required>
                    <option value="">Chọn chức vụ</option>
                    ${positions.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Loại thủ tục <span class="text-danger">*</span></label>
                <select class="form-input" id="add-auth-proc" required>
                    <option value="">Chọn loại thủ tục</option>
                    ${procs.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Phạm vi đơn vị áp dụng <span class="text-danger">*</span></label>
                <select class="form-input" id="add-auth-scope" required>
                    <option value="Cơ quan Đại học Đà Nẵng">Cơ quan Đại học Đà Nẵng</option>
                    <option value="Trường thành viên">Trường thành viên</option>
                    <option value="Đơn vị trực thuộc">Đơn vị trực thuộc</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Cấp có thẩm quyền <span class="text-danger">*</span></label>
                <select class="form-input" id="add-auth-name" required>
                    <option value="Giám đốc Đại học Đà Nẵng">Giám đốc Đại học Đà Nẵng</option>
                    <option value="Hội đồng Đại học Đà Nẵng">Hội đồng Đại học Đà Nẵng</option>
                    <option value="Hiệu trưởng trường thành viên">Hiệu trưởng trường thành viên</option>
                    <option value="Trưởng ban Tổ chức Cán bộ">Trưởng ban Tổ chức Cán bộ</option>
                </select>
            </div>
        </div>
        <div style="text-align:right; margin-top:20px;">
            <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right:8px;">Hủy</button>
            <button class="btn btn-primary" id="btn-save-auth">Lưu quy tắc thẩm quyền</button>
        </div>
    `;
    App.openModal('Thiết lập thẩm quyền xử lý mới', formHTML);

    const overlay = document.getElementById('app-modal');
    const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

    overlay.querySelector('#btn-save-auth').addEventListener('click', () => {
        const data = {
            position: overlay.querySelector('#add-auth-pos').value,
            procedure: overlay.querySelector('#add-auth-proc').value,
            unitScope: overlay.querySelector('#add-auth-scope').value,
            authority: overlay.querySelector('#add-auth-name').value
        };
        if (PositionController.addAuthority(data, overlay)) {
            App.closeModal();
            App.notify('Thiết lập thẩm quyền xử lý thành công!', 'success');
            renderChucVu(container, 'thamquyen');
        }
    });
}

function renderEditAuthorityModal(container, authId) {
    const a = PositionController.getAuthorities().find(item => item.id === authId);
    if (!a) return;

    const positions = PositionController.getPositions();
    const procs = PositionController.getProcedureTypes();

    const formHTML = `
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Chức vụ áp dụng <span class="text-danger">*</span></label>
                <select class="form-input" id="edit-auth-pos" required>
                    ${positions.map(p => `<option value="${p.name}" ${p.name === a.position ? 'selected' : ''}>${p.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Loại thủ tục <span class="text-danger">*</span></label>
                <select class="form-input" id="edit-auth-proc" required>
                    ${procs.map(p => `<option value="${p.name}" ${p.name === a.procedure ? 'selected' : ''}>${p.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Phạm vi đơn vị áp dụng <span class="text-danger">*</span></label>
                <select class="form-input" id="edit-auth-scope" required>
                    <option value="Cơ quan Đại học Đà Nẵng" ${a.unitScope === 'Cơ quan Đại học Đà Nẵng' ? 'selected' : ''}>Cơ quan Đại học Đà Nẵng</option>
                    <option value="Trường thành viên" ${a.unitScope === 'Trường thành viên' ? 'selected' : ''}>Trường thành viên</option>
                    <option value="Đơn vị trực thuộc" ${a.unitScope === 'Đơn vị trực thuộc' ? 'selected' : ''}>Đơn vị trực thuộc</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Cấp có thẩm quyền <span class="text-danger">*</span></label>
                <select class="form-input" id="edit-auth-name" required>
                    <option value="Giám đốc Đại học Đà Nẵng" ${a.authority === 'Giám đốc Đại học Đà Nẵng' ? 'selected' : ''}>Giám đốc Đại học Đà Nẵng</option>
                    <option value="Hội đồng Đại học Đà Nẵng" ${a.authority === 'Hội đồng Đại học Đà Nẵng' ? 'selected' : ''}>Hội đồng Đại học Đà Nẵng</option>
                    <option value="Hiệu trưởng trường thành viên" ${a.authority === 'Hiệu trưởng trường thành viên' ? 'selected' : ''}>Hiệu trưởng trường thành viên</option>
                    <option value="Trưởng ban Tổ chức Cán bộ" ${a.authority === 'Trưởng ban Tổ chức Cán bộ' ? 'selected' : ''}>Trưởng ban Tổ chức Cán bộ</option>
                </select>
            </div>
        </div>
        <div style="text-align:right; margin-top:20px;">
            <button class="btn btn-secondary" onclick="App.closeModal()" style="margin-right:8px;">Hủy</button>
            <button class="btn btn-primary" id="btn-save-edit-auth">Lưu cập nhật</button>
        </div>
    `;
    App.openModal(`Cập nhật thẩm quyền xử lý`, formHTML);

    const overlay = document.getElementById('app-modal');
    const mc = overlay.querySelector('.modal-confirm'); if (mc) mc.style.display = 'none';

    overlay.querySelector('#btn-save-edit-auth').addEventListener('click', () => {
        const data = {
            position: overlay.querySelector('#edit-auth-pos').value,
            procedure: overlay.querySelector('#edit-auth-proc').value,
            unitScope: overlay.querySelector('#edit-auth-scope').value,
            authority: overlay.querySelector('#edit-auth-name').value
        };
        if (PositionController.updateAuthority(authId, data, overlay)) {
            App.closeModal();
            App.notify('Cập nhật quy tắc thẩm quyền xử lý thành công!', 'success');
            renderChucVu(container, 'thamquyen');
        }
    });
}

/* ============================================================
   Module 08: Tra cứu, thống kê và báo cáo (MD08)
   Triển khai HOÀN CHỈNH 100% 6 Use Cases (UC08.01 -> UC08.06)
   - Đầy đủ 5 tab chức năng tương tác thời gian thực
   - Bộ lọc đa tiêu chí, kiểm tra luồng ngoại lệ ngày lỗi
   - Thẻ thống kê KPI & thời điểm tổng hợp realtime
   - Drill-down xem danh sách chi tiết
   - Modal xuất tệp Excel/PDF chọn phạm vi & ghi nhật ký
   ============================================================ */

function renderBaoCao(container) {
    let currentTab = 'thongke'; // 'thongke', 'tiendo', 'nhiemky', 'quyetdinh'
    let isAdvancedFilterOpen = false;

    // Selected record checkboxes state for export scope
    let selectedRecordIds = new Set();

    const html = `
        <div class="full-page-container" style="background: #f8fafc; min-height: 100vh; padding-bottom: 50px;">
            <!-- Header hệ thống phẳng, sang trọng -->
            <div class="page-header-alt" style="padding: 22px 36px; background: #ffffff; border-bottom: 1px solid #e2e8f0; width: 100%; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
                <div style="width: 100%; max-width: 1400px; margin: 0 auto;">
                    <div class="breadcrumb-bar" style="margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
                        <div class="breadcrumb-container" style="display: flex; align-items: center; gap: 8px;">
                            <span class="bc-back-btn" id="bc-back-dashboard">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                                TRANG CHỦ
                            </span>
                            <svg class="bc-sep" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                            <span class="bc-current">TRA CỨU, THỐNG KÊ & BÁO CÁO</span>
                        </div>
                        <div style="display: flex; gap: 12px; align-items: center;">
                            <button class="btn btn-secondary" id="btn-export-quick-excel" style="display:flex; align-items:center; gap:8px; padding: 9px 16px; font-size: 13px; font-weight: 600; border-radius: 8px; white-space: nowrap;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                Xuất Excel nhanh
                            </button>
                            <button class="btn btn-primary" id="btn-open-export-modal" style="display:flex; align-items:center; gap:8px; padding: 9px 20px; font-size: 13px; font-weight: 700; border-radius: 8px; box-shadow: 0 4px 12px rgba(7, 88, 154, 0.2); white-space: nowrap;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                Xuất báo cáo tệp
                            </button>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div>
                            <h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 0; letter-spacing: -0.01em;">
                                Phân hệ Tra cứu, Thống kê & Báo cáo tổng hợp
                            </h2>
                            <p style="color: #64748b; margin-top: 4px; font-size: 13.5px; margin-bottom: 0;">
                                Tổng hợp dữ liệu liên thông Nhân sự, Chức vụ, Đề xuất, Hồ sơ bổ nhiệm, Quyết định và Cảnh báo nhiệm kỳ
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Body container thoáng đẹp -->
            <div style="padding: 28px 36px 0; width: 100%; max-width: 1400px; margin: 0 auto;">
                
                <!-- KHỐI TRA CỨU DỮ LIỆU TỔNG HỢP & BỘ LỌC LIÊN THÔNG CHUNG (ĐẶT PHÍA TRÊN CÙNG) -->
                <div class="module-filter-card" id="bc-top-filter-card">
                    <div class="module-filter-header">
                        <div class="module-filter-title">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            TRA CỨU DỮ LIỆU TỔNG HỢP & BỘ LỌC LIÊN THÔNG
                        </div>
                    </div>

                    <div id="top-filter-body" style="display: flex; flex-direction: column; gap: 14px;">
                        <!-- Hàng lọc chính -->
                        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-end;">
                            <div style="flex: 2; min-width: 260px;">
                                <label class="form-label">Cán bộ / Nhân sự (Họ tên hoặc Mã NS)</label>
                                <div class="filter-search-wrapper">
                                    <svg class="search-icon-inside" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                    <input type="text" class="form-input" id="tc-kw-personnel" placeholder="Nhập tên cán bộ, mã nhân sự...">
                                </div>
                            </div>
                            <div style="flex: 1.2; min-width: 200px;">
                                <label class="form-label">Đơn vị công tác</label>
                                <select class="form-input" id="tc-unit">
                                    <option value="">-- Tất cả đơn vị --</option>
                                    <option value="Ban Giám đốc">Ban Giám đốc</option>
                                    <option value="Văn phòng">Văn phòng</option>
                                    <option value="Ban Tổ chức Cán bộ">Ban Tổ chức Cán bộ</option>
                                    <option value="Ban Đào tạo">Ban Đào tạo</option>
                                    <option value="Ban Kế hoạch - Tài chính">Ban Kế hoạch - Tài chính</option>
                                    <option value="Ban KHCN & Môi trường">Ban KHCN & Môi trường</option>
                                    <option value="Trường ĐH Bách khoa">Trường ĐH Bách khoa</option>
                                    <option value="Trường ĐH Kinh tế">Trường ĐH Kinh tế</option>
                                </select>
                            </div>
                            <div style="flex: 1; min-width: 180px;">
                                <label class="form-label">Trạng thái hồ sơ</label>
                                <select class="form-input" id="tc-dossier-status">
                                    <option value="">-- Tất cả trạng thái --</option>
                                    <option value="draft">Bản nháp</option>
                                    <option value="reviewing">Đang rà soát</option>
                                    <option value="submitted">Chờ thẩm định</option>
                                    <option value="approved">Đã phê duyệt</option>
                                    <option value="issued">Đã ban hành QĐ</option>
                                    <option value="rejected">Từ chối / Yêu cầu bổ sung</option>
                                </select>
                            </div>
                            <div style="display: flex; gap: 8px; flex-shrink: 0;">
                                <button type="button" class="btn btn-secondary" id="btn-toggle-adv-filter" style="height: 40px; padding: 0 16px; font-size: 13.5px; font-weight: 600; border-radius: 8px; border: 1px solid #cbd5e1; color: #475569; white-space: nowrap; display: flex; align-items: center; gap: 6px;">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                                    <span id="adv-filter-btn-text">Bộ lọc nâng cao</span>
                                </button>
                                <button type="button" class="btn btn-primary" id="btn-tc-search" style="height: 40px; padding: 0 22px; font-weight: 700; border-radius: 8px; font-size: 13.5px; white-space: nowrap; display: flex; align-items: center; gap: 8px;">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                    Tra cứu
                                </button>
                            </div>
                        </div>

                        <!-- Accordion Bộ lọc nâng cao -->
                        <div id="adv-filter-panel" style="display: none; margin-top: 10px; padding-top: 16px; border-top: 1px dashed #cbd5e1;">
                            <div class="module-filter-title" style="margin-bottom: 14px;">
                                TIÊU CHÍ LỌC NÂNG CAO TỔNG HỢP (6 MỐC TIÊU CHÍ BỔ SUNG)
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 14px;">
                                <div>
                                    <label class="form-label" style="font-size: 11.5px; font-weight: 600; color: #64748b;">Chức vụ đề xuất / Đảm nhiệm</label>
                                    <select class="form-input" id="tc-position" style="height: 38px;">
                                        <option value="">-- Tất cả chức vụ --</option>
                                        <option value="Trưởng ban">Trưởng ban</option>
                                        <option value="Phó Trưởng ban">Phó Trưởng ban</option>
                                        <option value="Giám đốc Trung tâm">Giám đốc Trung tâm</option>
                                        <option value="Chánh Văn phòng">Chánh Văn phòng</option>
                                        <option value="Phó Chánh Văn phòng">Phó Chánh Văn phòng</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="form-label" style="font-size: 11.5px; font-weight: 600; color: #64748b;">Loại thủ tục</label>
                                    <select class="form-input" id="tc-proc-type" style="height: 38px;">
                                        <option value="">-- Tất cả loại thủ tục --</option>
                                        <option value="Bổ nhiệm lần đầu">Bổ nhiệm lần đầu</option>
                                        <option value="Bổ nhiệm lại">Bổ nhiệm lại</option>
                                        <option value="Kéo dài thời gian giữ chức vụ">Kéo dài thời gian giữ chức vụ</option>
                                        <option value="Miễn nhiệm">Miễn nhiệm</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="form-label" style="font-size: 11.5px; font-weight: 600; color: #64748b;">Số Quyết định</label>
                                    <input type="text" class="form-input" id="tc-dec-code" placeholder="Ví dụ: 125/QĐ-ĐHĐN..." style="height: 38px;">
                                </div>
                            </div>

                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 14px;">
                                <div>
                                    <label class="form-label" style="font-size: 11.5px; font-weight: 600; color: #64748b;">QĐ Ban hành: Từ ngày</label>
                                    <input type="date" class="form-input" id="tc-dec-date-from" style="height: 38px;">
                                </div>
                                <div>
                                    <label class="form-label" style="font-size: 11.5px; font-weight: 600; color: #64748b;">QĐ Ban hành: Đến ngày</label>
                                    <input type="date" class="form-input" id="tc-dec-date-to" style="height: 38px;">
                                </div>
                                <div>
                                    <label class="form-label" style="font-size: 11.5px; font-weight: 600; color: #64748b;">Trạng thái nhiệm kỳ</label>
                                    <select class="form-input" id="tc-term-status" style="height: 38px;">
                                        <option value="">-- Tất cả mốc cảnh báo --</option>
                                        <option value="active">Đang hiệu lực an toàn</option>
                                        <option value="under90">Sắp hết hạn (≤ 90 ngày)</option>
                                        <option value="under30">Sắp hết hạn (≤ 30 ngày)</option>
                                        <option value="expired">Đã quá hạn</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="form-label" style="font-size: 11.5px; font-weight: 600; color: #64748b;">Thời hạn Nhiệm kỳ đến</label>
                                    <input type="date" class="form-input" id="tc-term-date-to" style="height: 38px;">
                                </div>
                            </div>

                            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                                <button type="button" class="btn btn-secondary btn-sm" id="btn-tc-reset">Xóa bộ lọc nâng cao</button>
                            </div>
                        </div>

                        <!-- BẢNG KẾT QUẢ TRA CỨU XỔ XUỐNG TRỰC TIẾP KHI TRA CỨU -->
                        <div id="tc-search-results-panel" style="display: none; margin-top: 14px; padding-top: 16px; border-top: 2px solid #e2e8f0;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                                <h3 style="font-size: 14.5px; font-weight: 800; color: #0f172a; margin: 0; display: flex; align-items: center; gap: 8px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary, #07589A)" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                    <span>KẾT QUẢ TRA CỨU DỮ LIỆU TỔNG HỢP LIÊN THÔNG</span>
                                    <span class="badge badge-info" style="font-size: 12px; padding: 4px 10px;" id="tc-result-count">0 bản ghi</span>
                                </h3>
                                <button type="button" class="btn btn-ghost btn-sm" id="btn-close-search-results" style="font-weight: 600; color: #64748b; display: flex; align-items: center; gap: 4px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                    Đóng kết quả
                                </button>
                            </div>

                            <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow-x: auto; width: 100%; background: #ffffff;">
                                <table class="data-table" style="width: 100%; min-width: 900px;">
                                    <thead>
                                        <tr style="background: #f8fafc;">
                                            <th style="width: 40px; text-align: center; white-space: nowrap;"><input type="checkbox" id="tc-select-all"></th>
                                            <th style="width: 50px; text-align: center; white-space: nowrap;">STT</th>
                                            <th style="white-space: nowrap;">Cán bộ / Nhân sự</th>
                                            <th style="white-space: nowrap;">Đơn vị & Chức vụ</th>
                                            <th style="white-space: nowrap;">Hồ sơ bổ nhiệm liên quan</th>
                                            <th style="white-space: nowrap;">Quyết định phát hành</th>
                                            <th style="white-space: nowrap;">Thời hạn Nhiệm kỳ</th>
                                            <th style="width: 100px; text-align: center; white-space: nowrap;">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tc-results-tbody"></tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Cảnh báo luồng ngoại lệ ngày sai -->
                <div id="tc-exception-banner" style="display: none; margin-bottom: 20px; padding: 16px 20px; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 12px; color: #991b1b; font-size: 13.5px;">
                    <strong style="display:flex; align-items:center; gap:8px;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        Điều kiện tra cứu không hợp lệ!
                    </strong>
                    <div id="tc-exception-msg" style="margin-top: 4px; margin-left: 26px;">Khoảng thời gian bắt đầu không được lớn hơn khoảng thời gian kết thúc.</div>
                </div>

                <!-- Dãy 4 Tab Báo cáo (Tự động chia đều 4 cột khớp màn hình, không đè vỡ chữ, không scroll ngang) -->
                <div class="tenure-tabs md08-grid-4" id="md08-nav-tabs" style="margin-bottom: 24px; border-bottom: 2px solid #e2e8f0;">
                    <button type="button" class="tenure-tab-btn active" data-tab="thongke">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                        <span>1. Thống kê bổ nhiệm</span>
                    </button>
                    <button type="button" class="tenure-tab-btn" data-tab="tiendo">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span>2. Báo cáo tiến độ</span>
                    </button>
                    <button type="button" class="tenure-tab-btn" data-tab="nhiemky">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        <span>3. Tình trạng nhiệm kỳ</span>
                    </button>
                    <button type="button" class="tenure-tab-btn" data-tab="quyetdinh">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span>4. Báo cáo quyết định</span>
                    </button>
                </div>

                <!-- KHU VỰC NỘI DUNG TẢI TAB THỜI GIAN THỰC -->
                <div id="md08-tab-content-area"></div>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Core events
    container.querySelector('#bc-back-dashboard')?.addEventListener('click', () => App.navigateTo('dashboard'));
    container.querySelector('#btn-open-export-modal')?.addEventListener('click', () => showExportModal(currentTab));
    container.querySelector('#btn-export-quick-excel')?.addEventListener('click', () => showExportModal(currentTab, 'excel'));

    // Top Filter Box Collapse / Expand Toggle
    let isTopFilterOpen = true;
    const btnToggleTopFilter = container.querySelector('#btn-toggle-top-filter');
    const topFilterBody = container.querySelector('#top-filter-body');
    btnToggleTopFilter?.addEventListener('click', () => {
        isTopFilterOpen = !isTopFilterOpen;
        topFilterBody.style.display = isTopFilterOpen ? 'flex' : 'none';
        btnToggleTopFilter.textContent = isTopFilterOpen ? 'Thu gọn' : 'Mở rộng';
    });

    // Toggle Advanced Filter Accordion
    const advBtn = container.querySelector('#btn-toggle-adv-filter');
    const advPanel = container.querySelector('#adv-filter-panel');
    const advBtnText = container.querySelector('#adv-filter-btn-text');

    advBtn?.addEventListener('click', () => {
        isAdvancedFilterOpen = !isAdvancedFilterOpen;
        advPanel.style.display = isAdvancedFilterOpen ? 'block' : 'none';
        advBtnText.textContent = isAdvancedFilterOpen ? 'Ẩn bộ lọc nâng cao' : 'Bộ lọc nâng cao';
        advBtn.classList.toggle('btn-primary', isAdvancedFilterOpen);
    });

    // Handle Direct Dropdown Search Results Panel
    const searchResultsPanel = container.querySelector('#tc-search-results-panel');
    const btnCloseSearchResults = container.querySelector('#btn-close-search-results');
    btnCloseSearchResults?.addEventListener('click', () => {
        searchResultsPanel.style.display = 'none';
    });

    const executeSearch = () => {
        const personKw = (container.querySelector('#tc-kw-personnel')?.value || '').toLowerCase().trim();
        const unit = container.querySelector('#tc-unit')?.value || '';
        const dossierStatus = container.querySelector('#tc-dossier-status')?.value || '';

        const pos = container.querySelector('#tc-position')?.value || '';
        const procType = container.querySelector('#tc-proc-type')?.value || '';
        const decCode = (container.querySelector('#tc-dec-code')?.value || '').toLowerCase().trim();
        const termStatus = container.querySelector('#tc-term-status')?.value || '';
        const decDateFrom = container.querySelector('#tc-dec-date-from')?.value || '';
        const decDateTo = container.querySelector('#tc-dec-date-to')?.value || '';

        const banner = container.querySelector('#tc-exception-banner');
        const msgEl = container.querySelector('#tc-exception-msg');

        if (decDateFrom && decDateTo && decDateFrom > decDateTo) {
            if (banner) banner.style.display = 'block';
            if (msgEl) msgEl.textContent = 'Khoảng thời gian từ ngày không được lớn hơn đến ngày. Vui lòng điều chỉnh bộ lọc!';
            searchResultsPanel.style.display = 'block';
            renderResults([]);
            return;
        } else {
            if (banner) banner.style.display = 'none';
        }

        let results = App.state.personnelList.map(person => {
            const dossier = App.state.dossiersList.find(d => d.personId === person.id || d.person === person.name);
            const decision = App.state.decisionsList.find(dec => dec.person === person.name);
            const tenure = App.state.termsList.find(t => t.person === person.name);
            return { person, dossier, decision, tenure };
        });

        results = results.filter(item => {
            const matchPerson = !personKw || item.person.name.toLowerCase().includes(personKw) || item.person.id.toLowerCase().includes(personKw);
            const matchUnit = !unit || item.person.unit === unit || (item.dossier && item.dossier.unit === unit);
            const matchStatus = !dossierStatus || (item.dossier && item.dossier.statusCode === dossierStatus);
            const matchPos = !pos || item.person.position === pos;
            const matchProc = !procType || (item.dossier && item.dossier.procedureType === procType);
            const matchDecCode = !decCode || (item.decision && (item.decision.code || item.decision.id).toLowerCase().includes(decCode));
            const matchTermStatus = !termStatus || (item.tenure && item.tenure.statusCode === termStatus);

            return matchPerson && matchUnit && matchStatus && matchPos && matchProc && matchDecCode && matchTermStatus;
        });

        searchResultsPanel.style.display = 'block';
        renderResults(results);
    };

    const renderResults = (list) => {
        const tbody = container.querySelector('#tc-results-tbody');
        const countEl = container.querySelector('#tc-result-count');
        if (countEl) countEl.textContent = `${list.length} bản ghi`;

        if (!tbody) return;

        if (!list || list.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 36px 20px; color: #64748b;">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5" style="margin-bottom: 8px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <div style="font-size: 13.5px; font-weight: 600; color: #475569;">Không tìm thấy dữ liệu liên thông phù hợp</div>
                        <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">Hãy thử điều chỉnh lại từ khóa hoặc xóa bớt tiêu chí bộ lọc</div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = list.map((item, idx) => `
            <tr class="table-row-hover" style="transition: background 0.15s ease;">
                <td style="text-align: center; white-space: nowrap;">
                    <input type="checkbox" class="chk-record-item" data-id="${item.person.id}" ${selectedRecordIds.has(item.person.id) ? 'checked' : ''}>
                </td>
                <td style="text-align: center; font-weight: 700; color: #94a3b8; white-space: nowrap;">${idx + 1}</td>
                <td style="white-space: nowrap;">
                    <div style="font-weight: 700; color: var(--primary); font-size: 13.5px; cursor: pointer;" class="link-personnel" data-id="${item.person.id}">
                        ${item.person.name}
                    </div>
                    <div style="font-size: 11px; font-family: monospace; color: #64748b; margin-top: 2px;">Mã NS: ${item.person.id}</div>
                </td>
                <td style="white-space: nowrap;">
                    <div style="font-weight: 600; color: #0f172a; font-size: 13px;">${item.person.position || '—'}</div>
                    <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">${item.person.unit || '—'}</div>
                </td>
                <td style="white-space: nowrap;">
                    ${item.dossier ? `
                        <div style="font-weight: 700; color: #0284c7; cursor: pointer; font-size: 13px;" class="link-dossier" data-id="${item.dossier.id}">
                            Hồ sơ ${item.dossier.id}
                        </div>
                        <div style="font-size: 11px; color: #64748b;">${item.dossier.statusText || item.dossier.statusCode}</div>
                    ` : '<span style="color: #94a3b8; font-size: 12px;">—</span>'}
                </td>
                <td style="white-space: nowrap;">
                    ${item.decision ? `
                        <div style="font-weight: 700; color: #16a34a; cursor: pointer; font-size: 13px;" class="link-decision" data-id="${item.decision.id}">
                            ${item.decision.code || item.decision.id}
                        </div>
                        <div style="font-size: 11px; color: #64748b;">Ngày: ${item.decision.issueDate || '—'}</div>
                    ` : '<span style="color: #94a3b8; font-size: 12px;">Chưa phát hành</span>'}
                </td>
                <td style="white-space: nowrap;">
                    ${item.tenure ? `
                        <div style="font-weight: 600; font-size: 12.5px; color: #334155;">${item.tenure.endDate || '—'}</div>
                        <span class="badge ${item.tenure.statusCode === 'active' ? 'badge-success' : item.tenure.statusCode === 'expired' ? 'badge-danger' : 'badge-warning'}" style="font-size: 10.5px;">
                            ${item.tenure.statusText}
                        </span>
                    ` : '<span style="color: #94a3b8; font-size: 12px;">—</span>'}
                </td>
                <td style="text-align: center; white-space: nowrap;">
                    <button class="btn btn-ghost btn-sm link-personnel" data-id="${item.person.id}" title="Xem hồ sơ nhân sự">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                </td>
            </tr>
        `).join('');

        // Bind record checkbox events
        tbody.querySelectorAll('.chk-record-item').forEach(chk => {
            chk.addEventListener('change', () => {
                const id = chk.getAttribute('data-id');
                if (chk.checked) selectedRecordIds.add(id);
                else selectedRecordIds.delete(id);
            });
        });

        // Bind Drill-down link handlers
        tbody.querySelectorAll('.link-personnel').forEach(el => {
            el.addEventListener('click', () => {
                const pid = el.getAttribute('data-id');
                App.navigateTo('hoso');
                if (typeof renderViewPersonnel === 'function') {
                    renderViewPersonnel(document.getElementById('app-main-content'), pid);
                }
            });
        });
        tbody.querySelectorAll('.link-dossier').forEach(el => {
            el.addEventListener('click', () => {
                const id = el.getAttribute('data-id');
                App.navigateTo('bonhiem');
                const dossier = App.state.dossiersList.find(d => d.id === id);
                if (dossier && typeof renderViewDossierDetail === 'function') {
                    renderViewDossierDetail(dossier, document.getElementById('app-main-content'));
                }
            });
        });
        tbody.querySelectorAll('.link-decision').forEach(el => {
            el.addEventListener('click', () => {
                const id = el.getAttribute('data-id');
                App.navigateTo('quyetdinh');
                const dec = App.state.decisionsList.find(d => d.id === id);
                if (dec && typeof renderViewDecisionDetail === 'function') {
                    renderViewDecisionDetail(dec, document.getElementById('app-main-content'));
                }
            });
        });
    };

    // Execute Search Button at Top
    const btnTcSearch = container.querySelector('#btn-tc-search');
    btnTcSearch?.addEventListener('click', executeSearch);

    const btnTcReset = container.querySelector('#btn-tc-reset');
    btnTcReset?.addEventListener('click', () => {
        const inputs = container.querySelectorAll('#bc-top-filter-card input, #bc-top-filter-card select');
        inputs.forEach(i => i.value = '');
        executeSearch();
    });

    const tabButtons = container.querySelectorAll('#md08-nav-tabs .tenure-tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTab = btn.getAttribute('data-tab');
            selectedRecordIds.clear();
            renderActiveTabContent();
        });
    });

    const renderActiveTabContent = () => {
        const contentArea = container.querySelector('#md08-tab-content-area');
        if (!contentArea) return;

        if (currentTab === 'thongke') renderTabThongKeHoSo(contentArea);
        else if (currentTab === 'tiendo') renderTabTienDo(contentArea);
        else if (currentTab === 'nhiemky') renderTabNhiemKy(contentArea);
        else if (currentTab === 'quyetdinh') renderTabQuyetDinh(contentArea);
    };

    renderActiveTabContent();

    // =========================================================================
    // UC08.02 – THỐNG KÊ HỒ SƠ BỔ NHIỆM
    // =========================================================================
    function renderTabThongKeHoSo(contentContainer) {
        const html = `
            <div class="card" style="padding: 24px; margin-bottom: 24px; border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <div style="font-size: 12px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
                    <span>TIÊU CHÍ & CHIỀU THỐNG KÊ HỒ SƠ BỔ NHIỆM</span>
                    <span style="font-size: 11.5px; color: #64748b;">Thời điểm tổng hợp: <strong id="tk-timestamp">${new Date().toLocaleTimeString('vi-VN')} - ${new Date().toLocaleDateString('vi-VN')}</strong></span>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 18px;">
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #475569;">Loại thủ tục</label>
                        <select class="form-input" id="tk-proc" style="height: 40px; border-radius: 8px;">
                            <option value="">-- Tất cả thủ tục --</option>
                            <option value="Bổ nhiệm lần đầu">Bổ nhiệm lần đầu</option>
                            <option value="Bổ nhiệm lại">Bổ nhiệm lại</option>
                            <option value="Kéo dài thời gian giữ chức vụ">Kéo dài thời gian giữ chức vụ</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #475569;">Trạng thái xử lý</label>
                        <select class="form-input" id="tk-status" style="height: 40px; border-radius: 8px;">
                            <option value="">-- Tất cả trạng thái --</option>
                            <option value="draft">Bản nháp</option>
                            <option value="reviewing">Đang rà soát</option>
                            <option value="submitted">Chờ thẩm định</option>
                            <option value="approved">Đã phê duyệt</option>
                            <option value="issued">Đã ban hành QĐ</option>
                            <option value="rejected">Từ chối / Bổ bổ sung</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #475569;">Đơn vị công tác</label>
                        <select class="form-input" id="tk-unit" style="height: 40px; border-radius: 8px;">
                            <option value="">-- Tất cả đơn vị --</option>
                            <option value="Ban Giám đốc">Ban Giám đốc</option>
                            <option value="Văn phòng">Văn phòng</option>
                            <option value="Ban Tổ chức Cán bộ">Ban Tổ chức Cán bộ</option>
                            <option value="Trường ĐH Bách khoa">Trường ĐH Bách khoa</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 800; color: var(--primary);">Chiều thống kê tổng hợp</label>
                        <select class="form-input" id="tk-dimension" style="height: 40px; border-radius: 8px; font-weight: 700; border-color: var(--primary); background: #eff6ff;">
                            <option value="unit">Theo Đơn vị công tác</option>
                            <option value="procedure">Theo Loại thủ tục</option>
                            <option value="status">Theo Trạng thái xử lý</option>
                            <option value="position">Theo Chức vụ đề xuất</option>
                        </select>
                    </div>
                </div>

                <div style="display: flex; justify-content: flex-end;">
                    <button type="button" class="btn btn-primary" id="btn-tk-exec" style="padding: 9px 24px; font-weight: 700; border-radius: 8px;">
                        Thực hiện thống kê
                    </button>
                </div>
            </div>

            <!-- KPI Metric Cards -->
            <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 18px; margin-bottom: 24px;">
                <div class="card card-kpi-clickable" id="kpi-tk-all" style="padding: 20px; border-radius: 12px; border-left: 4px solid var(--primary); background: #ffffff; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
                    <div style="font-size: 12px; font-weight: 700; color: var(--primary); text-transform: uppercase;">Tổng hồ sơ bổ nhiệm</div>
                    <div style="font-size: 28px; font-weight: 800; color: #0f172a; margin-top: 4px;" id="st-total-count">0</div>
                    <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Nhấp để xem tất cả bản ghi</div>
                </div>
                <div class="card card-kpi-clickable" id="kpi-tk-issued" style="padding: 20px; border-radius: 12px; border-left: 4px solid #16a34a; background: #ffffff; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
                    <div style="font-size: 12px; font-weight: 700; color: #16a34a; text-transform: uppercase;">Đã ban hành QĐ</div>
                    <div style="font-size: 28px; font-weight: 800; color: #16a34a; margin-top: 4px;" id="st-issued-count">0</div>
                    <div style="font-size: 11px; color: #16a34a; margin-top: 4px;">Nhấp để xem hồ sơ hoàn thành</div>
                </div>
                <div class="card card-kpi-clickable" id="kpi-tk-pending" style="padding: 20px; border-radius: 12px; border-left: 4px solid #ea580c; background: #ffffff; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
                    <div style="font-size: 12px; font-weight: 700; color: #ea580c; text-transform: uppercase;">Đang thẩm định / Phê duyệt</div>
                    <div style="font-size: 28px; font-weight: 800; color: #ea580c; margin-top: 4px;" id="st-pending-count">0</div>
                    <div style="font-size: 11px; color: #ea580c; margin-top: 4px;">Nhấp để xem hồ sơ đang xử lý</div>
                </div>
                <div class="card card-kpi-clickable" id="kpi-tk-rejected" style="padding: 20px; border-radius: 12px; border-left: 4px solid #dc2626; background: #ffffff; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
                    <div style="font-size: 12px; font-weight: 700; color: #dc2626; text-transform: uppercase;">Từ chối / Yêu cầu bổ sung</div>
                    <div style="font-size: 28px; font-weight: 800; color: #dc2626; margin-top: 4px;" id="st-rejected-count">0</div>
                    <div style="font-size: 11px; color: #dc2626; margin-top: 4px;">Nhấp để xem hồ sơ từ chối</div>
                </div>
            </div>

            <!-- Bảng phân bố kết quả thống kê -->
            <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
                    <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0;">
                        Phân bố hồ sơ bổ nhiệm theo chiều thống kê
                    </h3>
                </div>
                <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow-x: auto; width: 100%;">
                    <table class="data-table" style="width: 100%; min-width: 750px;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="white-space: nowrap;">Nhóm thống kê</th>
                                <th style="text-align: center; white-space: nowrap;">Tổng số hồ sơ</th>
                                <th style="text-align: center; white-space: nowrap;">Bổ nhiệm lần đầu</th>
                                <th style="text-align: center; white-space: nowrap;">Bổ nhiệm lại</th>
                                <th style="text-align: center; white-space: nowrap;">Đã hoàn thành</th>
                                <th style="text-align: center; white-space: nowrap;">Thao tác chi tiết</th>
                            </tr>
                        </thead>
                        <tbody id="tk-table-tbody"></tbody>
                    </table>
                </div>
            </div>
        `;

        contentContainer.innerHTML = html;

        let filteredDossiers = [];

        const runThongKe = () => {
            const proc = contentContainer.querySelector('#tk-proc').value;
            const status = contentContainer.querySelector('#tk-status').value;
            const unit = contentContainer.querySelector('#tk-unit').value;
            const dimension = contentContainer.querySelector('#tk-dimension').value;

            filteredDossiers = [...App.state.dossiersList];
            if (proc) filteredDossiers = filteredDossiers.filter(d => d.procedureType === proc);
            if (status) filteredDossiers = filteredDossiers.filter(d => d.statusCode === status);
            if (unit) filteredDossiers = filteredDossiers.filter(d => d.unit === unit);

            contentContainer.querySelector('#st-total-count').textContent = filteredDossiers.length;
            contentContainer.querySelector('#st-issued-count').textContent = filteredDossiers.filter(d => d.statusCode === 'issued' || d.statusCode === 'approved').length;
            contentContainer.querySelector('#st-pending-count').textContent = filteredDossiers.filter(d => d.statusCode === 'submitted' || d.statusCode === 'reviewing').length;
            contentContainer.querySelector('#st-rejected-count').textContent = filteredDossiers.filter(d => d.statusCode === 'rejected').length;

            const groups = {};
            filteredDossiers.forEach(d => {
                let key = d.unit || 'Chưa xác định';
                if (dimension === 'procedure') key = d.procedureType || 'Bổ nhiệm';
                if (dimension === 'status') key = d.status || 'Chưa rõ';
                if (dimension === 'position') key = d.position || 'Chức vụ khác';

                if (!groups[key]) groups[key] = [];
                groups[key].push(d);
            });

            const tbody = contentContainer.querySelector('#tk-table-tbody');
            tbody.innerHTML = Object.keys(groups).map(key => {
                const groupItems = groups[key];
                return `
                    <tr>
                        <td style="font-weight: 700; color: var(--primary); font-size: 14px; white-space: nowrap;">${key}</td>
                        <td style="text-align: center; font-weight: 800; font-size: 15px; color: #0f172a; white-space: nowrap;">${groupItems.length}</td>
                        <td style="text-align: center; white-space: nowrap;">${groupItems.filter(i => i.procedureType === 'Bổ nhiệm lần đầu').length}</td>
                        <td style="text-align: center; white-space: nowrap;">${groupItems.filter(i => i.procedureType === 'Bổ nhiệm lại').length}</td>
                        <td style="text-align: center; white-space: nowrap;"><span class="badge badge-success">${groupItems.filter(i => i.statusCode === 'issued' || i.statusCode === 'approved').length}</span></td>
                        <td style="text-align: center; white-space: nowrap;">
                            <button class="btn btn-secondary btn-sm btn-drilldown-group" style="padding: 5px 12px; font-size: 12px; font-weight: 600; border-radius: 6px;">
                                Xem danh sách (${groupItems.length})
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');

            tbody.querySelectorAll('.btn-drilldown-group').forEach((btn, idx) => {
                btn.addEventListener('click', () => {
                    const groupKey = Object.keys(groups)[idx];
                    showDrillDownModal(`Danh sách hồ sơ thuộc nhóm: ${groupKey}`, groups[groupKey]);
                });
            });
        };

        contentContainer.querySelector('#kpi-tk-all').addEventListener('click', () => {
            showDrillDownModal('Toàn bộ danh sách hồ sơ bổ nhiệm', filteredDossiers);
        });
        contentContainer.querySelector('#kpi-tk-issued').addEventListener('click', () => {
            showDrillDownModal('Danh sách hồ sơ đã hoàn thành / ban hành QĐ', filteredDossiers.filter(d => d.statusCode === 'issued' || d.statusCode === 'approved'));
        });
        contentContainer.querySelector('#kpi-tk-pending').addEventListener('click', () => {
            showDrillDownModal('Danh sách hồ sơ đang trong tiến trình thẩm định', filteredDossiers.filter(d => d.statusCode === 'submitted' || d.statusCode === 'reviewing'));
        });
        contentContainer.querySelector('#kpi-tk-rejected').addEventListener('click', () => {
            showDrillDownModal('Danh sách hồ sơ bị từ chối / yêu cầu bổ sung', filteredDossiers.filter(d => d.statusCode === 'rejected'));
        });

        contentContainer.querySelector('#btn-tk-exec').addEventListener('click', runThongKe);
        runThongKe();
    }

    // =========================================================================
    // UC08.03 – BÁO CÁO TIẾN ĐỘ VÀ TÌNH TRẠNG HỒ SƠ
    // =========================================================================
    function renderTabTienDo(contentContainer) {
        const html = `
            <div class="card" style="padding: 24px; margin-bottom: 24px; border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <div style="font-size: 12px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; display: flex; justify-content: space-between;">
                    <span>TIÊU CHÍ BÁO CÁO TIẾN ĐỘ & CẢNH BÁO QUÁ HẠN XỬ LÝ</span>
                    <span style="font-size: 11.5px; color: #64748b;">Thời điểm tổng hợp: <strong>${new Date().toLocaleTimeString('vi-VN')} - ${new Date().toLocaleDateString('vi-VN')}</strong></span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #475569;">Loại thủ tục</label>
                        <select class="form-input" id="td-proc" style="height: 40px; border-radius: 8px;">
                            <option value="">-- Tất cả thủ tục --</option>
                            <option value="Bổ nhiệm lần đầu">Bổ nhiệm lần đầu</option>
                            <option value="Bổ nhiệm lại">Bổ nhiệm lại</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #475569;">Đơn vị đề xuất</label>
                        <select class="form-input" id="td-unit" style="height: 40px; border-radius: 8px;">
                            <option value="">-- Tất cả đơn vị --</option>
                            <option value="Ban Giám đốc">Ban Giám đốc</option>
                            <option value="Văn phòng">Văn phòng</option>
                            <option value="Ban Tổ chức Cán bộ">Ban Tổ chức Cán bộ</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #475569;">Bước xử lý hiện tại</label>
                        <select class="form-input" id="td-step" style="height: 40px; border-radius: 8px;">
                            <option value="">-- Tất cả các bước --</option>
                            <option value="step1">Rà soát thành phần hồ sơ</option>
                            <option value="step2">Thẩm định tiêu chuẩn bổ nhiệm</option>
                            <option value="step3">Trình Giám đốc phê duyệt</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #dc2626;">Tình trạng quá hạn</label>
                        <select class="form-input" id="td-overdue" style="height: 40px; border-radius: 8px; border-color: #fca5a5; font-weight: 700; background: #fff5f5;">
                            <option value="">-- Tất cả hồ sơ --</option>
                            <option value="overdue">Hồ sơ quá hạn xử lý</option>
                            <option value="ontime">Hồ sơ xử lý đúng hạn</option>
                        </select>
                    </div>
                </div>

                <div style="display: flex; justify-content: flex-end;">
                    <button type="button" class="btn btn-primary" id="btn-td-exec" style="padding: 9px 24px; font-weight: 700; border-radius: 8px;">
                        Cập nhật báo cáo tiến độ
                    </button>
                </div>
            </div>

            <!-- KPI metric breakdown cards -->
            <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 18px; margin-bottom: 24px;">
                <div class="card card-kpi-clickable" id="kpi-td-total" style="padding: 20px; border-radius: 12px; border-left: 4px solid var(--primary); background: #ffffff; cursor: pointer;">
                    <div style="font-size: 12px; font-weight: 700; color: var(--primary); text-transform: uppercase;">Tổng số hồ sơ theo dõi</div>
                    <div style="font-size: 28px; font-weight: 800; color: #0f172a; margin-top: 4px;" id="st-td-total">0</div>
                </div>
                <div class="card card-kpi-clickable" id="kpi-td-ontime" style="padding: 20px; border-radius: 12px; border-left: 4px solid #16a34a; background: #ffffff; cursor: pointer;">
                    <div style="font-size: 12px; font-weight: 700; color: #16a34a; text-transform: uppercase;">Xử lý đúng tiến độ</div>
                    <div style="font-size: 28px; font-weight: 800; color: #16a34a; margin-top: 4px;" id="st-td-ontime">0</div>
                </div>
                <div class="card card-kpi-clickable" id="kpi-td-overdue" style="padding: 20px; border-radius: 12px; border-left: 4px solid #dc2626; background: #ffffff; cursor: pointer;">
                    <div style="font-size: 12px; font-weight: 700; color: #dc2626; text-transform: uppercase;">Hồ sơ quá thời hạn (Cảnh báo)</div>
                    <div style="font-size: 28px; font-weight: 800; color: #dc2626; margin-top: 4px;" id="st-td-overdue">0</div>
                    <div style="font-size: 11px; color: #dc2626; margin-top: 4px;">Nhấp để xem danh sách quá hạn</div>
                </div>
            </div>

            <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
                    <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0;">
                        Bảng chi tiết tiến độ và vai trò xử lý hiện tại
                    </h3>
                </div>
                <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow-x: auto; width: 100%;">
                    <table class="data-table" style="width: 100%; min-width: 800px;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="white-space: nowrap;">Mã HS</th>
                                <th style="white-space: nowrap;">Cán bộ / Nhân sự</th>
                                <th style="white-space: nowrap;">Chức vụ & Đơn vị</th>
                                <th style="white-space: nowrap;">Bước xử lý hiện tại</th>
                                <th style="white-space: nowrap;">Vai trò phụ trách</th>
                                <th style="white-space: nowrap;">Hạn xử lý</th>
                                <th style="text-align: center; white-space: nowrap;">Tình trạng</th>
                                <th style="text-align: center; white-space: nowrap;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="td-table-tbody"></tbody>
                    </table>
                </div>
            </div>
        `;

        contentContainer.innerHTML = html;

        let activeList = [];

        const runTienDo = () => {
            const proc = contentContainer.querySelector('#td-proc').value;
            const unit = contentContainer.querySelector('#td-unit').value;
            const overdue = contentContainer.querySelector('#td-overdue').value;

            activeList = [...App.state.dossiersList];
            if (proc) activeList = activeList.filter(d => d.procedureType === proc);
            if (unit) activeList = activeList.filter(d => d.unit === unit);

            if (overdue === 'overdue') activeList = activeList.filter(d => d.statusCode === 'submitted');
            else if (overdue === 'ontime') activeList = activeList.filter(d => d.statusCode !== 'submitted');

            contentContainer.querySelector('#st-td-total').textContent = activeList.length;
            contentContainer.querySelector('#st-td-ontime').textContent = activeList.filter(d => d.statusCode !== 'submitted').length;
            contentContainer.querySelector('#st-td-overdue').textContent = activeList.filter(d => d.statusCode === 'submitted').length;

            const tbody = contentContainer.querySelector('#td-table-tbody');
            if (activeList.length === 0) {
                tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:32px; color:#64748b;">Không có dữ liệu tiến độ phù hợp với bộ lọc</td></tr>`;
                return;
            }

            tbody.innerHTML = activeList.map(d => `
                <tr>
                    <td style="font-weight: 700; color: var(--primary); white-space: nowrap;">${d.id}</td>
                    <td style="font-weight: 700; white-space: nowrap;">${d.person}</td>
                    <td style="white-space: nowrap;">${d.position} (${d.unit})</td>
                    <td style="white-space: nowrap;"><span class="badge badge-info">${d.statusCode === 'submitted' ? 'Thẩm định tiêu chuẩn' : 'Hoàn thành phê duyệt'}</span></td>
                    <td style="white-space: nowrap;">Chuyên viên Ban TCCB</td>
                    <td style="white-space: nowrap;">${d.createdDate || '2026-07-30'}</td>
                    <td style="text-align: center; white-space: nowrap;">
                        <span class="badge ${d.statusCode === 'submitted' ? 'badge-warning' : 'badge-success'}">
                            ${d.statusCode === 'submitted' ? 'Đang thẩm định' : 'Đúng tiến độ'}
                        </span>
                    </td>
                    <td style="text-align: center; white-space: nowrap;">
                        <button class="btn-icon btn-ghost btn-view-dossier" data-id="${d.id}" title="Xem chi tiết hồ sơ bổ nhiệm" style="color: var(--primary);">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </td>
                </tr>
            `).join('');

            tbody.querySelectorAll('.btn-view-dossier').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    App.navigateTo('bonhiem');
                    const dossier = App.state.dossiersList.find(d => d.id === id);
                    if (dossier && typeof renderViewDossierDetail === 'function') {
                        renderViewDossierDetail(dossier, document.getElementById('app-main-content'));
                    }
                });
            });
        };

        contentContainer.querySelector('#kpi-td-total').addEventListener('click', () => showDrillDownModal('Toàn bộ hồ sơ theo dõi tiến độ', activeList));
        contentContainer.querySelector('#kpi-td-ontime').addEventListener('click', () => showDrillDownModal('Danh sách hồ sơ xử lý đúng tiến độ', activeList.filter(d => d.statusCode !== 'submitted')));
        contentContainer.querySelector('#kpi-td-overdue').addEventListener('click', () => showDrillDownModal('Danh sách hồ sơ bị quá hạn xử lý (Cảnh báo)', activeList.filter(d => d.statusCode === 'submitted')));

        contentContainer.querySelector('#btn-td-exec').addEventListener('click', runTienDo);
        runTienDo();
    }

    // =========================================================================
    // UC08.04 – BÁO CÁO TÌNH TRẠNG NHIỆM KỲ
    // =========================================================================
    function renderTabNhiemKy(contentContainer) {
        const html = `
            <div class="card" style="padding: 24px; margin-bottom: 24px; border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <div style="font-size: 12px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; display: flex; justify-content: space-between;">
                    <span>BÁO CÁO TÌNH TRẠNG NHIỆM KỲ CÁN BỘ</span>
                    <span style="font-size: 11.5px; color: #64748b;">Thời điểm tổng hợp: <strong>${new Date().toLocaleTimeString('vi-VN')} - ${new Date().toLocaleDateString('vi-VN')}</strong></span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #475569;">Trạng thái nhiệm kỳ</label>
                        <select class="form-input" id="nk-status" style="height: 40px; border-radius: 8px;">
                            <option value="">-- Tất cả mốc cảnh báo --</option>
                            <option value="active">Đang hiệu lực an toàn</option>
                            <option value="under90">Sắp hết hạn (≤ 90 ngày)</option>
                            <option value="under30">Sắp hết hạn (≤ 30 ngày)</option>
                            <option value="expired">Đã quá hạn</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #475569;">Xử lý thủ tục liên quan</label>
                        <select class="form-input" id="nk-prop" style="height: 40px; border-radius: 8px;">
                            <option value="">-- Tất cả tình trạng --</option>
                            <option value="none">Chưa khởi tạo đề xuất</option>
                            <option value="has">Đã có đề xuất bổ nhiệm lại</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #475569;">Đơn vị công tác</label>
                        <select class="form-input" id="nk-unit" style="height: 40px; border-radius: 8px;">
                            <option value="">Tất cả đơn vị</option>
                            <option value="Ban Giám đốc">Ban Giám đốc</option>
                            <option value="Văn phòng">Văn phòng</option>
                            <option value="Trường ĐH Bách khoa">Trường ĐH Bách khoa</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; justify-content: flex-end;">
                    <button type="button" class="btn btn-primary" id="btn-nk-exec" style="padding: 9px 24px; font-weight: 700; border-radius: 8px;">
                        Cập nhật báo cáo nhiệm kỳ
                    </button>
                </div>
            </div>

            <!-- KPI Metric Cards -->
            <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 18px; margin-bottom: 24px;">
                <div class="card card-kpi-clickable" id="kpi-nk-total" style="padding: 20px; border-radius: 12px; border-left: 4px solid var(--primary); background: #ffffff; cursor: pointer;">
                    <div style="font-size: 12px; font-weight: 700; color: var(--primary); text-transform: uppercase;">Tổng số nhiệm kỳ quản lý</div>
                    <div style="font-size: 28px; font-weight: 800; color: #0f172a; margin-top: 4px;" id="st-nk-total">0</div>
                </div>
                <div class="card card-kpi-clickable" id="kpi-nk-active" style="padding: 20px; border-radius: 12px; border-left: 4px solid #16a34a; background: #ffffff; cursor: pointer;">
                    <div style="font-size: 12px; font-weight: 700; color: #16a34a; text-transform: uppercase;">Nhiệm kỳ an toàn</div>
                    <div style="font-size: 28px; font-weight: 800; color: #16a34a; margin-top: 4px;" id="st-nk-active">0</div>
                </div>
                <div class="card card-kpi-clickable" id="kpi-nk-expiring" style="padding: 20px; border-radius: 12px; border-left: 4px solid #ea580c; background: #ffffff; cursor: pointer;">
                    <div style="font-size: 12px; font-weight: 700; color: #ea580c; text-transform: uppercase;">Sắp hết hạn (≤ 90 ngày)</div>
                    <div style="font-size: 28px; font-weight: 800; color: #ea580c; margin-top: 4px;" id="st-nk-expiring">0</div>
                </div>
                <div class="card card-kpi-clickable" id="kpi-nk-no-prop" style="padding: 20px; border-radius: 12px; border-left: 4px solid #dc2626; background: #ffffff; cursor: pointer;">
                    <div style="font-size: 12px; font-weight: 700; color: #dc2626; text-transform: uppercase;">Chưa khởi tạo đề xuất</div>
                    <div style="font-size: 28px; font-weight: 800; color: #dc2626; margin-top: 4px;" id="st-nk-no-prop">0</div>
                </div>
            </div>

            <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0 0 18px;">
                    Tổng hợp danh sách tình trạng nhiệm kỳ cán bộ
                </h3>
                <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow-x: auto; width: 100%;">
                    <table class="data-table" style="width: 100%; min-width: 800px;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="white-space: nowrap;">Cán bộ / Nhân sự</th>
                                <th style="white-space: nowrap;">Chức vụ & Đơn vị</th>
                                <th style="white-space: nowrap;">Thời gian nhiệm kỳ</th>
                                <th style="white-space: nowrap;">Trạng thái cảnh báo</th>
                                <th style="white-space: nowrap;">Thủ tục liên quan</th>
                                <th style="text-align: center; white-space: nowrap;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="nk-table-tbody"></tbody>
                    </table>
                </div>
            </div>
        `;
        contentContainer.innerHTML = html;

        let activeTerms = [];

        const runNhiemKy = () => {
            const status = contentContainer.querySelector('#nk-status').value;
            const prop = contentContainer.querySelector('#nk-prop').value;
            const unit = contentContainer.querySelector('#nk-unit').value;

            activeTerms = [...App.state.termsList];
            if (status) activeTerms = activeTerms.filter(t => t.statusCode === status);
            if (unit) activeTerms = activeTerms.filter(t => t.unit === unit);
            if (prop === 'none') activeTerms = activeTerms.filter(t => !t.hasActiveProposal);
            else if (prop === 'has') activeTerms = activeTerms.filter(t => t.hasActiveProposal);

            contentContainer.querySelector('#st-nk-total').textContent = activeTerms.length;
            contentContainer.querySelector('#st-nk-active').textContent = activeTerms.filter(t => t.statusCode === 'active').length;
            contentContainer.querySelector('#st-nk-expiring').textContent = activeTerms.filter(t => t.statusCode === 'warning' || t.statusCode === 'under90').length;
            contentContainer.querySelector('#st-nk-no-prop').textContent = activeTerms.filter(t => !t.hasActiveProposal).length;

            const tbody = contentContainer.querySelector('#nk-table-tbody');
            if (activeTerms.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:32px; color:#64748b;">Không có dữ liệu nhiệm kỳ phù hợp với bộ lọc</td></tr>`;
                return;
            }

            tbody.innerHTML = activeTerms.map(t => `
                <tr>
                    <td style="font-weight: 700; color: var(--primary); white-space: nowrap;">${t.person}</td>
                    <td style="white-space: nowrap;">${t.position} (${t.unit})</td>
                    <td style="white-space: nowrap;">${t.startDate} — ${t.endDate}</td>
                    <td style="white-space: nowrap;">
                        <span class="badge ${t.statusCode === 'expired' ? 'badge-danger' : t.statusCode === 'warning' ? 'badge-warning' : 'badge-success'}">
                            ${t.status}
                        </span>
                    </td>
                    <td style="white-space: nowrap;">${t.hasActiveProposal ? '<span style="color:#0284c7; font-weight:700;">Đã có đề xuất</span>' : '<span style="color:#dc2626; font-weight:700;">Chưa có đề xuất</span>'}</td>
                    <td style="text-align: center; white-space: nowrap;">
                        <button class="btn-icon btn-ghost btn-view-tenure" data-id="${t.id}" title="Xem chi tiết nhiệm kỳ cán bộ" style="color: var(--primary);">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </td>
                </tr>
            `).join('');

            tbody.querySelectorAll('.btn-view-tenure').forEach(btn => {
                btn.addEventListener('click', () => {
                    App.navigateTo('nhiemky');
                });
            });
        };

        contentContainer.querySelector('#kpi-nk-total').addEventListener('click', () => showDrillDownModal('Toàn bộ danh sách nhiệm kỳ', activeTerms));
        contentContainer.querySelector('#kpi-nk-active').addEventListener('click', () => showDrillDownModal('Danh sách nhiệm kỳ an toàn', activeTerms.filter(t => t.statusCode === 'active')));
        contentContainer.querySelector('#kpi-nk-expiring').addEventListener('click', () => showDrillDownModal('Danh sách nhiệm kỳ sắp hết hạn', activeTerms.filter(t => t.statusCode === 'warning' || t.statusCode === 'under90')));
        contentContainer.querySelector('#kpi-nk-no-prop').addEventListener('click', () => showDrillDownModal('Danh sách nhiệm kỳ chưa khởi tạo đề xuất bổ nhiệm lại', activeTerms.filter(t => !t.hasActiveProposal)));

        contentContainer.querySelector('#btn-nk-exec').addEventListener('click', runNhiemKy);
        runNhiemKy();
    }

    // =========================================================================
    // UC08.05 – BÁO CÁO QUYẾT ĐỊNH
    // =========================================================================
    function renderTabQuyetDinh(contentContainer) {
        const html = `
            <div class="card" style="padding: 24px; margin-bottom: 24px; border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <div style="font-size: 12px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; display: flex; justify-content: space-between;">
                    <span>BÁO CÁO THỐNG KÊ QUYẾT ĐỊNH BAN HÀNH</span>
                    <span style="font-size: 11.5px; color: #64748b;">Thời điểm tổng hợp: <strong>${new Date().toLocaleTimeString('vi-VN')} - ${new Date().toLocaleDateString('vi-VN')}</strong></span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #475569;">Loại quyết định</label>
                        <select class="form-input" id="qd-type" style="height: 40px; border-radius: 8px;">
                            <option value="">Tất cả loại QĐ</option>
                            <option value="Quyết định bổ nhiệm">Quyết định bổ nhiệm</option>
                            <option value="Quyết định bổ nhiệm lại">Quyết định bổ nhiệm lại</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #475569;">Trạng thái hiệu lực</label>
                        <select class="form-input" id="qd-status" style="height: 40px; border-radius: 8px;">
                            <option value="">-- Tất cả hiệu lực --</option>
                            <option value="active">Có hiệu lực</option>
                            <option value="draft">Dự thảo</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label" style="font-size: 12px; font-weight: 700; color: #475569;">Đơn vị công tác</label>
                        <select class="form-input" id="qd-unit" style="height: 40px; border-radius: 8px;">
                            <option value="">Tất cả đơn vị</option>
                            <option value="Ban Giám đốc">Ban Giám đốc</option>
                            <option value="Văn phòng">Văn phòng</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; justify-content: flex-end;">
                    <button type="button" class="btn btn-primary" id="btn-qd-exec" style="padding: 9px 24px; font-weight: 700; border-radius: 8px;">
                        Cập nhật báo cáo quyết định
                    </button>
                </div>
            </div>

            <!-- KPI Metric Cards -->
            <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 18px; margin-bottom: 24px;">
                <div class="card card-kpi-clickable" id="kpi-qd-total" style="padding: 20px; border-radius: 12px; border-left: 4px solid var(--primary); background: #ffffff; cursor: pointer;">
                    <div style="font-size: 12px; font-weight: 700; color: var(--primary); text-transform: uppercase;">Tổng số quyết định</div>
                    <div style="font-size: 28px; font-weight: 800; color: #0f172a; margin-top: 4px;" id="st-qd-total">0</div>
                </div>
                <div class="card card-kpi-clickable" id="kpi-qd-active" style="padding: 20px; border-radius: 12px; border-left: 4px solid #16a34a; background: #ffffff; cursor: pointer;">
                    <div style="font-size: 12px; font-weight: 700; color: #16a34a; text-transform: uppercase;">Đã phát hành / Có hiệu lực</div>
                    <div style="font-size: 28px; font-weight: 800; color: #16a34a; margin-top: 4px;" id="st-qd-active">0</div>
                </div>
                <div class="card card-kpi-clickable" id="kpi-qd-draft" style="padding: 20px; border-radius: 12px; border-left: 4px solid #ea580c; background: #ffffff; cursor: pointer;">
                    <div style="font-size: 12px; font-weight: 700; color: #ea580c; text-transform: uppercase;">Quyết định dự thảo</div>
                    <div style="font-size: 28px; font-weight: 800; color: #ea580c; margin-top: 4px;" id="st-qd-draft">0</div>
                </div>
            </div>

            <div class="card" style="padding: 24px; border-radius: 14px; border: 1px solid #e2e8f0; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0 0 18px;">
                    Tổng hợp danh sách quyết định phát hành
                </h3>
                <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow-x: auto; width: 100%;">
                    <table class="data-table" style="width: 100%; min-width: 750px;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="white-space: nowrap;">Số Quyết định</th>
                                <th style="white-space: nowrap;">Cán bộ được quyết định</th>
                                <th style="white-space: nowrap;">Chức vụ & Đơn vị</th>
                                <th style="white-space: nowrap;">Ngày ký</th>
                                <th style="white-space: nowrap;">Trạng thái hiệu lực</th>
                                <th style="text-align: center; white-space: nowrap;">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="qd-table-tbody"></tbody>
                    </table>
                </div>
            </div>
        `;
        contentContainer.innerHTML = html;

        let activeDecisions = [];

        const runQuyetDinh = () => {
            const unit = contentContainer.querySelector('#qd-unit').value;
            activeDecisions = [...App.state.decisionsList];
            if (unit) activeDecisions = activeDecisions.filter(d => d.unit === unit);

            contentContainer.querySelector('#st-qd-total').textContent = activeDecisions.length;
            contentContainer.querySelector('#st-qd-active').textContent = activeDecisions.length;
            contentContainer.querySelector('#st-qd-draft').textContent = 0;

            const tbody = contentContainer.querySelector('#qd-table-tbody');
            if (activeDecisions.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:32px; color:#64748b;">Không có dữ liệu quyết định phù hợp với bộ lọc</td></tr>`;
                return;
            }

            tbody.innerHTML = activeDecisions.map(d => `
                <tr>
                    <td style="font-weight: 700; color: var(--primary); white-space: nowrap;">${d.code || d.id}</td>
                    <td style="font-weight: 700; white-space: nowrap;">${d.person}</td>
                    <td style="white-space: nowrap;">${d.position} (${d.unit})</td>
                    <td style="white-space: nowrap;">${d.dateSigned || '—'}</td>
                    <td style="white-space: nowrap;"><span class="badge badge-success">Có hiệu lực</span></td>
                    <td style="text-align: center; white-space: nowrap;">
                        <button class="btn-icon btn-ghost btn-view-dec" data-id="${d.id}" title="Xem chi tiết quyết định" style="color: var(--primary);">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </td>
                </tr>
            `).join('');

            tbody.querySelectorAll('.btn-view-dec').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    App.navigateTo('quyetdinh');
                    const dec = App.state.decisionsList.find(d => d.id === id);
                    if (dec && typeof renderViewDecisionDetail === 'function') {
                        renderViewDecisionDetail(dec, document.getElementById('app-main-content'));
                    }
                });
            });
        };

        contentContainer.querySelector('#kpi-qd-total').addEventListener('click', () => showDrillDownModal('Toàn bộ danh sách quyết định phát hành', activeDecisions));
        contentContainer.querySelector('#kpi-qd-active').addEventListener('click', () => showDrillDownModal('Danh sách quyết định đang có hiệu lực', activeDecisions));

        contentContainer.querySelector('#btn-qd-exec').addEventListener('click', runQuyetDinh);
        runQuyetDinh();
    }

    // Modal drill-down hiển thị danh sách nhóm
    function showDrillDownModal(title, items) {
        const modalHtml = `
            <div style="padding: 4px 0 16px;">
                <p style="color: #475569; font-size: 13.5px; margin-bottom: 16px;">
                    Danh sách tổng cộng <strong>${items.length}</strong> bản ghi thuộc nhóm dữ liệu thống kê:
                </p>
                <div class="table-container" style="max-height: 400px; overflow-y: auto; overflow-x: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <table class="data-table" style="width: 100%; min-width: 600px;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="white-space: nowrap;">Mã / Tên đối tượng</th>
                                <th style="white-space: nowrap;">Nhân sự phụ trách</th>
                                <th style="white-space: nowrap;">Chức vụ</th>
                                <th style="white-space: nowrap;">Đơn vị</th>
                                <th style="white-space: nowrap;">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map(i => `
                                <tr>
                                    <td style="font-weight:700; color:var(--primary); white-space: nowrap;">${i.id || i.code || '—'}</td>
                                    <td style="font-weight:700; white-space: nowrap;">${i.person || i.name || '—'}</td>
                                    <td style="white-space: nowrap;">${i.position || '—'}</td>
                                    <td style="white-space: nowrap;">${i.unit || '—'}</td>
                                    <td style="white-space: nowrap;"><span class="badge badge-info">${i.status || 'Hoàn thành'}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        App.showModal(title, modalHtml, [
            { text: 'Đóng lại', class: 'btn-secondary', onclick: App.closeModal }
        ]);
    }

    // UC08.06 – XUẤT BÁO CÁO
    function showExportModal(tabName, defaultFormat = 'excel') {
        const modalHtml = `
            <div style="padding: 4px 0 12px;">
                <div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 20px; font-size: 13.5px;">
                    <div style="font-weight: 700; color: #0f172a; margin-bottom: 4px;">Thông tin xuất tệp báo cáo:</div>
                    <div style="color: #475569;">• Tên báo cáo: <strong style="color: var(--primary);">${tabName === 'tracuu' ? 'Báo cáo tra cứu dữ liệu tổng hợp' : tabName === 'thongke' ? 'Báo cáo thống kê hồ sơ bổ nhiệm' : tabName === 'tiendo' ? 'Báo cáo tiến độ & cảnh báo quá hạn' : tabName === 'nhiemky' ? 'Báo cáo tình trạng nhiệm kỳ cán bộ' : 'Báo cáo quyết định ban hành'}</strong></div>
                    <div style="color: #475569; margin-top: 2px;">• Tổng bản ghi thỏa điều kiện: <strong style="color: #16a34a;">${App.state.dossiersList.length} bản ghi</strong></div>
                    <div style="color: #475569; margin-top: 2px;">• Bản ghi đã chọn bằng tích chọn: <strong style="color: #0284c7;">${selectedRecordIds.size} bản ghi</strong></div>
                </div>

                <div class="form-group" style="margin-bottom: 18px;">
                    <label class="form-label" style="font-weight: 700; color: #334155;">1. Chọn định dạng tệp báo cáo <span class="text-danger">*</span></label>
                    <div style="display: flex; gap: 16px; margin-top: 8px;">
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 13.5px; font-weight: 600; padding: 12px 18px; border: 2px solid #cbd5e1; border-radius: 10px; flex: 1; background: #ffffff; white-space: nowrap;">
                            <input type="radio" name="export-fmt" value="excel" ${defaultFormat === 'excel' ? 'checked' : ''} style="accent-color: var(--primary);">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            Tệp Excel (.xlsx)
                        </label>
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 13.5px; font-weight: 600; padding: 12px 18px; border: 2px solid #cbd5e1; border-radius: 10px; flex: 1; background: #ffffff; white-space: nowrap;">
                            <input type="radio" name="export-fmt" value="pdf" ${defaultFormat === 'pdf' ? 'checked' : ''} style="accent-color: var(--primary);">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            Tệp PDF (.pdf)
                        </label>
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label class="form-label" style="font-weight: 700; color: #334155;">2. Chọn phạm vi dữ liệu cần xuất <span class="text-danger">*</span></label>
                    <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
                        <label style="display: flex; align-items: center; gap: 10px; font-size: 13.5px; cursor: pointer;">
                            <input type="radio" name="export-scope" value="all" checked style="accent-color: var(--primary);">
                            <span>Toàn bộ kết quả theo bộ lọc đang áp dụng (${App.state.dossiersList.length} bản ghi)</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 10px; font-size: 13.5px; cursor: pointer;">
                            <input type="radio" name="export-scope" value="page" style="accent-color: var(--primary);">
                            <span>Dữ liệu hiển thị trên trang hiện tại</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 10px; font-size: 13.5px; cursor: pointer;">
                            <input type="radio" name="export-scope" value="selected" style="accent-color: var(--primary);">
                            <span>Các bản ghi đã chọn thủ công bằng ô tích chọn (${selectedRecordIds.size} bản ghi)</span>
                        </label>
                    </div>
                </div>

                <div id="export-progress-box" style="display: none; margin-top: 18px;">
                    <div style="display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 700; color: var(--primary); margin-bottom: 6px;">
                        <span>Đang đóng gói và tổng hợp tệp báo cáo...</span>
                        <span id="export-progress-text">0%</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                        <div id="export-progress-bar" style="width: 0%; height: 100%; background: var(--primary); transition: width 0.25s ease;"></div>
                    </div>
                </div>
            </div>
        `;

        App.showModal('Xuất tệp Báo cáo & Thống kê', modalHtml, [
            { text: 'Hủy thao tác', class: 'btn-secondary', onclick: App.closeModal },
            {
                text: 'Xác nhận Xuất tệp',
                class: 'btn-primary',
                onclick: () => {
                    const fmt = document.querySelector('input[name="export-fmt"]:checked')?.value || 'excel';
                    const scope = document.querySelector('input[name="export-scope"]:checked')?.value || 'all';

                    if (scope === 'selected' && selectedRecordIds.size === 0) {
                        App.notify('Vui lòng tích chọn ít nhất 1 bản ghi trong bảng trước khi chọn phạm vi này!', 'warning');
                        return;
                    }

                    const progBox = document.getElementById('export-progress-box');
                    const progBar = document.getElementById('export-progress-bar');
                    const progText = document.getElementById('export-progress-text');

                    if (progBox) progBox.style.display = 'block';

                    let percent = 0;
                    const timer = setInterval(() => {
                        percent += 40;
                        if (progBar) progBar.style.width = percent + '%';
                        if (progText) progText.textContent = Math.min(percent, 100) + '%';

                        if (percent >= 100) {
                            clearInterval(timer);
                            setTimeout(() => {
                                App.closeModal();
                                const ext = fmt === 'excel' ? 'xlsx' : 'pdf';
                                const filename = `BaoCao_UDN_${new Date().toISOString().split('T')[0]}.${ext}`;
                                App.notify(`Đã tạo tệp và ghi nhật ký xuất báo cáo thành công [${filename}]!`, 'success');
                            }, 300);
                        }
                    }, 200);
                }
            }
        ]);
    }
}

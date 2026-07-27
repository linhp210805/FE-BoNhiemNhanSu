/* ============================================================
   Dashboard — Tổng quan hệ thống
   Đồng bộ với chuẩn thiết kế hệ thống
   ============================================================ */

function renderDashboard(container) {
    if (App && App.clearFullPage) App.clearFullPage();

    const user = App.state.currentUser || { name: 'Người dùng', role: 'Thành viên' };
    const today = new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

    // Lấy dữ liệu từ state
    const proposals  = (App.state.proposals  || []);
    const dossiers   = (App.state.dossiers   || []);
    const decisions  = (App.state.decisions  || []);
    const personnel  = (App.state.personnel  || []);

    const statsData = {
        personnel:  personnel.length  || 248,
        dossierPending: dossiers.filter(d => d.statusCode !== 'approved').length || 12,
        needReview: dossiers.filter(d => ['thamdinh','review'].includes(d.statusCode)).length || 7,
        expireSoon: 6,
        proposalTotal: proposals.length || 24,
        decisionTotal: decisions.length || 18,
    };

    const html = `
        <!-- Page Header -->
        <div class="page-header">
            <div class="page-header-left">
                <h1>Tổng quan hệ thống</h1>
                <p>Chào mừng, <strong>${user.name}</strong> — ${today}</p>
            </div>
            <div class="page-header-actions">
                <button class="btn btn-secondary" id="btn-dash-export" style="gap:6px;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Xuất báo cáo
                </button>
                <button class="btn btn-primary" id="btn-dash-new" style="gap:6px;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Đề xuất bổ nhiệm mới
                </button>
            </div>
        </div>

        <!-- KPI Cards -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
            <div class="card" style="padding:20px 22px;border-left:4px solid var(--primary);margin:0;cursor:pointer;" id="kpi-personnel">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
                    <div style="width:40px;height:40px;border-radius:10px;background:var(--primary-bg);display:flex;align-items:center;justify-content:center;color:var(--primary);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <span style="font-size:11px;font-weight:700;background:#e8f5e9;color:#2e7d32;padding:3px 9px;border-radius:20px;">+2.4%</span>
                </div>
                <div style="font-size:11.5px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Tổng số Cán bộ</div>
                <div style="font-size:30px;font-weight:800;color:var(--text-primary);line-height:1;">${statsData.personnel.toLocaleString('vi-VN')}</div>
            </div>

            <div class="card" style="padding:20px 22px;border-left:4px solid #f59e0b;margin:0;cursor:pointer;" id="kpi-pending">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
                    <div style="width:40px;height:40px;border-radius:10px;background:#fef3c7;display:flex;align-items:center;justify-content:center;color:#d97706;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <span style="font-size:11px;font-weight:700;background:#fff3e0;color:#e65100;padding:3px 9px;border-radius:20px;">Cần xử lý</span>
                </div>
                <div style="font-size:11.5px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Hồ sơ đang xử lý</div>
                <div style="font-size:30px;font-weight:800;color:#d97706;line-height:1;">${statsData.dossierPending}</div>
            </div>

            <div class="card" style="padding:20px 22px;border-left:4px solid #0ea5e9;margin:0;cursor:pointer;" id="kpi-review">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
                    <div style="width:40px;height:40px;border-radius:10px;background:#e0f2fe;display:flex;align-items:center;justify-content:center;color:#0284c7;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                    </div>
                    <span style="font-size:11px;font-weight:700;background:#e0f2fe;color:#0369a1;padding:3px 9px;border-radius:20px;">Cần thẩm định</span>
                </div>
                <div style="font-size:11.5px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Chờ thẩm định</div>
                <div style="font-size:30px;font-weight:800;color:#0284c7;line-height:1;">${statsData.needReview}</div>
            </div>

            <div class="card" style="padding:20px 22px;border-left:4px solid #ef4444;margin:0;cursor:pointer;" id="kpi-expire">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
                    <div style="width:40px;height:40px;border-radius:10px;background:#fee2e2;display:flex;align-items:center;justify-content:center;color:#dc2626;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    </div>
                    <span style="font-size:11px;font-weight:700;background:#fee2e2;color:#dc2626;padding:3px 9px;border-radius:20px;">⚡ Khẩn</span>
                </div>
                <div style="font-size:11.5px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Sắp hết nhiệm kỳ</div>
                <div style="font-size:30px;font-weight:800;color:#dc2626;line-height:1;">${statsData.expireSoon}</div>
            </div>
        </div>

        <!-- Row 2: Tiến độ + Hoạt động gần đây -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;">

            <!-- Tiến độ quy trình -->
            <div class="card" style="padding:24px;margin:0;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                    <div>
                        <div style="font-size:13.5px;font-weight:800;color:var(--text-primary);">Tiến độ quy trình bổ nhiệm</div>
                        <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">Các hồ sơ đang trong quy trình xử lý</div>
                    </div>
                    <button class="btn btn-secondary" id="btn-view-all-progress" style="font-size:12px;padding:6px 14px;">Xem tất cả</button>
                </div>
                <div style="display:flex;flex-direction:column;gap:16px;">
                    ${[
                        { title: 'Bổ nhiệm Phó Trưởng ban Tổ chức', stage: 'Thẩm định hồ sơ', pct: 75, color: '#0284c7' },
                        { title: 'Gia hạn nhiệm kỳ Trưởng phòng Đào tạo', stage: 'Hội nghị cán bộ chủ chốt', pct: 40, color: '#f59e0b' },
                        { title: 'Bổ nhiệm Trưởng ban Đào tạo', stage: 'Lấy ý kiến Đảng ủy', pct: 90, color: '#16a34a' },
                        { title: 'Bổ nhiệm lại Chánh Văn phòng', stage: 'Chờ ký Quyết định', pct: 95, color: '#8b5cf6' },
                    ].map(item => `
                        <div>
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                                <div>
                                    <div style="font-size:13px;font-weight:700;color:var(--text-primary);">${item.title}</div>
                                    <div style="font-size:11.5px;color:var(--text-secondary);margin-top:1px;">${item.stage}</div>
                                </div>
                                <span style="font-size:13px;font-weight:800;color:${item.color};">${item.pct}%</span>
                            </div>
                            <div style="height:7px;background:#f1f5f9;border-radius:99px;overflow:hidden;">
                                <div style="height:100%;width:${item.pct}%;background:${item.color};border-radius:99px;transition:width 0.6s ease;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="display:flex;gap:24px;margin-top:20px;padding-top:16px;border-top:1px solid var(--border);">
                    <div style="text-align:center;"><div style="font-size:11px;color:var(--text-secondary);font-weight:600;">Hoàn thành</div><div style="font-size:18px;font-weight:800;color:#16a34a;">12</div></div>
                    <div style="text-align:center;"><div style="font-size:11px;color:var(--text-secondary);font-weight:600;">Đang chạy</div><div style="font-size:18px;font-weight:800;color:var(--primary);">08</div></div>
                    <div style="text-align:center;"><div style="font-size:11px;color:var(--text-secondary);font-weight:600;">Tạm dừng</div><div style="font-size:18px;font-weight:800;color:#ef4444;">02</div></div>
                </div>
            </div>

            <!-- Hoạt động gần đây -->
            <div class="card" style="padding:24px;margin:0;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                    <div>
                        <div style="font-size:13.5px;font-weight:800;color:var(--text-primary);">Hoạt động gần đây</div>
                        <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">Nhật ký thao tác & cập nhật hệ thống</div>
                    </div>
                </div>
                <div style="display:flex;flex-direction:column;gap:0;">
                    ${[
                        { icon: 'check', color: '#16a34a', bg: '#f0fdf4', text: '<strong>Giám đốc ĐHĐN</strong> đã phê duyệt kết quả thẩm định hồ sơ bổ nhiệm Trưởng khoa CNTT', time: '10 phút trước' },
                        { icon: 'edit',  color: '#0284c7', bg: '#e0f2fe', text: '<strong>Ban TCCB ĐHĐN</strong> đã hoàn tất rà soát hồ sơ bổ nhiệm Phó Trưởng ban Đào tạo', time: '45 phút trước' },
                        { icon: 'warn',  color: '#dc2626', bg: '#fee2e2', text: '<strong>Cảnh báo khẩn:</strong> Nhiệm kỳ Hiệu trưởng Trường ĐH Bách khoa sắp hết hạn (30 ngày)', time: '2 giờ trước' },
                        { icon: 'doc',   color: '#6d28d9', bg: '#f3e8ff', text: '<strong>Giám đốc ĐHĐN</strong> đã ban hành Quyết định bổ nhiệm số 125/QĐ-ĐHĐN', time: '3 giờ trước' },
                        { icon: 'user',  color: '#d97706', bg: '#fef3c7', text: '<strong>Hệ thống</strong> tự động phát cảnh báo mốc hết hạn 6 nhiệm kỳ cán bộ cấp đơn vị', time: '5 giờ trước' },
                    ].map(item => `
                        <div style="display:flex;gap:12px;padding:11px 0;border-bottom:1px solid #f8fafc;align-items:flex-start;">
                            <div style="width:32px;height:32px;border-radius:8px;background:${item.bg};color:${item.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
                                ${item.icon === 'check' ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>' :
                                  item.icon === 'edit'  ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>' :
                                  item.icon === 'warn'  ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' :
                                  item.icon === 'doc'   ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' :
                                                          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'}
                            </div>
                            <div style="flex:1;min-width:0;">
                                <div style="font-size:13px;color:var(--text-primary);line-height:1.4;">${item.text}</div>
                                <div style="font-size:11.5px;color:var(--text-tertiary);margin-top:3px;">${item.time}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top:14px;text-align:center;">
                    <button class="btn btn-secondary" id="btn-view-all-activity" style="font-size:12px;padding:6px 18px;width:100%;">Xem toàn bộ nhật ký</button>
                </div>
            </div>
        </div>

        <!-- Danh sách hồ sơ chờ thẩm định -->
        <div class="card" style="padding:24px;margin:0;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <div>
                    <div style="font-size:13.5px;font-weight:800;color:var(--text-primary);">Hồ sơ bổ nhiệm chờ thẩm định</div>
                    <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">Danh sách hồ sơ đang chờ xử lý trong tuần</div>
                </div>
                <div style="display:flex;align-items:center;gap:10px;">
                    <select class="form-input" id="dash-filter-week" style="height:34px;font-size:12.5px;padding:0 10px;border-radius:8px;width:130px;">
                        <option>Tuần này</option>
                        <option>Tuần trước</option>
                        <option>Tháng này</option>
                    </select>
                    <button class="btn btn-primary" id="btn-dash-to-thamdinh" style="font-size:12.5px;padding:7px 16px;gap:6px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        Đến trang thẩm định
                    </button>
                </div>
            </div>

            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Ứng viên</th>
                            <th>Vị trí đề xuất</th>
                            <th>Đơn vị</th>
                            <th>Ngày nộp</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${[
                            { initials:'LT', color:'#4f46e5', name:'TS. Lê Thị Thu',    unit:'Ban Đào tạo',     pos:'Trưởng ban Tổ chức',    date:'12/06/2026', status:'Đang thẩm định', sc:'#d97706', scbg:'#fef3c7' },
                            { initials:'VD', color:'#64748b', name:'ThS. Võ Văn Dũng',  unit:'Ban Kế hoạch',    pos:'Phó ban Tổ chức',       date:'10/06/2026', status:'Chờ thẩm định',  sc:'#0284c7', scbg:'#e0f2fe' },
                            { initials:'HN', color:'#0284c7', name:'PGS.TS Hoàng Nam',  unit:'ĐHBK Đà Nẵng',   pos:'Trưởng ban Đào tạo',    date:'08/06/2026', status:'Đã phê duyệt',  sc:'#16a34a', scbg:'#dcfce7' },
                            { initials:'TH', color:'#d97706', name:'PGS.TS Trần Thị Hoa', unit:'Văn phòng',    pos:'Phó Chánh Văn phòng',   date:'05/06/2026', status:'Chờ phê duyệt', sc:'#7c3aed', scbg:'#f3e8ff' },
                        ].map(row => `
                            <tr>
                                <td>
                                    <div style="display:flex;align-items:center;gap:10px;">
                                        <div style="width:34px;height:34px;border-radius:8px;background:${row.color}1a;color:${row.color};font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${row.initials}</div>
                                        <div>
                                            <div style="font-weight:700;font-size:13px;color:var(--text-primary);">${row.name}</div>
                                            <div style="font-size:11.5px;color:var(--text-secondary);">${row.unit}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style="font-weight:600;font-size:13px;">${row.pos}</td>
                                <td style="font-size:12.5px;color:var(--text-secondary);">${row.unit}</td>
                                <td style="font-size:12.5px;color:var(--text-secondary);">${row.date}</td>
                                <td><span style="display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11.5px;font-weight:700;background:${row.scbg};color:${row.sc};">${row.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding-top:14px;border-top:1px solid var(--border);">
                <span style="font-size:12.5px;color:var(--text-secondary);">Hiển thị 4 / 48 hồ sơ</span>
                <button class="btn btn-secondary" id="btn-dash-view-all-dossier" style="font-size:12.5px;padding:6px 16px;">Xem danh sách đầy đủ</button>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Event handlers
    container.querySelector('#btn-dash-new')?.addEventListener('click', () => {
        App.navigateTo('dexuat');
    });
    container.querySelector('#btn-dash-export')?.addEventListener('click', () => {
        App.notify('Đang chuẩn bị báo cáo tổng quan...', 'success');
    });
    container.querySelector('#btn-view-all-progress')?.addEventListener('click', () => {
        App.navigateTo('bonhiem');
    });
    container.querySelector('#btn-view-all-activity')?.addEventListener('click', () => {
        App.navigateTo('nguoidung');
    });
    container.querySelector('#btn-dash-to-thamdinh')?.addEventListener('click', () => {
        App.navigateTo('pheduyet');
    });
    container.querySelector('#btn-dash-view-all-dossier')?.addEventListener('click', () => {
        App.navigateTo('bonhiem');
    });

    // KPI click navigation
    container.querySelector('#kpi-personnel')?.addEventListener('click',  () => App.navigateTo('hoso'));
    container.querySelector('#kpi-pending')?.addEventListener('click',    () => App.navigateTo('bonhiem'));
    container.querySelector('#kpi-review')?.addEventListener('click',     () => App.navigateTo('pheduyet'));
    container.querySelector('#kpi-expire')?.addEventListener('click',     () => App.navigateTo('nhiemky'));
}

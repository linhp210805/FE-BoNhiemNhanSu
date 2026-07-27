function renderDieuKien(container) {
    const html = `
        <div class="page-header">
            <div class="page-header-left">
                <h1>Kiểm tra Điều kiện Bổ nhiệm</h1>
                <p>Tự động đối chiếu hồ sơ ứng viên với bộ tiêu chuẩn chức danh</p>
            </div>
            <div class="page-header-actions">
                <button class="btn btn-secondary">Quản lý Tiêu chuẩn</button>
                <button class="btn btn-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    Chạy kiểm tra tự động
                </button>
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-card success">
                <div class="stat-content">
                    <div class="stat-label">Đủ điều kiện</div>
                    <div class="stat-value">38</div>
                </div>
            </div>
            <div class="stat-card warning">
                <div class="stat-content">
                    <div class="stat-label">Đủ điều kiện 1 phần (Cần cam kết)</div>
                    <div class="stat-value">7</div>
                </div>
            </div>
            <div class="stat-card danger">
                <div class="stat-content">
                    <div class="stat-label">Không đủ điều kiện</div>
                    <div class="stat-value">2</div>
                </div>
            </div>
            <div class="stat-card info">
                <div class="stat-content">
                    <div class="stat-label">Đang chờ kiểm tra</div>
                    <div class="stat-value">5</div>
                </div>
            </div>
        </div>

        <div class="compliance-dashboard mb-6">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Chi tiết Kiểm tra: TS. Trần Văn Nam (Ứng viên Phó Khoa)</h3>
                </div>
                <div class="card-body">
                    <div class="compliance-score-card mb-6">
                        <div class="score-ring">
                            <svg viewBox="0 0 100 100" width="120" height="120">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--bg-secondary)" stroke-width="10"/>
                                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--warning)" stroke-width="10" stroke-dasharray="282.7" stroke-dashoffset="35"/>
                            </svg>
                            <div class="score-ring-text">
                                <span class="score-value" style="color: var(--warning-dark)">87%</span>
                                <span class="score-label">Mức độ đáp ứng</span>
                            </div>
                        </div>
                        <div style="flex: 1;">
                            <h4 style="font-size: var(--font-size-md); margin-bottom: var(--space-2);">Tổng quan đánh giá</h4>
                            <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-4);">Ứng viên cơ bản đáp ứng các tiêu chuẩn, tuy nhiên thiếu 1 chứng chỉ bắt buộc. Cần bổ sung hoặc làm cam kết hoàn thiện trong 6 tháng.</p>
                            
                            <div style="display: flex; gap: var(--space-4); flex-wrap: wrap;">
                                <div style="flex: 1; min-width: 120px;">
                                    <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;"><span>Trình độ chuyên môn</span><span>100%</span></div>
                                    <div class="progress-bar"><div class="progress-fill success" style="width: 100%"></div></div>
                                </div>
                                <div style="flex: 1; min-width: 120px;">
                                    <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;"><span>Thâm niên công tác</span><span>100%</span></div>
                                    <div class="progress-bar"><div class="progress-fill success" style="width: 100%"></div></div>
                                </div>
                                <div style="flex: 1; min-width: 120px;">
                                    <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;"><span>Chứng chỉ</span><span>60%</span></div>
                                    <div class="progress-bar"><div class="progress-fill danger" style="width: 60%"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4 class="font-semibold mb-3">Danh sách Tiêu chí</h4>
                    <div class="checklist">
                        <div class="checklist-item pass">
                            <div class="check-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
                            <div style="flex: 1;">
                                <div class="check-text">Trình độ Tiến sĩ hoặc tương đương</div>
                                <div class="text-xs text-tertiary">Đã xác thực: TS Công nghệ Thông tin (2015)</div>
                            </div>
                        </div>
                        <div class="checklist-item pass">
                            <div class="check-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
                            <div style="flex: 1;">
                                <div class="check-text">Thâm niên công tác tối thiểu 5 năm</div>
                                <div class="text-xs text-tertiary">Thực tế: 8 năm 4 tháng tại ĐHĐN</div>
                            </div>
                        </div>
                        <div class="checklist-item pass">
                            <div class="check-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
                            <div style="flex: 1;">
                                <div class="check-text">Độ tuổi không quá 55 (đối với nam) khi bổ nhiệm</div>
                                <div class="text-xs text-tertiary">Thực tế: 42 tuổi</div>
                            </div>
                        </div>
                        <div class="checklist-item fail">
                            <div class="check-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
                            <div style="flex: 1;">
                                <div class="check-text">Chứng chỉ Cao cấp Lý luận Chính trị</div>
                                <div class="text-xs text-danger font-semibold">Thiếu chứng chỉ. Hiện chỉ có Trung cấp.</div>
                            </div>
                        </div>
                        <div class="checklist-item warn">
                            <div class="check-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
                            <div style="flex: 1;">
                                <div class="check-text">Chứng chỉ Quản lý Nhà nước ngạch Chuyên viên chính</div>
                                <div class="text-xs text-warning-dark">Đã nộp giấy chứng nhận đang theo học. Cần bổ sung bản chính trước 15/08/2026.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Kết quả Kiểm tra Hàng loạt</h3>
                </div>
                <div class="table-container" style="border: none;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Ứng viên</th>
                                <th>Vị trí ứng tuyển</th>
                                <th>Điểm ĐK</th>
                                <th>Trạng thái tổng thể</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div class="person-cell"><div class="avatar sm" style="background: var(--primary)">LM</div><div><div class="person-name">TS. Lê Văn Minh</div><div class="person-title">Khoa CNTT</div></div></div></td>
                                <td>Trưởng khoa</td>
                                <td><div class="progress-bar"><div class="progress-fill success" style="width: 100%"></div></div></td>
                                <td><span class="badge badge-success">Đủ điều kiện</span></td>
                            </tr>
                            <tr style="background: var(--warning-light);">
                                <td><div class="person-cell"><div class="avatar sm" style="background: var(--secondary)">VN</div><div><div class="person-name">TS. Trần Văn Nam</div><div class="person-title">Khoa CNTT</div></div></div></td>
                                <td>Phó Trưởng khoa</td>
                                <td><div class="progress-bar"><div class="progress-fill warning" style="width: 87%"></div></div></td>
                                <td><span class="badge badge-warning">Thiếu điều kiện</span></td>
                            </tr>
                            <tr>
                                <td><div class="person-cell"><div class="avatar sm" style="background: var(--accent)">TH</div><div><div class="person-name">PGS.TS Trần Thị Hoa</div><div class="person-title">Ban Giám hiệu</div></div></div></td>
                                <td>Phó Hiệu trưởng</td>
                                <td><div class="progress-bar"><div class="progress-fill success" style="width: 100%"></div></div></td>
                                <td><span class="badge badge-success">Đủ điều kiện</span></td>
                            </tr>
                            <tr>
                                <td><div class="person-cell"><div class="avatar sm" style="background: var(--info)">MT</div><div><div class="person-name">ThS. Võ Minh Tuấn</div><div class="person-title">Khoa Luật</div></div></div></td>
                                <td>Trưởng Bộ môn</td>
                                <td><div class="progress-bar"><div class="progress-fill success" style="width: 100%"></div></div></td>
                                <td><span class="badge badge-success">Đủ điều kiện</span></td>
                            </tr>
                            <tr style="background: var(--danger-light);">
                                <td><div class="person-cell"><div class="avatar sm" style="background: var(--danger)">DK</div><div><div class="person-name">TS. Đặng Văn Khoa</div><div class="person-title">Khoa Khoa học</div></div></div></td>
                                <td>Giám đốc Trung tâm</td>
                                <td><div class="progress-bar"><div class="progress-fill danger" style="width: 45%"></div></div></td>
                                <td><span class="badge badge-danger">Không đủ ĐK</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

/* ============================================================
   Authentication & Session Manager
   ============================================================ */

function renderLogin(container) {
    container.classList.add('is-full-page');

    const html = `
        <div class="login-page-wrapper">
            <!-- Decoration -->
            <span style="position:absolute;width:480px;height:480px;border-radius:50%;background:rgba(255,255,255,0.05);top:-140px;right:-120px;pointer-events:none;"></span>
            <span style="position:absolute;width:320px;height:320px;border-radius:50%;background:rgba(255,255,255,0.04);bottom:-100px;left:-80px;pointer-events:none;"></span>

            <!-- Card -->
            <div class="login-responsive-card" style="position:relative;z-index:10;width:100%;max-width:460px;background:#fff;border-radius:20px;padding:32px 34px 28px;box-shadow:0 28px 64px rgba(0,0,0,0.32);border:1px solid rgba(255,255,255,0.2);box-sizing:border-box;">

                <!-- Logo -->
                <div style="text-align:center;margin-bottom:20px;">
                    <div style="width:70px;height:70px;background:#fff;padding:7px;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(7,88,154,0.14);border:2px solid #eff6ff;margin:0 auto 11px;">
                        <img src="Logo-DH-Da-Nang-UDN.webp" alt="Logo ĐHĐN" style="width:54px;height:54px;object-fit:contain;">
                    </div>
                    <h2 style="font-size:18px;font-weight:800;color:#0f172a;margin:0 0 2px;text-transform:uppercase;letter-spacing:-0.01em;">ĐẠI HỌC ĐÀ NẴNG</h2>
                    <div style="font-size:11.5px;font-weight:700;color:var(--primary);text-transform:uppercase;letter-spacing:0.04em;">Phân hệ quản lý hồ sơ, bổ nhiệm nhân sự</div>
                </div>

                <!-- Tài khoản demo -->
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;margin-bottom:20px;">
                    <div style="font-size:10.5px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;display:flex;align-items:center;gap:6px;">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        CHỌN TÀI KHOẢN DEMO THEO ĐÚNG ĐẶC TẢ ACTORS:
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                        <button type="button" class="btn-demo-user" data-user="admin_tccb" data-name="TS. Nguyễn Văn Minh" data-role="Quản trị hệ thống"
                            style="padding:8px 10px;font-size:11.5px;font-weight:600;border:1.5px solid #e2e8f0;border-radius:9px;background:#ffffff;color:#1e293b;text-align:left;cursor:pointer;transition:all 0.18s ease;display:flex;align-items:center;gap:7px;box-sizing:border-box;">
                            <span style="font-size:14px;line-height:1;">👑</span><span>Quản trị viên</span>
                        </button>
                        <button type="button" class="btn-demo-user" data-user="ban_tccb" data-name="ThS. Trần Thị Thu Hà" data-role="Ban Tổ chức Cán bộ ĐHĐN"
                            style="padding:8px 10px;font-size:11.5px;font-weight:600;border:1.5px solid #e2e8f0;border-radius:9px;background:#ffffff;color:#1e293b;text-align:left;cursor:pointer;transition:all 0.18s ease;display:flex;align-items:center;gap:7px;box-sizing:border-box;">
                            <span style="font-size:14px;line-height:1;">🏛️</span><span>Trưởng ban TCCB</span>
                        </button>
                        <button type="button" class="btn-demo-user" data-user="chuyenvien_vp_udn" data-name="ThS. Lê Hoàng Nam" data-role="Chuyên viên (Văn phòng ĐHĐN)"
                            style="padding:8px 10px;font-size:11.5px;font-weight:600;border:1.5px solid #e2e8f0;border-radius:9px;background:#ffffff;color:#1e293b;text-align:left;cursor:pointer;transition:all 0.18s ease;display:flex;align-items:center;gap:7px;box-sizing:border-box;">
                            <span style="font-size:14px;line-height:1;">🏢</span><span>Chuyên viên VP ĐHĐN</span>
                        </button>
                        <button type="button" class="btn-demo-user" data-user="canbo_hoso_bk" data-name="ThS. Phạm Hoàng Anh" data-role="Cán bộ phụ trách hồ sơ tại đơn vị"
                            style="padding:8px 10px;font-size:11.5px;font-weight:600;border:1.5px solid #e2e8f0;border-radius:9px;background:#ffffff;color:#1e293b;text-align:left;cursor:pointer;transition:all 0.18s ease;display:flex;align-items:center;gap:7px;box-sizing:border-box;">
                            <span style="font-size:14px;line-height:1;">📝</span><span>Chuyên viên (đơn vị)</span>
                        </button>
                        <button type="button" class="btn-demo-user" data-user="thutruong_bk" data-name="PGS.TS. Nguyễn Đình Lâm" data-role="Thủ trưởng đơn vị"
                            style="padding:8px 10px;font-size:11.5px;font-weight:600;border:1.5px solid #e2e8f0;border-radius:9px;background:#ffffff;color:#1e293b;text-align:left;cursor:pointer;transition:all 0.18s ease;display:flex;align-items:center;gap:7px;box-sizing:border-box;">
                            <span style="font-size:14px;line-height:1;">🏫</span><span>Thủ trưởng đơn vị</span>
                        </button>
                        <button type="button" class="btn-demo-user" data-user="giamdoc_udn" data-name="PGS.TS. Nguyễn Ngọc Vũ" data-role="Giám đốc ĐHĐN"
                            style="padding:8px 10px;font-size:11.5px;font-weight:600;border:1.5px solid #e2e8f0;border-radius:9px;background:#ffffff;color:#1e293b;text-align:left;cursor:pointer;transition:all 0.18s ease;display:flex;align-items:center;gap:7px;box-sizing:border-box;">
                            <span style="font-size:14px;line-height:1;">🎓</span><span>Giám đốc ĐHĐN</span>
                        </button>
                    </div>
                </div>

                <!-- Form -->
                <form id="form-login-submit" autocomplete="off">
                    <div style="margin-bottom:13px;">
                        <label style="display:block;font-size:12px;font-weight:700;color:#334155;margin-bottom:6px;">
                            Tài khoản / Email <span style="color:#ef4444;">*</span>
                        </label>
                        <div style="position:relative;">
                            <input type="text" id="login-username" value="admin_tccb" placeholder="Tài khoản hoặc email..." required
                                style="width:100%;height:42px;border-radius:9px;border:1.5px solid #e2e8f0;padding:0 12px 0 40px;font-size:13px;font-weight:600;color:#0f172a;background:#fff;box-sizing:border-box;outline:none;transition:border-color 0.2s;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" style="position:absolute;left:13px;top:50%;transform:translateY(-50%);pointer-events:none;">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                    </div>

                    <div style="margin-bottom:13px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                            <label style="font-size:12px;font-weight:700;color:#334155;">Mật khẩu <span style="color:#ef4444;">*</span></label>
                            <a href="#" id="link-forgot-pass" style="font-size:11.5px;color:var(--primary);font-weight:600;text-decoration:none;">Quên mật khẩu?</a>
                        </div>
                        <div style="position:relative;">
                            <input type="password" id="login-password" value="123456" placeholder="Nhập mật khẩu..." required
                                style="width:100%;height:42px;border-radius:9px;border:1.5px solid #e2e8f0;padding:0 40px 0 40px;font-size:13px;color:#0f172a;background:#fff;box-sizing:border-box;outline:none;transition:border-color 0.2s;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" style="position:absolute;left:13px;top:50%;transform:translateY(-50%);pointer-events:none;">
                                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                            <button type="button" id="btn-toggle-pwd" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#94a3b8;padding:3px;display:flex;align-items:center;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:18px;">
                        <input type="checkbox" id="login-remember" checked style="accent-color:var(--primary);width:15px;height:15px;cursor:pointer;">
                        <label for="login-remember" style="font-size:12px;color:#64748b;cursor:pointer;user-select:none;">Ghi nhớ phiên đăng nhập</label>
                    </div>

                    <button type="submit" id="btn-login-exec"
                        style="width:100%;height:44px;border-radius:10px;border:none;background:var(--primary);color:#fff;font-size:13.5px;font-weight:800;letter-spacing:0.04em;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 6px 20px rgba(7,88,154,0.32);transition:all 0.2s;">
                        <span>ĐĂNG NHẬP HỆ THỐNG</span>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </button>
                </form>

                <!-- Footer -->
                <div style="margin-top:16px;text-align:center;font-size:11px;color:#94a3b8;line-height:1.6;">
                    <strong style="color:#64748b;">ĐẠI HỌC ĐÀ NẴNG</strong><br>
                    Địa chỉ: 41 Lê Duẩn, Hải Châu, Đà Nẵng 
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Helper đồng bộ trạng thái kích hoạt nút demo
    const syncDemoButtonsActiveState = (activeUser) => {
        container.querySelectorAll('.btn-demo-user').forEach(btn => {
            const isSel = (btn.getAttribute('data-user') === activeUser);
            if (isSel) {
                btn.style.borderColor = 'var(--primary)';
                btn.style.background = '#eff6ff';
                btn.style.color = '#1e40af';
                btn.style.fontWeight = '700';
                btn.style.boxShadow = '0 2px 8px rgba(7,88,154,0.14)';
                btn.classList.add('is-active');
            } else {
                btn.style.borderColor = '#e2e8f0';
                btn.style.background = '#ffffff';
                btn.style.color = '#1e293b';
                btn.style.fontWeight = '600';
                btn.style.boxShadow = 'none';
                btn.classList.remove('is-active');
            }
        });
    };

    // Đánh dấu trạng thái ban đầu theo ô nhập username
    const initialUser = container.querySelector('#login-username').value.trim() || 'admin_tccb';
    syncDemoButtonsActiveState(initialUser);

    // Hover & Click demo buttons
    container.querySelectorAll('.btn-demo-user').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (!btn.classList.contains('is-active')) {
                btn.style.borderColor = 'var(--primary)';
                btn.style.background = '#f8fafc';
            }
        });
        btn.addEventListener('mouseleave', () => {
            if (!btn.classList.contains('is-active')) {
                btn.style.borderColor = '#e2e8f0';
                btn.style.background = '#ffffff';
            }
        });
        btn.addEventListener('click', () => {
            const u = btn.getAttribute('data-user');
            container.querySelector('#login-username').value = u;
            container.querySelector('#login-password').value = '123456';
            syncDemoButtonsActiveState(u);
        });
    });

    // Focus inputs
    container.querySelectorAll('input[type=text], input[type=password]').forEach(input => {
        input.addEventListener('focus', () => { input.style.borderColor = 'var(--primary)'; });
        input.addEventListener('blur', () => { input.style.borderColor = '#e2e8f0'; });
    });

    // Toggle mật khẩu
    const pwdInput = container.querySelector('#login-password');
    const pwdToggle = container.querySelector('#btn-toggle-pwd');
    if (pwdToggle && pwdInput) {
        pwdToggle.addEventListener('click', () => {
            const show = pwdInput.type === 'password';
            pwdInput.type = show ? 'text' : 'password';
            pwdToggle.style.color = show ? 'var(--primary)' : '#94a3b8';
        });
    }

    // Quên mật khẩu
    container.querySelector('#link-forgot-pass')?.addEventListener('click', e => {
        e.preventDefault();
        App.notify('Vui lòng liên hệ Ban Tổ chức Cán bộ ĐHĐN – Hotline: 0236.3822096', 'warning');
    });

    // Nút đăng nhập hover
    const loginBtn = container.querySelector('#btn-login-exec');
    loginBtn.addEventListener('mouseenter', () => { loginBtn.style.background = '#034072'; loginBtn.style.boxShadow = '0 8px 24px rgba(7,88,154,0.4)'; });
    loginBtn.addEventListener('mouseleave', () => { loginBtn.style.background = 'var(--primary)'; loginBtn.style.boxShadow = '0 6px 20px rgba(7,88,154,0.32)'; });

    // Submit
    container.querySelector('#form-login-submit')?.addEventListener('submit', e => {
        e.preventDefault();
        const username = container.querySelector('#login-username').value.trim();
        const password = container.querySelector('#login-password').value.trim();
        if (!username || !password) { App.notify('Vui lòng nhập tên tài khoản và mật khẩu!', 'warning'); return; }

        loginBtn.disabled = true;
        loginBtn.style.opacity = '0.8';
        loginBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation:spin 0.8s linear infinite"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg><span>Đang xác thực...</span>`;

        setTimeout(() => {
            const userMap = {
                'admin_tccb': { name: 'TS. Nguyễn Văn Minh', role: 'Quản trị hệ thống', unit: 'Ban Tổ chức Cán bộ' },
                'ban_tccb': { name: 'ThS. Trần Thị Thu Hà', role: 'Ban Tổ chức Cán bộ ĐHĐN', unit: 'Ban Tổ chức Cán bộ' },
                'chuyenvien_tccb': { name: 'CN. Nguyễn Văn Thành', role: 'Chuyên viên Ban Tổ chức Cán bộ ĐHĐN', unit: 'Ban Tổ chức Cán bộ' },
                'chuyenvien_vp_udn': { name: 'ThS. Lê Hoàng Nam', role: 'Chuyên viên (Văn phòng ĐHĐN)', unit: 'Văn phòng ĐHĐN' },
                'canbo_hoso_bk': { name: 'ThS. Phạm Hoàng Anh', role: 'Cán bộ phụ trách hồ sơ tại đơn vị', unit: 'Trường Đại học Bách khoa' },
                'thutruong_bk': { name: 'PGS.TS. Nguyễn Đình Lâm', role: 'Thủ trưởng đơn vị', unit: 'Trường Đại học Bách khoa' },
                'giamdoc_udn': { name: 'PGS.TS. Nguyễn Ngọc Vũ', role: 'Giám đốc ĐHĐN', unit: 'Ban Giám đốc' }
            };
            const info = userMap[username] || { name: 'TS. Nguyễn Văn Minh', role: 'Quản trị hệ thống', unit: 'Ban Tổ chức Cán bộ' };
            const matchedUser = { username, name: info.name, role: info.role, unit: info.unit, email: `${username}@udn.vn` };

            App.state.currentUser = matchedUser;
            App.state.isLoggedIn = true;
            localStorage.setItem('udn_user_session', JSON.stringify(matchedUser));
            App.updateUserProfileUI();
            App.notify(`Chào mừng ${matchedUser.name} (${matchedUser.role})!`, 'success');
            App.navigateTo('dashboard');
        }, 500);
    });
}

/* ================== User Profile & Role Authorization Control ================== */

function setElementVisibility(el, visible) {
    if (!el) return;
    if (visible) {
        el.classList.remove('role-perm-hidden');
        el.style.removeProperty('display');
    } else {
        el.classList.add('role-perm-hidden');
        el.style.setProperty('display', 'none', 'important');
    }
}

App.updateUserProfileUI = function () {
    const user = App.state.currentUser || { name: 'Nguyễn Văn Minh', role: 'Quản trị hệ thống' };
    const nameEl = document.getElementById('user-name');
    const roleEl = document.getElementById('user-role');
    const avatarEl = document.getElementById('user-avatar');

    if (nameEl) nameEl.textContent = user.name || user.username;
    if (roleEl) roleEl.textContent = user.role || 'Người dùng';
    if (avatarEl) {
        const words = (user.name || user.username || 'U D').trim().split(' ');
        avatarEl.textContent = words.length > 1
            ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
            : words[0].substring(0, 2).toUpperCase();
    }

    if (typeof App.applyRolePermissions === 'function') {
        App.applyRolePermissions();
    }
};

App.applyRolePermissions = function () {
    const user = App.state.currentUser || { role: 'Quản trị hệ thống' };
    const role = user.role || '';

    const isSystemAdmin = (role === 'Quản trị hệ thống');
    const isBanTCCB = (role.includes('Ban Tổ chức Cán bộ') || role === 'Ban Tổ chức Cán bộ ĐHĐN' || role === 'Chuyên viên Ban Tổ chức Cán bộ ĐHĐN');
    const isVpUdn = (role.includes('Văn phòng ĐHĐN') || role === 'Chuyên viên (Văn phòng ĐHĐN)');
    const isCanBoHoso = (role === 'Cán bộ phụ trách hồ sơ tại đơn vị');
    const isThuTruong = (role === 'Thủ trưởng đơn vị');
    const isGiamDoc = (role === 'Giám đốc ĐHĐN');

    // ==========================================
    // 1. PHÂN QUYỀN MENU SIDEBAR (index.html)
    // ==========================================
    const navNguoiDung = document.getElementById('nav-nguoidung');
    const navPheDuyet = document.getElementById('nav-pheduyet');
    const navQuyetDinh = document.getElementById('nav-quyetdinh');
    const secDividerPheDuyet = document.getElementById('sec-divider-pheduyet');
    const secLabelPheDuyet = document.getElementById('sec-label-pheduyet');

    // MD09 Quản trị & Phân quyền: ĐỘC QUYỀN 'Quản trị hệ thống' mới được thấy menu
    setElementVisibility(navNguoiDung, isSystemAdmin);

    // Thẩm định & Phê duyệt (MD05): Ẩn với 'Cán bộ phụ trách hồ sơ tại đơn vị'
    const canSeePheDuyet = !isCanBoHoso;
    setElementVisibility(navPheDuyet, canSeePheDuyet);

    // Quyết định & Hiệu lực (MD06): Cho phép 'Ban Tổ chức Cán bộ ĐHĐN', 'Chuyên viên (Văn phòng ĐHĐN)', 'Giám đốc ĐHĐN' & 'Quản trị hệ thống'
    const canSeeQuyetDinh = (isBanTCCB || isVpUdn || isGiamDoc || isSystemAdmin);
    setElementVisibility(navQuyetDinh, canSeeQuyetDinh);

    // Ẩn nhãn và đường kẻ Section 'Phê duyệt & Quyết định' nếu cả 2 item đều ẩn (ví dụ: Cán bộ phụ trách hồ sơ)
    const hasSection5 = canSeePheDuyet || canSeeQuyetDinh;
    setElementVisibility(secDividerPheDuyet, hasSection5);
    setElementVisibility(secLabelPheDuyet, hasSection5);

    // ==========================================
    // 2. MODULE 01: HỒ SƠ NHÂN SỰ PHỤC VỤ BỔ NHIỆM (MD01)
    // ==========================================
    // UC01.01 (Thêm mới hồ sơ) & UC01.02 (Import danh sách nhân sự Excel)
    // Actors đặc tả: "Cán bộ phụ trách hồ sơ tại đơn vị" (và Quản trị viên, Ban TCCB)
    const canCreatePerson = (isCanBoHoso || isBanTCCB || isSystemAdmin);
    setElementVisibility(document.getElementById('btn-add-personnel'), canCreatePerson);
    setElementVisibility(document.getElementById('btn-import-personnel'), canCreatePerson);

    // UC01.05 (Cập nhật hồ sơ) & UC01.06 (Quản lý tài liệu minh chứng)
    // Actors đặc tả: "Cán bộ phụ trách hồ sơ tại đơn vị", "Ban Tổ chức Cán bộ ĐHĐN"
    // CẤM & ẨN 100%: "Thủ trưởng đơn vị", "Giám đốc ĐHĐN", "Chuyên viên (Văn phòng ĐHĐN)"
    const canUpdatePerson = (isCanBoHoso || isBanTCCB || isSystemAdmin);

    document.querySelectorAll('.btn-edit-personnel, .btn-edit-profile, #btn-save-personnel-update, #btn-edit-hoso-action').forEach(btn => {
        setElementVisibility(btn, canUpdatePerson);
    });

    document.querySelectorAll('#btn-add-doc-hoso, .btn-add-document, .btn-delete-doc, .btn-stop-doc-item, #btn-trigger-upload, .btn-del-doc').forEach(btn => {
        setElementVisibility(btn, canUpdatePerson);
    });

    // UC01.07 (Theo dõi hiệu lực tài liệu minh chứng)
    // Actors đặc tả: "Cán bộ phụ trách hồ sơ tại đơn vị", "Ban Tổ chức Cán bộ ĐHĐN", "Chuyên viên (Văn phòng ĐHĐN)"
    const canTrackDocs = (isCanBoHoso || isBanTCCB || isVpUdn || isSystemAdmin);
    setElementVisibility(document.getElementById('btn-track-docs'), canTrackDocs);

    // Filter Đơn vị công tác (UC01.03):
    // Cán bộ phụ trách hồ sơ tại đơn vị & Thủ trưởng đơn vị chỉ được xem dữ liệu đơn vị mình
    const unitFilter = document.getElementById('filter-unit');
    if (unitFilter) {
        if (isCanBoHoso || isThuTruong) {
            const userUnit = user.unit || 'Trường Đại học Bách khoa';
            for (let opt of unitFilter.options) {
                if (opt.value && userUnit.toLowerCase().includes(opt.value.toLowerCase())) {
                    unitFilter.value = opt.value;
                    unitFilter.disabled = true;
                    break;
                }
            }
        } else {
            unitFilter.disabled = false;
        }
    }

    // ==========================================
    // 3. MODULE 02: CHỨC VỤ, TIÊU CHUẨN VÀ THÀNH PHẦN HỒ SƠ (MD02)
    // ==========================================
    // Actors đặc tả (UC02.01 -> UC02.07): ĐỘC QUYỀN "Ban Tổ chức Cán bộ ĐHĐN" (và Quản trị hệ thống)
    // CẤM & ẨN 100%: "Cán bộ phụ trách hồ sơ tại đơn vị", "Thủ trưởng đơn vị", "Chuyên viên (Văn phòng ĐHĐN)", "Giám đốc ĐHĐN"
    const isMd02CudAllowed = (isBanTCCB || isSystemAdmin);

    const md02CudSelectors = [
        '#btn-new-chucvu', '#btn-new-nhiemky', '#btn-new-loaithutuc',
        '#btn-new-loaitailieu', '#btn-new-thanhphan', '#btn-new-tieuchuan', '#btn-new-thamquyen',
        '.btn-edit-pos', '.btn-toggle-pos',
        '.btn-edit-term', '.btn-stop-term',
        '.btn-edit-proc', '.btn-stop-proc',
        '.btn-edit-doc', '.btn-stop-doc',
        '.btn-edit-reqdoc', '.btn-delete-reqdoc',
        '.btn-edit-std', '.btn-delete-std',
        '.btn-edit-auth', '.btn-stop-auth',
        '.btn-toggle-category'
    ];

    md02CudSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            setElementVisibility(el, isMd02CudAllowed);
        });
    });

    // ==========================================
    // 4. MODULE 03 & 04: ĐỀ XUẤT CHỦ TRƯƠNG & HỒ SƠ BỔ NHIỆM (MD03, MD04)
    // ==========================================
    // Nút Khởi tạo Đề xuất bổ nhiệm mới:
    // Actors: Cán bộ phụ trách hồ sơ tại đơn vị, Ban TCCB, Quản trị viên. Ẩn với Thủ trưởng đơn vị, Chuyên viên VP ĐHĐN, Giám đốc ĐHĐN.
    const canCreateProposal = (isCanBoHoso || isBanTCCB || isSystemAdmin);
    document.querySelectorAll('#btn-new-dexuat, #btn-dash-new, .btn-create-proposal').forEach(btn => {
        setElementVisibility(btn, canCreateProposal);
    });

    // Icon button Sửa Đề xuất (.btn-edit-prop):
    document.querySelectorAll('.btn-edit-prop').forEach(btn => {
        setElementVisibility(btn, canCreateProposal);
    });

    // Icon button Duyệt đề xuất cấp đơn vị / Gửi đề xuất (.btn-send-prop):
    const canSendProposal = (isCanBoHoso || isThuTruong || isSystemAdmin);
    document.querySelectorAll('.btn-send-prop').forEach(btn => {
        setElementVisibility(btn, canSendProposal);
    });

    // Icon button Rà soát Ban TCCB (.btn-review-prop):
    const canReviewProposal = (isBanTCCB || isSystemAdmin);
    document.querySelectorAll('.btn-review-prop').forEach(btn => {
        setElementVisibility(btn, canReviewProposal);
    });

    // Icon button & Nút Phê duyệt Chủ trương bổ nhiệm (.btn-approve-prop, .btn-giamdoc-approve):
    const canApproveProposalGiamDoc = (isGiamDoc || isBanTCCB || isSystemAdmin);
    document.querySelectorAll('.btn-approve-prop, .btn-giamdoc-approve, #btn-exec-giamdoc-approve').forEach(btn => {
        setElementVisibility(btn, canApproveProposalGiamDoc);
    });

    // Icon button & Nút Duyệt đề xuất cấp đơn vị (Thủ trưởng đơn vị):
    const canApproveProposalUnit = (isThuTruong || isSystemAdmin);
    document.querySelectorAll('.btn-approve-proposal-unit, #btn-exec-unit-approve').forEach(btn => {
        setElementVisibility(btn, canApproveProposalUnit);
    });

    // Icon button Lập / Sửa Hồ sơ bổ nhiệm (.btn-dossier-prop, .btn-edit-dossier, .btn-unlink-doc, #btn-open-create-page, #btn-action-dossier):
    const canManageDossier = (isBanTCCB || isCanBoHoso || isSystemAdmin);
    document.querySelectorAll('.btn-dossier-prop, .btn-edit-dossier, .btn-unlink-doc, #btn-open-create-page, #btn-action-dossier').forEach(btn => {
        setElementVisibility(btn, canManageDossier);
    });

    // ==========================================
    // 5. MODULE 05: THẨM ĐỊNH & PHÊ DUYỆT (MD05)
    // ==========================================
    // Icon button Xử lý hồ sơ thẩm định (.btn-process-appr):
    const canProcessAppraisal = (isBanTCCB || isVpUdn || isGiamDoc || isSystemAdmin);
    document.querySelectorAll('.btn-process-appr').forEach(btn => {
        setElementVisibility(btn, canProcessAppraisal);
    });

    // Nút Phê duyệt kết quả thẩm định tiêu chuẩn:
    const canApproveAppraisal = (isGiamDoc || isBanTCCB || isSystemAdmin);
    document.querySelectorAll('.btn-approve-appraisal, #btn-exec-approve-appraisal').forEach(btn => {
        setElementVisibility(btn, canApproveAppraisal);
    });

    // ==========================================
    // 6. MODULE 06: QUYẾT ĐỊNH & HIỆU LỰC (MD06)
    // ==========================================
    // Nút Ký & Ban hành Quyết định bổ nhiệm: ĐỘC QUYỀN Giám đốc ĐHĐN & Quản trị hệ thống
    const canSignDecision = (isGiamDoc || isSystemAdmin);
    document.querySelectorAll('.btn-sign-decision, #btn-exec-sign-decision, .btn-sign-qdn').forEach(btn => {
        setElementVisibility(btn, canSignDecision);
    });

    // ==========================================
    // 7. MODULE 09: QUẢN TRỊ VÀ PHÂN QUYỀN (MD09)
    // ==========================================
    // ĐỘC QUYỀN Quản trị hệ thống
    document.querySelectorAll('#btn-create-user, #btn-create-role, #btn-new-unit, #btn-new-sla, #btn-new-template').forEach(btn => {
        setElementVisibility(btn, isSystemAdmin);
    });

    document.querySelectorAll('.btn-edit-usr, .btn-edit-role, .btn-edit-unit, .btn-toggle-unit, .btn-edit-sla, .btn-edit-tpl').forEach(btn => {
        setElementVisibility(btn, isSystemAdmin);
    });
};

App.confirmLogout = function () {
    const user = App.state.currentUser || { name: 'Người dùng', role: 'Thành viên' };

    const doLogout = () => {
        App.state.isLoggedIn = false;
        App.state.currentUser = null;
        localStorage.removeItem('udn_user_session');
        App.closeModal();
        App.notify('Đã đăng xuất khỏi hệ thống thành công!', 'success');
        App.navigateTo('login');
    };

    const modalHtml = `
        <div style="padding:16px 0 8px;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:#fef2f2;color:#dc2626;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:0 4px 12px rgba(220,38,38,0.15);">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
            </div>
            <h4 style="font-size:17px;font-weight:800;color:#0f172a;margin:0 0 8px;">Xác nhận Đăng xuất?</h4>
            <p style="color:#64748b;font-size:13.5px;margin:0 0 24px;">
                Tài khoản <strong>${user.name}</strong> (${user.role}) sẽ kết thúc phiên làm việc hiện tại.
            </p>
            <div style="display:flex;gap:12px;justify-content:center;">
                <button id="btn-cancel-logout" style="padding:10px 24px;font-size:13.5px;font-weight:700;border-radius:8px;border:1.5px solid #e2e8f0;background:#f8fafc;color:#475569;cursor:pointer;">Hủy bỏ</button>
                <button id="btn-exec-logout" style="padding:10px 24px;font-size:13.5px;font-weight:800;border-radius:8px;border:none;background:#dc2626;color:#fff;cursor:pointer;box-shadow:0 4px 12px rgba(220,38,38,0.25);">Xác nhận Đăng xuất</button>
            </div>
        </div>
    `;

    App.showModal('Đăng xuất tài khoản', modalHtml, []);
    const footer = document.getElementById('modal-footer');
    if (footer) footer.style.display = 'none';

    setTimeout(() => {
        document.getElementById('btn-cancel-logout')?.addEventListener('click', () => App.closeModal());
        document.getElementById('btn-exec-logout')?.addEventListener('click', doLogout);
    }, 30);
};

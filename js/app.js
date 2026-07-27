/* ============================================================
   Hệ thống Quản lý Vòng đời Bổ nhiệm UDN
   Main Application Controller
   ============================================================ */

const App = {
    currentPage: 'dashboard',
    state: {
        personnel: [
            { 
                id: 'NS-2018-001', name: 'GS.TS Nguyễn Văn An', gender: 'Nam', 
                unit: 'Ban Đào tạo', unitCode: 'daotao', department: 'Phòng Hành chính - Tổng hợp', 
                position: 'Trưởng ban', positionCode: 'truongban', degree: 'Giáo sư, Tiến sĩ',
                status: 'active', updated: '01/06/2026', initials: 'NA', accent: 'var(--primary)', 
                email: 'an.nv@udn.vn', phone: '0905 123 456', dob: '1975-05-12', cccd: '048075001234', home: 'Hải Châu, Đà Nẵng',
                documents: [
                    { id: 'DOC-001', type: 'Sơ yếu lý lịch 2C/TCTW', name: 'SYLL GS.TS Nguyễn Văn An', issuer: 'Ban Tổ chức', issueDate: '01/05/2026', effectiveDate: '01/05/2026', expireDate: '01/11/2026', status: 'Còn hiệu lực', note: '' },
                    { id: 'DOC-002', type: 'Giấy khám sức khỏe', name: 'GKSK BV Đà Nẵng', issuer: 'Bệnh viện C Đà Nẵng', issueDate: '15/01/2025', effectiveDate: '15/01/2025', expireDate: '15/07/2025', status: 'Hết hiệu lực', note: '' }
                ]
            },
            { 
                id: 'NS-2019-042', name: 'TS. Lê Thị Bích Ngọc', gender: 'Nữ', 
                unit: 'Ban Tổ chức Cán bộ', unitCode: 'tccb', department: 'Phòng Tổ chức - Cán bộ', 
                position: 'Trưởng ban', positionCode: 'truongban', degree: 'Tiến sĩ',
                status: 'active', updated: '15/05/2026', initials: 'BN', accent: 'var(--info)', 
                email: 'ngoc.ltb@udn.vn', phone: '0906 943 210', dob: '1980-08-19', cccd: '048075009876', home: 'Liên Chiểu, Đà Nẵng',
                documents: [
                    { id: 'DOC-003', type: 'Bản kê khai tài sản', name: 'KKTS 2026', issuer: 'UBND Phường', issueDate: '10/01/2026', effectiveDate: '10/01/2026', expireDate: '10/01/2027', status: 'Còn hiệu lực', note: '' }
                ]
            }
        ],
        proposals: [
            { id: 'DX-2026-014', type: 'Bổ nhiệm mới', typeCode: 'moi', person: 'TS. Lê Thị Hương', position: 'Phó Trưởng ban', unit: 'Ban Đào tạo', date: '20/06/2026', status: 'Chờ rà soát', statusCode: 'review' },
            { id: 'DX-2026-013', type: 'Bổ nhiệm lại', typeCode: 'lai', person: 'PGS.TS. Trần Thị Hoa', position: 'Phó Chánh Văn phòng', unit: 'Văn phòng', date: '18/06/2026', status: 'Chờ rà soát', statusCode: 'review' },
            { id: 'DX-2026-012', type: 'Bổ nhiệm mới', typeCode: 'moi', person: 'TS. Nguyễn Văn Quang', position: 'Trưởng ban', unit: 'Ban Kế hoạch - Tài chính', date: '15/06/2026', status: 'Đã chấp thuận', statusCode: 'approved' }
        ],
        dossiers: [
            { id: 'HS-26012', type: 'Bổ nhiệm mới', typeCode: 'moi', person: 'TS. Lê Văn Minh', position: 'Phó Giám đốc', unit: 'Ban Giám đốc', status: 'Chờ thẩm định', statusCode: 'thamdinh' },
            { id: 'HS-26011', type: 'Bổ nhiệm lại', typeCode: 'lai', person: 'PGS.TS Trần Thị Hoa', position: 'Phó Chánh Văn phòng', unit: 'Văn phòng', status: 'Chờ phê duyệt', statusCode: 'pheduyet' },
            { id: 'HS-26009', type: 'Bổ nhiệm mới', typeCode: 'moi', person: 'ThS. Nguyễn Văn A', position: 'Phó Trưởng ban', unit: 'Ban Đào tạo', status: 'Bản nháp', statusCode: 'draft' }
        ],
        dossiersList: [
            { id: 'HS-26012', type: 'Bổ nhiệm mới', typeCode: 'moi', person: 'TS. Lê Văn Minh', position: 'Phó Giám đốc', unit: 'Ban Giám đốc', status: 'Chờ thẩm định', statusCode: 'thamdinh' },
            { id: 'HS-26011', type: 'Bổ nhiệm lại', typeCode: 'lai', person: 'PGS.TS Trần Thị Hoa', position: 'Phó Chánh Văn phòng', unit: 'Văn phòng', status: 'Chờ phê duyệt', statusCode: 'pheduyet' },
            { id: 'HS-26009', type: 'Bổ nhiệm mới', typeCode: 'moi', person: 'ThS. Nguyễn Văn A', position: 'Phó Trưởng ban', unit: 'Ban Đào tạo', status: 'Bản nháp', statusCode: 'draft' }
        ],
        approvals: [
            { id: 'HS-26012', name: 'TS. Lê Văn Minh', position: 'Phó Giám đốc', unit: 'Ban Giám đốc', status: 'Đang chờ thẩm định', statusCode: 'review', deadline: 'Quá hạn 2 ngày' },
            { id: 'HS-26011', name: 'PGS.TS Trần Thị Hoa', position: 'Phó Chánh Văn phòng', unit: 'Văn phòng', status: 'Chờ phê duyệt', statusCode: 'pending', deadline: 'Còn 3 ngày' }
        ],
        decisions: [
            { id: '125/QĐ-ĐHĐN', date: '01/06/2026', person: 'TS. Phạm Quốc Bảo', position: 'Trưởng ban', unit: 'Ban Thanh tra', type: 'Bổ nhiệm mới', effectiveDate: '01/06/2026', term: '5 năm' },
            { id: '124/QĐ-ĐHĐN', date: '28/05/2026', person: 'PGS.TS Nguyễn Anh', position: 'Trưởng ban', unit: 'Ban Cơ sở vật chất', type: 'Bổ nhiệm lại', effectiveDate: '01/06/2026', term: '5 năm' }
        ],
        meetings: [
            { id: 'HN-2026-022', type: 'Lấy ý kiến', dossier: 'HS-26012 · TS. Lê Văn Minh', unit: 'Ban Giám đốc', date: '22/06/2026', result: 92, status: 'Chờ xác nhận', statusCode: 'pending' },
            { id: 'HN-2026-021', type: 'Phiếu tín nhiệm', dossier: 'HS-26011 · PGS.TS. Trần Thị Hoa', unit: 'Văn phòng', date: '20/06/2026', result: 88, status: 'Đã xác nhận', statusCode: 'approved' }
        ],
        users: [
            { username: 'admin.udn', name: 'Nguyễn Quản Trị', email: 'admin@udn.vn', role: 'Quản trị hệ thống', scope: 'Cơ quan ĐHĐN', status: 'active' },
            { username: 'tccb.nguyentran', name: 'TS. Nguyễn Trần', email: 'tccb@udn.vn', role: 'Cán bộ TCCB', scope: 'Ban TCCB', status: 'active' }
        ],
        categories: [
            { code: 'DAOTAO', name: 'Ban Đào tạo', type: 'Ban chức năng', status: 'active' },
            { code: 'TCCB', name: 'Ban Tổ chức Cán bộ', type: 'Ban chức năng', status: 'active' },
            { code: 'VP', name: 'Văn phòng', type: 'Phòng ban', status: 'active' }
        ],
        positions: [
            { code: 'GD', name: 'Giám đốc', type: 'Ban Giám đốc', status: 'active' },
            { code: 'PGD', name: 'Phó Giám đốc', type: 'Ban Giám đốc', status: 'active' },
            { code: 'TB', name: 'Trưởng ban', type: 'Ban chức năng', status: 'active' },
            { code: 'PTB', name: 'Phó Trưởng ban', type: 'Ban chức năng', status: 'active' },
            { code: 'CVP', name: 'Chánh Văn phòng', type: 'Văn phòng', status: 'active' },
            { code: 'PCVP', name: 'Phó Chánh Văn phòng', type: 'Văn phòng', status: 'active' }
        ]
    },

    init() {
        if(window.Database) {
            Database.init();
            // Optional: fallback for old modules
            this.state.personnel = Database.getAll('personnel');
            this.state.positions = Database.getAll('positions');
        }
        
        this.bindEvents();
        
        // Restore user session if saved
        const savedSession = localStorage.getItem('udn_user_session');
        if (savedSession) {
            try {
                this.state.currentUser = JSON.parse(savedSession);
                this.state.isLoggedIn = true;
            } catch(e) {
                this.state.isLoggedIn = false;
                this.state.currentUser = null;
            }
        } else {
            this.state.isLoggedIn = false;
            this.state.currentUser = null;
        }

        if (typeof this.updateUserProfileUI === 'function') {
            this.updateUserProfileUI();
        }

        this.handleRoute();
        window.addEventListener('hashchange', () => this.handleRoute());

        // MutationObserver tự động áp dụng phân quyền vai trò cho bất kỳ phần tử DOM động nào vừa tạo
        try {
            const observer = new MutationObserver(() => {
                if (typeof this.applyRolePermissions === 'function') {
                    this.applyRolePermissions();
                }
            });
            const mainContent = document.getElementById('main-content');
            if (mainContent) observer.observe(mainContent, { childList: true, subtree: true });
            const modalEl = document.getElementById('app-modal');
            if (modalEl) observer.observe(modalEl, { childList: true, subtree: true });
        } catch(e) {}
    },

    bindEvents() {
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                document.getElementById('app').classList.toggle('sidebar-collapsed');
            });
        }

        document.querySelectorAll('.nav-item[data-page]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                window.location.hash = page;
            });
        });

        // Global click handler for Logout (#nav-logout or #user-menu)
        document.addEventListener('click', (e) => {
            const logoutTarget = e.target.closest('#nav-logout') || e.target.closest('#user-menu');
            if (logoutTarget) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof App.confirmLogout === 'function') {
                    App.confirmLogout();
                }
            }
        });

        const notifBtn = document.getElementById('notification-btn');
        const notifPanel = document.getElementById('notification-panel');
        if (notifBtn && notifPanel) {
            notifBtn.addEventListener('click', () => {
                notifPanel.classList.toggle('open');
            });

            document.addEventListener('click', (e) => {
                if (!notifPanel.contains(e.target) && !notifBtn.contains(e.target)) {
                    notifPanel.classList.remove('open');
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('global-search-input');
                if (searchInput) searchInput.focus();
            }
            if (e.key === 'Escape') {
                if (notifPanel) notifPanel.classList.remove('open');
                const searchInput = document.getElementById('global-search-input');
                if (searchInput) searchInput.blur();
                this.closeModal();
            }
        });

        const modalClose = document.getElementById('modal-close');
        const modalCancel = document.querySelector('.modal-cancel');
        const modalOverlay = document.getElementById('app-modal');

        if (modalClose) modalClose.addEventListener('click', () => this.closeModal());
        if (modalCancel) modalCancel.addEventListener('click', () => this.closeModal());
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) this.closeModal();
            });
        }
    },

    handleRoute() {
        let hash = window.location.hash.replace('#', '');
        if (!hash) hash = this.state.isLoggedIn ? 'dashboard' : 'login';
        this.navigateTo(hash);
        const mainContent = document.getElementById('main-content');
        if (mainContent) mainContent.classList.remove('is-full-page');
    },

    navigateTo(page) {
        // Route Guard: Bắt buộc đăng nhập trước khi truy cập bất kỳ trang nào
        if (!this.state.isLoggedIn && page !== 'login') {
            this.currentPage = 'login';
            window.location.hash = 'login';
            page = 'login';
        } else if (this.state.isLoggedIn && page !== 'login') {
            // Permission Route Guard: Chặn và chuyển hướng nếu role không có quyền truy cập trang
            const user = this.state.currentUser || { role: 'Quản trị hệ thống' };
            const role = user.role || '';

            if (page === 'nguoidung' && role !== 'Quản trị hệ thống') {
                this.notify('Tài khoản của bạn không có quyền truy cập phân hệ Quản trị & Phân quyền!', 'warning');
                window.location.hash = 'dashboard';
                page = 'dashboard';
            } else if (page === 'quyetdinh' && !(role === 'Quản trị hệ thống' || role.includes('Ban Tổ chức Cán bộ') || role.includes('Văn phòng ĐHĐN') || role === 'Giám đốc ĐHĐN')) {
                this.notify('Tài khoản của bạn không có quyền truy cập phân hệ Quyết định & Hiệu lực!', 'warning');
                window.location.hash = 'dashboard';
                page = 'dashboard';
            } else if (page === 'pheduyet' && role === 'Cán bộ phụ trách hồ sơ tại đơn vị') {
                this.notify('Tài khoản của bạn không có quyền truy cập phân hệ Thẩm định & Phê duyệt!', 'warning');
                window.location.hash = 'dashboard';
                page = 'dashboard';
            }
            this.currentPage = page;
        } else {
            this.currentPage = page;
        }

        if (window.location.hash.replace('#', '') !== page) {
            window.location.hash = page;
        }

        const appEl = document.getElementById('app');
        if (appEl) {
            if (page === 'login') appEl.classList.add('on-login-page');
            else appEl.classList.remove('on-login-page');
        }

        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === page);
        });

        const container = document.getElementById('main-content');
        if (!container) return;

        container.style.transition = 'none';
        container.style.opacity = '1';
        container.style.transform = 'none';
        container.classList.remove('is-full-page');

        this.renderPage(page, container);

        if (container.querySelector('.full-page-container')) {
            container.classList.add('is-full-page');
        }
    },

    renderPage(page, container) {
        const moduleNames = {
            login: 'Đăng nhập hệ thống',
            dashboard: 'Tổng quan hệ thống',
            hoso: 'Hồ sơ nhân sự',
            chucvu: 'Chức vụ & Tiêu chuẩn',
            dexuat: 'Đề xuất chủ trương',
            bonhiem: 'Hồ sơ bổ nhiệm',
            hoinghi: 'Hội nghị & Tín nhiệm',
            pheduyet: 'Thẩm định & Phê duyệt',
            quyetdinh: 'Quyết định & Hiệu lực',
            nhiemky: 'Nhiệm kỳ & Cảnh báo',
            baocao: 'Tra cứu & Báo cáo',
            nguoidung: 'Quản trị & Phân quyền',
            danhmuc: 'Cấu hình hệ thống'
        };

        const breadcrumb = document.getElementById('header-module-name');
        if (breadcrumb && moduleNames[page]) {
            breadcrumb.textContent = moduleNames[page];
        }

        const renderers = {
            login: () => typeof renderLogin === 'function' && renderLogin(container),
            dashboard: () => typeof renderDashboard === 'function' && renderDashboard(container),
            hoso: () => typeof renderHoSo === 'function' && renderHoSo(container),
            chucvu: () => typeof renderChucVu === 'function' && renderChucVu(container),
            dexuat: () => typeof renderDeXuat === 'function' && renderDeXuat(container),
            bonhiem: () => typeof renderBoNhiem === 'function' && renderBoNhiem(container),
            hoinghi: () => typeof renderHoiNghi === 'function' && renderHoiNghi(container),
            pheduyet: () => typeof renderPheDuyet === 'function' && renderPheDuyet(container),
            quyetdinh: () => typeof renderQuyetDinh === 'function' && renderQuyetDinh(container),
            nhiemky: () => typeof renderNhiemKy === 'function' && renderNhiemKy(container),
            baocao: () => typeof renderBaoCao === 'function' && renderBaoCao(container),
            nguoidung: () => typeof renderNguoiDung === 'function' && renderNguoiDung(container),
            danhmuc: () => typeof renderDanhMuc === 'function' && renderDanhMuc(container)
        };

        if (renderers[page]) {
            renderers[page]();
        } else {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    </div>
                    <h3 class="empty-state-title">Chưa hoàn thiện</h3>
                    <p class="empty-state-desc">Module này đang được xây dựng hoặc không tìm thấy.</p>
                </div>`;
        }

        // Tự động áp dụng phân quyền hiển thị theo Vai trò (Role-Based Feature Visibility)
        if (typeof this.applyRolePermissions === 'function') {
            this.applyRolePermissions();
        }
    },

    // Chuyển main-content sang chế độ full-page (không có padding, chiếm toàn bộ)
    setFullPage() {
        const mc = document.getElementById('main-content');
        if (mc) mc.classList.add('is-full-page');
    },

    // Khôi phục main-content về chế độ thông thường (có padding)
    clearFullPage() {
        const mc = document.getElementById('main-content');
        if (mc) mc.classList.remove('is-full-page');
    },

    openModal(title, contentHTML, onConfirm = null) {
        const overlay = document.getElementById('app-modal');
        const titleEl = document.getElementById('modal-title');
        const bodyEl = document.getElementById('modal-body');
        const confirmBtn = document.querySelector('.modal-confirm');

        if (!overlay) return;

        if (titleEl) titleEl.textContent = title;
        if (bodyEl) bodyEl.innerHTML = contentHTML;

        if (confirmBtn) {
            const newConfirmBtn = confirmBtn.cloneNode(true);
            confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

            if (onConfirm) {
                newConfirmBtn.style.display = 'inline-flex';
                newConfirmBtn.addEventListener('click', () => {
                    onConfirm();
                    this.closeModal();
                });
            } else {
                newConfirmBtn.style.display = 'none';
            }
        }

        overlay.classList.add('active');
    },

    showModal(title, contentHTML, buttons = []) {
        const overlay = document.getElementById('app-modal');
        const titleEl = document.getElementById('modal-title');
        const bodyEl = document.getElementById('modal-body');
        const footerEl = document.getElementById('modal-footer');

        if (!overlay) return;

        if (titleEl) titleEl.textContent = title;
        if (bodyEl) bodyEl.innerHTML = contentHTML;

        if (footerEl) {
            if (buttons && buttons.length > 0) {
                footerEl.style.display = 'flex';
                footerEl.innerHTML = buttons.map((btn, idx) => `
                    <button class="btn ${btn.class || (idx === 0 ? 'btn-secondary' : 'btn-primary')}" id="modal-btn-act-${idx}" style="padding: 9px 22px; font-weight: 700; border-radius: 8px;">
                        ${btn.text}
                    </button>
                `).join('');

                buttons.forEach((btn, idx) => {
                    const btnEl = footerEl.querySelector(`#modal-btn-act-${idx}`);
                    if (btnEl) {
                        btnEl.addEventListener('click', () => {
                            if (typeof btn.onclick === 'function') {
                                btn.onclick();
                            } else {
                                this.closeModal();
                            }
                        });
                    }
                });
            } else {
                footerEl.style.display = 'none';
            }
        }

        overlay.classList.add('active');

        // Tự động áp dụng phân quyền hiển thị cho nút bấm bên trong Modal
        if (typeof this.applyRolePermissions === 'function') {
            this.applyRolePermissions();
        }
    },

    closeModal() {
        const overlay = document.getElementById('app-modal');
        if (overlay) overlay.classList.remove('active');
    },

    refreshCurrentPage() {
        this.navigateTo(this.currentPage);
    },

    notify(message, type = 'success') {
        const existing = document.getElementById('app-toast');
        const wrapper = existing || document.createElement('div');
        if (!existing) {
            wrapper.id = 'app-toast';
            wrapper.style.cssText = 'position:fixed;right:20px;bottom:20px;display:flex;flex-direction:column;gap:10px;z-index:2000;';
            document.body.appendChild(wrapper);
        }
        const toast = document.createElement('div');
        const colors = {
            success: 'linear-gradient(135deg, #166534, #16a34a)',
            warning: 'linear-gradient(135deg, #b45309, #f59e0b)',
            danger: 'linear-gradient(135deg, #be123c, #ef4444)'
        };
        toast.style.cssText = `background:${colors[type] || colors.success};color:white;padding:12px 16px;border-radius:10px;box-shadow:0 10px 24px rgba(15,23,42,0.2);font-size:13px;max-width:320px;`;
        toast.textContent = message;
        wrapper.appendChild(toast);
        setTimeout(() => {
            toast.remove();
            if (!wrapper.children.length) wrapper.remove();
        }, 2200);
    },

    renderStatusBadge(statusCode, statusText) {
        let code = statusCode ? String(statusCode).toLowerCase().trim() : '';
        let text = statusText ? String(statusText).trim() : (statusCode || '');
        const lowerText = text.toLowerCase();

        if (lowerText.includes('chưa gửi') || lowerText.includes('bản nháp') || code === 'draft') {
            return `<span class="badge" style="background: #fefce8; color: #a16207; border: 1px solid #fef08a; font-weight: 600; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">${text || 'Chưa gửi'}</span>`;
        }
        
        if (lowerText.includes('xác nhận') || code === 'pending_confirm') {
            return `<span class="badge" style="background: #fff7ed; color: #c2410c; border: 1px solid #ffedd5; font-weight: 600; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">${text || 'Chờ xác nhận gửi'}</span>`;
        }

        if (lowerText.includes('thẩm định') || lowerText.includes('rà soát') || lowerText.includes('phân công') || code === 'pending_review' || code === 'review' || code === 'reviewing' || code === 'thamdinh') {
            return `<span class="badge" style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; font-weight: 600; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">${text || 'Đang chờ thẩm định'}</span>`;
        }

        if (lowerText.includes('phê duyệt') || lowerText.includes('chủ trương') || lowerText.includes('trình') || lowerText.includes('ký') || code === 'pending_approval' || code === 'approval' || code === 'pheduyet' || code === 'pending_submission' || code === 'pending_sign') {
            return `<span class="badge" style="background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; font-weight: 600; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">${text || 'Chờ phê duyệt'}</span>`;
        }

        if (lowerText.includes('bổ sung') || lowerText.includes('cập nhật') || (lowerText.includes('hiệu lực') && lowerText.includes('chưa')) || code === 'pending_supplement' || code === 'pending_update' || code === 'pending_effective') {
            return `<span class="badge" style="background: #fff1f2; color: #be123c; border: 1px solid #fecdd3; font-weight: 600; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">${text || 'Chờ bổ sung'}</span>`;
        }

        if (lowerText.includes('đã phê duyệt') || lowerText.includes('đã chấp thuận') || lowerText.includes('đủ cơ sở') || lowerText.includes('phát hành') || lowerText.includes('hiệu lực') || lowerText.includes('hoạt động') || code === 'approved' || code === 'active' || code === 'published' || code === 'eligible_submit') {
            return `<span class="badge" style="background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; font-weight: 600; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">${text || 'Đã phê duyệt'}</span>`;
        }

        if (lowerText.includes('không') || lowerText.includes('quá hạn') || lowerText.includes('hết hạn') || code === 'rejected' || code === 'ineligible_submit' || code === 'expired' || code === 'warning' || code === 'retired') {
            return `<span class="badge" style="background: #fef2f2; color: #991b1b; border: 1px solid #fca5a5; font-weight: 700; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">${text || 'Không đạt'}</span>`;
        }

        if (lowerText.includes('hủy') || code === 'cancelled' || code === 'on leave') {
            return `<span class="badge" style="background: #f8fafc; color: #64748b; border: 1px solid #cbd5e1; font-weight: 600; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">${text || 'Đã hủy'}</span>`;
        }

        return `<span class="badge" style="background: #f8fafc; color: #475569; border: 1px solid #e2e8f0; font-weight: 600; font-size: 12px; padding: 5px 14px; border-radius: 20px; white-space: nowrap; display: inline-block;">${text}</span>`;
    },

    renderDeadlineText(deadlineStr) {
        if (!deadlineStr) {
            return `<span style="font-size: 12.5px; color: #94a3b8; white-space: nowrap;">Chưa lập hạn</span>`;
        }
        const text = String(deadlineStr).trim();
        const lower = text.toLowerCase();

        let isOver = lower.includes('quá hạn') || lower.includes('quá');
        if (!isOver) {
            const d = new Date(text);
            if (!isNaN(d.getTime())) {
                const today = new Date('2026-07-24');
                isOver = d < today;
            }
        }

        if (isOver) {
            return `<span style="color: #dc2626; font-weight: 700; font-size: 13px; white-space: nowrap;">${text}</span>`;
        } else {
            return `<span style="color: #334155; font-size: 13px; font-weight: 500; white-space: nowrap;">${text}</span>`;
        }
    }
};

function formatDate(dateString) {
    const d = new Date(dateString);
    return d.toLocaleDateString('vi-VN');
}

function getAvatarColor(name) {
    const colors = [
        'linear-gradient(135deg, var(--primary), var(--primary-dark))',
        'linear-gradient(135deg, var(--success), var(--success-dark))',
        'linear-gradient(135deg, #F59E0B, #D97706)',
        'linear-gradient(135deg, #8B5CF6, #7C3AED)',
        'linear-gradient(135deg, #EC4899, #DB2777)'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
}

function getInitials(name) {
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

document.addEventListener('DOMContentLoaded', () => App.init());

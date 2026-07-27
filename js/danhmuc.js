function renderDanhMuc(container) {
    // Keep track of current tab (unit or position)
    App.state.activeCategoryTab = App.state.activeCategoryTab || 'unit';
    
    const isUnitTab = App.state.activeCategoryTab === 'unit';
    const dataList = isUnitTab ? (App.state.categories || []) : (App.state.positions || []);
    const title = isUnitTab ? 'Danh mục Đơn vị' : 'Danh mục Chức vụ';
    const thCode = isUnitTab ? 'Mã ĐV' : 'Mã CV';
    const thName = isUnitTab ? 'Tên Đơn vị' : 'Tên Chức vụ';
    const thType = isUnitTab ? 'Loại Đơn vị' : 'Nhóm Chức vụ';
    
    const html = `
        <div class="page-header">
            <div class="page-header-left"><h1>Quản lý danh mục</h1><p>Chuẩn hóa dữ liệu dùng chung trong toàn hệ thống</p></div>
            <div class="page-header-actions"><button class="btn btn-primary" id="btn-create-category"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Thêm mới</button></div>
        </div>

        <div style="display: flex; gap: 24px; align-items: flex-start;">
            <div class="dash-sidebar" style="width: 280px; flex-shrink: 0;">
                <div class="card">
                    <div class="card-header"><h3 class="card-title">Loại danh mục</h3></div>
                    <div class="nav-list" style="padding: 12px 0;">
                        <div class="nav-item ${isUnitTab ? 'active' : ''}" style="margin: 0 12px 4px;" data-tab="unit">
                            <a href="#" class="nav-link" style="color: var(${isUnitTab ? '--text-primary' : '--text-secondary'});">Danh mục đơn vị</a>
                        </div>
                        <div class="nav-item ${!isUnitTab ? 'active' : ''}" style="margin: 0 12px 4px;" data-tab="position">
                            <a href="#" class="nav-link" style="color: var(${!isUnitTab ? '--text-primary' : '--text-secondary'});">Danh mục chức vụ</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dash-main" style="flex: 1; min-width: 0;">
                <div class="card">
                    <div class="card-header" style="display:flex;justify-content:space-between;align-items:center;"><h3 class="card-title">${title}</h3></div>
                    <div class="table-container" style="border:none;border-radius:0;">
                        <table class="data-table">
                            <thead><tr><th>${thCode}</th><th>${thName}</th><th>${thType}</th><th style="text-align:center; white-space:nowrap;">Trạng thái</th><th style="text-align:center;">Thao tác</th></tr></thead>
                            <tbody id="category-table-body">
                                ${dataList.map(item => `
                                    <tr>
                                        <td>${item.code}</td><td><span style="font-weight:500;">${item.name}</span></td><td>${item.type}</td><td style="text-align:center; white-space:nowrap;"><span class="badge ${item.status === 'active' ? 'badge-success' : 'badge-danger'}">${item.status === 'active' ? 'Đang sử dụng' : 'Ngừng sử dụng'}</span></td><td style="text-align:center;"><button class="btn-icon btn-ghost btn-toggle-category" data-code="${item.code}" title="Thay đổi trạng thái sử dụng" style="color: var(--primary);"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></button></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;

    container.querySelectorAll('.dash-sidebar .nav-item').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            App.state.activeCategoryTab = tab.dataset.tab;
            App.refreshCurrentPage();
        });
    });

    container.querySelector('#btn-create-category')?.addEventListener('click', () => {
        const formHTML = `
            <div class="form-container">
                <div class="grid-2" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                    <div class="form-group"><label class="form-label">Mã danh mục <span class="text-danger">*</span></label><input type="text" class="form-input" name="code" placeholder="${isUnitTab ? 'VD: TCCB' : 'VD: GD'}"></div>
                    <div class="form-group"><label class="form-label">Tên danh mục <span class="text-danger">*</span></label><input type="text" class="form-input" name="name" placeholder="${isUnitTab ? 'VD: Ban Tổ chức Cán bộ' : 'VD: Giám đốc'}"></div>
                    <div class="form-group" style="grid-column:1/-1"><label class="form-label">Loại/Nhóm</label>
                        <select class="form-input" name="type">
                            ${isUnitTab ? `
                                <option>Ban chức năng</option>
                                <option>Văn phòng</option>
                                <option>Ban Giám đốc</option>
                            ` : `
                                <option>Ban Giám đốc</option>
                                <option>Văn phòng</option>
                                <option>Ban chức năng</option>
                            `}
                        </select>
                    </div>
                </div>
            </div>
        `;
        App.openModal('Thêm mới ' + title, formHTML, () => {
            const form = document.querySelector('#app-modal .form-container');
            const code = form.querySelector('[name="code"]').value.trim();
            const name = form.querySelector('[name="name"]').value.trim();
            if (!code || !name) {
                App.notify('Vui lòng nhập mã và tên danh mục.', 'warning');
                return;
            }
            if (isUnitTab) {
                App.state.categories.unshift({ code, name, type: form.querySelector('[name="type"]').value, status: 'active' });
            } else {
                App.state.positions.unshift({ code, name, type: form.querySelector('[name="type"]').value, status: 'active' });
            }
            App.notify('Đã thêm danh mục mới.', 'success');
            App.refreshCurrentPage();
        });
    });

    container.querySelectorAll('.btn-toggle-category').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetList = isUnitTab ? App.state.categories : App.state.positions;
            const item = targetList.find(c => c.code === btn.dataset.code);
            if (!item) return;
            item.status = item.status === 'active' ? 'inactive' : 'active';
            App.notify(item.status === 'active' ? 'Đã kích hoạt danh mục.' : 'Đã ngừng sử dụng danh mục.', item.status === 'active' ? 'success' : 'warning');
            App.refreshCurrentPage();
        });
    });
}

const PositionController = {
    // Getters
    getPositions() { return Database.getAll('positions'); },
    getTerms() { return Database.getAll('terms'); },
    getProcedureTypes() { return Database.getAll('procedureTypes'); },
    getDocumentTypes() { return Database.getAll('documentTypes'); },
    getRequiredDocs() { return Database.getAll('requiredDocs'); },
    getStandards() { return Database.getAll('standards'); },
    getAuthorities() { return Database.getAll('authorities'); },

    // -------------------------------------------------------------
    // UC02.01 - Danh mục chức vụ
    // -------------------------------------------------------------
    addPosition(data, container) {
        if (container) Validator.clearAllErrors(container);
        let hasError = false;

        if (Validator.isEmpty(data.name)) {
            if (container) Validator.showError(container.querySelector('#add-pos-name'), 'Tên chức vụ không được để trống.');
            hasError = true;
        }

        const existingPositions = this.getPositions();
        const isDuplicate = existingPositions.some(p => 
            p.name.toLowerCase() === data.name.trim().toLowerCase() && 
            p.type === data.type && 
            p.applyFor === data.applyFor &&
            p.status === 'active'
        );

        if (isDuplicate) {
            if (container) Validator.showError(container.querySelector('#add-pos-name'), 'Đã tồn tại chức vụ cùng Tên, Loại chức vụ và Loại đơn vị áp dụng.');
            hasError = true;
        }

        if (hasError) return false;

        const newId = Database.generateId('positions', 'CV');
        const newPos = {
            id: newId,
            code: newId,
            name: data.name.trim(),
            type: data.type,
            applyFor: data.applyFor,
            note: data.note || '',
            status: 'active'
        };

        Database.insert('positions', newPos);
        return newPos;
    },

    updatePosition(id, data, container) {
        if (container) Validator.clearAllErrors(container);
        let hasError = false;

        if (Validator.isEmpty(data.name)) {
            if (container) Validator.showError(container.querySelector('#edit-pos-name'), 'Tên chức vụ không được để trống.');
            hasError = true;
        }

        const existingPositions = this.getPositions();
        const isDuplicate = existingPositions.some(p => 
            p.id !== id &&
            p.name.toLowerCase() === data.name.trim().toLowerCase() && 
            p.type === data.type && 
            p.applyFor === data.applyFor &&
            p.status === 'active'
        );

        if (isDuplicate) {
            if (container) Validator.showError(container.querySelector('#edit-pos-name'), 'Đã tồn tại chức vụ cùng Tên, Loại chức vụ và Loại đơn vị áp dụng.');
            hasError = true;
        }

        if (hasError) return false;

        return Database.update('positions', id, {
            name: data.name.trim(),
            type: data.type,
            applyFor: data.applyFor,
            note: data.note || ''
        });
    },

    togglePositionStatus(id, newStatus) {
        return Database.update('positions', id, { status: newStatus });
    },

    // -------------------------------------------------------------
    // UC02.02 - Thiết lập nhiệm kỳ chức vụ
    // -------------------------------------------------------------
    addTerm(data, container) {
        if (container) Validator.clearAllErrors(container);
        let hasError = false;

        if (Validator.isEmpty(data.position)) {
            if (container) Validator.showError(container.querySelector('#add-term-pos'), 'Vui lòng chọn chức vụ.');
            hasError = true;
        }
        if (Validator.isEmpty(data.duration) || parseInt(data.duration) <= 0) {
            if (container) Validator.showError(container.querySelector('#add-term-duration'), 'Thời hạn nhiệm kỳ phải lớn hơn 0.');
            hasError = true;
        }
        if (Validator.isEmpty(data.startDate)) {
            if (container) Validator.showError(container.querySelector('#add-term-start'), 'Ngày bắt đầu áp dụng là bắt buộc.');
            hasError = true;
        }

        const existingTerms = this.getTerms().filter(t => t.position === data.position && t.status === 'active');
        if (existingTerms.length > 0) {
            if (container) Validator.showError(container.querySelector('#add-term-pos'), 'Chức vụ này đã có quy định nhiệm kỳ đang áp dụng.');
            hasError = true;
        }

        if (hasError) return false;

        const newId = Database.generateId('terms', 'NK');
        const newTerm = {
            id: newId,
            position: data.position,
            duration: parseInt(data.duration),
            startDate: data.startDate,
            note: data.note || '',
            status: 'active'
        };

        Database.insert('terms', newTerm);
        return newTerm;
    },

    updateTerm(id, data, container) {
        if (container) Validator.clearAllErrors(container);
        if (Validator.isEmpty(data.duration) || parseInt(data.duration) <= 0) {
            App.notify('Thời hạn nhiệm kỳ phải lớn hơn 0.', 'warning');
            return false;
        }
        return Database.update('terms', id, {
            position: data.position,
            duration: parseInt(data.duration),
            startDate: data.startDate,
            note: data.note || ''
        });
    },

    stopTerm(id, endDate) {
        return Database.update('terms', id, { status: 'inactive', endDate: endDate || new Date().toISOString().split('T')[0] });
    },

    // -------------------------------------------------------------
    // UC02.03 - Quản lý loại thủ tục
    // -------------------------------------------------------------
    addProcedureType(data, container) {
        if (container) Validator.clearAllErrors(container);
        if (Validator.isEmpty(data.name)) {
            if (container) Validator.showError(container.querySelector('#add-proc-name'), 'Tên loại thủ tục là bắt buộc.');
            return false;
        }

        const existing = this.getProcedureTypes();
        if (existing.some(p => p.name.toLowerCase() === data.name.trim().toLowerCase())) {
            if (container) Validator.showError(container.querySelector('#add-proc-name'), 'Tên loại thủ tục này đã tồn tại.');
            return false;
        }

        const newId = Database.generateId('procedureTypes', 'TT');
        const newItem = { id: newId, name: data.name.trim(), desc: data.desc || '', status: 'active' };
        Database.insert('procedureTypes', newItem);
        return newItem;
    },

    updateProcedureType(id, data, container) {
        if (container) Validator.clearAllErrors(container);
        if (Validator.isEmpty(data.name)) {
            App.notify('Tên loại thủ tục không được để trống.', 'warning');
            return false;
        }

        const existing = this.getProcedureTypes();
        if (existing.some(p => p.id !== id && p.name.toLowerCase() === data.name.trim().toLowerCase())) {
            App.notify('Tên loại thủ tục này đã tồn tại.', 'warning');
            return false;
        }

        return Database.update('procedureTypes', id, {
            name: data.name.trim(),
            desc: data.desc || ''
        });
    },

    stopProcedureType(id) {
        return Database.update('procedureTypes', id, { status: 'inactive' });
    },

    // -------------------------------------------------------------
    // UC02.04 - Quản lý loại tài liệu
    // -------------------------------------------------------------
    addDocumentType(data, container) {
        if (container) Validator.clearAllErrors(container);
        if (Validator.isEmpty(data.name)) {
            if (container) Validator.showError(container.querySelector('#add-doctype-name'), 'Tên loại tài liệu là bắt buộc.');
            return false;
        }

        const existing = this.getDocumentTypes();
        if (existing.some(d => d.name.toLowerCase() === data.name.trim().toLowerCase())) {
            if (container) Validator.showError(container.querySelector('#add-doctype-name'), 'Loại tài liệu này đã tồn tại.');
            return false;
        }

        const newId = Database.generateId('documentTypes', 'TL');
        const newItem = { id: newId, name: data.name.trim(), desc: data.desc || '', status: 'active' };
        Database.insert('documentTypes', newItem);
        return newItem;
    },

    updateDocumentType(id, data, container) {
        if (container) Validator.clearAllErrors(container);
        if (Validator.isEmpty(data.name)) {
            App.notify('Tên loại tài liệu không được để trống.', 'warning');
            return false;
        }

        const existing = this.getDocumentTypes();
        if (existing.some(d => d.id !== id && d.name.toLowerCase() === data.name.trim().toLowerCase())) {
            App.notify('Loại tài liệu này đã tồn tại.', 'warning');
            return false;
        }

        return Database.update('documentTypes', id, {
            name: data.name.trim(),
            desc: data.desc || ''
        });
    },

    stopDocumentType(id) {
        return Database.update('documentTypes', id, { status: 'inactive' });
    },

    // -------------------------------------------------------------
    // UC02.05 - Thiết lập thành phần hồ sơ bắt buộc
    // -------------------------------------------------------------
    addRequiredDoc(data, container) {
        if (container) Validator.clearAllErrors(container);
        if (Validator.isEmpty(data.position) || Validator.isEmpty(data.procedure) || Validator.isEmpty(data.docType)) {
            App.notify('Vui lòng chọn Chức vụ, Loại thủ tục và Loại tài liệu bắt buộc.', 'warning');
            return false;
        }

        const existing = this.getRequiredDocs();
        const isDuplicate = existing.some(r => 
            r.position === data.position && 
            r.procedure === data.procedure && 
            (r.source || 'Tất cả') === (data.source || 'Tất cả') && 
            r.docType === data.docType
        );

        if (isDuplicate) {
            App.notify('Cấu hình thành phần hồ sơ này đã tồn tại.', 'warning');
            return false;
        }

        const newId = Database.generateId('requiredDocs', 'TP');
        const newItem = {
            id: newId,
            position: data.position,
            procedure: data.procedure,
            source: data.source || 'Tất cả',
            docType: data.docType,
            note: data.note || ''
        };

        Database.insert('requiredDocs', newItem);
        return newItem;
    },

    updateRequiredDoc(id, data, container) {
        if (container) Validator.clearAllErrors(container);
        if (Validator.isEmpty(data.position) || Validator.isEmpty(data.procedure) || Validator.isEmpty(data.docType)) {
            App.notify('Vui lòng nhập đủ Chức vụ, Loại thủ tục và Loại tài liệu.', 'warning');
            return false;
        }

        return Database.update('requiredDocs', id, {
            position: data.position,
            procedure: data.procedure,
            source: data.source || 'Tất cả',
            docType: data.docType,
            note: data.note || ''
        });
    },

    deleteRequiredDoc(id) {
        return Database.delete('requiredDocs', id);
    },

    // -------------------------------------------------------------
    // UC02.06 - Thiết lập tiêu chuẩn bổ nhiệm
    // -------------------------------------------------------------
    addStandard(data, container) {
        if (container) Validator.clearAllErrors(container);
        if (Validator.isEmpty(data.position) || Validator.isEmpty(data.procedure) || Validator.isEmpty(data.content)) {
            App.notify('Vui lòng nhập Chức vụ, Loại thủ tục và Nội dung tiêu chuẩn.', 'warning');
            return false;
        }

        const existing = this.getStandards();
        const isDuplicate = existing.some(s => 
            s.position === data.position && 
            s.procedure === data.procedure && 
            (s.source || 'Tất cả') === (data.source || 'Tất cả') && 
            s.category === data.category &&
            s.content.toLowerCase() === data.content.trim().toLowerCase() &&
            s.status === 'active'
        );

        if (isDuplicate) {
            App.notify('Tiêu chuẩn này đã tồn tại trong hệ thống.', 'warning');
            return false;
        }

        const newId = Database.generateId('standards', 'TC');
        const newItem = {
            id: newId,
            position: data.position,
            procedure: data.procedure,
            source: data.source || 'Tất cả',
            category: data.category || 'Trình độ chuyên môn',
            content: data.content.trim(),
            docType: data.docType || '',
            legalBasis: data.legalBasis || '',
            startDate: data.startDate || new Date().toISOString().split('T')[0],
            status: 'active'
        };

        Database.insert('standards', newItem);
        return newItem;
    },

    updateStandard(id, data, container) {
        if (container) Validator.clearAllErrors(container);
        if (Validator.isEmpty(data.content)) {
            App.notify('Nội dung tiêu chuẩn không được để trống.', 'warning');
            return false;
        }

        return Database.update('standards', id, {
            position: data.position,
            procedure: data.procedure,
            source: data.source || 'Tất cả',
            category: data.category,
            content: data.content.trim(),
            docType: data.docType || '',
            legalBasis: data.legalBasis || ''
        });
    },

    stopStandard(id, endDate) {
        return Database.update('standards', id, { status: 'inactive', endDate: endDate || new Date().toISOString().split('T')[0] });
    },

    // -------------------------------------------------------------
    // UC02.07 - Thiết lập thẩm quyền xử lý
    // -------------------------------------------------------------
    addAuthority(data, container) {
        if (container) Validator.clearAllErrors(container);
        if (Validator.isEmpty(data.position) || Validator.isEmpty(data.procedure) || Validator.isEmpty(data.authority)) {
            App.notify('Vui lòng nhập Chức vụ, Loại thủ tục và Cấp có thẩm quyền.', 'warning');
            return false;
        }

        const existing = this.getAuthorities();
        const isDuplicate = existing.some(a => 
            a.position === data.position && 
            a.procedure === data.procedure && 
            a.unitScope === data.unitScope &&
            a.status === 'active'
        );

        if (isDuplicate) {
            App.notify('Đã tồn tại quy tắc thẩm quyền cho Chức vụ, Loại thủ tục và Phạm vi đơn vị này.', 'warning');
            return false;
        }

        const newId = Database.generateId('authorities', 'TQ');
        const newItem = {
            id: newId,
            position: data.position,
            procedure: data.procedure,
            unitScope: data.unitScope || 'Tất cả',
            authority: data.authority,
            startDate: data.startDate || new Date().toISOString().split('T')[0],
            status: 'active'
        };

        Database.insert('authorities', newItem);
        return newItem;
    },

    updateAuthority(id, data, container) {
        if (container) Validator.clearAllErrors(container);
        if (Validator.isEmpty(data.authority)) {
            App.notify('Cấp có thẩm quyền không được để trống.', 'warning');
            return false;
        }

        return Database.update('authorities', id, {
            position: data.position,
            procedure: data.procedure,
            unitScope: data.unitScope || 'Tất cả',
            authority: data.authority
        });
    },

    stopAuthority(id, endDate) {
        return Database.update('authorities', id, { status: 'inactive', endDate: endDate || new Date().toISOString().split('T')[0] });
    },

    // -------------------------------------------------------------
    // UC02.08 - Tra cứu yêu cầu bổ nhiệm
    // -------------------------------------------------------------
    searchRequirements(filters) {
        const terms = this.getTerms().filter(t => t.status === 'active' && (!filters.position || t.position === filters.position));
        const requiredDocs = this.getRequiredDocs().filter(r => 
            (!filters.position || r.position === filters.position) &&
            (!filters.procedure || r.procedure === filters.procedure) &&
            (!filters.source || r.source === 'Tất cả' || r.source === filters.source)
        );
        const standards = this.getStandards().filter(s => 
            s.status === 'active' &&
            (!filters.position || s.position === filters.position) &&
            (!filters.procedure || s.procedure === filters.procedure) &&
            (!filters.source || s.source === 'Tất cả' || s.source === filters.source)
        );

        return { terms, requiredDocs, standards };
    }
};

window.PositionController = PositionController;

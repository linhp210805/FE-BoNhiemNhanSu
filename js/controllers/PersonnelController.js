const PersonnelController = {
    // Get all list
    getList() {
        return Database.getAll('personnel');
    },

    // Get detail
    getDetail(id) {
        return Database.getById('personnel', id);
    },

    // Add new personnel
    addPersonnel(data, container) {
        Validator.clearAllErrors(container);
        let hasError = false;

        // Validations
        if (Validator.isEmpty(data.name)) {
            Validator.showError(container.querySelector('#add-name'), 'Họ tên không được để trống.');
            hasError = true;
        }
        if (Validator.isEmpty(data.gender)) {
            Validator.showError(container.querySelector('#add-gender'), 'Vui lòng chọn giới tính.');
            hasError = true;
        }
        if (Validator.isEmpty(data.email) || !Validator.isValidEmail(data.email)) {
            Validator.showError(container.querySelector('#add-email'), 'Email không hợp lệ hoặc để trống.');
            hasError = true;
        }
        if (Validator.isEmpty(data.unit)) {
            Validator.showError(container.querySelector('#add-unit'), 'Vui lòng chọn đơn vị.');
            hasError = true;
        }
        if (Validator.isEmpty(data.department)) {
            Validator.showError(container.querySelector('#add-dept'), 'Vui lòng chọn phòng ban.');
            hasError = true;
        }
        if (Validator.isEmpty(data.position)) {
            Validator.showError(container.querySelector('#add-position'), 'Vui lòng chọn chức vụ.');
            hasError = true;
        }

        // Check unique ID if user provided one
        let newId = data.id;
        if (!Validator.isEmpty(newId)) {
            if (this.getDetail(newId)) {
                Validator.showError(container.querySelector('#add-id'), 'Mã cán bộ này đã tồn tại.');
                hasError = true;
            }
        } else {
            // Auto generate ID (BR01)
            newId = Database.generateId('personnel', 'NS');
        }

        if (hasError) return false;

        const newPerson = {
            id: newId,
            name: data.name,
            gender: data.gender,
            email: data.email,
            unit: data.unit,
            department: data.department,
            position: data.position,
            degree: data.degree || '',
            status: 'active',
            updated: new Date().toLocaleDateString('vi-VN'),
            initials: window.getInitials ? window.getInitials(data.name) : 'NA',
            accent: window.getAvatarColor ? window.getAvatarColor(data.name) : 'var(--primary)',
            documents: data.documents || [] // For UC01.01 initial docs
        };

        Database.insert('personnel', newPerson);
        return newPerson;
    },

    // Update personnel
    updatePersonnel(id, data, formElement) {
        Validator.clearAllErrors(formElement);
        let hasError = false;

        if (Validator.isEmpty(data.name)) {
            Validator.showError(formElement.querySelector('#edit-name'), 'Họ tên không được để trống.');
            hasError = true;
        }
        if (Validator.isEmpty(data.email) || !Validator.isValidEmail(data.email)) {
            Validator.showError(formElement.querySelector('#edit-email'), 'Email không hợp lệ.');
            hasError = true;
        }
        if (Validator.isEmpty(data.position)) {
            Validator.showError(formElement.querySelector('#edit-position'), 'Chức vụ không được để trống.');
            hasError = true;
        }

        if (hasError) return false;

        const person = this.getDetail(id);
        if (!person) return false;

        const updatedData = {
            ...data,
            updated: new Date().toLocaleDateString('vi-VN')
        };
        
        Database.update('personnel', id, updatedData);
        return true;
    },

    // Add document
    addDocument(personId, docData, formElement) {
        Validator.clearAllErrors(formElement);
        let hasError = false;

        if (Validator.isEmpty(docData.name)) {
            Validator.showError(formElement.querySelector('#doc-name'), 'Tên tài liệu là bắt buộc.');
            hasError = true;
        }
        if (Validator.isEmpty(docData.type)) {
            Validator.showError(formElement.querySelector('#doc-type'), 'Vui lòng chọn loại tài liệu.');
            hasError = true;
        }
        
        // Logical check for dates (BR02 related)
        if (docData.effectiveDate && docData.expireDate) {
            if (!Validator.isValidDateRange(docData.effectiveDate, docData.expireDate)) {
                Validator.showError(formElement.querySelector('#doc-expire'), 'Ngày hết hạn phải lớn hơn hoặc bằng ngày hiệu lực.');
                hasError = true;
            }
        }

        if (hasError) return false;

        const person = this.getDetail(personId);
        if (!person) return false;

        const status = Validator.getDocumentStatus(docData.effectiveDate, docData.expireDate);
        
        const newDoc = {
            id: Database.generateId('personnel', 'DOC'), // use generic generator
            name: docData.name,
            type: docData.type,
            issuer: docData.issuer || '',
            effectiveDate: docData.effectiveDate ? new Date(docData.effectiveDate).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN'),
            expireDate: docData.expireDate ? new Date(docData.expireDate).toLocaleDateString('vi-VN') : '',
            status: status,
            note: docData.note || ''
        };

        const docs = person.documents || [];
        docs.push(newDoc);
        
        Database.update('personnel', personId, { documents: docs });
        return true;
    },

    // Update document
    updateDocument(personId, docId, docData, formElement) {
        if (formElement) Validator.clearAllErrors(formElement);
        let hasError = false;

        if (formElement && Validator.isEmpty(docData.name)) {
            Validator.showError(formElement.querySelector('#doc-name') || formElement.querySelector('#edit-doc-name'), 'Tên tài liệu là bắt buộc.');
            hasError = true;
        }
        if (formElement && Validator.isEmpty(docData.type)) {
            Validator.showError(formElement.querySelector('#doc-type') || formElement.querySelector('#edit-doc-type'), 'Vui lòng chọn loại tài liệu.');
            hasError = true;
        }

        if (hasError) return false;

        const person = this.getDetail(personId);
        if (!person || !person.documents) return false;

        const index = person.documents.findIndex(d => d.id === docId);
        if (index === -1) return false;

        const status = Validator.getDocumentStatus(docData.effectiveDate, docData.expireDate);

        person.documents[index] = {
            ...person.documents[index],
            name: docData.name || person.documents[index].name,
            type: docData.type || person.documents[index].type,
            issuer: docData.issuer !== undefined ? docData.issuer : person.documents[index].issuer,
            effectiveDate: docData.effectiveDate ? new Date(docData.effectiveDate).toLocaleDateString('vi-VN') : person.documents[index].effectiveDate,
            expireDate: docData.expireDate ? new Date(docData.expireDate).toLocaleDateString('vi-VN') : person.documents[index].expireDate,
            status: status || person.documents[index].status,
            note: docData.note !== undefined ? docData.note : person.documents[index].note
        };

        Database.update('personnel', personId, { documents: person.documents });
        return true;
    },

    // Delete document
    deleteDocument(personId, docId) {
        const person = this.getDetail(personId);
        if (!person || !person.documents) return false;

        const updatedDocs = person.documents.filter(d => d.id !== docId);
        Database.update('personnel', personId, { documents: updatedDocs });
        return true;
    }
};

window.PersonnelController = PersonnelController;

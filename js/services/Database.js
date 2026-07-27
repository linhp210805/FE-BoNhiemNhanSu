const Database = {
    DB_NAME: 'ttnn_db_v1',
    
    // Initial mock data
    defaultData: {
        personnel: [
            { 
                id: 'NS-2018-001', name: 'TS. Lê Văn Minh', gender: 'Nam', 
                unit: 'Ban Giám đốc', unitCode: 'bgd', department: 'Ban Giám đốc', 
                position: 'Phó Giám đốc', positionCode: 'pgd', degree: 'Tiến sĩ',
                status: 'active', updated: '01/06/2026', initials: 'LM', accent: 'var(--primary)', 
                email: 'minh.lv@udn.vn', phone: '0905 123 456', dob: '1975-05-12', cccd: '048075001234', home: 'Hải Châu, Đà Nẵng',
                documents: [
                    { id: 'DOC-001', type: 'Sơ yếu lý lịch 2C/TCTW', name: 'SYLL TS. Lê Văn Minh', issuer: 'Ban Tổ chức', issueDate: '01/05/2026', effectiveDate: '01/05/2026', expireDate: '01/11/2026', status: 'Còn hiệu lực', note: '' },
                    { id: 'DOC-002', type: 'Giấy khám sức khỏe', name: 'GKSK BV Đà Nẵng', issuer: 'Bệnh viện C Đà Nẵng', issueDate: '15/01/2025', effectiveDate: '15/01/2025', expireDate: '15/07/2025', status: 'Hết hiệu lực', note: '' }
                ]
            },
            { 
                id: 'NS-2019-042', name: 'PGS.TS. Trần Thị Hoa', gender: 'Nữ', 
                unit: 'Văn phòng', unitCode: 'vp', department: 'Phòng Hành chính - Tổng hợp', 
                position: 'Phó Chánh Văn phòng', positionCode: 'pcvp', degree: 'Phó Giáo sư, Tiến sĩ',
                status: 'active', updated: '15/05/2026', initials: 'TH', accent: 'var(--info)', 
                email: 'hoa.tt@udn.vn', phone: '0906 943 210', dob: '1980-08-19', cccd: '048075009876', home: 'Liên Chiểu, Đà Nẵng',
                documents: [
                    { id: 'DOC-003', type: 'Bản kê khai tài sản', name: 'KKTS 2026', issuer: 'UBND Phường', issueDate: '10/01/2026', effectiveDate: '10/01/2026', expireDate: '10/01/2027', status: 'Còn hiệu lực', note: '' }
                ]
            },
            { 
                id: 'NS-2021-045', name: 'ThS. Bùi Thị Hương', gender: 'Nữ', 
                unit: 'Ban Đào tạo', unitCode: 'daotao', department: 'Phòng Quản lý Đào tạo', 
                position: 'Phó Trưởng ban', positionCode: 'ptb', degree: 'Thạc sĩ',
                status: 'active', updated: '20/05/2026', initials: 'BH', accent: 'var(--warning)', 
                email: 'huong.bt@udn.vn', phone: '0903 888 999', dob: '1983-11-25', cccd: '048083005555', home: 'Sơn Trà, Đà Nẵng',
                documents: [
                    { id: 'DOC-004', type: 'Sơ yếu lý lịch 2C/TCTW', name: 'SYLL ThS. Bùi Thị Hương', issuer: 'Ban Tổ chức', issueDate: '01/02/2026', effectiveDate: '01/02/2026', expireDate: '01/08/2026', status: 'Còn hiệu lực', note: '' }
                ]
            },
            { 
                id: 'NS-2020-012', name: 'TS. Phạm Quốc Bảo', gender: 'Nam', 
                unit: 'Ban Thanh tra và Pháp chế', unitCode: 'ttpc', department: 'Phòng Thanh tra', 
                position: 'Trưởng ban', positionCode: 'tb', degree: 'Tiến sĩ',
                status: 'active', updated: '01/06/2026', initials: 'PB', accent: 'var(--success)', 
                email: 'bao.pq@udn.vn', phone: '0908 111 222', dob: '1978-04-14', cccd: '048078003333', home: 'Cẩm Lệ, Đà Nẵng',
                documents: [
                    { id: 'DOC-005', type: 'Bản kê khai tài sản', name: 'KKTS TS. Phạm Quốc Bảo', issuer: 'UBND Phường', issueDate: '15/01/2026', effectiveDate: '15/01/2026', expireDate: '15/01/2027', status: 'Còn hiệu lực', note: '' }
                ]
            }
        ],
        proposals: [],
        dossiers: [],
        approvals: [],
        decisions: [],
        meetings: [],
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
            { id: 'CV001', code: 'GD', name: 'Giám đốc Đại học Đà Nẵng', type: 'Lãnh đạo Đại học', applyFor: 'Đại học Đà Nẵng', status: 'active' },
            { id: 'CV002', code: 'TK', name: 'Trưởng khoa', type: 'Lãnh đạo đơn vị chuyên môn', applyFor: 'Các khoa thuộc trường', status: 'active' }
        ],
        terms: [
            { id: 'NK001', position: 'Giám đốc Đại học Đà Nẵng', duration: 5, startDate: '2020-01-01', status: 'active' },
            { id: 'NK002', position: 'Trưởng khoa', duration: 5, startDate: '2021-01-01', status: 'active' }
        ],
        procedureTypes: [
            { id: 'TT001', name: 'Bổ nhiệm mới', desc: 'Áp dụng cho nhân sự được đề nghị bổ nhiệm lần đầu.', status: 'active' },
            { id: 'TT002', name: 'Công nhận', desc: 'Công nhận viên chức quản lý, Hội đồng trường theo Quy chế 4343/QĐ-ĐHĐN.', status: 'active' },
            { id: 'TT003', name: 'Bổ nhiệm lại', desc: 'Áp dụng cho cán bộ sắp hết thời gian giữ chức vụ.', status: 'active' },
            { id: 'TT004', name: 'Kéo dài thời gian giữ chức vụ', desc: 'Áp dụng cho cán bộ còn dưới 5 năm công tác đến tuổi nghỉ hưu.', status: 'active' },
            { id: 'TT005', name: 'Thôi giữ chức vụ và miễn nhiệm', desc: 'Theo nguyện vọng cá nhân hoặc theo quyết định kỷ luật.', status: 'active' }
        ],
        documentTypes: [
            { id: 'TL001', name: 'Sơ yếu lý lịch (Mẫu 2C/TCTW)', desc: 'Áp dụng cho tất cả thủ tục bổ nhiệm', status: 'active' },
            { id: 'TL002', name: 'Bản kê khai tài sản', desc: 'Bản kê khai tài sản, thu nhập năm gần nhất', status: 'active' },
            { id: 'TL003', name: 'Giấy khám sức khỏe', desc: 'Giấy chứng nhận sức khỏe của bệnh viện cấp huyện trở lên', status: 'active' },
            { id: 'TL004', name: 'Văn bằng và chứng chỉ chuyên môn', desc: 'Bằng tốt nghiệp đại học, sau đại học và ngoại ngữ', status: 'active' }
        ],
        requiredDocs: [
            { id: 'TP001', position: 'Trưởng ban', procedure: 'Bổ nhiệm mới', source: 'Tất cả', docType: 'Sơ yếu lý lịch (Mẫu 2C/TCTW)', note: 'Bắt buộc dán ảnh và công chứng' },
            { id: 'TP002', position: 'Trưởng khoa', procedure: 'Bổ nhiệm mới', source: 'Tất cả', docType: 'Bản kê khai tài sản', note: 'Kê khai năm gần nhất' }
        ],
        standards: [
            { id: 'TC001', position: 'Trưởng ban', procedure: 'Bổ nhiệm mới', source: 'Tại chỗ', category: 'Trình độ chuyên môn', content: 'Có bằng Tiến sĩ phù hợp với lĩnh vực công tác', docType: 'Văn bằng và chứng chỉ chuyên môn', legalBasis: 'Quy định 123-QĐ/ĐHĐN', startDate: '2025-01-01', status: 'active' },
            { id: 'TC002', position: 'Trưởng khoa', procedure: 'Bổ nhiệm mới', source: 'Tất cả', category: 'Lý luận chính trị', content: 'Có bằng Trung cấp Lý luận chính trị trở lên', docType: 'Văn bằng và chứng chỉ chuyên môn', legalBasis: 'Quy định 456-QĐ/ĐHĐN', startDate: '2025-01-01', status: 'active' }
        ],
        authorities: [
            { id: 'TQ001', position: 'Trưởng ban', procedure: 'Bổ nhiệm mới', unitScope: 'Cơ quan Đại học Đà Nẵng', authority: 'Giám đốc Đại học Đà Nẵng', startDate: '2025-01-01', status: 'active' },
            { id: 'TQ002', position: 'Trưởng khoa', procedure: 'Bổ nhiệm mới', unitScope: 'Trường thành viên', authority: 'Hiệu trưởng trường thành viên', startDate: '2025-01-01', status: 'active' }
        ]
    },

    init() {
        if (!localStorage.getItem(this.DB_NAME)) {
            localStorage.setItem(this.DB_NAME, JSON.stringify(this.defaultData));
            console.log('Database initialized with default data.');
        }
    },

    getAll(collection) {
        const db = JSON.parse(localStorage.getItem(this.DB_NAME));
        return db[collection] || [];
    },

    getById(collection, id) {
        const items = this.getAll(collection);
        return items.find(item => item.id === id);
    },

    insert(collection, item) {
        const db = JSON.parse(localStorage.getItem(this.DB_NAME));
        if (!db[collection]) db[collection] = [];
        db[collection].push(item);
        localStorage.setItem(this.DB_NAME, JSON.stringify(db));
        return item;
    },

    update(collection, id, updatedData) {
        const db = JSON.parse(localStorage.getItem(this.DB_NAME));
        if (!db[collection]) return null;
        
        const index = db[collection].findIndex(item => item.id === id);
        if (index !== -1) {
            db[collection][index] = { ...db[collection][index], ...updatedData };
            localStorage.setItem(this.DB_NAME, JSON.stringify(db));
            return db[collection][index];
        }
        return null;
    },

    delete(collection, id) {
        const db = JSON.parse(localStorage.getItem(this.DB_NAME));
        if (!db[collection]) return false;
        
        const initialLength = db[collection].length;
        db[collection] = db[collection].filter(item => item.id !== id);
        
        if (db[collection].length < initialLength) {
            localStorage.setItem(this.DB_NAME, JSON.stringify(db));
            return true;
        }
        return false;
    },
    
    // Auto-generate ID logic for different collections based on Business Rules
    generateId(collection, prefix) {
        const items = this.getAll(collection);
        const year = new Date().getFullYear();
        let maxSeq = 0;
        
        items.forEach(item => {
            if (item.id && item.id.startsWith(prefix)) {
                // e.g., NS-2026-001 or CV001
                const parts = item.id.split('-');
                let seqStr = parts[parts.length - 1]; // last part is sequence
                if(prefix === 'CV' || prefix === 'NK' || prefix === 'TT' || prefix === 'TL' || prefix === 'DOC') {
                    // For CV001, NK001
                    seqStr = item.id.replace(prefix, '').replace('-', '');
                }
                const seq = parseInt(seqStr, 10);
                if (!isNaN(seq) && seq > maxSeq) {
                    maxSeq = seq;
                }
            }
        });
        
        const nextSeq = String(maxSeq + 1).padStart(3, '0');
        if (prefix === 'NS') return `NS-${year}-${nextSeq}`;
        if (prefix === 'DOC') return `DOC-${nextSeq}`;
        return `${prefix}${nextSeq}`;
    }
};

window.Database = Database;

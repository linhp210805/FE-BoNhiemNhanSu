const Validator = {
    isValidEmail(email) {
        if (!email) return false;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    isEmpty(value) {
        return value === undefined || value === null || String(value).trim() === '';
    },

    // Check if end date is after or equal to start date
    isValidDateRange(startDate, endDate) {
        if (!startDate || !endDate) return true; // If one is missing, can't invalidate range
        return new Date(startDate) <= new Date(endDate);
    },

    // Assess document status based on dates (BR02 of UC01.07)
    getDocumentStatus(effectiveDate, expireDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // effectiveDate string assumed to be YYYY-MM-DD or DD/MM/YYYY. Database format is often YYYY-MM-DD from input[type="date"]
        // Wait, app uses DD/MM/YYYY in defaultData, but inputs use YYYY-MM-DD. We should parse properly.
        const parseDate = (dStr) => {
            if(!dStr) return null;
            if(dStr.includes('-')) return new Date(dStr);
            const parts = dStr.split('/');
            return new Date(parts[2], parts[1]-1, parts[0]);
        };

        const effDate = parseDate(effectiveDate);
        if (!effDate) return 'Còn hiệu lực'; // Default if no dates

        if (effDate > today) {
            return 'Chưa có hiệu lực';
        }

        if (!expireDate) {
            return 'Còn hiệu lực'; // Không thời hạn (BR03)
        }

        const expDate = parseDate(expireDate);
        if (expDate < today) {
            return 'Hết hiệu lực';
        }

        // Cảnh báo hết hiệu lực (ví dụ: <= 30 ngày)
        const diffTime = Math.abs(expDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        if (diffDays <= 30) {
            return 'Sắp hết hiệu lực';
        }

        return 'Còn hiệu lực';
    },

    showError(inputElement, message) {
        // Find or create error label next to input
        let errEl = inputElement.nextElementSibling;
        if (!errEl || !errEl.classList.contains('error-msg')) {
            errEl = document.createElement('div');
            errEl.className = 'error-msg text-danger mt-1';
            errEl.style.fontSize = '12px';
            inputElement.parentNode.insertBefore(errEl, inputElement.nextSibling);
        }
        errEl.textContent = message;
        inputElement.classList.add('border-danger');
    },

    clearError(inputElement) {
        const errEl = inputElement.nextElementSibling;
        if (errEl && errEl.classList.contains('error-msg')) {
            errEl.remove();
        }
        inputElement.classList.remove('border-danger');
    },

    clearAllErrors(container) {
        container.querySelectorAll('.error-msg').forEach(el => el.remove());
        container.querySelectorAll('.border-danger').forEach(el => el.classList.remove('border-danger'));
    }
};

window.Validator = Validator;

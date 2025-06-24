document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');
    const fields = ['name', 'email', 'message'];

    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.addEventListener('input', () => {
            if (field.classList.contains('invalid')) {
                resetFieldError(fieldId);
            }
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            alert('Форма успешно проверена!');
        }
    });
});

function validateForm() {
    let isValid = true;
    resetErrors();

    if (!validateField('name', 2, 'Укажите имя')) isValid = false;
    if (!validateEmail('email')) isValid = false;
    if (!validateField('message', 10, 'Сообщение слишком короткое')) isValid = false;

    return isValid;
}

function resetFieldError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    document.getElementById(fieldId).classList.remove('invalid');
}


function validateField(fieldId, minLength, errorMessage) {
    const field = document.getElementById(fieldId);
    if (field.value.trim().length < minLength) {
        showError(fieldId + 'Error', errorMessage);
        field.classList.add('invalid');
        return false;
    }
    return true;
}

function validateEmail(fieldId) {
    const email = document.getElementById(fieldId).value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError(fieldId + 'Error', 'Некорректный email');
        document.getElementById(fieldId).classList.add('invalid');
        return false;
    }
    return true;
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function resetErrors() {
    document.querySelectorAll('.error').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('.invalid').forEach(el => {
        el.classList.remove('invalid');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const socialLinks = document.querySelectorAll('.contacts__link');

    socialLinks.forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});
const form = document.querySelector('form');

const validateForm = (event) => {
    event.preventDefault();

    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const cpfInput = document.getElementById('cpf');
    const phoneInput = document.getElementById('phone');

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const cpf = cpfInput.value.trim();
    const phone = phoneInput.value.trim();

    if(firstName === ''){
        showError(firstNameInput, 'O primeiro nome é obrigatório');
    }else{
        removeError(firstNameInput);
    }

    if(lastName === ''){
        showError(lastNameInput, 'O último nome é obrigatório');
    }else{
        removeError(lastNameInput);
    }

    if(email === ''){
        showError(emailInput, 'O email é obrigatório');
    }else if(!isValidEmail(email)){
        showError(emailInput, 'Email inválido');
    }else{
        removeError(emailInput);
    }

    if(cpf === ''){
        showError(cpfInput, 'O CPF é obrigatório');
    }else{
        removeError(cpfInput);
    }

    if(phone === ''){
        showError(phoneInput, 'O telefone é obrigatório');
    }else{
        removeError(phoneInput);
    }

}

const showError = (input, msg) => {
    input.classList.add('is-invalid');

    const errorElement = document.createElement('p');
    errorElement.className = 'error-message alert alert-danger';
    errorElement.textContent = msg;

    const parentElement = input.parentElement;
    parentElement.appendChild(errorElement);
}

const removeError = (input) => {
    input.classList.remove('is-invalid');

    const parentElement = input.parentElement;
    const errorElement = parentElement.querySelector('.error-message');
    if (errorElement) {
        parentElement.removeChild(errorElement);
    }
}

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const cpfInput = document.getElementById('cpf');
VMasker(cpfInput).maskPattern('999.999.999-99');

const phoneInput = document.getElementById('phone');
VMasker(phoneInput).maskPattern('(99) 9999-9999');

form.addEventListener('submit', validateForm);
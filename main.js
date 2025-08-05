   // Contact form validation and submission simulation
    const form = document.getElementById('contact-form');
    const nameInput = form.name;
    const emailInput = form.email;
    const messageInput = form.message;

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formSuccess = document.getElementById('form-success');

    function validateEmail(email) {
      // Simple email regex
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let valid = true;

      if (!nameInput.value.trim()) {
        nameError.style.display = 'block';
        valid = false;
      } else {
        nameError.style.display = 'none';
      }

      if (!validateEmail(emailInput.value.trim())) {
        emailError.style.display = 'block';
        valid = false;
      } else {
        emailError.style.display = 'none';
      }

      if (!messageInput.value.trim()) {
        messageError.style.display = 'block';
        valid = false;
      } else {
        messageError.style.display = 'none';
      }

      if (valid) {
        formSuccess.classList.remove('d-none');
        form.reset();
        setTimeout(() => {
          formSuccess.classList.add('d-none');
        }, 5000);
      } else {
        formSuccess.classList.add('d-none');
      }
    });
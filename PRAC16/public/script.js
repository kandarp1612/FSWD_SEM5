document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const respDiv = document.getElementById('responseMessage');
  const errDiv = document.getElementById('errorDetails');

  function showMessage(type, text, extraHtml) {
    respDiv.className = 'response ' + (type === 'success' ? 'success' : 'error');
    respDiv.innerHTML = text + (extraHtml ? `<div style="margin-top:8px">${extraHtml}</div>` : '');
    respDiv.style.display = 'block';
  }

  function clearMessages() {
    respDiv.style.display = 'none';
    respDiv.textContent = '';
    errDiv.innerHTML = '';
  }

  function clientValidate(data) {
    const errors = [];
    if (!data.name || data.name.trim().length < 2) errors.push('Name must be at least 2 characters.');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!data.email || !emailRe.test(data.email)) errors.push('Enter a valid email address.');
    if (!data.subject || !data.subject.trim()) errors.push('Subject is required.');
    if (!data.message || data.message.trim().length < 10) errors.push('Message must be at least 10 characters.');
    return errors;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    };

    const clientErrors = clientValidate(data);
    if (clientErrors.length) {
      errDiv.innerHTML = '<ul><li>' + clientErrors.join('</li><li>') + '</li></ul>';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const payload = await res.json();

      if (res.ok && payload.success) {
        const previewLink = payload.previewUrl ? `<a href="${payload.previewUrl}" target="_blank">Preview email</a>` : '';
        showMessage('success', payload.message || 'Message sent successfully.', previewLink);
        form.reset();
      } else {
        if (payload?.errors?.length) {
          errDiv.innerHTML = '<ul>' + payload.errors.map(e => `<li>${e.msg}</li>`).join('') + '</ul>';
        } else {
          showMessage('error', payload.message || 'Failed to send message. Try again later.');
        }
      }
    } catch (err) {
      console.error(err);
      showMessage('error', 'An error occurred — check console and server logs.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    }
  });
});

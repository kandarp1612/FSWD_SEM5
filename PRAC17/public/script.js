const apiBase = '/api/students';
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('studentForm');
  const saveBtn = document.getElementById('saveBtn');
  const resetBtn = document.getElementById('resetBtn');
  const listEl = document.getElementById('studentsList');
  const formMsg = document.getElementById('formMsg');
  const listMsg = document.getElementById('listMsg');
  const qInput = document.getElementById('q');

  function showMessage(el, type, text) { el.className = 'message ' + (type === 'success' ? 'success' : 'error'); el.innerText = text; el.style.display = 'block'; setTimeout(() => el.style.display = 'none', 3000); }
  function resetForm() { form.reset(); document.getElementById('studentId').value = ''; saveBtn.innerText = 'Add Student'; }

  async function fetchStudents(q = '') {
    listEl.innerHTML = 'Loading...';
    try {
      const res = await fetch(apiBase + (q ? `?q=${q}` : ''));
      const data = await res.json();
      if (!data.success) throw new Error();
      renderList(data.students);
    } catch { listEl.innerHTML = ''; showMessage(listMsg, 'error', 'Unable to load students'); }
  }

  function renderList(students) {
    const tbody = document.getElementById('studentsList');
    tbody.innerHTML = '';

    if (!students.length) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:10px; color:#666">No students found</td></tr>';
      return;
    }

    students.forEach((s, index) => {
      const tr = document.createElement('tr');
      tr.style.background = index % 2 === 0 ? '#f9f9f9' : '#fff'; // alternating row colors
      tr.innerHTML = `
      <td style="padding:8px;">${s.name}</td>
      <td style="padding:8px;">${s.className || '-'}</td>
      <td style="padding:8px;">${s.phone || '-'}</td>
      <td style="padding:8px;">${s.parentEmail || '-'}</td>
      <td style="padding:8px;">
        <button data-id="${s._id}" class="editBtn" style="background:#10b981; color:#fff; padding:4px 8px; border-radius:4px; border:none; cursor:pointer;">Edit</button>
        <button data-id="${s._id}" class="delBtn" style="background:#ef4444; color:#fff; padding:4px 8px; border-radius:4px; border:none; cursor:pointer;">Del</button>
      </td>
    `;
      tbody.appendChild(tr);
    });
  }


  async function saveStudent(id, payload) {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiBase}/${id}` : apiBase;
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    return res.json();
  }

  async function deleteStudent(id) { const res = await fetch(`${apiBase}/${id}`, { method: 'DELETE' }); return res.json(); }
  async function loadStudent(id) {
    try {
      const res = await fetch(`${apiBase}/${id}`); const data = await res.json(); if (!data.success) throw new Error();
      const s = data.student;
      document.getElementById('studentId').value = s._id; document.getElementById('name').value = s.name || ''; document.getElementById('age').value = s.age || ''; document.getElementById('className').value = s.className || ''; document.getElementById('parentEmail').value = s.parentEmail || ''; document.getElementById('phone').value = s.phone || ''; document.getElementById('address').value = s.address || ''; saveBtn.innerText = 'Update Student';
    } catch { showMessage(formMsg, 'error', 'Unable to load student'); }
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('name').value.trim(),
      age: document.getElementById('age').value ? Number(document.getElementById('age').value) : undefined,
      className: document.getElementById('className').value.trim(),
      parentEmail: document.getElementById('parentEmail').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      address: document.getElementById('address').value.trim()
    };
    if (!payload.name) { showMessage(formMsg, 'error', 'Name required'); return; }
    saveBtn.disabled = true; saveBtn.innerText = 'Saving...';
    try {
      const id = document.getElementById('studentId').value;
      const result = id ? await saveStudent(id, payload) : await saveStudent(null, payload);
      if (result.success) { showMessage(formMsg, 'success', id ? 'Updated' : 'Added'); resetForm(); fetchStudents(qInput.value); }
      else showMessage(formMsg, 'error', result.message || 'Failed');
    } catch { showMessage(formMsg, 'error', 'Request failed'); }
    finally { saveBtn.disabled = false; saveBtn.innerText = document.getElementById('studentId').value ? 'Update Student' : 'Add Student'; }
  });

  resetBtn.addEventListener('click', resetForm);

  listEl.addEventListener('click', async e => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('editBtn')) { await loadStudent(id); }
    else if (e.target.classList.contains('delBtn')) { if (confirm('Delete?')) { const result = await deleteStudent(id); if (result.success) { showMessage(listMsg, 'success', 'Deleted'); fetchStudents(qInput.value); } else showMessage(listMsg, 'error', result.message || 'Delete failed'); } }
  });

  qInput.addEventListener('input', () => fetchStudents(qInput.value));

  fetchStudents();
});

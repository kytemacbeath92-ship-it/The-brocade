const form = document.getElementById('rule-form');
const input = document.getElementById('rule-input');
const list = document.getElementById('rules');
const empty = document.getElementById('empty');
const status = document.getElementById('status');
const count = document.getElementById('count');

function setStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle('error', isError);
  if (message) {
    setTimeout(() => {
      if (status.textContent === message) {
        status.textContent = '';
        status.classList.remove('error');
      }
    }, 2500);
  }
}

function render(rules) {
  list.innerHTML = '';
  empty.hidden = rules.length > 0;
  count.textContent = `${rules.length} rule${rules.length === 1 ? '' : 's'}`;

  rules.forEach((rule, index) => {
    const li = document.createElement('li');
    li.className = 'rule';

    const num = document.createElement('span');
    num.className = 'num';
    num.textContent = String(index + 1);

    const text = document.createElement('span');
    text.className = 'text';
    text.textContent = rule.text;

    const del = document.createElement('button');
    del.className = 'delete';
    del.type = 'button';
    del.setAttribute('aria-label', 'Delete rule');
    del.textContent = '×';
    del.addEventListener('click', () => removeRule(rule.id));

    li.append(num, text, del);
    list.append(li);
  });
}

async function loadRules() {
  const res = await fetch('/api/rules');
  const data = await res.json();
  render(data.rules);
}

async function removeRule(id) {
  const res = await fetch(`/api/rules/${id}`, { method: 'DELETE' });
  if (res.ok) {
    setStatus('Rule removed.');
    await loadRules();
  } else {
    setStatus('Could not remove rule.', true);
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    setStatus('Type a rule first.', true);
    return;
  }

  const res = await fetch('/api/rules', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (res.ok) {
    input.value = '';
    setStatus('Rule added.');
    await loadRules();
    input.focus();
  } else {
    const data = await res.json().catch(() => ({}));
    setStatus(data.error || 'Could not add rule.', true);
  }
});

loadRules().catch(() => setStatus('Failed to load rules.', true));

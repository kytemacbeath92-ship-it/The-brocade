const DEFAULT_RULES = [
  'A bro helps a bro debug production at 3 AM.',
  'A bro always leaves the build green.',
  'A bro reviews the PR he was tagged in.',
];

let nextId = 1;
let rules = [];

function seed() {
  nextId = 1;
  rules = DEFAULT_RULES.map((text) => ({ id: nextId++, text }));
}

seed();

export function listRules() {
  return rules.slice();
}

export function addRule(text) {
  const trimmed = typeof text === 'string' ? text.trim() : '';
  if (!trimmed) {
    const error = new Error('Rule text is required.');
    error.status = 400;
    throw error;
  }
  const rule = { id: nextId++, text: trimmed };
  rules.push(rule);
  return rule;
}

export function deleteRule(id) {
  const index = rules.findIndex((rule) => rule.id === id);
  if (index === -1) {
    const error = new Error('Rule not found.');
    error.status = 404;
    throw error;
  }
  return rules.splice(index, 1)[0];
}

export function resetRules() {
  seed();
}

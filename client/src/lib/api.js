// Sends the contact form to the Node backend. Set VITE_API_URL if the API is on another domain.
const BASE = import.meta.env?.VITE_API_URL || '';

export async function sendContact(payload) {
  const res = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || 'Something went wrong');
    err.fields = data.fields;
    throw err;
  }
  return data;
}

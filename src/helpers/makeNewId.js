export default function makeUUID() {
  let d = new Date().getTime();
  let u = '';
  let i = 0;

  const m = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now();
  }

  while (i++ < 36) {
    const c = m[i - 1];
    const r = ((d + Math.random()) * 16) % 16 | 0;
    const v = (c === 'x') ? r : ((r & 0x3) | 0x8);

    u += (c === '-' || c === '4') ? c : v.toString(16);
  }

  return u;
}

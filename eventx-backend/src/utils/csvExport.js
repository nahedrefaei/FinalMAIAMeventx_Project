export const toCSV = (rows) => {
  if (!rows?.length) return '';
  const headers = Object.keys(rows[0]);
  const esc = (v) => String(v??'').replaceAll('"','""');
  const lines = [headers.join(',')];
  for (const r of rows) {
    lines.push(headers.map(h => `"${esc(r[h])}"`).join(','));
  }
  return lines.join('\n');
};

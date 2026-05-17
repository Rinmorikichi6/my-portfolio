const stats = [
  { label: 'Total Revenue', value: '$48,290', change: '+12.5%', up: true },
  { label: 'Active Users', value: '3,842', change: '+8.2%', up: true },
  { label: 'New Orders', value: '1,204', change: '-2.1%', up: false },
  { label: 'Conversion Rate', value: '4.8%', change: '+0.9%', up: true }
];

const orders = [
  { id: '#ORD-7821', customer: 'Sarah Mitchell', product: 'Pro Subscription', amount: '$299', status: 'completed' },
  { id: '#ORD-7820', customer: 'James Chen', product: 'Enterprise Plan', amount: '$899', status: 'pending' },
  { id: '#ORD-7819', customer: 'Emily Rodriguez', product: 'Starter Kit', amount: '$49', status: 'completed' },
  { id: '#ORD-7818', customer: 'David Park', product: 'Add-on Bundle', amount: '$129', status: 'cancelled' },
  { id: '#ORD-7817', customer: 'Lisa Thompson', product: 'Pro Subscription', amount: '$299', status: 'completed' }
];

document.getElementById('statsGrid').innerHTML = stats.map(s => `
  <article class="stat-card glass">
    <h3>${s.label}</h3>
    <p class="value">${s.value}</p>
    <p class="change ${s.up ? 'up' : 'down'}">${s.change} from last month</p>
  </article>
`).join('');

document.getElementById('ordersTable').innerHTML = orders.map(o => `
  <tr>
    <td>${o.id}</td>
    <td>${o.customer}</td>
    <td>${o.product}</td>
    <td>${o.amount}</td>
    <td><span class="badge ${o.status}">${o.status}</span></td>
  </tr>
`).join('');

const revenueCtx = document.getElementById('revenueChart').getContext('2d');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const revenue = [3200, 4100, 3800, 5200, 4800, 6100];

function drawLineChart(ctx, labels, data) {
  const w = ctx.canvas.width = ctx.canvas.parentElement.clientWidth - 48;
  const h = ctx.canvas.height = 200;
  const pad = 40;
  const max = Math.max(...data) * 1.1;
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(99, 102, 241, 0.8)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - (v / max) * (h - pad * 2);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
  grad.addColorStop(1, 'rgba(99, 102, 241, 0)');
  ctx.lineTo(pad + (w - pad * 2), h - pad);
  ctx.lineTo(pad, h - pad);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px Inter';
  labels.forEach((l, i) => {
    const x = pad + (i / (labels.length - 1)) * (w - pad * 2);
    ctx.fillText(l, x - 12, h - 12);
  });
}

drawLineChart(revenueCtx, months, revenue);

const trafficCtx = document.getElementById('trafficChart').getContext('2d');
const sources = [
  { label: 'Organic', value: 45, color: '#6366f1' },
  { label: 'Direct', value: 25, color: '#06b6d4' },
  { label: 'Social', value: 20, color: '#ec4899' },
  { label: 'Referral', value: 10, color: '#10b981' }
];

let start = -Math.PI / 2;
const total = sources.reduce((s, x) => s + x.value, 0);
sources.forEach(s => {
  const slice = (s.value / total) * Math.PI * 2;
  trafficCtx.beginPath();
  trafficCtx.moveTo(80, 80);
  trafficCtx.arc(80, 80, 70, start, start + slice);
  trafficCtx.closePath();
  trafficCtx.fillStyle = s.color;
  trafficCtx.fill();
  start += slice;
});

document.getElementById('trafficLegend').innerHTML = sources.map(s =>
  `<li><span style="background:${s.color}"></span>${s.label} (${s.value}%)</li>`
).join('');

document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

document.getElementById('exportBtn').addEventListener('click', () => {
  alert('Orders exported successfully.');
});

window.addEventListener('resize', () => drawLineChart(revenueCtx, months, revenue));

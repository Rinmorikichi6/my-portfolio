const contacts = [
  { id: 1, name: 'Alex Morgan', initials: 'AM', last: 'Sounds great, see you then!', online: true },
  { id: 2, name: 'Jordan Lee', initials: 'JL', last: 'I sent the design files', online: true },
  { id: 3, name: 'Sam Rivera', initials: 'SR', last: 'Thanks for the update', online: false },
  { id: 4, name: 'Taylor Brooks', initials: 'TB', last: 'Let me review and get back', online: false }
];

const conversations = {
  1: [
    { text: 'Hey! Are we still on for the sprint review?', sent: false, time: '10:24 AM' },
    { text: 'Yes, 3 PM works perfectly for me.', sent: true, time: '10:26 AM' },
    { text: 'Sounds great, see you then!', sent: false, time: '10:27 AM' }
  ],
  2: [
    { text: 'The new dashboard mockups are ready.', sent: false, time: '9:15 AM' },
    { text: 'I sent the design files', sent: false, time: '9:16 AM' }
  ],
  3: [
    { text: 'Project milestone completed ahead of schedule.', sent: true, time: 'Yesterday' },
    { text: 'Thanks for the update', sent: false, time: 'Yesterday' }
  ],
  4: [
    { text: 'Can you share the analytics report?', sent: true, time: 'Mon' },
    { text: 'Let me review and get back', sent: false, time: 'Mon' }
  ]
};

let activeId = 1;

const contactList = document.getElementById('contactList');
const messagesEl = document.getElementById('messages');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

function renderContacts(filter = '') {
  const q = filter.toLowerCase();
  contactList.innerHTML = contacts
    .filter(c => c.name.toLowerCase().includes(q))
    .map(c => `
      <li class="contact-item ${c.id === activeId ? 'active' : ''}" data-id="${c.id}">
        <div class="avatar">${c.initials}</div>
        <div>
          <h3>${c.name}</h3>
          <p>${c.last}</p>
        </div>
      </li>
    `).join('');

  contactList.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', () => selectContact(Number(item.dataset.id)));
  });
}

function selectContact(id) {
  activeId = id;
  const c = contacts.find(x => x.id === id);
  document.getElementById('activeName').textContent = c.name;
  document.getElementById('activeAvatar').textContent = c.initials;
  document.getElementById('activeStatus').textContent = c.online ? 'Online' : 'Offline';
  document.getElementById('activeStatus').className = `status ${c.online ? 'online' : ''}`;
  renderContacts(document.getElementById('contactSearch').value);
  renderMessages();
  document.getElementById('contactsPanel').classList.remove('open');
}

function renderMessages() {
  const msgs = conversations[activeId] || [];
  messagesEl.innerHTML = msgs.map(m => `
    <div class="message ${m.sent ? 'sent' : 'received'}">
      ${m.text}
      <span class="message-time">${m.time}</span>
    </div>
  `).join('');
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;
  if (!conversations[activeId]) conversations[activeId] = [];
  conversations[activeId].push({ text, sent: true, time: nowTime() });
  const contact = contacts.find(c => c.id === activeId);
  contact.last = text;
  messageInput.value = '';
  renderMessages();
  renderContacts();

  setTimeout(() => {
    const replies = ['Got it!', 'Thanks for sharing!', 'I will look into this.', 'Perfect, makes sense.'];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    conversations[activeId].push({ text: reply, sent: false, time: nowTime() });
    contact.last = reply;
    renderMessages();
    renderContacts();
  }, 1200);
});

document.getElementById('contactSearch').addEventListener('input', e => {
  renderContacts(e.target.value);
});

document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('contactsPanel').classList.toggle('open');
});

renderContacts();
selectContact(1);

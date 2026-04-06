const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ═══════════ DATABASE ═══════════
const db = new Database(path.join(__dirname, 'mulapreta.db'));
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT DEFAULT '',
    av TEXT DEFAULT '',
    email TEXT UNIQUE NOT NULL,
    pw TEXT NOT NULL,
    clients INTEGER DEFAULT 0,
    deals INTEGER DEFAULT 0,
    rev REAL DEFAULT 0,
    tgt REAL DEFAULT 0,
    meets INTEGER DEFAULT 0,
    calls INTEGER DEFAULT 0,
    emails INTEGER DEFAULT 0,
    tOk INTEGER DEFAULT 0,
    tPd INTEGER DEFAULT 0,
    isAdmin INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1,
    createdAt TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS architects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    firm TEXT DEFAULT '',
    city TEXT DEFAULT '',
    status TEXT DEFAULT 'prospect',
    tier TEXT DEFAULT 'bronze',
    projects INTEGER DEFAULT 0,
    rev REAL DEFAULT 0,
    sat INTEGER DEFAULT 70,
    av TEXT DEFAULT '',
    lastC TEXT DEFAULT '',
    nextF TEXT DEFAULT '',
    notes TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    email TEXT DEFAULT '',
    createdAt TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT DEFAULT '09:00',
    dur INTEGER DEFAULT 60,
    type TEXT DEFAULT 'reuniao',
    loc TEXT DEFAULT '',
    parts TEXT DEFAULT '[]',
    arch TEXT DEFAULT '',
    notes TEXT DEFAULT '',
    createdBy INTEGER DEFAULT 0,
    createdAt TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    m TEXT NOT NULL,
    v REAL DEFAULT 0,
    t REAL DEFAULT 0,
    year TEXT DEFAULT '2026',
    createdAt TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS pipeline (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    s TEXT NOT NULL,
    n INTEGER DEFAULT 0,
    v REAL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS seasons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    period TEXT DEFAULT '',
    status TEXT DEFAULT 'upcoming',
    rules TEXT DEFAULT '[]',
    prizes TEXT DEFAULT '[]'
  );

  CREATE TABLE IF NOT EXISTS archpoints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    archId INTEGER NOT NULL,
    seasonId INTEGER NOT NULL,
    sales TEXT DEFAULT '[]',
    bonus INTEGER DEFAULT 0
  );
`);

// ═══════════ SEED DATA ═══════════
function seedIfEmpty() {
  const userCount = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
  if (userCount > 0) return;

  console.log('Seeding initial data...');

  // Admin
  db.prepare('INSERT INTO users (id, name, role, av, email, pw, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?)').run(0, 'Administrador', 'Admin', 'MP', 'admin@mulapreta.com', 'admin123', 1);

  // Team
  const teamInsert = db.prepare('INSERT INTO users (name, role, av, email, pw, clients, deals, rev, tgt, meets, calls, emails, tOk, tPd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  [
    ['Ana Beatriz Costa', 'Gerente Comercial', 'AC', 'ana@mulapreta.com', 'ana123', 18, 12, 890000, 1000000, 24, 67, 143, 45, 8],
    ['Carlos Eduardo', 'Consultor Técnico', 'CE', 'carlos@mulapreta.com', 'carlos123', 14, 9, 620000, 750000, 18, 52, 98, 38, 5],
    ['Fernanda Oliveira', 'Exec. Contas', 'FO', 'fernanda@mulapreta.com', 'fer123', 22, 15, 1150000, 1200000, 31, 89, 201, 52, 3],
    ['Diego Martins', 'Rep. SP', 'DM', 'diego@mulapreta.com', 'diego123', 16, 8, 480000, 700000, 14, 43, 87, 29, 11],
    ['Patrícia Lima', 'Rep. RJ', 'PL', 'patricia@mulapreta.com', 'pat123', 11, 6, 340000, 600000, 10, 38, 72, 22, 7],
  ].forEach(function(r) { teamInsert.run(...r); });

  // Architects
  const archInsert = db.prepare('INSERT INTO architects (name, firm, city, status, tier, projects, rev, sat, av, lastC, nextF, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  [
    ['Marina Lopes', 'Studio ML', 'São Paulo', 'ativo', 'gold', 12, 485000, 95, 'ML', '2026-03-28', '2026-04-07', 'Materiais sustentáveis.'],
    ['Rafael Mendes', 'RM Design', 'São Paulo', 'ativo', 'platinum', 24, 1280000, 98, 'RM', '2026-04-01', '2026-04-10', 'Principal parceiro.'],
    ['Camila Ferreira', 'CF Interiores', 'Rio de Janeiro', 'ativo', 'silver', 6, 178000, 82, 'CF', '2026-03-15', '2026-04-05', 'Corporativos.'],
    ['Pedro Nakamura', 'Nakamura Arq.', 'Curitiba', 'ativo', 'gold', 15, 620000, 90, 'PN', '2026-03-30', '2026-04-12', 'Educacionais.'],
    ['Isabela Duarte', 'ID Arquitetura', 'BH', 'prospect', 'bronze', 2, 45000, 75, 'ID', '2026-03-20', '2026-04-04', 'Expo Revestir.'],
    ['Thiago Rocha', 'Rocha Assoc.', 'Porto Alegre', 'inativo', 'silver', 8, 295000, 45, 'TR', '2026-01-10', '2026-04-15', 'Reativação urgente.'],
    ['Juliana Santos', 'JS Sustentável', 'Salvador', 'ativo', 'gold', 10, 410000, 92, 'JS', '2026-03-25', '2026-04-08', 'Embaixadora NE.'],
    ['Lucas Pimentel', 'Pimentel Design', 'Brasília', 'ativo', 'silver', 5, 165000, 78, 'LP', '2026-04-02', '2026-04-09', 'Governamentais.'],
  ].forEach(function(r) { archInsert.run(...r); });

  // Events
  const evInsert = db.prepare('INSERT INTO events (title, date, time, dur, type, loc, parts, arch, notes, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  [
    ['Alinhamento Rafael', '2026-04-03', '09:00', 60, 'reuniao', 'Escritório SP', '[0,1,2]', 'Rafael Mendes', 'Premium', 1],
    ['Visita Alphaville', '2026-04-03', '14:00', 120, 'visita', 'Alphaville', '[2,4]', 'Marina Lopes', 'Amostras', 2],
    ['Follow-up Isabela', '2026-04-04', '10:30', 30, 'ligacao', 'Remoto', '[4]', 'Isabela', 'Proposta', 4],
    ['Expo Revestir', '2026-04-05', '08:00', 480, 'evento', 'SP Expo', '[0,1,2,3,4,5]', '', 'Stand 42B', 0],
    ['Linha sustentável', '2026-04-07', '11:00', 90, 'reuniao', 'Meet', '[0,1,3]', 'Juliana', 'Eco', 1],
    ['Pipeline mensal', '2026-04-07', '15:00', 60, 'interna', 'Sala', '[0,1,2,3,4,5]', '', 'Q2', 0],
    ['Workshop premium', '2026-04-10', '09:00', 240, 'evento', 'Showroom SP', '[0,1,2,3,4]', '', 'Top 10', 0],
  ].forEach(function(r) { evInsert.run(...r); });

  // Sales
  const salesInsert = db.prepare('INSERT INTO sales (m, v, t, year) VALUES (?, ?, ?, ?)');
  [['Out',280000,300000,'2025'],['Nov',320000,310000,'2025'],['Dez',410000,350000,'2025'],['Jan',290000,320000,'2026'],['Fev',350000,340000,'2026'],['Mar',480000,380000,'2026']].forEach(function(r) { salesInsert.run(...r); });

  // Pipeline
  const pipeInsert = db.prepare('INSERT INTO pipeline (s, n, v) VALUES (?, ?, ?)');
  [['Prospecção',14,420000],['Qualificação',8,680000],['Proposta',5,890000],['Negociação',3,520000],['Fechamento',2,310000]].forEach(function(r) { pipeInsert.run(...r); });

  // Seasons
  const seasonInsert = db.prepare('INSERT INTO seasons (name, period, status, rules, prizes) VALUES (?, ?, ?, ?, ?)');
  seasonInsert.run('Season 1 · 2026.1', 'Jan–Jun 2026', 'active', JSON.stringify([{id:1,d:"Venda até R$50k",p:100},{id:2,d:"Venda R$50k–150k",p:300},{id:3,d:"Venda acima R$150k",p:600},{id:4,d:"Novo projeto",p:150},{id:5,d:"Indicação arquiteto",p:200}]), JSON.stringify([{id:1,tier:"Ouro",min:2000,prize:"Viagem Expo Milano + Kit",icon:"trophy"},{id:2,tier:"Prata",min:1200,prize:"Voucher R$5k + Jantar",icon:"award"},{id:3,tier:"Bronze",min:600,prize:"Kit Materiais + Certificado",icon:"gift"}]));
  seasonInsert.run('Season 2 · 2026.2', 'Jul–Dez 2026', 'upcoming', '[]', '[]');

  // Arch Points
  const ptsInsert = db.prepare('INSERT INTO archpoints (archId, seasonId, sales, bonus) VALUES (?, ?, ?, ?)');
  [[2,1,'[{"d":"Comercial Paulista","v":320000},{"d":"Residencial Morumbi","v":180000},{"d":"Indicação Camila","v":0}]',200],[1,1,'[{"d":"Alphaville I","v":120000},{"d":"Alphaville II","v":85000},{"d":"Escola sustentável","v":60000}]',150],[7,1,'[{"d":"Resort eco Bahia","v":210000},{"d":"Pousada Trancoso","v":95000}]',0],[4,1,'[{"d":"Centro educacional","v":180000},{"d":"Biblioteca","v":140000}]',150],[3,1,'[{"d":"Escritório RJ","v":78000}]',0],[5,1,'[{"d":"Amostra premium","v":25000}]',0],[8,1,'[{"d":"Projeto gov.","v":65000}]',0]].forEach(function(r) { ptsInsert.run(...r); });

  console.log('Seed complete.');
}
seedIfEmpty();

// ═══════════ HELPER ═══════════
function parseJsonField(row, fields) {
  if (!row) return row;
  fields.forEach(function(f) {
    if (row[f] && typeof row[f] === 'string') {
      try { row[f] = JSON.parse(row[f]); } catch(e) {}
    }
  });
  return row;
}

// ═══════════ AUTH ═══════════
app.post('/api/login', function(req, res) {
  var user = db.prepare('SELECT * FROM users WHERE email = ? AND pw = ?').get(req.body.email, req.body.pw);
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });
  res.json(user);
});

// ═══════════ USERS (Team) ═══════════
app.get('/api/users', function(req, res) {
  res.json(db.prepare('SELECT * FROM users WHERE isAdmin = 0 AND active = 1 ORDER BY name').all());
});
app.post('/api/users', function(req, res) {
  var b = req.body;
  var av = b.av || (b.name || '').split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
  var r = db.prepare('INSERT INTO users (name, role, av, email, pw, clients, deals, rev, tgt, meets, calls, emails, tOk, tPd) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run(b.name, b.role||'', av, b.email, b.pw||'123456', b.clients||0, b.deals||0, b.rev||0, b.tgt||0, b.meets||0, b.calls||0, b.emails||0, b.tOk||0, b.tPd||0);
  res.json(db.prepare('SELECT * FROM users WHERE id = ?').get(r.lastInsertRowid));
});
app.put('/api/users/:id', function(req, res) {
  var b = req.body; var id = req.params.id;
  var av = b.av || (b.name || '').split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
  db.prepare('UPDATE users SET name=?, role=?, av=?, email=?, pw=?, clients=?, deals=?, rev=?, tgt=?, meets=?, calls=?, emails=?, tOk=?, tPd=? WHERE id=?').run(b.name, b.role||'', av, b.email, b.pw||'123456', b.clients||0, b.deals||0, b.rev||0, b.tgt||0, b.meets||0, b.calls||0, b.emails||0, b.tOk||0, b.tPd||0, id);
  res.json(db.prepare('SELECT * FROM users WHERE id = ?').get(id));
});
app.delete('/api/users/:id', function(req, res) {
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// ═══════════ ARCHITECTS ═══════════
app.get('/api/architects', function(req, res) {
  res.json(db.prepare('SELECT * FROM architects ORDER BY name').all());
});
app.post('/api/architects', function(req, res) {
  var b = req.body;
  var av = b.av || (b.name || '').split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
  var r = db.prepare('INSERT INTO architects (name, firm, city, status, tier, projects, rev, sat, av, lastC, nextF, notes, phone, email) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run(b.name, b.firm||'', b.city||'', b.status||'prospect', b.tier||'bronze', b.projects||0, b.rev||0, b.sat||70, av, b.lastC||'', b.nextF||'', b.notes||'', b.phone||'', b.email||'');
  res.json(db.prepare('SELECT * FROM architects WHERE id = ?').get(r.lastInsertRowid));
});
app.post('/api/architects/bulk', function(req, res) {
  var items = req.body;
  var insert = db.prepare('INSERT INTO architects (name, firm, city, status, tier, projects, rev, sat, av, lastC, nextF, notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
  var tx = db.transaction(function(list) {
    list.forEach(function(b) {
      var av = (b.name || '').split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
      insert.run(b.name||'', b.firm||'', b.city||'', b.status||'prospect', b.tier||'bronze', b.projects||0, b.rev||0, b.sat||70, av, b.lastC||'', b.nextF||'', b.notes||'');
    });
  });
  tx(items);
  res.json(db.prepare('SELECT * FROM architects ORDER BY name').all());
});
app.put('/api/architects/:id', function(req, res) {
  var b = req.body; var id = req.params.id;
  var av = b.av || (b.name || '').split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
  db.prepare('UPDATE architects SET name=?, firm=?, city=?, status=?, tier=?, projects=?, rev=?, sat=?, av=?, lastC=?, nextF=?, notes=?, phone=?, email=? WHERE id=?').run(b.name, b.firm||'', b.city||'', b.status||'prospect', b.tier||'bronze', b.projects||0, b.rev||0, b.sat||70, av, b.lastC||'', b.nextF||'', b.notes||'', b.phone||'', b.email||'', id);
  res.json(db.prepare('SELECT * FROM architects WHERE id = ?').get(id));
});
app.delete('/api/architects/:id', function(req, res) {
  db.prepare('DELETE FROM architects WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// ═══════════ EVENTS ═══════════
app.get('/api/events', function(req, res) {
  var rows = db.prepare('SELECT * FROM events ORDER BY date, time').all();
  res.json(rows.map(function(r) { return parseJsonField(r, ['parts']); }));
});
app.post('/api/events', function(req, res) {
  var b = req.body;
  var r = db.prepare('INSERT INTO events (title, date, time, dur, type, loc, parts, arch, notes, createdBy) VALUES (?,?,?,?,?,?,?,?,?,?)').run(b.title, b.date, b.time||'09:00', b.dur||60, b.type||'reuniao', b.loc||'', JSON.stringify(b.parts||[]), b.arch||'', b.notes||'', b.createdBy||0);
  var ev = db.prepare('SELECT * FROM events WHERE id = ?').get(r.lastInsertRowid);
  res.json(parseJsonField(ev, ['parts']));
});
app.put('/api/events/:id', function(req, res) {
  var b = req.body; var id = req.params.id;
  db.prepare('UPDATE events SET title=?, date=?, time=?, dur=?, type=?, loc=?, parts=?, arch=?, notes=? WHERE id=?').run(b.title, b.date, b.time||'09:00', b.dur||60, b.type||'reuniao', b.loc||'', JSON.stringify(b.parts||[]), b.arch||'', b.notes||'', id);
  var ev = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
  res.json(parseJsonField(ev, ['parts']));
});
app.delete('/api/events/:id', function(req, res) {
  db.prepare('DELETE FROM events WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// ═══════════ SALES ═══════════
app.get('/api/sales', function(req, res) {
  res.json(db.prepare('SELECT * FROM sales ORDER BY year, id').all());
});
app.post('/api/sales', function(req, res) {
  var b = req.body;
  if (Array.isArray(b)) {
    var insert = db.prepare('INSERT INTO sales (m, v, t, year) VALUES (?,?,?,?)');
    var tx = db.transaction(function(list) { list.forEach(function(s) { insert.run(s.m, s.v||0, s.t||0, s.year||'2026'); }); });
    tx(b);
  } else {
    db.prepare('INSERT INTO sales (m, v, t, year) VALUES (?,?,?,?)').run(b.m, b.v||0, b.t||0, b.year||'2026');
  }
  res.json(db.prepare('SELECT * FROM sales ORDER BY year, id').all());
});
app.delete('/api/sales/clear-imported', function(req, res) {
  db.prepare('DELETE FROM sales WHERE id > 6').run();
  res.json(db.prepare('SELECT * FROM sales ORDER BY year, id').all());
});

// ═══════════ PIPELINE ═══════════
app.get('/api/pipeline', function(req, res) {
  res.json(db.prepare('SELECT * FROM pipeline ORDER BY id').all());
});
app.put('/api/pipeline/:id', function(req, res) {
  var b = req.body;
  db.prepare('UPDATE pipeline SET s=?, n=?, v=? WHERE id=?').run(b.s, b.n||0, b.v||0, req.params.id);
  res.json(db.prepare('SELECT * FROM pipeline ORDER BY id').all());
});

// ═══════════ SEASONS ═══════════
app.get('/api/seasons', function(req, res) {
  var rows = db.prepare('SELECT * FROM seasons ORDER BY id').all();
  res.json(rows.map(function(r) { return parseJsonField(r, ['rules', 'prizes']); }));
});
app.post('/api/seasons', function(req, res) {
  var b = req.body;
  var r = db.prepare('INSERT INTO seasons (name, period, status, rules, prizes) VALUES (?,?,?,?,?)').run(b.name, b.period||'', b.status||'upcoming', JSON.stringify(b.rules||[]), JSON.stringify(b.prizes||[]));
  var s = db.prepare('SELECT * FROM seasons WHERE id = ?').get(r.lastInsertRowid);
  res.json(parseJsonField(s, ['rules', 'prizes']));
});
app.put('/api/seasons/:id', function(req, res) {
  var b = req.body;
  db.prepare('UPDATE seasons SET name=?, period=?, status=?, rules=?, prizes=? WHERE id=?').run(b.name, b.period||'', b.status||'upcoming', JSON.stringify(b.rules||[]), JSON.stringify(b.prizes||[]), req.params.id);
  var s = db.prepare('SELECT * FROM seasons WHERE id = ?').get(req.params.id);
  res.json(parseJsonField(s, ['rules', 'prizes']));
});
app.delete('/api/seasons/:id', function(req, res) {
  db.prepare('DELETE FROM seasons WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// ═══════════ ARCH POINTS ═══════════
app.get('/api/archpoints', function(req, res) {
  var rows = db.prepare('SELECT * FROM archpoints ORDER BY id').all();
  res.json(rows.map(function(r) { return parseJsonField(r, ['sales']); }));
});
app.post('/api/archpoints', function(req, res) {
  var b = req.body;
  var r = db.prepare('INSERT INTO archpoints (archId, seasonId, sales, bonus) VALUES (?,?,?,?)').run(b.archId, b.seasonId, JSON.stringify(b.sales||[]), b.bonus||0);
  var p = db.prepare('SELECT * FROM archpoints WHERE id = ?').get(r.lastInsertRowid);
  res.json(parseJsonField(p, ['sales']));
});
app.put('/api/archpoints/:id', function(req, res) {
  var b = req.body;
  db.prepare('UPDATE archpoints SET archId=?, seasonId=?, sales=?, bonus=? WHERE id=?').run(b.archId, b.seasonId, JSON.stringify(b.sales||[]), b.bonus||0, req.params.id);
  var p = db.prepare('SELECT * FROM archpoints WHERE id = ?').get(req.params.id);
  res.json(parseJsonField(p, ['sales']));
});
app.delete('/api/archpoints/:id', function(req, res) {
  db.prepare('DELETE FROM archpoints WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// ═══════════ SERVE FRONTEND ═══════════
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', function() {
  console.log('Mula Preta CRM running on port ' + PORT);
});

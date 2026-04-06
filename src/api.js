var BASE = '/api';

function api(path, options) {
  return fetch(BASE + path, Object.assign({
    headers: { 'Content-Type': 'application/json' }
  }, options)).then(function(res) {
    if (!res.ok) throw new Error('API error: ' + res.status);
    return res.json();
  });
}

export function login(email, pw) {
  return api('/login', { method: 'POST', body: JSON.stringify({ email: email, pw: pw }) });
}

// Users (Team)
export function getUsers() { return api('/users'); }
export function createUser(data) { return api('/users', { method: 'POST', body: JSON.stringify(data) }); }
export function updateUser(id, data) { return api('/users/' + id, { method: 'PUT', body: JSON.stringify(data) }); }
export function deleteUser(id) { return api('/users/' + id, { method: 'DELETE' }); }

// Architects
export function getArchitects() { return api('/architects'); }
export function createArchitect(data) { return api('/architects', { method: 'POST', body: JSON.stringify(data) }); }
export function bulkCreateArchitects(data) { return api('/architects/bulk', { method: 'POST', body: JSON.stringify(data) }); }
export function updateArchitect(id, data) { return api('/architects/' + id, { method: 'PUT', body: JSON.stringify(data) }); }
export function deleteArchitect(id) { return api('/architects/' + id, { method: 'DELETE' }); }

// Events
export function getEvents() { return api('/events'); }
export function createEvent(data) { return api('/events', { method: 'POST', body: JSON.stringify(data) }); }
export function updateEvent(id, data) { return api('/events/' + id, { method: 'PUT', body: JSON.stringify(data) }); }
export function deleteEvent(id) { return api('/events/' + id, { method: 'DELETE' }); }

// Sales
export function getSales() { return api('/sales'); }
export function addSales(data) { return api('/sales', { method: 'POST', body: JSON.stringify(data) }); }
export function clearImportedSales() { return api('/sales/clear-imported', { method: 'DELETE' }); }

// Pipeline
export function getPipeline() { return api('/pipeline'); }
export function updatePipeline(id, data) { return api('/pipeline/' + id, { method: 'PUT', body: JSON.stringify(data) }); }

// Seasons
export function getSeasons() { return api('/seasons'); }
export function createSeason(data) { return api('/seasons', { method: 'POST', body: JSON.stringify(data) }); }
export function updateSeason(id, data) { return api('/seasons/' + id, { method: 'PUT', body: JSON.stringify(data) }); }
export function deleteSeason(id) { return api('/seasons/' + id, { method: 'DELETE' }); }

// Arch Points
export function getArchPoints() { return api('/archpoints'); }
export function createArchPoint(data) { return api('/archpoints', { method: 'POST', body: JSON.stringify(data) }); }
export function updateArchPoint(id, data) { return api('/archpoints/' + id, { method: 'PUT', body: JSON.stringify(data) }); }
export function deleteArchPoint(id) { return api('/archpoints/' + id, { method: 'DELETE' }); }

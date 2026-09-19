import fs from 'fs';
import path from 'path';

const eventsFilePath = path.join(process.cwd(), 'src', 'data', 'events.json');

const defaultEvents = [
  {
    id: 'ev1',
    title: 'Emergency Nursing & Critical Care Workshop',
    titleMr: 'आपत्कालीन नर्सिंग व क्रिटिकल केअर कार्यशाळा',
    eventDate: '2026-09-10',
    eventTime: '11:00 AM',
    venue: 'College Seminar Hall',
    venueMr: 'कॉलेज सेमिनार हॉल',
    description: 'Advanced emergency triage and critical care simulation workshop organized for nursing students.',
    category: 'Workshop',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ev2',
    title: 'Community Rural Health & Immunization Drive',
    titleMr: 'ग्रामीण आरोग्य व लसीकरण मोहीम',
    eventDate: '2026-09-20',
    eventTime: '9:00 AM',
    venue: 'Sangamner Rural Primary Health Center',
    venueMr: 'संगमनेर ग्रामीण प्राथमिक आरोग्य केंद्र',
    description: 'Free healthcare checkup, immunization and community nutrition guidance camp.',
    category: 'Medical Camp',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ev3',
    title: 'Multi-Speciality Hospital Clinical Visit',
    titleMr: 'मल्टी-स्पेशालिटी हॉस्पिटल क्लिनिकल भेट',
    eventDate: '2026-09-26',
    eventTime: '7:00 AM',
    venue: 'District Civil Hospital Ahilyanagar',
    venueMr: 'जिल्हा सामान्य रुग्णालय अहिल्यानगर',
    description: 'Bedside clinical rotations and observational rounds across emergency and surgical wards.',
    category: 'Clinical',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ev4',
    title: 'Alumni Meet & Senior Career Guidance',
    titleMr: 'माजी विद्यार्थी मेळावा व करिअर मार्गदर्शन',
    eventDate: '2026-10-05',
    eventTime: '5:00 PM',
    venue: 'Main College Auditorium',
    venueMr: 'मुख्य महाविद्यालय सभागृह',
    description: 'Annual alumni interaction, placement experience sharing and career counseling.',
    category: 'Seminar',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getEventsData() {
  try {
    if (!fs.existsSync(eventsFilePath)) {
      saveEventsData(defaultEvents);
      return defaultEvents;
    }
    const data = fs.readFileSync(eventsFilePath, 'utf8');
    const parsed = JSON.parse(data || '[]');
    return parsed.length > 0 ? parsed : defaultEvents;
  } catch (err) {
    console.error('Error reading events data:', err);
    return defaultEvents;
  }
}

export function saveEventsData(events) {
  try {
    const dir = path.dirname(eventsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing events data:', err);
    return false;
  }
}

export function addEventItem(item) {
  const events = getEventsData();
  const newEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: (item.title || '').trim(),
    titleMr: (item.titleMr || '').trim(),
    eventDate: item.eventDate || new Date().toISOString().split('T')[0],
    eventTime: (item.eventTime || '').trim(),
    venue: (item.venue || '').trim(),
    venueMr: (item.venueMr || '').trim(),
    description: item.description ? item.description.trim() : '',
    category: item.category || 'Workshop',
    isActive: item.isActive !== undefined ? item.isActive : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  events.unshift(newEvent);
  saveEventsData(events);
  return newEvent;
}

export function updateEventItem(id, updates) {
  const events = getEventsData();
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return null;

  events[index] = {
    ...events[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveEventsData(events);
  return events[index];
}

export function deleteEventItem(id) {
  const events = getEventsData();
  const filtered = events.filter((e) => e.id !== id);
  if (filtered.length === events.length) return false;
  saveEventsData(filtered);
  return true;
}
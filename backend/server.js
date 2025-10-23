const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database (replace with real database like MongoDB or PostgreSQL)
let appointments = [];
let appointmentIdCounter = 1;

// GET all appointments
app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

// GET appointments by date
app.get('/api/appointments/:date', (req, res) => {
  const { date } = req.params;
  const dateAppointments = appointments.filter(apt => apt.date === date);
  res.json(dateAppointments);
});

// POST create new appointment
app.post('/api/appointments', (req, res) => {
  const { date, time, name, email } = req.body;

  // Validation
  if (!date || !time || !name || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if time slot is already booked
  const existingAppointment = appointments.find(
    apt => apt.date === date && apt.time === time
  );

  if (existingAppointment) {
    return res.status(409).json({ error: 'Time slot already booked' });
  }

  // Create new appointment
  const newAppointment = {
    id: appointmentIdCounter++,
    date,
    time,
    name,
    email,
    createdAt: new Date().toISOString()
  };

  appointments.push(newAppointment);

  res.status(201).json(newAppointment);
});

// DELETE appointment by ID
app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const index = appointments.findIndex(apt => apt.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  const deletedAppointment = appointments.splice(index, 1)[0];
  res.json({ message: 'Appointment deleted', appointment: deletedAppointment });
});

// PUT update appointment
app.put('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { date, time, name, email } = req.body;

  const appointmentIndex = appointments.findIndex(apt => apt.id === parseInt(id));

  if (appointmentIndex === -1) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  // Update appointment
  appointments[appointmentIndex] = {
    ...appointments[appointmentIndex],
    date: date || appointments[appointmentIndex].date,
    time: time || appointments[appointmentIndex].time,
    name: name || appointments[appointmentIndex].name,
    email: email || appointments[appointmentIndex].email,
    updatedAt: new Date().toISOString()
  };

  res.json(appointments[appointmentIndex]);
});

// POST contact form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Here you would typically:
  // 1. Send an email using nodemailer
  // 2. Save to database
  // 3. Send notification

  console.log('Contact form submission:', { name, email, subject, message });

  // For now, just return success
  res.status(200).json({ 
    message: 'Contact form submitted successfully',
    data: { name, email, subject }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
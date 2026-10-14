import React, { useState, useEffect, useRef } from 'react';
import '../styles/Calendar.css';
import {
  supabase,
  addClient,
  createAppointment
} from '../lib/supabaseClient';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNotes, setUserNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  // Reference to the green confirmation message
  const confirmationRef = useRef(null);

  // Store the booked appointment details so the confirmation
  // remains accurate even if the selected date/time is reset.
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  // Fetch appointments from API on mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('appointment_time')
        .order('appointment_time', { ascending: true });

      if (error) {
        throw error;
      }

      const appointmentsByDate = {};

      data.forEach((apt) => {
        const appointmentDate = new Date(apt.appointment_time);
        const date = appointmentDate.toLocaleDateString('en-CA');
        const time = appointmentDate.toTimeString().slice(0, 5);

        if (!appointmentsByDate[date]) {
          appointmentsByDate[date] = [];
        }

        appointmentsByDate[date].push({
          ...apt,
          date,
          time
        });
      });

      setAppointments(appointmentsByDate);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Convert 24-hour time to 12-hour AM/PM format
  const formatTimeToAMPM = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minutes} ${ampm}`;
  };

  // Generate time slots based on the selected day
  const generateTimeSlots = (date = null) => {
    const slots = [];

    // Saturday appointments: 9 AM through 11 AM
    if (date && date.getDay() === 6) {
      for (let hour = 9; hour <= 11; hour++) {
        slots.push(`${String(hour).padStart(2, '0')}:00`);
      }

      return slots;
    }

    // Monday through Friday: 10 AM through 3 PM
    for (let hour = 10; hour <= 15; hour++) {
      slots.push(`${String(hour).padStart(2, '0')}:00`);
    }

    return slots;
  };

  const timeSlots = selectedDate
    ? generateTimeSlots(selectedDate)
    : generateTimeSlots();

  // Check whether a date has available slots
  const hasAvailableSlots = (dateStr) => {
    const date = new Date(`${dateStr}T12:00:00`);
    const dayAppointments = appointments[dateStr] || [];

    // Sunday is unavailable
    if (date.getDay() === 0) {
      return false;
    }

    // Maximum of two appointments per day
    if (dayAppointments.length >= 2) {
      return false;
    }

    if (dayAppointments.length === 0) {
      return true;
    }

    return generateTimeSlots(date).some((time) =>
      isTimeSlotAvailable(dateStr, time)
    );
  };

  // Check whether a specific time slot is available
  const isTimeSlotAvailable = (dateStr, time) => {
    const date = new Date(`${dateStr}T12:00:00`);

    if (date.getDay() === 0) {
      return false;
    }

    if (date.getDay() === 6) {
      const allowedSaturdayTimes = ['09:00', '10:00', '11:00'];

      if (!allowedSaturdayTimes.includes(time)) {
        return false;
      }
    }

    const dayAppointments = appointments[dateStr] || [];
    const selectedStart = parseInt(time.split(':')[0], 10);
    const selectedEnd = selectedStart + 2;

    return !dayAppointments.some((apt) => {
      const bookedStart = parseInt(apt.time.split(':')[0], 10);
      const bookedEnd = bookedStart + 2;

      return (
        selectedStart < bookedEnd &&
        selectedEnd > bookedStart
      );
    });
  };

  // Generate calendar days
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const formatDate = (date) => {
    if (!date) return '';

    // Use local calendar date rather than converting to UTC.
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getEarliestBookingDate = () => {
    const earliestDate = new Date();

    earliestDate.setHours(0, 0, 0, 0);
    earliestDate.setDate(earliestDate.getDate() + 2);

    return earliestDate;
  };

  const formatDisplayDate = (date) => {
    if (!date) return '';

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDateClick = (date) => {
    if (!date) return;

    if (date.getDay() === 0) return;

    const earliestBookingDate = getEarliestBookingDate();

    if (date < earliestBookingDate) return;

    const dateStr = formatDate(date);

    if (!hasAvailableSlots(dateStr)) return;

    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    const dateStr = formatDate(selectedDate);

    if (isTimeSlotAvailable(dateStr, time)) {
      setSelectedTime(time);
    }
  };

  // Book appointment
  const handleBooking = async () => {
    if (
      !selectedDate ||
      !selectedTime ||
      !firstName.trim() ||
      !lastName.trim() ||
      !userEmail.trim()
    ) {
      return;
    }

    setLoading(true);

    try {
      const dateStr = formatDate(selectedDate);
      const bookedDate = selectedDate;
      const bookedTime = selectedTime;

      const appointmentDateTime = new Date(
        `${dateStr}T${selectedTime}:00`
      );

      // Add client
      await addClient({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: userEmail.trim().toLowerCase()
      });

      // Add appointment
      const newAppointment = await createAppointment({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: userEmail.trim().toLowerCase(),
        appointment_time: appointmentDateTime.toISOString(),
        notes: userNotes.trim() || null
      });

      // Update calendar immediately
      setAppointments((prev) => ({
        ...prev,
        [dateStr]: [
          ...(prev[dateStr] || []),
          {
            ...newAppointment,
            date: dateStr,
            time: bookedTime
          }
        ]
      }));

      // Save the successful booking details for the confirmation
      setConfirmedAppointment({
        date: bookedDate,
        time: bookedTime
      });

      setShowConfirmation(true);

      // Scroll to the confirmation once React has rendered it
      // Scroll to the top of the calendar page
       window.scrollTo({
        top: document.querySelector('.calendar-container').getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });

      // Reset the form after the confirmation has been displayed
      setTimeout(() => {
        setShowConfirmation(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setUserName('');
        setFirstName('');
        setLastName('');
        setUserEmail('');
        setUserNotes('');
      }, 5000);

    } catch (error) {
      console.error('Error booking appointment:', error);

      alert(
        `Error booking appointment: ${
          error.message || 'Please try again.'
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const changeMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });

    setSelectedDate(null);
    setSelectedTime(null);
  };

  const days = getDaysInMonth();
  const earliestBookingDate = getEarliestBookingDate();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>Book Your Appointment</h2>
        <p>Schedule a consultation at your convenience</p>
      </div>

      {showConfirmation && (
        <div className="alert alert-success" role="status">
          ✓ Appointment booked successfully for{' '}
          {formatDisplayDate(selectedDate)} at{' '}
          {formatTimeToAMPM(selectedTime)}
        </div>
      )}

      <div className="calendar-grid">
        {/* Calendar Section */}
        <div className="calendar-card">
          <div className="calendar-controls">
            <button
              onClick={() => changeMonth(-1)}
              className="btn btn-primary"
            >
              ← Prev
            </button>

            <h3>
              {currentMonth.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </h3>

            <button
              onClick={() => changeMonth(1)}
              className="btn btn-primary"
            >
              Next →
            </button>
          </div>

          <div className="calendar-days-header">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
              (day) => (
                <div key={day} className="day-name">
                  {day}
                </div>
              )
            )}
          </div>

          <div className="calendar-days">
            {days.map((date, idx) => {
              if (!date) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="calendar-day empty"
                  />
                );
              }

              const dateStr = formatDate(date);
              const isSunday = date.getDay() === 0;
              const isBeforeBookingWindow =
                date < earliestBookingDate;
              const isSelected =
                selectedDate &&
                formatDate(selectedDate) === dateStr;
              const hasSlots = hasAvailableSlots(dateStr);

              let className = 'calendar-day';

              if (
                isSunday ||
                isBeforeBookingWindow ||
                !hasSlots
              ) {
                className += ' past';
              } else if (isSelected) {
                className += ' selected';
              }

              return (
                <button
                  key={dateStr}
                  onClick={() => handleDateClick(date)}
                  disabled={
                    isSunday ||
                    isBeforeBookingWindow ||
                    !hasSlots
                  }
                  className={className}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="calendar-note">
            <strong>Note:</strong> Each appointment requires a 2-hour
            time block.
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking-card">
          {!selectedDate ? (
            <div className="empty-state">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>

              <p>Select a date to view available times</p>
            </div>
          ) : (
            <>
              <h3>{formatDisplayDate(selectedDate)}</h3>

              <div className="time-slots-section">
                <h4>Available Times</h4>

                <div className="time-slots">
                  {timeSlots.map((time) => {
                    const dateStr = formatDate(selectedDate);
                    const isAvailable =
                      isTimeSlotAvailable(dateStr, time);
                    const isSelected = selectedTime === time;

                    let className = 'time-slot';

                    if (!isAvailable) {
                      className += ' unavailable';
                    }

                    if (isSelected) {
                      className += ' selected';
                    }

                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeClick(time)}
                        disabled={!isAvailable}
                        className={className}
                      >
                        {formatTimeToAMPM(time)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedTime && (
                <div className="booking-form">
                  <div className="form-group">
                    <label htmlFor="first-name">First Name</label>
                    <input
                      id="first-name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                      id="last-name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="booking-email">Your Email</label>
                    <input
                      id="booking-email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="booking-notes">
                      Additional Information
                    </label>
                    <textarea
                      id="booking-notes"
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      placeholder="Any additional information..."
                      className="form-input"
                    />
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={
                      !firstName.trim() ||
                      !lastName.trim() ||
                      !userEmail.trim() ||
                      loading
                    }
                    className="btn btn-primary btn-large"
                  >
                    {loading
                      ? 'Booking...'
                      : 'Confirm Appointment'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
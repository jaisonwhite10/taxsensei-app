import React, { useState, useEffect } from 'react';
import '../styles/Calendar.css';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch appointments from API on mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  // API: Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/appointments');
      const data = await response.json();
      
      // Convert array to object keyed by date
      const appointmentsByDate = {};
      data.forEach(apt => {
        if (!appointmentsByDate[apt.date]) {
          appointmentsByDate[apt.date] = [];
        }
        appointmentsByDate[apt.date].push(apt);
      });
      
      setAppointments(appointmentsByDate);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Generate time slots from 9 AM to 3 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 15; hour++) {
      slots.push(`${hour}:00`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Check if a date has available slots
  const hasAvailableSlots = (dateStr) => {
    const dayAppointments = appointments[dateStr] || [];
    
    if (dayAppointments.length === 0) return true;
    if (dayAppointments.length >= 2) return false;

    const bookedHours = dayAppointments.map(apt => parseInt(apt.time.split(':')[0]));
    const availableSlots = timeSlots.filter(slot => {
      const slotHour = parseInt(slot.split(':')[0]);
      return !bookedHours.includes(slotHour) && 
             !bookedHours.includes(slotHour + 1) &&
             slotHour + 2 <= 15;
    });

    return availableSlots.length > 0;
  };

  // Check if a specific time slot is available
  const isTimeSlotAvailable = (dateStr, time) => {
    const dayAppointments = appointments[dateStr] || [];
    const hour = parseInt(time.split(':')[0]);

    if (dayAppointments.some(apt => apt.time === time)) {
      return false;
    }

    const blockedHours = dayAppointments.flatMap(apt => {
      const bookedHour = parseInt(apt.time.split(':')[0]);
      return [bookedHour - 1, bookedHour, bookedHour + 1];
    });

    return !blockedHours.includes(hour);
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
    return date.toISOString().split('T')[0];
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
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return;

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

  // API: Book appointment
  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !userName || !userEmail) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: formatDate(selectedDate),
          time: selectedTime,
          name: userName,
          email: userEmail
        })
      });

      if (response.ok) {
        const newAppointment = await response.json();
        
        // Update local state
        const dateStr = formatDate(selectedDate);
        setAppointments(prev => ({
          ...prev,
          [dateStr]: [...(prev[dateStr] || []), newAppointment]
        }));

        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
          setSelectedDate(null);
          setSelectedTime(null);
          setUserName('');
          setUserEmail('');
        }, 3000);
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const changeMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const days = getDaysInMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>Book Your Appointment</h2>
        <p>Schedule a consultation at your convenience</p>
      </div>

      {showConfirmation && (
        <div className="alert alert-success">
          ✓ Appointment booked successfully for {formatDisplayDate(selectedDate)} at {selectedTime}
        </div>
      )}

      <div className="calendar-grid">
        {/* Calendar Section */}
        <div className="calendar-card">
          <div className="calendar-controls">
            <button onClick={() => changeMonth(-1)} className="btn btn-primary">
              ← Prev
            </button>
            <h3>
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button onClick={() => changeMonth(1)} className="btn btn-primary">
              Next →
            </button>
          </div>

          <div className="calendar-days-header">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="day-name">{day}</div>
            ))}
          </div>

          <div className="calendar-days">
            {days.map((date, idx) => {
              if (!date) {
                return <div key={`empty-${idx}`} className="calendar-day empty" />;
              }

              const dateStr = formatDate(date);
              const isPast = date < today;
              const isSelected = selectedDate && formatDate(selectedDate) === dateStr;
              const hasSlots = hasAvailableSlots(dateStr);
              const appointmentCount = (appointments[dateStr] || []).length;

              let className = 'calendar-day';
              if (isPast) className += ' past';
              else if (!hasSlots) className += ' unavailable';
              else if (isSelected) className += ' selected';

              return (
                <button
                  key={dateStr}
                  onClick={() => handleDateClick(date)}
                  disabled={isPast || !hasSlots}
                  className={className}
                >
                  {date.getDate()}
                  {appointmentCount > 0 && (
                    <span className="appointment-indicator" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="calendar-note">
            <strong>Note:</strong> Each appointment requires a 2-hour time block.
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking-card">
          {!selectedDate ? (
            <div className="empty-state">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <p>Select a date to view available times</p>
            </div>
          ) : (
            <>
              <h3>{formatDisplayDate(selectedDate)}</h3>

              <div className="time-slots-section">
                <h4>Available Times</h4>
                <div className="time-slots">
                  {timeSlots.map(time => {
                    const dateStr = formatDate(selectedDate);
                    const isAvailable = isTimeSlotAvailable(dateStr, time);
                    const isSelected = selectedTime === time;

                    let className = 'time-slot';
                    if (!isAvailable) className += ' unavailable';
                    if (isSelected) className += ' selected';

                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeClick(time)}
                        disabled={!isAvailable}
                        className={className}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedTime && (
                <div className="booking-form">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="John Doe"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Your Email</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="form-input"
                    />
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={!userName || !userEmail || loading}
                    className="btn btn-primary btn-large"
                  >
                    {loading ? 'Booking...' : 'Confirm Appointment'}
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
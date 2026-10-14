import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

const supabasePublishableKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabasePublishableKey)

export async function addClient(data) {
  const { first_name, last_name, email } = data;

  const { data: clientId, error } = await supabase.rpc('add_client', {
    client_first_name: first_name,
    client_last_name: last_name,
    client_email: email
  });

  if (error) {
    console.error('Error adding client:', error);
    throw error;
  }

  return { id: clientId };
}

export async function createAppointment({
  first_name,
  last_name,
  email,
  appointment_time,
  notes
}) {
  const { data, error } = await supabase.rpc('book_appointment', {
    p_first_name: first_name,
    p_last_name: last_name,
    p_email: email,
    p_appointment_time: appointment_time,
    p_notes: notes || null
  });

  if (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }

  return data;
}

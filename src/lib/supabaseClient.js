import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabasePublishableKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

/**
 * Reuse a client with the same email, or create one if no match exists.
 * The database function also updates the client's phone number when supplied.
 */
export async function addClient(data) {
  const { first_name, last_name, email, number } = data;

  const { data: clientId, error } = await supabase.rpc('add_client', {
    client_first_name: first_name,
    client_last_name: last_name,
    client_email: email,
    client_phone: number
  });

  if (error) {
    console.error('Error adding or finding client:', error);
    throw error;
  }

  return { id: clientId };
}

/** Create an appointment connected to an existing client record. */
export async function createAppointment({
  client_id,
  appointment_time,
  appointment_type,
  notes
}) {
  const { data, error } = await supabase.rpc('book_appointment', {
    p_client_id: client_id,
    p_appointment_time: appointment_time,
    p_appointment_type: appointment_type,
    p_notes: notes || null
  });

  if (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }

  return data;
}
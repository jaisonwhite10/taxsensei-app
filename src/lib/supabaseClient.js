import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

const supabasePublishableKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabasePublishableKey)

export async function addClient(data) {
  const { name, email } = data;

  // Check whether client already exists
  const { data: existingClient, error: lookupError } = await supabase
    .from('clients')
    .select('id')
    .eq('email', email.trim().toLowerCase())
    .maybeSingle();

  if (lookupError) {
    console.error('Error checking for existing client:', lookupError);
    throw lookupError;
  }

  // Client already exists
  if (existingClient) {
    return existingClient;
  }

  // Client doesn't exist, so create them
  const { data: newClient, error: insertError } = await supabase
    .from('clients')
    .insert([{
      name: name.trim(),
      email: email.trim().toLowerCase()
    }])
    .select()
    .single();

  if (insertError) {
    console.error('Error creating client:', insertError);
    throw insertError;
  }

  return newClient;
}

export async function createAppointment({ name, email, appointment_time, notes }) {
  const { data, error } = await supabase
    .from('appointments')
    .insert([{ name, email, appointment_time, notes: notes || null }])
    .select()
    .single();
 
  if (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
 
  return data;
}

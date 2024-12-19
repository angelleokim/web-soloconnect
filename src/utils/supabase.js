import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

// 👉 Form Action utils
export const formActionDefault = {
  formProcess: false,
  formStatus: 200,
  formErrorMessage: '',
  formSuccessMessage: '',
}

// Check if the session is exists and is valid: Return false if there's an error
export const isAuthenticated = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error getting session', error.message)
    return false
  }

  return !!data.session
}

const supabaseLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message); // Throw the error if something goes wrong
  }
};

// Main logout function
async function doLogout() {
  const confirmed = window.confirm("Are you sure you want to logout?");
  if (!confirmed) {
    return; // Exit if the user cancels
  }

  try {
    await supabaseLogout(); // Call the Supabase logout function

    // Clear local storage
    localStorage.clear();

    alert("Logout Successfully!");
  } catch (error) {
    alert("Logout Failed: " + error.message); // Handle any errors
  }
}
export { doLogout };

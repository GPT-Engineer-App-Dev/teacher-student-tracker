import { useState, useEffect, createContext, useContext } from 'react';
import { supabase, SupabaseProvider } from './index.js';
import { useQueryClient } from '@tanstack/react-query';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const SupabaseAuthContext = createContext();

export const SupabaseAuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      queryClient.invalidateQueries('user');
    });

    getSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [queryClient]);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    queryClient.invalidateQueries('user');
  };

  return (
    <SupabaseProvider>
        <SupabaseAuthContext.Provider value={{ session, logout }}>
        {children}
        </SupabaseAuthContext.Provider>
    </SupabaseProvider>
  );
};

export const useSupabaseAuth = () => {
  return useContext(SupabaseAuthContext);
};

export const SupabaseAuthUI = () => (
  <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    theme="dark"
  />
);
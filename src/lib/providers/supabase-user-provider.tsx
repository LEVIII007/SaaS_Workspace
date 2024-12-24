'use client';

import { AuthUser } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useToast } from '@/components/ui/use-toast';

type SupabaseUserContextType = {
  user: AuthUser | null;
};

const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
});

export const useSupabaseUser = () => {
  return useContext(SupabaseUserContext);
};

interface SupabaseUserProviderProps {
  children: React.ReactNode;
}

export const SupabaseUserProvider: React.FC<SupabaseUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const { toast } = useToast();

  const supabase = createClientComponentClient();

  // Fetch the user details
  useEffect(() => {
    const getUser = async () => {
      console.log('Fetching user...');
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        console.log('User fetched:', user);
        setUser(user);
        console.log('Fetching subscription status for user ID:', user.id);
      } else {
        console.log('No user found.');
      }
    };
    getUser();
  }, [supabase, toast]);

  return (
    <SupabaseUserContext.Provider value={{ user }}>
      {children}
    </SupabaseUserContext.Provider>
  );
};
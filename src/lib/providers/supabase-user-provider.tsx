'use client';

import { AuthUser } from '@supabase/supabase-js';
import { Subscription } from '../supabase/supabase.types';
import { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getUserSubscriptionStatus } from '../supabase/queries';
import { useToast } from '@/components/ui/use-toast';

type SupabaseUserContextType = {
  user: AuthUser | null;
  subscription: Subscription | null;
};

const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
  subscription: null,
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
  const [subscription, setSubscription] = useState<Subscription | null>(null);
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
        const { data, error } = await getUserSubscriptionStatus(user.id);
        if (data) {
          console.log('Subscription data fetched:', data);
          setSubscription(data);
        }
        if (error) {
          console.error('Error fetching subscription status:', error);
          toast({
            title: 'Unexpected Error',
            description:
              'Oops! An unexpected error happened. Try again later.',
          });
        }
      } else {
        console.log('No user found.');
      }
    };
    getUser();
  }, [supabase, toast]);

  return (
    <SupabaseUserContext.Provider value={{ user, subscription }}>
      {children}
    </SupabaseUserContext.Provider>
  );
};
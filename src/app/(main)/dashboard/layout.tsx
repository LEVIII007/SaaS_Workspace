// import { SubscriptionModalProvider } from '@/lib/providers/subscription-modal-provider';
// import { getActiveProductsWithPrice } from '@/lib/supabase/queries';
import ChatRoom from "@/components/chat-support/chat-support";
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

const Layout: React.FC<LayoutProps> = async ({ children, params }) => {
  return (
    <main className="flex over-hidden h-screen">
        {children}
    </main>
  );
};

export default Layout;

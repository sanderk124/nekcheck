import { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/SideBar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import TopBar from '@/components/layout/TopBar';

interface PageLayoutProps {
  children: ReactNode;
}

export default async function PageLayout({ children }: PageLayoutProps) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }
    if (!user.email_confirmed_at) {
        redirect('/check-email');
    }
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

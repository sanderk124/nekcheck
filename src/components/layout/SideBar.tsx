'use client';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Mail, 
  FileText, 
  Settings 
} from 'lucide-react';
import { cn } from '../ui/utils';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Overzicht', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Patiënten', href: '/dashboard/patients', icon: Users },
  { name: 'Invites', href: '/dashboard/invites', icon: Mail },
  { name: 'Vragenlijsten', href: '/dashboard/questionnaires', icon: FileText },
  { name: 'Instellingen', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col h-screen">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-bold text-white text-sm">NK</span>
          </div>
          <span className="font-semibold">NekCheck Pro</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
                          (item.href !== '/dashboard' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground">
          Versie 1.0.0
        </div>
      </div>
    </div>
  );
}
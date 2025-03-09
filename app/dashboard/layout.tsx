import { ReactNode } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardRootLayout({ children }: DashboardLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 
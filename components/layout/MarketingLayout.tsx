import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/MainLayout';

interface MarketingLayoutProps {
  children: ReactNode;
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen">
        <header className="border-b">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-6">
              <a href="/" className="flex items-center">
                <span className="text-xl font-bold">JobAssist</span>
              </a>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/features" className="text-sm font-medium hover:underline">
                  Features
                </a>
                <a href="/pricing" className="text-sm font-medium hover:underline">
                  Pricing
                </a>
                <a href="/about" className="text-sm font-medium hover:underline">
                  About
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <a href="/login">
                <Button variant="ghost">Log in</Button>
              </a>
              <a href="/signup">
                <Button>Sign up</Button>
              </a>
            </div>
          </div>
        </header>
        <div className="flex-1">
          {children}
        </div>
        <footer className="border-t py-6 md:py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">JobAssist</h3>
                <p className="text-sm text-muted-foreground">
                  Streamline your job application process with AI-powered tools.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-4">Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/features" className="text-sm hover:underline">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="/pricing" className="text-sm hover:underline">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-sm hover:underline">
                      About
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/privacy" className="text-sm hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-sm hover:underline">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} JobAssist. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
} 
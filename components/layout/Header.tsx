import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, User, Search, FileText } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">JobAssist</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="/dashboard/job-analysis" className="text-sm font-medium hover:underline flex items-center gap-1">
              <Search className="h-3.5 w-3.5" />
              Job Analysis
            </Link>
            <Link href="/dashboard/resumes" className="text-sm font-medium hover:underline flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" />
              Resumes
            </Link>
            <Link href="/dashboard/applications" className="text-sm font-medium hover:underline">
              Applications
            </Link>
            <Link href="/dashboard/interviews" className="text-sm font-medium hover:underline">
              Interviews
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/dashboard/profile">
            <Button variant="outline" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </Button>
          </Link>
          <UserMenu />
        </div>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <nav className="grid gap-2 py-6">
              <Link href="/dashboard" className="block px-2 py-2 text-lg font-medium">
                Dashboard
              </Link>
              <Link href="/dashboard/job-analysis" className="block px-2 py-2 text-lg font-medium">
                Job Analysis
              </Link>
              <Link href="/dashboard/resumes" className="block px-2 py-2 text-lg font-medium">
                Resumes
              </Link>
              <Link href="/dashboard/applications" className="block px-2 py-2 text-lg font-medium">
                Applications
              </Link>
              <Link href="/dashboard/interviews" className="block px-2 py-2 text-lg font-medium">
                Interviews
              </Link>
              <Link href="/dashboard/profile" className="block px-2 py-2 text-lg font-medium">
                Profile
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">User</p>
            <p className="text-xs leading-none text-muted-foreground">
              user@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/dashboard/profile" className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          Subscription
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
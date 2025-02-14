"use client";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import toast from "react-hot-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = getServerSession(authOptions);
  const pathname = usePathname();

  const isAdmin = session?.user?.role === "ADMIN";

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/dashboard",
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
      current: pathname === "/dashboard/profile",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname === "/dashboard/settings",
    },
    ...(isAdmin
      ? [
          {
            name: "Admin",
            href: "/admin",
            icon: ShieldCheck,
            current: pathname === "/admin",
          },
        ]
      : []),
  ];

  const handleLogout = async () => {
    // add a loading state
    toast.promise(signOut(), {
      loading: "Signing out...",
      success: "Signed out",
      error: "Failed to sign out",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen bg-gray-100">
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
              <div className="flex flex-col flex-grow px-4">
                <nav className="flex-1 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`${
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                    >
                      <item.icon
                        className={`${
                          item.current
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500"
                        } mr-3 flex-shrink-0 h-6 w-6`}
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex-shrink-0 p-4">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
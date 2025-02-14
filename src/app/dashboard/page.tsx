import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, User } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Welcome back, {session.user.name || "User"}
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4">
              <User className="w-8 h-8 text-primary" />
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {session.user.name || "Not set"}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {session.user.email}
                </p>
                <p>
                  <span className="font-semibold">Role:</span>{" "}
                  {session.user.role}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4">
              <Activity className="w-8 h-8 text-primary" />
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No recent activity</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
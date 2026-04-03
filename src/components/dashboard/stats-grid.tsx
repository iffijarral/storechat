import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MessageCircle, Users, Zap, Clock } from "lucide-react";

const stats = [
  { title: "Total Chats", value: "1,284", icon: MessageCircle, trend: "+12.5%", color: "text-blue-600" },
  { title: "Active Sessions", value: "42", icon: Zap, trend: "Live", color: "text-green-600" },
  { title: "Avg. Response", value: "1.2s", icon: Clock, trend: "-0.4s", color: "text-orange-600" },
  { title: "Resolution Rate", value: "88%", icon: Users, trend: "+2.1%", color: "text-purple-600" },
];

export function StatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={cn(
              "text-xs font-medium mt-1",
              stat.trend.startsWith('+') ? "text-green-600" : "text-blue-600"
            )}>
              {stat.trend} <span className="text-muted-foreground font-normal">from last week</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
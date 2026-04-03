import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const conversations = [
  { id: 1, user: "Customer #4921", lastMsg: "Where is my order?", time: "2m ago", status: "online" },
  { id: 2, user: "Sarah Jenkins", lastMsg: "Do you have size M?", time: "15m ago", status: "offline" },
  { id: 3, user: "Customer #8821", lastMsg: "Return policy inquiry", time: "1h ago", status: "online" },
];

export function RecentConversations() {
  return (
    <div className="space-y-6">
      {conversations.map((chat) => (
        <div key={chat.id} className="flex items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{chat.user[0]}</AvatarFallback>
              </Avatar>
              {chat.status === "online" && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium leading-none">{chat.user}</p>
              <p className="text-xs text-muted-foreground mt-1 truncate max-w-[150px]">{chat.lastMsg}</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">{chat.time}</span>
        </div>
      ))}
    </div>
  );
}
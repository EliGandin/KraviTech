import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Calendar, User } from "lucide-react";

interface Message {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  message: string;
  status: "OPEN" | "CLOSED";
  date: string;
  operator_id: number | null;
}

interface Operator {
  id: number;
  name: string;
}

const mockMessages: Message[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone_number: "+1234567890",
    message: "Hello, I have a question about your services.",
    status: "OPEN",
    date: "2023-05-15",
    operator_id: null,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone_number: "+0987654321",
    message: "I'd like to schedule an appointment.",
    status: "CLOSED",
    date: "2023-05-14",
    operator_id: 1,
  },
];

const mockOperators: Operator[] = [
  { id: 1, name: "Operator 1" },
  { id: 2, name: "Operator 2" },
  { id: 3, name: "Operator 3" },
];

const Messages = () => {
  const [updatedMessages, setUpdatedMessages] = useState<
    Map<
      number,
      {
        status: string;
        operator_id: string;
      }
    >
  >(new Map());

  const handleStatusChange = (messageId: number, status: string) => {
    setUpdatedMessages((prev) =>
      new Map(prev).set(messageId, { ...prev.get(messageId), status }),
    );
  };

  const handleOperatorChange = (messageId: number, operatorId: string) => {
    setUpdatedMessages((prev) =>
      new Map(prev).set(messageId, {
        ...prev.get(messageId),
        operator_id: operatorId,
      }),
    );
  };

  const handleSave = async (messageId: number) => {
    const updatedMessage = updatedMessages.get(messageId);
    if (!updatedMessage) return;

    console.log(
      `Updating message ${messageId} with status: ${updatedMessage.status} and operator: ${updatedMessage.operator_id}`,
    );

    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMessage),
      });

      if (!response.ok) {
        throw new Error("Failed to update message");
      }

      console.log("Message updated successfully");
      // Here you would typically update your local state or refetch the messages
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-6 text-2xl font-bold">Messages</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mockMessages.map((message) => (
          <Dialog key={message.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardHeader className="space-y-1">
                  <CardTitle className="truncate text-xl font-bold">
                    {message.name}
                  </CardTitle>
                  <CardDescription className="truncate text-sm text-muted-foreground">
                    {message.message}
                  </CardDescription>
                </CardHeader>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <ScrollArea className="max-h-[80vh] pr-4">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    Message from {message.name}
                  </DialogTitle>
                  <DialogDescription className="text-lg text-muted-foreground">
                    Received on {message.date}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm">{message.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm">{message.phone_number}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm">{message.date}</p>
                  </div>
                  <div>
                    <Label htmlFor={`message-${message.id}`}>Message</Label>
                    <p
                      id={`message-${message.id}`}
                      className="mt-1 rounded-md border p-2 text-sm"
                    >
                      {message.message}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor={`status-${message.id}`}>Status</Label>
                    <Select
                      onValueChange={(value) =>
                        handleStatusChange(message.id, value)
                      }
                      defaultValue={message.status}
                    >
                      <SelectTrigger
                        id={`status-${message.id}`}
                        className="w-full"
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OPEN">Open</SelectItem>
                        <SelectItem value="CLOSED">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`operator-${message.id}`}>Operator</Label>
                    <Select
                      onValueChange={(value) =>
                        handleOperatorChange(message.id, value)
                      }
                      defaultValue={message.operator_id?.toString()}
                    >
                      <SelectTrigger
                        id={`operator-${message.id}`}
                        className="w-full"
                      >
                        <SelectValue placeholder="Select operator" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockOperators.map((operator) => (
                          <SelectItem
                            key={operator.id}
                            value={operator.id.toString()}
                          >
                            {operator.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter className="mt-6">
                <Button onClick={() => handleSave(message.id)}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Messages;

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
import { Mail, Phone, Calendar } from "lucide-react";

import { useGetAllOperators } from "@/hooks/operators/useGetAllOperators.ts";
import { useGetAllMessages } from "@/hooks/admin/useGetMessages.ts";
import { Message, Operator } from "@/global/interfaces/Props/MessageProps.ts";
import { useUpdateMessage } from "@/hooks/admin/useUpdateMessage.ts";
import Loader from "@/components/shared/Loader.tsx";

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | undefined>();
  const [selectedOperatorId, setSelectedOperatorId] = useState<number | null>(
    null,
  );
  const [open, setOpen] = useState<boolean>(false);

  const { messages, isLoading: isLoadingMessages } = useGetAllMessages();
  const { operators, isLoading: isLoadingOperators } = useGetAllOperators();
  const { updateMessageMutation } = useUpdateMessage();

  const openDialog = (message: Message) => {
    setSelectedMessage(message);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setSelectedMessage(undefined);
  };

  const handleSaveChanges = () => {
    if (selectedMessage !== undefined) {
      updateMessageMutation({
        id: selectedMessage.id,
        operator_id: selectedOperatorId,
      });
    }

    closeDialog();
  };

  if (isLoadingMessages || isLoadingOperators) return <Loader />;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {messages?.map((message: Message) => (
          <Dialog key={message.id} open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Card
                className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                onClick={() => openDialog(message)}
              >
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
                    <Select defaultValue={message.status}>
                      <SelectTrigger
                        id={`status-${message.id}`}
                        className="w-full"
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent defaultValue={message.status}>
                        <SelectItem value="OPEN">Open</SelectItem>
                        <SelectItem value="CLOSED">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`operator-${message.id}`}>Operator</Label>
                    <Select
                      onValueChange={(value) =>
                        setSelectedOperatorId(Number(value))
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
                        {operators?.map((operator: Operator) => (
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
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Messages;

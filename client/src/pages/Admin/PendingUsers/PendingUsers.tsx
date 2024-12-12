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
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Mail,
  Phone,
  GraduationCap,
  MessageSquare,
  Target,
  Building2,
  BicepsFlexed,
} from "lucide-react";

import { useGetPendingUsers } from "@/hooks/admin/usePendingUsers";
import { useActivateUsers } from "@/hooks/admin/useActivateUsers.ts";
import { IMenti, IMentor } from "@/global/interfaces/userInterfaces";
import {
  capitalizeValue,
  formatPhoneNumber,
} from "@/utils/formatters/formatFields";
import Loader from "@/components/shared/Loader.tsx";

const PendingUsers = () => {
  const [selectedUser, setSelectedUser] = useState<IMenti | IMentor | null>(
    null,
  );

  const { pendingUsers, isLoading } = useGetPendingUsers();
  const { activate } = useActivateUsers();
  const [open, setOpen] = useState<boolean>(false);

  const openDialog = (user: IMenti | IMentor) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const activateUser = () => {
    if (selectedUser?.id !== undefined) {
      activate({ id: selectedUser.id, role: selectedUser.role });
    }

    closeDialog();
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pendingUsers?.map((user: IMenti | IMentor) => (
          <Card
            key={user.email}
            className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
            onClick={() => openDialog(user)}
          >
            <CardHeader className="space-y-1">
              <CardTitle className="truncate text-xl font-bold">
                {user.name}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {capitalizeValue(user.role)}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <ScrollArea className="max-h-[80vh] pr-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {selectedUser?.name}
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground">
                {capitalizeValue(selectedUser?.role)}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm">
                  {formatPhoneNumber(selectedUser?.phone_number)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm">{selectedUser?.email}</p>
              </div>
            </div>

            {selectedUser?.role === "menti" && (
              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="education">
                  <AccordionTrigger>
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5" />
                      <span>Education</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {(selectedUser as IMenti).education}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="comments">
                  <AccordionTrigger>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Comments</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      {(selectedUser as IMenti).comments}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="goals">
                  <AccordionTrigger>
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>Goals</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5">
                      <li>{(selectedUser as IMenti).goals}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {selectedUser?.role === "mentor" && (
              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="experience">
                  <AccordionTrigger>
                    <div className="flex items-center space-x-2">
                      <BicepsFlexed className="h-5 w-5" />
                      <span>Experience</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {selectedUser?.experience}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="company">
                  <AccordionTrigger>
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5" />
                      <span>Company</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {(selectedUser as IMentor).company}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </ScrollArea>
          <DialogFooter className="mt-6 grid grid-cols-2 gap-4">
            <Button
              type="button"
              className="transition-all hover:bg-green-600"
              onClick={activateUser}
            >
              Approve
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="transition-all hover:bg-red-700"
              onClick={closeDialog}
            >
              Deny
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PendingUsers;

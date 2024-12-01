import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";

import { ActionProps } from "@/global/interfaces/Props/ActionProps.ts";
import { useMentors } from "@/hooks/tables/mentors/useMentors.ts";
import { useChangeMentor } from "@/hooks/tables/mentis/useChangeMentor.ts";

const ChangeMentor = ({ id, dialogOpen, setDialogOpen }: ActionProps) => {
  const [selectedMentor, setSelectedMentor] = useState<number>(0);

  const { mentors } = useMentors();
  const { changeMentor } = useChangeMentor();

  const handleMentor = () => {
    if (!selectedMentor) {
      return;
    }

    changeMentor({ id, mentorId: selectedMentor });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Mentor</DialogTitle>
          <DialogDescription>Select the new mentor</DialogDescription>
        </DialogHeader>
        <Select onValueChange={(value) => setSelectedMentor(Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select mentor" />
          </SelectTrigger>
          <SelectContent>
            {mentors?.map((mentor) => (
              <SelectItem key={mentor.id} value={String(mentor.id)}>
                {mentor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleMentor}>Change Mentor</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeMentor;

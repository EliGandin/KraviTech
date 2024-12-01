import { Dispatch, SetStateAction } from "react";

export interface ActionProps {
  id: number;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

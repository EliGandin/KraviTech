import { Input } from "@/components/ui/input.tsx";
import { ReactNode } from "react";
import { ControllerRenderProps } from "react-hook-form/dist/types/controller";
import { IMenti, IMentor } from "@/global/interfaces/userInterfaces.ts";

interface EditableFieldProps {
  icon: ReactNode;
  label: string;
  placeholder: string | undefined;
  field: ControllerRenderProps<
    Partial<IMenti | IMentor>,
    keyof IMenti | keyof IMentor
  >;
}

const EditableField = ({
  icon,
  label,
  placeholder,
  field,
}: EditableFieldProps) => {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <Input placeholder={placeholder} {...field} />
      </div>
    </div>
  );
};

export default EditableField;

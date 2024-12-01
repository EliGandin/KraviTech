import { ReactNode } from "react";

interface ProfileFieldProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}

const ProfileField = ({ icon, label, value }: ProfileFieldProps) => {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};

export default ProfileField;

import { useState } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { useGetMenti } from "@/hooks/profile/menti/useGetMenti.ts";
import Loader from "@/components/shared/Loader.tsx";
import MentiProfileGrid from "@/pages/Profile/MentiProfile/MentiProfileGrid.tsx";
import MentiEditableProfileGrid from "@/pages/Profile/MentiProfile/MentiEditableProfileGrid.tsx";
import { UpdateProfileSchema } from "@/schemas/updateProfile/MentiUpdateProfileSchema.ts";
import { mentiUpdateProfileResolver } from "@/resolvers/updateProfile/mentiProfileUpdateResolver.ts";
import { useUpdateProfile } from "@/hooks/profile/menti/useUpdateMentiProfile.ts";
import { IMenti } from "@/global/interfaces/userInterfaces.ts";
import { useDeleteMenti } from "@/hooks/tables/mentis/useDeleteMenti.ts";

const MentiProfile = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { id } = useParams();
  const { menti, isLoading } = useGetMenti(Number(id));
  const { mutate, isPending } = useUpdateProfile(Number(id));
  const { deactivateMenti } = useDeleteMenti();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof UpdateProfileSchema>>(
    mentiUpdateProfileResolver,
  );

  function onSubmit(data: z.infer<typeof UpdateProfileSchema>) {
    mutate(data as Partial<IMenti>);
    setIsEditing(false);
  }

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this profile?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    });

    if (result.isConfirmed) {
      deactivateMenti(Number(id));
      navigate("/signup");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="mx-auto max-w-4xl overflow-hidden bg-white">
        <CardContent className="p-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="text-center md:w-1/3 md:text-left">
              <Avatar className="mx-auto h-32 w-32 border-4 border-white shadow-lg md:mx-0">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/micah/svg?seed=${menti?.name}`}
                  alt={menti?.name}
                />
                <AvatarFallback>{menti?.name}</AvatarFallback>
              </Avatar>
              <h2 className="mb-2 mt-4 justify-self-start text-3xl font-bold">
                {menti?.name}
              </h2>
              <div className="flex h-3/5 flex-col justify-between">
                <Badge variant="outline" className="mx-auto px-3 py-1 text-lg">
                  {menti?.status}
                </Badge>
                <div className="flex flex-row justify-between gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        className="w-1/2"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="w-1/2"
                        form="menti-edit-form"
                        type="submit"
                        disabled={isPending}
                      >
                        {isPending ? "Saving..." : "Save"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="w-1/2"
                        onClick={() => setIsEditing(true)}
                      >
                        Update Profile
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-1/2"
                        onClick={handleDelete}
                      >
                        Delete Profile
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {isEditing ? (
              <MentiEditableProfileGrid
                menti={menti}
                form={form}
                onSubmit={onSubmit}
              />
            ) : (
              <MentiProfileGrid menti={menti} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentiProfile;

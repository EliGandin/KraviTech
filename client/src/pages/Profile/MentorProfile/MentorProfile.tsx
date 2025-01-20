import { ChangeEvent, useRef, useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";

import { useGetMentor } from "@/hooks/profile/mentor/useGetMentor.ts";
import Loader from "@/components/shared/Loader.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useUpdateProfile } from "@/hooks/profile/mentor/useUpdateMentorProfile.ts";
import { UpdateProfileSchema } from "@/schemas/updateProfile/MentorUpdateProfileSchema.ts";
import { mentorUpdateProfileResolver } from "@/resolvers/updateProfile/mentorProfileUpdateResolver.ts";
import { IMentor } from "@/global/interfaces/userInterfaces.ts";
import MentorEditableProfileGrid from "@/pages/Profile/MentorProfile/MentorEditableProfileGrid.tsx";
import MentorProfileGrid from "@/pages/Profile/MentorProfile/MentorProfileGrid.tsx";
import { useDeleteMentor } from "@/hooks/tables/mentors/useDeleteMentor.ts";
import { userAtom } from "@/state/atoms/userAtom.ts";
import { useGetProfileImage } from "@/hooks/profile/mentor/useGetProfileImage.ts";
import { formatInitials } from "@/utils/formatters/formatFields.ts";
import { useUpdateMentorProfileImage } from "@/hooks/profile/mentor/useUpdateMentorProfileImage.ts";

const MentorProfile = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = useRecoilValue(userAtom);
  const { id } = useParams();
  const { image } = useGetProfileImage(Number(id));
  const { mentor, isLoading } = useGetMentor(Number(id));
  const { mutate, isPending } = useUpdateProfile(Number(id));
  const { deactivateMentor } = useDeleteMentor(Number(id));
  const { uploadImage } = useUpdateMentorProfileImage(Number(id));
  const form = useForm<z.infer<typeof UpdateProfileSchema>>(
    mentorUpdateProfileResolver,
  );

  function onSubmit(data: z.infer<typeof UpdateProfileSchema>) {
    mutate(data as Partial<IMentor>);
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
      deactivateMentor();
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      uploadImage(formData);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="mx-auto max-w-4xl overflow-hidden bg-white">
        <CardContent className="p-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="text-center md:w-1/3 md:text-left">
              <div
                className="relative mx-auto md:mx-0"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleAvatarClick}
              >
                <Avatar className="h-32 w-32 cursor-pointer border-4 border-white shadow-lg">
                  <AvatarImage
                    src={
                      image ||
                      `https://api.dicebear.com/6.x/initials/svg?seed=${formatInitials(user?.name)}`
                    }
                    alt={mentor?.name}
                  />
                </Avatar>
                {isHovering && (
                  <div className="absolute inset-0 z-50 flex h-32 w-32 items-center justify-center rounded-full bg-black bg-opacity-50">
                    <Camera className="text-white" size={24} />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <h2 className="mb-2 mt-4 text-3xl font-bold">{mentor?.name}</h2>
              <p className="mb-4 text-xl text-muted-foreground">
                {mentor?.position}
              </p>
              <Badge variant="outline" className="px-3 py-1 text-lg">
                {mentor?.status}
              </Badge>
              <div className="mt-[50px] flex flex-row justify-between gap-2">
                {(user?.id === mentor?.id || user?.role === "admin") &&
                  (isEditing ? (
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
                  ))}
              </div>
            </div>

            {isEditing ? (
              <MentorEditableProfileGrid
                mentor={mentor}
                form={form}
                onSubmit={onSubmit}
              />
            ) : (
              <MentorProfileGrid mentor={mentor} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorProfile;

// import { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
//
// interface CommentSectionProps {
//   taskId: number;
// }
//
// const CommentSection = ({ taskId }: CommentSectionProps) => {
//   const [newComment, setNewComment] = useState("");
//
//   // const { data: comments, isLoading, error } = useQuery(['comments', taskId], () => fetchComments(taskId))
//   //
//   // const addCommentMutation = useMutation(
//   //   (content: string) => addComment(taskId, content),
//   //   {
//   //     onSuccess: (newComment) => {
//   //       queryClient.setQueryData(['comments', taskId], (oldData: any) => [...oldData, newComment])
//   //       setNewComment('')
//   //     },
//   //   }
//   // )
//
//   if (isLoading) return <div>Loading comments...</div>;
//
//   return (
//     <div>
//       <h3 className="mb-2 text-lg font-semibold">Comments</h3>
//       <ul className="space-y-4">
//         {comments?.map((comment) => (
//           <li key={comment.id} className="flex space-x-3">
//             <Avatar className="h-10 w-10">
//               <AvatarImage
//                 src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`}
//               />
//               <AvatarFallback>
//                 {comment.author
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")}
//               </AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-semibold">{comment.author}</p>
//               <p className="text-sm text-gray-500">
//                 {new Date(comment.createdAt).toLocaleString()}
//               </p>
//               <p className="mt-1">{comment.content}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className="mt-4">
//         <Textarea
//           placeholder="Add a comment..."
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           className="mb-2"
//         />
//         <Button onClick={() => addCommentMutation.mutate(newComment)}>
//           Add Comment
//         </Button>
//       </div>
//     </div>
//   );
// };
// export default CommentSection;

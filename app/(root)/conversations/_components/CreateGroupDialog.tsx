// "use client"

// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'
// import { Dialog, DialogDescription, DialogHeader, DialogTitle,DialogContent,DialogTrigger, DialogFooter } from '@/components/ui/dialog'
// import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
// import { api } from '@/convex/_generated/api'
// import { useMutationState } from '@/hooks/useMutationState'
// import { zodResolver } from '@hookform/resolvers/zod'
// // import { DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
// import { useQuery } from 'convex/react'
// import { ConvexError } from 'convex/values'
// import { CirclePlus, X } from 'lucide-react'
// import React, { useMemo } from 'react'
// import { useForm } from 'react-hook-form'
// import { toast } from 'sonner'
// import { z } from 'zod'

// type Props = {}
// type Friend = {
//     _id: string;
//     name: string;
//     imageUrl: string;
//     username: string;
//   };
  

// const createGroupFormSchema = z.object({
//     name: z.string().min(1, {message: "This field can't be empty"}),
//     members: z
//     .string()
//     .array()
//     .min(1, {message: "You must select at least 1 friend"}),

// })

// const CreateGroupDialog = (props: Props) => {
//     // const friends = useQuery(api.friends.get)
//     const friends = useQuery(api.friends.get) as Friend[] | undefined;

//     const {mutate: createGroup, pending} = useMutationState(api.conversation.createGroup);

//     const form = useForm<z.infer<typeof createGroupFormSchema>>({
//         resolver: zodResolver(createGroupFormSchema),
//         defaultValues: {
//             name: "",
//             members: [],
//         },
//     });

//     const members = form.watch("members", []);

//     const unselectedFriends = useMemo(() => {
//         return friends ? friends.filter(friend => !members.includes(friend._id)) : []
//     }, [members.length, friends?.length]);

//     const handleSubmit = async (values: z.infer<typeof createGroupFormSchema>) => {
//       await createGroup({name: values.name, members: values.members}).then(() => {
//         form.reset();
//         toast.success("Group created");
//       }).catch(error => {
//         toast.error(error instanceof ConvexError ? error.data : "Unexpected error");
//       })
//     }
//   return (
//     <Dialog>
//       <Tooltip>
//         <TooltipTrigger asChild>
//             <DialogTrigger asChild>
//           <Button size="icon" variant="outline">
//               <CirclePlus/>
//           </Button>
//             </DialogTrigger>
//         </TooltipTrigger>

//         <TooltipContent>
//           <p>Create group</p>
//         </TooltipContent>
//       </Tooltip>

//       <DialogContent className='block'>
//         <DialogHeader>
//           <DialogTitle>Create group</DialogTitle>
//           <DialogDescription>Add your friends to get started</DialogDescription>
//         </DialogHeader>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
//             <FormField control={form.control} name="name" render=
//             {({field}) => {
//               return <FormItem>
//                 <FormControl>
//                 <FormLabel>Name</FormLabel>
//                 <Input placeholder='Group name...' {...field}></Input>
//                </FormControl>
//                 <FormMessage/>
//               </FormItem>
//             }}>
//             </FormField>

//             <FormField control={form.control} name="members" render=
//             {() => {
//               return <FormItem>
//                 <FormLabel>Friends</FormLabel>
//                 <FormControl>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild disabled={unselectedFriends.length === 0}>
//                     <Button className='w-full' variant="outline">Select</Button>
//                   </DropdownMenuTrigger>

//                   <DropdownMenuContent className="w-full">
//                     {
//                       unselectedFriends.map(friend => {
//                         return(
//                           <DropdownMenuCheckboxItem
//                           key={friend._id}
//                           className='flex items-center gap-2 w-full p-2'
//                           onCheckedChange={checked => {
//                             if(checked){
//                               form.setValue("members", [...members,friend._id])
//                             }
//                           }}>
//                             <Avatar className='w-8 h-8'>
//                               <AvatarImage src={friend.imageUrl}/>
//                               <AvatarFallback>
//                                 {
//                                   friend.username.substring(0,1)
//                                 }
//                               </AvatarFallback>
//                             </Avatar>

//                             <h4 className='truncate'>{friend.username}  </h4>
//                           </DropdownMenuCheckboxItem>
//                         );
//                       })
//                     }
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//                 </FormControl>
//                 <FormMessage/>
//               </FormItem>
//             }}/>
//             {/* </FormField> */}
//             {
//               members && members.length ?
//               <Card className='flex items-center gap-3 overflow-x-auto w-full h-24 p-2 no-scrollbar'>
//                 {
//                   friends?.filter(friend => members.includes(friend._id))
//                   .map(friend => {
//                     return(
//                       <div key={friend._id} className='flex flex-col items-center gap-1'>
//                         <div className='relative'>
//                           <Avatar>
//                           <AvatarImage src={friend.imageUrl}/>
//                               <AvatarFallback>
//                                 {
//                                   friend.username.substring(0,1)
//                                 }
//                               </AvatarFallback>
//                           </Avatar>

//                           <X className='text-muted-foreground w-4 h-4
//                           absolute bottom-8 left-7bg-muted
//                           rounded-full cursor-pointer'
//                           onClick={() => {
//                             form.setValue("members", members.filter((id) => id !== friend._id))
//                           }}/>
//                         </div>
//                         <p className='truncate text-sm'>{friend.username.split(" ")[0]}</p>
//                       </div>
//                     )
//                   })
//                 }
//               </Card>
//               :
//               null
//             }
//             <DialogFooter>
//             <Button disabled={pending} type="submit">Create</Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default CreateGroupDialog
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { api } from "@/convex/_generated/api";
import { useMutationState } from "@/hooks/useMutationState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { CirclePlus, X } from "lucide-react";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Friend = {
  _id: string;
  name: string;
  imageUrl: string;
  username: string;
};

const createGroupFormSchema = z.object({
  name: z.string().min(1, { message: "This field can't be empty" }),
  members: z
    .array(z.string())
    .min(1, { message: "You must select at least 1 friend" }),
});

const CreateGroupDialog = () => {
  const friends = useQuery(api.friends.get);
  // const friends = useQuery(api.friends.get) as Friend[] | undefined;
  console.log("friends array is ...",friends)

  const { mutate: createGroup, pending } = useMutationState(api.conversation.createGroup);

  const form = useForm<z.infer<typeof createGroupFormSchema>>({
    resolver: zodResolver(createGroupFormSchema),
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = form.watch("members", []);

  const unselectedFriends = useMemo(() => {
    return friends ? friends.filter((f) => !members.includes(f._id)) : [];
  }, [friends, members]);


  const handleSubmit = async (values: z.infer<typeof createGroupFormSchema>) => {
    try {
      await createGroup({ name: values.name, members: values.members });
      form.reset();
      toast.success("Group created");
    } catch (error) {
      toast.error(error instanceof ConvexError ? error.data : "Unexpected error");
    }
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <CirclePlus />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create group</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="block">
        <DialogHeader>
          <DialogTitle>Create group</DialogTitle>
          <DialogDescription>Add your friends to get started</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Group name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="members"
              render={() => (
                <FormItem>
                  <FormLabel>Friends</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild disabled={unselectedFriends.length === 0}>
                        <Button className="w-full" variant="outline">
                          Select
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full max-h-60 overflow-auto">
                        {unselectedFriends.map((friend) => (
                          <DropdownMenuCheckboxItem
                            key={friend._id}
                            checked={members.includes(friend._id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                form.setValue("members", [...members, friend._id]);
                              } else {
                                form.setValue(
                                  "members",
                                  members.filter((id) => id !== friend._id)
                                );
                              }
                            }}
                            className="flex items-center gap-2 w-full p-2"
                          >
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={friend.imageUrl} />
                              <AvatarFallback>{friend.username[0]}</AvatarFallback>
                            </Avatar>
                            <h4 className="truncate">{friend.username}</h4>
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {members.length > 0 && (
              <Card className="flex items-center gap-3 overflow-x-auto w-full h-24 p-2 no-scrollbar">
                {friends
                  ?.filter((f) => members.includes(f._id))
                  .map((friend) => (
                    <div key={friend._id} className="flex flex-col items-center gap-1">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={friend.imageUrl} />
                          <AvatarFallback>{friend.username[0]}</AvatarFallback>
                        </Avatar>
                        <X
                          className="text-muted-foreground w-4 h-4 absolute -top-1 -right-1 bg-muted rounded-full cursor-pointer"
                          onClick={() =>
                            form.setValue(
                              "members",
                              members.filter((id) => id !== friend._id)
                            )
                          }
                        />
                      </div>
                      <p className="truncate text-sm">{friend.username.split(" ")[0]}</p>
                    </div>
                  ))}
              </Card>
            )}

            <DialogFooter>
              <Button disabled={pending} type="submit">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;

"use client"

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip'
import { api } from '@/convex/_generated/api'
import { useMutationState } from '@/hooks/useMutationState'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { useQuery } from 'convex/react'
import { CirclePlus } from 'lucide-react'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {}
type Friend = {
    _id: string;
    name: string;
  };
  

const createGroupFormSchema = z.object({
    name: z.string().min(1, {message: "This field can't be empty"}),
    members: z
    .string()
    .array()
    .min(1, {message: "You must select at least 1 friend"}),

})

const CreateGroupDialog = (props: Props) => {
    // const friends = useQuery(api.friends.get)
    const friends = useQuery(api.friends.get) as Friend[] | undefined;

    const {mutate: createGroup, pending} = useMutationState(api.conversation.createGroup);

    const form = useForm<z.infer<typeof createGroupFormSchema>>({
        resolver: zodResolver(createGroupFormSchema),
        defaultValues: {
            name: "",
            members: [],
        },
    });

    const members = form.watch("members", []);

    const unselectedFriends = useMemo(() => {
        return friends ? friends.filter(friend => !members.includes(friend._id)) : []
    }, [members.length, friends?.length]);

    const handleSubmit = async (values: z.infer<typeof createGroupFormSchema>) => {
      await createGroup({name: values.name, members: values.members}).then(() => {
        form.reset();
        toast.success("Group created");
      }).catch(error => {
        toast.error(error instanceof ConvexError ? error.data : "Unexpected error");
      })
    }
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant="outline">
            <DialogTrigger asChild>
              <CirclePlus/>
            </DialogTrigger>
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </Dialog>
  )
}

export default CreateGroupDialog
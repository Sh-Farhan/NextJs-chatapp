"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogDescription, DialogHeader, DialogTitle,DialogContent,DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { api } from '@/convex/_generated/api'
import { useMutationState } from '@/hooks/useMutationState'
import { zodResolver } from '@hookform/resolvers/zod'
// import { DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import { useQuery } from 'convex/react'
import { ConvexError } from 'convex/values'
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
        <TooltipTrigger asChild>
            <DialogTrigger asChild>
          <Button size="icon" variant="outline">
              <CirclePlus/>
          </Button>
            </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent>
          <p>Create group</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className='block'>
        <DialogHeader>
          <DialogTitle>Create group</DialogTitle>
          <DialogDescription>Add your friends to get started</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
            <FormField control={form.control} name="name" render=
            {({field}) => {
              return <FormItem>
                <FormLabel>Name</FormLabel>
                <Input placeholder='Group name...' {...field}></Input>
              </FormItem>
            }}>
            </FormField>

            <FormField control={form.control} name="members" render=
            {() => {
              return <FormItem>
                <FormLabel>Friends</FormLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild disabled={unselectedFriends.length === 0}>
                    <Button className='w-full' variant="outline">Select</Button>
                  </DropdownMenuTrigger>
                </DropdownMenu>
              </FormItem>
            }}>
            </FormField>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateGroupDialog
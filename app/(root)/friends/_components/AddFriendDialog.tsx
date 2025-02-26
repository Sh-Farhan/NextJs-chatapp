// "use client"

// import React from 'react'
// import {z} from "zod"
// import {zodResolver} from "@hookform/resolvers/zod"
// import { useForm } from 'react-hook-form'
// import { Dialog, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
// import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
// import { Button } from '@/components/ui/button'
// import { UserPlus } from 'lucide-react'
// import { DialogHeader } from '@/components/ui/dialog'

// type Props = {}

// const addFriendFormSchema = z.object({
//     email: z.string().min(1, {
//         message: "This field can't be empty"
//     })
//     .email("Please enter a valid email")
// })

// const AddFriendDialog = (props: Props) => {

//     const form = useForm<z.infer<typeof addFriendFormSchema>>({
//         resolver: zodResolver(addFriendFormSchema),
//         defaultValues: {
//             email: "",
//         },
//     });
//   return (
//     <Dialog>
//         <Tooltip>
//             <TooltipTrigger>
//                 <Button size="icon" variant="outline">
//                     <DialogTrigger asChild>
//                         <UserPlus/>
//                     </DialogTrigger>
//                 </Button>
//             </TooltipTrigger>

//             <TooltipContent>
//                 <DialogHeader>
//                     <DialogTitle>Add a friend</DialogTitle>
//                 </DialogHeader>
//             </TooltipContent>
//         </Tooltip>
//     </Dialog>
//   )
// }

// export default AddFriendDialog

"use client"

import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const addFriendFormSchema = z.object({
    email: z.string().min(1, {
        message: "This field can't be empty"
    }).email("Please enter a valid email")
})

const AddFriendDialog = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(addFriendFormSchema),
        defaultValues: { email: "" }
    });

    const onSubmit = (data: any) => {
        console.log("Adding friend with email:", data.email);
    }

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button size="icon" variant="outline">
                            <UserPlus />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Add a Friend</TooltipContent>
            </Tooltip>

            {/* <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a Friend</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Label htmlFor="email">Friend's Email</Label>
                    <Input id="email" {...register("email")} placeholder="Enter email" />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    <Button type="submit">Send Invite</Button>
                </form>
            </DialogContent> */}
        </Dialog>
    )
}

export default AddFriendDialog;

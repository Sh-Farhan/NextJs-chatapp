"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form"; // Correct import
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DialogDescription } from "@radix-ui/react-dialog";
// import { useMutation } from "convex/react";
import { useMutationState } from "@/hooks/useMutationState";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

const addFriendFormSchema = z.object({
  email: z.string().min(1, {
    message: "This field can't be empty",
  }).email("Please enter a valid email"),
});

const AddFriendDialog = () => {
    const {mutate: createRequest, pending} = useMutationState(api.request.create);

  const form = useForm<z.infer<typeof addFriendFormSchema>>({
    resolver: zodResolver(addFriendFormSchema),
    defaultValues: {
        email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addFriendFormSchema>) => {
    await createRequest({email: values.email})
    .then(() => {
        form.reset();
        toast.success("Friend request sent!");
    })
    .catch(error => {
        console.log(error);
        toast.error(error instanceof ConvexError ? error.data : "Unexpected error occured");
    });
  };

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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Friend</DialogTitle>
          <DialogDescription>Send a request to connect with your friends!</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email..." {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button disabled={pending} type="submit">Add Friend</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDialog;


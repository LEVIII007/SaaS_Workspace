import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"  
import { StringValidation } from 'zod'


interface customdialogtriggerProps {
      header? : String;
      content? : React.ReactNode;
      children? : React.ReactNode;
      description? : string;
      footer? : string;
      className? : string;
    }

export const customdialogtrigger : React.FC<customdialogtriggerProps> = ({
    header,
    content,
    children,
    description,
    footer,
    className
}) => {

  return (                                      // so basically we have modieid the dialog trigger to make whole children into A dialog trigger. we will pass chilren into dialog trigger  
    <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

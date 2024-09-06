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

export const customdialogtrigger = () => {
  return (
    <div>customdialogtrigger</div>
  )
}

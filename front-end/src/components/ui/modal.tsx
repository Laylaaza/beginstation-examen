"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ReactNode } from "react"

type ModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

export function Modal({
  open,
  onOpenChange,
  title,
  children,
  footer,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">{children}</div>

        {footer && (
          <DialogFooter className="flex justify-end gap-2">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

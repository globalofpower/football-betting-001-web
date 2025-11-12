import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { langChange } from "@/lang"
import type { dialogType } from "@/types"

export function CustomDialogBox({open, setOpen, label, children,isCancelButton = false, event}: dialogType) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[460px] max-h-[80vh] flex flex-col" showCloseButton={false}>
          <DialogHeader className="shrink-0 shadow-[0 1px 2px 0 #3c40434d,0 1px 3px 1px #3c404326]">
            <DialogTitle className="text-center">{label}</DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-1">
            {children}
          </div>
          <DialogFooter className="shrink-0 mt-2">
            {
              isCancelButton ?
              <div className="flex w-full gap-3">
                <Button className="cursor-pointer w-1/2 py-5" onClick={() => setOpen(false)}>{langChange.cancel}</Button>
                <Button className="cursor-pointer w-1/2 py-5 bg-[var(--main-color)] hover:bg-[var(--main-color)]" onClick={event}>{langChange.confirm}</Button>
              </div>:
              <Button className="cursor-pointer w-full py-5 bg-[var(--main-color)] hover:bg-[var(--main-color)]" onClick={() => setOpen(false)}>{langChange.confirm}</Button>
            }
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

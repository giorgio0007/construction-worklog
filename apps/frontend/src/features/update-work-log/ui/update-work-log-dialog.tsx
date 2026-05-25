import { useState } from 'react';

import { Pencil } from 'lucide-react';

import { Button } from '@shared/ui/button';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shared/ui/dialog';

import type { WorkLog } from '@entities/work-log/model/types';

import { CreateWorkLogForm } from '@features/create-work-log/ui/create-work-log-form';

export const UpdateWorkLogDialog = ({ workLog }: { workLog: WorkLog }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        }
      />

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Редактировать запись</DialogTitle>
        </DialogHeader>

        <CreateWorkLogForm
          initialData={workLog}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

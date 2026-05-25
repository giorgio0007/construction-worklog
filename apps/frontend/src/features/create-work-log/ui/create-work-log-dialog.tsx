import { useState } from 'react';
import { Plus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shared/ui/dialog';

import { Button } from '@shared/ui/button';

import { CreateWorkLogForm } from './create-work-log-form';

export const CreateWorkLogDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="w-full sm:w-auto">
            <Plus aria-hidden />
            Добавить запись
          </Button>
        }
      />

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Новая запись работы</DialogTitle>
        </DialogHeader>

        <CreateWorkLogForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

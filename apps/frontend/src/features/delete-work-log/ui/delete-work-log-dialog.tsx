import { Trash2 } from 'lucide-react';

import { Button } from '@shared/ui/button';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from '@shared/ui/alert-dialog';

import { useDeleteWorkLog } from '@entities/work-log/api/queries';

export const DeleteWorkLogDialog = ({ id }: { id: string }) => {
  const deleteWorkLog = useDeleteWorkLog();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            size="icon-sm"
            aria-label="Удалить запись"
          >
            <Trash2 aria-hidden />
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить запись?</AlertDialogTitle>

          <AlertDialogDescription>
            Это действие нельзя отменить. Запись будет удалена из журнала
            навсегда.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            disabled={deleteWorkLog.isPending}
            onClick={() => deleteWorkLog.mutate(id)}
          >
            {deleteWorkLog.isPending ? 'Удаление...' : 'Удалить'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

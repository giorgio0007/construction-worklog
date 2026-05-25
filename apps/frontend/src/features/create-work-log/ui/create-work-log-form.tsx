import { useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/ui/select';

import {
  useCreateWorkLog,
  useUpdateWorkLog,
} from '@entities/work-log/api/queries';

import type { WorkLog } from '@entities/work-log/model/types';

import { useWorkTypes } from '@entities/work-type/api/queries';

import { createWorkLogSchema } from '../model/schema';

import type { CreateWorkLogForm as FormType } from '../model/schema';

type Props = {
  initialData?: WorkLog;
  onSuccess?: () => void;
};

const FieldError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return <p className="text-sm text-red-600">{message}</p>;
};

export const CreateWorkLogForm = ({ initialData, onSuccess }: Props) => {
  const create = useCreateWorkLog();
  const update = useUpdateWorkLog();

  const isEdit = Boolean(initialData);

  const { data: workTypes = [] } = useWorkTypes();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(createWorkLogSchema),
    defaultValues: {
      date: '',
      workTypeId: '',
      volume: undefined,
      unit: '',
      workerName: '',
      comment: '',
    },
  });

  useEffect(() => {
    if (!initialData) return;

    reset({
      date: initialData.date.slice(0, 10),
      workTypeId: initialData.workTypeId,
      volume: Number(initialData.volume),
      unit: initialData.unit,
      workerName: initialData.workerName,
      comment: initialData.comment || '',
    });
  }, [initialData, reset]);

  const onSubmit = (data: FormType) => {
    if (isEdit && initialData) {
      update.mutate(
        {
          id: initialData.id,
          dto: data,
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );

      return;
    }

    create.mutate(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  const isPending = create.isPending || update.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="space-y-1">
        <Input type="date" {...register('date')} aria-label="Дата" />
        <FieldError message={errors.date?.message} />
      </div>

      <div className="space-y-1">
        <Controller
          name="workTypeId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Вид работ" />
              </SelectTrigger>

              <SelectContent>
                {workTypes.map((wt) => (
                  <SelectItem key={wt.id} value={wt.id}>
                    {wt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError message={errors.workTypeId?.message} />
      </div>

      <div className="space-y-1">
        <Input
          type="number"
          step="any"
          placeholder="Объём"
          {...register('volume', {
            valueAsNumber: true,
          })}
        />
        <FieldError message={errors.volume?.message} />
      </div>

      <div className="space-y-1">
        <Input placeholder="Ед. изм. (м³, м², шт.)" {...register('unit')} />
        <FieldError message={errors.unit?.message} />
      </div>

      <div className="space-y-1">
        <Input placeholder="Исполнитель" {...register('workerName')} />
        <FieldError message={errors.workerName?.message} />
      </div>

      <Input placeholder="Комментарий (необязательно)" {...register('comment')} />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Сохранение...' : isEdit ? 'Сохранить' : 'Создать'}
      </Button>
    </form>
  );
};

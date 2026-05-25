import { useEffect, type ReactNode } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import { Label } from '@shared/ui/label';

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

const FieldError = ({ message }: { message?: string }) => (
  <p
    className="min-h-5 text-sm text-red-600"
    role={message ? 'alert' : undefined}
    aria-live="polite"
  >
    {message ?? '\u00A0'}
  </p>
);

const FormField = ({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label htmlFor={id}>{label}</Label>
    {children}
    <FieldError message={error} />
  </div>
);

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField id="date" label="Дата" error={errors.date?.message}>
        <Input id="date" type="date" aria-invalid={Boolean(errors.date)} {...register('date')} />
      </FormField>

      <FormField id="workTypeId" label="Вид работ" error={errors.workTypeId?.message}>
        <Controller
          name="workTypeId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="workTypeId"
                className="w-full"
                aria-invalid={Boolean(errors.workTypeId)}
              >
                <SelectValue placeholder="Выберите вид работ" />
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
      </FormField>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField id="volume" label="Объём" error={errors.volume?.message}>
          <Input
            id="volume"
            type="number"
            step="any"
            placeholder="0"
            aria-invalid={Boolean(errors.volume)}
            {...register('volume', {
              valueAsNumber: true,
            })}
          />
        </FormField>

        <FormField id="unit" label="Ед. изм." error={errors.unit?.message}>
          <Input
            id="unit"
            placeholder="м³, м², шт."
            aria-invalid={Boolean(errors.unit)}
            {...register('unit')}
          />
        </FormField>
      </div>

      <FormField id="workerName" label="Исполнитель" error={errors.workerName?.message}>
        <Input
          id="workerName"
          placeholder="ФИО исполнителя"
          aria-invalid={Boolean(errors.workerName)}
          {...register('workerName')}
        />
      </FormField>

      <div className="space-y-1.5">
        <Label htmlFor="comment">Комментарий</Label>
        <Input
          id="comment"
          placeholder="Необязательно"
          {...register('comment')}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? 'Сохранение...' : isEdit ? 'Сохранить' : 'Создать запись'}
      </Button>
    </form>
  );
};

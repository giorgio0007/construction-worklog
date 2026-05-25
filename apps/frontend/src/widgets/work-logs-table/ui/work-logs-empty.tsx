import { FileText } from 'lucide-react';

export const WorkLogsEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center">
      <div className="rounded-full bg-slate-100 p-4">
        <FileText className="h-8 w-8 text-slate-500" />
      </div>

      <h3 className="mt-4 text-lg font-semibold">Нет записей</h3>

      <p className="mt-2 text-sm text-slate-500">
        Добавьте первую запись о выполненных работах
      </p>
    </div>
  );
};

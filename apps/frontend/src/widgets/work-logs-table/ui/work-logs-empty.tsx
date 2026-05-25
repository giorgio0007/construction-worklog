import { ClipboardList } from 'lucide-react';

export const WorkLogsEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="rounded-full bg-slate-100 p-4">
        <ClipboardList className="size-8 text-slate-600" aria-hidden />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-slate-900">
        Записей пока нет
      </h3>

      <p className="mt-2 max-w-sm text-sm text-slate-600">
        Добавьте первую запись о выполненных работах на объекте
      </p>
    </div>
  );
};

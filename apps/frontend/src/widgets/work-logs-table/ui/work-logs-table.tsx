import { useWorkLogs } from '@entities/work-log/api/queries';
import { UpdateWorkLogDialog } from '@features/update-work-log/ui/update-work-log-dialog';
import { DeleteWorkLogDialog } from '@features/delete-work-log/ui/delete-work-log-dialog';
import { useWorkLogsFilterStore } from '@features/filter-work-logs/model/store';
import { WorkLogsTableSkeleton } from './work-logs-table-skeleton';
import { WorkLogsEmpty } from './work-logs-empty';

export const WorkLogsTable = () => {
  const { selectedDate, sortOrder } = useWorkLogsFilterStore();

  const { data = [], isLoading } = useWorkLogs({
    sort: sortOrder,
    ...(selectedDate ? { from: selectedDate, to: selectedDate } : {}),
  });

  if (isLoading) {
    return <WorkLogsTableSkeleton />;
  }

  if (!data.length) {
    return <WorkLogsEmpty />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-slate-50 text-left text-slate-600">
            <th className="px-4 py-3 font-medium">Дата</th>
            <th className="px-4 py-3 font-medium">Вид работ</th>
            <th className="px-4 py-3 font-medium">Объём</th>
            <th className="px-4 py-3 font-medium">Исполнитель</th>
            <th className="px-4 py-3 font-medium">Комментарий</th>
            <th className="px-4 py-3 font-medium w-[120px]">Действия</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b last:border-0 hover:bg-slate-50/80">
              <td className="px-4 py-3 whitespace-nowrap">
                {row.date.slice(0, 10)}
              </td>
              <td className="px-4 py-3">{row.workType.name}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                {row.volume} {row.unit}
              </td>
              <td className="px-4 py-3">{row.workerName}</td>
              <td className="px-4 py-3 text-slate-500">{row.comment || '—'}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <UpdateWorkLogDialog workLog={row} />
                  <DeleteWorkLogDialog id={row.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

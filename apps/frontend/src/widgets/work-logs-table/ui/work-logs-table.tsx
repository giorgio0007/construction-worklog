import { useWorkLogs } from '@entities/work-log/api/queries';
import type { WorkLog } from '@entities/work-log/model/types';
import { UpdateWorkLogDialog } from '@features/update-work-log/ui/update-work-log-dialog';
import { DeleteWorkLogDialog } from '@features/delete-work-log/ui/delete-work-log-dialog';
import { useWorkLogsFilterStore } from '@features/filter-work-logs/model/store';
import { WorkLogsTableSkeleton } from './work-logs-table-skeleton';
import { WorkLogsEmpty } from './work-logs-empty';

const formatDate = (date: string) => date.slice(0, 10);

const WorkLogActions = ({ workLog }: { workLog: WorkLog }) => (
  <div className="flex items-center gap-2">
    <UpdateWorkLogDialog workLog={workLog} />
    <DeleteWorkLogDialog id={workLog.id} />
  </div>
);

const WorkLogCard = ({ row }: { row: WorkLog }) => (
  <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <time
        dateTime={formatDate(row.date)}
        className="text-sm font-semibold text-slate-900"
      >
        {formatDate(row.date)}
      </time>
      <WorkLogActions workLog={row} />
    </div>

    <dl className="mt-4 space-y-3 text-sm">
      <div>
        <dt className="text-xs font-medium uppercase tracking-wide text-slate-600">
          Вид работ
        </dt>
        <dd className="mt-0.5 font-medium text-slate-900">{row.workType.name}</dd>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-600">
            Объём
          </dt>
          <dd className="mt-0.5 text-slate-900">
            {row.volume} {row.unit}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-600">
            Исполнитель
          </dt>
          <dd className="mt-0.5 text-slate-900">{row.workerName}</dd>
        </div>
      </div>

      {row.comment && (
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-600">
            Комментарий
          </dt>
          <dd className="mt-0.5 text-slate-700">{row.comment}</dd>
        </div>
      )}
    </dl>
  </article>
);

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
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm md:block">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50 text-left">
              <th className="px-4 py-4 font-semibold text-slate-700">Дата</th>
              <th className="px-4 py-4 font-semibold text-slate-700">
                Вид работ
              </th>
              <th className="px-4 py-4 font-semibold text-slate-700">Объём</th>
              <th className="px-4 py-4 font-semibold text-slate-700">
                Исполнитель
              </th>
              <th className="px-4 py-4 font-semibold text-slate-700">
                Комментарий
              </th>
              <th className="w-[120px] px-4 py-4 font-semibold text-slate-700">
                Действия
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-900">
                  {formatDate(row.date)}
                </td>
                <td className="px-4 py-4 text-slate-900">{row.workType.name}</td>
                <td className="whitespace-nowrap px-4 py-4 text-slate-900">
                  {row.volume} {row.unit}
                </td>
                <td className="px-4 py-4 text-slate-900">{row.workerName}</td>
                <td className="px-4 py-4 text-slate-600">
                  {row.comment || '—'}
                </td>
                <td className="px-4 py-4">
                  <WorkLogActions workLog={row} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {data.map((row) => (
          <WorkLogCard key={row.id} row={row} />
        ))}
      </div>
    </>
  );
};

import { WorkLogsTable } from '@widgets/work-logs-table/ui/work-logs-table';
import { Layout } from '@widgets/layout/ui/layout';
import { CreateWorkLogDialog } from '@features/create-work-log/ui/create-work-log-dialog';
import { WorkLogsFilters } from '@features/filter-work-logs/ui/work-logs-filters';

export const WorkLogsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Записи</h2>
            <p className="mt-1 text-sm text-slate-600">
              Список выполненных работ на объекте
            </p>
          </div>

          <CreateWorkLogDialog />
        </div>

        <WorkLogsFilters />

        <WorkLogsTable />
      </div>
    </Layout>
  );
};

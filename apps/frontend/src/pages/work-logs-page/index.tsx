import { WorkLogsTable } from '@widgets/work-logs-table/ui/work-logs-table';
import { Layout } from '@widgets/layout/ui/layout';
import { CreateWorkLogDialog } from '@features/create-work-log/ui/create-work-log-dialog';
import { WorkLogsFilters } from '@features/filter-work-logs/ui/work-logs-filters';

export const WorkLogsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Записи</h2>

          <CreateWorkLogDialog />
        </div>

        <WorkLogsFilters />

        <WorkLogsTable />
      </div>
    </Layout>
  );
};

import { createBrowserRouter } from 'react-router-dom';

import { WorkLogsPage } from '@pages/work-logs-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WorkLogsPage />,
  },
]);

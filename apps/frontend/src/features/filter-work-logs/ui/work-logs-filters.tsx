import { Input } from '@shared/ui/input';
import { Button } from '@shared/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/ui/select';

import { useWorkLogsFilterStore } from '../model/store';

export const WorkLogsFilters = () => {
  const { selectedDate, sortOrder, setSelectedDate, setSortOrder } =
    useWorkLogsFilterStore();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="max-w-[220px]"
        aria-label="Фильтр по дате"
      />

      {selectedDate && (
        <Button variant="outline" onClick={() => setSelectedDate('')}>
          Сбросить дату
        </Button>
      )}

      <Select
        value={sortOrder}
        onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}
      >
        <SelectTrigger className="max-w-[220px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="desc">Сначала новые</SelectItem>
          <SelectItem value="asc">Сначала старые</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

import { Input } from '@shared/ui/input';
import { Label } from '@shared/ui/label';
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
    <section
      aria-label="Фильтры записей"
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="flex flex-1 flex-col gap-1.5 sm:min-w-[200px] sm:max-w-[240px]">
          <Label htmlFor="filter-date">Дата</Label>
          <Input
            id="filter-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            aria-label="Фильтр по дате"
          />
        </div>

        <div className="flex flex-1 flex-col gap-1.5 sm:min-w-[200px] sm:max-w-[240px]">
          <Label htmlFor="filter-sort">Сортировка</Label>
          <Select
            value={sortOrder}
            onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}
          >
            <SelectTrigger id="filter-sort" className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="desc">Сначала новые</SelectItem>
              <SelectItem value="asc">Сначала старые</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedDate && (
          <Button
            variant="outline"
            onClick={() => setSelectedDate('')}
            className="w-full sm:w-auto"
          >
            Сбросить дату
          </Button>
        )}
      </div>
    </section>
  );
};

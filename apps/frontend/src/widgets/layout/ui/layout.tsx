import type { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl p-6">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Журнал работ
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Учёт выполненных работ на объекте
            </p>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
};

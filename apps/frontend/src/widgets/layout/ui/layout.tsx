import type { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Журнал работ
          </h1>

          <p className="mt-1.5 text-sm text-slate-600">
            Учёт выполненных работ на объекте
          </p>
        </header>

        {children}
      </div>
    </div>
  );
};

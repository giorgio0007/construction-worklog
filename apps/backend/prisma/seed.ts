import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const workTypes = [
  'Монтаж опалубки',
  'Кладка перегородок',
  'Армирование',
  'Заливка бетона',
  'Монтаж перекрытий',
  'Штукатурные работы',
  'Монтаж кровли',
  'Укладка плитки',
];

async function main() {
  for (const name of workTypes) {
    await prisma.workType.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('✅ Work types seeded');

  const existingLogs = await prisma.workLog.count();

  if (existingLogs > 0) {
    console.log('ℹ️  Work logs already exist, skipping demo entries');
    return;
  }

  const types = await prisma.workType.findMany();
  const byName = Object.fromEntries(types.map((t) => [t.name, t.id]));

  const demoLogs = [
    {
      date: new Date('2026-05-23'),
      workTypeId: byName['Монтаж опалубки'],
      volume: 48,
      unit: 'м²',
      workerName: 'Петров А.С.',
      comment: 'Секция А, 2-й этаж',
    },
    {
      date: new Date('2026-05-23'),
      workTypeId: byName['Армирование'],
      volume: 1.2,
      unit: 'т',
      workerName: 'Сидоров В.И.',
      comment: 'Фундаментная плита',
    },
    {
      date: new Date('2026-05-24'),
      workTypeId: byName['Заливка бетона'],
      volume: 18,
      unit: 'м³',
      workerName: 'Иванов Е.Ф.',
      comment: 'Секция Б',
    },
    {
      date: new Date('2026-05-24'),
      workTypeId: byName['Кладка перегородок'],
      volume: 32,
      unit: 'м²',
      workerName: 'Козлов Д.М.',
      comment: 'Коридор, 3-й этаж',
    },
    {
      date: new Date('2026-05-25'),
      workTypeId: byName['Монтаж перекрытий'],
      volume: 6,
      unit: 'шт.',
      workerName: 'Петров А.С.',
      comment: null,
    },
    {
      date: new Date('2026-05-25'),
      workTypeId: byName['Штукатурные работы'],
      volume: 56,
      unit: 'м²',
      workerName: 'Новикова О.П.',
      comment: 'Подготовка под покраску',
    },
    {
      date: new Date('2026-05-26'),
      workTypeId: byName['Монтаж опалубки'],
      volume: 29,
      unit: 'м³',
      workerName: 'Иванов Е.Ф.',
      comment: 'Секция А',
    },
  ];

  await prisma.workLog.createMany({ data: demoLogs });

  console.log(`✅ ${demoLogs.length} demo work logs seeded`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const workTypes = [
  'Кладка перегородок',
  'Монтаж опалубки',
  'Бетонирование',
  'Электромонтаж',
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
      date: new Date('2026-05-24'),
      workTypeId: byName['Монтаж опалубки'],
      volume: 48,
      unit: 'м²',
      workerName: 'Петров А.С.',
      comment: 'Секция А, 2-й этаж',
    },
    {
      date: new Date('2026-05-25'),
      workTypeId: byName['Бетонирование'],
      volume: 18,
      unit: 'м³',
      workerName: 'Иванов Е.Ф.',
      comment: 'Секция Б',
    },
    {
      date: new Date('2026-05-25'),
      workTypeId: byName['Электромонтаж'],
      volume: 120,
      unit: 'м',
      workerName: 'Сидоров В.И.',
      comment: 'Магистральный щит',
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

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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

  for (const name of workTypes) {
    await prisma.workType.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
      },
    });
  }

  console.log('✅ Work types seeded');
}

main()
  .catch((error) => {
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

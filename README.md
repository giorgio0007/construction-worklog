# Журнал работ на строительном объекте

Небольшое веб-приложение, где прораб фиксирует, что было сделано на объекте: дата, вид работ, объём, исполнитель. Можно добавлять, редактировать и удалять записи, фильтровать и сортировать по дате.

## Стек и почему так

| Часть | Технологии |
|-------|------------|
| Фронтенд | React 19, TypeScript, Vite, React Query, React Hook Form + Zod, Tailwind, shadcn/ui |
| Бэкенд | NestJS, class-validator, Swagger |
| БД | PostgreSQL + Prisma |

**React + Vite** — быстрый dev-сервер и привычный стек без лишней обвязки. Для тестового не нужен Next.js: здесь одна страница, SSR не требуется.

**NestJS** — структурированный бэкенд с модулями, DTO и валидацией из коробки. Удобно показать, что API продумано, а не «один файл на всё».

**PostgreSQL** — нормальная реляционная БД с миграциями. Виды работ вынесены в отдельную таблицу и подтягиваются через seed, как в реальном проекте.

**React Query** — кеш, инвалидация после мутаций, скелетоны при загрузке.

**FSD-подобная структура** (`entities`, `features`, `widgets`) — чтобы код не превратился в кашу, когда записей станет больше десяти.

## Быстрый старт

Нужны Node.js 20+ и Docker.

### 1. База данных

```bash
docker compose up -d
```

PostgreSQL поднимется на порту **5434** (внутри контейнера — 5432).

### 2. Бэкенд

```bash
cd apps/backend
cp .env.example .env   # если .env ещё нет
npm install
npx prisma migrate deploy
npx prisma db seed
npm run start:dev
```

API: http://localhost:3000/api  
Swagger: http://localhost:3000/docs

### 3. Фронтенд

В отдельном терминале:

```bash
cd apps/frontend
cp .env.example .env   # если .env ещё нет
npm install
npm run dev
```

Приложение: http://localhost:5173

## Что реализовано

- Таблица записей: дата, вид работ, объём с единицей, исполнитель, комментарий
- Фильтр по дате и сортировка (сначала новые / старые)
- CRUD: создание, редактирование, удаление с подтверждением
- Справочник видов работ (8 типовых позиций в seed)
- Валидация на фронте (Zod) и бэкенде (class-validator)
- Данные хранятся в PostgreSQL, фронт ходит в REST API

## Структура репозитория

```
apps/
  backend/    — NestJS API, Prisma, миграции
  frontend/   — React SPA
docker-compose.yml
```

## Полезные команды

```bash
# Пересоздать клиент Prisma после изменения schema
cd apps/backend && npx prisma generate

# Открыть Prisma Studio (просмотр БД в браузере)
cd apps/backend && npx prisma studio
```

# Журнал работ на строительном объекте

Веб-приложение для учёта выполненных работ на строительном объекте. Прораб видит список записей, добавляет новые, редактирует и удаляет существующие, фильтрует и сортирует по дате.

## Quick start

```bash
git clone <repo-url>
cd construction-worklog
docker compose up --build
```

После сборки и запуска контейнеров:

- **Приложение:** http://localhost:5174
- **API:** http://localhost:3003/api
- **Swagger:** http://localhost:3003/docs

## Docker setup

Проект поднимается одной командой — `docker compose up --build`.

**Сервисы:**

| Сервис   | Образ / сборка     | Порт |
| -------- | ------------------ | ---- |
| postgres | postgres:16-alpine | 5435 |
| backend  | apps/backend       | 3003 |
| frontend | apps/frontend      | 5174 |

**Что происходит при старте backend:**

1. Ожидание готовности PostgreSQL (`pg_isready`)
2. `prisma migrate deploy` — применение миграций
3. `prisma db seed` — наполнение справочника и demo-записей
4. `npm run start:dev` — запуск NestJS

Переменные окружения для Docker задаются в `docker-compose.yml`. Пример для локальной разработки без Docker — в `.env.example` (корень) и `apps/*/.env.example`.

- **Frontend** — React SPA, ходит в REST API
- **Backend** — NestJS, валидация DTO, Swagger
- **PostgreSQL** — хранение видов работ и записей журнала
- **Prisma** — ORM, миграции, seed

## Что сделано по ТЗ

- Таблица записей: дата, вид работ, объём с единицей, исполнитель
- Фильтрация и сортировка по дате
- CRUD с валидацией обязательных полей
- Справочник видов работ — отдельная таблица, выбор из списка
- React + TypeScript, PostgreSQL, REST API

## Используемый стек

| Слой     | Технологии                                                                    |
| -------- | ----------------------------------------------------------------------------- |
| Frontend | React, TypeScript, Vite, React Query, Zustand, React Hook Form, Zod, Tailwind |
| Backend  | NestJS, class-validator, Swagger                                              |
| Database | PostgreSQL, Prisma                                                            |

### Почему выбраны

**NestJS** — модульная архитектура, DTO, pipes для валидации, Swagger из коробки. Удобно разделять контроллеры, сервисы и работу с БД.

**Prisma** — типобезопасная работа с PostgreSQL, миграции и seed в одном инструменте. Схема в одном файле, клиент генерируется автоматически.

**React Query** — загрузка данных с API, кеширование, автоматическое обновление списка после создания/редактирования/удаления.

**Zustand** — лёгкий стейт для UI-фильтров (дата, сортировка). Без лишней обвязки для двух полей.

**FSD** (Feature-Sliced Design) — структура фронтенда (`entities`, `features`, `widgets`, `shared`). Код разложен по зонам ответственности, проще ориентироваться при росте проекта.

## На что обратить внимание при проверке

1. **Форма создания** — пустая отправка показывает ошибки валидации
2. **Справочник видов работ** — только выбор из списка (`GET /api/work-types`)
3. **Фильтр по дате** — запрос уходит на backend, не фильтруется только на клиенте
4. **Удаление** — с подтверждением в диалоге
5. **Swagger** — все эндпоинты можно протестировать вручную

## Заметки

JWT-авторизация намеренно не добавлялась: в требованиях тестового задания её не было, а для текущего объёма это привело бы к избыточному усложнению решения.

Порты 3003 / 5174 / 5435 выбраны намеренно — стандартные 3000 и 5173 часто заняты локальными dev-серверами или зависшими Docker-процессами.

## Локальный запуск без Docker

Если нужно запускать backend/frontend на хосте (а postgres — в Docker):

```bash
docker compose up postgres -d

cd apps/backend && cp .env.example .env && npm install
npx prisma migrate deploy && npx prisma db seed && npm run start:dev

cd apps/frontend && cp .env.example .env && npm install && npm run dev
```

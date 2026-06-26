# Alnitak

Доска задач и аналитика выручки в одном рабочем пространстве. Single-page app на Nuxt 3, Tailwind и ECharts.

## Что внутри

- **Доска (Kanban)** - этапы и задачи с CRUD и перетаскиванием, состояние хранится в `localStorage`.
- **Аналитика** - выручка, прибыль по продуктам и сравнение плана с фактом на ECharts. Данные демонстрационные, генерируются на клиенте.
- Единая дизайн-система (OKLCH-токены, типографика, мотив "ledger rule"), доступность (landmarks, skip-link, фокус-ловушка в модалках, поддержка `prefers-reduced-motion`) и адаптивность от 390px.
- E2E-тесты на Playwright для доски.
- Docker-сборка фронтенда.

## Стек

Nuxt 3 (`ssr: false`, SPA), Vue 3, Pinia, ECharts, vuedraggable, Luxon, Tailwind CSS 3, SCSS.

## Запуск

```bash
npm install
npm run dev
```

Прод-сборка статического сайта:

```bash
npm run generate   # вывод в .output/public
```

Docker:

```bash
docker build -t alnitak .
docker run -p 3000:3000 -d alnitak
```

## Тесты

```bash
npm run e2e        # Playwright
npm run e2e:ui     # интерактивный режим
```

## Автор

[@selimdev00](https://github.com/selimdev00)

## License

[MIT](https://choosealicense.com/licenses/mit/)

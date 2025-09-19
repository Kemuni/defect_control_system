# Проект "Система Контроля" по работе со строительными компаниями
Является веб-приложением для централизованного управления дефектами на строительных объектах. Система обеспечивает полный цикл работы: от регистрации дефекта и назначения исполнителя до контроля статусов и формирования отчётности для руководства.

> ### Использованные технологии
> Frontend:
> [![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)](https://www.npmjs.com/)
> [![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
> [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
> [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
> <br/>Backend: 
> [![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff)](https://www.python.org/)
> [![FastAPI](https://img.shields.io/badge/FastAPI-009485.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
> [![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-%23D71F00.svg?logo=sqlalchemy&logoColor=white)](https://fastapi.tiangolo.com/)
> [![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
> <br/>Architecture: 
> [![MinIO](https://img.shields.io/badge/MinIO-%23C72E49.svg?logo=minio&logoColor=white)](https://www.min.io/)
> [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](https://www.docker.com/)
---

## Функционал
1. Регистрация пользователей и аутентификация.
2. Разграничение прав доступа посредством привилегий.
3. Управление проектами/объектами и их этапами.
4. Создание и редактирование дефектов (заголовок, описание, приоритет, исполнитель, сроки, вложения).
5. Хранение и управление статусами дефектов: Новая → В работе → На проверке → Закрыта/Отменена.
6. Ведение истории изменений дефектов.
7. Поиск, сортировка и фильтрация дефектов.
8. Экспорт отчётности в CSV/Excel.
9. Просмотр аналитических отчётов (графики, статистика).

 
## Основные роли
 1. **Инженеры**: Регистрация/исправление дефектов, обновление инфо о дефектах, добавление и редактирование объектов.
 2. **Менеджеры**: Назначение задач по исправлению дефектов, формирование отчетов.
 3. **Руководители и заказчики**: Просмотр прогресса, отчетности.

## Use Case диаграмма
![Use Case](./images/UseCase.jpg)

## Архитектура стеков
[Frontend часть](./frontend/README.md)
```mermaid
architecture-beta

service internet(internet)[Internet]
service proxy(internet)[Traefik]
service db(database)[Postgres]
service minio(database)[MinIO]
service backendServer(server)[Backend FastAPI]
service frontendServer(server)[Frontend NextJS]

internet:R <--> L:proxy
proxy:R <--> L:backendServer
proxy:R <--> L:frontendServer
proxy:R <--> L:minio
backendServer:R <--> L:db
```

## Архитектура базы данных
![Database architecture](./images/db_schema.png)

## Страницы
1. **Страница авторизации**
   Просто форма почта+пароль с возможность зайти/зарегистрироваться.
2. **Страница организаций**
   Список организаций, куда добавлен пользовать, присутствует возможность добавить создать новую организацию. Иначе - форма для создания организации.
3.  **Страница объектов**
    Список объектов организации с возможностью добавлений новых. Иначе - форма для добавления объекта.
4. **Страница дефектов**
   Список дефектов с возможностью фильтрации по объектам, статусам, ответственных, срокам. Иначе - форма для добавления.
5. **Страница дефекта**
   Подробная информация о дефекте с фото. Есть возможность отредактировать/исправить данный дефект, если есть такая привилегия. Добавить просмотр истории изменений.
6. **Страница аналитики**
   Диаграммы и показатели статистики решений дефектов с возможность фильтрации по датам, объектам и ответственным. Присутствуют кнопки экспорта аналитических отчетов в CSV/Excel.

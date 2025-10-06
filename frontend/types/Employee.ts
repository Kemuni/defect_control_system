export default interface Employee {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  permissions: string[];
  email: string;
}

export const mockedPermissions = [
  "Создание и редактирование объектов",
  "Исправление любого дефекта",
  "Регистрация дефектов",
  "Проверка исправлений дефектов",
  "Управление пользователями",
  "Просмотр аналитики",
]

export const mockedEmployees: Employee[] = [
  {
    id: 1,
    name: "Владимир",
    surname: "Семенюк",
    patronymic: "Александрович",
    email: "vladimirSA@yandex.ru",
    permissions: mockedPermissions.slice(0, 2),
  },
  {
    id: 2,
    name: "Александр",
    surname: "Сидоров",
    patronymic: "Михайлович",
    email: "aleksandrMD@yandex.ru",
    permissions: mockedPermissions.slice(2, 4),
  },
  {
    id: 3,
    name: "Петр",
    surname: "Петров",
    patronymic: "Петрович",
    email: "petrovPP@mail.ru",
    permissions: mockedPermissions.slice(0, 3),
  },
]

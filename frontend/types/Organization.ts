import {BoundedEmployee} from "@/types/BoundedEmployee";

export default interface Organization {
  id: number;
  title: string;
  amountOfEmployees: number;
  amountOfObjects: number;
  amountOfDefects: number;
  ownerEmployee: BoundedEmployee;
  createdAt: Date;
}

export const mockedOrganizations: Organization[] = [
  {
    id: 1,
    title: 'ООО "Бумажные стаканчики"',
    amountOfEmployees: 12,
    amountOfObjects: 9,
    amountOfDefects: 8,
    ownerEmployee: {
      id: 1,
      surname: "Семенюк",
      name: "Владимир",
      patronymic: "Александрович"
    },
    createdAt: new Date(),
  },
  {
    id: 2,
    title: 'ООО "Картонные коробки"',
    amountOfEmployees: 3,
    amountOfObjects: 6,
    amountOfDefects: 4,
    ownerEmployee: {
      id: 2,
      surname: "Сидоров",
      name: "Александр",
      patronymic: "Михайлович"
    },
    createdAt: new Date(),
  }
];

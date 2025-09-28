import {BoundedEmployee} from "@/types/BoundedEmployee";

export default interface Organization {
  id: number;
  logoUrl: string;
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
    logoUrl: 'https://images.unsplash.com/photo-1691256676407-785f84a30cff?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    logoUrl: 'https://images.unsplash.com/photo-1692382496182-05f3984391fc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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

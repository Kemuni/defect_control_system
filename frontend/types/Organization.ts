export default interface Organization {
  id: number;
  title: string;
  amountOfEmployees: number;
  amountOfObjects: number;
  amountOfDefects: number;
  ownerInitials: string;
  createdAt: Date;
}

export const mockedOrganizations: Organization[] = [
  {
    id: 1,
    title: 'ООО "Бумажные стаканчики"',
    amountOfEmployees: 12,
    amountOfObjects: 9,
    amountOfDefects: 8,
    ownerInitials: "Семенюк В. А.",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: 'ООО "Картонные коробки"',
    amountOfEmployees: 3,
    amountOfObjects: 6,
    amountOfDefects: 4,
    ownerInitials: 'Сидоров А. М.',
    createdAt: new Date(),
  }
];

export default interface Defect {
  id: number;
  title: string;
  description: string;
  status: DefectStatus;
  createdAt: Date;
  deadline?: Date;
  isCritical: boolean;
  organizationId: number;
  ownerId: number;  // Создатель задачи
  responsibleEmployeeId?: number;
  priority?: number;
}

export type DefectStatus = 'opened' | 'in_progress' | 'on_moderation' | 'closed';

export const mockedDefects: Defect[] = [
  {
    id: 1,
    title: 'Некорректный вывод',
    description: 'При завершении программы на компьютере возникает ошибка с кодом 4001, но отображается код 3912. Необходимо зайти и изменить вывод.',
    status: 'opened',
    createdAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
    deadline: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // сегодня + 2 дня
    isCritical: true,
    organizationId: 1,
    ownerId: 1,
    priority: 8,
  },
  {
    id: 2,
    title: 'Дефект 2',
    description: 'Описание дефекта 2',
    status: 'in_progress',
    createdAt: new Date(),
    isCritical: false,
    organizationId: 1,
    ownerId: 2,
    priority: 3,
  },
  {
    id: 3,
    title: 'Дефект 3',
    description: 'Описание дефекта 3',
    status: 'on_moderation',
    createdAt: new Date(),
    isCritical: true,
    organizationId: 2,
    ownerId: 1,
  },
]

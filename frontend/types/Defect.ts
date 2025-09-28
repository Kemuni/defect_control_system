import {BoundedEmployee} from "@/types/BoundedEmployee";

export default interface Defect {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  status: DefectStatus;
  createdAt: Date;
  deadline?: Date;
  isCritical: boolean;
  organizationId: number;
  creatorEmployee: BoundedEmployee;  // Тот кто зарегистрировал дефект
  responsibleEmployee?: BoundedEmployee;
  priority?: number;
}

export type DefectStatus = 'opened' | 'in_progress' | 'on_moderation' | 'closed';

export const mockedDefects: Defect[] = [
  {
    id: 1,
    title: 'Некорректный вывод',
    description: 'При завершении программы на компьютере возникает ошибка с кодом 4001, но отображается код 3912. Необходимо зайти и изменить вывод.',
    imageUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'opened',
    createdAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
    deadline: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // сегодня + 2 дня
    isCritical: true,
    organizationId: 1,
    creatorEmployee: {
      id: 1,
      surname: 'Иванов',
      name: 'Иван',
      patronymic: 'Иванович',
    },
    responsibleEmployee: {
      id: 2,
      surname: 'Петров',
      name: 'Петр',
      patronymic: 'Петрович',
    },
    priority: 8,
  },
  {
    id: 2,
    title: 'Трещина на дороге',
    description: 'Необходимо устранить трещину на дороге, заменив дорожное покрытие и попытки прошлого ремонта, которые не помогли исправить проблему.',
    imageUrl: 'https://images.unsplash.com/photo-1565551223391-be988013ee6d?q=80&w=1594&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'in_progress',
    createdAt: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
    isCritical: false,
    organizationId: 1,
    creatorEmployee: {
      id: 1,
      surname: 'Иванов',
      name: 'Иван',
      patronymic: 'Иванович',
    },
    priority: 3,
  },
  {
    id: 3,
    title: 'Неисправность устройства',
    description: 'При использовании устройства возникла неисправность. Необходимо заменить устройство, а также провести диагностику системы.',
    imageUrl: 'https://images.unsplash.com/flagged/photo-1566843017081-a27f11f2bf05?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'on_moderation',
    createdAt: new Date(new Date().getTime() - 12 * 24 * 60 * 60 * 1000),
    isCritical: true,
    organizationId: 2,
    creatorEmployee: {
      id: 2,
      surname: 'Семенов',
      name: 'Семен',
      patronymic: 'Семенович',
    },
    priority: 4,
  },
];

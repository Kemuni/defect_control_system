import {BoundedEmployee} from "@/types/BoundedEmployee";

export default interface Object {
  id: number;
  title: string;
  imageUrl: string;
  createdAt: Date;
  defectsCount: number;
  organizationId: number;
  defaultResponsibleEmployee?: BoundedEmployee;
  creatorEmployee: BoundedEmployee;
}

export const mockedObjects: Object[] = [
  {
    id: 1,
    title: "Объект 1",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(),
    defectsCount: 3,
    organizationId: 1,
    defaultResponsibleEmployee: {
      id: 1,
      surname: "Семенюк",
      name: "Владимир",
      patronymic: "Александрович"
    },
    creatorEmployee: {
      id: 1,
      surname: "Семенюк",
      name: "Владимир",
      patronymic: "Александрович"
    }
  },
  {
    id: 2,
    title: "Объект 2",
    imageUrl: "https://plus.unsplash.com/premium_photo-1688416553942-b97d4e95a239?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(),
    defectsCount: 1,
    organizationId: 1,
    defaultResponsibleEmployee: {
      id: 2,
      surname: "Сидоров",
      name: "Александр",
      patronymic: "Михайлович"
    },
    creatorEmployee: {
      id: 1,
      surname: "Семенюк",
      name: "Владимир",
      patronymic: "Александрович"
    }
  },
  {
    id: 3,
    title: "Объект 3",
    imageUrl: "https://images.unsplash.com/photo-1726441944333-27fb3d1a727e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(),
    defectsCount: 0,
    organizationId: 1,
    creatorEmployee: {
      id: 3,
      surname: "Петров",
      name: "Петр",
      patronymic: "Петрович"
    }
  }
]

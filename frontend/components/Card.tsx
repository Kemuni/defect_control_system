import {DefectStatus} from "@/types/Defect";
import React, {FC} from "react";
import Link from "next/link";
import {cn, getRussianWord} from "@/lib/utils";
import {Typography} from "@/components/Typography";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";
import {Button} from "@/components/Button";
import ArrowIcon from "@/components/icons/ArrowIcon";
import {UrlObject} from "node:url";
import {DefectStatusBadge} from "@/components/DefectStatusBadge";


export interface CardProps {
  imageUrl: string;
  href?: string | UrlObject;
  heightPx?: number;
  title: string;
  titleClassName?: string;
  subtitle: React.ReactNode;
  subtitleClassName?: string;
  description: string;
  descriptionClassName?: string;
  rightPart?: React.ReactNode;
  hideButton?: boolean;
  isSelected?: boolean;
  badge?: React.ReactNode;
}

/**
 * Карточка для отображения любой информации в компактном виде.
 * @param imageUrl - url картинки, которая будет вставлена в формате 1:1 слева.
 * @param title - Заголовок карточки.
 * @param subtitle - Текст под заголовком.
 * @param description - Текст под `description`.
 * @param heightPx - Высота карточки в пикселях.
 * @param titleClassName - Классы для заголовка.
 * @param subtitleClassName - Классы для `subtitle`.
 * @param descriptionClassName - Классы для `description`.
 * @param href - Ссылка, на которую перенаправит пользователя при нажатии на карточку.
 * @param rightPart - Правая часть карточка, рядом с кнопкой.
 * @param hideButton - Скрыть кнопку из правой части.
 * @param isSelected - Выделить карточку.
 * @param Badge - Небольшой компонент, который будет вставлен в левую верхнюю часть карточки.
 */
const Card: FC<CardProps> = (
  {
    imageUrl,
    title,
    subtitle,
    description,
    heightPx = 100,
    titleClassName = "",
    subtitleClassName = "",
    descriptionClassName = "",
    href = undefined,
    rightPart = false,
    hideButton = false,
    isSelected = false,
    badge: Badge = undefined
  }) =>
{
  return (
    <CardWrapper
      href={href}
      className={cn(
        `relative flex justify-between gap-2 w-full bg-white rounded-md overflow-hidden`,
        "duration-200 hover:brightness-95 hover:scale-[100.5%]",
        isSelected && "ring-2 ring-hint/75 shadow-sm",
      )}
      style={{ height: `${heightPx}px` }}
    >
      {
        Badge && (<div className="absolute w-fit z-10 top-1 left-1">{ Badge }</div>)
      }
      <div className={`relative shrink-0`}
           style={{ width: `${heightPx}px`, height: `${heightPx}px` }}>
        <ImageWithPlaceholder hidePlaceholderText src={imageUrl} alt="Фото дефекта"
                              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 10vw"
                              fill className="object-cover" />
      </div>
      <div className="min-w-0 flex-1 flex justify-between gap-1 items-center me-2">
        <section className="min-w-0 flex-1 flex flex-col gap-1 py-2">
          <Typography variant="title4" weight="medium"
                      className={cn(
                        "text-black text-nowrap text-ellipsis overflow-hidden",
                        titleClassName,
                      )}>
            { title }
          </Typography>
          <article className="flex flex-col gap-0">
            <Typography variant="subheadline" weight="light"
                        className={cn(
                          "text-hint text-nowrap text-ellipsis overflow-hidden",
                          subtitleClassName,
                        )}>
              { subtitle }
            </Typography>
            <Typography variant="subheadline" weight="light"
                        className={cn(
                          "text-hint text-nowrap text-ellipsis overflow-hidden",
                          descriptionClassName,
                        )}>
              { description }
            </Typography>
          </article>
        </section>
        <div className="ps-2 flex-0 flex gap-1 items-center justify-end">
          { rightPart }
          {
            !hideButton && (
              <Button variant="plain" size="sm" rightIcon={<ArrowIcon className="w-5 h-5" />}>
                Открыть
              </Button>
            )
          }
        </div>
      </div>
    </CardWrapper>
  );
}
export default Card;


interface CardWrapperProps {
  href?: string | UrlObject | undefined;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const CardWrapper: FC<CardWrapperProps> = ({ children, href, className, style }) => {
  if (href === undefined) {
    return (
      <div className={className} style={style}>{ children }</div>
    )
  }
  else {
    return (
      <Link href={href} className={className} style={style}>
        { children }
      </Link>
    )
  }
}


export interface OrganizationCardProps {
  href: string | UrlObject;
  title: string;
  logoUrl: string;
  isSelected?: boolean;
  description: string;
  ownerInitials: string;
}


export const OrganizationCard: FC<OrganizationCardProps> = (
  { href, title, logoUrl, description, ownerInitials, isSelected = false}) =>
{
  return (
    <Card href={href}
          imageUrl={logoUrl}
          title={title}
          subtitle={description}
          description={`Владелец: ${ownerInitials}`}
          isSelected={isSelected} />
  );
}


export interface DefectCardProps {
  href?: string | UrlObject;
  title: string;
  imageUrl: string;
  status: DefectStatus;
  isCritical: boolean;
  isSelected?: boolean;
  description: string;
  createdAt: Date;
}

export const DefectCard: FC<DefectCardProps> = (
  { href, status, title, imageUrl, description, createdAt, isCritical = false, isSelected = false}) =>
{
  const createdAtStr = createdAt.toLocaleDateString(
    'ru-RU',
    { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
  );

  const ChipBadge = (
    <Typography variant="subheadline" weight="light" className="w-fit rounded-md bg-red-accent text-white px-1 py-0.5">
      Критично
    </Typography>
  );

  return (
    <Card href={href}
          imageUrl={imageUrl}
          title={title}
          subtitle={description}
          description={`Создан ${ createdAtStr }`}
          badge={isCritical && ChipBadge}
          rightPart={<DefectStatusBadge status={status}/>}
          isSelected={isSelected} />
  );
}



export interface ObjectCardProps {
  href?: string | UrlObject;
  title: string;
  defectsCount: number;
  imageUrl: string;
  isSelected?: boolean;
  createdAt: Date;
}

export const ObjectCard: FC<ObjectCardProps> = (
  { title, imageUrl, defectsCount, createdAt, isSelected = false, href = undefined }
) =>
{
  const createdAtStr = createdAt.toLocaleDateString(
    'ru-RU',
    { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
  );
  return (
    <Card href={href}
          imageUrl={imageUrl}
          title={title}
          subtitle={`${defectsCount} ${getRussianWord(defectsCount, ["дефект", "дефекта", "дефектов"])}`}
          subtitleClassName={defectsCount === 0 ? "" : "text-red-accent"}
          description={`Создан ${ createdAtStr }`}
          isSelected={isSelected} />
  );
}


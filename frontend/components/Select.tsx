'use client';

import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  useCallback,
  ReactNode,
  Children,
  isValidElement,
  useImperativeHandle, ReactElement
} from 'react';
import { cn } from '@/lib/utils';
import ChevronIcon from "@/components/icons/ChevronIcon";

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

function useSelect(): SelectContextType {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a Select component');
  }
  return context;
}

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export const Select=  React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value, defaultValue = '', onValueChange, children, className }, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => selectRef.current as HTMLDivElement);

  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = useCallback((newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  }, [onValueChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Находим дочерний элемент с выбранным значением
  const selectedItemElement = Children.toArray(children).find((child) => {
    if (isValidElement<SelectItemProps>(child) && child.props.value === currentValue) {
      return child.props.children;
    }
    return false;
  }) as ReactElement<SelectItemProps> | undefined;

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        open,
        setOpen,
      }}
    >
      <div ref={selectRef} className={cn(
        'relative w-full',
        'rounded-md bg-light-background border border-hint/25 transition-colors',
        'hover:border-hint',
        className
      )}>
        <SelectTrigger>
          { selectedItemElement
            ? selectedItemElement.props.children
            : <span className="text-hint">Выберите значение</span>
          }
        </SelectTrigger>
        <SelectContent>
          {children}
        </SelectContent>
      </div>
    </SelectContext.Provider>
  );
});
Select.displayName = 'Select';


interface SelectTriggerProps {
  children: ReactNode;
  className?: string;
}

/*
 * Составляющая компонента Select. Отвечает за открытие/закрытие выпадающего списка и
 * отображение выбранного значения.
 */
const SelectTrigger: React.FC<SelectTriggerProps> = ({ children, className }) => {
  const { open, setOpen } = useSelect();

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        'flex gap-1 w-full items-center justify-between px-3 py-1.5 cursor-pointer',
        className
      )}
    >
      <span className="truncate">{children}</span>
      <ChevronIcon
        className={cn(
          "w-4 h-4 transition-transform text-hint rotate-180",
          open && "rotate-0"
        )}
      />
    </button>
  );
};


interface SelectContentProps {
  children: ReactNode;
  className?: string;
}

const SelectContent: React.FC<SelectContentProps> = ({ children, className }) => {
  const { open } = useSelect();

  if (!open) return null;

  return (
    <div
      className={cn(
        'absolute z-50 w-fit max-w-96 mt-1 rounded-md border border-hint bg-light-background max-h-60 overflow-auto',
        className
      )}
    >
      {children}
    </div>
  );
};


interface SelectItemProps {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

/*
 * Составляющая компонента Select. Отвечает за отображение списка значений.
 */
export const SelectItem: React.FC<SelectItemProps> = (
  { value, children, className, disabled = false }
) => {
  const { value: selectedValue, onValueChange } = useSelect();
  const isSelected = selectedValue === value;

  const handleClick = () => {
    if (disabled) return;
    onValueChange(value);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'flex w-full items-center px-2 py-1.5 text-left text-secondary-hint transition-colors cursor-pointer',
        'hover:bg-white/50',
        isSelected && 'bg-white/75 text-black cursor-default',
        disabled && 'cursor-not-allowed text-hint hover:bg-black/5',
        className
      )}
    >
      <span className="flex-1">{children}</span>
    </button>
  );
};

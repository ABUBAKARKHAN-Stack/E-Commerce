"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  group?: string;
}

interface SelectGroup {
  label: React.ReactNode;
  options: Option[];
}

interface SelectProps {
  options: SelectGroup[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  selectContentColor?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option…",
  className,
  disabled = false,
  selectContentColor,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const allOptions = options.flatMap((g) => g.options);

  const selectedOption = allOptions.find((o) => o.value === value);
  const displayLabel = selectedOption?.label ?? placeholder;
  const filteredGroups = options;
  const filteredOptions = filteredGroups.flatMap((g) => g.options);

  function openMenu() {
    if (!disabled) setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (!isOpen) {
      if (["Enter", " ", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        closeMenu();
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((i) =>
          i < filteredOptions.length - 1 ? i + 1 : 0,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((i) =>
          i > 0 ? i - 1 : filteredOptions.length - 1,
        );
        break;
      case "Enter":
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          choose(filteredOptions[highlightedIndex].value);
        }
        break;
    }
  };

  function choose(v: string) {
    onChange?.(v);
    closeMenu();
  }

  function clear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange?.("");
  }

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-md border border-[#3C3C43] bg-transparent px-3 text-sm shadow-xs",
          "focus-visible:border-ring focus-visible:ring-ring/50 transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
          disabled && "cursor-not-allowed opacity-50",
          !selectedOption && "text-muted-foreground",
        )}
      >
        <span className="truncate">{displayLabel}</span>
        <div className="flex items-center gap-1">
          {selectedOption && !disabled && (
            <button
              onClick={clear}
              className="hover:bg-accent hover:text-accent-foreground inline-flex size-5 items-center justify-center rounded-sm"
              aria-label="Clear selection"
            >
              <X className="size-4" />
            </button>
          )}
          <ChevronDown
            className={cn(
              "size-5 transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </div>
      </button>

      {isOpen && (
        <div
          className={`bg-accent ${selectContentColor} text-popover-foreground mt-2 w-full overflow-auto rounded-md border shadow-md backdrop-blur-3xl`}
          role="listbox"
        >
          {filteredGroups.length === 0 ? (
            <div className="text-muted-foreground px-3 py-2 text-sm">
              No options
            </div>
          ) : (
            filteredGroups.map((group, i) => (
              <div key={i} className="border-b">
                <div className="text-muted-foreground px-2 py-2 text-sm font-bold">
                  {group.label}
                </div>
                {group.options.map((option) => {
                  const flatIndex = filteredOptions.findIndex(
                    (o) => o.value === option.value,
                  );
                  const highlighted = flatIndex === highlightedIndex;
                  const selected = option.value === value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={cn(
                        "flex w-full items-center justify-between px-3 py-2 text-sm",
                        "hover:bg-accent-foreground hover:text-accent focus:bg-accent focus:text-accent-foreground",
                        highlighted && "bg-accent text-accent-foreground",
                        selected && "font-medium",
                      )}
                      onClick={() => choose(option.value)}
                      onMouseEnter={() => setHighlightedIndex(flatIndex)}
                    >
                      {option.label}
                      {selected && (
                        <span>
                          <Check className="size-5" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

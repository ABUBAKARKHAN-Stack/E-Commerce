import * as React from "react"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Utility function for className merging
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ')
}

// Context for Select state management
interface SelectContextType {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  placeholder?: string
  selectedLabel: string
  setSelectedLabel: (label: string) => void
}

const SelectContext = React.createContext<SelectContextType | null>(null)

const useSelectContext = () => {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error('Select components must be used within a Select')
  }
  return context
}

// Root Select component
interface SelectProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Select({
  children,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const [selectedLabel, setSelectedLabel] = React.useState("")


  const value = controlledValue !== undefined ? controlledValue : internalValue
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen

  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        open,
        onOpenChange: handleOpenChange,
        selectedLabel,
        setSelectedLabel,
      }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

// Select Trigger
interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

function SelectTrigger({ children, className, ...props }: SelectTriggerProps) {
  const { open, onOpenChange } = useSelectContext()
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  return (
    <button
      ref={triggerRef}
      type="button"
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      onClick={() => onOpenChange(!open)}
      className={cn(
        "border-[#3C3C43]  data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <motion.div
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <ChevronDownIcon className="h-4 w-4 opacity-50" />
      </motion.div>
    </button>
  )
}

// Select Value (placeholder/selected value display)
interface SelectValueProps {
  placeholder?: string
  className?: string
}

function SelectValue({ placeholder = "Select an option", className }: SelectValueProps) {
  const { selectedLabel } = useSelectContext();

  return (
    <span className={cn("block truncate", className)}>
      {selectedLabel || placeholder}
    </span>
  )
}

// Select Content (dropdown)
interface SelectContentProps {
  children: React.ReactNode
  className?: string
  position?: "item-aligned" | "popper"
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

function SelectContent({
  children,
  className,
  position = "popper",
  side = "bottom",
  align = "center",
}: SelectContentProps) {
  const { open, onOpenChange } = useSelectContext();
  const contentRef = React.useRef<HTMLDivElement>(null)

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      // Don't close if clicking on the content itself
      if (contentRef.current && contentRef.current.contains(target)) {
        return
      }

      // Don't close if clicking on any trigger button (let the trigger handle it)
      const triggers = document.querySelectorAll('[role="combobox"]')
      for (const trigger of triggers) {
        if (trigger.contains(target)) {
          return
        }
      }

      // Don't close if clicking on a clickable label
      const clickableLabels = document.querySelectorAll('[data-clickable-label="true"]')
      for (const label of clickableLabels) {
        if (label.contains(target)) {
          return
        }
      }

      // Close if clicking outside both content and trigger
      onOpenChange(false)
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onOpenChange])

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "absolute z-50 text-sm bg-[#F3F4F6] dark:bg-[#1B1B1F] dark:text-white w-full overflow-hidden rounded-md border p-1 shadow-md",
          className
        )}
        style={{
          top: '100%',
          left: 0,
          marginTop: '4px',
        }}
      >
        <div className="max-h-96 overflow-auto">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Select Item
interface SelectItemProps {
  children: React.ReactNode
  value: string
  className?: string
  disabled?: boolean
}

function SelectItem({ children, value, className, disabled = false }: SelectItemProps) {
  const { value: selectedValue, onValueChange, onOpenChange, setSelectedLabel } = useSelectContext();
  const isSelected = value === selectedValue;

  const handleSelect = () => {
    if (!disabled) {
      onValueChange(value)
      setSelectedLabel(typeof children === 'string' ? children : value)
      onOpenChange(false)
    }
  }

  return (
    <motion.div
      role="option"
      aria-selected={isSelected}
      onClick={handleSelect}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none dark:hover:bg-[#3F3F47] hover:bg-[#DADBDD] transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <span>{children}</span>
      {isSelected && (
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <CheckIcon className="h-4 w-4" />
          </motion.div>
        </span>
      )}
    </motion.div>
  )
}

// Select Label
interface SelectLabelProps {
  children: React.ReactNode
  className?: string
  clickable?: boolean
}

function SelectLabel({ children, className, clickable = false }: SelectLabelProps) {
  const { onOpenChange, open } = useSelectContext()

  const handleClick = (e: React.MouseEvent) => {
    if (clickable) {
      e.preventDefault()
      e.stopPropagation()
      onOpenChange(!open);
    }
  }

  if (clickable) {
    return (
      <div
        onClick={handleClick}
        data-clickable-label="true"
        className={cn(
          "flex items-center gap-2 text-[14.5px] font-medium text-gray-900 dark:text-gray-300 mb-1 cursor-pointer hover:opacity-80 transition-opacity",
          className
        )}
      >
        {children}
      </div>
    )
  }

  return (
    <div className={cn("px-2 py-1.5 dark:text-gray-50 text-gray-950  text-sm font-semibold", className)}>
      {children}
    </div>
  )
}

// Select Group
interface SelectGroupProps {
  children: React.ReactNode
  className?: string
}

function SelectGroup({ children, className }: SelectGroupProps) {
  return <div className={className}>{children}</div>
}

// Select Separator
interface SelectSeparatorProps {
  className?: string
}

function SelectSeparator({ className }: SelectSeparatorProps) {
  return <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />
}

// Scroll buttons (for large lists)
function SelectScrollUpButton({ className }: { className?: string }) {
  return (
    <div className={cn("flex cursor-default items-center justify-center py-1", className)}>
      <ChevronUpIcon className="h-4 w-4" />
    </div>
  )
}

function SelectScrollDownButton({ className }: { className?: string }) {
  return (
    <div className={cn("flex cursor-default items-center justify-center py-1", className)}>
      <ChevronDownIcon className="h-4 w-4" />
    </div>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
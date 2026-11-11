// Main Library Entry Point - Full Bundle
// This exports everything from all modules

// Core Components
export { Button, buttonVariants } from './components/core/button'
export { Input } from './components/core/input'
export { Label } from './components/core/label'
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/core/card'
export { Checkbox } from './components/core/checkbox'
export { Radio } from './components/core/radio'
export { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
  SelectGroup, 
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
} from './components/core/select'
export { Switch } from './components/core/switch'
export { Progress } from './components/core/progress'
export { Slider } from './components/core/slider'
export { Rating } from './components/core/rating'
export { Skeleton } from './components/core/skeleton'
export { Textarea } from './components/core/textarea'
export { ButtonGroup, ButtonGroupItem } from './components/core/button-group'
export { InputGroup, InputGroupAddon } from './components/core/input-group'

// Form Components
export { RadioGroup, RadioGroupItem } from './components/forms/radio-group'
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/forms/accordion'
export { Calendar } from './components/forms/calendar'
export { DateTimePicker } from './components/forms/datetime-picker'
export { PasswordInput } from './components/forms/password-input'
export { NumberInput } from './components/forms/number-input'
export { MultiSelect } from './components/forms/multi-select'
export { DateRangePicker } from './components/forms/date-range-picker'
export { TimePicker } from './components/forms/time-picker'
export { ColorPicker, DEFAULT_PRESETS } from './components/forms/color-picker'
export { FileUpload, formatBytes } from './components/forms/file-upload'
export { PromptInput } from './components/forms/prompt-input'
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from './components/forms/input-otp'
export {
  Breadcrumbs,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './components/forms/breadcrumbs'
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/forms/tabs'
export { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage,
  FormError,
  FormSuccess,
  FormWarning,
  useFormField,
  FormFieldContext,
  FormItemContext,
  FormContext
} from './components/forms/form'

// Overlay Components
export { 
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  useDialog
} from './components/overlay/dialog'
export { 
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  useAlertDialog
} from './components/overlay/alert-dialog'
export { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from './components/overlay/hover-card'
export { 
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from './components/overlay/collapsible'
export { 
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent
} from './components/overlay/context-menu'
export { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup
} from './components/overlay/dropdown-menu'
export { Toggle, ToggleGroup, ToggleGroupItem } from './components/overlay/toggle'
export { Separator } from './components/overlay/separator'

// Layout Components
export { Layout } from './components/layout/layout'
export { Navbar } from './components/layout/navbar'
export { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from './components/layout/sidebar'
export { Modal } from './components/layout/modal'
export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent, PopoverClose, usePopover } from './components/layout/popover'
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, useTooltip } from './components/layout/tooltip'
export { 
  Sheet, 
  SheetTrigger, 
  SheetPortal,
  SheetOverlay,
  SheetContent, 
  SheetHeader, 
  SheetFooter, 
  SheetTitle, 
  SheetDescription, 
  SheetClose, 
  useSheet 
} from './components/layout/sheet'
export { Drawer } from './components/layout/drawer'
export { Resizable, ResizableHandle, ResizablePanel } from './components/layout/resizable'
export { ScrollArea, ScrollBar } from './components/layout/scroll-area'

// Data Components
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from './components/data/table'
export { DataTable, DataTableHeader, DataTableRow, DataTablePagination } from './components/data/data-table'
export { 
  Chart, 
  BarChart, 
  LineChart, 
  PieChart, 
  DoughnutChart,
  AreaChart,
  RadialBarChart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle
} from './components/data/chart'
export { StatCard } from './components/data/stat-card'
export { Timeline, TimelineItem, TimelineNode, TimelineContent, TimelineTitle, TimelineDescription, TimelineTime } from './components/data/timeline'
export { TreeView } from './components/data/tree-view'

// Feedback Components
export { Alert, AlertTitle, AlertDescription } from './components/feedback/alert'
export { Spinner } from './components/feedback/spinner'
export { EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription, EmptyStateActions } from './components/feedback/empty-state'
export { Banner } from './components/feedback/banner'
export { MessageBubble } from './components/feedback/message-bubble'
export { ReasoningDisclosure } from './components/feedback/reasoning-disclosure'
export { ToolCallCard } from './components/feedback/tool-call-card'
export { Sonner } from './components/feedback/sonner'
export { 
  Toast, 
  ToastTitle, 
  ToastDescription, 
  ToastAction, 
  ToastClose, 
  ToastViewport, 
  ToastProvider,
  Toaster,
  useToast,
  toast
} from './components/feedback/toast'


// Navigation Components
export { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuTrigger, 
  NavigationMenuContent, 
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator,
  navigationMenuTriggerStyle
} from './components/navigation/navigation-menu'
export { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger, 
  MenubarPortal,
  MenubarContent, 
  MenubarItem, 
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel, 
  MenubarSeparator, 
  MenubarShortcut, 
  MenubarGroup,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent
} from './components/navigation/menubar'
export { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut, CommandDialog } from './components/navigation/command'
export { Combobox } from './components/navigation/combobox'
export { Pagination, PaginationItem, PaginationContent, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from './components/navigation/pagination'
export { Stepper } from './components/navigation/stepper'

// Media Components
export { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from './components/media/avatar'
export { Badge } from './components/media/badge'
export { Kbd, formatKeySymbol } from './components/media/kbd'
export { AspectRatio } from './components/media/aspect-ratio'
export { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext, 
  CarouselIndicator,
  CarouselIndicators,
  useCarousel
} from './components/media/carousel'

export { 
  TypographyH1, 
  TypographyH2, 
  TypographyH3, 
  TypographyH4, 
  TypographyH5, 
  TypographyH6, 
  TypographyP, 
  TypographyBlockquote, 
  TypographyCode, 
  TypographyLead, 
  TypographyLarge, 
  TypographySmall, 
  TypographyMuted 
} from './components/media/typography'

// Types
export type { ButtonProps } from './components/core/button'
export type { InputProps } from './components/core/input'
export type { LabelProps } from './components/core/label'
export type { CardProps, CardHeaderProps, CardTitleProps, CardDescriptionProps, CardContentProps, CardFooterProps } from './components/core/card'
export type { CheckboxProps, CheckedState } from './components/core/checkbox'
export type { RadioProps } from './components/core/radio'
export type { 
  SelectProps, 
  SelectContentProps, 
  SelectItemProps, 
  SelectTriggerProps, 
  SelectValueProps, 
  SelectGroupProps, 
  SelectLabelProps,
  SelectSeparatorProps 
} from './components/core/select'
export type { SwitchProps } from './components/core/switch'
export type { ProgressProps } from './components/core/progress'
export type { SliderProps } from './components/core/slider'
export type { RatingProps } from './components/core/rating'
export type { SkeletonProps } from './components/core/skeleton'
export type { TextareaProps } from './components/core/textarea'
export type { ButtonGroupProps, ButtonGroupItemProps } from './components/core/button-group'
export type { InputGroupProps, InputGroupAddonProps } from './components/core/input-group'

export type { RadioGroupProps, RadioGroupItemProps } from './components/forms/radio-group'
export type { AccordionProps, AccordionItemData, AccordionItemProps, AccordionTriggerProps, AccordionContentProps } from './components/forms/accordion'
export type { CalendarProps } from './components/forms/calendar'
export type { DateTimePickerProps, DateTimeMode, TimeFormat } from './components/forms/datetime-picker'
export type { PasswordInputProps } from './components/forms/password-input'
export type { NumberInputProps } from './components/forms/number-input'
export type { MultiSelectProps, MultiSelectOption } from './components/forms/multi-select'
export type { DateRangePickerProps, DateRange, DateRangePreset } from './components/forms/date-range-picker'
export type { TimePickerProps } from './components/forms/time-picker'
export type { ColorPickerProps, HsvColor, RgbColor, HslColor } from './components/forms/color-picker'
export type { FileUploadProps } from './components/forms/file-upload'
export type { PromptInputProps } from './components/forms/prompt-input'
export type { InputOTPProps, InputOTPGroupProps, InputOTPSlotProps, InputOTPSeparatorProps } from './components/forms/input-otp'
export type { BreadcrumbsProps, BreadcrumbItemData, BreadcrumbsItem } from './components/forms/breadcrumbs'
export type { TabsProps, TabItem, TabsListProps, TabsTriggerProps, TabsContentProps } from './components/forms/tabs'
export type { 
  FormProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
  FormFieldError,
  FormFieldContextValue,
  FormItemContextValue,
  FormContextValue
} from './components/forms/form'

export type { 
  DialogProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps
} from './components/overlay/dialog'
export type { 
  AlertDialogProps,
  AlertDialogTriggerProps,
  AlertDialogPortalProps,
  AlertDialogOverlayProps,
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogFooterProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionProps,
  AlertDialogCancelProps
} from './components/overlay/alert-dialog'
export type { 
  HoverCardProps,
  HoverCardTriggerProps,
  HoverCardContentProps
} from './components/overlay/hover-card'
export type { 
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps
} from './components/overlay/collapsible'
export type { 
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuPortalProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuCheckboxItemProps,
  ContextMenuRadioItemProps,
  ContextMenuLabelProps,
  ContextMenuSeparatorProps,
  ContextMenuShortcutProps,
  ContextMenuGroupProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuSubContentProps,
  ContextMenuRadioGroupProps
} from './components/overlay/context-menu'
export type { 
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuGroupProps,
  DropdownMenuPortalProps,
  DropdownMenuSubProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuRadioGroupProps
} from './components/overlay/dropdown-menu'
export type { ToggleProps, ToggleGroupProps, ToggleGroupItemProps } from './components/overlay/toggle'
export type { SeparatorProps } from './components/overlay/separator'

export type { LayoutProps } from './components/layout/layout'
export type { NavbarProps } from './components/layout/navbar'
export type { SidebarProps } from './components/layout/sidebar'
export type { ModalProps } from './components/layout/modal'
export type { 
  PopoverProps, 
  PopoverTriggerProps, 
  PopoverAnchorProps, 
  PopoverCloseProps, 
  PopoverContentProps 
} from './components/layout/popover'
export type { 
  TooltipProps, 
  TooltipProviderProps, 
  TooltipTriggerProps, 
  TooltipContentProps 
} from './components/layout/tooltip'
export type { 
  SheetProps, 
  SheetTriggerProps, 
  SheetPortalProps, 
  SheetOverlayProps, 
  SheetCloseProps, 
  SheetContentProps, 
  SheetHeaderProps, 
  SheetFooterProps, 
  SheetTitleProps, 
  SheetDescriptionProps 
} from './components/layout/sheet'
export type { DrawerProps } from './components/layout/drawer'
export type { ResizableProps, ResizableHandleProps, ResizablePanelProps } from './components/layout/resizable'
export type { ScrollAreaProps, ScrollBarProps } from './components/layout/scroll-area'

export type { TableProps, TableColumn } from './components/data/table'
export type { DataTableProps, DataTableColumn, DataTableHeaderProps, DataTableRowProps, DataTablePaginationProps } from './components/data/data-table'
export type { 
  ChartProps, 
  ChartData, 
  BarChartProps, 
  LineChartProps, 
  PieChartProps,
  AreaChartProps,
  RadialBarChartProps,
  ChartConfig,
  ChartContainerProps,
  ChartTooltipProps,
  ChartLegendProps
} from './components/data/chart'
export type { StatCardProps, StatCardTrend } from './components/data/stat-card'
export type { TimelineProps, TimelineItemData, TimelineItemStatus, TimelineItemProps, TimelineNodeProps } from './components/data/timeline'
export type { TreeViewProps, TreeNode } from './components/data/tree-view'

export type { AlertProps, AlertType, AlertVariant } from './components/feedback/alert'
export type { SpinnerProps } from './components/feedback/spinner'
export type { EmptyStateProps, EmptyStateIconProps } from './components/feedback/empty-state'
export type { BannerProps, BannerVariant } from './components/feedback/banner'
export type { MessageBubbleProps, MessageRole } from './components/feedback/message-bubble'
export type { ReasoningDisclosureProps } from './components/feedback/reasoning-disclosure'
export type { ToolCallCardProps, ToolCallStatus } from './components/feedback/tool-call-card'
export type { SonnerProps, ToastItem } from './components/feedback/sonner'
export type { ToastProps, ToastProviderProps } from './components/feedback/toast'

export type { 
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
  NavigationMenuViewportProps,
  NavigationMenuIndicatorProps
} from './components/navigation/navigation-menu'
export type { 
  MenubarProps,
  MenubarMenuProps,
  MenubarTriggerProps,
  MenubarPortalProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarCheckboxItemProps,
  MenubarRadioItemProps,
  MenubarLabelProps,
  MenubarSeparatorProps,
  MenubarShortcutProps,
  MenubarGroupProps,
  MenubarSubProps,
  MenubarSubTriggerProps,
  MenubarSubContentProps,
  MenubarRadioGroupProps
} from './components/navigation/menubar'
export type { 
  CommandProps, 
  CommandInputProps, 
  CommandListProps, 
  CommandEmptyProps, 
  CommandGroupProps, 
  CommandItemProps, 
  CommandSeparatorProps, 
  CommandShortcutProps, 
  CommandDialogProps 
} from './components/navigation/command'
export type { ComboboxProps, ComboboxOption } from './components/navigation/combobox'
export type { PaginationProps, PaginationItemProps } from './components/navigation/pagination'
export type { StepperProps, StepItem } from './components/navigation/stepper'

export type { AvatarProps, AvatarImageProps, AvatarFallbackProps, AvatarGroupProps } from './components/media/avatar'
export type { BadgeProps } from './components/media/badge'
export type { KbdProps } from './components/media/kbd'
export type { AspectRatioProps } from './components/media/aspect-ratio'
export type { 
  CarouselProps, 
  CarouselContentProps, 
  CarouselItemProps, 
  CarouselPreviousProps, 
  CarouselNextProps, 
  CarouselIndicatorProps 
} from './components/media/carousel'
export type { 
  TypographyProps,
  TypographyH1Props, 
  TypographyH2Props, 
  TypographyH3Props, 
  TypographyH4Props, 
  TypographyH5Props, 
  TypographyH6Props, 
  TypographyPProps, 
  TypographyBlockquoteProps, 
  TypographyCodeProps, 
  TypographyLeadProps, 
  TypographyLargeProps, 
  TypographySmallProps, 
  TypographyMutedProps 
} from './components/media/typography'

// Primitives & Headless Layer
export * from './primitives'

// Reusable Hooks
export * from './hooks'

// Theming & Tokens
export * from './theme'

// Utilities
export {
  cn,
  createVariants,
  isReactNative,
  getPlatformClassName,
  composeRefs,
  type PlatformProps,
} from './lib/utils'
export * from './lib/colors'

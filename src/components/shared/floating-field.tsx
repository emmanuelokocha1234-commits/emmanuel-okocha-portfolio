import { forwardRef, type ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const inputLabelClasses =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all " +
  "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-cyan-400 " +
  "peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs";

const textareaLabelClasses =
  "pointer-events-none absolute left-4 top-6 -translate-y-1/2 text-sm text-muted-foreground transition-all " +
  "peer-focus:top-4 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-cyan-400 " +
  "peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs";

export const FloatingInput = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof Input> & { label: string }
>(({ label, id, className, ...props }, ref) => (
  <div className="relative">
    <Input
      ref={ref}
      id={id}
      placeholder=" "
      className={`peer glass-panel h-14 w-full rounded-2xl border-0 px-4 pt-5 pb-1.5 text-sm placeholder:text-transparent focus-visible:ring-2 focus-visible:ring-cyan-400/50 ${className ?? ""}`}
      {...props}
    />
    <label htmlFor={id} className={inputLabelClasses}>
      {label}
    </label>
  </div>
));
FloatingInput.displayName = "FloatingInput";

export const FloatingTextarea = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<typeof Textarea> & { label: string }
>(({ label, id, className, ...props }, ref) => (
  <div className="relative">
    <Textarea
      ref={ref}
      id={id}
      placeholder=" "
      className={`peer glass-panel h-auto min-h-28 w-full resize-none rounded-2xl border-0 px-4 pt-6 pb-2 text-sm placeholder:text-transparent focus-visible:ring-2 focus-visible:ring-cyan-400/50 ${className ?? ""}`}
      {...props}
    />
    <label htmlFor={id} className={textareaLabelClasses}>
      {label}
    </label>
  </div>
));
FloatingTextarea.displayName = "FloatingTextarea";

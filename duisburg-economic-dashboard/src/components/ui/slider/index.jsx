import * as React from "react"
import { cn } from "../../../lib/utils"

const Slider = React.forwardRef(({ 
  className, 
  min = 0, 
  max = 100, 
  step = 1, 
  value = [0], 
  onValueChange,
  ...props 
}, ref) => {
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value)
    onValueChange && onValueChange([newValue])
  }

  return (
    <div className={cn("relative w-full touch-none select-none", className)}>
      <input
        type="range"
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={value[0]}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        onChange={handleChange}
        {...props}
      />
    </div>
  )
})
Slider.displayName = "Slider"

export { Slider } 
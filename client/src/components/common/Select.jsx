import {useId, useRef, useState} from "react";
import {Check, ChevronDown} from "lucide-react";

export function Select({value, onChange, options, placeholder = "Select an option", name, required = false}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const trigger = useRef(null);

  function chooseOption(option) {
    onChange({target: {name, value: typeof option === "string" ? option : option.value}});
    setOpen(false);
    trigger.current.focus();
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(function moveIndex(current) {
        if (current < 0) return value ? options.indexOf(value) : 0;
        const direction = event.key === "ArrowDown" ? 1 : -1;
        return (current + direction + options.length) % options.length;
      });
    }
    if (event.key === "Enter" || event.key === " ") {
      if (open && activeIndex >= 0) {
        event.preventDefault();
        chooseOption(options[activeIndex]);
      } else {
        event.preventDefault();
        setOpen(true);
      }
    }
    if (event.key === "Escape") setOpen(false);
    if (event.key === "Tab") setOpen(false);
  }

  return (
    <div className="relative min-w-0">
      <button
        ref={trigger}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id + "-options"}
        aria-required={required}
        aria-invalid={required && !value ? "true" : undefined}
        onClick={function toggleOptions() { setOpen(function wasOpen(previous) { return !previous; }); }}
        onKeyDown={handleKeyDown}
        className="twtdbp-input flex min-w-0 cursor-pointer items-center justify-between gap-2 overflow-hidden text-left"
      >
        <span className={"min-w-0 flex-1 truncate " + (value ? "text-zinc-950" : "text-zinc-500")}>{value || placeholder}</span>
        <ChevronDown aria-hidden="true" className={"size-4 text-zinc-500 transition-transform " + (open ? "rotate-180" : "")} />
      </button>
      {open && <ul id={id + "-options"} role="listbox" aria-labelledby={id} className="absolute z-20 mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-zinc-200 bg-white p-1 shadow-lg">
        {options.map(function renderOption(option, index) {
          const selected = value === option;
          return <li key={option} role="option" aria-selected={selected}>
            <button type="button" onClick={function selectOption() { chooseOption(option); }} onMouseEnter={function activateOption() { setActiveIndex(index); }} className={"flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm " + (activeIndex === index ? "bg-zinc-100" : "hover:bg-zinc-50")}>
              {typeof option === "string" ? option : option.label}{selected && <Check aria-hidden="true" className="size-4 text-twtdbp-crimson" />}
            </button>
          </li>;
        })}
      </ul>}
      {required && <input tabIndex={-1} aria-hidden="true" className="pointer-events-none absolute size-px opacity-0" name={name} value={value} required readOnly />}
    </div>
  );
}

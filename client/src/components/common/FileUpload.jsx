import {useId} from "react";
import {FileText, ImagePlus, Upload} from "lucide-react";

export function FileUpload({file, onSelect, accept, type = "document", label, description, className = "", required = false}) {
  const inputId = useId();
  const isPhoto = type === "photo";
  const Icon = isPhoto ? ImagePlus : FileText;

  function handleChange(event) {
    const selected = event.target.files[0];
    if (selected) onSelect(selected);
    event.target.value = "";
  }

  return (
    <div className={"min-w-0 rounded-xl border border-dashed border-zinc-300 bg-zinc-50/70 p-4 text-center " + className}>
      <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-white text-zinc-600 ring-1 ring-zinc-200">
        <Icon aria-hidden="true" className="size-5" />
      </div>
      <p className="mt-3 text-sm font-semibold text-zinc-900">{file ? file.name : label}</p>
      <p className="mt-1 text-sm text-zinc-600 wrap-anywhere">{file ? "Selected file" : description}</p>
      <label htmlFor={inputId} className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-twtdbp-crimson">
        <Upload aria-hidden="true" className="size-4" />
        {file ? "Change " + type : "Choose " + type}
        <input id={inputId} className="sr-only" type="file" accept={accept} onChange={handleChange} required={required} />
      </label>
    </div>
  );
}

export function FilePicker({file, label, kind, accept, onSelect}) {
  function handleChange(event) {
    const selected = event.target.files[0];
    if (selected) onSelect(selected);
    event.target.value = "";
  }
  return (
    <div className="min-w-0 space-y-2">
      <label className="relative inline-flex cursor-pointer rounded-lg border border-zinc-300 px-4 py-3 text-sm font-semibold hover:bg-zinc-50 has-focus-visible:outline-2 has-focus-visible:outline-twtdbp-crimson">
        {file ? "Change" : "Choose"} {kind}
        <input aria-label={label} className="sr-only" type="file" accept={accept} onChange={handleChange} />
      </label>
      {file && <p className="text-sm text-zinc-600 wrap-anywhere">{file.name}</p>}
    </div>
  );
}

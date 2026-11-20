import {useId, useRef, useState} from "react";
import {Check, ChevronDown} from "lucide-react";
import {COUNTRIES} from "../../data/countries";

export function CountryCodeSelect({value = "LK", onChange}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const trigger = useRef(null);
  const selectedCountry =
    COUNTRIES.find(function findCountry(country) {
      return country.countryCode === value;
    }) || COUNTRIES[0];

  function chooseCountry(country) {
    onChange({target: {name: "countryCode", value: country.countryCode}});
    setOpen(false);
    trigger.current.focus();
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(function moveIndex(current) {
        const direction = event.key === "ArrowDown" ? 1 : -1;
        if (current < 0)
          return COUNTRIES.findIndex(function findSelected(country) {
            return country.countryCode === value;
          });
        return (current + direction + COUNTRIES.length) % COUNTRIES.length;
      });
    }
    if (event.key === "Enter" && open && activeIndex >= 0) {
      event.preventDefault();
      chooseCountry(COUNTRIES[activeIndex]);
    }
    if (event.key === "Escape" || event.key === "Tab") setOpen(false);
  }

  function getFlagUrl(countryCode) {
    return `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
  }

  return (
    <div className="relative w-fit min-w-[6.5rem] max-w-[11rem] shrink-0">
      <button
        ref={trigger}
        id={id}
        type="button"
        role="combobox"
        aria-label="Country calling code"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id + "-listbox"}
        onClick={function toggleList() {
          setOpen(function toggle(previous) {
            return !previous;
          });
        }}
        onKeyDown={handleKeyDown}
        className="twtdbp-input flex w-fit min-w-full cursor-pointer items-center justify-between gap-2 whitespace-nowrap px-2.5 text-left"
      >
        <span className="flex min-w-0 items-center gap-2">
          <img
            src={getFlagUrl(selectedCountry.countryCode)}
            alt=""
            className="h-4 w-6 shrink-0 rounded-sm object-cover"
          />
          <span className="truncate">{selectedCountry.dialingCode}</span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={
            "size-4 shrink-0 text-zinc-500 transition-transform " +
            (open ? "rotate-180" : "")
          }
        />
      </button>
      {open && (
        <ul
          id={id + "-listbox"}
          role="listbox"
          aria-label="Country calling codes"
          className="absolute z-30 mt-2 max-h-60 w-72 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-lg border border-zinc-200 bg-white p-1 shadow-lg"
        >
          {COUNTRIES.map(function renderCountry(country, index) {
            const selected =
              country.countryCode === selectedCountry.countryCode;
            return (
              <li
                key={country.countryCode}
                role="option"
                aria-selected={selected}
              >
                <button
                  type="button"
                  onClick={function selectCountry() {
                    chooseCountry(country);
                  }}
                  onMouseEnter={function activateCountry() {
                    setActiveIndex(index);
                  }}
                  className={
                    "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm " +
                    (activeIndex === index ? "bg-zinc-100" : "hover:bg-zinc-50")
                  }
                >
                  <img
                    src={getFlagUrl(country.countryCode)}
                    alt=""
                    className="h-4 w-6 shrink-0 rounded-sm object-cover"
                  />
                  <span className="min-w-0 flex-1 truncate text-zinc-900">
                    {country.name}
                  </span>
                  <span className="text-zinc-600">{country.dialingCode}</span>
                  {selected && (
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-twtdbp-crimson"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <input
        type="hidden"
        name="countryCode"
        value={selectedCountry.countryCode}
      />
    </div>
  );
}

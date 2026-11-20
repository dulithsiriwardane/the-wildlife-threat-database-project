const buttonSizes = {
  32: "h-[32px] text-sm",
  36: "h-[36px] text-sm",
  40: "h-[40px] text-base",
  48: "h-[48px] text-base",
  52: "h-[52px] text-lg",
  56: "h-[56px] text-lg",
};

const spacingBySize = {
  small: {
    withIcon: "gap-[4px] ps-[8px] pe-[12px]",
    textOnly: "px-[12px]",
    icon: "size-[20px]",
  },
  medium: {
    withIcon: "gap-[8px] ps-[12px] pe-[16px]",
    textOnly: "px-[16px]",
    icon: "size-[24px]",
  },
  large: {
    withIcon: "gap-[8px] ps-[20px] pe-[24px]",
    textOnly: "px-[24px]",
    icon: "size-[24px]",
  },
};

function getSpacing(size) {
  if (size <= 36) return spacingBySize.small;
  if (size <= 48) return spacingBySize.medium;

  return spacingBySize.large;
}

export function Button({
  children,
  size = 40,
  icon,
  type = "button",
  className = "",
  ...buttonProps
}) {
  const height = Object.hasOwn(buttonSizes, size) ? size : 40;
  const spacing = getSpacing(height);

  const classes = [
    "font-display inline-flex items-center justify-center whitespace-nowrap rounded-lg",
    "bg-twtdbp-crimson font-semibold text-twtdbp-ebony",
    "enabled:cursor-pointer enabled:hover:bg-twtdbp-crimsondark",
    "enabled:active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-twtdbp-crimson",
    buttonSizes[height],
    icon ? spacing.withIcon : spacing.textOnly,
    className,
  ].join(" ");

  return (
    <button {...buttonProps} type={type} className={classes}>
      {icon && (
        <span
          aria-hidden="true"
          className={`inline-flex shrink-0 [&>svg]:size-full ${spacing.icon}`}
        >
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}

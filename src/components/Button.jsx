export default function Button({
  children,
  onClick,
  params,
  underline = false,
  widening = false,
  disabled = false,
  styles,
  extraStyles,
}) {
  function handleClick() {
    if (!onClick || disabled) return;
    if (params) onClick(...params);
    else onClick();
  }

  const style =
    styles ||
    `rounded-lg border-2 border-accent bg-gradient-to-tr from-background to-secondary disabled:saturate-0 disabled:cursor-not-allowed px-4 py-2 text-text transition-all ${widening && !disabled && "hover:tracking-wider"} ${underline && "hover:underline"} ${!disabled && "hover:font-medium hover:shadow-md hover:shadow-accent hover:brightness-110 active:scale-95 active:brightness-100"} ${extraStyles}`;

  return (
    <button className={style} onClick={handleClick} disabled={disabled}>
      <span>{children}</span>
    </button>
  );
}

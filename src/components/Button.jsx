export default function Button({
  children,
  onClick,
  params,
  underline = false,
  widening = false,
  disabled = false,
  styles,
  extraStyles = "",
  submit = false,
}) {
  function handleClick() {
    if (!onClick || disabled) return;
    if (params) onClick(...params);
    else onClick();
  }

  let style =
    styles ||
    `rounded-lg border-2 border-accent bg-gradient-to-tr from-background to-secondary disabled:saturate-0 disabled:cursor-not-allowed px-4 py-2 text-text transition-all ${extraStyles}`;

  if (!disabled) {
    style += " hover:font-medium hover:shadow-md hover:shadow-accent hover:brightness-110 active:scale-95 active:brightness-100";
    if (widening) style += "hover:tracking-wider";
  }
  if (underline) style += "hover:underline";

  return (
    <button className={style} onClick={handleClick} disabled={disabled} type={submit ? "submit" : "button"}>
      <span>{children}</span>
    </button>
  );
}

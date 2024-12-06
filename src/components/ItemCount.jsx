import Button from "./Button";
import { IconMinus, IconPlus } from "@tabler/icons-react";

export default function ItemCount({ text, value = 1, min = 1, max = 1, step = 1, slider = false, onChange }) {
  function handleOperation(operation) {
    onChange({ target: { value: (parseInt(value) || 0) + operation } });
  }

  return (
    <>
      <div className="min-w-fit">
        <p className="mb-1 text-sm font-medium text-text">{text}</p>
        <Button onClick={() => handleOperation(-1)} disabled={value === min} extraStyles="mr-2">
          <IconMinus size={15} />
        </Button>
        <Button onClick={() => handleOperation(1)} disabled={value === max}>
          <IconPlus size={15} />
        </Button>
      </div>
      <div>
        {" "}
        {/*className="w-full" */}
        {slider && (
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            className="mb-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
            value={value}
            onChange={onChange}
          />
        )}
        <input type="number" min={min} max={max} step={step} value={value} className="rounded-md bg-secondary px-2 py-1" onChange={onChange} />
      </div>
    </>
  );
}

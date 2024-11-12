export default function ItemCount({ text, value = 1, min = 1, max = 1, step = 1, onChange }) {
  return (
    <>
      <label className="block w-full text-sm font-medium text-text">
        {text}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
          value={value}
          onChange={onChange}
        />
      </label>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        className="rounded-md bg-secondary px-2 py-1"
        onChange={onChange}
      />
    </>
  );
}

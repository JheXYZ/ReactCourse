import { IconShoppingCart } from "@tabler/icons-react";

export default function CartWidget({ quantity = 0 }) {
  return (
    <div className="relative flex h-11 w-11 justify-end">
      <IconShoppingCart size={40} stroke={1.5} />
      {quantity > 0 && (
        <small className="absolute bottom-0 left-0 grid size-7 place-content-center rounded-full bg-secondary bg-opacity-90 p-2 text-base font-medium text-text [userSelect:none]">
          {quantity}
        </small>
      )}
    </div>
  );
}

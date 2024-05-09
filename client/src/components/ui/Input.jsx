import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  return (
    <input
      {...props}
      className="w-fit bg-gray-200 rounded-md px-4 py-2"
      ref={ref}
    />
  );
});

import { forwardRef } from "react";

export const assets = {};

export const Img = forwardRef<HTMLImageElement, any>((props: any, ref) => {
  return (
    <div {...props} ref={ref}>
      {props.src}
    </div>
  );
});

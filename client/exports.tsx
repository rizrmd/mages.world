import { forwardRef } from "react";
export { Connection } from "./components/Connection";

export const assets = {};

export const Img = forwardRef<HTMLImageElement, any>((props: any, ref) => {
  return (
    <div {...props} ref={ref}>
      {props.src}
    </div>
  );
});

import { Fragment } from "react";

export const SpellSeq = () => {
  const seqs = [
    {
      name: "fire",
      el: (
        <div
          className={css`
            border: 3px solid red;
            border-radius: 90px;
            width: 30px;
            height: 60px;
          `}
        ></div>
      ),
    },
    {
      name: "water",
      el: (
        <div
          className={css`
            border: 3px solid blue;
            border-radius: 90px;
            width: 30px;
            height: 60px;
          `}
        ></div>
      ),
    },
    {
      name: "wind",
      el: (
        <div
          className={css`
            border: 3px solid green;
            border-radius: 90px;
            width: 30px;
            height: 60px;
          `}
        ></div>
      ),
    },
    {
      name: "earth",
      el: (
        <div
          className={css`
            border: 3px solid brown;
            border-radius: 90px;
            width: 30px;
            height: 60px;
          `}
        ></div>
      ),
    },
  ];

  return (
    <>
      {seqs.map((e) => (
        <Fragment key={e.name}>{e.el}</Fragment>
      ))}
    </>
  );
};

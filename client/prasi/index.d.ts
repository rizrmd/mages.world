import React, { useState } from "react";

export const Prasi: React.FC<{
  notfound?: React.ReactElement;
  loading?: React.ReactElement;
  props?: any;
  live?: { domain?: string; site_id?: string; pathname: string };
}>;

declare global {
  const isEditor: boolean;
  const navigate: (url: string) => void;
  const cx = (...classNames: any[]) => string;
  const css = (
    tag: CSSAttribute | TemplateStringsArray | string,
    ...props: Array<string | number | boolean | undefined | null>
  ) => string;
}

export const GlobalContext: import("react").Context<{
  global: Record<string, any>;
  render: () => void;
}>;

export const useGlobal: <T extends object>(
  defaultValue: T,
  effectOrID?:
    | (() => Promise<void | (() => void)> | void | (() => void))
    | string,
  id?: string
) => T & {
  render: () => void;
};

export const useLocal: <T extends object>(
  data: T,
  effect?:
    | ((arg: {
        init: boolean;
      }) => Promise<void | (() => void)> | void | (() => void))
    | undefined,
  deps?: any[]
) => {
  [K in keyof T]: T[K] extends Promise<any> ? Awaited<T[K]> | null : T[K];
} & {
  render: () => void;
};

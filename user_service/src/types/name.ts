import { z } from "zod";
import { NonEmptyString } from "./non-empty-string";
import { Brand } from "../utility/brand";

export type Name = Brand<NonEmptyString, "Name">;

export const isName = (value: unknown): value is Name => {
  return (
    typeof value === "string" && /^[a-zA-Z][a-zA-Z0-9_]{3,63}$/.test(value)
  );
};

export const zodName = z.string().refine(isName);

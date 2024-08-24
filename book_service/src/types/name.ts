import { z } from "zod";
import { Brand } from "../../utility/brand";
import { NonEmptyString } from "./non-empty-string";

export type Name = Brand<NonEmptyString, "Name">;

export const isName = (value: unknown): value is Name => {
  return (
    typeof value === "string" && /^[a-zA-Z][a-zA-Z0-9_]{3,63}$/.test(value)
  );
};

export const zodName = z.string().refine(isName);

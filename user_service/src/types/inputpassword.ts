import { z } from "zod";
import { Brand } from "../../utility/brand";
import { NonEmptyString } from "./non-empty-string";

export type InputPassword = Brand<NonEmptyString, "InputPassword">;

export const isInputPassword = (value: unknown): value is InputPassword => {
  return typeof value === "string";
};

export const zodInputPassword = z.string().refine(isInputPassword);

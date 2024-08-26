import { z } from "zod";
import { NonEmptyString } from "./non-empty-string";
import { Brand } from "../utility/brand";

export type InputPassword = Brand<NonEmptyString, "InputPassword">;

export const isInputPassword = (value: unknown): value is InputPassword => {
  return typeof value === "string";
};

export const zodInputPassword = z.string().refine(isInputPassword);

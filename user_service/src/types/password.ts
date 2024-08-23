import { z } from "zod";
import { Brand } from "../../utility/brand";
import { Hashed, isHashed } from "./hash";

export type Password = Brand<Hashed, "Password">;

export const isPassword = (value: unknown): value is Password => {
  return isHashed(value);
};

export const zodPassword = z.string().refine(isPassword);

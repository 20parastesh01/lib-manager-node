import { z } from "zod";
import { Hashed, isHashed } from "./hash";
import { Brand } from "../utility/brand";

export type Password = Brand<Hashed, "Password">;

export const isPassword = (value: unknown): value is Password => {
  return isHashed(value);
};

export const zodPassword = z.string().refine(isPassword);

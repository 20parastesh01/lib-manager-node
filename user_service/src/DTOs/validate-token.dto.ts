import { z } from "zod";
import { zodToken } from "../types/token";

export const validateTokenRequest = z.object({
  token: zodToken,
});

export type ValidateTokenRequest = z.infer<typeof validateTokenRequest>;

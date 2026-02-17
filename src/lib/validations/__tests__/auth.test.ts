import { describe, expect, it } from "vitest";
import { signInSchema } from "@/lib/validations";

describe("signInSchema", () => {
  it("aceita payload valido", () => {
    const parsed = signInSchema.safeParse({
      email: "owner@studio.com",
      password: "12345678",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejeita e-mail invalido", () => {
    const parsed = signInSchema.safeParse({
      email: "owner",
      password: "12345678",
    });
    expect(parsed.success).toBe(false);
  });
});

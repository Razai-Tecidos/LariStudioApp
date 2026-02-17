import { describe, expect, it } from "vitest";
import { clientCreateSchema, clientUpdateSchema } from "@/lib/validations";

describe("client schemas", () => {
  it("aceita criacao valida", () => {
    const parsed = clientCreateSchema.safeParse({
      name: "Vanessa Andrade",
      phone: "(11) 99999-9999",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejeita update vazio", () => {
    const parsed = clientUpdateSchema.safeParse({});
    expect(parsed.success).toBe(false);
  });
});

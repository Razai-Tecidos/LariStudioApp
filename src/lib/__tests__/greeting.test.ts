import { describe, expect, it } from "vitest";
import { getGreetingByHour } from "@/lib/greeting";

describe("getGreetingByHour", () => {
  it("retorna Bom dia antes de 12h", () => {
    expect(getGreetingByHour(8)).toBe("Bom dia");
    expect(getGreetingByHour(11)).toBe("Bom dia");
  });

  it("retorna Boa tarde entre 12h e 17h", () => {
    expect(getGreetingByHour(12)).toBe("Boa tarde");
    expect(getGreetingByHour(17)).toBe("Boa tarde");
  });

  it("retorna Boa noite a partir de 18h", () => {
    expect(getGreetingByHour(18)).toBe("Boa noite");
    expect(getGreetingByHour(23)).toBe("Boa noite");
  });
});

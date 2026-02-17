import { describe, expect, it } from "vitest";
import { resolveAuthDecision } from "@/lib/supabase/middleware";

describe("resolveAuthDecision", () => {
  const ownerEmail = "owner@studio.com";

  it("permite rota publica sem autenticacao", () => {
    const decision = resolveAuthDecision({
      pathname: "/login",
      isAuthenticated: false,
      ownerEmail,
    });
    expect(decision.action).toBe("allow");
  });

  it("redireciona para login quando rota privada sem sessao", () => {
    const decision = resolveAuthDecision({
      pathname: "/clientes",
      isAuthenticated: false,
      ownerEmail,
    });
    expect(decision.action).toBe("redirect-login");
  });

  it("redireciona para login quando usuario nao e a dona", () => {
    const decision = resolveAuthDecision({
      pathname: "/clientes",
      isAuthenticated: true,
      userEmail: "outro@dominio.com",
      ownerEmail,
    });
    expect(decision.action).toBe("redirect-login");
  });
});

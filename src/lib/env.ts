import { z } from "zod";

const baseClientSchema = z
  .object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  })
  .refine(
    (value) =>
      Boolean(value.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || value.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    {
      message:
        "Configure NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      path: ["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"],
    },
  );

const serverSchema = baseClientSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  AUTHORIZED_OWNER_EMAIL: z.string().email(),
});

type RawClientEnv = z.infer<typeof baseClientSchema>;
export type ClientEnv = RawClientEnv & {
  SUPABASE_CLIENT_KEY: string;
};

type RawServerEnv = z.infer<typeof serverSchema>;
export type ServerEnv = RawServerEnv & {
  SUPABASE_CLIENT_KEY: string;
};

let cachedClientEnv: ClientEnv | null = null;
let cachedServerEnv: ServerEnv | null = null;

function getClientKey(env: {
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
}) {
  return env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
}

export function getClientEnv(): ClientEnv {
  if (cachedClientEnv) {
    return cachedClientEnv;
  }

  const parsed = baseClientSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  cachedClientEnv = {
    ...parsed,
    SUPABASE_CLIENT_KEY: getClientKey(parsed),
  };

  return cachedClientEnv;
}

export function getServerEnv(): ServerEnv {
  if (cachedServerEnv) {
    return cachedServerEnv;
  }

  const parsed = serverSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    AUTHORIZED_OWNER_EMAIL: process.env.AUTHORIZED_OWNER_EMAIL,
  });
  cachedServerEnv = {
    ...parsed,
    SUPABASE_CLIENT_KEY: getClientKey(parsed),
  };

  return cachedServerEnv;
}

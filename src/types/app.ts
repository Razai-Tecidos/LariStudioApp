import type { User } from "@supabase/supabase-js";
import type { Database } from "./database";

export type Client = Database["public"]["Tables"]["clients"]["Row"];
export type ClientCreateInput = Database["public"]["Tables"]["clients"]["Insert"];
export type ClientUpdateInput = Database["public"]["Tables"]["clients"]["Update"];

export type OwnerSession = {
  user: User;
  isOwner: boolean;
};

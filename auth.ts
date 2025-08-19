import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "@auth/core/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github, Google],
});

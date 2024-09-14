import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback , when using JWT sessions */
  interface JWT {
    role?: Role;
  }
}

declare module "next-auth" {
  
  interface Session {
    user?: {
      role?: Role;
    } & DefaultSession["user"];
  }

  /** Passed as a parameter to the `jwt` callback */
  interface User {
    role?: Role;
  }
}
declare module 'html2pdf.js' {
  const html2pdf: any;
  export default html2pdf;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const value: string;
  export default value;
}

// https://reacthustle.com/blog/nextjs-setup-role-based-authentication
// https://authjs.dev/guides/basics/role-based-access-control 
import { Button } from "@react-email/components";
import type { ReactNode } from "react";

type EmailButtonProps = {
  children: ReactNode;
  href: string;
};

export default function EmailButton({ children, href }: EmailButtonProps) {
  return (
    <Button
      href={href}
      className="rounded-[8px] bg-brand-blue px-[20px] py-[12px] text-center text-[14px] font-bold text-white"
    >
      {children}
    </Button>
  );
}

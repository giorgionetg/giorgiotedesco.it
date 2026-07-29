import { Section } from "@react-email/components";
import type { ReactNode } from "react";

type EmailCardProps = {
  children: ReactNode;
};

export default function EmailCard({ children }: EmailCardProps) {
  return (
    <Section className="rounded-[12px] border border-slate-200 bg-slate-50 px-[20px] py-[16px]">
      {children}
    </Section>
  );
}

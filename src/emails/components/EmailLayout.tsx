import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";

import { emailTokens } from "./tokens";

type EmailLayoutProps = {
  children: ReactNode;
  preview: string;
};

export default function EmailLayout({ children, preview }: EmailLayoutProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: {
                  blue: emailTokens.color.brandBlue,
                  orange: emailTokens.color.brandOrange,
                  ice: emailTokens.color.brandIce,
                },
                slate: {
                  50: emailTokens.color.slate50,
                  100: emailTokens.color.slate100,
                  200: emailTokens.color.slate200,
                  500: emailTokens.color.slate500,
                  600: emailTokens.color.slate600,
                  700: emailTokens.color.slate700,
                  800: emailTokens.color.slate800,
                  900: emailTokens.color.slate900,
                },
              },
              fontFamily: {
                sans: ["Inter", "Arial", "sans-serif"],
                mono: ["Geist Mono", "Consolas", "monospace"],
              },
            },
          },
        }}
      >
        <Body className="m-0 bg-brand-ice px-[16px] py-[32px] font-sans text-slate-900">
          <Container className="mx-auto w-full max-w-[600px] rounded-[16px] border border-slate-200 bg-white shadow-sm">
            <Section className="border-b border-slate-100 px-[32px] py-[24px]">
              <Text className="m-0 text-[22px] font-bold tracking-normal text-slate-900">
                GiorgioTedesco
                <span className="text-brand-blue">.it</span>
              </Text>
              <Text className="m-0 mt-[4px] text-[13px] font-medium text-slate-500">
                Full-Stack Architect · Tech Lead
              </Text>
            </Section>

            <Section className="px-[32px] py-[32px]">{children}</Section>

            <Section className="border-t border-slate-100 px-[32px] py-[24px]">
              <Text className="m-0 text-[12px] leading-[20px] text-slate-500">
                You are receiving this email from giorgiotedesco.it.
              </Text>
              <Text className="m-0 mt-[8px] text-[12px] leading-[20px] text-slate-500">
                Giorgio Tedesco · Senior Solution Architect
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

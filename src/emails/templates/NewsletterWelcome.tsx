import { Heading, Hr, Link, Text } from "@react-email/components";

import EmailButton from "../components/EmailButton";
import EmailCard from "../components/EmailCard";
import EmailLayout from "../components/EmailLayout";

type NewsletterWelcomeProps = {
  firstName?: string;
  siteUrl?: string;
};

export default function NewsletterWelcome({
  firstName = "there",
  siteUrl = "https://giorgiotedesco.it",
}: NewsletterWelcomeProps) {
  return (
    <EmailLayout preview="Welcome to Giorgio Tedesco's engineering notes.">
      <Text className="m-0 text-[13px] font-bold uppercase tracking-[0.1em] text-brand-orange">
        Engineering notes
      </Text>

      <Heading className="m-0 mt-[12px] text-[32px] font-bold leading-[40px] tracking-normal text-slate-900">
        Welcome, {firstName}.
      </Heading>

      <Text className="m-0 mt-[16px] text-[16px] leading-[26px] text-slate-600">
        Thanks for joining. I write about frontend architecture, product-minded
        engineering, resilient systems, and the practical tradeoffs behind
        long-lived software.
      </Text>

      <EmailCard>
        <Text className="m-0 text-[14px] font-bold text-slate-900">
          What to expect
        </Text>
        <Text className="m-0 mt-[8px] text-[14px] leading-[23px] text-slate-600">
          Short essays, field notes, and occasional case studies from real
          delivery work. No noisy drip campaign, just useful technical signal.
        </Text>
      </EmailCard>

      <Hr className="my-[28px] border-slate-200" />

      <EmailButton href={`${siteUrl}/blog`}>Read the latest posts</EmailButton>

      <Text className="m-0 mt-[24px] text-[13px] leading-[22px] text-slate-500">
        You can also visit{" "}
        <Link href={siteUrl} className="font-medium text-brand-blue">
          giorgiotedesco.it
        </Link>{" "}
        for case studies, notes, and portfolio updates.
      </Text>
    </EmailLayout>
  );
}

NewsletterWelcome.PreviewProps = {
  firstName: "Giorgio",
  siteUrl: "https://giorgiotedesco.it",
} satisfies NewsletterWelcomeProps;

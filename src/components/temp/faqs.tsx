"use client";
import { useState } from "react";
import Accordion from "./accordion";
import { Heading } from "./heading";

const questions = [
  {
    id: 1,
    title: "What is Alvo?",
    description:
      "Alvo is an advanced platform that offers seamless solutions for data integration and automation, tailored for modern businesses.",
  },
  {
    id: 2,
    title: "How does Alvo work?",
    description:
      "Alvo streamlines workflows by connecting various applications and automating complex processes, saving time and resources.",
  },
  {
    id: 3,
    title: "Who is Alvo for?",
    description:
      "Alvo is designed for businesses of all sizes, looking to enhance efficiency and optimize their operational workflows.",
  },
  {
    id: 4,
    title: "What features does Alvo offer?",
    description:
      "Alvo includes real-time data synchronization, customizable automation workflows, advanced analytics, and robust security features.",
  },
  {
    id: 5,
    title: "Does Alvo offer integrations?",
    description:
      "Yes, Alvo integrates with a wide range of tools and platforms such as CRMs, ERPs, and cloud storage services.",
  },
  {
    id: 6,
    title: "Is Alvo suitable for teams?",
    description:
      "Absolutely! Alvo provides collaboration tools, shared dashboards, and role-based access for effective team management.",
  },
  {
    id: 7,
    title: "Does Alvo provide customer support?",
    description:
      "Yes, Alvo offers 24/7 customer support to ensure you have assistance whenever needed.",
  },
  {
    id: 8,
    title: "Is there a free trial available for Alvo?",
    description:
      "Alvo offers a free trial, allowing you to explore the platform and its features before making a commitment.",
  },
  {
    id: 9,
    title: "How can I get started with Alvo?",
    description:
      "Simply sign up on the Alvo website, set up your integrations, and start optimizing your workflows today!",
  },
  {
    id: 10,
    title: "How secure is Alvo?",
    description:
      "Alvo employs enterprise-grade security measures, including data encryption and compliance with industry standards, to protect your information.",
  },
];

export const FAQs = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-3xl mx-auto py-20 px-8">
      <Heading className="pt-4">Frequently asked questions</Heading>
      <div className="grid  gap-10 pt-20">
        {questions.map((item, i) => (
          <Accordion
            key={i}
            i={i}
            expanded={expanded}
            setExpanded={setExpanded}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

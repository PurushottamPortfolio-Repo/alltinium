"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Target, Building2, CalendarClock } from "lucide-react";
import { assets } from "@/assets";
// dynamic import removed — using global QuoteProvider and QuoteButton
import { PageHero } from "@/components/ui/page-hero";
import QuoteButton from "@/components/quote/QuoteButton";
import { Check } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

import { founders } from "@/data/about";

const values = [
  {
    icon: Target,
    title: "Mission",
    description:
      "Deliver aerospace-grade metals with complete traceability, reliable logistics, and engineering-first customer support.",
  },
  {
    icon: Rocket,
    title: "Vision",
    description:
      "Become India's most trusted aerospace material partner for OEMs, defence suppliers, and advanced manufacturing.",
  },
  {
    icon: ShieldCheck,
    title: "Quality",
    description:
      "Every shipment is backed by documentation, certifications, and uncompromising quality standards.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "Company Incorporated",
    description: "Founded in Bengaluru to modernize aerospace material sourcing.",
  },
  {
    year: "2025 Q1",
    title: "Udyam MSME & DGR",
    description: "Completed MSME registration and initiated government procurement readiness.",
  },
  {
    year: "2025 Q3",
    title: "Testing Laboratory",
    description: "NABL accreditation process with laboratory becoming operational.",
  },
  {
    year: "2025 Q4",
    title: "First Aerospace Delivery",
    description: "Successfully delivered certified aerospace materials to our first customer.",
  },
  {
    year: "2026 Q1",
    title: "Manufacturing Network",
    description: "First strategic manufacturing partners onboarded.",
  },
  {
    year: "2026 Q4",
    title: "AS9120 Audit",
    description: "Stage-1 AS9120 certification targeted.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function AboutPage() {
  return (
    <>
      <PageHero
        image={assets.heroBg}
        title="Engineering-led. Aerospace-grade."
        description="Materials built to the standard the mission demands. India's Aerospace, Defence and Advanced Manufacturing sectors are entering their most ambitious phase."
        buttonText="Request a Quote"
        buttonHref="/contact"
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "About",
          },
        ]}
      />
      <div className="flex flex-col item-center justify-center px-8">
        {/* Company Story */}
        <section className="bg-background py-24">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
                <Image
                  src={assets.heroBg}
                  alt="About Alltinium"
                  className="h-[700px] w-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Who We Are
              </span>

              <h2 className="text-4xl font-heading font-bold lg:text-5xl mt-4">
                Building trust into every aerospace shipment.
              </h2>

              <p className="text-lg leading-8 text-muted-foreground">
                Alltinium Aerometrix is a trusted supplier of aerospace-grade metals and
                high-performance alloys for India&apos;s rapidly growing Aerospace, Defence, Space,
                Energy, Automotive, and Advanced Manufacturing industries. We source certified
                titanium, nickel superalloys, aluminium, stainless steel, and specialty alloys from
                globally qualified mills, ensuring complete material traceability, certified
                quality, and dependable supply for mission-critical applications.
              </p>

              <p className="leading-8 text-muted-foreground">
                Built on aerospace standards, we deliver more than materials—we deliver confidence.
                With ready buffer stock, precision cut-to-size solutions, fast nationwide delivery,
                and rigorous quality assurance, we help manufacturers reduce lead times without
                compromising performance.
              </p>
              <p className="leading-8 text-muted-foreground">
                Engineering trust through certified materials, uncompromising quality, and on-time
                delivery.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <h3 className="text-3xl font-bold text-primary">100%</h3>
                  <p className="text-muted-foreground">Traceable Documentation</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-primary">OEM</h3>
                  <p className="text-muted-foreground">Engineering Focused</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted/30 py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <h2 className="mb-4 text-4xl font-heading font-bold">What Drives Us</h2>

            <p className="text-muted-foreground">
              Everything we do is centered around engineering excellence, uncompromising quality,
              and long-term customer relationships.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{
                    y: -8,
                  }}
                  className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>

                  <h3 className="mb-3 text-2xl font-heading font-semibold">{item.title}</h3>

                  <p className="leading-7 text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Founders */}
        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          {founders.map((founder) => (
            <motion.div
              key={founder.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="group overflow-hidden rounded-md border bg-card shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  className="h-[600px] w-full object-cover"
                />

                {/* Social Icons */}
                <div className="absolute right-5 top-5 flex gap-3">
                  <Link
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/90 p-3 backdrop-blur transition hover:bg-primary text-blue-700 hover:text-white"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              <div className="p-8">
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  {founder.role}
                </span>

                <h3 className="mt-3 text-3xl font-bold">{founder.name}</h3>

                <p className="mt-6 leading-8 text-muted-foreground">{founder.description}</p>

                <ul className="mt-8 space-y-3">
                  {founder.expertise.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-1 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Timeline */}
        <section className="mt-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <Building2 className="mx-auto mb-6 h-10 w-10 text-primary" />

            <h2 className="mb-4 text-4xl font-heading font-bold">Our Journey</h2>

            <p className="text-muted-foreground">Milestones that define our growth.</p>
          </motion.div>

          <div className="relative mx-auto max-w-6xl">
            {/* Center Line */}
            <div className="absolute left-6 top-0 h-full w-px bg-border lg:left-1/2 lg:-translate-x-1/2" />

            <div className="space-y-20">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={item.year}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="relative grid grid-cols-1 lg:grid-cols-2"
                  >
                    {/* LEFT CARD */}
                    <div className={`${isLeft ? "lg:pr-14" : "lg:pr-14 lg:order-2"}`}>
                      <div
                        className={`rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                          isLeft ? "" : "lg:ml-14"
                        }`}
                      >
                        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                          {item.year}
                        </span>

                        <h3 className="mt-3 text-2xl font-heading font-semibold">{item.title}</h3>

                        <p className="mt-4 leading-8 text-muted-foreground">{item.description}</p>
                      </div>
                    </div>

                    {/* EMPTY COLUMN */}
                    <div className={`${isLeft ? "" : "lg:order-1"}`} />

                    {/* TIMELINE DOT */}
                    <div className="absolute left-6 top-10 -translate-x-1/2 lg:left-1/2">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-primary shadow-xl">
                        <CalendarClock className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Memberships & affiliations */}
        <section className="py-10 px-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl p-10 border border-border bg-card shadow-xl"
          >
            <div className="flex justify-between ">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center"
              >
                <h2 className="font-heading max-w-2xl text-2xl font-bold leading-tight">
                  Memberships & affiliations
                </h2>

                <p className="font-body max-w-xl text-sm text-primary mt-2 text-muted-foreground">
                  SIDM · FICCI · CII Defence · IADA (in progress)
                </p>
              </motion.div>

              {/* Right */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="flex flex-wrap gap-3"
                  >
                    <QuoteButton className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

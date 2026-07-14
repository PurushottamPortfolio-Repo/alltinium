"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Target, Building2, CalendarClock } from "lucide-react";
import { assets } from "@/assets";
// dynamic import removed — using global QuoteProvider and QuoteButton
import { PageHero } from "@/components/ui/page-hero";
import QuoteButton from "@/components/quote/QuoteButton";

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
        description="Alltinium Aerometrix was founded to close a real, observable gap: India's aerospace OEMs were buying mission-critical metals through commodity traders with no traceability discipline."
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
      {/* Company Story */}
      <section className="bg-background py-24">
        <div className="container mx-auto px-6">
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
                Alltinium Aerometrix was built by professionals with deep experience in aerospace
                and defence supply chains, where mission outcomes depend on parts being exactly what
                their paperwork claims. The question was simple: why does that discipline disappear
                when the same metals are bought commercially?
              </p>

              <p className="leading-8 text-muted-foreground">
                Alltinium Aerometrix is the answer. A serious aerospace materials hub — mill-direct
                sourcing, full MTC chain, in-house NABL-accredited testing and a vetted
                manufacturing network — built so OEM buyers, QA leads and design engineers can speak
                to one partner who understands their language.
              </p>
              <p className="leading-8 text-muted-foreground">
                We are headquartered at KIADB Aerospace Park, Devanahalli — India&apos;s emerging
                aerospace cluster — and serve OEMs, Tier-1s, defence PSUs and space-tech startups
                across India and South-East Asia.
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
        </div>
      </section>
      {/* Values */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-6">
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
        </div>
      </section>
      {/* Founder1 */}
      <section className="bg-background py-24">
        <div className="container mx-auto px-6">
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
              <div>
                <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  Founder & Managing Director
                </span>
                <div className="overflow-hidden mt-4 rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
                  <Image
                    src={assets.profiles.profile1}
                    alt="Founder of Alltinium Aerometrix"
                    className="h-[500px] w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="mt-5 text-4xl font-heading font-bold lg:text-5xl">
                    [Founder&apos;s Name]
                  </h2>

                  <p className="mt-2 text-lg font-medium text-primary">
                    Founder, Alltinium Aerometrix Pvt. Ltd.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg leading-8 text-muted-foreground">
                With years of experience supporting aerospace, defence and high-performance
                manufacturing supply chains,
                <strong className="text-foreground"> [Founder&apos;s Name] </strong>
                established Alltinium Aerometrix to solve one of the industry&apos;s biggest
                challenges—obtaining certified engineering metals with complete traceability,
                dependable sourcing and uncompromising quality assurance.
              </p>

              <p className="text-lg leading-8 text-muted-foreground">
                Having worked closely with OEMs, procurement teams and precision manufacturers, the
                founder recognized that inconsistent supplier documentation, uncertain material
                origins and delayed deliveries created unnecessary operational risks. This insight
                became the foundation of Alltinium&apos;s customer-first sourcing model.
              </p>

              <p className="text-lg leading-8 text-muted-foreground">
                Today, the founder personally oversees supplier qualification, quality systems,
                strategic partnerships and long-term business development, ensuring every shipment
                reflects the same engineering discipline expected by the aerospace and defence
                industries.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Founder2 */}
      <section className="bg-background">
        <div className="container mx-auto px-6">
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
              <div>
                <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  Founder & Managing Director
                </span>
                <div className="overflow-hidden mt-4 rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
                  <Image
                    src={assets.profiles.profile2}
                    alt="Founder of Alltinium Aerometrix"
                    className="h-[500px] w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="mt-5 text-4xl font-heading font-bold lg:text-5xl">
                    [Founder&apos;s Name]
                  </h2>

                  <p className="mt-2 text-lg font-medium text-primary">
                    Founder, Alltinium Aerometrix Pvt. Ltd.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg leading-8 text-muted-foreground">
                With years of experience supporting aerospace, defence and high-performance
                manufacturing supply chains,
                <strong className="text-foreground"> [Founder&apos;s Name] </strong>
                established Alltinium Aerometrix to solve one of the industry&apos;s biggest
                challenges—obtaining certified engineering metals with complete traceability,
                dependable sourcing and uncompromising quality assurance.
              </p>

              <p className="text-lg leading-8 text-muted-foreground">
                Having worked closely with OEMs, procurement teams and precision manufacturers, the
                founder recognized that inconsistent supplier documentation, uncertain material
                origins and delayed deliveries created unnecessary operational risks. This insight
                became the foundation of Alltinium&apos;s customer-first sourcing model.
              </p>

              <p className="text-lg leading-8 text-muted-foreground">
                Today, the founder personally oversees supplier qualification, quality systems,
                strategic partnerships and long-term business development, ensuring every shipment
                reflects the same engineering discipline expected by the aerospace and defence
                industries.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-10">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <Building2 className="mx-auto mb-6 h-10 w-10 text-primary" />

            <h2 className="mb-4 text-4xl font-heading font-bold">Our Journey</h2>

            <p className="text-muted-foreground">Milestones that define our growth.</p>
          </motion.div>

          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-6 top-0 h-full w-px bg-border lg:left-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="relative flex items-start gap-8 lg:items-center"
                >
                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <CalendarClock className="h-5 w-5" />
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] lg:w-1/2">
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                      {item.year}
                    </span>

                    <h3 className="mt-2 text-2xl font-heading font-semibold">{item.title}</h3>

                    <p className="mt-3 leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Memberships & affiliations */}
      <section className="py-10 px-20">
        <div className="container">
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
        </div>
      </section>
    </>
  );
}

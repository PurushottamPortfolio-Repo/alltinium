"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { assets } from "@/assets";
import { PageHero } from "@/components/ui/page-hero";
import { Check } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { company, founders, values } from "@/data/about";

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

      <div className="flex flex-col item-center justify-center px-4 py-10">
        {/* Company Story */}

        <section className="bg-background py-10">
          {company.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className={`grid items-center gap-14 lg:grid-cols-2 ${
                index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              <div className="group relative overflow-hidden rounded-md shadow-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={700}
                  height={900}
                  className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Content */}
              <div className="space-y-7">
                <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold tracking-wide text-primary">
                  Who we are
                </span>

                <div className="flex items-start gap-5">
                  <div className="mt-2 h-16 w-1 rounded-full bg-primary" />

                  <div>
                    <h2 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                      {item.title}
                    </h2>

                    <p className="mt-6 text-lg leading-9 text-muted-foreground text-justify">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <div>
            {company.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7 }}
                className={``}
              >
                <div className="flex items-start gap-5">
                  <div className="mt-2 h-16 w-1 rounded-full bg-primary" />

                  <div>
                    <p className="mt-6 text-lg leading-9 text-muted-foreground text-justify">
                      {item.text2}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted/30 px-4 py-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mb-16 text-center"
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
                  <div className="flex gap-4">
                    <div className=" flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>

                    <h3 className="mt-1 text-2xl font-heading font-semibold">{item.title}</h3>
                  </div>

                  <p className="mt-1 leading-6 text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Founders */}
        <div className="mt-20 space-y-12">
          {founders.map((founder) => (
            <motion.div
              key={founder.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="group overflow-hidden rounded-2xl border bg-card shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              <div className="grid grid-cols-1 overflow-hidden lg:grid-cols-2">
                {/* Left Image */}
                <div className="relative">
                  <Image
                    src={founder.image}
                    alt={founder.name}

                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* LinkedIn */}
                  <Link
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute left-6 top-6 rounded-full bg-white/90 p-3 text-blue-700 shadow-lg backdrop-blur transition hover:bg-primary hover:text-white"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </Link>
                </div>

                {/* Right Content */}
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    {founder.role}
                  </span>

                  <h3 className="mt-3 text-4xl font-bold">{founder.name}</h3>

                  <p className="mt-6 leading-8 text-muted-foreground">{founder.description}</p>

                  <div className="mt-8">
                    <h4 className="mb-4 text-lg font-semibold">Areas of Expertise</h4>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {founder.expertise.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3"
                        >
                          <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                            <Check className="h-4 w-4" />
                          </div>

                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

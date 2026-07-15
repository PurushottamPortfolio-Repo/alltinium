"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Home } from "lucide-react";
import QuoteButton from "@/components/quote/QuoteButton";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  image: string | StaticImageData;

  title: string;

  description: string;

  buttonText?: string;

  buttonHref?: string;

  breadcrumbs?: BreadcrumbItem[];
}

export function PageHero({
  image,
  title,
  description,
  buttonText,
  buttonHref,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background */}

      <div className="absolute inset-0">
        <Image src={image} alt={title} fill priority className="object-cover" />
      </div>

      <div className="relative container mx-auto flex min-h-[520px] max-w-7xl items-center px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          {/* Breadcrumb */}

          {breadcrumbs && (
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/75">
              <Home className="h-4 w-4" />

              {breadcrumbs.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" />

                  {item.href ? (
                    <Link href={item.href} className="font-body transition  hover:text-primary">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="font-body text-primary">{item.label}</span>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Title */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.7,
            }}
            className="font-heading text-5xl font-bold leading-tight text-white md:text-6xl"
          >
            {title}
          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.7,
            }}
            className="font-body mt-6 max-w-2xl text-lg leading-8 text-white/85"
          >
            {description}
          </motion.p>

          {/* CTA */}

          {buttonText && buttonHref && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35,
                duration: 0.7,
              }}
              className="mt-10"
            >
              {buttonText === "Request a Quote" ? (
                <QuoteButton className="group inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3 font-body font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-xl hover:cursor-pointer" />
              ) : (
                <Link
                  href={buttonHref}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-body font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-xl"
                >
                  {buttonText}

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

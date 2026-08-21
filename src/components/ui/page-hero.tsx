"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Home } from "lucide-react";
import QuoteButton from "@/components/quote/quote-button";
import ManufactureButton from "../manufacturing/manufacture-button";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const showManufacturing = pathname !== "/materials";
  const showQuote = pathname !== "/manufacturing";

  return (
    <section className="relative isolate overflow-hidden h-[100vh]">
      {/* Background */}

      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          // fill
          priority
          quality={100}
          sizes="100vw"
          height={800}
          className="object-cover object-center"
        />
      </div>

      <div className="relative container flex min-h-[520px] max-w-7xl items-center mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 lg:px-20 lg:py-10">
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
              <div className="space-x-5 space-y-5 mt-10">
                {showQuote && (
                  <QuoteButton className="group inline-flex items-center gap-2 rounded-sm px-7 py-3 font-body font-semibold text-primary bg-background ring transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:cursor-pointer" />
                )}

                {showManufacturing && (
                  <ManufactureButton className="group inline-flex items-center gap-2 rounded-sm px-7 py-3 font-body font-semibold text-primary bg-background ring transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:cursor-pointer" />
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

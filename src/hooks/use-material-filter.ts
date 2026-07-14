"use client";

import { useEffect, useMemo, useState } from "react";

import { Material } from "@/types/material";

interface UseMaterialFilterProps {
  materials: Material[];
}

export function useMaterialFilter({ materials }: UseMaterialFilterProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedForm, setSelectedForm] = useState("all");

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Counts

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    materials.forEach((material) => {
      counts[material.category] = (counts[material.category] || 0) + 1;
    });

    return counts;
  }, [materials]);

  const formCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    materials.forEach((material) => {
      counts[material.form] = (counts[material.form] || 0) + 1;
    });

    return counts;
  }, [materials]);

  // Filter

  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchesSearch =
        debouncedSearch === "" ||
        material.title.toLowerCase().includes(debouncedSearch) ||
        material.grade?.toLowerCase().includes(debouncedSearch) ||
        material.category.toLowerCase().includes(debouncedSearch) ||
        material.form.toLowerCase().includes(debouncedSearch) ||
        material.specifications.some((spec) => spec.toLowerCase().includes(debouncedSearch));

      const matchesCategory = selectedCategory === "all" || material.category === selectedCategory;

      const matchesForm = selectedForm === "all" || material.form === selectedForm;

      return matchesSearch && matchesCategory && matchesForm;
    });
  }, [materials, debouncedSearch, selectedCategory, selectedForm]);

  return {
    search,
    setSearch,

    selectedCategory,
    setSelectedCategory,

    selectedForm,
    setSelectedForm,

    filteredMaterials,

    categoryCounts,
    formCounts,
  };
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GirlTemplate from "@/components/GirlTemplate";

type GirlData = {
  name: string;
  colorTheme: string;
  cards: any[];
  final: {
    taps: number;
    hint: string;
    title: string;
    message: string;
    blockImage: string;
  };
};

export default function PageInner() {
  const searchParams = useSearchParams();
  const girl = searchParams.get("p") || "template";

  const [data, setData] = useState<GirlData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/data/${girl}.json`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((json) => setData(json.template))
      .catch(() => setError("Failed to load template"));
  }, [girl]);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading…</p>;

  return <GirlTemplate data={data} />;
}

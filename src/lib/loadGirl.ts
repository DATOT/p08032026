import fs from "fs/promises";
import path from "path";

export interface GirlData {
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
}

export async function loadGirl(key: string): Promise<GirlData | null> {
  const filePath = path.join(process.cwd(), "src/data", `${key}.json`);

  const raw = await fs.readFile(filePath, "utf-8");
  const json = JSON.parse(raw);

  return json?.template ?? null;
}

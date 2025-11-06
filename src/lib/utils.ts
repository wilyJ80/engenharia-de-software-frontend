import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const classes = [
  "bg-amber-500",
  "bg-rose-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-blue-500",
  "bg-red-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-lime-500",
  "bg-fuchsia-500",
  "bg-orange-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-stone-500",
  "bg-slate-500",
  "bg-neutral-500",
  "bg-zinc-500",
];

function hashString(s: string | undefined) {
  let h = 0;
  for (let i = 0; i < s!.length; i++) h = (h << 5) - h + s!.charCodeAt(i);
  return Math.abs(h);
}

export function randomColor(seed: string | undefined) {
  if (!seed) return classes[0];
  const idx = hashString(seed.toString()) % classes.length;
  return classes[idx];
}
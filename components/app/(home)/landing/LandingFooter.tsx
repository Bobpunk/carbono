"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";

type Props = {
  isDark: boolean;
  onToggleDark: () => void;
  modelName: string;
};

export default function LandingFooter({ isDark, onToggleDark, modelName }: Props) {
  return (
    <footer className="w-full text-xs select-none border-t border-border-faint bg-background-base">
      <div className="px-24 py-12 border-b border-border-faint flex flex-wrap items-center justify-between gap-8">
        <span className="text-black-alpha-72">
          Carbono — clonador de sites com IA
        </span>
        <span className="text-black-alpha-72">v3 · modelo: {modelName}</span>
      </div>

      <div className="px-24 py-12 flex flex-wrap items-center justify-between gap-12">
        <nav className="flex flex-wrap items-center gap-x-24 gap-y-8">
          <Link
            href="#home-hero"
            className="text-black-alpha-72 hover:text-foreground hover:underline transition-colors"
          >
            Buscar sites
          </Link>
          <Link
            href="/generation"
            className="text-black-alpha-72 hover:text-foreground hover:underline transition-colors"
          >
            Abrir editor
          </Link>
        </nav>

        <div className="flex items-center gap-16">
          <button
            type="button"
            onClick={onToggleDark}
            className="flex items-center gap-6 text-black-alpha-72 hover:text-foreground transition-colors"
            aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            {isDark ? <Sun className="size-14" /> : <Moon className="size-14" />}
            <span>{isDark ? "Claro" : "Escuro"}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

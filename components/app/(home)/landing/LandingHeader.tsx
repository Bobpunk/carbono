"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Moon, Sun } from "lucide-react";

import HeaderWrapper from "@/components/shared/header/Wrapper/Wrapper";
import { Connector } from "@/components/shared/layout/curvy-rect";
import { cn } from "@/utils/cn";

type Props = {
  isDark: boolean;
  onToggleDark: () => void;
  models: { id: string; name: string }[];
  selectedModel: string;
  onSelectModel: (id: string) => void;
};

export default function LandingHeader({
  isDark,
  onToggleDark,
  models,
  selectedModel,
  onSelectModel,
}: Props) {
  const [open, setOpen] = useState(false);
  const modelMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (
        modelMenuRef.current &&
        !modelMenuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const currentName =
    models.find((model) => model.id === selectedModel)?.name ?? selectedModel;

  return (
    <header className="sticky top-0 left-0 w-full z-[101] bg-background-base header">
      <div className="absolute top-0 cmw-container border-x border-border-faint h-full pointer-events-none" />
      <div className="h-1 bg-border-faint w-full left-0 -bottom-1 absolute" />
      <div className="cmw-container absolute h-full pointer-events-none top-0">
        <Connector className="absolute -left-[10.5px] -bottom-11" />
        <Connector className="absolute -right-[10.5px] -bottom-11" />
      </div>

      <HeaderWrapper>
        <div className="max-w-[900px] mx-auto w-full flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            <span className="font-semibold tracking-tight leading-none">
              <span className="text-[22px]" style={{ color: "#4285F4" }}>C</span>
              <span className="text-[15px]" style={{ color: "#EA4335" }}>a</span>
              <span className="text-[15px]" style={{ color: "#FBBC05" }}>r</span>
              <span className="text-[15px]" style={{ color: "#4285F4" }}>b</span>
              <span className="text-[15px]" style={{ color: "#34A853" }}>o</span>
              <span className="text-[15px]" style={{ color: "#EA4335" }}>n</span>
              <span className="text-[15px]" style={{ color: "#4285F4" }}>o</span>
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <div ref={modelMenuRef} className="relative">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
                className={cn(
                  "flex items-center gap-6 px-14 py-7 rounded-full border border-border-faint",
                  "bg-background-lighter hover:bg-black-alpha-4 text-label-medium text-foreground",
                  "transition-colors duration-200",
                )}
              >
                <span className="max-w-140 truncate">{currentName}</span>
                <ChevronDown
                  className={cn(
                    "size-14 text-black-alpha-48 transition-transform duration-200",
                    open && "rotate-180",
                  )}
                />
              </button>

              {open && (
                <ul
                  role="listbox"
                  aria-label="Modelo de IA"
                  className="absolute right-0 top-[calc(100%+8px)] w-220 rounded-16 p-6 bg-white dark:bg-[#17171d] border border-border-faint z-[200] shadow-[0px_12px_24px_rgba(0,0,0,0.08)]"
                >
                  {models.map((model) => {
                    const active = model.id === selectedModel;
                    return (
                      <li key={model.id} role="option" aria-selected={active}>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectModel(model.id);
                            setOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between gap-8 px-10 py-8 rounded-8 text-left text-label-medium transition-colors",
                            active
                              ? "bg-heat-8 text-heat-100"
                              : "text-foreground hover:bg-black-alpha-4",
                          )}
                        >
                          <span>{model.name}</span>
                          {active && <Check className="size-14 shrink-0" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <button
              type="button"
              onClick={onToggleDark}
              aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
              title={isDark ? "Tema claro" : "Tema escuro"}
              className="p-8 rounded-full text-black-alpha-48 hover:text-foreground hover:bg-black-alpha-4 transition-colors duration-200"
            >
              {isDark ? <Sun className="size-18" /> : <Moon className="size-18" />}
            </button>
          </div>
        </div>
      </HeaderWrapper>
    </header>
  );
}

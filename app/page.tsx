"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { appConfig } from "@/config/app.config";
import { toast } from "sonner";
import { Clock, Globe, Layers, Search, Sparkles, X } from "lucide-react";

import { HeaderProvider } from "@/components/shared/header/HeaderContext";
import HeaderDropdownWrapper from "@/components/shared/header/Dropdown/Wrapper/Wrapper";
import HomeHeroBadge from "@/components/app/(home)/sections/hero/Badge/Badge";
import LandingLogo from "@/components/app/(home)/landing/LandingLogo";
import LandingHeader from "@/components/app/(home)/landing/LandingHeader";
import LandingFooter from "@/components/app/(home)/landing/LandingFooter";

interface SearchResult {
  url: string;
  title: string;
  description: string;
  screenshot: string | null;
  markdown: string;
}

const DARK_VARS = {
  "--background-base": "#101014",
  "--background-lighter": "#16161b",
  "--border-faint": "#26262e",
  "--border-muted": "#2e2e36",
  "--border-loud": "#3a3a44",
  "--foreground": "#ededed",
  "--foreground-dimmer": "rgba(237, 237, 237, 0.68)",
  "--illustrations-faint": "#26262e",
  "--illustrations-muted": "#2e2e36",
  "--illustrations-default": "#3a3a44",
  "--black-alpha-1": "rgba(255, 255, 255, 0.012)",
  "--black-alpha-2": "rgba(255, 255, 255, 0.020)",
  "--black-alpha-3": "rgba(255, 255, 255, 0.031)",
  "--black-alpha-4": "rgba(255, 255, 255, 0.039)",
  "--black-alpha-5": "rgba(255, 255, 255, 0.051)",
  "--black-alpha-6": "rgba(255, 255, 255, 0.059)",
  "--black-alpha-7": "rgba(255, 255, 255, 0.071)",
  "--black-alpha-8": "rgba(255, 255, 255, 0.078)",
  "--black-alpha-10": "rgba(255, 255, 255, 0.102)",
  "--black-alpha-12": "rgba(255, 255, 255, 0.122)",
  "--black-alpha-16": "rgba(255, 255, 255, 0.161)",
  "--black-alpha-20": "rgba(255, 255, 255, 0.200)",
  "--black-alpha-24": "rgba(255, 255, 255, 0.239)",
  "--black-alpha-32": "rgba(255, 255, 255, 0.322)",
  "--black-alpha-40": "rgba(255, 255, 255, 0.400)",
  "--black-alpha-48": "rgba(255, 255, 255, 0.478)",
  "--black-alpha-56": "rgba(255, 255, 255, 0.561)",
  "--black-alpha-64": "rgba(255, 255, 255, 0.639)",
  "--black-alpha-72": "rgba(255, 255, 255, 0.722)",
  "--black-alpha-88": "rgba(255, 255, 255, 0.878)",
} as React.CSSProperties & Record<`--${string}`, string>;

const STYLES = [
  { id: "1", name: "Glassmorphism", description: "Frosted glass effect" },
  { id: "2", name: "Neumorphism", description: "Soft 3D shadows" },
  { id: "3", name: "Brutalism", description: "Bold and raw" },
  { id: "4", name: "Minimalist", description: "Clean and simple" },
  { id: "5", name: "Dark Mode", description: "Dark theme design" },
  { id: "6", name: "Gradient Rich", description: "Vibrant gradients" },
  { id: "7", name: "3D Depth", description: "Dimensional layers" },
  { id: "8", name: "Retro Wave", description: "80s inspired" },
];

const CHIPS = [
  { label: "airbnb.com", query: "https://www.airbnb.com", icon: Globe },
  { label: "spotify.com", query: "https://www.spotify.com", icon: Globe },
  { label: "Landing SaaS", query: "landing page de SaaS financeiro", icon: Sparkles },
  { label: "Portfólio dark", query: "portfólio minimalista dark", icon: Layers },
];

const SUGGESTIONS = [
  "https://www.airbnb.com",
  "https://www.spotify.com",
  "https://stripe.com",
  "landing page de SaaS financeiro",
  "portfólio minimalista dark",
  "e-commerce de café especial",
];

const RECENT_KEY = "carbono-recent";
const DARK_KEY = "carbono-dark";

export default function HomePage() {
  const [url, setUrl] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string>("1");
  const [selectedModel, setSelectedModel] = useState<string>(appConfig.ai.defaultModel);
  const [isValidUrl, setIsValidUrl] = useState<boolean>(false);
  const [showSearchTiles, setShowSearchTiles] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [showInstructionsForIndex, setShowInstructionsForIndex] = useState<number | null>(null);
  const [additionalInstructions, setAdditionalInstructions] = useState<string>("");
  const [extendBrandStyles, setExtendBrandStyles] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchCardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem(DARK_KEY) === "true") {
      setIsDark(true);
    }
    try {
      const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      if (Array.isArray(stored)) setRecentSearches(stored.slice(0, 5));
    } catch {
      setRecentSearches([]);
    }
  }, []);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (
        searchCardRef.current &&
        !searchCardRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const toggleDark = () => {
    setIsDark((current) => {
      const next = !current;
      localStorage.setItem(DARK_KEY, String(next));
      return next;
    });
  };

  const persistRecent = (query: string) => {
    setRecentSearches((current) => {
      const next = [query, ...current.filter((item) => item !== query)].slice(0, 5);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  };

  const validateUrl = (urlString: string) => {
    if (!urlString) return false;
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(urlString.toLowerCase());
  };

  const isURL = (str: string): boolean => {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    return urlPattern.test(str.trim());
  };

  const models = appConfig.ai.availableModels.map((model) => ({
    id: model,
    name: appConfig.ai.modelDisplayNames[model] || model,
  }));

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim() || isURL(searchQuery)) {
      setSearchResults([]);
      setShowSearchTiles(false);
      return;
    }

    setIsSearching(true);
    setShowSearchTiles(true);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results || []);
        setShowSearchTiles(true);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const scrollToCarousel = (delay: number) => {
    setTimeout(() => {
      const carouselSection = document.querySelector(".carousel-section");
      if (carouselSection) {
        carouselSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, delay);
  };

  const runSubmit = async (selectedResult?: SearchResult, overrideValue?: string) => {
    const inputValue = (overrideValue ?? url).trim();
    setShowSuggestions(false);

    if (!inputValue) {
      toast.error("Cole uma URL ou descreva o site que quer copiar");
      return;
    }

    if (extendBrandStyles && isURL(inputValue) && !additionalInstructions.trim()) {
      toast.error("Descreva o que construir com as marcas deste estilo");
      return;
    }

    if (!isURL(inputValue)) {
      persistRecent(inputValue);
    }

    if (selectedResult) {
      setIsFadingOut(true);
      setTimeout(() => {
        sessionStorage.setItem("targetUrl", selectedResult.url);
        sessionStorage.setItem("selectedStyle", selectedStyle);
        sessionStorage.setItem("selectedModel", selectedModel);
        sessionStorage.setItem("autoStart", "true");
        if (selectedResult.markdown) {
          sessionStorage.setItem("siteMarkdown", selectedResult.markdown);
        }
        router.push("/generation");
      }, 500);
      return;
    }

    if (isURL(inputValue)) {
      if (extendBrandStyles) {
        sessionStorage.setItem("targetUrl", inputValue);
        sessionStorage.setItem("selectedModel", selectedModel);
        sessionStorage.setItem("autoStart", "true");
        sessionStorage.setItem("brandExtensionMode", "true");
        sessionStorage.setItem("brandExtensionPrompt", additionalInstructions || "");
        router.push("/generation");
      } else {
        sessionStorage.setItem("targetUrl", inputValue);
        sessionStorage.setItem("selectedStyle", selectedStyle);
        sessionStorage.setItem("selectedModel", selectedModel);
        sessionStorage.setItem("additionalInstructions", additionalInstructions || "");
        sessionStorage.setItem("autoStart", "true");
        router.push("/generation");
      }
      return;
    }

    if (hasSearched && searchResults.length > 0) {
      setIsFadingOut(true);
      setTimeout(async () => {
        setSearchResults([]);
        setIsFadingOut(false);
        await performSearch(inputValue);
        setHasSearched(true);
        setShowSearchTiles(true);
        scrollToCarousel(300);
      }, 500);
    } else {
      setIsSearching(true);
      setHasSearched(true);
      setShowSearchTiles(true);
      scrollToCarousel(100);
      await performSearch(inputValue);
      setIsSearching(false);
      scrollToCarousel(300);
    }
  };

  const handleSubmit = () => runSubmit();

  const handleLucky = () => {
    const pick = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
    setUrl(pick);
    runSubmit(undefined, pick);
  };

  const clearInput = () => {
    setUrl("");
    setIsValidUrl(false);
    setShowSearchTiles(false);
    setHasSearched(false);
    setSearchResults([]);
    setShowSuggestions(true);
  };

  const suggestionList = SUGGESTIONS.filter((item) =>
    item.toLowerCase().includes(url.trim().toLowerCase()),
  ).slice(0, 5);

  const trayOpen = isValidUrl;

  return (
    <HeaderProvider>
      <div
        className={`min-h-screen flex flex-col bg-background-base text-foreground ${isDark ? "dark" : ""}`}
        style={isDark ? DARK_VARS : undefined}
      >
        <HeaderDropdownWrapper />

        <LandingHeader
          isDark={isDark}
          onToggleDark={toggleDark}
          models={models}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
        />

        <main
          id="home-hero"
          className="landing-enter flex-1 flex flex-col items-center justify-center px-16 pt-72 pb-56"
        >
          <HomeHeroBadge />

          <div className="mt-20">
            <LandingLogo />
          </div>

          {/* Search card */}
          <div
            ref={searchCardRef}
            className="w-full max-w-640 relative z-30 mt-36 landing-enter"
            onMouseLeave={() => setShowSuggestions(false)}
          >
            <div
              className={`bg-white dark:bg-[#17171d] rounded-32 border border-border-faint transition-all duration-200 ${
                trayOpen
                  ? "shadow-[0px_8px_32px_rgba(0,0,0,0.06)]"
                  : "shadow-[0px_2px_12px_rgba(0,0,0,0.04)]"
              } focus-within:border-black-alpha-16 focus-within:shadow-[0px_8px_32px_rgba(0,0,0,0.07)]`}
            >
              {/* Input row */}
              <div className="relative z-20">
                <form
                  role="search"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!isSearching) handleSubmit();
                  }}
                  className="flex items-center gap-12 px-20 py-14"
                >
                  {url.trim() && isURL(url) ? (
                    <Globe className="size-20 shrink-0 text-black-alpha-48" />
                  ) : (
                    <Search className="size-20 shrink-0 text-black-alpha-48" />
                  )}

                  <input
                    aria-label="Busque por URL ou descrição do site"
                    className="flex-1 min-w-0 bg-transparent text-body-input text-foreground placeholder:text-black-alpha-72 focus:outline-none"
                    placeholder="Cole uma URL ou descreva o site que quer copiar..."
                    type="text"
                    value={url}
                    disabled={isSearching}
                    onChange={(e) => {
                      const value = e.target.value;
                      const urlMode = validateUrl(value);
                      setUrl(value);
                      setIsValidUrl(urlMode);
                      if (urlMode) {
                        setShowSuggestions(false);
                      } else {
                        setShowSuggestions(true);
                      }
                      if (value.trim() === "") {
                        setShowSearchTiles(false);
                        setHasSearched(false);
                        setSearchResults([]);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setShowSuggestions(false);
                      }
                    }}
                    onFocus={() => {
                      if (!validateUrl(url)) setShowSuggestions(true);
                    }}
                  />

                  {url && (
                    <button
                      type="button"
                      aria-label="Limpar busca"
                      onClick={clearInput}
                      className="shrink-0 p-4 rounded-full text-black-alpha-48 hover:text-foreground hover:bg-black-alpha-4 transition-colors"
                    >
                      <X className="size-16" />
                    </button>
                  )}
                </form>

                {/* Suggestions dropdown */}
                {showSuggestions && (suggestionList.length > 0 || recentSearches.length > 0) && (
                  <div
                    role="listbox"
                    aria-label="Sugestões de busca"
                    className="absolute left-0 right-0 top-full mt-6 z-40 rounded-20 border border-border-faint bg-white dark:bg-[#17171d] shadow-[0_16px_40px_rgba(0,0,0,0.08)] overflow-hidden py-8 landing-enter"
                  >
                    {url.trim() === "" && recentSearches.length > 0 && (
                      <div className="px-8 pb-4">
                        <div className="px-12 py-6 text-label-x-small text-black-alpha-72">
                          Buscas recentes
                        </div>
                        {recentSearches.map((recent) => (
                          <button
                            key={recent}
                            type="button"
                            role="option"
                            aria-selected={false}
                            onClick={() => {
                              setUrl(recent);
                              runSubmit(undefined, recent);
                            }}
                            className="w-full flex items-center gap-10 px-12 py-8 rounded-8 text-left text-body-input text-foreground hover:bg-black-alpha-4 transition-colors"
                          >
                            <Clock className="size-16 shrink-0 text-black-alpha-48" />
                            <span className="truncate">{recent}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {suggestionList.length > 0 && (
                      <div className="px-8">
                        <div className="px-12 py-6 text-label-x-small text-black-alpha-72">
                          Sugestões
                        </div>
                        {suggestionList.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            role="option"
                            aria-selected={false}
                            onClick={() => {
                              setUrl(suggestion);
                              runSubmit(undefined, suggestion);
                            }}
                            className="w-full flex items-center gap-10 px-12 py-8 rounded-8 text-left text-body-input text-foreground hover:bg-black-alpha-4 transition-colors"
                          >
                            {isURL(suggestion) ? (
                              <Globe className="size-16 shrink-0 text-black-alpha-48" />
                            ) : (
                              <Search className="size-16 shrink-0 text-black-alpha-48" />
                            )}
                            <span className="truncate">{suggestion}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 px-20 py-8 border-t border-border-faint flex items-center justify-between text-label-x-small text-black-alpha-48">
                      <span className="text-black-alpha-72">Enter para buscar</span>
                      <span>URL → clonagem direta</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Options tray — shown only for valid URLs */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  trayOpen
                    ? extendBrandStyles
                      ? "max-h-[440px] opacity-100"
                      : "max-h-[520px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-20 pb-20">
                  <div className="border-t border-border-faint pt-8">
                    {/* Extend brand styles toggle */}
                    <div
                      className="py-8 grid grid-cols-2 items-center gap-12 group cursor-pointer"
                      onClick={() => setExtendBrandStyles(!extendBrandStyles)}
                    >
                      <div className="text-xs font-medium text-black-alpha-72 group-hover:text-foreground transition-colors">
                        Estender marcas deste site
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          aria-label="Estender marcas deste site"
                          aria-pressed={extendBrandStyles}
                          className="transition-all relative rounded-full group bg-black-alpha-10"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExtendBrandStyles(!extendBrandStyles);
                          }}
                          style={{
                            width: "50px",
                            height: "20px",
                            boxShadow:
                              "rgba(0, 0, 0, 0.02) 0px 6px 12px 0px inset, rgba(0, 0, 0, 0.02) 0px 0.75px 0.75px 0px inset, rgba(0, 0, 0, 0.04) 0px 0.25px 0.25px 0px inset",
                          }}
                        >
                          <div
                            className={`overlay transition-opacity ${extendBrandStyles ? "opacity-100" : "opacity-0"}`}
                            style={{ background: "color(display-p3 0.9059 0.3294 0.0784)", backgroundColor: "#FA4500" }}
                          />
                          <div
                            className="top-[2px] left-[2px] transition-all absolute rounded-full bg-accent-white"
                            style={{
                              width: "28px",
                              height: "16px",
                              boxShadow:
                                "rgba(0, 0, 0, 0.06) 0px 6px 12px -3px, rgba(0, 0, 0, 0.06) 0px 3px 6px -1px, rgba(0, 0, 0, 0.04) 0px 1px 2px 0px, rgba(0, 0, 0, 0.08) 0px 0.5px 0.5px 0px",
                              transform: extendBrandStyles ? "translateX(16px)" : "none",
                            }}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Brand extension prompt */}
                    {extendBrandStyles && (
                      <div className="pb-10 transition-all duration-300">
                        <textarea
                          value={additionalInstructions}
                          onChange={(e) => {
                            setAdditionalInstructions(e.target.value);
                            sessionStorage.setItem("additionalInstructions", e.target.value);
                          }}
                          placeholder="Descreva a nova funcionalidade que quer construir usando as marcas deste site..."
                          className="w-full px-12 py-10 text-xs font-medium text-foreground bg-background-lighter rounded-8 border border-border-faint focus:border-heat-100 focus:outline-none placeholder:text-black-alpha-48 min-h-[80px] resize-none"
                        />
                      </div>
                    )}

                    {/* Style selector */}
                    {!extendBrandStyles && (
                      <div
                        className="mb-2 transition-all duration-300 transform"
                        style={{ transitionDelay: "100ms" }}
                      >
                        <div className="grid grid-cols-4 gap-2">
                          {STYLES.map((style) => (
                            <button
                              key={style.id}
                              type="button"
                              onClick={() => setSelectedStyle(style.id)}
                              className={
                                selectedStyle === style.id
                                  ? "bg-heat-100 hover:bg-heat-200 flex items-center justify-center button relative text-label-medium button-primary group/button rounded-10 p-8 text-accent-white active:scale-[0.995] border-0"
                                  : "border border-border-faint hover:border-border-muted bg-background-lighter text-black-alpha-72 hover:text-foreground py-3.5 px-4 rounded text-xs font-medium text-center transition-colors"
                              }
                            >
                              {selectedStyle === style.id && (
                                <div className="button-background absolute inset-0 rounded-10 pointer-events-none" />
                              )}
                              <span className={selectedStyle === style.id ? "relative" : ""}>
                                {style.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional instructions */}
                    {!extendBrandStyles && (
                      <div className="mt-2 pb-2">
                        <input
                          type="text"
                          className="w-full px-12 py-8 text-xs font-medium text-foreground bg-background-lighter rounded-8 border border-border-faint focus:border-heat-100 focus:outline-none placeholder:text-black-alpha-48"
                          placeholder="Instruções adicionais (opcional)"
                          defaultValue=""
                          onChange={(e) =>
                            sessionStorage.setItem("additionalInstructions", e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick chips */}
          <div className="flex flex-wrap justify-center gap-8 mt-20 max-w-640 landing-enter">
            {CHIPS.map((chip) => {
              const Icon = chip.icon;
              return (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => {
                    setUrl(chip.query);
                    runSubmit(undefined, chip.query);
                  }}
                  className="flex items-center gap-6 px-12 py-7 rounded-full border border-border-faint bg-background-lighter text-label-medium text-black-alpha-72 hover:bg-black-alpha-4 hover:text-foreground transition-colors"
                >
                  <Icon className="size-14" />
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center mt-28 landing-enter">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSearching}
              className={`button relative rounded-10 p-8 flex items-center justify-center button text-label-medium button-primary group/button text-accent-white active:scale-[0.995] transition-all ${
                isSearching ? "pointer-events-none opacity-60" : ""
              }`}
            >
              <div className="overlay button-background !absolute" />
              <span className="px-6 relative">
                {isURL(url) ? "Clonar site" : "Buscar sites"}
              </span>
            </button>
          </div>
        </main>

        {/* Search results carousel */}
        {showSearchTiles && hasSearched && (
          <section
            className={`carousel-section relative w-full overflow-hidden mt-32 mb-32 transition-opacity duration-500 ${
              isFadingOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black-alpha-2 to-transparent rounded-[50%] transform scale-x-150 -translate-y-24" />

            {isSearching ? (
              <div className="relative h-[250px] overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 w-[120px] z-20 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, var(--background-base) 0%, var(--background-base) 20%, transparent 100%)",
                  }}
                />
                <div
                  className="absolute right-0 top-0 bottom-0 w-[120px] z-20 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to left, var(--background-base) 0%, var(--background-base) 20%, transparent 100%)",
                  }}
                />

                <div className="carousel-container absolute left-0 flex gap-12 py-4">
                  {[...Array(10), ...Array(10)].map((_, index) => (
                    <div
                      key={`loading-${index}`}
                      className="flex-shrink-0 w-[400px] h-[240px] rounded-lg overflow-hidden border-2 border-black-alpha-10 bg-white dark:bg-[#17171d] relative"
                    >
                      <div className="absolute inset-0 skeleton-shimmer">
                        <div className="absolute inset-0 bg-gradient-to-r from-black-alpha-4 via-black-alpha-2 to-black-alpha-4 skeleton-gradient" />
                      </div>

                      <div className="absolute top-0 left-0 right-0 h-40 bg-black-alpha-4 border-b border-black-alpha-10 flex items-center px-6 gap-4">
                        <div className="flex gap-3">
                          <div className="w-5 h-5 rounded-full bg-black-alpha-24 animate-pulse" />
                          <div className="w-5 h-5 rounded-full bg-black-alpha-24 animate-pulse" style={{ animationDelay: "0.1s" }} />
                          <div className="w-5 h-5 rounded-full bg-black-alpha-24 animate-pulse" style={{ animationDelay: "0.2s" }} />
                        </div>
                        <div className="flex-1 h-8 bg-black-alpha-10 rounded-md mx-6 animate-pulse" />
                      </div>

                      <div className="absolute top-44 left-4 right-4">
                        <div className="h-3 bg-black-alpha-10 rounded w-3/4 mb-2 animate-pulse" />
                        <div className="h-3 bg-black-alpha-6 rounded w-1/2 mb-2 animate-pulse" style={{ animationDelay: "0.2s" }} />
                        <div className="h-3 bg-black-alpha-6 rounded w-2/3 animate-pulse" style={{ animationDelay: "0.3s" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="relative h-[250px] overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 w-[120px] z-20 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, var(--background-base) 0%, var(--background-base) 20%, transparent 100%)",
                  }}
                />
                <div
                  className="absolute right-0 top-0 bottom-0 w-[120px] z-20 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to left, var(--background-base) 0%, var(--background-base) 20%, transparent 100%)",
                  }}
                />

                <div className="carousel-container absolute left-0 flex gap-12 py-4">
                  {[...searchResults, ...searchResults].map((result, index) => (
                    <div
                      key={`${result.url}-${index}`}
                      className="group flex-shrink-0 w-[400px] h-[240px] rounded-lg overflow-hidden border-2 border-black-alpha-10 transition-all duration-300 hover:shadow-2xl bg-white dark:bg-[#17171d] relative"
                      onMouseLeave={() => {
                        if (showInstructionsForIndex === index) {
                          setShowInstructionsForIndex(null);
                          setAdditionalInstructions("");
                        }
                      }}
                    >
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center p-6">
                        {showInstructionsForIndex === index ? (
                          <div className="w-full max-w-[380px]">
                            <div
                              className="bg-white rounded-20"
                              style={{
                                boxShadow:
                                  "0px 0px 44px 0px rgba(0, 0, 0, 0.02), 0px 88px 56px -20px rgba(0, 0, 0, 0.03), 0px 56px 56px -20px rgba(0, 0, 0, 0.02), 0px 32px 32px -20px rgba(0, 0, 0, 0.03), 0px 16px 24px -12px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
                              }}
                            >
                              <div className="p-16 flex gap-12 items-start w-full relative">
                                <div className="mt-2 flex-shrink-0">
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                                    <path d="M5 5H15M5 10H15M5 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                  </svg>
                                </div>

                                <textarea
                                  value={additionalInstructions}
                                  onChange={(e) => setAdditionalInstructions(e.target.value)}
                                  placeholder="Descreva suas personalizações..."
                                  className="flex-1 bg-transparent text-body-input text-accent-black placeholder:text-black-alpha-72 focus:outline-none focus:ring-0 focus:border-transparent resize-none min-h-[60px]"
                                  autoFocus
                                  onClick={(e) => e.stopPropagation()}
                                  onKeyDown={(e) => {
                                    if (e.key === "Escape") {
                                      e.stopPropagation();
                                      setShowInstructionsForIndex(null);
                                      setAdditionalInstructions("");
                                    }
                                  }}
                                />
                              </div>

                              <div className="border-t border-black-alpha-5" />

                              <div className="p-10 flex justify-between items-center">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowInstructionsForIndex(null);
                                    setAdditionalInstructions("");
                                  }}
                                  className="button relative rounded-10 px-8 py-8 text-label-medium font-medium flex items-center justify-center bg-black-alpha-4 hover:bg-black-alpha-6 text-black-alpha-48 active:scale-[0.995] transition-all"
                                >
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (additionalInstructions.trim()) {
                                      sessionStorage.setItem("additionalInstructions", additionalInstructions);
                                      runSubmit(result);
                                    }
                                  }}
                                  disabled={!additionalInstructions.trim()}
                                  className={`
                                    button relative rounded-10 px-8 py-8 text-label-medium font-medium
                                    flex items-center justify-center gap-6
                                    ${
                                      additionalInstructions.trim()
                                        ? "button-primary text-accent-white active:scale-[0.995]"
                                        : "bg-black-alpha-4 text-black-alpha-24 cursor-not-allowed"
                                    }
                                  `}
                                >
                                  {additionalInstructions.trim() && (
                                    <div className="button-background absolute inset-0 rounded-10 pointer-events-none" />
                                  )}
                                  <span className="px-6 relative">Aplicar e clonar</span>
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
                                    <path d="M11.6667 4.79163L16.875 9.99994M16.875 9.99994L11.6667 15.2083M16.875 9.99994H3.125" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="text-white text-center mb-3">
                              <p className="text-base font-semibold mb-0.5">{result.title}</p>
                              <p className="text-[11px] opacity-80">Escolha como clonar este site</p>
                            </div>

                            <div className="flex gap-3 justify-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  runSubmit(result);
                                }}
                                className="bg-heat-100 hover:bg-heat-200 flex items-center justify-center button relative text-label-medium button-primary group/button rounded-10 p-8 gap-2 text-white active:scale-[0.995]"
                              >
                                <div className="button-background absolute inset-0 rounded-10 pointer-events-none" />
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
                                  <path d="M11.6667 4.79163L16.875 9.99994M16.875 9.99994L11.6667 15.2083M16.875 9.99994H3.125" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                </svg>
                                <span className="px-6 relative">Clonar agora</span>
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowInstructionsForIndex(index);
                                  setAdditionalInstructions("");
                                }}
                                className="bg-white hover:bg-black-alpha-4 flex items-center justify-center button relative text-label-medium rounded-10 p-8 gap-2 text-gray-700 active:scale-[0.995]"
                              >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                                  <path d="M5 5H15M5 10H15M5 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                  <path d="M14 14L16 16L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="px-6">Add instruções</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>

                      {result.screenshot ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={result.screenshot}
                            alt={result.title}
                            fill
                            className="object-cover object-top"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-black-alpha-4 to-transparent flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-black-alpha-10 mx-auto mb-3 flex items-center justify-center">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black-alpha-48">
                                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="6" cy="6" r="1" fill="currentColor" />
                                <circle cx="9" cy="6" r="1" fill="currentColor" />
                                <circle cx="12" cy="6" r="1" fill="currentColor" />
                              </svg>
                            </div>
                            <p className="text-black-alpha-72 text-sm font-medium">{result.title}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative h-[250px] flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-black-alpha-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-black-alpha-72 text-lg">Nenhum resultado encontrado</p>
                  <p className="text-black-alpha-72 text-sm mt-1">Tente outro termo de busca</p>
                </div>
              </div>
            )}
          </section>
        )}

        <LandingFooter
          isDark={isDark}
          onToggleDark={toggleDark}
          modelName={models.find((model) => model.id === selectedModel)?.name ?? selectedModel}
        />
      </div>

      <style jsx>{`
        @keyframes infiniteScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .landing-enter {
          animation: fadeIn 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) both;
        }

        .carousel-container {
          animation: infiniteScroll 30s linear infinite;
        }

        .carousel-container:hover {
          animation-play-state: paused;
        }

        .skeleton-shimmer {
          position: relative;
          overflow: hidden;
        }

        .skeleton-gradient {
          animation: shimmer 2s infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .landing-enter,
          .carousel-container,
          .skeleton-gradient {
            animation: none !important;
          }
        }
      `}</style>
    </HeaderProvider>
  );
}

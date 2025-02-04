"use client";

import { useEffect, useRef } from "react";
import { BundledLanguage, BundledTheme, getHighlighter } from "shiki";

interface CodeProps {
  code: string;
  language?: BundledLanguage;
  theme?: BundledTheme;
  className?: string;
}

export function Code({
  code,
  language = "typescript",
  theme = "github-dark",
  className = "",
}: CodeProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const highlightCode = async () => {
      const highlighter = await getHighlighter({
        themes: [theme],
        langs: [language],
      });

      if (codeRef.current) {
        const html = highlighter.codeToHtml(code, {
          lang: language,
          theme: theme,
        });
        codeRef.current.innerHTML = html;
      }
    };

    highlightCode();
  }, [code, language, theme]);

  return (
    <pre
      className={`${className} rounded-lg bg-muted p-4 text-xs overflow-auto`}
    >
      <code ref={codeRef} className={`language-${language}`} />
    </pre>
  );
}

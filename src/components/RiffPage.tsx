import { EdgeFade } from "./layout/EdgeFade";
import { SiteFooter } from "./layout/SiteFooter";
import { SiteNav } from "./layout/SiteNav";
import type { RiffStats } from "./lib/stats";
import { ScrollScenes } from "./motion/ScrollScenes";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Download } from "./sections/Download";
import { Editor } from "./sections/Editor";
import { Faq } from "./sections/Faq";
import { Features } from "./sections/Features";
import { Hero } from "./sections/Hero";
import { Themes } from "./sections/Themes";
import "./styles/tokens.css";

export function RiffPage({ stats }: { stats: RiffStats }) {
  return (
    <>
      <SiteNav />
      <EdgeFade side="top" />
      <EdgeFade side="bottom" />
      <main id="main">
        <Hero stats={stats} />
        <Themes />
        <Editor />
        <Features />
        <Download stats={stats} />
        <Faq />
      </main>
      <SiteFooter />
      <SmoothScroll />
      <ScrollScenes />
    </>
  );
}

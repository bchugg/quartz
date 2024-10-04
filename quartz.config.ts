import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The Stats Map",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "thestatsmap.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        //body: "Source Sans Pro",
        body: "Lora",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#FFFFFF", // page background
          lightgray: "#e5e5e5", // borders 
          gray: "#808080", // graph links 
          darkgray: "#050505", // body text 
          dark: "#2b2b2b", // header text and icons 
          secondary: "#25309c", // link color, current graph node  
          tertiary: "#4a4c5c", // hover states, visited graph nodes
          highlight: "#fffff", // internal link background
          textHighlight: "#25309c", // markdown highlighted text background
          //textHighlight: "#fffff", // markdown highlighted text background
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          //secondary: "#7b97aa",
          secondary: "#72b5c2",
          tertiary: "#84a59d",
          highlight: "#fffff",
          textHighlight: "#25309c",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex", 
        customMacros: {
          "\\la": "\\langle", // General notation
          "\\ra": "\\rangle",
          "\\Re": "\\mathbb{R}", 
          "\\eps": "\\epsilon",
          "\\ind": "\\mathbf{1}",
          "\\wh": "\\widehat{#1}",
          "\\ov": "\\overline{#1}",
          "\\un": "\\underline{#1}",
          "\\range": "\\text{range}",
          "\\d": "\\text{d}",
          "\\argmin": "\\text{argmin}",
          "\\argmax": "\\text{argmax}",
          "\\dsphere": "\\mathbb{S}^{d-1}",
          "\\bar": "\\overline{#1}",
          "\\ball": "\\mathbb{B}",
          "\\sphere": "\\mathbb{S}",
          "\\dball": "\\ball^{d-1}",
          "\\norm": "\\left|{#1}\\right|",
          "\\image": "\\text{image}",
          "\\lap": "\\text{Lap}",

          "\\diag": "\\text{diag}", // Algebra
          "\\rank": "\\text{rank}",
          "\\Tr": "\\text{Tr}",


          "\\E": "\\mathbb{E}", // Probability
          "\\P": "\\mathbb{P}",
          "\\Pr": "\\mathbb{P}",
          "\\Var": "\\mathbb{V}",
          "\\Cov": "\\text{Cov}",
          "\\ess": "\\text{ess}",
          "\\Ber": "\\textnormal{Ber}",
          "\\Mspace": "\\mathcal{M}({#1})",
          "\\equald": "\\overset{d}{=}",

          "\\kl": "D_{\\text{KL}}", // Information Theory
          "\\tv": "\\text{TV}", 
          "\\ks": "{\\text{KS}}",

          "\\calE": "\\mathcal{E}", // Cals 
          "\\calA": "\\mathcal{A}",
          "\\calF": "\\mathcal{F}",
          "\\calH": "\\mathcal{H}",
          "\\calX": "\\mathcal{X}",
          "\\calG": "\\mathcal{G}",
          "\\calR": "\\mathcal{R}",
          "\\calQ": "\\mathcal{Q}",
          "\\calP": "\\mathcal{P}",
          "\\calB": "\\mathcal{B}",
          "\\calL": "\\mathcal{L}",
          "\\calD": "\\mathcal{D}",
          "\\calZ": "\\mathcal{Z}",
          "\\calC": "\\mathcal{C}",
          "\\calN": "\\mathcal{N}",
          "\\calM": "\\mathcal{M}",
          "\\calS": "\\mathcal{S}",
          "\\calT": "\\mathcal{T}",
          "\\calU": "\\mathcal{U}",
          "\\calV": "\\mathcal{V}",
          "\\calW": "\\mathcal{W}",
          "\\calY": "\\mathcal{Y}",
          "\\calK": "\\mathcal{K}",
          "\\calI": "\\mathcal{I}",
          "\\calO": "\\mathcal{O}",
          "\\calJ": "\\mathcal{J}",

          "\\bb": "\\mathbb{#1}",    // General bold and cal notation
          "\\cal": "\\mathcal{#1}",
          "\\bs": "\\boldsymbol{#1}", 
        }
        }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config

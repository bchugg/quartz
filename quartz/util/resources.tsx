import { randomUUID } from "crypto"
import { JSX } from "preact/jsx-runtime"

export type JSResource = {
  loadTime: "beforeDOMReady" | "afterDOMReady"
  moduleType?: "module"
  spaPreserve?: boolean
} & (
  | {
      src: string
      contentType: "external"
    }
  | {
      script: string
      contentType: "inline"
    }
)

export function JSResourceToScriptElement(resource: JSResource, preserve?: boolean): JSX.Element {
  const scriptType = resource.moduleType ?? "application/javascript"
  const spaPreserve = preserve ?? resource.spaPreserve
  if (resource.contentType === "external") {
    return (
      <script key={resource.src} src={resource.src} type={scriptType} spa-preserve={spaPreserve} />
    )
  } else {
    const content = resource.script
    return (
      <script
        key={randomUUID()}
        type={scriptType}
        spa-preserve={spaPreserve}
        dangerouslySetInnerHTML={{ __html: content }}
      ></script>
    )
  }
}

export interface StaticResources {
  css: string[]
  js: JSResource[]
}

// List of minor words to keep lowercase (unless first or last in title)
const minorWords = new Set([
  "of", "and", "via", "or", "the", "a", "an", "but", "for", "nor", "on", "at", "to", "by", "with", "in", "von"
]);

// List of words to always appear in uppercase (like acronyms)
const upperCaseWords = new Set(["CLT", "LLN", "BH", "CI", "CS", "SLLN"]);

// Custom function to convert a string to Title Case while excluding minor words
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index, words) =>
      word
        .split('-') // Split hyphenated words
        .map((part, partIndex, parts) => {
          const shouldCapitalize = !minorWords.has(part);
            //partIndex === 0 || partIndex === parts.length - 1 || !minorWords.has(part);
          
          // Handle acronyms (eg CLT)
          if (upperCaseWords.has(part.toUpperCase())) {
            return part.toUpperCase(); // Return acronym in uppercase
          } 
          
          // Handle acronyms with trailing 's' (e.g., CLTs or CIs)
          if (part.slice(-1) === 's' && upperCaseWords.has(part.slice(0, -1).toUpperCase())) {
            return part.slice(0, -1).toUpperCase() + 's'; // Capitalize acronym, keep 's' lowercase
          }

          return shouldCapitalize
            ? part.charAt(0).toUpperCase() + part.slice(1)
            : part;
        })
        .join('-') // Rejoin hyphenated word parts
    )
    .join(' ');
}

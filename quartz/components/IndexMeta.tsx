import { formatDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/contentMeta.scss"

export default (() => {
  function IndexMeta({ fileData, allFiles, cfg }: QuartzComponentProps) {
    if (fileData.slug !== "index") return null

    const mostRecent = allFiles
      .flatMap((f) => (f.dates?.modified ? [f.dates.modified] : []))
      .reduce<Date | null>((a, b) => (a === null || b > a ? b : a), null)

    if (!mostRecent) return null

    return (
      <p class="content-meta" style="margin-bottom: 0">
        Stats Map last modified: <span>{formatDate(mostRecent, cfg.locale)}</span>
      </p>
    )
  }

  IndexMeta.css = style

  return IndexMeta
}) satisfies QuartzComponentConstructor

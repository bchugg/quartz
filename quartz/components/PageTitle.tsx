import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <div class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
      <img src={"/static/network.jpeg"} class='title-image'/>
      <h2>{title}</h2>
    </a>
    {/* <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>{title}</a>
    </h2> */}
    </div>
  )
}

PageTitle.css = `
.title-image {
  border-radius: 50%;
  margin-top: 0;
  opacity: 0.8;
  width: 40%;
  @media all and (max-width: 1200px) {
    width: 20%;
  }
}
.page-title:hover {
  opacity: 0.6; /* Reduces opacity on hover */
  transition: opacity 0.3s ease-in-out; /* Smooth transition */
}
.page-title {
  margin: 0;
  text-align: center;
  width: 100%
  display: block;
  a {
    h2 {
      margin: 0;
      color: var(--secondary);  
    }
  }
} 
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
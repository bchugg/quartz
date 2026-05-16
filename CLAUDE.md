# Quartz

This repo is a customized instance of [Quartz](https://quartz.jzhao.xyz/), a static site generator used to publish [stat-map](https://github.com/bchugg/stat-map) — a Zettelkasten-style collection of notes on statistics, probability, and TCS.

## Content

The `content/` directory is a git submodule pointing to the stat-map repo. Notes are written and edited directly in Obsidian (which handles LaTeX, wikilinks, etc.). To pull in new content:

```bash
cd content
git pull
cd ..
git add content
git commit -m "update content"
```

## Dev server

```bash
npx quartz build --serve
```

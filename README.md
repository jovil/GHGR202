# GHGR202 Ghost theme
[![Build Status](http://img.shields.io/travis/Kikobeats/uno-zen/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/uno-zen)
[![Ghost version](https://img.shields.io/badge/Ghost-3.x-brightgreen.svg)](https://github.com/TryGhost/Ghost)
![Node version](https://img.shields.io/node/v/uno-zen.svg?style=flat-square)

A two column Ghost theme that display your posts in a fun Masonry Gallery that works straight out of the box.
Puts focus on the content and works seamlessly for both indiviuals and teams.

![ghsc201 theme for ghost](./screenshot.png)

Features:
- Support for different [languages](http://themes.ghost.org/docs/i18n#section-how-to-add-any-language)
- Responsive layout
- Primary Menu in Header
- Secondary Menu in Footer
- Infinite scroll
- Masonry layout [Colcade](https://github.com/desandro/colcade).
- Page for (Home, Post, Page, Author, Tag)
- Custom Page with Form
- Social Media
- Code syntax [Prismjs](http://prismjs.com/index.html#languages-list). Supports all syntax.

## Development

Requirements: [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com).

Install [Yarn](https://classic.yarnpkg.com/en/docs/cli/install/) dependencies:

	yarn install

Run development server:

	yarn dev

Compress and minify files into `dist/<theme-name>.zip`, which you can then upload to your site.

	yarn zip

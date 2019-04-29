# aaronloo.com

This repository contains the resources needed to run the static website on
https://aaronloo.com, leveraging [Github Pages](https://pages.github.com/).

All site resources are found under `/docs`, since that's the [only way that
GitHub will support nested source directories](https://help.github.com/en/articles/configuring-a-publishing-source-for-github-pages#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch).
Furthermore, I wanted to keep my server root in a nested folder, so that Jekyll
doesn't accidentally, "magically" include files that I didn't want to be shared
on the website.

This allows me to also leverage top-level scripts to setup the development
environment; including installing Ruby gems into a virtual environment, and any
testing scripts that I might have.

## Local Development

To spin up a development server, simply enter:

```
make watch
```
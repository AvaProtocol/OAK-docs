# OAK-docs

This site was developed by [Ava Protocol](https://oak.tech).
## Installation

Install the dependencies with [Bundler](http://bundler.io/):

```bash
bundle install
```

Run the following to generate your site:
```bash
bundle exec jekyll serve
```

To upload a Jekyll site to a AWS S3, run the build command and copy the contents of the generated **_site** folder to the root folder of your hosting account. The `jekyll.environment == 'production'` flag will enable Google Analytics and page comments(currently not used)
```bash
JEKYLL_ENV=production jekyll build
``` 

You can find more on [Deployment Methods](https://jekyllrb.com/docs/deployment-methods/) page on Jekyll website.

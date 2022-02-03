# OAK-docs

This site was developed by [OAK Foundation](https://oak.tech).
## Installation

Install the dependencies with [Bundler](http://bundler.io/):

```bash
bundle install
```

Run the following to generate your site:
```bash
bundle exec jekyll serve
```

To upload a Jekyll site to a AWS S3, run the build command and copy the contents of the generated **_site** folder to the root folder of your hosting account. 
```bash
jekyll build
``` 

Currently this repo works with the following Ruby version:
```bash
➞  ruby -v

ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

You can find more on [Deployment Methods](https://jekyllrb.com/docs/deployment-methods/) page on Jekyll website.

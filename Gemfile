source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
# NOTE: Github Pages does not actively support any other plugins, besides
#       its default set. https://pages.github.com/versions/
# TODO: `autoprefixer` seems to be the way to go for cross-browser CSS compatibility.
#       However, it isn't supported by github pages. We might be able to migrate to
#       a TravisCI flow to build and deploy (https://docs.travis-ci.com/user/deployment/pages)
#       if we wanted to use it.
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?

# Patches to mitigate vulnerabilities
gem "nokogiri", ">= 1.10.8"
gem "rubyzip", ">= 1.3.0"

group :test do
  gem "rake", ">= 12.3.3"
  gem "html-proofer", "~> 3.10.2"
end

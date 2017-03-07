---
layout: post
title: "Reverting to Elixir in Laravel 5.4"
date: 2017-03-06 21:07:35 -0300
tags: php laravel elixir mix
published: true
---

Up to Laravel 5.3, the main tool for asset processing was Laravel Elixir, which provides a fluent API and sane defaults to compile the assets using Gulp. Starting with 5.4 however, Elixir was dropped in favor of Mix, which works on top of Webpack - helping a lot when using React or Vue on projects - and I feel it's a good step in the right direction (Rails 5.1 supports Webpack as well, for example).

However, if you have a rather legacy codebase or you're working on a project with a heavy number of JQuery plugins, Webpack can be a bit of a pain in the ass. I've been working on an admin interface project that used a paid theme; and these use a lot of JQuery plugins to handle graphs, animations and other UX shenanigans. It looked great, but often times these plugins expect some global object definitions, so I had to `require()` some plugins, add `<script>` tags for others and in some extreme cases concatenate with my own code.

I decided to revert to Elixir and run with Gulp's simpler way of handling things. It was rather straightforward, I just switched `laravel-mix` for `laravel-elixir` in the `package.json` and added a `gulpfile.js` to the repo (removing `webpack.mix.js` as well). In the end the `package.json` looks like this:

{% highlight json %}
{
  "private": true,
  "scripts": {
    "watch": "gulp && gulp watch",
    "production": "gulp --production"
  },
  "dependencies": {
    ...
    "gulp": "^3.9.1",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "laravel-elixir": "5.0.0",
    ...
  }
}
{% endhighlight %}

Run `npm install` and compile stuff with `npm run watch`.

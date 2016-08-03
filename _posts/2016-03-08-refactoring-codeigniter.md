---
layout: post
title: "Refactoring CodeIgniter to Laravel"
date: 2016-03-08 10:03:35 -0300
tags: php codeigniter laravel refactor
published: false
---
I've been working with a lot of CodeIgniter legacy projects in recent years, and after getting acquainted with Laravel and Django, going back to CI is a lot harder. When coming back to one of those codebases, the first thing that comes to mind is nuke the project from orbit and start over with a better framework and understanding. However, sometimes it isn't feasible to do a full rewrite, but we can do it step by step. In this article I'll discuss how best to do this.

## Why?

Laravel has many features that CodeIgniter lacks. We can't collaborate with other developers as easily in CI as we can in Laravel - for instance, migrations feel like an afterthought in CI and we often have to write some tooling code to make it work - not to mention several out of the box goodies such as database seeding, authentication, token validation, and overall good object oriented PHP code. Laravel also isn't tightly coupled with other components, making heavy use of dependency injection, creating a flexible and testable framework.

## How?

What I thought, initially, was to implement a middleware in Laravel that could redirect 404 responses to CodeIgniter. That didn't work due to the fact that I had to manually redirect full payload + headers to a certain URL. It wasn't impossible, but I would need a huge list of redirections.
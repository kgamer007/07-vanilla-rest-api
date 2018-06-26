[![Build Status](https://travis-ci.org/kgamer007/07-vanilla-rest-api.svg?branch=master)](https://travis-ci.org/kgamer007/07-vanilla-rest-api)

![cf](https://i.imgur.com/7v5ASc8.png) Lab 07: Vanilla HTTP Server
======

## http server
In this assignment, we use a server module that is responsible for creating a http server. Route behavior should be defined and exports an interface with a start and stop server method.

## HTTPie commands 
```http POST :3000/pathname name=yourName
http GET :3000/pathname text="foo"
```
## GET /
Make a GET request to the server and the server sends back html with a description and anchor to /cowsay.

## POST
User makes a POST request to /api/cowsay it sends back a JSON body that has content of cowsay.

## error with httpie package 
I couldn't get httpie to properly download it's packages onto my terminal?? tested with TA Noah but code is working.

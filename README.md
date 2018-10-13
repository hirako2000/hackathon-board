[![Build Status](https://travis-ci.org/hirako2000/hackathon-board.svg?branch=master)](https://travis-ci.org/hirako2000/hackathon-board)
[![Dependency Status](https://david-dm.org/hirako2000/hackathon-board.svg)](https://david-dm.org/hirako2000/hackathon-board)
[![devDependency Status](https://david-dm.org/hirako2000/hackathon-board/dev-status.svg)](https://david-dm.org/hirako2000/hackathon-board#info=devDependencies)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]()

Table of Contents
-----------------

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Obtaining API Keys](#obtaining-api-keys)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

Features
--------

- Local Authentication using Email and Password
- OAuth 1.0a Authentication via Twitter
- OAuth 2.0 Authentication via Facebook, Google, GitHub, LinkedIn, Instagram
- Flash notifications
- **Create hack**
  * Title
  * picture 
  * description
  * category
  * season
- **List hacks** 
- **Search**
  * By title
  * category
  * season
- **Join hack**
- **Add comments**
- **List prizes**
  * Name
  * picture
  * description
- **Rules page**  
- **User profile**
  * Gravatar
  * Profile Details
  * Change Password
  * Forgot Password
  * Reset Password
  * Link multiple OAuth strategies to one account
  * Delete Account
- CSRF protection
- **Admin**
  * Add/edit categories
  * Add/edit seasons
  * Add/Edit prize
  * Edit rules
  * Nominate hack
- **Beautifier**

Prerequisites
-------------

- [MongoDB](http://www.mongodb.org/downloads)
- [Node.js](http://nodejs.org)


Setup
-------------

```bash
# Get the latest code
$ git clone https://github.com/hirako2000/hackathon-board.git myproject
$ cd myproject
$ git remote rm origin

# Install NPM dependencies
$ npm install

$ node app.js
```

Obtaining API Keys
------------------

To use any of the included APIs or OAuth authentication methods, you will need
to obtain appropriate credentials: Client ID, Client Secret, API Key, or
Username & Password. You will need to go through each provider to generate new
credentials.

I have included dummy keys and passwords from **Hackathon Starter ** . But don't forget to update
them with *your credentials* when you are ready to deploy an app.
https://github.com/sahat/hackathon-starter

FAQ
---
- Admin user?
Starting with 1.0.2, the first user to signup with email/passowrd becomes admin.
Admin users can make other users admin in the admin users page.

Contributing
------------

If something is unclear, confusing, or needs to be refactored, please let me know.
Pull requests are always welcome, but due to the opinionated nature of this
project, I cannot accept every pull request. Please open an issue before
submitting a pull request. This project uses
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with a
few minor exceptions. If you are submitting a pull request that involves
Jade templates, please make sure you are using *spaces*, not tabs.

License
-------

The MIT License (MIT)

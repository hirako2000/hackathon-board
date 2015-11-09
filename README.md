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
- ** Rules page**  
- ** User profile**
 - Gravatar
 - Profile Details
 - Change Password
 - Forgot Password
 - Reset Password
 - Link multiple OAuth strategies to one account
 - Delete Account
- CSRF protection
- ** Admin **
 - Add/edit categories
 - Add/edit seasons
 - Add/Edit prize
 - Edit rules
 - Nominate hack

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

In order to use sass css, install node-sass

```bash
# npm install --save node-sass
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

Copyright (c) 2014-2015 Sahat Yalkabov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


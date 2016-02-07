/**
  * IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT
  *
  * You should never commit this file to a public repository on GitHub!
  * All public code on GitHub can be searched, that means anyone can see your
  * uploaded email.js file.
  *
  * I did it for your convenience using "throw away" configurations
  * that all features could work out of the box.
  *
  * Use config vars (environment variables) below for production values has a way
  * for you to set it up from the dashboard.
  *
  * Another added benefit of this approach is that you can use two different
  * sets of keys for local development and production mode without making any
  * changes to the code.

  * IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT
  */
module.exports = {
    config: {
        from: process.env.MAILER_FROM || 'no-reply@github.com/hirako2000/hackathon-board.io'
    }
};
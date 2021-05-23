# Lab8_Starter

### Name: Caroline Xiong
## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
   
   * Answer: 1.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

   * Answer: I would not use a unit test to test the "message" feature of a messaging application because the "message" feature is a complex feature with many parts in it that should all be tested individually to form the "message" feature.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
   
   * Answer: I would use a unit test to test the “max message length” feature of a messaging application because it is a relatively simple component of the "message" feature as a whole. Since unit testing is best for testing individual components within a moving application, unit testing would be fitting in this scenario.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
   
   * Answer: I expect that the tests will not drive the browser and just run the tests without a browser interface.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

   * Answer: If you can't use page.goto() then you can use `await page.click('header > img')` to navigate to the settings page.
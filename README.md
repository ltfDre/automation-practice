# Automation Practice
- The test at the given URL consists of three steps:
- The first step, when the user reached the related URL on the website, the user process of the register is completed to this website
- After the process of the register has been completed, user choose the which item her/his want and add the basket
- The last step, after when user choose the item,it is controlled that whether item or items are same as like on the basket, then the order is completed

- [Test Screen Record](https://drive.google.com/open?id=1HpxmFUMfEaWw9My6IQ5UX-pMIWoqe16j)

## Requirements
- Node 10
- Npm 6
- Chrome
- Note: The chromedriver in package.json is should be same as the chrome version on your system

## Project Setup
```
npm install
npm run test
```

## The Test Improvements
- Using id (#) instead of class (.) selectors.
- Names to be given to selectors should be made semantic.
- Monitoring of tests in CI environment




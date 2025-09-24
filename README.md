# Testathon-BrowserStack-ChennaiChamps

## Project Overview

**Testathon-BrowserStack-ChennaiChamps** is a comprehensive end-to-end test automation framework built with Playwright and TypeScript, integrated with BrowserStack for cross-browser testing. This project was developed as part of a testing competition (Testathon) by the Chennai Champs team.

## Features

- **E-commerce Testing Suite**: Complete test coverage for testathon.live shopping platform
- **Cross-Browser Testing**: BrowserStack integration for multi-browser/device testing
- **Parallel Execution**: Optimized test execution with parallel mode
- **Dynamic Data Validation**: Extract and validate dynamic content (prices, quantities, order numbers)
- **Comprehensive Scenarios**: Login, Product Search, Cart Management, Checkout, and Favorites

## Technology Stack

- **Framework**: Playwright with TypeScript
- **Cloud Testing**: BrowserStack
- **Test Runner**: Playwright Test Runner
- **Architecture**: Page Object Model with custom fixtures
- **Language**: TypeScript

## Test Scenarios

### 1. Login Scenarios (`@LogInScenario`)
- Valid credentials login/logout
- Invalid credentials handling
- Account lockout scenarios
- Redirect validation

### 2. Product Search (`@ProductSearch`)
- Apple, Samsung, Google product filtering
- Product count validation
- Dynamic product list verification
- Filter selection/deselection

### 3. Add to Cart (`@AddToCart`)
- Product addition with quantity management
- Price calculation validation
- Cart item removal
- Dynamic price updates

### 4. Checkout Process (`@CheckOut`)
- End-to-end purchase flow
- Order confirmation validation
- Dynamic order number extraction
- Receipt generation verification
- Favorites functionality

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Configuration

### BrowserStack Setup
Update `browserstack.yml` with your credentials:
```yaml
userName: your-username
accessKey: your-access-key
projectName: Chennai Champs
buildName: "Testathon"
```

### Supported Browsers
- Chrome on Windows 11
- WebKit on macOS Monterey

## Execution

### Local Execution
```bash
# Run all tests locally
npm run test:e2e

# Run specific test suites
npm run test:login
```

### BrowserStack Execution
```bash
# Run all scenarios on BrowserStack
npm run test:all-scenarios

# Run specific test suites on BrowserStack
npm run test:login-browserstack
npm run test:addtocart-browserstack
npm run test:checkout-browserstack
npm run test:search-browserstack
```

### Tagged Execution
```bash
# Run specific tags
npx playwright test --grep @LogInScenario
npx playwright test --grep @ProductSearch
npx playwright test --grep @AddToCart
npx playwright test --grep @CheckOut
```

## Key Features

### Dynamic Data Extraction
- **Price Validation**: Extract and validate prices from different page elements
- **Quantity Management**: Dynamic quantity extraction and validation
- **Order Numbers**: Capture and validate dynamically generated order numbers
- **Product Lists**: Extract and verify product names from search results

### Robust Locators
- **Multiple Locator Strategies**: CSS selectors, XPath, role-based, and text-based locators
- **Dynamic Content Handling**: Wait strategies for dynamic content loading
- **Cross-browser Compatibility**: Locators tested across different browsers

### Error Handling
- **Timeout Management**: Configurable timeouts for different scenarios
- **Retry Logic**: Built-in retry mechanisms for flaky elements
- **Detailed Logging**: Comprehensive console logging for debugging

## Project Structure

```
testathon-browserstack-project/
├── tests/
│   ├── fixture/
│   │   └── basePage.ts
│   └── spec/
│       ├── LogIn Test Scenarios.spec.ts
│       ├── ProductSearch Test Scenarios.spec.ts
│       ├── AddToCart Test Scenarios.spec.ts
│       └── CheckOut Test Scenarios.spec.ts
├── browserstack.yml
├── playwright.config.ts
└── package.json
```

## Reporting

Test results are automatically generated and can be viewed:
- **Local**: Playwright HTML reports
- **BrowserStack**: Dashboard with video recordings and logs

## Best Practices Implemented

- **Page Object Model**: Organized and maintainable test structure
- **Custom Fixtures**: Reusable components across test suites
- **Parallel Execution**: Optimized test execution time
- **Dynamic Validation**: Real-time data extraction and validation
- **Cross-browser Testing**: Comprehensive browser coverage
- **Detailed Assertions**: Meaningful test validations with proper error messages

## Known Issues

The following defects have been identified in the testathon.live application during testing:

### 1. Authentication Issues
- **Login Password Validation**: System displays "Invalid Username" error message even when password is incorrect
- **Impact**: Misleading error messages for users during login attempts

### 2. Product Filter Issues
- **OnePlus Filter**: Selecting OnePlus filter displays all products instead of filtering OnePlus-specific items
- **Impact**: Product filtering functionality not working as expected

### 3. Add to Cart Functionality
- **Specific Product Issues**: Unable to add certain products to cart (iPhone 12 Pro, iPhone XR)
- **Impact**: Users cannot purchase specific high-value products

### 4. Form Validation Issues
- **Address Validation**: System accepts invalid/incomplete addresses during checkout
- **Impact**: Potential delivery issues due to inadequate address validation

### 5. Receipt Download Issues
- **Download Functionality**: Order receipt download feature is not functional
- **Impact**: Users cannot obtain proof of purchase documentation

### Test Coverage

Despite these known issues, the test framework provides comprehensive coverage and can be used to:
- Validate fixes when issues are resolved
- Perform regression testing
- Monitor application stability
- Generate detailed test reports

## Team

**Chennai Champs** - Testathon Competition Team

## License

ISC License
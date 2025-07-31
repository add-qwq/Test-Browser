# Test-Browser
# 浏览器特性检测工具

## English

### Test-Browser

A lightweight JavaScript library for detecting modern browser features and compatibility, helping web projects ensure users are using supported browsers with necessary capabilities.

![GitHub license](https://img.shields.io/github/license/add-qwq/Test-Browser?style=flat-square)

This library checks for essential modern browser features (such as fetch, Promise, and localStorage) and provides utilities to handle unsupported browsers by redirecting users to upgrade pages. It also includes device type detection (mobile/desktop) and persistent tracking of upgrade prompts.

### Key Features

- **Modern Browser Detection**: Checks for support of core web features required by modern web applications
- **Device Type Identification**: Distinguishes between mobile and desktop devices
- **Unsupported Browser Handling**: Automatically redirects users with incompatible browsers to upgrade pages
- **Persistent Prompt Tracking**: Uses localStorage to track upgrade prompts (30-day expiration by default)
- **Compatibility Logging**: Sends browser incompatibility data to a specified API endpoint
- **No Dependencies**: Lightweight and self-contained, requiring no external libraries

### Core Detected Features

Test-Browser verifies support for the following critical web features:

- Fundamental APIs: fetch, Promise, URLSearchParams, JSON (parse/stringify)
- DOM capabilities: classList, getBoundingClientRect, dispatchEvent, closest, addEventListener
- Storage: localStorage, sessionStorage, cookie support
- Advanced features: IntersectionObserver, AbortController, XMLHttpRequest, FormData
- Clipboard access: ClipboardItem, execCommand('copy'), navigator.clipboard
- CSS features: backdrop-filter (including webkit prefix), gradient support
- Network: Form data handling, request/response capabilities

### Usage

#### Basic Integration

1. Include the test-browser.js script in your project:
   ```html
   <script src="path/to/test-browser.js"></script>
   ```

2. The library automatically initializes on DOMContentLoaded (except for localhost environments) and checks browser compatibility. No additional setup is required for basic functionality.

#### Advanced Usage

##### Check Browser Modernity Manually
```javascript
// Check if the current browser supports modern features
const isCompatible = isModernBrowser();
console.log('Is modern browser:', isCompatible);
```

##### Detect Device Type
```javascript
// Check if the current device is mobile
const isMobile = isMobileDevice();
console.log('Is mobile device:', isMobile);
```

##### Reset Upgrade Prompt Status
```javascript
// Clear the 30-day prompt tracking and redirect back
resetBrowserUpgradePrompt();
```

### API Reference

#### isModernBrowser()
Returns true if the browser supports all detected modern features, false otherwise.

#### isMobileDevice()
Returns true if the user agent indicates a mobile device (Android, iOS, etc.), false for desktop.

#### handleUnsupportedBrowser()
Triggers the unsupported browser workflow:
- Stores the current URL in localStorage for later redirection
- Marks the upgrade prompt as shown (with 30-day expiration)
- Logs compatibility data to /api/log-incompatible-browser
- Redirects to mobile/desktop-specific upgrade pages

#### resetBrowserUpgradePrompt()
Clears the upgrade prompt tracking in localStorage and redirects to the originally stored URL (or homepage).

### Compatibility

Test-Browser itself is compatible with all browsers that support basic JavaScript (ES5+). It is designed to run even in older browsers to properly detect their capabilities and guide users to upgrade.

### License

This project is licensed under the [Apache License 2.0](LICENSE).

---

## 中文

### 浏览器特性检测工具

一个轻量级JavaScript库，用于检测现代浏览器特性和兼容性，帮助Web项目确保用户使用的浏览器支持必要功能。

![GitHub license](https://img.shields.io/github/license/add-qwq/Test-Browser?style=flat-square)

该库检查现代浏览器的核心特性（如fetch、Promise和localStorage），并提供工具处理不兼容浏览器，将用户引导至升级页面。它还包括设备类型检测（移动/桌面）和升级提示的持久化跟踪功能。

### 核心功能

- **现代浏览器检测**：检查现代Web应用所需的核心Web特性支持情况
- **设备类型识别**：区分移动设备和桌面设备
- **不兼容浏览器处理**：自动将使用不兼容浏览器的用户重定向到升级页面
- **提示状态持久化**：使用localStorage跟踪升级提示（默认30天有效期）
- **兼容性日志**：将浏览器不兼容数据发送到指定API端点
- **无依赖**：轻量级且独立，无需外部库

### 检测的核心特性

Test-Browser验证以下关键Web特性的支持情况：

- 基础API：fetch、Promise、URLSearchParams、JSON（parse/stringify）
- DOM能力：classList、getBoundingClientRect、dispatchEvent、closest、addEventListener
- 存储：localStorage、sessionStorage、Cookie支持
- 高级特性：IntersectionObserver、AbortController、XMLHttpRequest、FormData
- 剪贴板访问：ClipboardItem、execCommand('copy')、navigator.clipboard
- CSS特性：backdrop-filter（包括webkit前缀）、渐变支持
- 网络：表单数据处理、请求/响应能力

### 使用方法

#### 基本集成

1. 在项目中引入test-browser.js脚本：
   ```html
   <script src="path/to/test-browser.js"></script>
   ```

2. 库会在DOMContentLoaded时自动初始化（localhost环境除外）并检查浏览器兼容性。基本功能无需额外设置。

#### 高级用法

##### 手动检查浏览器现代性
```javascript
// 检查当前浏览器是否支持现代特性
const isCompatible = isModernBrowser();
console.log('是否为现代浏览器:', isCompatible);
```

##### 检测设备类型
```javascript
// 检查当前设备是否为移动设备
const isMobile = isMobileDevice();
console.log('是否为移动设备:', isMobile);
```

##### 重置升级提示状态
```javascript
// 清除30天提示跟踪并返回原页面
resetBrowserUpgradePrompt();
```

### API参考

#### isModernBrowser()
如果浏览器支持所有检测的现代特性，返回true，否则返回false。

#### isMobileDevice()
如果用户代理表明是移动设备（Android、iOS等），返回true，桌面设备返回false。

#### handleUnsupportedBrowser()
触发不兼容浏览器处理流程：
- 将当前URL存储在localStorage中以备后续重定向
- 标记升级提示已显示（30天有效期）
- 将兼容性数据记录到/api/log-incompatible-browser
- 重定向到移动/桌面专用升级页面

#### resetBrowserUpgradePrompt()
清除localStorage中的升级提示跟踪，并重定向到原始存储的URL（或首页）。

### 兼容性说明

Test-Browser本身兼容所有支持基础JavaScript（ES5+）的浏览器。它设计为即使在旧浏览器中也能运行，以正确检测其功能并引导用户升级。

### 许可证

本项目采用[Apache License 2.0](LICENSE)授权。

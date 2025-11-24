# Test-Browser
# 浏览器兼容性检测工具

## English

### Test-Browser

A lightweight browser compatibility detection tool that checks for modern web features support, handles unsupported browsers, and logs compatibility issues. It ensures web applications run smoothly by guiding users with incompatible browsers to upgrade.

![GitHub license](https://img.shields.io/github/license/add-qwq/Test-Browser?style=flat-square)

This tool automatically detects browser support for essential web features, distinguishes between mobile and desktop devices, and redirects users with unsupported browsers to appropriate upgrade pages. It also tracks upgrade prompts using localStorage and logs compatibility data to a server endpoint.

### Key Features

- **Dual-layer Browser Detection**: Validates support for core modern web features and auxiliary browser capabilities
- **Device Type Recognition**: Identifies mobile and desktop devices via user-agent
- **Unsupported Handling**: Automatically redirects to device-specific upgrade pages
- **Prompt Tracking**: Uses localStorage to track upgrade prompts (30-day expiration)
- **Compatibility Logging**: Sends detailed compatibility data to a server endpoint
- **Automatic Initialization**: Runs detection on DOM content loaded (skips localhost)
- **Dependency-free**: Lightweight implementation with no external dependencies

### Detected Features

Test-Browser performs a dual-layer check for browser compatibility:

#### Core API Checks
- Proxy API
- Array.prototype.findLast
- CSS contentVisibility property

#### Auxiliary Feature Checks
- **Core APIs**: fetch, Promise, URLSearchParams, JSON (parse/stringify)
- **DOM Features**: classList, getBoundingClientRect, dispatchEvent, closest, addEventListener
- **Storage Capabilities**: localStorage, sessionStorage, cookie manipulation, SameSite cookie support
- **Data Handling**: FormData (creation and manipulation)
- **Clipboard Access**: ClipboardItem, execCommand('copy'), navigator.clipboard
- **Advanced APIs**: IntersectionObserver, AbortController, XMLHttpRequest, requestAnimationFrame
- **Network**: fetch functionality with URLSearchParams
- **CSS**: backdrop-filter (including -webkit prefix), gradient support

### Usage

#### Basic Integration

1. Include the JavaScript file in your project:
   ```html
   <script src="path/to/Test-Browser.js"></script>
   ```

2. Deploy the PHP log handler (Test-Browser-log-handler.php) on your server at /Test-Browser/ path.

3. The tool initializes automatically when the DOM content loads (except in localhost environments). No additional configuration is required.

#### Advanced Usage

##### Manual Browser Check
```javascript
// Check if browser supports core APIs
const isCoreSupported = checkCoreBrowserSupport();
console.log('Core API support:', isCoreSupported);

// Check auxiliary browser features
const { isSupported: isAuxSupported, unsupportedReasons } = checkAuxBrowserFeatures();
console.log('Auxiliary feature support:', isAuxSupported);
console.log('Unsupported features:', unsupportedReasons);
```

##### Device Type Detection
```javascript
// Check if device is mobile
const deviceType = getDeviceType();
console.log('Device type:', deviceType); // 'mobile' or 'pc'
```

##### Reset Upgrade Prompt
```javascript
// Reset upgrade prompt status and return to original URL
resetBrowserUpgradePrompt();
```

### API Reference

#### checkCoreBrowserSupport()
Checks support for essential modern web APIs (Proxy, Array.prototype.findLast, CSS contentVisibility).
Returns true if all core APIs are supported, false otherwise.

#### checkAuxBrowserFeatures()
Checks support for auxiliary browser features and returns an object with:
- isSupported: Boolean indicating if all features are supported
- unsupportedReasons: Array of strings describing unsupported features

#### getDeviceType()
Returns 'mobile' for mobile user-agents (Android, iOS, etc.), 'pc' for desktop.

#### handleUnsupportedBrowser(coreReasons, auxReasons)
Handles unsupported browser workflow:
- Stores current URL in localStorage for later redirection
- Marks upgrade prompt as shown (30-day expiration)
- Sends compatibility data to /Test-Browser/Test-Browser-log-handler.php
- Redirects to device-specific upgrade page (/upgrade-your-browser/Update-Pe-browser.html for mobile, /upgrade-your-browser/Update-Pc-browser.html for desktop)

#### resetBrowserUpgradePrompt()
Clears upgrade prompt tracking from localStorage and redirects to the originally stored URL (or homepage).

#### checkPromptStatus()
Checks if the user has been prompted before and if the prompt has expired.
Returns an object with hasBeenPrompted and isExpired properties.

#### reportUnsupportedLog(allReasons, deviceType)
Sends detailed compatibility data to the server log handler as a JSON payload.

#### Server-side Log Handler
Test-Browser-log-handler.php receives POST requests with compatibility data and appends formatted logs to /Test-Browser/Test-Browser.log. It validates request methods and required fields before logging.

### Compatibility

Test-Browser works with all browsers supporting ES5+ JavaScript (IE9+ and modern browsers). It is designed to run in older browsers to accurately detect their capabilities.

### License

This project is licensed under the [Apache License 2.0](LICENSE).

---

## 中文

### 浏览器兼容性检测工具

一个轻量级浏览器兼容性检测工具，用于检查现代Web特性支持情况、处理不兼容浏览器并记录兼容性问题。通过引导使用不兼容浏览器的用户进行升级，确保Web应用平稳运行。

![GitHub license](https://img.shields.io/github/license/add-qwq/Test-Browser?style=flat-square)

该工具自动检测浏览器对核心Web特性的支持，区分移动设备和桌面设备，并将使用不支持浏览器的用户重定向到相应的升级页面。它还使用localStorage跟踪升级提示，并将兼容性数据记录到服务器端点。

### 核心功能

- **双层浏览器检测**：验证核心现代Web特性和辅助浏览器功能的支持情况
- **设备类型识别**：通过用户代理识别移动设备和桌面设备
- **不兼容处理**：自动重定向到设备专用升级页面
- **升级提示跟踪**：使用localStorage跟踪升级提示（30天有效期）
- **兼容性日志**：将详细兼容性数据发送到服务器端处理程序
- **自动初始化**：DOM内容加载时自动运行检测（跳过本地环境）
- **无依赖**：轻量级实现，无需外部依赖库

### 检测的特性

Test-Browser执行双层浏览器兼容性检查：

#### 核心API检查
- Proxy API
- Array.prototype.findLast
- CSS contentVisibility属性

#### 辅助特性检查
- **核心API**：fetch、Promise、URLSearchParams、JSON（parse/stringify）
- **DOM特性**：classList、getBoundingClientRect、dispatchEvent、closest、addEventListener
- **存储能力**：localStorage、sessionStorage、Cookie操作、SameSite cookie支持
- **数据处理**：FormData（创建和操作）
- **剪贴板访问**：ClipboardItem、execCommand('copy')、navigator.clipboard
- **高级API**：IntersectionObserver、AbortController、XMLHttpRequest、requestAnimationFrame
- **网络**：带URLSearchParams的fetch功能
- **CSS**：backdrop-filter（包括-webkit前缀）、渐变支持

### 使用方法

#### 基本集成

1. 在项目中引入JavaScript文件：
   ```html
   <script src="path/to/Test-Browser.js"></script>
   ```

2. 将PHP日志处理程序（Test-Browser-log-handler.php）部署在服务器的/Test-Browser/路径下。

3. 工具会在DOM内容加载时自动初始化（本地环境除外），无需额外配置。

#### 高级用法

##### 手动浏览器检查
```javascript
// 检查浏览器是否支持核心API
const isCoreSupported = checkCoreBrowserSupport();
console.log('核心API支持情况:', isCoreSupported);

// 检查辅助浏览器功能
const { isSupported: isAuxSupported, unsupportedReasons } = checkAuxBrowserFeatures();
console.log('辅助功能支持情况:', isAuxSupported);
console.log('不支持的功能:', unsupportedReasons);
```

##### 设备类型检测
```javascript
// 检查设备类型
const deviceType = getDeviceType();
console.log('设备类型:', deviceType); // 'mobile' 或 'pc'
```

##### 重置升级提示
```javascript
// 重置升级提示状态并返回原始URL
resetBrowserUpgradePrompt();
```

### API参考

#### checkCoreBrowserSupport()
检查核心现代Web API（Proxy、Array.prototype.findLast、CSS contentVisibility）的支持情况。
如果所有核心API都受支持，返回true，否则返回false。

#### checkAuxBrowserFeatures()
检查辅助浏览器功能的支持情况，并返回一个包含以下属性的对象：
- isSupported：布尔值，表示是否支持所有功能
- unsupportedReasons：描述不支持功能的字符串数组

#### getDeviceType()
对于移动设备用户代理（Android、iOS等）返回'mobile'，桌面设备返回'pc'。

#### handleUnsupportedBrowser(coreReasons, auxReasons)
处理不支持的浏览器流程：
- 将当前URL存储在localStorage中以备后续重定向
- 标记升级提示已显示（30天有效期）
- 将兼容性数据发送到/Test-Browser/Test-Browser-log-handler.php
- 重定向到设备专用升级页面（移动设备为/upgrade-your-browser/Update-Pe-browser.html，桌面设备为/upgrade-your-browser/Update-Pc-browser.html）

#### resetBrowserUpgradePrompt()
清除localStorage中的升级提示跟踪，并将重定向到原始存储的URL（或首页）。

#### checkPromptStatus()
检查用户之前是否已收到提示以及提示是否已过期。
返回一个包含hasBeenPrompted和isExpired属性的对象。

#### reportUnsupportedLog(allReasons, deviceType)
将详细的兼容性数据作为JSON负载发送到服务器日志处理程序。

#### 服务器端日志处理程序
Test-Browser-log-handler.php接收包含兼容性数据的POST请求，并将格式化的日志追加到/Test-Browser/Test-Browser.log。它在记录前验证请求方法和必需字段。

### 兼容性说明

Test-Browser兼容所有支持ES5+ JavaScript的浏览器（IE9+和现代浏览器）。它设计为在旧浏览器中也能运行，以准确检测其功能。

### 许可证

本项目采用[Apache License 2.0](LICENSE)授权。

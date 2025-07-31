# Test-Browser
# 浏览器兼容性检测工具

## English

### Test-Browser

A lightweight browser compatibility detection tool that checks for modern web features support, handles unsupported browsers, and logs compatibility issues. It ensures web applications run smoothly by guiding users with incompatible browsers to upgrade.

![GitHub license](https://img.shields.io/github/license/add-qwq/Test-Browser?style=flat-square)

This tool automatically detects browser support for essential web features, distinguishes between mobile and desktop devices, and redirects users with unsupported browsers to appropriate upgrade pages. It also tracks upgrade prompts using localStorage and logs compatibility data to a server endpoint.

### Key Features

- **Modern Browser Detection**: Validates support for core modern web features
- **Device Type Recognition**: Identifies mobile and desktop devices via user-agent
- **Unsupported Handling Handling**: Automatically redirects to device-specific upgrade pages
- **Prompt Prompt Tracking Prompt Tracking Prompt Tracking**: Uses localStorage to track upgrade prompts (30-day expiration)
- **Compatibility Logging**: Sends detailed compatibility data to a server-side handler
- **Automatic Initialization**: Runs detection on DOM content loaded (skips localhost)
- **Detailed Dependency-free**: Lightweight implementation with no external dependencies

### Detected Features

Test-Browser checks for support for the following critical features:

- **Core APIs**: fetch, Promise, URLSearchParams, JSON (parse/stringify)
- **DOM Features**: classList, getBoundingClientRect, dispatchEvent, closest, addEventListener
- **Storage Capabilities**: localStorage, sessionStorage, cookie manipulation, SameSite cookie support
- **Data Handling**: FormData (creation and manipulation)
- **Clipboard Access**: ClipboardItem, execCommand('copy'), navigator.clipboard
- **Advanced APIs**: IntersectionObserver, AbortController, XMLHttpRequest
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
// Check if browser supports all modern features
const isModern = isModernBrowser();
console.log('Is modern browser:', isModern);
```

##### Get Unsupported Reasons
```javascript
// Get specific reasons for incompatibility
const reasons = getUnsupportedReasons();
console.log('Unsupported features:', reasons);
```

##### Device Type Detection
```javascript
// Check if device is mobile
const isMobile = isMobileDevice();
console.log('Is mobile device:', isMobile);
```

##### Reset Upgrade Prompt
```javascript
// Reset upgrade prompt status and return to original URL
resetBrowserUpgradePrompt();
```

### API Reference

#### isModernBrowser()
Returns true if the browser supports all required modern features, false otherwise.

#### getUnsupportedReasons()
Returns an array of strings describing specific features that are unsupported.

#### isMobileDevice()
Returns true for mobile user-agents (Android, iOS, etc.), false for desktop.

#### handleUnsupportedBrowser(unsupportedReasons)
Handles unsupported browser workflow:
- Stores current URL in localStorage for later redirection
- Marks upgrade prompt as shown (30-day expiration)
- Sends compatibility data to /Test-Browser/Test-Browser-log-handler
- Redirects to device-specific upgrade page (/upgrade-your-browser/Update-Pe-browser.html for mobile, /upgrade-your-browser/Update-Pc-browser.html for desktop)

#### resetBrowserUpgradePrompt()
Clears upgrade prompt tracking from localStorage and redirects to the originally stored URL (or homepage).

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

- **现代浏览器检测**：验证核心现代Web特性的支持情况
- **设备类型识别**：通过用户代理识别移动设备和桌面设备
- **不兼容处理**：自动重定向到设备专用升级页面
- **升级提示跟踪**：使用localStorage跟踪升级提示（30天有效期）
- **兼容性日志**：将详细兼容性数据发送到服务器端处理程序
- **自动初始化**：DOM内容加载时自动运行检测（跳过本地环境）
- **无依赖**：轻量级实现，无需外部依赖库

### 检测的特性

Test-Browser检查以下关键特性的支持情况：

- **核心API**：fetch、Promise、URLSearchParams、JSON（parse/stringify）
- **DOM特性**：classList、getBoundingClientRect、dispatchEvent、closest、addEventListener
- **存储能力**：localStorage、sessionStorage、Cookie操作、SameSite cookie支持
- **数据处理**：FormData（创建和操作）
- **剪贴板访问**：ClipboardItem、execCommand('copy')、navigator.clipboard
- **高级API**：IntersectionObserver、AbortController、XMLHttpRequest
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
// 检查浏览器是否支持所有现代特性
const isModern = isModernBrowser();
console.log('是否为现代浏览器:', isModern);
```

##### 获取不支持的原因
```javascript
// 获取不兼容的具体原因
const reasons = getUnsupportedReasons();
console.log('不支持的特性:', reasons);
```

##### 设备类型检测
```javascript
// 检查设备是否为移动设备
const isMobile = isMobileDevice();
console.log('是否为移动设备:', isMobile);
```

##### 重置升级提示
```javascript
// 重置升级提示状态并返回原始URL
resetBrowserUpgradePrompt();
```

### API参考

#### isModernBrowser()
如果浏览器支持所有必需的现代特性，返回true，否则返回false。

#### getUnsupportedReasons()
返回描述不支持的具体特性的字符串数组。

#### isMobileDevice()
对于移动设备用户代理（Android、iOS等）返回true，桌面设备返回false。

#### handleUnsupportedBrowser(unsupportedReasons)
处理不支持的浏览器流程：
- 将当前URL存储在localStorage中以备后续重定向
- 标记升级提示已显示（30天有效期）
- 将兼容性数据发送到/Test-Browser/Test-Browser-log-handler
- 重定向到设备专用升级页面（移动设备为/upgrade-your-browser/Update-Pe-browser.html，桌面设备为/upgrade-your-browser/Update-Pc-browser.html）

#### resetBrowserUpgradePrompt()
清除localStorage中的升级提示跟踪，并将重定向到原始存储的URL（或首页）。

#### 服务器端日志处理程序
Test-Browser-log-handler.php接收包含兼容性数据的POST请求，并将格式化的日志追加到/Test-Browser/Test-Browser.log。它在记录前验证请求方法和必需字段。

### 兼容性说明

Test-Browser兼容所有支持ES5+ JavaScript的浏览器（IE9+和现代浏览器）。它设计为在旧浏览器中也能运行，以准确检测其功能。

### 许可证

本项目采用[Apache License 2.0](LICENSE)授权。

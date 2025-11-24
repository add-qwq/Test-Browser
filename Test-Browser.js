function checkCoreBrowserSupport() {
    let isCoreSupport = true;
    const testElement = document.createElement('div');

    const coreAPIChecks = [
        { check: () => typeof window.Proxy !== 'undefined', name: 'Proxy' },
        { check: () => typeof Array.prototype.findLast !== 'undefined', name: 'Array.findLast' },
        { check: () => typeof testElement.style.contentVisibility !== 'undefined', name: 'CSS contentVisibility' }
    ];

    coreAPIChecks.forEach(({ check, name }) => {
        if (!check()) {
            console.warn(`核心API不支持：${name}`);
            isCoreSupport = false;
        }
    });

    return isCoreSupport;
}

function checkAuxBrowserFeatures() {
    const reasons = [];
    const testEl = document.createElement('_');

    if (!('fetch' in window)) reasons.push('缺少fetch API');
    if (!('Promise' in window)) reasons.push('缺少Promise支持');
    if (!('URLSearchParams' in window)) reasons.push('缺少URLSearchParams');
    if (!testEl.classList) reasons.push('不支持classList');
    if (!('localStorage' in window)) reasons.push('不支持localStorage');
    if (!('sessionStorage' in window)) reasons.push('不支持sessionStorage');
    if (!('requestAnimationFrame' in window)) reasons.push('缺少requestAnimationFrame');
    if (!('JSON' in window) || typeof JSON.parse !== 'function' || typeof JSON.stringify !== 'function') reasons.push('JSON功能异常');
    if (!('getBoundingClientRect' in testEl)) reasons.push('缺少getBoundingClientRect');
    if (!('dispatchEvent' in testEl)) reasons.push('缺少dispatchEvent');
    if (!('closest' in testEl)) reasons.push('缺少closest方法');
    if (!('addEventListener' in window)) reasons.push('缺少addEventListener');

    let cookieOk = false;
    try {
        document.cookie = 'test_cookie=1; path=/';
        cookieOk = document.cookie.indexOf('test_cookie=') !== -1;
        document.cookie = 'test_cookie=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    } catch (e) { }
    if (!cookieOk) reasons.push('Cookie操作失败');

    let sameSiteOk = false;
    try {
        const response = new Response();
        response.headers.append('Set-Cookie', 'foo=bar; SameSite=Lax');
        sameSiteOk = true;
    } catch (e) { }
    if (!sameSiteOk) reasons.push('不支持SameSite Cookie');

    if (!('FormData' in window)) {
        reasons.push('缺少FormData');
    } else {
        let formDataOk = false;
        try {
            const fd = new FormData();
            fd.append('t', '1');
            formDataOk = fd.has('t');
        } catch (e) { }
        if (!formDataOk) reasons.push('FormData功能异常');
    }

    const copyOk = ('ClipboardItem' in window) || ('execCommand' in document && document.queryCommandSupported('copy') && 'clipboard' in navigator);
    if (!copyOk) reasons.push('剪贴板功能异常');

    if (!('IntersectionObserver' in window)) reasons.push('缺少IntersectionObserver');
    if (!('AbortController' in window)) reasons.push('缺少AbortController');
    if (!('XMLHttpRequest' in window)) reasons.push('缺少XMLHttpRequest');

    let fetchOk = false;
    try {
        const params = new URLSearchParams();
        params.append('t', '123');
        if (params.toString() === 't=123') {
            const ft = fetch('#', { method: 'POST', body: params });
            fetchOk = ft instanceof Promise;
        }
    } catch (e) { }
    if (!fetchOk) reasons.push('fetch功能异常');

    const style = document.createElement('div').style;
    const cssOk = ('backdropFilter' in style) || ('-webkit-backdrop-filter' in style) || ('gradient' in style.background);
    if (!cssOk) reasons.push('CSS特性不支持（backdrop-filter/gradient）');

    return {
        isSupported: reasons.length === 0,
        unsupportedReasons: reasons
    };
}

function getDeviceType() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        ? 'mobile'
        : 'pc';
}

function checkPromptStatus() {
    const hasBeenPrompted = localStorage.getItem('browserUpgradePrompted') === 'true';
    const expires = localStorage.getItem('browserUpgradePromptExpires');
    const isExpired = expires ? new Date(expires) < new Date() : false;
    return { hasBeenPrompted, isExpired };
}

function reportUnsupportedLog(allReasons, deviceType) {
    const logData = {
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        deviceType,
        unsupportedReasons: allReasons,
        checkType: { core: '核心API检测', aux: '辅助特性检测' }
    };

    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/Test-Browser/Test-Browser-log-handler.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            console.log('日志上报状态：', xhr.status);
            resolve();
        };
        xhr.onerror = () => {
            console.error('日志上报失败');
            resolve();
        };

        try {
            xhr.send(JSON.stringify(logData));
        } catch (e) {
            console.error('日志发送异常：', e);
            resolve();
        }
    });
}

async function handleUnsupportedBrowser(coreReasons, auxReasons) {
    const allReasons = [
        ...coreReasons.map(reason => `核心API：${reason}`),
        ...auxReasons.map(reason => `辅助特性：${reason}`)
    ];
    const deviceType = getDeviceType();

    localStorage.setItem('upgrade_redirect', window.location.href);
    localStorage.setItem('browserUpgradePrompted', 'true');
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    localStorage.setItem('browserUpgradePromptExpires', expirationDate.toISOString());

    await reportUnsupportedLog(allReasons, deviceType);
    const upgradeUrl = deviceType === 'mobile'
        ? '/upgrade-your-browser/Update-Pe-browser.html'
        : '/upgrade-your-browser/Update-Pc-browser.html';

    setTimeout(() => {
        window.location.href = upgradeUrl;
    }, 1000);
}

function resetBrowserUpgradePrompt() {
    localStorage.removeItem('browserUpgradePrompted');
    localStorage.removeItem('browserUpgradePromptExpires');
    window.location.href = localStorage.getItem('upgrade_redirect') || '/';
}

function initBrowserDetection() {
    if (window.location.hostname === 'localhost') {
        console.log('本地环境，跳过浏览器检测');
        return;
    }

    const isCoreSupported = checkCoreBrowserSupport();
    const coreReasons = isCoreSupported ? [] : ['Proxy', 'Array.findLast', 'CSS contentVisibility'].filter(api => {
        if (api === 'Proxy') return typeof window.Proxy === 'undefined';
        if (api === 'Array.findLast') return typeof Array.prototype.findLast === 'undefined';
        if (api === 'CSS contentVisibility') return typeof document.createElement('div').style.contentVisibility === 'undefined';
        return false;
    });

    const { isSupported: isAuxSupported, unsupportedReasons: auxReasons } = checkAuxBrowserFeatures();
    const allUnsupportedReasons = [...coreReasons, ...auxReasons];
    const isUnsupported = !isCoreSupported || !isAuxSupported;
    const { hasBeenPrompted, isExpired } = checkPromptStatus();
    const isTriggerHandle = (!hasBeenPrompted || isExpired) && isUnsupported;

    console.log('浏览器类型：', isUnsupported ? '非现代浏览器' : '现代浏览器');
    if (isUnsupported) {
        console.log('不支持的原因：', allUnsupportedReasons);
    }
    console.log('是否已提示过：', hasBeenPrompted);
    console.log('提示是否过期：', isExpired);
    console.log('是否触发处理：', isTriggerHandle);

    if (isTriggerHandle) {
        console.log('进入handleUnsupportedBrowser，准备发送日志并跳转');
        handleUnsupportedBrowser(coreReasons, auxReasons);
    }
}

document.addEventListener('DOMContentLoaded', initBrowserDetection);

function isModernBrowser() {
    const baseFeatures = (
        'fetch' in window &&                
        'Promise' in window &&              
        'URLSearchParams' in window &&      
        'classList' in document.createElement('_') && 
        'localStorage' in window &&         
        'sessionStorage' in window &&
        'requestAnimationFrame' in window &&
        'JSON' in window &&
        typeof JSON.parse === 'function' &&
        typeof JSON.stringify === 'function'
    );

    const domFeatures = (
        'getBoundingClientRect' in document.createElement('_') &&
        'dispatchEvent' in document.createElement('_') &&
        'closest' in document.createElement('_') &&
        'addEventListener' in window
    );

    const sessionFeatures = (
        (() => {
            try {
                document.cookie = 'test_cookie=1; path=/';
                const result = document.cookie.indexOf('test_cookie=') !== -1;
                document.cookie = 'test_cookie=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
                return result;
            } catch (e) {
                return false;
            }
        })() &&
        
        (() => {
            try {
                const response = new Response();
                response.headers.append('Set-Cookie', 'foo=bar; SameSite=Lax');
                return true;
            } catch (e) {
                return false;
            }
        })()
    );

    const formFeatures = (
        'FormData' in window &&
        (() => {
            try {
                const formData = new FormData();
                formData.append('test', '1');
                return formData.has('test');
            } catch (e) {
                return false;
            }
        })()
    );

    const copyFeatures = (
        'ClipboardItem' in window ||
        ('execCommand' in document &&
        document.queryCommandSupported('copy') &&
        'clipboard' in navigator)
    );

    const commonAPIs = (
        'IntersectionObserver' in window && 
        'AbortController' in window &&
        'XMLHttpRequest' in window
    );

    const fetchFunctionality = (() => {
        try {
            const params = new URLSearchParams();
            params.append('test', '123');
            if (params.toString() !== 'test=123') {
                return false;
            }

            const testUrl = '#';
            const fetchTest = fetch(testUrl, {
                method: 'POST',
                body: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            return fetchTest instanceof Promise;
        } catch (e) {
            return false;
        }
    })();

    const cssFeatures = (() => {
        const style = document.createElement('div').style;
        return (
            'backdropFilter' in style || 
            '-webkit-backdrop-filter' in style ||
            'gradient' in style.background
        );
    })();

    return baseFeatures && domFeatures && sessionFeatures && 
           formFeatures && copyFeatures && commonAPIs && 
           fetchFunctionality && cssFeatures;
}

function getUnsupportedReasons() {
    const reasons = [];
    if (!('fetch' in window)) reasons.push('缺少fetch API');
    if (!('Promise' in window)) reasons.push('缺少Promise支持');
    if (!('URLSearchParams' in window)) reasons.push('缺少URLSearchParams');
    if (!('classList' in document.createElement('_'))) reasons.push('不支持classList');
    if (!('localStorage' in window)) reasons.push('不支持localStorage');
    if (!('sessionStorage' in window)) reasons.push('不支持sessionStorage');
    if (!('requestAnimationFrame' in window)) reasons.push('缺少requestAnimationFrame');
    if (!('JSON' in window) || typeof JSON.parse !== 'function' || typeof JSON.stringify !== 'function') reasons.push('JSON功能异常');
    
    const testEl = document.createElement('_');
    if (!('getBoundingClientRect' in testEl)) reasons.push('缺少getBoundingClientRect');
    if (!('dispatchEvent' in testEl)) reasons.push('缺少dispatchEvent');
    if (!('closest' in testEl)) reasons.push('缺少closest方法');
    if (!('addEventListener' in window)) reasons.push('缺少addEventListener');
    
    let cookieOk = false;
    try {
        document.cookie = 'test_cookie=1; path=/';
        cookieOk = document.cookie.indexOf('test_cookie=') !== -1;
        document.cookie = 'test_cookie=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    } catch (e) {}
    if (!cookieOk) reasons.push('Cookie操作失败');
    
    let sameSiteOk = false;
    try {
        const response = new Response();
        response.headers.append('Set-Cookie', 'foo=bar; SameSite=Lax');
        sameSiteOk = true;
    } catch (e) {}
    if (!sameSiteOk) reasons.push('不支持SameSite Cookie');
    
    if (!('FormData' in window)) {
        reasons.push('缺少FormData');
    } else {
        let formDataOk = false;
        try {
            const fd = new FormData();
            fd.append('t', '1');
            formDataOk = fd.has('t');
        } catch (e) {}
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
    } catch (e) {}
    if (!fetchOk) reasons.push('fetch功能异常');
    
    const style = document.createElement('div').style;
    const cssOk = ('backdropFilter' in style) || ('-webkit-backdrop-filter' in style) || ('gradient' in style.background);
    if (!cssOk) reasons.push('CSS特性不支持（backdrop-filter/gradient）');
    
    return reasons;
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hostname === 'localhost') {
        console.log('本地环境，跳过浏览器检测');
        return;
    }

    const hasBeenPrompted = localStorage.getItem('browserUpgradePrompted') === 'true';
    const expires = localStorage.getItem('browserUpgradePromptExpires');
    const isExpired = expires ? new Date(expires) < new Date() : false;
    const isUnsupported = !isModernBrowser();
    const unsupportedReasons = isUnsupported ? getUnsupportedReasons() : [];

    console.log('浏览器类型：', isUnsupported ? '非现代浏览器' : '现代浏览器');
    if (isUnsupported) {
        console.log('不支持的原因：', unsupportedReasons);
    }
    console.log('是否已提示过：', hasBeenPrompted);
    console.log('提示是否过期：', isExpired);
    console.log('是否触发处理：', (!hasBeenPrompted || isExpired) && isUnsupported);

    if ((!hasBeenPrompted || isExpired) && isUnsupported) {
        console.log('进入handleUnsupportedBrowser，准备发送日志并跳转');
        handleUnsupportedBrowser(unsupportedReasons);
    }
});

function handleUnsupportedBrowser(unsupportedReasons) {
    localStorage.setItem('upgrade_redirect', window.location.href);
    localStorage.setItem('browserUpgradePrompted', 'true');
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    localStorage.setItem('browserUpgradePromptExpires', expirationDate.toISOString());

    const logData = {
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        deviceType: isMobileDevice() ? 'mobile' : 'pc',
        unsupportedReasons: unsupportedReasons
    };

    function doRedirect() {
        const upgradeUrl = isMobileDevice()
            ? '/upgrade-your-browser/Update-Pe-browser.html'
            : '/upgrade-your-browser/Update-Pc-browser.html';
        window.location.href = upgradeUrl;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/Test-Browser/Test-Browser-log-handler', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        console.log('日志发送状态：', xhr.status);
        doRedirect();
    };
    xhr.onerror = function() {
        console.error('日志发送失败');
        doRedirect();
    };

    xhr.send(JSON.stringify(logData));

    setTimeout(doRedirect, 1000);
}

function resetBrowserUpgradePrompt() {
    localStorage.removeItem('browserUpgradePrompted');
    localStorage.removeItem('browserUpgradePromptExpires');
    window.location.href = localStorage.getItem('upgrade_redirect') || '/';
}

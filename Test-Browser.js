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

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hostname === 'localhost') return;

    const hasBeenPrompted = localStorage.getItem('browserUpgradePrompted') === 'true';
    const expires = localStorage.getItem('browserUpgradePromptExpires');

    const isExpired = expires ? new Date(expires) < new Date() : false;

    if ((!hasBeenPrompted || isExpired) && !isModernBrowser()) {
        handleUnsupportedBrowser();
    }
});

function handleUnsupportedBrowser() {
    localStorage.setItem('upgrade_redirect', window.location.href);

    localStorage.setItem('browserUpgradePrompted', 'true');

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    localStorage.setItem('browserUpgradePromptExpires', expirationDate.toISOString());

    fetch('/api/log-incompatible-browser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            url: window.location.href
        })
    }).catch(() => {});

    const upgradeUrl = isMobileDevice()
        ? '/upgrade-your-browser/Update-Pe-browser.html'
        : '/upgrade-your-browser/Update-Pc-browser.html';

    window.location.href = upgradeUrl;
}

function resetBrowserUpgradePrompt() {
    localStorage.removeItem('browserUpgradePrompted');
    localStorage.removeItem('browserUpgradePromptExpires');
    window.location.href = localStorage.getItem('upgrade_redirect') || '/';
}
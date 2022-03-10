function darkMode() {
    if((localStorage.getItem('dark-mode') == null && window.matchMedia("(prefers-color-scheme: dark)").matches)
      || localStorage.getItem('dark-mode')== 'y') {
        $('body').addClass('dark-mode');
    }
}

function setDarkMode(type) {
    if(type == '+') {
        $('body').addClass('dark-mode');
        localStorage.setItem('dark-mode','y');
        $('.dark-mode-on-btn').css('display','flex');
        $('.dark-mode-off-btn').css('display','none');
    } else {
        $('body').removeClass('dark-mode');
        localStorage.setItem('dark-mode','n');
        $('.dark-mode-on-btn').css('display','none');
        $('.dark-mode-off-btn').css('display','flex');
    }
    fixedHeader();
}

function checkMainPage() {
    if(window.location.pathname == '/') {
        return true;
    }
    return false;
}

function browserCheck(type){
    var userAgent = navigator.userAgent.toLowerCase();
    if(type == 'mac') {
        if(userAgent.indexOf('macintosh') > 0) {
            return true;
        } else {
            return false;
        }
    } else if(type == 'ios') {
        if(userAgent.indexOf('iphone') > 0) {
            return true;
        } else {
            return false;
        }
    } else if(type == 'firefox') {
        if(userAgent.indexOf('firefox') > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        if(navigator.userAgent.toLowerCase().indexOf('chrome') > 0) {
            return true;
        } else {
            return false;
        }
    }
}

function changeURL() {
    if (typeof(history.pushState) == 'function') {
        var CatagoryURL = location.href;
        CatagoryURL = CatagoryURL.replace(/\?category=([0-9]+)/ig, '');
        history.pushState(null, null, CatagoryURL);
    }
}

(function() {
    darkMode();
    changeURL();
})();
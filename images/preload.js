function checkMainPage() {
    if(window.location.pathname == '/') {
        return true;
    }
    return false;
}

function browserCheck(type){
    if(type == 'mac') {
        if(navigator.userAgent.toLowerCase().indexOf('macintosh') > 0) {
            return true;
        } else {
            return false;
        }
    } else if(type == 'ios') {
        if(navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
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

function darkMode() {
    if((localStorage.getItem('dark-mode') == null && window.matchMedia("(prefers-color-scheme: dark)").matches)
      || localStorage.getItem('dark-mode')== 'y') {
        $('body').addClass('dark-mode');
    } else {
        $('body').removeClass('dark-mode');
    }
}

function setDarkMode(type) {
    if(type == '+') {
        $('body').addClass('dark-mode');
        localStorage.setItem('dark-mode','y');
    } else {
        $('body').removeClass('dark-mode');
        localStorage.setItem('dark-mode','n');
    }
}

(function() {
    darkMode();
})();
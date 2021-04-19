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

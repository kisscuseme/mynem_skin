function delay(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
            resolve();
        },ms);
    });
}

function googleTranslateElementInit2() {
    new google.translate.TranslateElement({pageLanguage: 'ko', autoDisplay: false}, 'google_translate_element2');
}
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6 7(a,b){n{4(2.9){3 c=2.9("o");c.p(b,f,f);a.q(c)}g{3 c=2.r();a.s(\'t\'+b,c)}}u(e){}}6 h(a){4(a.8)a=a.8;4(a==\'\')v;3 b=a.w(\'|\')[1];3 c;3 d=2.x(\'y\');z(3 i=0;i<d.5;i++)4(d[i].A==\'B-C-D\')c=d[i];4(2.j(\'k\')==E||2.j(\'k\').l.5==0||c.5==0||c.l.5==0){F(6(){h(a)},G)}g{c.8=b;7(c,\'m\');7(c,\'m\')}}',43,43,'||document|var|if|length|function|GTranslateFireEvent|value|createEvent||||||true|else|doGTranslate||getElementById|google_translate_element2|innerHTML|change|try|HTMLEvents|initEvent|dispatchEvent|createEventObject|fireEvent|on|catch|return|split|getElementsByTagName|select|for|className|goog|te|combo|null|setTimeout|500'.split('|'),0,{}))

var floatingTocNew = $('.floating-toc-new');
var bookToc = $('.book-toc');
var contentMiddleYn = $('#content-middle-yn').val();
var animating = false;
var mobileAnimating = false;
var timer = 0;
var clickFloatingFlag = true;
var title = null;
var floatingTocPostion = $('#floating-toc-position').val();
var adsTocPosition = $('#ads-toc-position').val();
var articleMaxWidth = Number($('#article-max-width').val());
var clickContentFlag = true;
var tocUnfoldYn = $('#toc-unfold-yn').val();
function clickContentTitle() {
    if(clickContentFlag) {
        clickContentFlag = false;
        var listCnt = $('#toc').find('a').length;
        var calcSpeed = 300*listCnt/20;
        calcSpeed = calcSpeed<300?300:calcSpeed>500?500:calcSpeed;
        $('.book-toc #toc').slideToggle(calcSpeed, 'linear', function() {
            var tocTitle = $('.book-toc>p>span#toggle');
            if(tocTitle.hasClass('open')) {
                tocTitle.html("&#xf103;");
                tocTitle.removeClass('open');
            } else {
                tocTitle.html("&#xf102;");
                tocTitle.addClass('open');
            }
            clickContentFlag = true;
        });
    }
}
function makeToc() {
    var titleLength = $('.content-article h2,h3,h4').length - $('.another_category h4').length - $('h3.tit_list_type').length;

    if(titleLength > 0) {
        if($('.book-toc').length == 1) {
            if($('#auto-toc-yn').val()) {
                $('.book-toc').css('display', 'block');
            }
        } else if($('.book-toc').length > 1) {
            if($('#ignore-toc-yn').val()) {
                $('.book-toc').eq(1).remove();
            } else {
                $('.book-toc').eq(0).remove();
            }
            $('.book-toc').css('display', 'block');
        }

        var $toc = $("#toc");
        if($toc.length > 0) {
            var foldIcon = '&#xf102;';
            if($('#fold-toc-yn').val()) {
                $toc.css('display','none');
                foldIcon = '&#xf103;';
            } else{
                $toc.css('display','block');
            }
            $toc.toc({content: ".content-article", headings: "h2,h3,h4"});
            $('.book-toc p').append('<span id="toggle" style="padding-left:10px;">'+foldIcon+'</span>');
            if($('.another_category').length > 0) {
                $toc.find('li:last').remove();
            }
            if(!$('#fold-toc-yn').val()) {
                $('.book-toc>p>span#toggle').addClass('open');
            }
            makeClipboardLink();
            bookToc = $('.book-toc');
        }
    
        $('.book-toc p').off('click touchend').on('click touchend', function(){
            clickContentTitle();
        });
    }
}

function checkContentPosition() {
    var titleList = $('.content-article').find('h2,h3,h4');
    var scrollY = window.scrollY + 50 + ($('#fixed-header').val()?($('header').length>0?$('header').height()+5:0):0) + addHeightByAnchorAds('top');
    if(titleList.length > 1) {
        for(var i=0; i < titleList.length; i++) {
            var tocList = $('.floating-toc-new #toc').find('a');
            if(i < titleList.length-1) {
                if(titleList.eq(i).offset().top < scrollY && titleList.eq(i+1).offset().top > scrollY) {
                    tocList.removeAttr('class');
                    tocList.parent().removeAttr('class');
                    tocList.eq(i).addClass('floating-toc-title-ani');
                    tocList.eq(i).addClass('selected');
                    break;
                }
            } else {
                if(titleList.eq(i).offset().top < scrollY) {
                    tocList.removeAttr('class');
                    tocList.parent().removeAttr('class');
                    tocList.eq(i).addClass('floating-toc-title-ani');
                    tocList.eq(i).addClass('selected');
                    break;
                }
            }
        }
    }
}

function clickFloatingTitle() {
    if(clickFloatingFlag) {
        clickFloatingFlag = false;
        floatingTocNew.css('height','');
        $('.floating-toc-new #toc').css('display','');
        // 여유공간이 있을 경우
        if((contentMiddleYn && (window.innerWidth-$('.content-wrapper').outerWidth())/2 > 250)
          ||(!contentMiddleYn && window.innerWidth > 1413)) {
            if(title.hasClass('close')) {
                if(!contentMiddleYn || (contentMiddleYn && adsTocPosition)) {
                    fixedRecommendAds('unfold');
                }
            }
            $('#toc-body').slideToggle(300, 'linear', function() {
                if(title.hasClass('close')) {
                    title.removeClass('close');
                    title.html("&#xf102;");
                    
                } else {
                    title.addClass('close');
                    title.html("&#xf103;");
                    if(!contentMiddleYn || (contentMiddleYn && adsTocPosition)) {
                        fixedRecommendAds('toc');
                    }
                }
                clickFloatingFlag = true;
            });
        // 여유공간이 없을 경우
        } else {
            if(title.hasClass('close')) {
                title.html("&#xf102;");
                floatingTocNew.css('width','80%');
                floatingTocNew.css('max-width','250px');
                floatingTocNew.css('transform','scale(1.0)');
                checkContentPosition();
                if(((window.innerWidth > 1079 && window.innerWidth < 1400) && (floatingTocPostion && !contentMiddleYn))
                  || (window.innerWidth > articleMaxWidth+32 && (floatingTocPostion && contentMiddleYn))) {
                    floatingTocNew.css('right','0px');
                } else {
                    floatingTocNew.css('left','0px');
                }
            }
            $('#toc-body').slideToggle(300, 'linear', function() {
                if(title.hasClass('close')) {
                    title.removeClass('close');
                }else {
                    title.html("&#xf103;");
                    title.addClass('close');
                    floatingTocNew.css('width','fit-content');
                    floatingTocNew.css('transform','scale(0.8)');
                    if(((window.innerWidth > 1079 && window.innerWidth < 1400) && (floatingTocPostion && !contentMiddleYn))
                      || (window.innerWidth > articleMaxWidth+32 && (floatingTocPostion && contentMiddleYn))) {
                        floatingTocNew.css('right','-8px');
                    } else {
                        floatingTocNew.css('left','-8px');
                    }
                }
                clickFloatingFlag = true;
            });
        }
    }
}

function makeFloatingToc() {
    var titleLength = $('.content-article h2,h3,h4').length - $('.another_category h4').length - $('h3.tit_list_type').length;
    if(bookToc.length > 0 && titleLength > 0) {
        var tocTitle = $('<div id="toc-title"><p>목차<span id="toggle" class="close" style="padding-left:5px;">&#xf103;</span></p></div>');
        floatingTocNew.append(tocTitle);
        var tocBody = $('<div id="toc-body"></div>').append(bookToc.find('#toc').clone());
        floatingTocNew.append(tocBody);
        floatingTocNew.css('height','19px');
        title = $('#toc-title>p>span#toggle');
        $('#toc-title').off('click').on('click', function(){
            clickFloatingTitle();
        });

        $('#toc-title').off('touchend').on('touchend', function(){
            clickFloatingTitle();
        });

        //목차 항목 클릭
        $('#toc-body').find('a').off('click').on('click', function(){
            checkPosition();
        });
    }
}

function initFloatingTocNew() {
    $('#toc-body').css('display','none');
    $('.floating-toc-new #toc').css('display','');
    floatingTocNew.css('display','');
    floatingTocNew.css('width','');
    floatingTocNew.css('max-width','');
    floatingTocNew.css('max-height','');
    floatingTocNew.css('top','');
    floatingTocNew.css('margin-right','');
    floatingTocNew.css('transform','');
    floatingTocNew.css('left','');
    floatingTocNew.css('right','');
    title.addClass('close');
}

function appendTocNew() {
    if(bookToc.length > 0 && title != null) {
        var headerHeight = $('#fixed-header').val()?$('header').height():0;
        if((contentMiddleYn && (window.innerWidth-$('.content-wrapper').outerWidth())/2 > 250)
          ||(!contentMiddleYn && window.innerWidth > 1413)) {
            if(window.scrollY > bookToc.outerHeight() + bookToc.offset().top - headerHeight - addHeightByAnchorAds('top')) {
                if(!animating) {
                    animating = true;
                    mobileAnimating = false;
                    initFloatingTocNew();

                    var sideValue = 0;
                    if(contentMiddleYn) {
                        if(floatingTocPostion) { //오른쪽
                            sideValue = (window.innerWidth - $('.content-wrapper').width())/2 - floatingTocNew.outerWidth() - 42;
                            floatingTocNew.css('right', sideValue);
                        } else { //왼쪽
                            sideValue = (window.innerWidth - $('.content-wrapper').width())/2 + $('.content-wrapper').width() + 32;
                            floatingTocNew.css('right', sideValue);
                            
                        }
                    } else {
                        sideValue = ((window.innerWidth - $('.content-wrapper').width()) - floatingTocNew.outerWidth())/2 - 52;
                        floatingTocNew.css('right', sideValue);
                    }
                    
                    if(tocUnfoldYn && contentMiddleYn) {
                        $('#toc-body').css('display','');
                        floatingTocNew.css('height','');
                        title.html("&#xf102;");
                        title.removeClass('close');
                    } else {
                        title.html("&#xf103;");
                        title.addClass('close');
                    }
                    floatingTocNew.animate({
                        'opacity': '1.0'
                    }, 300);
                }
            } else {
                if(animating) {
                    animating = false;
                    mobileAnimating = true;
                    floatingTocNew.animate({
                        'opacity': '0.0'
                    }, 300);
                }
            }
        } else {
            if(window.scrollY > bookToc.outerHeight() + bookToc.offset().top - $('header').height()) {
                if(!mobileAnimating) {
                    mobileAnimating = true;
                    animating = false;
                    initFloatingTocNew();
                    title.html("&#xf103;");
                    $('#toc-body').css('display','none');
                    floatingTocNew.css('width','fit-content');
                    floatingTocNew.css('height','20px');
                    floatingTocNew.css('margin-right','0px');
                    floatingTocNew.css('margin-left','0px');
                    floatingTocNew.css('opacity','0.9');
                    floatingTocNew.css('transform','scale(0.8)');
                    if(((window.innerWidth > 1079 && window.innerWidth < 1400) && (floatingTocPostion && !contentMiddleYn))
                      || (window.innerWidth > articleMaxWidth+32 && (floatingTocPostion && contentMiddleYn))) {
                        floatingTocNew.css('right','-8px');
                    } else {
                        floatingTocNew.css('left','-8px');
                    }
                }
            } else {
                if(mobileAnimating) {
                    mobileAnimating = false;
                    animating = true;
                    floatingTocNew.css('display','none');
                    title.html("&#xf102;");
                    title.removeClass('close');
                    $('#toc-body').css('display','');
                }
            }
        }

        var anchorAdsHeight = addHeightByAnchorAds('top');
        if($('#fixed-header').val()) {
            floatingTocNew.css('top',($('header').height()+10+anchorAdsHeight)+'px');
        } else {
            if($('#hide-sidebar').val()) {
                if(floatingTocPostion) {
                    floatingTocNew.css('top', (60+anchorAdsHeight)+'px');
                } else {
                    floatingTocNew.css('top',(30+anchorAdsHeight)+'px');
                }
            } else {
                if(((window.innerWidth > 1079 && window.innerWidth < 1400) && (floatingTocPostion && !contentMiddleYn))
                  || (window.innerWidth > articleMaxWidth+32 && (floatingTocPostion && contentMiddleYn))) {
                    floatingTocNew.css('top',(10+anchorAdsHeight)+'px');
                } else {
                    floatingTocNew.css('top',(30+anchorAdsHeight)+'px');
                }
            }
        }

        if(floatingTocNew.height() > floatingTocNew.find('#toc-title').height()) {
            checkContentPosition();
        }
    }
}

function copyTitleToClipboard(titleIndex) {
    var tocLink = $('#toc a');
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = tocLink.eq(titleIndex).prop('href');
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    showToast("링크 복사 완료!");
}

function makeClipboardLink() {
    var tocLink = $('#toc a');
    for(var i=0; i < tocLink.length; i++) {
        var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        var titleId = tocLink.eq(i).attr('href').substr(1).replace(regExp,"\\$&");
        var titleElem = $('#'+titleId);
        titleElem.append('<button class="copy-title-btn" onclick="copyTitleToClipboard('+i+')">\uf0c1</button>');
    }
}

var repeatCnt = 0;
var smoothScrollTimer = 0;
var currentPosition = null;
function smoothScroll() {
    $('a:not(.lb-prev, .lb-next, .lb-close, .btn-toggle-moreless, .btn_mark)').off().on('click', function () {
        var self = this;
        var aHref = $.attr(self, 'href');
        var windowTop = $(window).scrollTop();
        var offsetTop = 0;
        var moveFlag = false;
        var headerHeight = $('#fixed-header').val()?($('header').length>0?$('header').height()+5:0):0;
        
        if(typeof aHref !== 'undefined' && aHref.length > 1 && aHref.indexOf('#') > -1) {
            var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
            offsetTop = $('#' + aHref.substr(1).replace(regExp,"\\$&")).offset().top - addHeightByAnchorAds('top');
            moveFlag = true;
        }

        if($(self).hasClass('move-top-btn')) {
            moveFlag = true;
        }

        if(currentPosition != (offsetTop - headerHeight)) {
            clearTimeout(smoothScrollTimer);
            smoothScrollTimer = 0;
        }

        if(moveFlag) {
            var distance = Math.abs(windowTop - offsetTop - headerHeight);
            var calcSpeed = 300*(distance/2000);
            var speed = calcSpeed<300?300:(calcSpeed>1500?1500:calcSpeed);
            $('html, body').animate({
                scrollTop: offsetTop - headerHeight
            }, speed, 'swing');
            smoothScrollTimer = setTimeout(function() {
                if(repeatCnt < 3 && offsetTop != 0) {
                    $(self).click();
                    repeatCnt++;
                    currentPosition = offsetTop;
                } else {
                    repeatCnt = 0;
                    smoothScrollTimer = 0;
                    currentPosition = null;
                }
            }, speed);

            return false;
        }
    });
}

var msgTimer = 0;
function showToast(msg, slot) {
    clearToast();

    var toast = $('#toast');

    if(slot == 'top') {
        toast.css('top', 'calc(33px + ' + addHeightByAnchorAds('top') + 'px)');
        toast.css('bottom', '');
    } else if(slot == 'bottom') {
        toast.css('top', '');
        toast.css('bottom', 'calc(-13px + ' + addHeightByAnchorAds('bottom') + 'px)');
    } else {
        toast.css('top', 'calc(50% - ' + (addHeightByAnchorAds('bottom')+addHeightByAnchorAds('top'))/2 + 'px)');
        toast.css('bottom', '');
    }

    toast.children().html(msg);
    setTimeout(function() {
        toast.fadeIn(500, function() {
            msgTimer = setTimeout(function() {
                toast.fadeOut(500);
            }, 1000);
        });
    }, 200);
}

function clearToast() {
    if(msgTimer != 0) {
        clearTimeout(msgTimer);
        msgTimer = 0;
    }
}

var scrollTop = 0;
var likeButton = null;
var likeButtonPosition = 0;
var scrollHeight =0;
var contentsCurrentPosition = 0;
var etcCurrentPosition = 0;
var $pbv = $('.progress-bar-vertical');
var $pbh = $('.progress-bar-horizontal');
var $pbev = $('.progress-bar-etc-vertical');
var $pbeh = $('.progress-bar-etc-horizontal');
function commonProgressBar() {
    likeButton = $('.container_postbtn');
    likeButtonPosition = likeButton.length>0?likeButton.offset().top:0;
    scrollHeight = $('body').prop('scrollHeight');
    scrollTop = $(window).scrollTop();
    contentsCurrentPosition = likeButtonPosition==0?0:(likeButtonPosition>$(window).innerHeight()?(scrollTop/(likeButtonPosition-$(window).innerHeight())):1);
    etcCurrentPosition = 1 - (scrollHeight-scrollTop-$(window).innerHeight())/(scrollHeight-likeButtonPosition);
}

function progressBarVertical() {
    $pbv.css('height',((contentsCurrentPosition>1?1:contentsCurrentPosition)*100)+'%');
    $pbv.css('left',($('.content-wrapper').offset().left)+'px');
    $pbv.css('opacity',0.8-(0.5*(contentsCurrentPosition>1?1:contentsCurrentPosition)));
}

function progressBarHorizontal() {
    $pbh.css('width',((contentsCurrentPosition>1?1:contentsCurrentPosition)*100)+'%');
    $pbh.css('opacity',0.8-(0.5*(contentsCurrentPosition>1?1:contentsCurrentPosition)));
}

function progressBarEtcVertical() {
    $pbev.css('height',(likeButtonPosition>0?etcCurrentPosition*100:0)+'%');
    $pbev.css('left',($('.content-wrapper').outerWidth()+$('.content-wrapper').offset().left)+'px');
    $pbev.css('opacity',0.8-(0.5*etcCurrentPosition));
}

function progressBarEtcHorizontal() {
    $pbeh.css('width',(likeButtonPosition>0?etcCurrentPosition*100:0)+'%');
    $pbeh.css('opacity',0.8-(0.5*etcCurrentPosition));
}

function scrollProgressBar() {
    commonProgressBar();
    if($('#progress-top').val()) {
        progressBarHorizontal();
    }
    if($('#progress-left').val()) {
        progressBarVertical();
    }
    if($('#progress-right').val()) {
        progressBarEtcVertical();
    }
    if($('#progress-bottom').val()) {
        progressBarEtcHorizontal();
    }
}

function foldReply(elem) {
    if(document.location.href.indexOf('#comment') < 0) {			
        var $elem = $(elem);
        var reply = $('div.comment-list>ul>li#'+$elem.attr('id')+'>ul>li');
        for(var i=0;i<reply.length-Number($('#fold-comment-num').val());i++) {
            reply.eq(i).css('display','none');
        }
        var pElem = $elem.find('p').eq(0);
        if(pElem.find('div').length > 0) {
            $elem.find('p').eq(0).find('div').remove();
        }
        var moreButton = '<div onclick="unfoldReply(this)" class="more-reply">'+ (reply.length-Number($('#fold-comment-num').val())) + '개 이전 댓글 보기' +'</div>';
        pElem.append(moreButton);
    }
}
function unfoldReply(elem) {
    var $elem = $(elem).parent().parent();
    var reply = $('div.comment-list>ul>li#'+$elem.attr('id')+'>ul>li');
    for(var i=0;i<reply.length-Number($('#fold-comment-num').val());i++) {
        reply.eq(i).css('display','block');
    }
    $elem.find('p').eq(0).find('div').remove();
}
function initFoldReply() {
    if($('#fold-comment-yn').val()) {
        var commentList = $('article').find('.inner').find('.comment-list>ul>li');
        if(commentList.length > 0) {
            for(var i=0;i<commentList.length;i++) {
                var reply = commentList.eq(i).find('ul>li');
                if(reply.length > Number($('#fold-comment-num').val())) {
                    foldReply(commentList[i]);
                }
            }
        }
    }
}

function commentAutoLink() {
    (function() {
        var autoLink,
                slice = [].slice;

        autoLink = function() {
            var callback, k, linkAttributes, option, options, pattern, v;
            options = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            pattern = /(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
            if (!(options.length > 0)) {
                return this.replace(pattern, "$1<a class='auto-link' href='$2'>$2</a>");
            }
            option = options[0];
            callback = option["callback"];
            linkAttributes = ((function() {
                var results;
                results = [];
                for (k in option) {
                    v = option[k];
                    if (k !== 'callback') {
                        results.push(" " + k + "='" + v + "'");
                    }
                }
                return results;
            })()).join('');
            return this.replace(pattern, function(match, space, url) {
                var link;
                link = (typeof callback === "function" ? callback(url) : void 0) || ("<a class='auto-link' href='" + url + "'" + linkAttributes + ">" + url + "</a>");
                return "" + space + link;
            });
        };

        String.prototype['autoLink'] = autoLink;

    }).call(this);

    var commentList = $('div.comment-list>ul>li>p');
    var replyList = $('div.comment-list>ul>li>ul>li>p');
    for(var i=0; i < commentList.length; i++) {
        commentList[i].innerHTML = commentList[i].innerHTML.autoLink({ target: "_blank" });
    }
    for(var j=0; j < replyList.length; j++) {
        replyList[j].innerHTML = replyList[j].innerHTML.autoLink({ target: "_blank" });
    }
}

var fontSize = 1;
function changeFontSize(type) {
    if(type === '') {
        $('article').removeAttr('style');
        fontSize = 1;
        return false;
    }
    if(type === '+') {
        if(fontSize < 5) {
            fontSize += 0.05;
        } else {
            fontSize = 5;
        }
    } else if(type === '-') {
        if(fontSize > 0.6) {
            fontSize -= 0.05;
        } else {
            fontSize = 0.6;
        }
    }
    $('article').attr('style', 'font-size: '+fontSize+'em !important');
    $('.change-font-btn').blur();
}
            
function commentControl(){
    $(document).on("click", ".comments .comment-list ul li .author-meta .control button", function(){
        if ( $(this).siblings(".link").is(":hidden") ){
            $(".comments .link").removeAttr("style");
            $(this).siblings(".link").show();
        } else {
            $(this).siblings(".link").hide();
        }
    });

    $(document).on("keyup", function(e){
        if ( e.keyCode == '27' ){
            $(".comment-list ul li .author-meta .control .link").removeAttr("style");
        }
    });
}

function removeDimmed(){
    $("#dimmed").remove();
    $('section').css('z-index','110');
}

function doGTranslateCustom(param) {
    if(!(param == 'ko|ko' && (localStorage.getItem('translate') == null || localStorage.getItem('translate') == 'n'))) {
        if(param == 'ko|ko' && localStorage.getItem('translate') == 'y') {
            localStorage.setItem('translate', 'n');
        } else {
            localStorage.setItem('translate', 'y');
        }
        doGTranslate(param);
        setTimeout(function(){
            if(window.innerWidth < 1080) {
                $('button.close').focus();
                $('button.close').click();
            }
        }, 500);
    }
}

function makeBell() {
    if($('#make-bell-yn').val()) {
        if(location.href.indexOf('notice') < 0) {
            var makeBellStr = $('#make-bell').val().replaceAll("&lt;","<").replaceAll("&gt;",">")
            var bubbleTag = '<div class="like_bubble"><span class="bubble_image"></span><div class="inner">' + makeBellStr + '</div></div>';
            $(bubbleTag).insertBefore($('.container_postbtn').children().eq(0));
        }
    }
}

function toastAfterLike() {
    if($('#toast-after-like-yn').val()) {
        $('button.btn_post.uoc-icon').on('click',function(){
            setTimeout(function() {
                if($('button.btn_post.uoc-icon>div.like_on').length > 0) {
                    showToast($('#toast-after-like').val());
                }
            }, 500);
        });
    }
}

function common(){
    var $profile = $(".top-button .profile");
    var $menu = $(".top-button .menu");

    $profile.on("click", "button", function(){
        if ( $(this).siblings("nav").is(":hidden") ){
            $(this).siblings("nav").show();
        } else {
            $(this).siblings("nav").hide();
        }
    });

    $profile.on("mouseleave", function(){
        $(this).find("nav").hide();
    });

    if ( window.T && window.T.config.USER.name ){
        $profile.find(".login").hide();
        $profile.find(".logout").show();
    } else {
        $profile.find(".login").show();
        $profile.find(".logout").hide();
    }

    $profile.on("click", ".login", function(){
        document.location.href = 'https://www.tistory.com/auth/login?redirectUrl=' + encodeURIComponent(window.TistoryBlog.url);
    });
    $profile.on("click", ".logout", function(){
        document.location.href = 'https://www.tistory.com/auth/logout?redirectUrl=' + encodeURIComponent(window.TistoryBlog.url);
    });
    
    var updateFlag = true;
    $('.comment-content, span.count > span').bind('DOMSubtreeModified', function () { //.comment-content, span.count > span DOMNodeInserted DOMNodeRemoved DOMSubtreeModified
        if(updateFlag){
            updateFlag = false;
            setTimeout(function(){
                commentAutoLink();
                initFoldReply();
                updateFlag = true;
            }, 500);
        }
    });
    
    $menu.on("click", function(){
        if ( $("body").hasClass("mobile-menu") ){
            $("body").removeClass("mobile-menu");
            if(localStorage.getItem('dark-mode') == 'y') {
                $('.sidebar, .sidebar h2').css('background','#000');
            }
            if ( $("#dimmed").length ) removeDimmed();
        } else {
            $("body").addClass("mobile-menu");
            if(localStorage.getItem('dark-mode') == 'y') {
                $('.sidebar, .sidebar h2').css('background','');
            }
            $("body").append('<div id="dimmed"/>');
            $('section').css('z-index','');
            if ( !$(".sidebar .profile").length ){
                $(".sidebar").append('<div class="profile" /><button type="button" class="close">닫기</button>');
                $profile.find("ul").clone().appendTo(".sidebar .profile");

                var $profileMobile = $(".sidebar .profile");
                $profileMobile.on("click", ".login", function(){
                    document.location.href = 'https://www.tistory.com/auth/login?redirectUrl=' + encodeURIComponent(window.TistoryBlog.url);
                });
                $profileMobile.on("click", ".logout", function(){
                    document.location.href = 'https://www.tistory.com/auth/logout?redirectUrl=' + encodeURIComponent(window.TistoryBlog.url);
                });
            }
            $('.sidebar').css('padding-top', (addHeightByAnchorAds('top')+50)+'px');
            $('.sidebar .close').css('top', (addHeightByAnchorAds('top')+10)+'px');
            fixedRecommendAds('init');
        }
    });

    $('.postbtn_like .wrap_btn.wrap_btn_etc button').on("click", function() {
        setTimeout(function() {
        }, 200);
    });
    
    $(document).on("click", "#dimmed, .sidebar .close", function(){
        $("body").removeClass("mobile-menu");
        if(localStorage.getItem('dark-mode') == 'y') {
            $('.sidebar, .sidebar h2').css('background','#000');
        }
        if ( $("#dimmed").length ) removeDimmed();
    });

    var userDarkMode = localStorage.getItem('dark-mode');
    var defaultDarkMode = $('#default-dark-mode').val();

    if(userDarkMode == null) {
        if(defaultDarkMode) {
            setDarkMode('+');
        } else {
            setDarkMode('-');
        }
    } else {
        if(userDarkMode == 'y') {
            setDarkMode('+');
        } else {
            setDarkMode('-');
        }
    }

    $('.share-btn').on('click', function() {
        var sns = $('#tistorySnsLayer');
        if(sns.length > 0) {
            if(sns.css('display') == 'block') {
                sns.css('display', 'none');
                sns.removeClass('custom');
            } else {
                setTimeout(function() {
                    $('button.btn_share').click();
                    sns.css('position', 'fixed');
                    sns.css('left', '');
                    sns.css('top', '');
                    sns.css('right', '10px');
                    sns.css('bottom', (addHeightByAnchorAds('bottom')+60)+'px');
                }, 200);
            }
        }
    });

    var list = $('.archives ul li a');
    var now = new Date(Date.now());
    var year = now.getFullYear();
    var month = (now.getMonth()+1);
    for(var i=0;i<list.length;i++) {
        var date = list.eq(i).text().split('/');
        var gap_year = year - Number(date[0]);
        var gap_month = gap_year*12 + (month-Number(date[1]));
        var title = '';
        if(gap_month == 0) {
            title = '이번 달 작성 글 모아보기';
        } else {
            title = gap_month + '개월 전 작성 글 모아보기';
        }
        list.eq(i).text('[' + list.eq(i).text() + '] ' + title);
    }

    $('.category h2 a').html('카테고리 <span class="c_cnt">' + $('.category .link_tit .c_cnt').text() + '</span>');

    if($('#forced-dark-mode').val()) {
        localStorage.setItem('dark-mode','y');
        $('body').addClass('dark-mode');
    }

    if($('.og-desc').length > 0) {
        for(var i=0;i<$('.og-desc').length;i++) {
            $('.og-desc').eq(i).text($('.og-desc').eq(i).text()+'...');
        }
    }

    var sidebarInsParent = $('.sidebar ins').parent();
    for(var i=0;i<sidebarInsParent.length;i++) {
        if(sidebarInsParent.eq(i).prop('className') == 'module module_plugin') {
            sidebarInsParent.eq(i).css('border', 'none');
        }
        if(sidebarInsParent.eq(i).css('background-image').indexOf('adsense.svg') > -1) {
            sidebarInsParent.eq(i).css('background-image','none');
        }
    }
}

function updateTagsAttr() {
    //이미지에 alt 태그 부여
    var $titleList = $('.content-title .inner h1, .content-article h2, h3, h4');
    var titleListLength = $titleList.length - 1;
    var $images = $('.content-article').find('img');
    var cnt = 0;
    var limitCnt = 0;
    var title, title1, title2, title3, title4;
    title1 = $titleList.eq(0).text();
    $images.each(function(idx, img) {
        var $img = $(img);
        if(!$img.attr('alt') || !$img.attr('title')) {
            var checkFlag = false;
            while(!checkFlag){
                if(cnt <= titleListLength) {
                    if(cnt === titleListLength || ($titleList.eq(cnt).offset().top < $img.offset().top && $titleList.eq(cnt+1).offset().top > $img.offset().top)) {
                        if($titleList.eq(cnt).prop('tagName') === 'H1') {
                            title = title1;
                        } else if($titleList.eq(cnt).prop('tagName') === 'H2') {
                            title = title1 + ' - ' + title2;
                        } else if($titleList.eq(cnt).prop('tagName') === 'H3') {
                            title = title1 + ' - ' + title2 + ' - ' + title3;
                        } else if($titleList.eq(cnt).prop('tagName') === 'H4') {
                            title = title1 + ' - ' + title2 + ' - ' + title3 + ' - ' + title4;
                        }
                        
                        if(!$img.attr('alt')) {
                            $img.attr('alt', title);
                        }
                        if(!$img.attr('title')) {
                            $img.attr('title', title);
                        }
                        checkFlag = true;
                    } else {
                        cnt++;
                        var titleTemp = $titleList.eq(cnt).text();
                        var buttonLoc = titleTemp.indexOf($titleList.eq(cnt).find('button').text());
                        if(buttonLoc > -1) {
                            titleTemp = titleTemp.substr(0, buttonLoc);
                        }
                        if($titleList.eq(cnt).prop('tagName') === 'H2') {
                            title2 = titleTemp;
                        } else if($titleList.eq(cnt).prop('tagName') === 'H3') {
                            title3 = titleTemp;
                        } else if($titleList.eq(cnt).prop('tagName') === 'H4') {
                            title4 = titleTemp;
                        }
                        checkFlag = false;
                    }
                }
                limitCnt++;
                if(limitCnt > 200) {
                    break;
                }
            }
        }
    });
    
    //모든 img 불러와서 alt 값 비어 있으면 블로그 제목 넣기
    var allImg = $('img');
    allImg.each(function(idx, img) {
        var $img = $(img);
        if(!$img.attr('alt')) {
            $img.attr('alt', $('#header .inner > h1 > a').text().trim());
        }
    });
       
    // script, style 태그에 type 속성 제거
    $('script').removeAttr('type');
    $('style').removeAttr('type');
}

//오프스크린 이미지 지연 로딩
function lazyLoading() {
    if($('#lazy-loading').val()) {
        const imgs = document.querySelectorAll('img');
        if(imgs.length > 0){
            imgs.forEach(function(img){
                var $img = $(img);
                if($img.offset().top > window.getWindowCleintHeight()) {
                    var width = $img.innerWidth();
                    var height = $img.innerHeight();
                    if(width > 1 && height > 1) {
                        $img.css('width',width+'px');
                        $img.css('height',height+'px');
                    }
                    $img.css('opacity','0.2');
    
                    if(img.getAttribute('srcset') != null){
                        img.setAttribute('data-srcset', img.getAttribute('srcset'));
                        img.setAttribute('srcset', $('#blank-img').attr('src'));
                    }
                    if(img.getAttribute('src') != null){
                        img.setAttribute('data-src', img.getAttribute('src'));
                        img.setAttribute('src', $('#blank-img').attr('src'));
                    }
                    img.classList.add('lazyload');
                }
            });
        }
    
        [...document.querySelectorAll('img.lazyload')].forEach(async image => {
            await (function(element, options = {}){
                const intersectionObserverOptions = {
                    rootMargin: '0px',
                    threshold: 0.1,
                    ...options,
                };
    
                return new Promise(resolve => {
                    const observer = new IntersectionObserver(async entries => {
                        const [entry] = entries;
    
                        if (entry.isIntersecting) {
                            resolve();
                            observer.disconnect();
                        }
                    }, intersectionObserverOptions);
                    observer.observe(element);
                });
            })(image);
    
            if(image.getAttribute('src') != null){
                image.setAttribute('src', image.getAttribute('data-src'));
            }
            if(image.getAttribute('srcset') != null){
                image.setAttribute('srcset', image.getAttribute('data-srcset'));
            }
            $(image).animate({'opacity':'1.0'});
        });
    }
}

function fixedRecommendAds(type) {
    if($('#use-fixed-ads-yn').val()) {
        var tocTarget = null;
        var fixedAdsType = $('#fixed-ads-type').val();
        if(fixedAdsType == 'matched') {
            tocTarget = $('#recommend-ads').parent();
        } else if(fixedAdsType == 'adsense') {
            tocTarget = $('aside .revenue_unit_wrap .adsense').parent();
        } else if(fixedAdsType == 'adfit') {
            tocTarget = $('aside .revenue_unit_wrap .adfit').parent();
        }
        var removeStyleFlag = false;
        var headerHeight = $('#fixed-header').val()?$('header').height()+5:($('#hide-sidebar').val()?(floatingTocPostion?5:60):5);
        if(type == 'toc') {
            if(tocTarget != null) {
                var checkAdsWidth = (window.innerWidth - $('.content-wrapper').width())/2 > tocTarget.outerWidth();
                if((contentMiddleYn && checkAdsWidth) || (!contentMiddleYn && window.innerWidth >= 1400)) {
                    if(window.scrollY > $('header').height()
                      && ((bookToc.length > 0 && $('#toc-title>p>span#toggle').hasClass('close') && (!contentMiddleYn || (contentMiddleYn && adsTocPosition)))
                      || (contentMiddleYn && !adsTocPosition) || bookToc.length == 0)) {
                        var tocOffsetTop = bookToc.length > 0?(contentMiddleYn && !adsTocPosition?0:50):0;
                        var tocOffsetSide = 0;
                        if(contentMiddleYn) {
                            if(floatingTocPostion) {
                                tocOffsetSide = (window.innerWidth - $('.content-wrapper').width())/2 + $('.content-wrapper').width() + 17;
                            } else {
                                tocOffsetSide = (window.innerWidth - $('.content-wrapper').width())/2 - tocTarget.outerWidth() - 33;
                            }
                        } else {
                            tocOffsetSide = window.innerWidth - $('.content-wrapper').width() - tocTarget.outerWidth() - 80;
                        }
                        var scaleRatio = 0.9;
                        var anchorAdsHeight = addHeightByAnchorAds('top') + addHeightByAnchorAds('bottom');
                        var adjustInnerHeight = window.innerHeight - anchorAdsHeight;
                        if(tocTarget.height() > (adjustInnerHeight-tocOffsetTop-headerHeight)) {
                            scaleRatio = (adjustInnerHeight-tocOffsetTop-headerHeight)/tocTarget.height()*0.9;
                        }
                        tocTarget.css('position', 'fixed');
                        var adjustTop = fixedAdsType=='matched'?5:-15;
                        var fixTopPosition = tocTarget.height()*(1-scaleRatio)/2 - adjustTop;
                        tocTarget.css('top', 'calc(' + (tocOffsetTop+headerHeight+addHeightByAnchorAds('top')) + 'px - ' + fixTopPosition + 'px)');
                        tocTarget.css('transform', 'scale('+scaleRatio+')');
                        tocTarget.css('right', tocOffsetSide + 'px');
                    } else {
                        removeStyleFlag = true;
                    }
                } else {
                    removeStyleFlag = true;
                }
            }
        } else if(type == 'unfold') {
            if(tocTarget != null) {
                removeStyleFlag = true;
            }
        } else if(type == 'init') {
            if(tocTarget.length > 0) {
                tocTarget.removeAttr('style');
            }
        }
    
        if(removeStyleFlag) {
            tocTarget.removeAttr('style');
        }
    }
}

var moveToTheTitleTimer = 0;
function moveToTheTitle() {
    if(location.href.indexOf('#') > -1) {
        var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        var titleId = decodeURIComponent(location.href.substr(location.href.indexOf('#')+1)).replace(regExp,"\\$&");
        var title = $(titleId.length>0?'#'+titleId:'');
        if(title.length > 0 && ['H2','H3','H4','LI'].indexOf(title.prop('tagName')) > -1) {
            scrollTo(0, title.offset().top - ($('#fixed-header').val()?($('header').length>0?$('header').height()+5:0):0));
            moveToTheTitleTimer = setTimeout(function() {
                if(repeatCnt < 3) {
                    moveToTheTitle();
                    repeatCnt++;
                } else {
                    moveToTheTitleTimer = 0;
                    repeatCnt = 0;
                }
            }, 200);
        }
    }
}

/* 배경음악 관련 로직 */	
var bgmSource = [];
var saveIndex = window.localStorage.getItem('current-bgm-index');
if(isNaN(Number(saveIndex))) saveIndex = '0';
var currentIndex = saveIndex?Number(saveIndex):Math.floor(Math.random()*bgmSource.length);
var currentVolume = Number(window.localStorage.getItem('current-bgm-volume'))||Number($('#init-bgm-volume').val());
var bgmPlaying = false;
var nextPlay = false;
var myBgm = null;
var currentBgm = null;

function bgmMute(type) {
    if(bgmSource.length > 0) {
        if(type == '+') {
            myBgm.muted = false;
        } else if(type == '-') {
            myBgm.muted = true;
        } else {
            if(browserCheck('ios')) {
                showToast('아이폰은 지원하지 않습니다.');
            } else {
                myBgm.muted = !myBgm.muted;
            }
        }
        if(myBgm.muted) {
            $('#bgm-mute').html('&#xf028;'); //not mute icon
        } else {
            $('#bgm-mute').html('&#xf6a9;'); //mute icon
        }
    }
    $('.bgm-btn').blur();
}

function getCurrentBgm() {
    if(bgmSource.length > 0) {
        if($('#bgm-autoplay-yn').val()) {
            if(window.innerWidth > 767 || $('#bgm-autoplay-mobile-yn').val()) {
                if(!window.localStorage.getItem('current-bgm')) {
                    window.localStorage.setItem('current-bgm', 'play');
                    currentVolume = Number($('#init-bgm-volume').val());
                }
            }
        }

        if(window.localStorage.getItem('current-bgm') == 'stop' || window.localStorage.getItem('current-bgm') == null) {
            myBgm.pause();
            bgmPlaying = false;
            $('#bgm-status').html('&#xf04b;'); //play icon
        } else {
            if(myBgm.paused && !bgmPlaying){
                currentBgm.html(bgmSource.length>currentIndex?bgmSource[currentIndex].title:'재생 목록 없음');
                myBgm.src = bgmSource[currentIndex].src;
                bgmMute('-');			
                var promise = myBgm.play();
                if (promise !== undefined) {
                    promise.then(function(){
                        bgmPlaying = true;
                        var saveBgmTime = (Number(window.localStorage.getItem('current-bgm-time'))||0.0)-0.3;
                        myBgm.currentTime = (saveBgmTime>0)?saveBgmTime:0.0;
                        $('#bgm-status').html('&#xf04c;'); //pause icon
                    }).catch(function(error){
                        bgmPlaying = false;
                        $('#bgm-status').html('&#xf04b;'); //play icon
                    });
                }
            }

            if(browserCheck('ios')) {
                bgmVolume('+');
            }
        }
    }
}

function nextBgm(type) {
    myBgm.pause();
    bgmPlaying = false;
    nextPlay = true;
    currentIndex = currentIndex + (type=='+'?1:-1);
    currentIndex = (currentIndex<0?bgmSource.length-1:currentIndex)%bgmSource.length;
    window.localStorage.setItem('current-bgm-index', null);
    window.localStorage.setItem('current-bgm-time', null);
    window.localStorage.setItem('current-bgm', 'play');
    getCurrentBgm();
    $('.bgm-btn').blur();
}

function bgmVolume(type) {
    if(bgmSource.length > 0) {
        if(type == '+') {
            currentVolume += 0.05;
        } else {
            currentVolume -= 0.05;
        }
        if(!browserCheck('ios')) {
            myBgm.volume = currentVolume = currentVolume>1?1:(currentVolume<0?0:currentVolume);
            var volumeAsPercent =  Math.ceil(currentVolume*100) - Math.ceil(currentVolume*100)%5;
            showToast('볼륨: ' + volumeAsPercent + '%','bottom');
        } else {
            if(type == '+') {
                window.localStorage.setItem('current-bgm', 'play');
                bgmMute('+');
                myBgm.play();
            } else {
                window.localStorage.setItem('current-bgm', 'stop');
                bgmMute('-');
                myBgm.pause();
            }
        }
    }
    $('.bgm-btn').blur();
}

function toggleBgm() {
    if(window.localStorage.getItem('current-bgm') == 'stop' || window.localStorage.getItem('current-bgm') == null || $('#bgm-status').html() == '') {
        window.localStorage.setItem('current-bgm', 'play');
    } else {
        saveBgmStatus();
        window.localStorage.setItem('current-bgm', 'stop');
    }
    getCurrentBgm();
    $('.bgm-btn').blur();
}

function saveBgmStatus() {
    if(bgmSource.length > 0) {
        if(Date.now() - Number(window.localStorage.getItem('visit-time')) < 1000*60*60 || window.localStorage.getItem('visit-time') == null) {
            window.localStorage.setItem('current-bgm-index', currentIndex);
            window.localStorage.setItem('current-bgm-time', myBgm.currentTime);			
        } else {
            window.localStorage.setItem('current-bgm-index', Math.floor(Math.random()*bgmSource.length));
            window.localStorage.setItem('current-bgm-time', '0');				
        }
        window.localStorage.setItem('visit-time', Date.now());
        window.localStorage.setItem('current-bgm-volume', currentVolume);
    }
}

function bgmStartHandler(e) {
    if(bgmPlaying) {
        saveBgmStatus();
    } else {
        getCurrentBgm();
    }
}

function bgmEvents() {
    if($('#bgm-title').length > 0) {
        $('#bgm').on('ended',function(e){nextBgm('+');});
        $(window).on("beforeunload",function(e){saveBgmStatus();});	
        $(window).on('click', bgmStartHandler);
        $(window).on('touchstart', bgmStartHandler);
        $(window).on('touchend', bgmStartHandler);

        for(var i=1;i<11;i++) {
            if($('#bgm-src-'+i).length > 0 && $('#bgm-src-'+i).val().length > 0) {
                var item = {
                    src: $('#bgm-src-'+i).val().replaceAll('&amp;','&'),
                    title: $('#bgm-title-'+i).val()
                }
                bgmSource.push(item);
            }
        }

        if(currentIndex > bgmSource.length - 1) {
            currentIndex = 0;
        }

        myBgm = $('#bgm')[0];
        currentBgm = $('#current-bgm');
        
        myBgm.onplaying = function() {
            bgmPlaying = true;
            myBgm.volume = currentVolume = currentVolume>1||currentVolume<0?0.1:currentVolume;
            bgmMute('+');
            if(!currentBgm.hasClass('bgm-playing')) {
                currentBgm.addClass('bgm-playing');
                $('.bgm-header').addClass('bgm-playing');
            }
            $('#bgm-status').html('&#xf04c;'); //pause icon
        };

        myBgm.onpause = function() {
            bgmPlaying = false;
            if(currentBgm.hasClass('bgm-playing')) {
                currentBgm.removeClass('bgm-playing');
                $('.bgm-header').removeClass('bgm-playing');
            }
            $('#bgm-status').html('&#xf04b;'); //play icon
        };

        if(myBgm.muted) {
            bgmMute('-');
        } else {
            bgmMute('+');
        }
        getCurrentBgm();
    } else {
        window.localStorage.removeItem('current-bgm-index');
        window.localStorage.removeItem('current-bgm-volume');
        window.localStorage.removeItem('current-bgm-time');
        window.localStorage.removeItem('visit-time');
    }
}

function stopScrollTimer() {
    if(moveToTheTitleTimer != 0) {
        clearTimeout(moveToTheTitleTimer);
        moveToTheTitleTimer = 0;
    }
    if(smoothScrollTimer != 0) {
        clearTimeout(smoothScrollTimer);
        smoothScrollTimer = 0;
    }
}

var $headerTitle = $('header .inner p a');
var $headerTitleImage = $('header .inner p a img');
var headerTitleText = $('header .inner p a').text().trim();
var $header = $('header');
var initHeaderHeight = $('header').outerHeight();
var $topButton = $('.top-button');
var $contentTitle = $('article .inner .content-title');
var flagForMoveToTheTitle = true;
var fixedHeaderTimer = 0;
function fixedHeader() {
    if($('#fixed-header').val()){
        var bodyPaddingTop = Number($('body').css('padding-top').replace('px',''));
        var anchorAdsHeight = window.scrollY>bodyPaddingTop?addHeightByAnchorAds('top'):bodyPaddingTop;
        var sidebarOffsetTop = window.scrollY>$('.sidebar').offset().top-$headerTitle.height()?addHeightByAnchorAds('top'):0;
        if(window.scrollY > 0 && window.scrollHeight > window.innerHeight) {
            $('.content-wrapper').css('margin-top',initHeaderHeight+'px');
            $header.css('position', 'fixed');
            $header.css('top', anchorAdsHeight+'px');
            $header.css('left', '0');
            $header.css('z-index', '119');
            $topButton.css('position','fixed');
            $topButton.css('top', (anchorAdsHeight+10)+'px');
            $('#blog-menu').css('display','none');
            $header.css('height', ($headerTitle.height()+20)+'px');
            if(localStorage.getItem('dark-mode') != 'y') {
                $header.css('background', '#fff');
            } else {
                $header.css('background', '');
            }
            $header.css('opacity', '0.9');
            if($contentTitle.length > 0 && window.scrollY > $contentTitle.offset().top + $contentTitle.outerHeight()) {
                $headerTitle.html($('.content-title .inner .title-box h1').text());
                $headerTitle.attr('href', '#');
            } else {
                if($headerTitleImage.length > 0) {
                    $headerTitle.html("");
                    $headerTitle.append($headerTitleImage);
                } else {
                    $headerTitle.html(headerTitleText);
                }
                $headerTitle.attr('href', '/');
            }
            $('.progress-bar-horizontal').css('top', ($headerTitle.height()+20+anchorAdsHeight)+'px');
            $('#aside-top-blank').css('height', ($headerTitle.height()+30+sidebarOffsetTop)+'px');
            $('#aside-top-blank').slideDown(300,'linear');
        } else if(window.scrollY == 0) {
            if(fixedHeaderTimer != 0) {
                clearTimeout(fixedHeaderTimer);
                fixedHeaderTimer = 0;
            }
            $('#aside-top-blank').slideUp(300,'linear');
            $('#blog-menu').fadeIn(500,'linear');
            fixedHeaderTimer = 0;
            fixedHeaderTimer = setTimeout(function() {
                $('.content-wrapper').css('margin-top','');
                $header.css('height', '');
                $header.css('background', '');
                $header.css('border-bottom', '');
                $header.css('opacity', '');
                $header.css('position', '');
                $header.css('top', '');
                $header.css('left', '');
                $header.css('z-index', '');
                $topButton.css('top', (anchorAdsHeight+10)+'px');
                if($headerTitleImage.length > 0) {
                    $headerTitle.html("");
                    $headerTitle.append($headerTitleImage);
                } else {
                    $headerTitle.html(headerTitleText);
                }
            }, 200);
        }

        if($('.floating-toc').height() > 0) {
            $('.floating-toc').css('top', ($headerTitle.height()+20)+'px');
        }

        if(location.href.indexOf('#') > -1 && flagForMoveToTheTitle) {
            flagForMoveToTheTitle = false;
            moveToTheTitle();
        }
    }
}

function selectMakeFloatingToc() {
    makeFloatingToc();
}

function selectAppendToc() {
    if($('#use-floating-toc-yn').val()) {
        appendTocNew();
    }
}

function detectTop() {
    if(window.scrollY == 0) {
        if($headerTitle.attr('href') == '#') {
            $headerTitle.attr('href', '/');
        }
    }
}

function foldFloatingToc() {
    if(!((contentMiddleYn && (window.innerWidth-$('.content-wrapper').outerWidth())/2 > 250)
      ||(!contentMiddleYn && window.innerWidth > 1413))) {
        if(title != null && title.length > 0 && !title.hasClass('close')) {
            clickFloatingTitle();
        }
    }
}

var previousScrollTop = 0;
var sidebarScrollFlag = true;
function stickySidebar() {
    var sidebarHeight = '';
    if(window.scrollHeight > window.innerHeight + 100 && $('.sidebar div')[0].scrollHeight > window.innerHeight) {
        if($('.sidebar')[0].scrollHeight-$('.sidebar')[0].scrollTop > $('#lower').offset().top+$('#lower').height()+30-window.scrollY-75) {
            sidebarHeight = '';
        } else {
            sidebarHeight = '100vh';
        }
        if(sidebarScrollFlag) {
            sidebarScrollFlag = false;
            $('.sidebar').css('height', sidebarHeight);
            setTimeout(function() {
                sidebarScrollFlag = true;
            },50);
        }
        if($('.sidebar')[0].scrollTop > window.scrollY && previousScrollTop > window.scrollY) {
            $('.sidebar')[0].scrollTo(0,window.scrollY);
        }
        previousScrollTop = window.scrollY;
    } else {
        if(sidebarScrollFlag) {
            sidebarScrollFlag = false;
            $('.sidebar').css('height', '');
            setTimeout(function() {
                sidebarScrollFlag = true;
            },50);
        }
    }
}

function toggleCategory() {
    if($('#fold-category').val()) {
        var sidebarPosition = Number($('.sidebar').css('right').replace('px',''));
        if(Number.isNaN(sidebarPosition) || sidebarPosition > 0) {
            var category = $('.category_list > li');
            for(var i=0;i<category.length;i++) {
                var subCategory = category.eq(i).find('ul.sub_category_list');
                var targetArr = [];
                var targetStr = trim($('#fold-category-target').val());
                targetStr.split(",").forEach(function(v){if(v)targetArr.push(trim(v))});
                if(subCategory.length > 0 && (targetArr.indexOf(String(i+1)) > -1 || targetStr == "")) {
                    controlFoldCategory(i);
                }
            }
        }
    }
}

var foldFlag = true;
var tempIndex = -1;
function controlFoldCategory(index) {
    var category = $('.category_list > li');
    var categoryLink = $('.category_list > li > a');
    var speed = Number.isNaN(Number($('#fold-category-speed').val()))?600:Number($('#fold-category-speed').val());
    categoryLink.eq(index).addClass("fold");
    category.eq(index).find('ul.sub_category_list').slideUp(speed, 'swing');
    category.eq(index).hover(function(){
        unfoldCategory(category, categoryLink, index, speed);
    }, function() {
        foldCategory(category, categoryLink, index, speed).then(function() {
            if(tempIndex != -1 && index != tempIndex) {
                unfoldCategory(category, categoryLink, tempIndex, speed);
            } else {
                foldCategory(category, categoryLink, index, speed);
            }
        });
        tempIndex = -1;
    });
}

function unfoldCategory(category, categoryLink, index, speed) {
    tempIndex = index;
    var targetSubCategory = category.eq(index).find('ul.sub_category_list');
    if(targetSubCategory.css('display') == 'none' && foldFlag) {
        foldFlag = false;
        targetSubCategory.slideDown(speed, 'swing', function() {
            categoryLink.eq(index).removeClass("fold");
        });
    }
}

function foldCategory(category, categoryLink, index, speed) {
    return new Promise(function(resolve) {
        var targetSubCategory = category.eq(index).find('ul.sub_category_list');
        if(targetSubCategory.css('display') != 'none') {
            targetSubCategory.slideUp(speed, 'swing', function() {
                categoryLink.eq(index).addClass("fold");
                foldFlag = true;
                resolve();
            });
        }
    });
}

function replaceLink() {
    var aLink = $('.inner a');
    for(var i=0;i<aLink.length;i++) {
        if(aLink.eq(i).attr('href')) {
            aLink.eq(i).attr('href',aLink.eq(i).attr('href').split("?category=")[0]);
        }
    }
}

var prePostFlag = true;
var nextPostFlag = true;
function makeRecommendBlock(type, currentIndex) {
    if(prePostFlag && type == 'pre') {
        prePostFlag = false;
        $('#pre-content').append($('.another_category tr').eq(currentIndex+1).find('a').clone());
        $('#next-content').append('<a href="#" class="no-post">다음 글 없음</a>');
        $('.content-box .content-arrow').eq(1).addClass('no-post');
    } else if(nextPostFlag && type == 'next') {
        nextPostFlag = false;
        $('#next-content').append($('.another_category tr').eq(currentIndex-1).find('a').clone());
        $('#pre-content').append('<a href="#" class="no-post">이전 글 없음</a>');
        $('.content-box .content-arrow').eq(0).addClass('no-post');
    } else if(prePostFlag && nextPostFlag && type == 'both') {
        prePostFlag = false;
        nextPostFlag = false;
        $('#pre-content').append($('.another_category tr').eq(currentIndex+1).find('a').clone());
        $('#next-content').append($('.another_category tr').eq(currentIndex-1).find('a').clone());
    }
}

var recommendPostFlag = true;
var recommendPostTimer = 0;
var preRecommendPosition = -1;
function recommendPost() {
    if($('.another_category').length > 0) {
        var position = window.scrollY/($('.another_category').offset().top-window.innerHeight);
        if(position > 1 && window.scrollY-$('.another_category').offset().top < 0 && preRecommendPosition < window.scrollY) {
            if(recommendPostFlag) {
                recommendPostFlag = false;
                var anotherCategory = $('.another_category tr');
                var currentIndex = -1;
                if(anotherCategory.length > 1) {
                    for(var i=0;i<anotherCategory.length;i++) {
                        if(anotherCategory.eq(i).find('a.current').length > 0) {
                            currentIndex = i;
                            break;
                        }
                    }
                    if(currentIndex > 0 && currentIndex < anotherCategory.length-1) { //이전글, 다음글 가능
                        makeRecommendBlock('both', currentIndex); 
                    } else {
                        if(currentIndex == 0) { //이전글 가능
                            makeRecommendBlock('pre', currentIndex); 
                        } else if(anotherCategory.length > 1) { //다음글 가능
                            makeRecommendBlock('next', currentIndex);
                        }
                    }
                }
    
                if((!prePostFlag || !nextPostFlag) && recommendPostTimer == 0) {
                    var rightMargin = 0;
                    if(window.innerWidth > 310) {
                        rightMargin = 10;
                    } else {
                        rightMargin = (window.innerWidth - 310) / 2;
                    }

                    $('#recommend-contents').css('bottom', (addHeightByAnchorAds('bottom')+60)+'px');
                    $('#recommend-contents').css('right', '-350px');
                    $('#recommend-contents').css('display','block');
                    recommendPostTimer = $('#recommend-contents').animate({'right':rightMargin+'px'}, 1000, 'swing', function() {});
                    recommendPostTimer = setTimeout(function() {
                        $('#recommend-contents').animate({'right':'-350px'}, 1000, 'swing', function() {
                            $('#recommend-contents').css('display','none');
                            recommendPostTimer = 0;
                        });
                    }, 10000);
                }
            }
        } else {
            recommendPostFlag = true;
        }
        preRecommendPosition = window.scrollY;
    }
}

function addHeightByAnchorAds(type) {
    if($('.adsbygoogle[data-anchor-status]').length > 0
      && $('.adsbygoogle[data-anchor-status]').attr('data-anchor-status') == 'displayed') {
        if(type == 'bottom') {
            if($('.adsbygoogle[data-anchor-status]').offset().top > window.scrollY) {
                return $('.adsbygoogle[data-anchor-status]').height();
            } else {
                return 0;
            }
        } else if(type == 'top') {
            if($('.adsbygoogle[data-anchor-status]').offset().top == window.scrollY) {
                return $('.adsbygoogle[data-anchor-status]').height();
            } else {
                return 0;
            }
        }
    } else {
        return 0;

    }
}

checkAdsenseAdsFlag = true;
function checkAdsenseAds() {
    if(checkAdsenseAdsFlag) {
        var insAdsbygoogle = $('ins.adsbygoogle');
        if(insAdsbygoogle.length > 0) {
            var cnt = 0;
            for(var i=0; i<insAdsbygoogle.length; i++) {
                if( insAdsbygoogle.eq(i).attr('data-ad-client') != ''
                  && insAdsbygoogle.eq(i).attr('data-adsbygoogle-status') != 'done'
                  && insAdsbygoogle.eq(i).attr('data-ad-status') != "filled") {
                    insAdsbygoogle.eq(i).children().remove();
                    insAdsbygoogle.eq(i).removeAttr('data-adsbygoogle-status');
                    (adsbygoogle = window.adsbygoogle || []).push({});
                    cnt++;
                }
            }
            if(cnt == 0) checkAdsenseAdsFlag = false;
        }
    }
}

function commonForScroll() {
    $('.floating-button').css('bottom', addHeightByAnchorAds('bottom')+15+'px');
    $('#wrapper').css('padding-bottom',addHeightByAnchorAds('bottom')+'px');
    
}

function refreshAds(type) {
    if($('#adsense-refresh').val()) {
        if(type == 'init') {
            refreshAds('recommend');
            setTimeout(function() {
                refreshAds('sidebar');
            },200);
        } else {
            setTimeout(function() {
                if(type == 'recommend') {
                    if($('#recommend-ads > ins').children().length > 0) {
                        $('#recommend-ads > ins').children().remove();
                        $('#recommend-ads > ins').removeAttr('data-adsbygoogle-status');
                        (adsbygoogle = window.adsbygoogle || []).push({});
                        refreshAds('recommend');
                    }
                } else if(type == 'sidebar') {
                    if($('.sidebar .revenue_unit_wrap .adsbygoogle').length > 0) {
                        $('.sidebar .revenue_unit_wrap .adsbygoogle').children().remove();
                        $('.sidebar .revenue_unit_wrap .adsbygoogle').removeAttr('data-adsbygoogle-status');
                        (adsbygoogle = window.adsbygoogle || []).push({});
                        refreshAds('sidebar');
                    }
                }
            }, 30000*(Math.random()*2+1));
        }
    }
}

$(document).ready(function() {
    makeToc();
    selectMakeFloatingToc();
    commentControl();
    commentAutoLink();
    smoothScroll();
    initFoldReply();
    updateTagsAttr();
    lazyLoading();
    moveToTheTitle();
    makeBell();
    toastAfterLike();
    bgmEvents();
    toggleCategory();
    replaceLink();
    refreshAds('init');
    checkAdsenseAds();
    common();
    
    $(window).on('scroll resize', function() {
        scrollProgressBar();
        selectAppendToc();        
        fixedRecommendAds('toc');
        stopScrollTimer();
        fixedHeader();
        detectTop();
        stickySidebar();
        foldFloatingToc();
        recommendPost();
        checkAdsenseAds();
        commonForScroll();
    });
});
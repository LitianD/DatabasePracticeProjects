var storage = null;
if (window.localStorage) {
    var storage = window.localStorage
}
function getLocalStorage(b) {
    var a = "";
    if (storage) {
        a = storage.getItem(b);
        if (a == null || a == "") {
            a = getCookie(b);
            storage.setItem(b, a)
        }
    } else {
        a = getCookie(b)
    }
    return a
}
function setLocalStorage(a, b) {
    if (storage) {
        storage.setItem(a, b)
    } else {
        ret = setCookie(a, b)
    }
}
function getCookie(b) {
    var a, c = new RegExp("(^| )" + b + "=([^;]*)(;|$)");
    if (a = document.cookie.match(c)) {
        return unescape(a[2])
    } else {
        return ""
    }
}
function setCookie(a, c) {
    var b = 30;
    var d = new Date();
    d.setTime(d.getTime() + b * 24 * 60 * 60 * 1000);
    document.cookie = a + "=" + escape(c) + ";expires=" + d.toGMTString() + ";path=/"
}
function isFuncExist(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true
        } else {
            return false
        }
    } catch(e) {}
    return false
}
var canLoginRegSubmit = true;
function switchToModal(a) {
    if (a == "reg") {
        $("#modalLogin").modal("hide");
        $("#modalReg").modal("show")
    } else {
        if (a == "login") {
            $("#modalReg").modal("hide");
            $("#modalLogin").modal("show")
        }
    }
}
var canLoginCallBack = false;
//登陆函数
function login() {
    if ($("#modalLogin .lblerr").length > 0) {
        return
    }
    // if (!$("#modalLoginErr").is(":hidden")) {
    //     return
    // }
    var a = $.trim($("#modal-login-name").val());
    var b = $.trim($("#modal-login-pwd").val());
    var d = true;
    if (a == "") {
        var c = "请输入手机号/昵称/邮箱";
        $("#modal-login-name").parent().append("<label class='lblerr'>" + c + "</label>");
        d = false
    }
    if (b == "") {
        var c = "请输入密码";
        $("#modal-login-pwd").parent().append("<label class='lblerr'>" + c + "</label>");
        d = false
    }
    if (d) {
        var params = {
           name: a,
           pwd: b,
        };

        var temp = document.createElement("form");
        temp.action = "/";
        temp.method = "post";
        temp.style.display = "none";

        for (var x in params) {
            var opt = document.createElement("textarea");
            opt.name = x;
            opt.value = params[x];
            temp.appendChild(opt);
         }

        document.body.appendChild(temp);
        temp.submit();
        //httpPost("../account/check/", params);

//        $.post("../account/check/", {
//            name: a,
//            pwd: b,
//            rmb: ($("#chk-rmb").prop("checked") ? 1 : 0)
//        },
//        function(g) {
//            if (g && g.r == 1) {
//                hasLogin = true;
//                var e = g.rdi;
//                var f = window.location.href;
//                if (g.vp == 0) {
//                    window.location.href = "/account/bindphone?sr=1"
//                }
//				canLoginCallBack = true;
//
//                if (canLoginCallBack) {
//                    hasLogin = true;
//                    //$("#navbar-menu").append("<a class='btn' href='/my/bill' id='mbt'><i class='fa fa-vine'></i> " + g.chn + "</a>");
//                    $("#modalReg-bt").hide();
//					$("#modalReg").modal('hide');
//                    if (g.n == 1) {
//                        $("#modalPwd").modal({
//                            show: true,
//                            backdrop: "static"
//                        })
//                    }
//                    loginCallBack();
//                    canLoginCallBack = false
//                } else {
//                    if (getQueryString("rdi")) {
//                        window.location.href = getQueryString("rdi")
//                    } else {
//                        if (e == "/" && f.indexOf("/account/login") < 0) {
//                            window.location.reload()
//                        } else {
//                            window.location.href = e
//                        }
//                    }
//                }
//            } else {
//                if (g.msg && g.msg != "") {
//                    $("#modal-login-pwd").blur();
//                    $("#modalLoginErrCont").html(g.msg);
//                    $("#modalLoginErr").show()
//                }
//            }
//        },
//        "json")
    }
}

function httpPost(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    temp.style.display = "none";

    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        temp.appendChild(opt);
    }

    document.body.appendChild(temp);
    temp.submit();

    return temp;
}


function reg() {
    if ($("#modalReg .lblerr").length > 0) {
        return
    }
    if (!$("#modalRegErr").is(":hidden")) {
        return
    }
    var b = $.trim($("#modal-reg-name").val());
    var e = $.trim($("#modal-reg-pwd").val());
    var d = $.trim($("#modal-reg-pcode").val());
    var h = true;
    if (b == "") {
        var f = "请输入11位手机号";
        $("#modal-reg-name").parent().append("<label class='lblerr'>" + f + "</label>");
        h = false
    } else {
        if (!isPhone(b)) {
            var f = "手机号有误";
            $("#modal-reg-name").parent().append("<label class='lblerr'>" + f + "</label>");
            h = false
        } else {
            if (d == "") {
                var f = "请输入6位短信验证码";
                $("#modal-reg-pcode").parent().append("<label class='lblerr lblerrpcode'>" + f + "</label>");
                h = false
            }
        }
    }
    if (h) {
        var c = $("input[name='geetest_challenge']").val();
        var g = $("input[name='geetest_validate']").val();
        var a = $("input[name='geetest_seccode']").val();
        $.post("/account/reg", {
            name: b,
            pcode: d,
            gc: c,
            gv: g,
            gs: a
        },
        function(j) {
            if (j && j.r == 1) {
                hasLogin = true;
                $("#navbar-menu").append("<a class='btn' href='/my/bill' id='mbt'><i class='fa fa-vine'></i> " + j.chn + "</a>");
                $("#modalReg-bt").hide();
                $("#modalReg").modal("hide");
                if (j.n == 1) {
                    $("#modalPwd").modal({
                        show: true,
                        backdrop: "static"
                    })
                }
            } else {
                if (j.msg && j.msg != "") {
                    $("#modalRegErrCont").html(j.msg);
                    $("#modalRegErr").show()
                }
                if (j.nameerr && j.nameerr != "") {
                    $("#modal-reg-name").parent().append("<label class='lblerr'>" + j.nameerr + "</label>")
                }
                if (j.pwderr && j.pwderr != "") {
                    $("#modal-reg-pwd").parent().append("<label class='lblerr'>" + j.pwderr + "</label>")
                }
            }
        },
        "json")
    }
}
function resetLoginErr() {
    $(this).siblings().each(function() {
        if ($(this).hasClass("lblerr")) {
            $(this).remove()
        }
    });
    $("#modalLoginErr").hide();
    $("#modalLoginErrCont").html("");
    $("#modalRegErr").hide();
    $("#modalRegErrCont").html("");
    canLoginRegSubmit = true
}
var captchaPass = false;
var phonePass = false;
var sendCodeCounter = null;
var initSec = 60;
var isDelay = false;
function sendPCode(b, a) {
    if (!isDelay && captchaPass && isPhone($.trim($("#" + a).val()))) {
        $.post("/account/sendphonecode", {
            phone: $.trim($("#" + a).val())
        },
        function(c) {
            if (c && c.r == 1) {
                isDelay = true;
                setSendBtStatus(b)
            }
        },
        "json")
    }
}
function setSendBtStatus(a) {
    showMsg("短信验证码已经发送");
    $("#" + a).html("<span id='" + a + "-cd'>" + initSec + "</span> 秒后可以重新发送").prop("disabled", true);
    $("#" + a).siblings().each(function() {
        if ($(this).hasClass("lblerr")) {
            $(this).remove()
        }
    });
    if (sendCodeCounter) {
        clearInterval(sendCodeCounter)
    }
    sendCodeCounter = setInterval("updateSendCounter('" + a + "')", 1000)
}
function updateSendCounter(a) {
    var b = parseInt($("#" + a + "-cd").html());
    if (b > 1) {
        $("#" + a + "-cd").html(--b)
    } else {
        isDelay = false;
        $("#" + a).html("获取验证码").prop("disabled", false)
    }
}
function savePwd() {
    var a = $.trim($("#modal-reg-pwd").val());
    if (a.length < 6) {
        $("#modalPwdErrCont").html("密码至少6位");
        $("#modalPwdErr").show()
    } else {
        if (!$("#modal-achk").prop("checked")) {
            $("#modalPwdErrCont").html("请阅读并勾选同意《悦合同服务协议》");
            $("#modalPwdErr").show()
        } else {
            $.post("/account/pwd/initsave", {
                pwd: a
            },
            function(b) {
                if (b.r == 1) {
                    showMsg("密码设置成功");
                    $("#modalPwd").modal("hide")
                } else {
                    if (b.r == 2) {
                        $("#modalPwd").modal("hide")
                    } else {
                        if (b.msg != "") {
                            $("#modalPwdErrCont").html(b.msg);
                            $("#modalPwdErr").show()
                        }
                    }
                }
            },
            "json")
        }
    }
}
$(function() {
    $("#modal-reg-name").focus(resetLoginErr);
    $("#modal-reg-pcode").focus(resetLoginErr);
    $("#modal-login-name").focus(resetLoginErr);
    $("#modal-login-pwd").focus(resetLoginErr);
    $("#modalLogin").on("hide.bs.modal",
    function(a) {
        $("#modalLogin .form-group .lblerr").remove();
        $("#modalLogin .form-group input").val("");
        $("#modalLoginErr").hide();
        $("#modalLoginErrCont").html("")
    });
    $("#modalReg").on("hide.bs.modal",
    function(a) {
        $("#modalReg .form-group .lblerr").remove();
        $("#modalReg .form-group input").val("");
        $("#modalRegErr").hide();
        $("#modalRegErrCont").html("");
        $("#alertRegTips").hide();
        $("#alertRegTipsCont").html("")
    });
    $("#modal-mail-addr").focus(resetMailErr);
    $("#modal-login-name").keypress(function(a) {
        if (a.which == "13" || a.which == "9") {
            $("#modal-login-pwd").focus().select();
            a.stopPropagation()
        }
    });
    $("#modal-login-pwd").keypress(function(a) {
        if (a.which == "13") {
            login()
        }
    });
    $("#f-pwd-bt").click(savePwd);
    $("#modal-reg-pwd").focus(function() {
        $("#modalPwdErr").hide();
        $("#modalPwdErrCont").html("")
    });
    $(document).click(function(b) {
        // if ($(window).width() > 990) {
        //     return
        // }
        // if (b.target && b.target.id == "nav-login-area") {
        //     return
        // }
        // var a = $("#nav-login-area");
        // if (!a.is(":hidden")) {
        //     a.slideUp(300)
        // }
    });
    $("#com-star>i").hover(function() {
        var a = $(this);
        var b = a.data("it");
        for (i = 0; i < b; i++) {
            $("#com-star>i").eq(i).removeClass("fa-star-o").addClass("fa-star")
        }
        for (i = b; i < 5; i++) {
            $("#com-star>i").eq(i).removeClass("fa-star").addClass("fa-star-o")
        }
    },
    function() {
        var a = $("#com-star-val").val();
        for (i = 0; i < a; i++) {
            $("#com-star>i").eq(i).removeClass("fa-star-o").addClass("fa-star")
        }
        for (i = a; i < 5; i++) {
            $("#com-star>i").eq(i).removeClass("fa-star").addClass("fa-star-o")
        }
    }).click(function() {
        var a = $(this);
        $("#com-star-val").val(a.data("it"))
    });
    $("#mach-star>i").hover(function() {
        var a = $(this);
        var b = a.data("it");
        for (i = 0; i < b; i++) {
            $("#mach-star>i").eq(i).removeClass("fa-star-o").addClass("fa-star")
        }
        for (i = b; i < 5; i++) {
            $("#mach-star>i").eq(i).removeClass("fa-star").addClass("fa-star-o")
        }
    },
    function() {
        var a = $("#mach-star-val").val();
        for (i = 0; i < a; i++) {
            $("#mach-star>i").eq(i).removeClass("fa-star-o").addClass("fa-star")
        }
        for (i = a; i < 5; i++) {
            $("#mach-star>i").eq(i).removeClass("fa-star").addClass("fa-star-o")
        }
    }).click(function() {
        var a = $(this);
        $("#mach-star-val").val(a.data("it"))
    })
});
function showLogin() {
    $("#modalLogin").modal("show")
}
function toggleMore() {
    var a = $("#nav-login-area");
    if (a.is(":hidden")) {
        a.slideDown(300)
    } else {
        a.slideUp(300)
    }
}
function getRandomNum(a, c) {
    var d = c - a;
    var b = Math.random();
    return (a + Math.round(b * d))
}
$(function() {
    var a = parseInt(getLocalStorage("cmtidTipsCount"));
    if (isNaN(a) || a <= 0) {
        a = 1
    } else {
        a++
    }
    setLocalStorage("cmtidTipsCount", a);
    if (getCookie("cmtids") != "" && a <= 3) {
        $("#cmtidCountHref").attr("data-content", "您新建的合同都在这里.").popover().focus()
    }
});
function resetMailErr() {
    $("#modalMailErr").hide();
    $("#modalMailErrCont").html("")
}
function YueSendMail() {
    var a = $("#cmtid").val();
    if (a != "") {
        var b = $("#modal-mail-addr").val();
        var c = $("#modal-mail-msg").val();
        if (b != "") {
            if (b.indexOf("@") < 0) {
                $("#modalMailErrCont").html("发送地址有误，请检查");
                $("#modalMailErr").show()
            } else {
                $(".btn-mail").html("发送中...");
                $.post("/mail/send", {
                    cmtid: a,
                    addrs: b,
                    msg: c
                },
                function(d) {
                    if (d && d.r == 1) {
                        showMsg("邮件发送成功");
                        $("#modalMail").modal("hide")
                    } else {
                        if (d.msg != "") {
                            $("#modalMailErrCont").html(d.msg);
                            $("#modalMailErr").show()
                        }
                    }
                    $(".btn-mail").html("发送<i class='fa fa-share'></i>")
                },
                "json")
            }
        } else {
            $("#modalMailErrCont").html("发送地址为空");
            $("#modalMailErr").show()
        }
    }
}
function saveToLocalZanList(a, d) {
    if (d == "") {
        return
    }
    var b = getLocalStorage(a);
    var c = b.split("|");
    for (i = 0; i < c.length; i++) {
        if (c[i] == d) {
            return
        }
    }
    c.push(d);
    c = $.grep(c,
    function(e) {
        return $.trim(e).length > 0
    });
    setLocalStorage(a, c.join("|"))
}
function addZan() {
    var b = $("#pid").val();
    if (!hasLogin) {
        var a = getLocalStorage("zanlist");
        if (a.indexOf(b) >= 0) {
            showMsg("您已经赞过了");
            return
        } else {
            saveToLocalZanList("zanlist", b)
        }
    }
    $.post("/contract/zan", {
        pid: b
    },
    function(c) {
        if (c && c.r == 1) {
            var d = parseInt($("#zan-num").html());
            if (isNaN(d)) {
                d = 1
            } else {
                d++
            }
            $("#zan-num").html(d)
        } else {
            if (c.msg != "") {
                showMsg(c.msg)
            }
        }
    },
    "json")
}
function addFav() {
    if (hasLogin) {
        $.post("/my/favorites/add", {
            pid: $("#pid").val()
        },
        function(b) {
            if (b && b.r == 1) {
                var a = parseInt($("#zan-shou-num").html());
                if (isNaN(a)) {
                    a = 1
                } else {
                    a++
                }
                $("#zan-shou-num").html(a)
            } else {
                if (b.msg != "") {
                    showMsg(b.msg)
                }
            }
        },
        "json")
    } else {
        $("#alertRegTipsCont").html("悦合同温馨提示：请登录后使用该功能");
        $("#alertRegTips").show();
        canLoginCallBack = true;
        $("#modalReg").modal("show")
    }
}
function submitComment() {
    var a = $.trim($("#comment-txt").val());
    var b = parseInt($("#com-star-val").val());
    if (isNaN(b) || b < 1) {
        showMsg("请打总体评价分数")
    } else {
        if (a.length == 0) {
            showMsg("评论内容不能为空")
        } else {
            $.post("/comment/add", {
                cont: a,
                name: $("#comment-txt-name").val(),
                pid: $("#pid").val(),
                star: b,
                type: $("#ttype").val()
            },
            function(c) {
                if (c && c.r == 1) {
                    window.location.reload()
                }
            },
            "json")
        }
    }
}
function machComment() {
    var a = $.trim($("#mach-txt").val());
    var b = parseInt($("#mach-star-val").val());
    if (isNaN(b) || b < 1) {
        showMsg("请打总体评价分数")
    } else {
        if (a.length == 0) {
            showMsg("评论内容不能为空")
        } else {
            $.post("/comment/addMach", {
                cont: a,
                pid: $("#mach-pid").val(),
                star: b,
                type: $("#mach-ttype").val()
            },
            function(c) {
                if (c && c.r == 1) {
                    window.location.reload()
                }
            },
            "json")
        }
    }
}
function getCommentP(c, b) {
    if (!isNaN(c) && c > 0) {
        var d = $("#ctablename").val();
        var a = 0;
        if (d == "diy") {
            a = $("#pid").val()
        }
        $.post("/comment/get", {
            page: c,
            psize: b,
            ttype: d,
            pid: a
        },
        function(e) {
            $("#comment-area-in").html(e)
        })
    }
}
var queryDom = null;
$(function() {
    if ($("#search-key").length > 0) {
        queryDom = $("#search-key")
    }
    if (queryDom && queryDom.length > 0) {
        queryDom.keydown(function(a) {
            if (a.which == "13") {
                search()
            }
        });
        $("#query-sug-outer").width(queryDom.outerWidth());
        queryDom.bind("input propertychange",
        function() {
            getQuerySug($(this).attr("id"))
        })
    }
});
function search() {
    var b = $.trim(queryDom.val());
    if (b != "") {
        var a = "/query/1/" + b;
        window.location.href = a
    }
}
var sugTimer = null;
var sugCountDown = 500;
var sugCurMark = 0;
var sugDomId = "";
function getQuerySug(a) {
    sugDomId = a;
    if (sugTimer) {
        clearTimeout(sugTimer)
    }
    sugTimer = setTimeout("getQuerySugAct()", sugCountDown)
}
function getQuerySugAct() {
    if (sugDomId == "") {
        return
    }
    var b = $.trim($("#" + sugDomId).val());
    if (b == "") {
        return
    }
    var a = Date.parse(new Date()) / 1000;
    sugCurMark = a;
    $.get("/query/suggest?wd=" + b + "&ts=" + sugCurMark, setQuerySug)
}
function setQuerySug(b) {
    if (b == "") {
        $("#query-sug-outer").css("left", "-1100px").html("");
        return
    }
    var a = "";
    var d = b.split("|");
    if (parseInt(d[0]) == sugCurMark) {
        a = d[1]
    } else {
        return
    }
    $("#query-sug-outer").html(a);
    var c = queryDom.offset().top + queryDom.outerHeight();
    $("#query-sug-outer").css("top", c + "px").css("left", queryDom.offset().left + "px").show();
    $(document).one("click",
    function() {
        $("#query-sug-outer").css("left", "-1100px").html("")
    })
}
var msgETA = 3 * 1000;
var msgTimer = null;
function hideMsg() {
    $("#msg_area").fadeOut(300);
    $("#msg_mask").hide()
}
function showMsg(b, a) {
    if (b != "") {
        if ($("#msg_area").length == 0) {
            $("body").append("<div id='msg_area'><span id='msg_cont'></span></div><div id='msg_mask'></div>");
            $("#msg_mask").click(hideMsg)
        }
        $("#msg_cont").html(b);
        $("#msg_mask").show();
        $("#msg_area").fadeIn(100);
        msgTimer = setTimeout(function() {
            hideMsg();
            if (typeof(a) === "function") {
                a()
            }
        },
        msgETA)
    }
}
window.onresize = function() {
    if (typeof(chartArr) != "undefined" && chartArr.length > 0) {
        $("#chart-area").width($("#chart-area").parent().width() - 2);
        for (i = 0; i < chartArr.length; i++) {
            chartArr[i].resize()
        }
    }
    var b = $("#nav-login-area");
    var c = $("#top-main-menu");
    var a = $("#top-my-menu");
    if ($(window).width() > 990) {
        if (b.is(":hidden")) {
            b.show().css("display", "inline-block")
        } else {
            b.css("display", "inline-block")
        }
        c.show();
        a.hide()
    } else {
        b.hide();
        c.hide();
        a.show()
    }
};
$(document).scroll(function() {
    if ($(this).scrollTop() > 150) {
        if ($("#rnav-wxc").is(":hidden")) {
            $("#top-a").fadeIn(300)
        }
    } else {
        $("#top-a").fadeOut(300)
    }
});
function toTop() {
    $("body,html").animate({
        scrollTop: 0
    },
    200)
}
function isEmail(c) {
    var a = false;
    var b = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (b.test(c)) {
        a = true
    }
    return a
}
function isPhone(c) {
    var a = false;
    var b = /^1[3|4|5|7|8|9]\d{9}$/;
    if (b.test(c)) {
        a = true
    }
    return a
}
function gblen(c) {
    var a = 0;
    for (var b = 0; b < c.length; b++) {
        if (c.charCodeAt(b) > 127 || c.charCodeAt(b) == 94) {
            a += 2
        } else {
            a++
        }
    }
    return a
}
function GetRandomNum(a, c) {
    var d = c - a;
    var b = Math.random();
    return (a + Math.round(b * d))
}
function getQueryString(a) {
    var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i");
    var c = window.location.search.substr(1).match(b);
    if (c != null) {
        return unescape(c[2])
    }
    return null
}
$(function() {
    $("#agreeModalCont").height($(window).height() * 0.7);
    $.ajax({
        type: "GET",
        url: "https://notify.yuehetong.com/rd?r=" + Math.random(),
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        success: function(b) {
            if (b && b.r == 1) {
                var a = "<i class='rdtips'></i>";
                if (parseInt(b.index) > 0) {
                    $("#mbt").append(a);
                    $("#top-nav-bt").append(a)
                }
                if (parseInt(b.serIndex) > 0) {
                    $("#mbt2").append(a);
                    $("#top-nav-bt").append(a)
                }
                if (parseInt(b.diy) > 0) {
                    $(".mbt-diy").append(a)
                }
                if (parseInt(b.gai) > 0) {
                    $(".mbt-gai").append(a)
                }
                if (parseInt(b.xie) > 0) {
                    $(".mbt-xie").append(a)
                }
                if (parseInt(b.guwen) > 0) {
                    $(".mbt-guwen").append(a)
                }
            }
        },
        error: function() {}
    })
});
var agreechk = $("#agreeChk");
function agreeToggle() {
    if (agreechk.hasClass("fa-square-o")) {
        agreechk.removeClass("fa-square-o").addClass("fa-check-square");
        $("#bt-create").prop("disabled", false);
        $("#a-create").removeClass("disabled")
    } else {
        agreechk.removeClass("fa-check-square").addClass("fa-square-o");
        $("#bt-create").prop("disabled", true);
        $("#a-create").addClass("disabled")
    }
}
function loadUserAgree() {
    $("#agreeModal").modal("show")
}
function agreeModalAccept() {
    if (hasLogin) {
        agreechk.removeClass("fa-square-o").addClass("fa-check-square");
        $("#bt-create").prop("disabled", false);
        var a = $("#contract-maker");
        if (a.length > 0) {
            saveAllTable();
            a.submit()
        } else {
            makeFOrder()
        }
    } else {
        $("#alertRegTipsCont").html("悦合同温馨提示：请登录后使用该功能");
        $("#alertRegTips").show();
        canLoginCallBack = true;
        $("#modalReg").modal("show")
    }
    $("#agreeModal").modal("hide")
}
function agreeModalRefuse() {
    agreechk.removeClass("fa-check-square").addClass("fa-square-o");
    $("#bt-create").prop("disabled", true);
    $("#agreeModal").modal("hide")
}
function makeFOrder() {
    if ($("#agreeChk").hasClass("fa-square-o")) {
        $("#agreeModal").modal("show");
        return
    }
    if ($("#bt-create").prop("disabled")) {
        return
    }
    $.post("/form/save", {
        cid: $("#contract_id").val(),
        ctitle: $("#contract_title").val()
    },
    function(a) {
        if (a && a.r == 1) {
            if (a.rdi) {
                window.location.href = a.rdi
            }
        } else {
            if (a.msg != "") {
                showMsg("保存失败，请检查后重试")
            }
        }
    },
    "json")
}
function jumpToResult() {
    window.location.href = "/diy/view/" + cmtid
}
function submitDIY() {
    if (hasLogin) {
        if ($("#agreeChk").hasClass("fa-square-o")) {
            $("#agreeModal").modal("show")
        } else {
            saveAllTable();
            $("#contract-maker").submit()
        }
    } else {
        $("#alertRegTipsCont").html("悦合同温馨提示：请登录后使用该功能");
        $("#alertRegTips").show();
        canLoginCallBack = true;
        $("#modalReg").modal("show")
    }
}
function saveAllTable() {
    var a = $("#cmtid").val();
    $(".tablediv").each(function() {
        var b = $(this);
        var d = b.data("tableid");
        var c = $("#table_" + d).handsontable("getInstance");
        var g = JSON.stringify(c.getData());
        var f = "";
        if (c.mergeCells.mergedCellInfoCollection) {
            mergeColl = c.mergeCells.mergedCellInfoCollection;
            f = JSON.stringify(mergeColl)
        }
        var e = b.find("table").html();
        $.ajax({
            type: "post",
            url: "/diy/make/savetable",
            data: {
                tdata: g,
                mergeConf: f,
                tableid: d,
                cmtid: a,
                tableraw: e
            },
            dataType: "json",
            async: false,
            success: null
        })
    })
}
function delorder(a) {
    if (a != "") {
        if (confirm("您确定删除该订单么？")) {
            $.post("/my/order/del", {
                oid: a
            },
            function(b) {
                if (b && b.r == 1) {
                    window.location.reload()
                }
            },
            "json")
        }
    }
}
var uiarr = new Array();
var curUi = 0;
var uiShowInit = 8000;
var uiShowDelay = 20000;
var uiHideDelay = 4500;
var aD = 300;
function showUITips() {
    if (uiarr[curUi]) {
        showUITipsLayer(uiarr[curUi]);
        curUi++;
        setTimeout("showUITips()", uiShowDelay)
    }
}
var uitips = null;
function showUITipsLayer(a) {
    if (!uitips) {
        uitips = $("#uitips")
    }
    $("#uitipscont").html(a);
    uitips.animate({
        right: "0px"
    },
    aD);
    setTimeout("hideUITips()", uiHideDelay)
}
function hideUITips() {
    uitips.stop().animate({
        right: "-300px"
    },
    aD)
}
$(function() {
    var a = '<i class="fa fa-weixin"></i>';
    $("#rnav-wx").hover(function() {
        var d = $(this).data("cont");
        $(this).html(d).addClass("rnav-wx2");
        $("#rnav-wxc").fadeIn(300)
    },
    function() {
        $(this).html(a).removeClass("rnav-wx2");
        $("#rnav-wxc").fadeOut(300)
    });
    var b = '<i class="fa fa-phone"></i>';
    $("#rnav-tel").hover(function() {
        var d = $(this).data("cont");
        $(this).html(d).addClass("rnav-wx2");
        $("#rnav-telc").fadeIn(300)
    },
    function() {
        $(this).html(b).removeClass("rnav-wx2");
        $("#rnav-telc").fadeOut(300)
    })
});
var handlerEmbed = function(b) {
    var a = inputid = "";
    $("#pcode-a").click(function() {
        $phone = $.trim($("#modal-reg-name").val());
        if ($phone == "") {
            $("#modal-reg-name").parent().append("<label class='lblerr'>请输入11位手机号</label>")
        } else {
            if (isPhone($phone)) {
                a = "pcode-a";
                inputid = "modal-reg-name";
                b.verify()
            } else {
                $("#modal-reg-name").parent().append("<label class='lblerr'>手机号有误</label>")
            }
        }
    });
    b.appendTo("#embed-captcha");
    b.onSuccess(function() {
        captchaPass = true;
        sendPCode(a, inputid)
    })
};
// if (!hasLogin) {
//     $.ajax({
//         url: "/captcha/get?t=" + (new Date()).getTime(),
//         type: "get",
//         dataType: "json",
//         success: function(a) {
//             initGeetest({
//                 gt: a.gt,
//                 challenge: a.challenge,
//                 new_captcha: a.new_captcha,
//                 width: "100%",
//                 product: "bind",
//                 offline: !a.success
//             },
//             handlerEmbed)
//         }
//     })
// };
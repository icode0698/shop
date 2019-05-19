$(function () {
    // 顶部动态显示登录状态(session)
    $.ajax({
        type: "post",
        dataType: "json",
        url: "servlet/Whether",
        data: {
            type: "ajax_whether",
            message: "getStatus"
        }, success: function (data) {
            console.log(data);
            if (data.status == "success") {
                $("#login_no").addClass("hidden");
                $("#login_yes").removeClass("hidden");
                $("#span_user").text(data.nickName);
                $("#headPic").attr("src",data.headPic);
            }
        }, error: function () {
            console.log("服务器异常\najax_whether:" + XMLResponse.status);
            return;
        }
    });
    // 处理退出登录
    $("#btn_out").click(function () {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "servlet/Whether",
            data: {
                type: "ajax_whether",
                message: "logout"
            }, success: function(){
                location.href = "index.html";
            }, error: function(){
                console.log("服务器异常\najax_whether:" + XMLResponse.status);
                return;
            }
        });
    });
});

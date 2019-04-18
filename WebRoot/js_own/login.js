$(document).ready(function () {
  //sessionStorage.removeItem("user");
  if($("#user").val() != ""){
    $("#user_label").css("bottom", $("#user").height());
    $("#user_label").css("font-size", "15px");
    $("#user_label").css("color", "#272C2C");
    $("#user_line").css("width", $("#user").width());
  }
  $("#user").focus(function () {
    $("#user_label").css("bottom", $("#user").height());
    $("#user_label").css("font-size", "15px");
    $("#user_label").css("color", "#272C2C");
    $("#user_line").css("width", $("#user").width());
  });
  $("#user").blur(function () {
    if ($("#user").val() == "" || $("#user").val() == undefined) {
      $("#user_label").css("bottom", "0px");
      $("#user_label").css("font-size", "16px");
      $("#user_label").css("color", "#c3c3c3");
    }
    $("#user_line").css("width", "0px");
  });
  $("#password").focus(function () {
    $("#password_label").css("bottom", $("#password").height());
    $("#password_label").css("font-size", "15px");
    $("#password_label").css("color", "#272C2C");
    $("#password_line").css("width", $("#password").width());
  });
  $("#password").blur(function () {
    if ($("#password").val() == "" || $("#password").val() == undefined) {
      $("#password_label").css("bottom", "0px");
      $("#password_label").css("font-size", "16px");
      $("#password_label").css("color", "#c3c3c3");
    }
    $("#password_line").css("width", "0px");
  });
    $("#sub").click(function(){
      var user = $("#user").val();
      console.log("user:"+user);
      console.log("password:"+password);
      console.log(user=="");
      console.log($("#password").val()=="");
      if(user==""){
        $("#div_hide").removeClass("hidden");
        $("#error_hide").removeClass("hidden");
        //$("#div_hide").addClass("wow shake");
        //$("#div_hide").fadeToggle();
        $("#error_tip").text("用户名或者电子邮箱不可为空");
        return;
      }
      if($("#password").val()==""){
        $("#div_hide").removeClass("hidden");
        $("#error_hide").removeClass("hidden");
        //$("#div_hide").fadeToggle();
        $("#error_tip").text("密码不可为空");
        return;
      }
      else{
        $.ajax({
        type: "post",
        url: "servlet/Login",
        dataType: "json",
        data:{
          "user": user,
          "password": $("#password").val(),
          type: "ajax_login"
        },
        success:function(data){
          //alert(data);
          //var str = JSON.parse(data);
          //alert("data:"+data+"\nstr:"+str+"\nstatus:"+str.status+"\nuser:"+str.user+"\ntype:"+str.type);
          //alert("status:"+str.status+"\nuser:"+str.user+"\ntype:"+str.type);
          //$("#id").val(str.user);
          //$("#password").val(str.status);'
          console.log("json.status:"+data.status);
          console.log("json.user:"+data.user);
          if(data.status=="success"){
            //sessionStorage.setItem("user",data.user);
            //console.log("sessionStorage_user_login:"+sessionStorage.getItem("user"));
            $("#error_hide").addClass("hidden");
            $("#div_hide").removeClass("hidden");
            $("#success_hide").removeClass("hidden");
            $("#success_tip").text(data.message);
            //location.href = 'index.html';
            setTimeout("location.href = 'index.html'",500);
          }
          if(data.status=="error"){
            $("#div_hide").removeClass("hidden");
            $("#error_hide").removeClass("hidden");
            $("#error_tip").text(data.message);
            //return;
          }
        },
        error:function(XMLResponse){
          $("#div_hide").removeClass("hidden");
            $("#error_hide").removeClass("hidden");
            $("#error_tip").text("抱歉，服务器异常。\nXMLResponse_Status:"+XMLResponse.status);
            console.log("error_status:"+XMLResponse.status);
            return;
        }
       });
      }
    });
  });
//   //ajax 请求开始进度条开始
// $(window).ajaxStart(() => {
//     NProgress.start();
// });
// //    ajax 请求结束进度条结束
// $(window).ajaxComplete(() => {
//     NProgress.done();
// });
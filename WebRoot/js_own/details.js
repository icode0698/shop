$(function(){
    //拼接href字符串，找出spu
    var url = decodeURI(window.location.href);//href为......?spu=50000001&&goods=iPhone XS Max
    console.log("href:"+url);
    var res = url.split("?")[1].split("&");
    console.log("res:"+res);
    //console.log("res_length:"+res.length);
    var para = {}; //定义key value的模型
    var arr = [];  //定义key value的来源
    for(var i=0;i<res.length;i++){
        arr = res[i].split("=");
        para[arr[0]] = arr[1];//实现key value相对应
    }
    $("#goodsID").text(para.spu);
    // 页面转化url中空格%20为正常空格
    // var temp = para.goods.split("%20");
    // console.log("url_split:"+temp);
    // var goods = "";//如果不定义为""累加时第一个会出现undefined
    // for(var i=0;i<temp.length;i++){
    //     goods = goods+temp[i]+" ";
    // }
    $(document).attr("title",para.goods);
    $("#goodsName").text(para.goods);
    $("#top_btn_login").click(function () {
        location.href = "login.html";
    });
    $("#top_btn_reg").click(function () {
        location.href = "register.html";
    });
    // 加减按钮控制input的num
    $("#num_minus").on("click",function(){
        var number = $("#num").val();
        if(number>1){
            $("#num").val(--number);
            if(number==1){
                $("#num_minus").attr("disabled",true);
            }
        }
        console.log("num_minus:"+$("#num").val());
    });
    $("#num_plus").on("click",function(){
        var number = $("#num").val();
        if(number>=1){
            $("#num_minus").attr("disabled",false);
        }
        $("#num").val(++number);
        console.log("num_plus:"+$("#num").val());
    });
    //ajax获取商品参数信息
    $.ajax({
        type: "post",
        url: "servlet/Details",
        dataType: "json",
        data: {
            type: "ajax_details",
            goodsID: para.spu
        },
        success:function(data){
            console.log(data);
            console.log("data_status:"+data.status);
            $("#brand").text(" "+data.message[0].brandName);
            // 初始化颜色
            for(var i=0;i<data.message[0].colorList.length;i++){
                var content = '<label id="label_color'+i+'" for="radio_color'+i+'" class="btn btn-default btn_margin">' + data.message[0].colorList[i]+ '</label>'+
                    '<input type="radio" class="radio_display" name="color" id="radio_color'+i+'" value="'+data.message[0].colorList[i]+'" />';
                $("#color").append(content);
                // console.log("i"+i);
            }
            // 默认第一个选中
            $("#radio_color0").attr("checked","checked");
            $("#label_color0").addClass("btn-primary");
            // 初始化组件完成后为每个radio设置click事件
            for (var i = 0; i < data.message[0].colorList.length; i++) {
                //console.log("i2" + i);
                $("#label_color" + i).on("click", function () {
                    for (var j = 0; j < data.message[0].colorList.length; j++) {
                        //$("#radio_color" + j).attr("checked", false);
                        $("#label_color" + j).removeClass("btn-primary");
                        //console.log("++++++++++++++ij" + i + "&&" + j)
                    }
                    //$("#radio_color"+i).attr("checked","checked");
                    $(this).addClass("btn-primary");
                    console.log("+++++++++++++color");
                    //console.log("&&&&&&&&&&&&&&&&&label_click:"+$("input:radio[name='color']:checked").val()+$("input:radio[name='screen']:checked").val()+$("input:radio[name='storage']:checked").val());
                    //console.log("+++++++++++++i" + i);
                });
            }
            // 初始化尺寸
            for(var i=0;i<data.message[0].screenList.length;i++){
                var content = '<label id="label_screen'+i+'" for="radio_screen'+i+'" class="btn btn-default btn_margin">' + data.message[0].screenList[i]+'</label>'+
                    '<input type="radio" class="radio_display" name="screen" id="radio_screen'+i+'" value="'+data.message[0].screenList[i]+'" />';
                $("#screen").append(content);
            }
            // 默认第一个选中
            $("#radio_screen0").attr("checked","checked");
            $("#label_screen0").addClass("btn-primary");
            // 初始化组件完成后为每个radio设置click事件
            for(var i=0;i<data.message[0].screenList.length;i++){
                $("#label_screen"+i).on("click",function(){
                    for(var j=0;j<data.message[0].screenList.length;j++){
                        //$("#radio_screen"+j).attr("checked",false);
                        $("#label_screen"+j).removeClass("btn-primary");
                    }
                    //$("#radio_screen"+i).attr("checked","checked");
                    $(this).addClass("btn-primary");
                    //console.log("+++++++++++++screen");
                    //console.log("&&&&&&&&&&&&&&&&&:"+$("input:radio[name='color']:checked").val()+$("input:radio[name='screen']:checked").val()+$("input:radio[name='storage']:checked").val());
                });
            }
            // 初始化存储容量
            for(var i=0;i<data.message[0].storageList.length;i++){
                var content = '<label id="label_storage'+i+'" for="radio_storage'+i+'" class="btn btn-default btn_margin">' + data.message[0].storageList[i]+'</label>'+
                    '<input type="radio" class="radio_display" name="storage" id="radio_storage'+i+'" value="'+data.message[0].storageList[i]+'" />';
                $("#storage").append(content);
            }
            // 默认第一个选中
            $("#radio_storage0").attr("checked","checked");
            $("#label_storage0").addClass("btn-primary");
            // 初始化组件完成后为每个radio设置click事件
            for(var i=0;i<data.message[0].storageList.length;i++){
                $("#label_storage"+i).on("click",function(){
                    for(var j=0;j<data.message[0].storageList.length;j++){
                        //$("#radio_storage"+j).attr("checked",false);
                        $("#label_storage"+j).removeClass("btn-primary");
                    }
                    //$("#radio_storage"+i).attr("checked","checked");
                    $(this).addClass("btn-primary");
                    //console.log("+++++++++++++storage");
                    //console.log("&&&&&&&&&&&&&&&&&:"+$("input:radio[name='color']:checked").val()+$("input:radio[name='screen']:checked").val()+$("input:radio[name='storage']:checked").val());
                });
            }
            //确定组件加载完成后动态显示Price
            initPrice();
            updatePrice();
        },
        error:function(data){
            console.log("data_status:"+data.status);
        }
    });
    //ajax初始化商品价格
    function initPrice() {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "servlet/Price",
            data: {
                "goodsID": para.spu,
                "color": $("input:radio[name='color']:checked").val(),
                "screen": $("input:radio[name='screen']:checked").val(),
                "storage": $("input:radio[name='storage']:checked").val()
            },
            success: function (data) {
                console.log(data);
                $("#price").text("￥"+data.price);
            },
            error: function (data) {
                console.log($("input:radio[name='color']:checked").val());
                $("#price").text("￥?????");
            }
        });
    }

    //更新商品价格
    function updatePrice() {
        $("input:radio[name='color']").change(function () {
            console.log("&&&&&&&&&&&&&&&&&radio_change:" + $("input:radio[name='color']:checked").val() + $("input:radio[name='screen']:checked").val() + $("input:radio[name='storage']:checked").val());
            $.ajax({
                type: "post",
                dataType: "json",
                url: "servlet/Price",
                data: {
                    goodsID: para.spu,
                    color: $("input:radio[name='color']:checked").val(),
                    screen: $("input:radio[name='screen']:checked").val(),
                    storage: $("input:radio[name='storage']:checked").val()
                },
                success: function (data) {
                    //console.log(XMLHttpRequest.responseXML);
                    console.log(data);
                    if(data.status=="success"){
                        $("#price").text("￥"+data.price);
                    }
                    else{
                        $("#price").text("￥?????");
                    }
                },
                error: function (data) {
                    console.log(data+"&&"+XMLResponse.status);
                    $("#price").text("￥?????");
                    
                }
            });
        });
        $("input:radio[name='screen']").change(function () {
            console.log("&&&&&&&&&&&&&&&&&radio_change:" + $("input:radio[name='screen']:checked").val() + $("input:radio[name='screen']:checked").val() + $("input:radio[name='storage']:checked").val());
            $.ajax({
                type: "post",
                dataType: "json",
                url: "servlet/Price",
                data: {
                    goodsID: para.spu,
                    color: $("input:radio[name='color']:checked").val(),
                    screen: $("input:radio[name='screen']:checked").val(),
                    storage: $("input:radio[name='storage']:checked").val()
                },
                success: function (data) {
                    //console.log(XMLHttpRequest.responseXML);
                    console.log(data);
                    if(data.status=="success"){
                        $("#price").text("￥"+data.price);
                    }
                    else{
                        $("#price").text("￥?????");
                    }
                },
                error: function (data) {
                    console.log(data+"&&"+XMLResponse.status);
                    $("#price").text("￥?????");
                    
                }
            });
        });
        $("input:radio[name='storage']").change(function () {
            console.log("&&&&&&&&&&&&&&&&&radio_change:" + $("input:radio[name='storage']:checked").val() + $("input:radio[name='screen']:checked").val() + $("input:radio[name='storage']:checked").val());
            $.ajax({
                type: "post",
                dataType: "json",
                url: "servlet/Price",
                data: {
                    goodsID: para.spu,
                    color: $("input:radio[name='color']:checked").val(),
                    screen: $("input:radio[name='screen']:checked").val(),
                    storage: $("input:radio[name='storage']:checked").val()
                },
                success: function (data) {
                    //console.log(XMLHttpRequest.responseXML);
                    console.log(data);
                    if(data.status=="success"){
                        $("#price").text("￥"+data.price);
                    }
                    else{
                        $("#price").text("￥?????");
                    }
                },
                error: function (data) {
                    console.log(data+"&&"+XMLResponse.status);
                    $("#price").text("￥?????");
                    
                }
            });
        });
    }
    
    $("#btn_join").on("click",function(){
        $.ajax({
            type: "post",
            dataType: "json",
            url: "servlet/Whether",
            data: {
                type: "ajax_whether",
                message: "getStatus"
            },success:function(data){
                console.log(data);
                if (data.status == "success") {
                    // console.log(para.spu);
                    // console.log($("#goodsName").text()+"&&"+$("#goodsName").val());
                    // console.log($("#brand").text());
                    // console.log($("input:radio[name='storage']:checked").val());
                    // console.log($("input:radio[name='color']:checked").val());
                    // console.log($("input:radio[name='screen']:checked").val());
                    // console.log($("#num").val());
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        url: "servlet/Join",
                        data: {
                            //"type": "ajax_join",
                            "goodsID": para.spu,
                            "goodsName": para.goods,
                            "brandName": $("#brand").text(),
                            "storage": $("input:radio[name='storage']:checked").val(),
                            "color": $("input:radio[name='color']:checked").val(),
                            "screen": $("input:radio[name='screen']:checked").val(),
                            "num": $("#num").val()
                        }, success: function(datain){
                            console.log("join success!");
                            layer.open({
                                icon: 1,
                                content: datain.message
                            });
                        }, error:function(){
                            console.log("服务器异常\najax_whether:" + XMLResponse.status);
                        }
                    });
                }
                else{
                    layer.confirm(data.message,{
                        icon: 3,
                        btn: ["前往登录","继续浏览"]},function(){
                            location.href = 'login.html';
                        },function(){});
                    console.log(data.message);
                }
            },error:function(){
                console.log("服务器异常\najax_whether:" + XMLResponse.status);
            }
        });
        
    });
    $("#btn_purchase").on("click",function(){
        console.log("&&&&&&&&&&&&&&&&&:"+$("input:radio[name='color']:checked").val()+$("input:radio[name='screen']:checked").val()+$("input:radio[name='storage']:checked").val());
        $.ajax({
            type: "post",
            dataType: "json",
            url: "servlet/Whether",
            data: {
                type: "ajax_whether",
                message: "getStatus"
            },success:function(data){
                console.log(data);
                if (data.status == "success") {
                    // console.log(para.spu);
                    // console.log($("#goodsName").text()+"&&"+$("#goodsName").val());
                    // console.log($("#brand").text());
                    // console.log($("input:radio[name='storage']:checked").val());
                    // console.log($("input:radio[name='color']:checked").val());
                    // console.log($("input:radio[name='screen']:checked").val());
                    // console.log($("#num").val());
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        url: "servlet/Purchase",
                        data: {
                            "goodsID": para.spu,
                            "goodsName": para.goods,
                            "brandName": $("#brand").text(),
                            "storage": $("input:radio[name='storage']:checked").val(),
                            "color": $("input:radio[name='color']:checked").val(),
                            "screen": $("input:radio[name='screen']:checked").val(),
                            "num": $("#num").val()
                        }, success: function(datain){
                            console.log("purchase success!");
                            layer.open({
                                icon: 1,
                                content: datain.message
                            });
                        }, error:function(){
                            console.log("服务器异常\najax_whether:" + XMLResponse.status);
                        }
                    });
                }
                else{
                    layer.confirm(data.message,{
                        icon: 3,
                        btn: ["前往登录","继续浏览"]},function(){
                            location.href = 'login.html';
                        },function(){});
                    console.log(data.message);
                }
            },error:function(){
                console.log("服务器异常\najax_whether:" + XMLResponse.status);
            }
        });        
    });
});

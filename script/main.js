window.onload = function(){
    var url = "Data/characters.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    var request = new XMLHttpRequest();
    inText = '<table align="center"><tr>';
    request.open("get", url);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
            let num = Math.floor((document.body.scrollWidth-100)/105);
            var json = JSON.parse(request.responseText);
            for(var i=0;i<json.length;i++){
                inText += '<td><input type="checkbox" class="characterButton" id="'+ json[i]['名称'] + '"><img src="Data/avatar/' + json[i]['名称'] + '.png"/></input></td>'
                if((i+1)%num == 0){
                    inText += "<tr></tr>";
                }
            }
        }
        inText += "</tr></table>";
        document.getElementById("characters").innerHTML = inText;
    }
}

function submit(){
    // 获取被选中的角色
    let bList = document.getElementsByClassName("characterButton");
    for(let i in bList){
        if(bList[i].checked){
            console.log(bList[i].id);
        }
    }
}
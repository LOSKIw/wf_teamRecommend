window.onload = function(){
    let url = "Data/characters.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    let request = new XMLHttpRequest();
    let dic = {
        "暗":[],
        "光":[],
        "火":[],
        "水":[],
        "风":[],
        "雷":[]
    }
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            // 获取
            let json = JSON.parse(request.responseText);
            // 分组
            for(let i=0;i<json.length;i++){
                dic[json[i]['属性']].push(json[i]['名称'])
            }

            let num = Math.floor((document.body.scrollWidth-100)/105);
            inText = '';
            for(let i in dic){
                inText += '<p>' + i + '</p>'
                inText += '<table align="center"><tr>';
                for(let cName in dic[i]){
                    inText += '<td><input type="checkbox" class="characterButton" id="'+  dic[i][cName] + '"><img src="Data/avatar/' +  dic[i][cName] + '.png"/></input></td>';
                    if((cName+1)%num == 0){
                        inText += "<tr></tr>";
                    }
                }
                inText += "</tr></table>";
            }
            document.getElementById("characters").innerHTML = inText;
        }
    }
}

function chooseAll(){
    let bt = document.getElementsByClassName("characterButton");
    for(let i in bt){
        bt[i].checked = true;
    }
}

function rejectAll(){
    let bt = document.getElementsByClassName("characterButton");
    for(let i in bt){
        bt[i].checked = false;
    }
}

function contain(list, obj) { 
    var index = list.length; 
    while (index -- ) { 
         if (list[index] === obj) { 
             return true; 
         } 
    } 
    return false; 
}

function submit(){
    // 获取被选中的角色
    // userList 存有的所有角色
    let userList = [];
    let bList = document.getElementsByClassName("characterButton");
    for(let i in bList){
        if(bList[i].checked){
            userList.push(bList[i].id)
        }
    }
    let url = "Data/teamList.json";
    let request = new XMLHttpRequest();
    
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        let json = JSON.parse(request.responseText);

        let color = ["white","yellow","green"]

        let acceptTeam = [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
        let Stage = document.getElementById("stage");
        let index = Stage.selectedIndex;
        let choosenStage = Stage.options[index].value;

        // 针对每个team看缺几个人，加入对应box
        for(let i=0;i<json.length;i++){
            // 看是不是对应副本的
            if(choosenStage != "全部" && choosenStage != json[i]["stage"]){
                continue;
            }
            let count = 0;
            for(let j = 1; j < 4; j++){
                if(contain(userList,json[i]['main' + j]) == false){
                    count ++;
                }
                if(contain(userList,json[i]['sub' + j]) == false){
                    count ++;
                }
            }
            acceptTeam[count].push(json[i]);
        }
        // 显示（暴力字符串嗯加XD
        let inText = '<table align="center"><tr><td>副本</td><td>队长</td><td>sub1</td><td>队员</td><td>sub2</td><td>队员</td><td>sub3</td><td>装备1</td><td>珠子1</td><td>装备2</td><td>珠子2</td><td>装备3</td><td>珠子3</td><td>补充</td></tr>';
        for(let i in color){
            for(let j in acceptTeam[i]){
                inText += '<tr bgcolor="'+ color[i] + '">';
                inText += '<td>' +  acceptTeam[i][j]["副本"] + '</td>';
                inText += '<td><img src="Data/avatar/' +  acceptTeam[i][j]["main1"] + '.png"/></td>';
                inText += '<td><img src="Data/avatar/' +  acceptTeam[i][j]["sub1"] + '.png"/></td>';
                inText += '<td><img src="Data/avatar/' +  acceptTeam[i][j]["main2"] + '.png"/></td>';
                inText += '<td><img src="Data/avatar/' +  acceptTeam[i][j]["sub2"] + '.png"/></td>';
                inText += '<td><img src="Data/avatar/' +  acceptTeam[i][j]["main3"] + '.png"/></td>';
                inText += '<td><img src="Data/avatar/' +  acceptTeam[i][j]["sub3"] + '.png"/></td>';
                inText += '<td>' +  acceptTeam[i][j]["equipment11"] + '</td>';
                inText += '<td>' +  acceptTeam[i][j]["equipment12"] + '</td>';
                inText += '<td>' +  acceptTeam[i][j]["equipment21"] + '</td>';
                inText += '<td>' +  acceptTeam[i][j]["equipment22"] + '</td>';
                inText += '<td>' +  acceptTeam[i][j]["equipment31"] + '</td>';
                inText += '<td>' +  acceptTeam[i][j]["equipment32"] + '</td>';
                inText += '<td>' +  acceptTeam[i][j]["detail"] + '</td>';
                inText += '</tr>'
            }
        }
        inText += '</table>'
        document.getElementById("teamSelect").innerHTML = inText;
    }
}
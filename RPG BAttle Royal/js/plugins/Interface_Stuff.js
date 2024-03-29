
//Loading Text
var $thereisaminimap=false
var OnlineChat_createDisplayObj_Scene_Map1 = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
  OnlineChat_createDisplayObj_Scene_Map1.call(this);
  this.createLoadingText();
  this.createHPBar();
  this.createMPBar();
  changeHPBar(($gameActors.actor(1).hp/$gameActors.actor(1).mhp)*100);
  changeMPBar(($gameActors.actor(1).mp/$gameActors.actor(1).mmp)*100);
  this.createPIC();
  this.createGoldText();
document.getElementById('goldtext').innerText="Gold:0"
  this.createMinimap();
  this.createupdatetext();
  this.createShieldPIC();
  this.createCancelButton();
};


 Scene_Map.prototype.createLoadingText = function(){
  if(document.getElementById('loadingtext')) return
this.loadingtext = document.createElement('pre');
this.loadingtext.id = 'loadingtext';

this.loadingtext.style.width = '100px';
  this.loadingtext.style.height = '32px';
this.loadingtext.style.zIndex = 99;
this.loadingtext.style.position = 'absolute';
this.loadingtext.style.fontSize="50px";
this.loadingtext.style.color="white";


  document.body.appendChild(this.loadingtext)
Graphics._centerElement(this.loadingtext);
document.getElementById('loadingtext').style.left=(Number(document.getElementById("GameVideo").style.width.slice(0,document.getElementById("GameVideo").style.width.length-2))*-9/10)+"px"
document.getElementById('loadingtext').style.top=(Number(document.getElementById("GameVideo").style.height.slice(0,document.getElementById("GameVideo").style.height.length-2))*84/100)+"px"

 }


//Map HUD

 Scene_Map.prototype.createHPBar = function(){
  if(document.getElementById('HPLimit')) return
this.maphpbarmax = document.createElement('div');
this.maphpbarmax.id = 'HPLimit';
this.maphpbarmax.style.zIndex = 99;
this.maphpbar = document.createElement('div');
this.maphpbar.id = 'HPBar';
this.maphpbar.style.zIndex = 99;
this.maphpbar.style.visibility="hidden"


  document.body.appendChild(this.maphpbarmax)
Graphics._centerElement(this.maphpbarmax);
  document.getElementById('HPLimit').appendChild(this.maphpbar)

document.getElementById('HPLimit').style.left=(Number(document.getElementById("GameVideo").style.width.slice(0,document.getElementById("GameVideo").style.width.length-2))*-9/10)+"px"
document.getElementById('HPLimit').style.top=(Number(document.getElementById("GameVideo").style.height.slice(0,document.getElementById("GameVideo").style.height.length-2))*-14/20)+"px"

 }

 Scene_Map.prototype.createMPBar = function(){
  if(document.getElementById('MPLimit')) return
this.mapmpbarmax = document.createElement('div');
this.mapmpbarmax.id = 'MPLimit';
this.mapmpbarmax.style.zIndex = 99;
this.mapmpbar = document.createElement('div');
this.mapmpbar.id = 'MPBar';
this.mapmpbar.style.zIndex = 99;
this.mapmpbar.style.visibility="hidden"


  document.body.appendChild(this.mapmpbarmax)
Graphics._centerElement(this.mapmpbarmax);
  document.getElementById('MPLimit').appendChild(this.mapmpbar)

document.getElementById('MPLimit').style.left=(Number(document.getElementById("GameVideo").style.width.slice(0,document.getElementById("GameVideo").style.width.length-2))*-9/10)+"px"
document.getElementById('MPLimit').style.top=(Number(document.getElementById("GameVideo").style.height.slice(0,document.getElementById("GameVideo").style.height.length-2))*-14/20+30)+"px"

 }



var IntervalHP
function changeHPBar(percent) {
var elem = document.getElementById("HPBar"); 

if(IntervalHP!==undefined){
  clearInterval(IntervalHP);
    IntervalHP=undefined;
}
  var width = elem.style.width;
  width=Number(width.substring(0, width.length-1))
  if(percent>100){
    percent=100
  }
IntervalHP = setInterval(frame, 5);
  function frame() {
    if (width === percent) {
        clearInterval(IntervalHP);
        IntervalHP=undefined;
    }else if(width<percent) {
        width++; 
        elem.style.width = width + '%'; 
    }else if(width>percent){
      width--; 
        elem.style.width = width + '%'; 
    }
}
}

var IntervalMP
function changeMPBar(percent) {
var elem = document.getElementById("MPBar"); 

if(IntervalMP!==undefined){
  clearInterval(IntervalMP);
    IntervalMP=undefined;
}
  var width = elem.style.width;
  width=Number(width.substring(0, width.length-1))
  if(percent>100){
    percent=100
  }
IntervalMP = setInterval(frame, 5);
  function frame() {
    if (width === percent) {
        clearInterval(IntervalMP);
        IntervalMP=undefined;
    }else if(width<percent) {
        width++; 
        elem.style.width = width + '%'; 
    }else if(width>percent){
      width--; 
        elem.style.width = width + '%'; 
    }
}
}


 Scene_Map.prototype.createPIC = function(){
  if(document.getElementById('userpic')) return
this.characterface = document.createElement('img');
this.characterface.id = 'userpic';
this.characterface.style.zIndex = 99;
this.characterface.src="img/pictures/characterface.png";
this.characterface.style.width = '90px';
  this.characterface.style.height = '90px';
  this.characterface.style.visibility="hidden"


  document.body.appendChild(this.characterface)
Graphics._centerElement(this.characterface);

document.getElementById('userpic').style.left=(Number(document.getElementById("GameVideo").style.width.slice(0,document.getElementById("GameVideo").style.width.length-2))*-9/10)+"px"
document.getElementById('userpic').style.top=(Number(document.getElementById("GameVideo").style.height.slice(0,document.getElementById("GameVideo").style.height.length-2))*-14/20-106)+"px"

 }

  Scene_Map.prototype.createGoldText = function(){
this.goldtext = document.createElement('pre');
this.goldtext.id = 'goldtext';

this.goldtext.style.width = '100px';
  this.goldtext.style.height = '32px';
this.goldtext.style.zIndex = 99;
this.goldtext.style.position = 'absolute';
this.goldtext.style.fontSize="16px";
this.goldtext.style.color="white";
this.goldtext.style.visibility="hidden"
this.goldtext.innerText="Gold: "+$gameParty._gold

  document.body.appendChild(this.goldtext)
Graphics._centerElement(this.goldtext);
document.getElementById('goldtext').style.left=(Number(document.getElementById("GameVideo").style.width.slice(0,document.getElementById("GameVideo").style.width.length-2))*-9/10+90)+"px"
document.getElementById('goldtext').style.top=(Number(document.getElementById("GameVideo").style.height.slice(0,document.getElementById("GameVideo").style.height.length-2))*-14/20-106)+"px"

 }

function setGoldText(value){
  if(!value) value=$gameParty._gold
if(document.getElementById('goldtext')) document.getElementById('goldtext').innerText="Gold: " + value
}

var thereisaminimapfile
 Scene_Map.prototype.createMinimap = function(){
  if(document.getElementById('minimap') || $gameMap._mapId==3) return

      var waitcreateminimap=setInterval(()=>{
      if (SceneManager._scene instanceof Scene_Map) {
      screenshotmap()
      clearInterval(waitcreateminimap)
$thereisaminimap=true
      this.playerindicator = document.createElement('div');
      this.playerindicator.style.backgroundColor="red"
      this.playerindicator.style.width=(Math.round((200/$gameMap.width())<1?1:200/$gameMap.width())+"px")
      this.playerindicator.style.height=(Math.round((200/$gameMap.height())<1?1:200/$gameMap.height())+"px")
      this.playerindicator.id="playerindicator"
      this.playerindicator.visibility="hidden"
      this.playerindicator.style.zIndex=99

      this.minimap = document.createElement('img');
      this.minimap.id = 'minimap';
      this.minimap.style.zIndex = 99;
      this.minimap.src=mapurl
      this.minimap.style.width = '100px';
      this.minimap.style.height = '100px';
      this.minimap.style.visibility="hidden"


      document.body.appendChild(this.minimap)
      Graphics._centerElement(this.minimap);
      document.body.appendChild(this.playerindicator)
      Graphics._centerElement(this.playerindicator);

      document.getElementById('minimap').style.right=(Number(document.getElementById("GameVideo").style.width.slice(0,document.getElementById("GameVideo").style.width.length-2))*-9/10)+"px"
      document.getElementById('minimap').style.top=(Number(document.getElementById("GameVideo").style.height.slice(0,document.getElementById("GameVideo").style.height.length-2))*-84/100)+"px"

document.getElementById("playerindicator").style.right=((Number(document.getElementById("GameVideo").style.width.slice(0,document.getElementById("GameVideo").style.width.length-2))*-9/10)+96)+"px"
document.getElementById("playerindicator").style.top=((Number(document.getElementById("GameVideo").style.height.slice(0,document.getElementById("GameVideo").style.height.length-2))*-84/100)-96)+"px"

      }
      },200)



 }


//function to turn HUD on/off
var ishudon=false
var checkifminimapisdone
 function turnHUDonoff(){
  if(ishudon===true){
    document.getElementById('updatetext').style.visibility="visible"
    document.getElementById('goldtext').style.visibility="hidden"
    document.getElementById('userpic').style.visibility="hidden"
    document.getElementById('HPBar').style.visibility="hidden"
    document.getElementById('MPBar').style.visibility="hidden"
    if(!document.getElementById('minimap')){
      checkifminimapisdone=setInterval(()=>{
        if(document.getElementById('minimap')){
          document.getElementById('minimap').style.visibility="hidden"
          document.getElementById('playerindicator').style.visibility="hidden"
          clearInterval(checkifminimapisdone)
        }
      },200)
    }
    ishudon=false
  }
  else{
    document.getElementById('updatetext').style.visibility="hidden"
    document.getElementById('goldtext').style.visibility="visible"
    document.getElementById('userpic').style.visibility="visible"
    document.getElementById('HPBar').style.visibility="visible"
    document.getElementById('MPBar').style.visibility="visible"
    if(!document.getElementById('minimap')){
      checkifminimapisdone=setInterval(()=>{
        if(document.getElementById('minimap')){
          document.getElementById('minimap').style.visibility="visible"
          document.getElementById('playerindicator').style.visibility="visible"
          clearInterval(checkifminimapisdone)
        }
      },200)
    }
    ishudon=true
  }
 }




function download(url, dest, callback) {
  if(url.startsWith("https")){var http = require('https');}
  else{var http = require('http')}
var fs=require("fs")
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      file.close(callback); // close() is async, call callback after close completes.
    });
    file.on('error', function (err) {
      console.log(err)
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (callback)
        callback(err.message);
    });
  });
}

function updater(){
  document.getElementById('updatetext').innerHTML=`<a href="javascript: void(0)" style="color:white;">Downloading...</a>`
  download("https://codeload.github.com/peq42/RPG-Battle-Royal/zip/refs/heads/master","./master.zip",function(){
    document.getElementById('updatetext').innerHTML=`<a href="javascript: void(0)" style="color:white;">Extracting...</a>`
    var AdmZip = require('./js/plugins/adm-zip.js');

    var zip = new AdmZip('./master.zip'); 
    var zipEntries = zip.getEntries(); 
    zip.extractAllToAsync('./www/',true,function(){
    var ncp = require('./js/libs/ncp.js').ncp;
    ncp.limit = 20;
    document.getElementById('updatetext').innerHTML=`<a href="javascript: void(0)" style="color:white;">Updating...</a>`
    ncp("./RPG-Battle-Royal-master/RPG BAttle Royal/", "./www/",function(){
      var rmdir = function(path) {
        if( fs.existsSync(path) ) {
          fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
              rmdir(curPath);
            } else { // delete file
              fs.unlinkSync(curPath);
            }
          });
          fs.rmdirSync(path);
        }
      };
      rmdir("./www/RPG-Battle-Royal-master")
      fs.unlinkSync("./master.zip")
      
      fs.writeFileSync("./www/version.txt",fs.readFileSync('./checker.txt',{encoding:'utf8', flag:'r'}))
      fs.unlinkSync("./checker.txt")
      document.getElementById('updatetext').innerHTML=`<a href="javascript: void(0)" style="color:white;">Game Updated, please restart your client.</a>`
     });
    })
  })
}

Scene_Map.prototype.createupdatetext = function(){

  this.updatetext = document.createElement('div');
  this.updatetext.id = 'updatetext';
  this.updatetext.style.zIndex = 99;

  this.updatetext.style.visibility="visible"
  document.body.appendChild(this.updatetext)
  Graphics._centerElement(this.updatetext);
  const fs=require("fs")
  download("https://raw.githubusercontent.com/peq42/RPG-Battle-Royal/master/version.txt", "./checker.txt",function(){
    if(fs.readFileSync('./checker.txt',{encoding:'utf8', flag:'r'})!==fs.readFileSync('./www/version.txt',{encoding:'utf8', flag:'r'})){
      document.getElementById('updatetext').innerHTML=`<a href="javascript: void(0)" style="color:white;" onclick="updater()">Update Available. Click here to update</a>`
    }else{
      
      document.getElementById('updatetext').innerHTML=`<p style="color:white;">Version `+fs.readFileSync('./www/version.txt',{encoding:'utf8', flag:'r'})+`</p>`
    }





  
  
  })
  document.getElementById('updatetext').style.right="0px"
document.getElementById('updatetext').style.bottom="0px"
}



 Scene_Map.prototype.createShieldPIC = function(){
  if(document.getElementById('shieldpic')) return
this.charactershield = document.createElement('img');
this.charactershield.id = 'shieldpic';
this.charactershield.style.zIndex = 99;
this.charactershield.src="img/pictures/shield.png";
this.charactershield.style.width = '32px';
  this.charactershield.style.height = '32px';
  this.charactershield.style.visibility="hidden"


  document.body.appendChild(this.charactershield)
Graphics._centerElement(this.charactershield);

document.getElementById('shieldpic').style.left=(Number(document.getElementById("GameVideo").style.width.slice(0,document.getElementById("GameVideo").style.width.length-2))*-3/4)+"px"
document.getElementById('shieldpic').style.top=(Number(document.getElementById("GameVideo").style.height.slice(0,document.getElementById("GameVideo").style.height.length-2))*-3/4)+"px"

 }

    Scene_Map.prototype.createCancelButton = function(){
  if(document.getElementById('cancelbutton')) return
this.cancelbutton = document.createElement('img');
this.cancelbutton.id = 'cancelbutton';
this.cancelbutton.style.zIndex = 99;
this.cancelbutton.src="img/pictures/cancel.png";
this.cancelbutton.style.visibility="hidden"
this.cancelbutton.style.width = '120px';
this.cancelbutton.style.height = '48px';
this.cancelbutton.onclick=function cancelbutton(){
location.reload()
}

  document.body.appendChild(this.cancelbutton)
Graphics._centerElement(this.cancelbutton);

document.getElementById('cancelbutton').style.left=(Number(document.getElementById("GameVideo").style.width.slice(0,document.getElementById("GameVideo").style.width.length-2))*3/4)+"px"
document.getElementById('cancelbutton').style.top=(Number(document.getElementById("GameVideo").style.height.slice(0,document.getElementById("GameVideo").style.height.length-2))*3/4)+"px"

 }

previousgamex=undefined
previousgamey=undefined
var playerxonmini,playeryonmini

if(previousgamex==undefined){
  previousgamex=1280
  previousgamey=720
  }

var $gamevideocss=false
function intervalchecker(){

  
  if($gameParty)setGoldText($gameParty._gold)
  if(!$gamevideocss) $gamevideocss=document.getElementById("GameVideo").style
  if($thereisaminimap){
    document.getElementById("playerindicator").style.right=((Number($gamevideocss.width.slice(0,$gamevideocss.width.length-2))*-9/10)+(100-$gamePlayer._x*96/Math.floor($dataMap.width*48/100)))+"px"
  document.getElementById("playerindicator").style.top=((Number($gamevideocss.height.slice(0,$gamevideocss.height.length-2))*-84/100)-(100-$gamePlayer._y*96/Math.floor($dataMap.height*48/100)))+"px"
  }
  
  
  
  if(previousgamey==$gamevideocss.height.slice(0,$gamevideocss.height.length-2) && previousgamex==$gamevideocss.width.slice(0,$gamevideocss.width.length-2)) return
  
  
  
  
  var gamex=Number($gamevideocss.width.slice(0,$gamevideocss.width.length-2))*3/4
  var gamey=Number($gamevideocss.height.slice(0,$gamevideocss.height.length-2))*3/4
  
  
  var gamex2=Number($gamevideocss.width.slice(0,$gamevideocss.width.length-2))*9/10
  var gamey2=Number($gamevideocss.height.slice(0,$gamevideocss.height.length-2))*9/10
  
  
  var gamex3=Number($gamevideocss.width.slice(0,$gamevideocss.width.length-2))*12/20
  var gamey3=Number($gamevideocss.height.slice(0,$gamevideocss.height.length-2))*14/20
  
  
  var gamex4=Number($gamevideocss.width.slice(0,$gamevideocss.width.length-2))*84/100
  var gamey4=Number($gamevideocss.height.slice(0,$gamevideocss.height.length-2))*84/100
  
  try{document.getElementById('loadingtext').style.left="-"+(gamex2)+"px"
  document.getElementById('loadingtext').style.top=(gamey4)+"px"
  
  document.getElementById('playerindicator').style.right="-"+(gamex2+96)+"px"
    document.getElementById('playerindicator').style.top="-"+(gamey4-96)+"px"
  
  document.getElementById('HPLimit').style.left="-"+(gamex2)+"px"
  document.getElementById('HPLimit').style.top="-"+(gamey3)+"px"
  
  document.getElementById('MPLimit').style.left="-"+(gamex2)+"px"
  document.getElementById('MPLimit').style.top="-"+(gamey3-32)+"px"
  
  document.getElementById('userpic').style.left="-"+(gamex2)+"px"
  document.getElementById('userpic').style.top="-"+(gamey3+106)+"px"
  
  document.getElementById('goldtext').style.left="-"+(gamex2-90)+"px"
  document.getElementById('goldtext').style.top="-"+(gamey3+106)+"px"
  
  if(document.getElementById('minimap')){document.getElementById('minimap').style.right="-"+(gamex2)+"px"
    document.getElementById('minimap').style.top="-"+(gamey4)+"px"}
    

  
  document.getElementById('shieldpic').style.left="-"+(gamex)+"px"
  document.getElementById('shieldpic').style.top="-"+(gamey)+"px"
  
  document.getElementById('cancelbutton').style.left=(gamex)+"px"
  document.getElementById('cancelbutton').style.top=(gamey)+"px"
  
  document.getElementById('txtarea').style.left = "-"+(gamex3)+"px"
  document.getElementById('txtarea').style.top = (gamey4-223)+"px"
  
  
  
  document.getElementById('chatInput').style.left = "-"+(gamex3+30)+"px"
  document.getElementById('chatInput').style.top = (gamey4)+"px"}catch(e){}
  
  
  
  }
setInterval(intervalchecker,100)



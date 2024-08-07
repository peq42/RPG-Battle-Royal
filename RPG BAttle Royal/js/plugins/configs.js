//variables
window.lastvalueupdate=0
window.currentvalueupdate=0
window.counterids=1
window.weapondelay=0
window.server=function(){}
worker=false
window.serverpass=false
window.finallist=[]


var fs=require("fs")
if(!fs.existsSync("./www/map")){
fs.mkdirSync("./www/map");
}
fs=undefined

window.open=function(){
  console.log("Window.open has been disabled.")
}


//fullscreen checker on startup
if(!localStorage.fullscreen){
    localStorage.fullscreen=false
}
if(localStorage.fullscreen=="true"){
    var nw=require('nw.gui');
    var win = nw.Window.get();
    win.enterFullscreen()
}
if(!localStorage.twitchname){
  localStorage.twitchname=""
}
if(!localStorage.hidechat){
  localStorage.hidechat=false
}


if(!localStorage.reconnect){
  localStorage.reconnect=""
}

if(localStorage.hidechat==true){
  document.getElementById('txtarea').style.visibility='hidden'
}

//changes to MV's functions
Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType,check) {
  
    if(x=='NaN' || y=='NaN') return
    if(mapId!=$gameMap._mapId) {
      AudioManager.fadeOutBgs(1);
      AudioManager.fadeOutBgm(1);

    }
    if(check==true || ($gameMap._mapId!=1 && $gameMap._mapId<5 ) || $gameMap._mapId>5){
        this._transferring = true;
        if(($gameMap._mapId==1 || $gameMap._mapId>4 ) && $gameMap._mapId<9){
            this._newMapId = $gameMap._mapId;
            
        }else{
            this._newMapId = mapId;
        }

        this._newX = x;
        this._newY = y;
        this._newDirection = d;
        this._fadeType = fadeType;
        
        
    }else{
        worker.postMessage("tpevent:"+x+":"+y+":"+playerid)
    }
};

Game_BattlerBase.prototype.setMp = function(mp) {
    this._mp = mp;
    changeMPBar(mp*100/$gameActors.actor(1).mmp)
    this.refresh();
};

Game_Battler.prototype.gainHp = function(value) {
  if(value<0) $gameScreen.startFlash([255, 0, 0, 128], 8);
  this._result.hpDamage = -value;
  this._result.hpAffected = true;
  this.setHp(this.hp + value);
};


Game_BattlerBase.prototype.setHp = function(hp) {
  if(hp<0) $gameScreen.startFlash([255, 0, 0, 128], 8);
    this._hp = hp;
    changeHPBar(hp*100/$gameActors.actor(1).mhp)
    this.refresh();
};

Game_Party.prototype.gainGold = function(amount) {
    this._gold = (this._gold + amount).clamp(0, this.maxGold());
    setGoldText(this._gold?this._gold:$gameParty._gold)
};

//Function to block right click context menu
document.querySelectorAll('*').forEach(function(element){
   element.addEventListener('contextmenu', function(ev) { 
      ev.preventDefault();
      return false;
   });
});

//check if ESC was pressed to open menu
var escmenu=false
var otherchoisesopened=false

//changes "setchoices"
Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) {
    otherchoisesopened=true
    this._choices = choices;
    this._choiceDefaultType = defaultType;
    this._choiceCancelType = cancelType;
};

Game_Message.prototype.onChoice = function(n) {
    if (this._choiceCallback) {
        otherchoisesopened=false
        this._choiceCallback(n);
        this._choiceCallback = null;
    }
};

//deletes any minimap previously saved
var fs=require("fs")
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
            
            if (fs.existsSync("./www/minimap")){
            rmdir("./www/minimap/")}

Input.keyMapper = {
    9: 'tab',       // tab
    69: 'ok',       // E
    16: 'shift',    // shift
    17: 'control',  // control
    18: 'control',  // alt
    27: 'escape',   // escape
    33: 'pageup',   // pageup
    34: 'pagedown', // pagedown
    65: 'left',     // left arrow
    87: 'up',       // up arrow
    68: 'right',    // right arrow
    83: 'down',     // down arrow
    45: 'escape',   // insert
    96: 'escape',   // numpad 0
    98: 'down',     // numpad 2
    100: 'left',    // numpad 4
    102: 'right',   // numpad 6
    104: 'up',      // numpad 8
    120: 'debug',    // F9
    13: 'chatsend', // Enter
    89: 'chat',     // Y
    49: 'weapon',   // 1
    50: 'potion',  // 2
    51: 'shield',   // 3
    71: 'drop',// G
    70: 'lantern'// F
};
Input.gamepadMapper = {
    0: 'ok',        // A
    1: 'cancel',    // B
    2: 'shift',     // X
    3: 'menu',      // Y
    4: 'drop',    // LB
    5: 'fire',  // RB
    12: 'up',       // D-pad up
    13: 'down',     // D-pad down
    14: 'left',     // D-pad left
    15: 'right',    // D-pad right
};

Graphics._createModeBox = function() {
    var box = document.createElement('div');
    box.id = 'modeTextBack';
    box.style.position = 'absolute';
    box.style.left = '200px';
    box.style.top = '5px';
    box.style.width = '119px';
    box.style.height = '40px';
    box.style.background = 'rgba(0,0,0,0.2)';
    box.style.zIndex = 9;
    box.style.opacity = 0;



    document.body.appendChild(box);


    this._modeBox = box;
};

SceneManager.initGraphics = function() {
    var type = this.preferableRendererType();
    Graphics.initialize(this._screenWidth, this._screenHeight, type);
    Graphics.boxWidth = this._boxWidth;
    Graphics.boxHeight = this._boxHeight;
    if (Utils.isOptionValid('showfps')) {
        Graphics.showFps();
    }
    if (type === 'webgl') {
        this.checkWebGL();
    }
};


SceneManager.onError = function(e) {

};



function resetimgandaudio(){
  var fs=require("fs")


  if(!fs.existsSync("./www/backup/img")){
      if(!fs.existsSync("./www/backup/")) fs.mkdirSync("./www/backup");
      fs.mkdirSync("./www/backup/audio");
      fs.mkdirSync("./www/backup/img");
      fs.cp("./www/img/", "./www/backup/img/",{    recursive: true,  },function(){});
      fs.cp("./www/audio/", "./www/backup/audio/",{    recursive: true,  },function(){});
  }else{
      if (fs.existsSync("./www/img")) {
          fs.rm("./www/img", { recursive: true, force: true }, () => {
            fs.mkdirSync("./www/img");
            fs.cp("./www/backup/img/", "./www/img/", {    recursive: true,  },function(){})
          })
          
      }else{
        fs.mkdirSync("./www/img")
        fs.cp("./www/backup/img/", "./www/img/", {    recursive: true,  },function(){})
      }
      

      if (fs.existsSync("./www/audio")) {
          fs.rm("./www/audio", { recursive: true, force: true }, () => {
            fs.mkdirSync("./www/audio");
            fs.cp("./www/backup/audio/", "./www/audio/", {    recursive: true,  },function(){})

          })

      }else{
          fs.mkdirSync("./www/audio")
          fs.cp("./www/backup/audio/", "./www/audio/", {    recursive: true,  },function(){})
      }
      
  }

}



// Common Event
Game_Interpreter.prototype.command117 = function() {
    var commonEvent = $dataCommonEvents[this._params[0]];
    if (commonEvent) {
        var eventId = this.isOnCurrentMap() ? this._eventId : 0;
        this.setupChild(commonEvent.list, eventId);
        if($gameMap._mapId===5){
            $gameTemp.reserveCommonEvent(eventId)
    }
    else{
        this.setupChild(commonEvent.list, eventId);
    }
    }
    return true;
};

window.playerdead=false


function playerdirect(){
  if(!$gamePlayer) return
    if(Input.isControllerConnected()==true){

      if(Input.isPressed('up')) $gamePlayer.setDirection(8)
      else if(Input.isPressed('down')) $gamePlayer.setDirection(2)
      else if(Input.isPressed('left')) $gamePlayer.setDirection(4)
      else if(Input.isPressed('right')) $gamePlayer.setDirection(6)

      if(Math.abs(navigator.getGamepads()[0].axes[2])>Math.abs(navigator.getGamepads()[0].axes[3])){ //turn in X
        if(navigator.getGamepads()[0].axes[2] > 0.5) $gamePlayer.setDirection(6)
        else if(navigator.getGamepads()[0].axes[2] < -0.5) $gamePlayer.setDirection(4)
      }else{ //turn in y
        if(navigator.getGamepads()[0].axes[3] > 0.5) $gamePlayer.setDirection(2)
        else if(navigator.getGamepads()[0].axes[3] < -0.5) $gamePlayer.setDirection(8)
      }

    }else{
      if(Math.abs(TouchInput._x-$gamePlayer.screenX())>Math.abs(TouchInput._y-$gamePlayer.screenY())){
        if($gamePlayer.screenX()>TouchInput._x>0){
          
            $gamePlayer.setDirection(4)
        }else{
            $gamePlayer.setDirection(6)
        }
      }else{
          if($gamePlayer.screenY()<TouchInput._y>0){
              $gamePlayer.setDirection(2)
          }else{
              $gamePlayer.setDirection(8)
          }
      }
    }
    
}

Game_Player.prototype.moveByInput = function() {
  if (!this.isMoving() && this.canMove()) {
      var direction = this.getInputDirection();
      if (direction > 0) {
          $gameTemp.clearDestination();
      } else if ($gameTemp.isDestinationValid()){
          var x = $gameTemp.destinationX();
          var y = $gameTemp.destinationY();
          direction = this.findDirectionTo(x, y);
      }
      if (direction > 0) {
          this.executeMove(direction);
      }
      playerdirect()
  }
};


Game_Temp.prototype.setDestination = function(x, y) {
    return;
    this._destinationX = x;
    this._destinationY = y;
};


Game_Actor.prototype.basicFloorDamage = function() {
    return 10;
};

SceneManager.catchException = function(e) {

};

SceneManager.onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
        case 116:   // F5
            if(typeof worker!="undefined"){
                worker.postMessage("close")
            }else{
                location.reload();
            }
            break;
        case 119:   // F8
            if (Utils.isNwjs() && Utils.isOptionValid('test')) {
                require('nw.gui').Window.get().showDevTools();
            }
            break;
        }
    }
};



Sprite_Timer.prototype.updatePosition = function() {
    this.x = (Graphics.width - this.bitmap.width)/2 
    this.y = 0;
};


//////////avoid gameover when HP=0///////

Scene_Map.prototype.updateScene = function() {

    if (!SceneManager.isSceneChanging()) {
        this.updateTransferPlayer();
        
    }
    if (!SceneManager.isSceneChanging()) {
        this.updateEncounter();
    }
    if (!SceneManager.isSceneChanging()) {
        this.updateCallMenu();
    }
    if (!SceneManager.isSceneChanging()) {
        this.updateCallDebug();
    }
};

////////////////////////////////////////

if(!localStorage.texttospeech){
    localStorage.texttospeech=false
    
}
if(!localStorage.crtmode){
    localStorage.crtmode=false
}




function changechat(chatText1){
    var chatText=chatText1
	chatText=chatText.replace(/:c/ig,"😕")
    chatText=chatText.replace(/:\)/g,"😕")
	chatText=chatText.replace(/lmao/ig,"😂")
	chatText=chatText.replace(/xD/ig,"😆")
	chatText=chatText.replace(/<3/g,"🧡")
	chatText=chatText.replace(/o\//ig,"👋")
	chatText=chatText.replace(/eyeemoji/ig,"👀")
	chatText=chatText.replace(/:d/ig,"😀")
	chatText=chatText.replace(/>:\)/g,"😈")
	chatText=chatText.replace(/derpemoji/ig,"🤪")
	chatText=chatText.replace(/shrugemoji/ig,"🤷")
    
    return chatText
}

/////////improve scene update performance////////////

Scene_Base.prototype.updateChildren = function() {

    for(var i=0;i<this.children.length;i++){
        if (this.children[i].update) {
            this.children[i].update();
        }
    }

};


/////////////remove unnecessary verifications//////

SceneManager.update = function() {
    try {
        this.tickStart();
        this.updateManagers();
        this.updateMain();
        this.tickEnd();
    } catch (e) {
        this.catchException(e);
    }
};


SceneManager.updateMain = function() {
    var newTime = this._getTimeInMsWithoutMobileSafari();
    var fTime = (newTime - this._currentTime) / 1000;
    if (fTime > 0.25) fTime = 0.25;
    this._currentTime = newTime;
    this._accumulator += fTime;
    while (this._accumulator >= this._deltaTime) {
        this.updateInputData();
        this.changeScene();
        this.updateScene();
        this._accumulator -= this._deltaTime;
    }
    this.renderScene();
    this.requestUpdate();
};

SceneManager.resume = function() {
    this._stopped = false;
    this.requestUpdate();
    
    this._currentTime = this._getTimeInMsWithoutMobileSafari();
    this._accumulator = 0;
    
};

////////////////////////////////////////

Game_CharacterBase.prototype.requestAnimation = function(animationId,confirm) {
    if($gameMap._mapId==5){
        if(confirm=="true"){
            this._animationId = animationId;
        }else{
            this._animationId = (animationId+13);
        }
    }else{
        this._animationId = animationId;
    }
};


///////////////////



///////


window.gc()



var previouscheck=undefined
serverjoin=function() {

    var hasloaded=false
    
      document.getElementById('loadingtext').innerText = "Connecting..."
      setTimeout(()=>{
  
    
    var connection = new WebSocket(finallist[join])
    
    connection.onopen = function () {
      
      document.getElementById('cancelbutton').style.visibility="visible"
      setTimeout(()=>{
    
        connection.send("map?")
      },33)
    }
    buffermap=[]
    connection.onmessage=function(msgg){
    
      msg=msgg.data
      window.worker = new Worker("./js/webworker.js");
    if(msg==="default"){
      hasloaded=true
      document.getElementById('loadingtext').innerText = "Loading Map..."
      connection.close()
      require('nw.gui').Window.get().focus()
    $gamePlayer.reserveTransfer(1,12,15,2,2);
    checkmap=setInterval(()=>{
                  if($gameMap._mapId==1 && $dataMap!=undefined && $dataMap.scrollType!=undefined){
                    turnHUDonoff();
                    $gameTemp.reserveCommonEvent(6)
                    document.getElementById('cancelbutton').style.visibility="hidden"
                    clearInterval(checkmap)
                  }
    
                },50)
    }else if(msg==="free4all"){
      hasloaded=true
      document.getElementById('loadingtext').innerText = "Loading Map..."
      connection.close()
      require('nw.gui').Window.get().focus()
    $gamePlayer.reserveTransfer(6,12,15,2,2);
    checkmap=setInterval(()=>{
                  if(($gameMap._mapId==1 ||$gameMap._mapId==6 ||$gameMap._mapId==7 )&& $dataMap!=undefined && $dataMap.scrollType!=undefined){
                    turnHUDonoff();
                    $gameTemp.reserveCommonEvent(6)
                    document.getElementById('cancelbutton').style.visibility="hidden"
                    clearInterval(checkmap)
                  }
    
                },50)
    }else if(msg==="zombies"){
      hasloaded=true
      document.getElementById('loadingtext').innerText = "Loading Map..."
      connection.close()
      require('nw.gui').Window.get().focus()
    $gamePlayer.reserveTransfer(7,33,29,2,2);
    checkmap=setInterval(()=>{
                  if(($gameMap._mapId==1 ||$gameMap._mapId==6 ||$gameMap._mapId==7 )&& $dataMap!=undefined && $dataMap.scrollType!=undefined){
                    turnHUDonoff();
                    $gameTemp.reserveCommonEvent(6)
                    document.getElementById('cancelbutton').style.visibility="hidden"
                    clearInterval(checkmap)
                  }
    
                },50)
    }else if(msg.startsWith("http")){
    
    document.getElementById('loadingtext').innerText = "Downloading Map Data..."
    
    hasloaded=true
    
    var downloadspeed=0
    var checkdownloadspeed=setInterval(()=>{
    downloadspeed=((fs.statSync("./www/map/test.zip").size/(1024*1024))-downloadspeed)
    document.getElementById('loadingtext').innerText="Downloading Map Data..."+downloadspeed.toFixed(2)+"MBps"
    },1000)
    
    download(msg,"./www/map/test.zip",function(){
    
    
    
        clearInterval(checkdownloadspeed)
    
        var filehandler=new Worker("./js/filehandler.js")
        document.getElementById('loadingtext').innerText = "Extracting Map..."
        filehandler.onmessage=function(event){
          var msg=event.data
    
          if(msg=="end"){
                filehandler.terminate()
                fs.copyFileSync('./www/map/data/Map001.json', './www/data/Map005.json')
                var map5=JSON.parse(fs.readFileSync('./www/map/data/MapInfos.json'))[1]
                map5.id=5
                map5.order=5
                $dataMapInfos[5]=map5
                var tempcommonevents=JSON.parse(fs.readFileSync("./www/map/data/CommonEvents.json"))
                for(var i=1;i<tempcommonevents.length;i++){
                  tempcommonevents[i].id=tempcommonevents[i].id+11
                }
                $dataCommonEvents=$dataCommonEvents.concat(tempcommonevents)
    
                $dataTilesets=JSON.parse(fs.readFileSync('./www/map/data/Tilesets.json'))
    
                var tempanimations=JSON.parse(fs.readFileSync('./www/map/data/Animations.json'))
                for(var i=1;i<tempanimations.length;i++){
                  tempanimations[i].id=tempanimations[i].id+12
                }
                $dataAnimations=$dataAnimations.concat(tempanimations)
                $dataSystem=JSON.parse(fs.readFileSync("./www/map/data/System.json"))
                $dataActors=JSON.parse(fs.readFileSync("./www/map/data/Actors.json"))
                
                document.getElementById('loadingtext').innerText = "Loading Map..."
                connection.close()
                require('nw.gui').Window.get().focus()
                $gamePlayer.reserveTransfer(5,5,3,2,2);
                var checkmap=setInterval(()=>{
                  if($gameMap._mapId==5 && $dataMap!=undefined && $dataMap.scrollType!=undefined){
                    turnHUDonoff();
                    $gameTemp.reserveCommonEvent(6,true)
                    document.getElementById('cancelbutton').style.visibility="hidden"
                    clearInterval(checkmap)
                  }
    
                },33)
          }else{
            document.getElementById('loadingtext').innerText = "Error."
            setTimeout(()=>{
              location.reload()
              },1250)
          }
    
        }
      
    })
    
    
    
    }else if(msg!=="pass?"){
    if(msg==="finished"){
      hasloaded=true
      for(var i=0;i<buffermap.length;i++){
        buffermap[i]=Buffer.from(buffermap[i], 'binary')
      }
      var buffer = Buffer.concat(buffermap)
      buffermap=undefined
      window.gc()
        fs.writeFile("./www/map/test.zip", buffer,function(){
        
          var filehandler=new Worker("./js/filehandler.js")
        document.getElementById('loadingtext').innerText = "Extracting Map..."
        filehandler.onmessage=function(event){
          var msg=event.data
    
          if(msg=="end"){
                filehandler.terminate()
                fs.copyFileSync('./www/map/data/Map001.json', './www/data/Map005.json')
                var map5=JSON.parse(fs.readFileSync('./www/map/data/MapInfos.json'))[1]
                map5.id=5
                map5.order=5
                $dataMapInfos[5]=map5
                var tempcommonevents=JSON.parse(fs.readFileSync("./www/map/data/CommonEvents.json"))
                for(var i=1;i<tempcommonevents.length;i++){
                  tempcommonevents[i].id=tempcommonevents[i].id+11
                }
                $dataCommonEvents=$dataCommonEvents.concat(tempcommonevents)
    
                $dataTilesets=JSON.parse(fs.readFileSync('./www/map/data/Tilesets.json'))
                var tempanimations=JSON.parse(fs.readFileSync('./www/map/data/Animations.json'))
                for(var i=1;i<tempanimations.length;i++){
                  tempanimations[i].id=tempanimations[i].id+12
                }
                $dataAnimations=$dataAnimations.concat(tempanimations)
                $dataSystem=JSON.parse(fs.readFileSync("./www/map/data/System.json"))
                $dataActors=JSON.parse(fs.readFileSync("./www/map/data/Actors.json"))
                
                document.getElementById('loadingtext').innerText = "Loading Map..."
                connection.close()
                require('nw.gui').Window.get().focus()
                $gamePlayer.reserveTransfer(5,5,3,2,2);
                var checkmap=setInterval(()=>{
                  if($gameMap._mapId==5 && $dataMap!=undefined && $dataMap.scrollType!=undefined){
                    turnHUDonoff();
                    $gameTemp.reserveCommonEvent(6,true)
                    document.getElementById('cancelbutton').style.visibility="hidden"
                    clearInterval(checkmap)
                  }
    
                },33)
          }else{
            document.getElementById('loadingtext').innerText = "Error."
            setTimeout(()=>{
              location.reload()
              },1250)
          }
    
        }
    
        });
    }else{
      
    document.getElementById('loadingtext').innerText = "Downloading Map Data..."

    if(previouscheck==undefined){

      previouscheck=0
      timechecker=0
    }else{

      previouscheck=( (( msg.length/(( performance.now()-timechecker )/1000) )/(1024*1024)))
      document.getElementById('loadingtext').innerText = "Downloading Map Data..."+previouscheck.toFixed(2)+"MBps"
    }
    
    buffermap.push(msg)
    timechecker=performance.now()
    
    }
    
        
        
      
    }else{
      window.serverpass=prompt("Type the server password")
      connection.send(serverpass)
    }
    
    }
    connection.onclose=function(){
      if(hasloaded==false){
      document.getElementById('loadingtext').innerText = "Error"
      setTimeout(()=>{
      location.reload()
      },1250)
      }
    }
    
    
    },50)
    
  
    
    
      
    
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
      }

      
if($gameMap) $gameMap.eventServerId=function(id){
  var current
  for(var i=$gameMap._events.length;i--;){
    current=$gameMap._events[i]
    if(current && current._erased==false && current.serverID && current.serverID==id){
      return current
    }
  }

}


function $copyEvent(id,thiseventid){
  if($gameMap._events[id]){
    var gamemaptemp=$gameMap._events[thiseventid]
    var datamaptemp=$dataMap.events[thiseventid]

    $gameMap._events[thiseventid]=$gameMap._events[id]
    $dataMap.events[thiseventid]=$dataMap.events[id]

    $gameMap._events[thiseventid].serverID=gamemaptemp.serverID

    
    
  }
}

Game_Screen.prototype.startFlash = function(color, duration) {
  if(localStorage.canflash==false) return
  this._flashColor = color.clone();
  this._flashDuration = duration;
};

Game_Map.prototype.eventsXy = function(x, y) {
  var events=this.events()
  var result=[]
  for(var i=events.length;i--;){
      if(events[i]._x==x && events[i]._y==y) result.push(events[i])
  }
  
  return result
};

Game_Event.prototype.erase = function() {
  this._erased = true;
  this.refresh();
  setTimeout($eventpropereraser,5000,this._eventId)
};


Weather.prototype._updateAllSprites = function() {
    var maxSprites = Math.floor(this.power * 10);
    while (this._sprites.length < maxSprites) {
        this._addSprite();
    }
    while (this._sprites.length > maxSprites) {
        this._removeSprite();
    }
    for (let i = 0; i < this._sprites.length; i++) {
        const sprite = this._sprites[i];
        this._updateSprite(sprite);
        sprite.x = sprite.ax - this.origin.x;
        sprite.y = sprite.ay - this.origin.y;
    }    
};


ImageCache.prototype.releaseReservation = function(reservationId) {
  var items = this._items;

  for (const key in items) {
      if (items.hasOwnProperty(key)) {
          const item = items[key];
          if (item.reservationId === reservationId) {
              delete item.reservationId;
          }
      }
  }
};

ImageCache.prototype._truncateCache = function() {
  var items = this._items;
  var sizeLeft = ImageCache.limit;

  const sortedItems = Object.values(items)
      .sort((a, b) => b.touch - a.touch);

  for (const item of sortedItems) {
      if (sizeLeft > 0 || this._mustBeHeld(item)) {
          var bitmap = item.bitmap;
          sizeLeft -= bitmap.width * bitmap.height;
      } else {
          delete items[item.key];
      }
  }
};


ImageCache.prototype.releaseReservation = function(reservationId) {
  var items = this._items;

  for (const key in items) {
      if (items.hasOwnProperty(key)) {
          const item = items[key];
          if (item.reservationId === reservationId) {
              delete item.reservationId;
          }
      }
  }
};


ImageCache.prototype.isReady = function() {
  var items = this._items;

  for (const key in items) {
      if (items.hasOwnProperty(key)) {
          const item = items[key];
          if (!item.bitmap.isRequestOnly() && !item.bitmap.isReady()) {
              return false;
          }
      }
  }

  return true;
};





var $ispressingtab=false

function checkTabPress(e) {
    e = e || event;
    var activeElement;
    if (e.keyCode == 9) {
        $ispressingtab=false
    }
}
function checkpressedtab(e) {
    e = e || event;
    var activeElement;
    if (e.keyCode == 9) {
        $ispressingtab=true
    }
}
window.addEventListener('keydown', checkpressedtab);
window.addEventListener('keyup', checkTabPress);


Input._onLostFocus = function() {
    if($ispressingtab==false) this.clear();
};
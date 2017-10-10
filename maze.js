pathWidth = 10       
wall = 2             
outerWall = 2        
width = 25           
height = 25          
delay = 1           
x = width/2|0       
y = height/2|0   
wallColor = '#d24'
pathColor = "#00FFcc"


init = function(){  
    offset = pathWidth/2+outerWall
    map =[]
    canvas = document.querySelector("canvas")
    ctx = canvas.getContext("2d")
    console.log(ctx);
    canvas.width = outerWall*2+width*(pathWidth+wall)-wall
    canvas.height = outerWall*2+height*(pathWidth+wall)-wall 
    ctx.fillStyle = wallColor
    ctx.fillRect(0,0.,canvas,width,height)
    ctx.strokeStyle = pathColor
    ctx.lineCap = "square"
    ctx.lineWidth = pathWidth
    ctx.beginPath()
    for(var i=0;i<height*2;i++){
      map[i] = []
      for(var j=0;j<width*2;j++){
        map[i][j] = false
      }
    }
    map[y*2][x*2] = true 
    route = [[x,y]]
    ctx.moveTo(x*(pathWidth+wall)+offset,
               y*(pathWidth+wall)+offset) 
}
init()

loop = function(){
    x = route[route.length-1][0]|0
    y = route[route.length-1][1]|0
    console.log(x,y)
    var directions = [[1,0],[-1,0],[0,1],[0,-1]],
        alternatives = []

    for(var i=0;i<directions.length;i++){
        if(map[(directions[i][1]+y)*2]!=undefined&&
            map[(directions[i][1]+y)*2][(directions[i][0]+x)*2]===false){
            alternatives.push(directions[i])    
            }
        }
    if(alternatives.length===0){
        route.pop()
        if(route.length>0){
          ctx.moveTo(route[route.length-1][0]*(pathWidth+wall)+offset,
                     route[route.length-1][1]*(pathWidth+wall)+offset)
          timer = setTimeout(loop,delay)
        }
        return;
    }
    direction = alternatives[Math.random()*alternatives.length|0]
    route.push([direction[0]+x,direction[1]+y])
    ctx.lineTo((direction[0]+x)*(pathWidth+wall)+offset,
               (direction[1]+y)*(pathWidth+wall)+offset)
    map[(direction[1]+y)*2][(direction[0]+x)*2] = true
    map[direction[1]+y*2][direction[0]+x*2] = true
    ctx.stroke()
    timer = setTimeout(loop,delay)
    
}

loop()
const canvas = document.querySelector('canvas')
const context  = canvas.getContext('2d')
//modifying the canvas dimensions
canvas.width = 960 
canvas.height = 480
console.log(context) //this is for testing 

const gravity = 0.5


const background = new Sprite({ position : {
    x: 0,
    y: 0,
    },
    imageSrc : 'map_dessert.png' })


const keys = {
    w: {
        pressed : false
    },
    a : {
        pressed : false
    },
    s : {
        pressed : false
    },
    d : {
        pressed : false
    }
} //this is just.... a holder for the keys to avoid the continuous motion (openGl has these things kind of pre-implemented)


const ground2D = [] 

for (let i = 0; i < groundColl.length; i +=60 )
{
    ground2D.push(groundColl.slice(i,i + 60))
}

 //how does forEach work 



const collisionBlocks = []
ground2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 91) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      )
    }
  })
})


const monster2D = []

for (let i = 0; i < monsterCollision.length; i +=60 )
{
    monster2D.push(monsterCollision.slice(i,i + 60))
}

const monsterBlock = []
monster2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 372) {
      monsterBlock.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      )
    }
  })
})

const monster = []
for(let i = 0; i<monsterBlock.length; i++)
{
    monster.push(new Monster({
        name:"snake ${i}" ,
        imageSrc : 'snake.png',
        framerate : 4,
        collisionPos : monsterBlock[i],
        eCollisionBlock : collisionBlocks,
     

    }))

    console.log(monster[i])
}

const collect2D =[]
for (let i = 0; i < monsterCollision.length; i +=60 )
{
    collect2D.push(collectColl.slice(i,i + 60))
}

const collectBlock = []
collect2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 146) {
        collectBlock.push(
          new CollisionBlock({
            position: {
              x: x * 16,
              y: y * 16,
            },
          })
        )
      }
    })
  })

const collectible = []
for(let i = 0; i < collectBlock.length; i++)
{
    collectible.push(new collectibles({
        name: "Gem ${i}",
        framerate : 5,
        imageSrc : 'gem.png',
        collisionPos : collectBlock[i],
        eCollisionBlock : collisionBlocks,

    }))
}
const player = new Player({
    position : {
        x:0,
        y:0,
    },
    collisionBlocks : collisionBlocks,
    imageSrc: 'penguin.png',
    framerate: 4,
    collecting : collectible,
    enemy : monster,

} ) //an object player that takes an object (postion in this case ) as an input

const camera = 
{
    position : {
        x:0,
        y:-40,
    },

}
function animate ()
{
    window.requestAnimationFrame(animate)  //this is the line responsible for the animation
    context.fillStyle = 'white'
    context.fillRect(0,0,canvas.width,canvas.height)
    context.save()
    context.scale(1.6,1.6)
    context.translate(camera.position.x,camera.position.y)
    background.update()
    //collisionBlocks.forEach(c => {
      //  c.update()
    //})
    //player.checkForVerticalCanvasCollision()
    //player.checkForHorizontalCanvasCollision()
    player.update()
    for(let i = 0; i<monster.length; i++)
    {
        monster[i].update()
        monster[i].updateHorizontalRightPosition()
        monster[i].updateHorizontaLeftlPosition()
    
    }

    for(let i = 0; i < collectible.length; i++)
    {
        //context.fillStyle = 'white'
        //context.fillRect(collectible[i].position.x,collectible[i].position.x, 30, 30)
        collectible[i].update()
    }
    
    if(keys.d.pressed == true)
    {player.velocity.x+=0.2
    player.cameraPaneToLeft({canvas, camera})}
    else if(keys.a.pressed == true)
    {player.velocity.x-= 0.2
     player.cameraPaneToRight({canvas,camera})}
    else {
        player.velocity.x = 0
    }

    

    if (keys.w.pressed == true)
    { 
        player.velocity.y = -6
        if (player.velocity.y < 0)
        {player.cameraPaneToDown({canvas, camera})}
        
        
    }
    else
    {
        
        player.cameraPaneToUp({canvas,camera})
    }

        
    context.restore()



        

}

animate()



window.addEventListener('keydown',(event) =>{
    switch (event.key) {
        case 'w' :  keys.w.pressed = true
        break
        case 'a' : keys.a.pressed = true
        break
        case 's' :  keys.s.pressed = true
        break
        case 'd' :  keys.d.pressed = true
        break
        
    }
   // console.log(event) //just for testing, by the way it doesn't have to be called event (i think this might be only for convention)
})

window.addEventListener('keyup',(e) =>
{
    switch (e.key) {
        case 'w' :  keys.w.pressed = false
        break
        case 'a' :  keys.a.pressed = false
        break
        case 's' :  keys.s.pressed = false
        break
        case 'd' :  keys.d.pressed = false
        break
        
    }
   // console.log(e) //just for testing
})
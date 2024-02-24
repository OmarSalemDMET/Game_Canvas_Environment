const canvas = document.querySelector('canvas')
const context  = canvas.getContext('2d')
//modifying the canvas dimensions
canvas.width = 960 
canvas.height = 480
console.log(context)


let gravity = 0.03
let direction = true

const background = new Sprite({ position : {
    x: 0,
    y: 0,
    },
    imageSrc : 'img/background/Big_map_Part_1.png' })

const camera = 
{
    position : {
        x:0,
        y:-40,
    },

}

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
}    



const ground2D = [] 

for (let i = 0; i < Big_Coll.length; i +=60 )
{
    ground2D.push(Big_Coll.slice(i,i + 60))
}

 //how does forEach work 



const collisionBlocks = []
ground2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 2653 ) {
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

const sharks2D = []

for(let i = 0; i<sharkColl.length; i+=60)
{
    sharks2D.push(sharkColl.slice(i, i + 60))
}

const sharkCollision = []
sharks2D.forEach((row,y) => 
{
    row.forEach((symbol, x) => 
    {
        if (symbol === 5583 ) {
            sharkCollision.push(
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

const Sharks = []
for(let i = 0; i < sharkCollision.length; i++)
{
    Sharks.push(new sharks({
        name: "Shark ${i}",
        framerate : 4,
        imageSrc : 'img/mobs/shark.png',
        collisionPos : sharkCollision[i],
        eCollisionBlock : collisionBlocks,
        
    }))
}


const player = new Player({
    position : {
        x:60,
        y:60,
    },
    collisionBlocks : collisionBlocks,
    imageSrc: 'img/player/fish.png',
    framerate: 3,
    hitboxboundX : 10,
    hitboxboundY : 0,
    leftImage : 'img/player/fish - Copy.png',
    rightImage : 'img/player/fish.png',
  

} )


function animate()
{
    window.requestAnimationFrame(animate)  
    context.fillStyle = 'white'
    context.fillRect(0,0,canvas.width,canvas.height)
    context.save()
    context.scale(1.6,1.6)
    context.translate(camera.position.x,camera.position.y)
    background.update()
    player.update()

    for(let i = 0; i<sharkCollision.length; i++)
    {
        Sharks[i].update()
    }
  

    if (player.position.x > 608 && player.position.y<210)
    {
        
        let imageAlt = ''
        if(direction === true){
            imageAlt = 'img/player/chicken - Copy.png'
            }
            else if(direction === false)
            {
             imageAlt = 'img/player/chicken.png'
            }
        player.image.src= imageAlt
        player.changeFrameRate(7)
        player.hitboxboundY = 4
        gravity = 0.3
        
    }
    if(player.position.x > 500 && player.position.y > 250 )
    {
        let imageAlt = ''
        if(direction === true){
            imageAlt = 'img/player/penguin.png'
            }
            else if(direction === false)
            {
             imageAlt = 'img/player/penguin - Copy.png'
            }
        player.changeImageSrc(imageAlt)
        player.changeFrameRate(4)
        player.hitboxboundY = 19
    }

    if(player.position.x < 608 && player.position.y < 210)
    {
        let imageAlt = ''
        if(direction === true){
        imageAlt = 'img/player/fish.png'
        }
        else if(direction === false)
        {
         imageAlt = 'img/player/fish - Copy.png'
        }
        player.changeImageSrc(imageAlt)
        player.changeFrameRate(3)
        player.hitboxboundY = 0
    }

   


    if(keys.d.pressed == true)
    {

    player.velocity.x+=0.1
    player.cameraPaneToLeft({canvas, camera})}

    else if(keys.a.pressed == true)
    {
       
        player.velocity.x-= 0.1
        player.cameraPaneToRight({canvas,camera})}

    else {
        player.velocity.x = 0
    }

    if (keys.w.pressed == true)
    { 
        if(player.position.x < 608 && player.position.y < 210)
        {player.velocity.y =-1}
        else{
        player.velocity.y = -2
        }
        //console.log(player.velocity.y)
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

window.addEventListener("keypress", (event) => {
    switch (event.key) {
        case 'w' :  
        
        break
        case 'a' :  
        direction = false
        break
        case 's' : 
        break
        case 'd' :  
        direction = true
        break
}})

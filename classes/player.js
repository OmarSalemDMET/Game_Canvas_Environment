class Player extends Sprite {
    constructor({position, collisionBlocks, imageSrc, framerate, scale = 1.2, collecting = [], enemy = []
        , batChange =[], hitboxboundX = 0, hitboxboundY = 0, leftImage = '', rightImage = ''}) {
        super({imageSrc, framerate, scale})
        this.position = position //player position which is an object
        //this.height = 16 //the height of the player
        //this.width = 16 //width of the player
        this.velocity =   
        {
            x: 0,
            y: 0.5,
        }  //the velocity is to simulate real worlds gravity 
        this.collisionBlocks = collisionBlocks
        this.hitbox  = {
            position : {
                x:this.position.x,
                y:this.position.y,
            },

            width: 10,
            height: 10,
        }

        this.camerabox = {
            position : {
                x: this.position.x ,
                y: this.position.y,
            },
            width : 200,
            height: 80,
        }
        
        
        this.health = 100
        this.collecting = collecting
        this.enemy = enemy
        this.hitboxboundX = hitboxboundX
        this.hitboxboundY = hitboxboundY
        this.leftImage = leftImage
        this.rightImage = rightImage
        
        

    }
    //this function can be named anything, its the content that makes draw a shape

   switchSource(key)
   {
    switch (key)
    {
        case 'right' : 
       
        this.changeImageSrc(this.leftImage)
        break
        case 'left' :

        this.changeImageSrc(this.rightImage)
        break

    }
    
   }
    cameraPaneToLeft({canvas,camera})
    {
        const cameraboxRight = this.camerabox.position.x + this.camerabox.width
        if(cameraboxRight>= (480 * 1.98)  ) return

        if(cameraboxRight >= (canvas.width/1.6) + Math.abs(camera.position.x))
        {
          
            console.log('translate to the left')
            camera.position.x -= this.velocity.x
        }
    }

    cameraPaneToRight({canvas,camera})
    {
        
        if (this.camerabox.position.x <= 0) return {}

        if (this.camerabox.position.x <= Math.abs(camera.position.x))
        {
            camera.position.x -=this.velocity.x
        }
    }

    cameraPaneToDown({canvas,camera})
    {
        
        if (this.camerabox.position.y + this.velocity.y<= 0) return 

        if (this.camerabox.position.y <= Math.abs(camera.position.y))
        {
            camera.position.y -=this.velocity.y
        }
    }

    
    cameraPaneToUp({canvas,camera})
    {
        
        if (this.camerabox.position.y + this.velocity.y<= 0) return 

        if (this.camerabox.position.y + this.camerabox.height >= Math.abs(camera.position.y) + 960/3.5)
        {
            camera.position.y -=this.velocity.y
        }
    }
 
 
    update()  //this function is for updating the players position (till now atleast)
    {   
        this.checkForHorizontalCanvasCollision()
        this.checkForVerticalCanvasCollision()
        this.updateframe()
        this.updateCameraBox()
        

        //draw image
        //context.fillStyle = 'rgba(0, 255, 0, 0.2)'
        //context.fillRect(this.position.x, this.position.y, this.width, this.height)
        //draws a hitbox
        context.fillStyle = 'rgba(125, 0, 125, 0)'
        context.fillRect(
            this.hitbox.position.x
            ,this.hitbox.position.y
            ,this.hitbox.width
            ,this.hitbox.height
        )
        this.draw()
        
        this.position.x += this.velocity.x
        this.updateHitBox()
        this.checkForHorizontalCollision()
        this.checkForEnemyHorizontalCollision()
    
        this.applyGravity()

        
          
        this.updateHitBox()
        
        this.checkForVerticalCollision()
        this.checkForChickenChange()
        //this.checkForEnemyVerticalCollision()
    }



    updateHitBox() {
        this.hitbox  = {
            position : {
                x:this.position.x + this.hitboxboundX,
                y:this.position.y + this.hitboxboundY,
            },

            width: 17,
            height: 18,
        }

        //console.log(this.hitbox.position.x + " " + this.hitbox.position.y)
        
    }

    
    updateCameraBox()
    {
        this.camerabox = {
            position : {
                x: this.position.x - 75,
                y: this.position.y - 10,
            },
            width : 200,
            height: 80,
        }
    }

    applyGravity() {
        this.position.y += this.velocity.y
        this.velocity.y += gravity 
    }
    
    checkForVerticalCollision()
    {
        for(let i = 0; i <this.collisionBlocks.length; i++)
        {
            const collisionBlock = this.collisionBlocks[i]

          
            if (   this.collision({
                object1: this.hitbox,
                object2: collisionBlock,
             } ))
                {
                    //console.log("There's a collision!")
                    if (this.velocity.y > 0)
                    {
                        this.velocity.y = 0

                        const offset =
                          this.hitbox.position.y - this.position.y + this.hitbox.height
              
                        this.position.y = collisionBlock.position.y - offset - 0.01
                        break
                    }

                    if (this.velocity.y < 0)
                    {
                        this.velocity.y = 0

                        const offset = this.hitbox.position.y - this.position.y
              
                        this.position.y =
                          collisionBlock.position.y + collisionBlock.height - offset + 0.01
                        break
                    }


                }
        }
    }

    checkForHorizontalCollision()
    {
        for(let i = 0; i <this.collisionBlocks.length; i++)
        {
            const collisionBlock = this.collisionBlocks[i]

            if (      this.collision({
                object1: this.hitbox,
                object2: collisionBlock,
             } ))
                {
                    //console.log("There's a collision!")
                    if (this.velocity.x > 0)
                    {
                      
                        this.velocity.x = 0

                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width

                        this.position.x = collisionBlock.position.x - offset - 0.01
          
                          break
                    }

                    if (this.velocity.x < 0)
                    {
                        
                        this.velocity.x = 0

                        const offset = this.hitbox.position.x - this.position.x
              
                        this.position.x =
                          collisionBlock.position.x + collisionBlock.width - offset + 0.01
                        break
                    }

                    
                }
        }
    }

    checkForEnemyVerticalCollision()
    {
        for(let i = 0; i <this.enemy.length; i++)
        {
            const enemies = this.enemy[i]

          
            if (   this.collision({
                object1: this.hitbox,
                object2: enemies,
             } ))
                {
                    this.health -= 10
                    console.log(this.health)
                    //console.log("There's a collision!")
                    if (this.velocity.y > 0)
                    {
                        this.velocity.y += 0.1

                        const offset =
                          this.hitbox.position.y - this.position.y + this.hitbox.height
              
                        this.position.y = enemies.position.y - offset - 0.01
                        break
                    }

                    if (this.velocity.y < 0)
                    {
                        this.velocity.y += 0.1 

                        const offset = this.hitbox.position.y - this.position.y
              
                        this.position.y =
                            enemies.position.y + collisionBlock.height - offset + 0.01
                        break
                    }


                }
        }
    }

    checkForEnemyHorizontalCollision()
    {
        for(let i = 0; i <this.enemy.length; i++)
        {
            const enemies = this.enemy[i]

            if (      this.collision({
                object1: this.hitbox,
                object2: enemies,
             } ))
                {
                    this.health -= 10
                    console.log(this.health)
                    //console.log("There's a collision!")
                    if (this.velocity.x > 0)
                    {
                      
                        this.velocity.x -= 0.6

                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width

                        this.position.x = enemies.position.x - offset - 0.01 + this.velocity.x
          
                          break
                    }

                    if (this.velocity.x < 0)
                    {
                        
                        this.velocity.x += 0.5 

                        const offset = this.hitbox.position.x - this.position.x
              
                        this.position.x =
                        enemies.position.x - enemies.width - offset + 0.01 + this.velocity.x
                        break
                    }

                    
                }
        }
    }
    getChickenChange()
    {
      this.chickenQueue = true
    }
    checkForChickenChange()
      {

        if(this.position.x > 615 && this.position.y < 250)
        {
            this.chickenQueue = !this.chickenQueue
            console.log(this.chickenQueue) 
        }
        
      }  

      

      checkForBatChange()
      {

        for(let i =0; i<this.chickenChange.length; i++)
        {
            const ChickenIndex = this.chickenChange[i]
            if (      this.collision({
                object1: this.hitbox,
                object2: enemies,
             } ))
             {
                if(this.velocity.x > 0)
                {
                    return !this.batQueue
                }
             }

            else if( this.velocity.x < 0)
            {
                return !this.batQueue
            }
            
        }
        
      }

    collision({ object1, object2 }) {
        return (
          object1.position.y + object1.height >= object2.position.y &&
          object1.position.y <= object2.position.y + object2.height &&
          object1.position.x <= object2.position.x + object2.width &&
          object1.position.x + object1.width >= object2.position.x
        )
      }
      
    platformCollision({ object1, object2 }) {
        return (
          object1.position.y + object1.height >= object2.position.y &&
          object1.position.y + object1.height <=
            object2.position.y + object2.height &&
          object1.position.x <= object2.position.x + object2.width &&
          object1.position.x + object1.width >= object2.position.x
        )
      }

    checkForHorizontalCanvasCollision()
      {
        if (this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 480 * 2)
        {
            this.velocity.x = 0
        }
        else if (this.hitbox.position.x + this.velocity.x <= 0)
        {
            this.velocity.x = 0
        }

      }

    checkForVerticalCanvasCollision()
      {
        if (this.hitbox.position.y + this.velocity.y <= this.hitbox.height 
            || this.hitbox.height + this.hitbox.position.y + this.velocity.y>= 960/2.05)
        {
            this.velocity.y = 0
        }
        
      } 




      
}


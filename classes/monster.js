class Monster extends Sprite {

    constructor({name, imageSrc, framerate, scale = 1.2, collisionPos, eCollisionBlock})
    {
        super({imageSrc, framerate, frameBuffer : 7 ,scale})
        this.name = name
        this.collisionBlock = collisionPos
        this.eCollisionBlock = eCollisionBlock
        this.position = 
        {
            x: collisionPos.position.x,
            y: collisionPos.position.y
        }
        this.velocity =
        {
            x: 0,
            y: 0,
        }
        this.imageSrc = imageSrc
        this.hitbox = 
        {
            position: 
            {
                x: 0,
                y: 0,
            },
            width: 10,
            height: 10
        
            
        }
        this.gravity = 3
        this.moveBuffer = 3
        this.angle = 0
        
        
        
    
    }


    update()
    {
        this.moveBuffer++
        if (this.moveBuffer%50 === 0)
        {
        this.angle += 30
        console.log(this.angle)
        const imagealt = 'img/mobs/shark - Copy.png'
        if(Math.sin(this.angle) > 0)
        {
            this.changeImageSrc(imagealt)
        }
        else{
            this.changeImageSrc(this.imageSrc)
        }
        }
        this.updateframe() 
        this.updateHorizontalRightPosition ()
        this.checkForHorizontalCanvasCollision()
        this.checkForVerticalCanvasCollision()
        this.draw()
        this.updateHitBox()
        this.checkForHorizontalCollision()
        //this.applyGravity()
        this.updateHitBox()
        this.checkForVerticalCollision()
        
    }

    switchSprite()
    {
        this.changeImageSrc(this.otherImage)
    }

    updateHorizontalRightPosition ()
    {

        this.position.x += (Math.sin(this.angle)) * 1.3
    }

    updateHorizontaLeftlPosition()
    {

    }

    applyGravity()
    {
        this.position.y += this.velocity.y
        this.velocity.y += gravity 
    }

    updateHitBox() {
        this.hitbox  = {
            position : {
                x:this.position.x + 10,
                y:this.position.y + 20,
            },

            width: 17,
            height: 18,
        }
    }


    checkForVerticalCollision()
    {
        for(let i = 0; i <this.eCollisionBlock.length; i++)
        {
            const collisionBlock = this.eCollisionBlock[i]

          
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
        for(let i = 0; i <this.eCollisionBlock.length; i++)
        {
            const collisionBlock = this.eCollisionBlock[i]

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


    collision({ object1, object2 })
     {
        return (
          object1.position.y + object1.height >= object2.position.y &&
          object1.position.y <= object2.position.y + object2.height &&
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
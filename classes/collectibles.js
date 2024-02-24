class collectibles extends Sprite {
    constructor({name, imageSrc, framerate,  collisionPos, eCollisionBlock, scale = 1.2})
    {
        super({imageSrc, framerate , frameBuffer:7, scale})
        this.name = name
        this.collisionPos = collisionPos
        this.position = {
            x: collisionPos.position.x,
            y: collisionPos.position.y
        }
        this.imageSrc = imageSrc
        this.value = 100
        this.collected = false
    }

    update()
    {
        if(this.collected === false)
        {
            this.updateframe()
            this.draw()
        }

       
    }

    hasBeenCollected()
    {
        !this.collected
    }
}
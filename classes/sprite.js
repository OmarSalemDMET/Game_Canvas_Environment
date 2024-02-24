class Sprite {
    constructor({position, imageSrc, framerate = 1, frameBuffer = 5, scale = 1})
    {
        this.position = position
        this.scale = scale
        this.image = new Image()
        this.image.onload = () => {
            this.width = (this.image.width / this.framerate) * this.scale
            this.height = this.image.height * this.scale
        }
        this.image.src = imageSrc
        this.framerate = framerate
        this.currentFrame = 0
        this.frameBuffer = frameBuffer
        this.elapsedframes = 0
    }

    draw()
    {
       


        if(!this.image) return

        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width/ this.framerate),
                y:0
            },
            width: this.image.width / this.framerate,
            height:this.image.height,
        }
        context.drawImage(this.image,
            cropbox.position.x
            ,cropbox.position.y
            ,cropbox.width
            ,cropbox.height
            ,this.position.x
            ,this.position.y
            ,this.width
            ,this.height)
    }
    update()
    {
       
       
        this.draw()
        this.updateframe()
    }

    updateframe()
    {
        this.elapsedframes++
        if (this.elapsedframes % this.frameBuffer === 0) {
        if (this.currentFrame < this.framerate - 1)
        {this.currentFrame++}
        else {this.currentFrame = 0}
        }
    }

    changeImageSrc(imageS)
    {
        this.image.src = imageS;
    }

    changeFrameRate(new_frameRate)
    {
        this.framerate = new_frameRate
    }
}
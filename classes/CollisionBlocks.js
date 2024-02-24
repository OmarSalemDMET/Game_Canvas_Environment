class CollisionBlock{
    constructor({position})
    {
        this.position = position
        this.width = 16
        this.height = 16
    }

    draw()
    {
        context.fillStyle = 'rgba(155,25,0,0.5)'
        context.fillRect(this.position.x, this.position.y, 16, 16)
    }
    update()
    {
        this.draw()
    }
}
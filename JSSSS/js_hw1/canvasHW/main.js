const canvas = document.getElementById('canvas')
const ctx    = canvas.getContext('2d')

const width  = canvas.width;
const height = canvas.height;

let current;
let selection = []

const tools = {
    graffity: {
        mousemove(e){ //e.buttons 0b00000x11 & 0b00000100 == x
            (e.buttons & 1) && new Circle(e.clientX, e.clientY, +size.value, color.value)
        }
    },
    circle: {
        mousedown(e){
            current = new Circle(e.clientX,e.clientY, 1, color.value)
        },
        mousemove(e){
            if (!current) return;

            current.radius = current.distanceTo(e.clientX, e.clientY)
            Drawable.drawAll()
        },

        mouseup(e){
            current = null
        }
    },
    elipse: {
        mousedown(e){
            current = new Elipse(e.clientX,e.clientY, 1,1, color.value)
        },
        mousemove(e){
            if (!current) return;
            var width = e.clientX - current.x;
            var height = e.clientY - current.y;
            current.width = width ? width : width * -1;
            current.height = height ? height : height * -1;
            Drawable.drawAll()
        },

        mouseup(e){
            current = null
        }
    },
    line: {
        mousedown(e){
            current = new Line(e.clientX, e.clientY, 0, 0, color.value, +size.value)
        },
        mousemove(e){
            if (!current) return;

            current.width = e.clientX - current.x
            current.height = e.clientY - current.y

            Drawable.drawAll()
        },

        mouseup(e){
            current = null
        }
    },
    rectangle : {
        mousedown(e){
            current = new Rectangle(e.clientX, e.clientY, 0, 0, color.value, +size.value)
        },
        mousemove(e){
            if (!current) return;

            current.width = e.clientX - current.x
            current.height = e.clientY - current.y

            Drawable.drawAll()
        },

        mouseup(e){
            current = null
        }
    },
    select: {
        click(e){
            console.log(e)
            let found = Drawable.instances.filter(c => c.in && c.in(e.clientX, e.clientY))
            if (found.length){
                if (e.ctrlKey){
                    selection.push(found.pop())
                }
                else {
                    selection = [found.pop()]
                }
            }
            else {
                if (!e.ctrlKey) selection = []
            }

            Drawable.drawAll(selection)
        },
        mousedown(e){
            //
        },
        mousemove(e){

        },

        mouseup(e){
            //x,y, w, h ????????????????????????????
            //selection - ???????????? ???? ?????????????????? Drawable.instances ?????????????? ?? ???????????????? ????????????????????????????.
        },
    }
}



function superHandler(evt){
    let t = tools[tool.value]
    if (typeof t[evt.type] === 'function')
        t[evt.type].call(this, evt)
}

canvas.onmousemove = superHandler
canvas.onmouseup   = superHandler
canvas.onmousedown = superHandler
canvas.onclick = superHandler

////


function Drawable(){
   Drawable.addInstance(this);   
}

const distance = (x1,y1, x2, y2) => ((x1-x2)**2 + (y1-y2)**2)**0.5

Drawable.prototype.draw = function(){};
Drawable.prototype.distanceTo = function(x,y){
    if (typeof this.x !== 'number' ||
        typeof this.y !== 'number'){
        return NaN
    }
    return distance(this.x, this.y, x, y)
};
Drawable.instances = [];
Drawable.addInstance = function(item){
    Drawable.instances.push(item);
}

Drawable.drawAll = function(selection=[]){
    ctx.clearRect(0,0,width,height);
    Drawable.forAll(item => item.draw())
    selection.forEach(item  => item.draw(true))
}

Drawable.forAll = function(callback){
    for(var i = 0; i<Drawable.instances.length;i++){
        callback(Drawable.instances[i])
    }
}

class Circle extends Drawable {
    constructor(x,y,radius, color){
        super()
        this.x      = x;
        this.y      = y;
        this.radius = radius;
        this.color  = color;

        this.draw(); 
    }

    draw(selected){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.color;
        if (selected){
            ctx.lineWidth = 2
            ctx.stroke();
        }
        ctx.fill();
    }

    in(x,y){
        return this.distanceTo(x,y) < this.radius
    }

    inBounds(x,y,w,h){ // x = 100, this.x = 102, w = 5
        return this.x >= x && this.x <= x + w &&
               this.y >= y && this.y <= y + h 
    }
}

class Elipse extends Drawable {
    constructor(x,y,width,height,color){
        super()
        this.x      = x ? x : x*-1;
        this.y      = y ? y : y*-1;
        this.width  = width;
        this.height = height;
        this.color  = color;

        this.draw(); 
    }

    draw(){
        this.width = this.width > 0 ? this.width : this.width * (-1);
        this.height = this.height > 0 ? this.height : this.height * (-1);
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.ellipse(this.x, this.y, this.height, this.width,  Math.PI / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    in(x,y){
        return this.distanceTo(x,y) < this.radius
    }

    inBounds(x,y,w,h){ // x = 100, this.x = 102, w = 5
        return this.x >= x && this.x <= x + w &&
               this.y >= y && this.y <= y + h 
    }
}




class Line extends Drawable {
    constructor(x,y, width, height, color, lineWidth){
        super()
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.color  = color;
        this.lineWidth  = lineWidth;

        this.draw(); 
    }
    

    draw(){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth   = this.lineWidth
        ctx.stroke();
    }
}

class Rectangle extends Drawable {
    constructor(x,y, width, height, color, lineWidth){
        super()
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.color  = color;
        this.lineWidth  = lineWidth;
        this.draw(); 
    }
    

    draw(){
        ctx.beginPath();
        ctx.rect(this.x , this.y ,this.width,this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

color.onchange = () => {
    selection.forEach(c => c.color = color.value)
    Drawable.drawAll(selection)
}

document.getElementById('delete').onclick = () =>{
    Drawable.instances = Drawable.instances.filter(item => !selection.includes(item))
    selection = []
    Drawable.drawAll()
}


//new Line(0,0,100,100, "red")
////new Circle(30,30,10, "red")

////canvas.onmousemove = function(e){
////}

undo.onclick = function(){
    Drawable.instances.pop()
    //Drawable.instances = []
    Drawable.drawAll()
}

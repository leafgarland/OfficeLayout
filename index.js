var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Events = Matter.Events;
    Mouse = Matter.Mouse;
    MouseConstraint = Matter.MouseConstraint;
Vertices = Matter.Vertices;

var engine = Engine.create();

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 765,
        height: 922,
        background: './room.png',
        showAngleIndicator: false,
        wireframes: false
    }
});

function desk(x, y, a) {
    return Bodies.rectangle(x, y, 152, 72, {
        angle: a*Math.PI/180,
        render: { sprite: { texture: './desk.png' } }
    });
}
function chair(x, y, a) {
    return Bodies.rectangle(x, y, 42, 53, {
        angle: a*Math.PI/180,
        render: { sprite: { texture: './chair.png' } }
    });
}

function table(x, y, a) {
    return Bodies.rectangle(x, y, 225, 148, {
        angle: a*Math.PI/180,
        torque: 200,
        render: { sprite: { texture: './table.png' } }
    });
}

function rect(x, y, w, h, o) {
    return Bodies.rectangle(x + (w/2), y + (h/2), w, h, o);
}
function shape(x, y, path, o) {
    return Bodies.fromVertices(x, y, Vertices.fromPath(path), o);
}
var w1 = rect(24, 10, 10, 648, { isStatic: true, render: { visible: false } });
var w2 = rect(34, 0, 700, 10, { isStatic: true, render: { visible: false } });
var w3 = rect(734, 10, 10, 450, { isStatic: true, render: { visible: false } });
var w4 = shape(105, 753, '22 659 30 653 184 843 176 851', { isStatic: true, render: { visible: false } });
var w5 = shape(347, 791, '175 844 460 660 510 736 224 920', { isStatic: true, render: { visible: false } });
var w6 = shape(637, 572, '561 592 743 459 606 658', { isStatic: true, render: { visible: false } });

let t = table(578, 391, 55);

World.add(engine.world, [
    rect(24, 10, 10, 648, { isStatic: true, render: { visible: false } }),
    rect(34, 0, 700, 10, { isStatic: true, render: { visible: false } }),
    rect(734, 10, 10, 450, { isStatic: true, render: { visible: false } }),
    shape(105, 753, '22 659 30 653 184 843 176 851', { isStatic: true, render: { visible: false } }),
    shape(347, 791, '175 844 460 660 510 736 224 920', { isStatic: true, render: { visible: false } }),
    shape(637, 572, '561 592 743 459 606 658', { isStatic: true, render: { visible: false } }),
    desk(77, 232, 90),
    chair(150, 232, 270),
    desk(77, 400, 90),
    chair(150, 400, 270),
    desk(77, 568, 90),
    chair(150, 568, 270),
    desk(185, 54, 0),
    chair(185, 125, 0),
    desk(353, 54, 0),
    chair(353, 125, 0),
    desk(513, 54, 0),
    chair(513, 125, 0),
    chair(486, 275, 145),
    chair(460, 400, 55),
    chair(523, 493, 55),
    chair(636, 275, 235),
    chair(691, 352, 235),
    t
]);

var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
	mouse: mouse,
	constraint: {
	    stiffness: 0.2,
	    render: {
		visible: false
	    }
	}
    });

World.add(engine.world, mouseConstraint);
render.mouse = mouse;

Events.on(engine, 'afterUpdate', function(event) {
    var time = engine.timing.timestamp;
    t.torque = 8;
});

render.canvas.onclick = () => Engine.run(engine);

// Engine.run(engine);
Render.run(render);

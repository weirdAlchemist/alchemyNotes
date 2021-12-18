Type = {
    pen: "Pen",
    marker: "Marker"
};
class Pen {
    
    constructor(color, size, type = Type.pen) {
        this.color = color;
        this.size = size;
        this.type = type;
        
    };  
};


class Tool { };

class Layer {
    history = [];
    constructor(guid, index, name, canvas) {
        this.guid = guid;
        this.index = index;
        this.name = name;
        this.canvas = canvas;
    };

};

class User {
    guid = null;
    name = null;
    currentPen = null;

    constructor(guid, name, currentPen) {
        this.guid = guid;
        this.name = name;
        this.currentPen = currentPen;
    };
};

class DrawAction {
    actionUser = null;
    pen = null;
    points = [];
    layer = Null;

    constructor(user) {
        this.actionUser = user;
    };

    isValid() {
        //TODO: validate
        return true;
    };

    reverse() { };
};

class MoveAction {

}
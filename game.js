function neigbours(map, i, j) {
    var ip1 = 0;
    if (i != map.length-1) {
        ip1 = i+1;
    }
    var jp1 = 0;
    if (j != map[i].length-1) {
        jp1 = j+1;
    }
    var im1 = map.length-1;
    if (i) {
        im1 = i-1
    }
    var jm1 = map[i].length-1;
    if (j) {
        jm1 = j-1;
    }
    var count = 0;
    if (map[im1][jm1]) {
        count++;
    } if (map[im1][j]) {
        count++;
    } if (map[im1][jp1]) {
        count++;
    } if (map[i][jm1]) {
        count++;
    } if (map[i][jp1]) {
        count++;
    } if (map[ip1][jm1]) {
        count++;
    } if (map[ip1][j]) {
        count++;
    } if (map[ip1][jp1]) {
        count++;
    }
    return count;
}

const map = Array(150);
for (var i=0; i<map.length; i++) {
    map[i] = Array(70);
}

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

for (var i=0; i<map.length; i++) {
    for (var j=0; j<map[i].length; j++) {
        map[i][j] = false;
    }
}

ctx.fillStyle = "black";

function render() {
    for (var i=0; i<map.length; i++) {
        for (var j=0; j<map[i].length; j++) {
            if (map[i][j]) {
                ctx.fillStyle = "black";
            } else {
                ctx.fillStyle = "white";
            }
            ctx.fillRect(i*10, j*10, 9, 9);
        }
    }

}

function update() {
    old_map = map.slice();
    for (var i=0; i<map.length; i++) {
        old_map[i] = map[i].slice();
    }

    render()

    for (var i=0; i<map.length; i++) {
        for (var j=0; j<map[i].length; j++) {
            if (old_map[i][j]) {
                const count = neigbours(old_map, i, j);
                if (count < 2 || count > 3) {
                    map[i][j] = false;
                }
            } else {
                const count = neigbours(old_map, i, j);
                if (count == 3) {
                    map[i][j] = true;
                }
            }
        }
    }
}

ctx.fillStyle = "grey";
ctx.fillRect(0, 0, 1500, 700);
update();

var updateId = null;

function onClick(e) {
    if (e.altKey) {
        if (updateId) {
            clearInterval(updateId);
            updateId = null;
            
        } else {
            updateId = setInterval(update, 50);
        }
        return;
    }

    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
    const cellX = Math.floor(x/10);
    const cellY = Math.floor(y/10);

    map[cellX][cellY] = !map[cellX][cellY];

    if (map[cellX][cellY]) {
        ctx.fillStyle = "black";
    } else {
        ctx.fillStyle = "white";
    }
    ctx.fillRect(cellX*10, cellY*10, 9, 9);
}

canvas.addEventListener("click", onClick, false);

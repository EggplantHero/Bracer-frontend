export const getTreeById = (trees, treeid) => {
  const [tree] = trees.filter((tree) => tree.id === parseInt(treeid));
  return tree;
};

export const getLevels = (tree) => {
  const levels = Object.keys(tree.data);
  console.log(levels);
  return levels;
};

export const container = (levels) => {
  return levels.length > 3 ? "container-fluid" : "container";
};

export const getCoordinates = (boxref) => {
  let box = boxref.current.getBoundingClientRect();
  let { x, y, width, height } = box;
  const coords = {
    x: x + width / 2,
    y: y + height / 2,
    left: x,
    right: x + width,
  };
  return coords;
};

const lineColors = {
  breeder: "rgb(58,167,77)",
  generated: "rgb(254,193,43)",
  empty: "rgb(206,212,218)",
};

function fitToContainer(canvas) {
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

export function offsetCoords(box, offset) {
  const { x, y, left, right } = box;
  const newBox = {
    x: x - offset.x,
    y: y - offset.y,
    left: left - offset.x,
    right: right - offset.x,
  };
  return newBox;
}

export function countChildren(tree) {
  let maxChildren = 0;
  for (const level in tree) {
    const count = Object.keys(tree[level]).length;
    maxChildren += count;
  }
  return maxChildren;
}

export function drawLines(boxes, canvas) {
  const ctx = canvas.current.getContext("2d");
  fitToContainer(canvas.current);
  ctx.lineWidth = 1;
  const keys = Object.keys(boxes).reverse();
  keys.pop();
  keys.forEach((key) => {
    const level = parseInt(key);
    for (let i = 0; i < Object.keys(boxes[level]).length; i++) {
      for (let j = 0; j <= 1; j++) {
        ctx.strokeStyle = "grey";
        let type = "breeder";
        if (type === "breeder") {
          ctx.shadowColor = lineColors.breeder;
        } else {
          ctx.shadowColor = lineColors.empty;
        }
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 3;
        ctx.shadowOffsetX = 1;
        const start = {
          x: boxes[level - 1][i + 1].right,
          y: boxes[level - 1][i * 2 + j].y,
        };
        const end = {
          x: boxes[level][i].left,
          y: boxes[level][i].y,
        };
        const mid = {
          x: (start.x + end.x) / 2,
        };

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(mid.x, start.y);
        ctx.lineTo(mid.x, end.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }
    }
  });
}

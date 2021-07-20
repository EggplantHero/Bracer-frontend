import React, { Component } from "react";
import TreeCell from "./treeCell";
import {
  drawLines,
  countChildren,
  offsetCoords,
} from "../../utils/lineRenderer";
import { getAllBraceIcons } from "../../utils/pokeApi";
import axios from "axios";

class Tree extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  state = { boxes: {}, loaded: 0, tree: {}, remainingbreeders: [], braces: {} };

  cancelTokenSource = axios.CancelToken.source();

  async componentDidMount() {
    const { data } = await this.props.getTree(this.cancelTokenSource);
    const { tree, remainingbreeders } = data;
    const braces = await getAllBraceIcons();
    this.setState({ tree, remainingbreeders, braces });
    this.drawTree();
  }

  componentDidUpdate() {
    this.drawTree();
  }

  componentWillUnmount() {
    this.cancelTokenSource.cancel("The POST request was canceled by the user.");
  }

  pageIsLoaded() {
    const { loaded, tree } = this.state;
    if (loaded === countChildren(tree)) {
      return true;
    }
    return false;
  }

  drawTree = () => {
    if (this.pageIsLoaded()) {
      const { boxes } = this.state;
      const canvas = this.inputRef.current;
      drawLines(boxes, canvas);
    }
  };

  logCoordinates = (box, level, index) => {
    const canvas = this.inputRef.current;
    const offset = canvas.getBoundingClientRect();
    const boxes = { ...this.state.boxes };
    boxes[level] = { ...boxes[level] };
    boxes[level][index] = offsetCoords(box, offset);
    this.setState({ boxes, loaded: this.state.loaded + 1 });
  };

  render() {
    const { target } = this.props;
    const { tree, braces } = this.state;
    const levels = Object.keys(tree);

    return (
      <div className="user-select-none">
        <h6 className="text-center user-select-none mt-5">
          The optimal pattern was calculated for you based off given breeders:
        </h6>
        <div className="d-flex justify-content-center relative">
          {levels.map((level) => (
            <div
              key={level}
              className="col-2 d-inline-block d-flex flex-column justify-content-between text-center"
            >
              <br></br>
              {tree[level].map((poke, index) => (
                <div key={level + index}>
                  <TreeCell
                    poke={poke}
                    target={target}
                    level={level}
                    index={index}
                    braces={braces}
                    logCoordinates={this.logCoordinates}
                  ></TreeCell>
                </div>
              ))}

              <br></br>
            </div>
          ))}
          <canvas className="canvas" ref={this.inputRef}></canvas>
        </div>
      </div>
    );
  }
}

export default Tree;
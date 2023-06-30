class Matrix {
  rows: number = 0;
  cols: number = 0;
  matrix: Array<Array<string>> = [];
  divider: Divider = {
    x_axis: new Set([1, 2]),
    y_axis: new Set([1, 2]),
  };

  constructor(rows: number, cols: number) {
    this.updateMatrix(rows, cols);
  }

  updateMatrix(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;

    for (let i = 0; i < rows; i++) {
      const row: Array<string> = new Array(cols).fill(null).map((el) => "");

      this.matrix.push(row);
    }
  }

  getMatrix() {
    return this.matrix;
  }

  logMatrix() {
    console.log("-----");

    this.matrix.forEach((row) => {
      console.log(row);
    });

    console.log("-----");
  }

  getSize() {
    return {
      rows: this.rows,
      cols: this.cols,
    };
  }

  setDivider(axis: "row" | "col", dividerIndex: number) {
    if (axis === "row") {
      this.toggleDividierIndex(this.divider.y_axis, dividerIndex);

      return;
    }

    this.toggleDividierIndex(this.divider.x_axis, dividerIndex);
  }

  private toggleDividierIndex(set: Set<number>, value: number) {
    if (set.has(value)) {
      set.delete(value);

      return;
    }

    set.add(value);
  }

  getDivider() {
    return this.divider;
  }
}

export default Matrix;

export interface Divider {
  x_axis: Set<number>;
  y_axis: Set<number>;
}

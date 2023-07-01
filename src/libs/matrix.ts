class Matrix {
  size: Size = {
    rows: 0,
    cols: 0,
  };
  matrix: Array<Array<string>> = [];
  divider: Divider = {
    x_axis: new Set([]),
    y_axis: new Set([]),
  };

  constructor(rows: number, cols: number) {
    this.setMatrix(rows, cols);
  }

  setMatrix(rows: number, cols: number) {
    this.size = {
      rows,
      cols,
    };

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

  getSize(): Size {
    return this.size;
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

export interface Divider {
  x_axis: Set<number>;
  y_axis: Set<number>;
}

export interface Size {
  rows: number;
  cols: number;
}

export default Matrix;

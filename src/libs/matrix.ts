class Matrix {
  rows: number = 0;
  cols: number = 0;
  matrix: Array<Array<string>> = [];
  divider: Record<string, Array<number>> = {
    x_axis: [],
    y_axis: [],
  };

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

  constructor(rows: number, cols: number) {
    this.updateMatrix(rows, cols);
  }
}

export default Matrix;

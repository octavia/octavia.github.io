export default class GLBuffer {
  constructor(glContext) {
    this.glContext = glContext;
    this.buffer = this.glContext.createBuffer();
  }

  bind() {
    this.glContext.bindBuffer(this.glContext.ARRAY_BUFFER, this.buffer);
  }

  set(data) {
    this.bind();

    this.glContext.bufferData(this.glContext.ARRAY_BUFFER, data, this.glContext.STATIC_DRAW);
  }
}

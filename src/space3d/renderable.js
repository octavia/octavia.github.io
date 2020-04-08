export default class Renderable {
  constructor(glContext, program, buffers, primitiveCount){
    this.glContext = glContext;
    this.program = program;
    this.buffers = buffers;
    this.primitiveCount = primitiveCount;
  }

  render() {
    this.program.use();

    for (let name in this.buffers) {
      let buffer = this.buffers[name].buffer;
      let size = this.buffers[name].size;
      let location;

      try {
        location = this.program.attributes[name].location;
      } catch (exception) {
        console.error('Could not find location for', name);
        throw exception;
      }

      buffer.bind();
      this.glContext.enableVertexAttribArray(location);
      this.glContext.vertexAttribPointer(location, size, this.glContext.FLOAT, false, 0, 0);
    }

    this.glContext.drawArrays(this.glContext.TRIANGLES, 0, 3 * this.primitiveCount);

    for (let name in this.buffers) 
      this.glContext.disableVertexAttribArray(this.program.attributes[name].location);
  }
}

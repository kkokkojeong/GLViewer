/**
 *  Create a vertex array, which defines the attributes
 *
 *  @param {Object} options
 *  @param {Context} options.context
 *  @param {Object[]} options.attributes
 *  @param {IndexBuffer} options.indexBuffer(optional)
 *
 */
import { DeveloperError } from '../../Common/CustomError';

export class VertexArray {

  constructor(options: any) {
    if (!options.context) {
      throw new DeveloperError('options.context is required.')
    }
    if (!options.attributes) {
      throw new DeveloperError('options.attributes is required.')
    }

    const context = options.context;
    const gl = context.gl;

    // Todo: Create vertex attributes, index buffer
  }

  public destroy(): void {
    // Todo: destroy
  }

}

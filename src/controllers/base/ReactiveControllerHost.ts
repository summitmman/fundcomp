import type { ReactiveController } from './types';
import type { ComponentInterface } from '@stencil/core';

export class ReactiveControllerHost implements ComponentInterface {
  controllers = new Set<ReactiveController>();

  addController(controller: ReactiveController) {
    this.controllers.add(controller);
  }
  
  connectedCallback() {
    this.controllers.forEach((controller) => controller.hostConnected?.());
  }

  disconnectedCallback() {
    this.controllers.forEach((controller) => controller.hostDisconnected?.());
  }
  
  componentWillLoad() {
    this.controllers.forEach((controller) => controller.hostWillLoad?.());
  }

  componentDidLoad() {
    this.controllers.forEach((controller) => controller.hostDidLoad?.());
  }

  componentShouldUpdate() {
    this.controllers.forEach((controller) => controller.hostShouldUpdate?.());
  }

  componentWillRender() {
    this.controllers.forEach((controller) => controller.hostWillRender?.());
  }
  
  componentDidRender() {
    this.controllers.forEach((controller) => controller.hostDidRender?.());
  }

  componentWillUpdate() {
    this.controllers.forEach((controller) => controller.hostWillUpdate?.());
  }

  componentDidUpdate() {
    this.controllers.forEach((controller) => controller.hostDidUpdate?.());
  }
}
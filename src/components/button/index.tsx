import { Component, h, Element } from '@stencil/core';
import { ReactiveControllerHost } from '../../controllers/base/ReactiveControllerHost';
import { TemplateController } from '../../controllers/TemplateController';

@Component({
  tag: 'fc-button',
  styleUrl: 'button.css',
  shadow: true
})
export class Button extends ReactiveControllerHost {
    @Element() el!: HTMLElement;

    private slots = ['default', 'prefix', 'suffix'];
    private templateController = new TemplateController(() => this.el, this.slots);

    constructor() {
        super();
        this.addController(this.templateController);
    }

    render() {
        return (
            <button>
                <slot name="prefix" />
                <slot />
                <slot name="suffix" />
            </button>
        );
    }
}
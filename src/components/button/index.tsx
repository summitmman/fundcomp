import { Component, h, Element, State } from '@stencil/core';
import { ReactiveControllerHost } from '../../controllers/base/ReactiveControllerHost';
import { TemplateController } from '../../controllers/TemplateController';
import { AttributeController } from '../../controllers/AttributeController';

@Component({
  tag: 'fc-button',
  styleUrl: 'button.css',
  shadow: true
})
export class Button extends ReactiveControllerHost {
    @Element() el!: HTMLElement;

    private slots = ['default', 'prefix', 'suffix'];
    private templateController = new TemplateController(() => this.el, this.slots);

    @State() prefixedAttributes: Record<string, string> = {};
    private attributeController = new AttributeController(() => this.el, 'fc-', (attributes) => {
        this.prefixedAttributes = attributes;
    });

    constructor() {
        super();
        this.addController(this.templateController);
        this.addController(this.attributeController);
    }

    render() {
        return (
            <button
                {...this.prefixedAttributes}
            >
                <slot name="prefix" />
                <slot />
                <slot name="suffix" />
            </button>
        );
    }
}
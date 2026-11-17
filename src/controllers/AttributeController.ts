import type { ReactiveController } from './base/types';
import type { State } from '@stencil/core';

export class AttributeController implements ReactiveController {
    private element: () => HTMLElement;
    private prefix: string;
    private attributes: () => State<Record<string, string>>;

    constructor(element: () => HTMLElement, prefix: string, attributes: () => State<Record<string, string>>) {
        this.element = element;
        this.prefix = prefix;
        this.attributes = attributes;
    }

    hostWillLoad() {
        const allAttributes = Array.from(this.element().attributes);
        const prefixedAttributes = allAttributes.filter(attr => attr.name.startsWith(this.prefix)).map(attr => ({ name: attr.name, value: attr.value }));
    }
}
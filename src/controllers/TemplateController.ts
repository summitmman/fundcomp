import type { ReactiveController } from './base/types';

export const DEFAULT_SLOT = 'default';

export class TemplateController implements ReactiveController {
    private element: () => HTMLElement;
    private slotNames: Array<string>;

    constructor(element: () => HTMLElement, slots: Array<string>) {
        this.element = element;
        this.slotNames = slots;
    }

    hostWillLoad() {
        // process default and named slots
        this.slotNames.forEach(slotName => this.processSlots(slotName));
    }

    private processSlots(slotName: string) {
        // query the template for the given slot name
        const query = (slotName === DEFAULT_SLOT) ? 'template:not([slot])' : `template[slot="${slotName}"]`;
        const templates: NodeListOf<HTMLTemplateElement> = this.element().querySelectorAll(query);

        templates.forEach(template => {
            if (template && template.content) {
                const fragment: DocumentFragment = template.content;

                // if it is a named slot, transfer the slot name to the html element in the template
                if (slotName !== DEFAULT_SLOT) {
                    if (fragment.firstElementChild) {
                        (fragment.firstElementChild as HTMLElement).setAttribute('slot', slotName);
                    }
                }

                // append the unfurled content
                const content = template.content.cloneNode(true);
                this.element().appendChild(content);

                // cleanup
                template.remove();
            }
        });
    }
}
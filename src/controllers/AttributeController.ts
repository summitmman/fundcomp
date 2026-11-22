import type { ReactiveController } from './base/types';

export class AttributeController implements ReactiveController {
    private element: () => HTMLElement;
    private prefix: string;
    private setPrefixedAttributesState: (attributes: Record<string, string>) => void;

    private attributeObserver: MutationObserver | null = null;

    constructor(
        element: () => HTMLElement,
        prefix: string,
        setPrefixedAttributesState: (attributes: Record<string, string>) => void
    ) {
        this.element = element;
        this.prefix = prefix;
        this.setPrefixedAttributesState = setPrefixedAttributesState;
    }

    hostWillLoad() {
        this.processAttributes();
    }

    hostConnected() {
        this.attributeObserver = new MutationObserver(() => this.processAttributes());
        this.attributeObserver.observe(this.element(), { attributes: true });
    }
    
    hostDisconnected() {
        if (this.attributeObserver) {
            this.attributeObserver.disconnect();
            this.attributeObserver = null;
        }
    }

    public processAttributes() {
        const allAttributes = Array.from(this.element().attributes);
        const prefixedAttributes = allAttributes
            .filter(attr => attr.name.startsWith(this.prefix))
            .map(attr => ({ name: attr.name, value: attr.value }));

        const attributesRecord: Record<string, string> = {};
        prefixedAttributes.forEach(attr => {
            const unprefixedName = attr.name.slice(this.prefix.length);
            attributesRecord[unprefixedName] = attr.value;
        });
        this.setPrefixedAttributesState(attributesRecord);
    }
}
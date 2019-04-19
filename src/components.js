import { registerHost, h, createEvent, proxyNative } from '@stencil/core/runtime';

class AppRoot extends HTMLElement {
    constructor() {
        super();
        registerHost(this);
        this.list = [
            { text: 'my initial todo', checked: false },
            { text: 'Learn about Web Components', checked: true }
        ];
        this.inputSubmiHandler = (e) => {
            this.list = [...this.list, { text: e.detail, checked: false, }];
        };
        this.itemCheckedHandler = (e) => {
            const list = [...this.list];
            const item = list[e.detail];
            list[e.detail] = Object.assign({}, item, { checked: !item.checked });
            this.list = list;
        };
        this.itemRemoveHandler = (e) => {
            this.list = [...this.list.slice(0, e.detail), ...this.list.slice(e.detail + 1)];
        };
        this.toggleAllHandler = (e) => {
            this.list = this.list.map(item => {
                item.checked = !!e.target.checked;
                return item;
            });
        };
    }
    render() {
        const allChecked = this.list.every(item => item.checked);
        return (h("div", null, h("header", { class: "header" }, h("h1", null, "Todos Stencil"), h("todo-input", { onInputSubmit: this.inputSubmiHandler })), h("section", { class: "main", hidden: this.list.length === 0 }, h("input", { id: "toggle-all", onInput: this.toggleAllHandler, class: "toggle-all", type: "checkbox", checked: allChecked }), h("label", { htmlFor: "toggle-all" }), h("ul", { class: "todo-list" }, this.list.map((item, index) => (h("todo-item", { onItemCheck: this.itemCheckedHandler, onItemRemove: this.itemRemoveHandler, checked: item.checked, text: item.text, index: index })))))));
    }
}

class TodoInput extends HTMLElement {
    constructor() {
        super();
        registerHost(this);
        this.handleOnSubmit = (e) => {
            e.preventDefault();
            if (!this.value)
                return;
            this.inputSubmit.emit(this.value);
            this.value = '';
        };
        this.handleInputChange = (event) => this.value = event.target.value;
        this.inputSubmit = createEvent(this, "inputSubmit", 7);
    }
    render() {
        return (h("form", { onSubmit: this.handleOnSubmit }, h("input", { class: "new-todo", value: this.value, type: "text", placeholder: "What needs to be done?", onInput: this.handleInputChange })));
    }
}

class TodoItem extends HTMLElement {
    constructor() {
        super();
        registerHost(this);
        this.handleOnCheck = () => this.itemCheck.emit(this.index);
        this.handleOnRemove = () => this.itemRemove.emit(this.index);
        this.itemCheck = createEvent(this, "itemCheck", 7);
        this.itemRemove = createEvent(this, "itemRemove", 7);
    }
    render() {
        return (h("li", { class: this.checked ? 'completed' : '' }, h("input", { class: "toggle", type: "checkbox", checked: this.checked, onChange: this.handleOnCheck }), h("label", null, this.text), h("button", { class: "destroy", onClick: this.handleOnRemove })));
    }
}

const AppRoot$1 = /*@__PURE__*/proxyNative(AppRoot, [0,"app-root",{"list":[32]}]);
const TodoInput$1 = /*@__PURE__*/proxyNative(TodoInput, [0,"todo-input",{"value":[32]}]);
const TodoItem$1 = /*@__PURE__*/proxyNative(TodoItem, [0,"todo-item",{"checked":[4],"text":[1],"index":[2]}]);

export { AppRoot$1 as AppRoot, TodoInput$1 as TodoInput, TodoItem$1 as TodoItem };

var state = {
    todo: [],
    selectedBtn: 1,
    page: '/#',
    filter: '',
    hideInfo: false,
    hideClear: false,
    allChecked: false,
};

function saveState(currentState) {
    localStorage.setItem('state', JSON.stringify(currentState));
}

function loadState() {
    let data = localStorage.getItem('state');
    if (data) {
        state = JSON.parse(data);
    }
}

function createChild(parent, child) {
    if (child instanceof Node) {
        parent.appendChild(child);
    } else {
        parent.appendChild(document.createTextNode(child));
    }
}

function removeChild(parent, child) {
    parent.removeChild(child);
}
function createStructure(structure) {
    let parent = document.createElement(structure.tag);
    if ('attri' in structure) {
        setAttributes(parent, structure.attri);
    }
    if ('children' in structure) {
        if (Array.isArray(structure.children)) {
            for (const child of structure.children) {
                createChild(parent, child);
            }
        } else {
            createChild(parent, structure.children);
        }
    }

    return parent;
}

function setAttributes(element, attributes) {
    for (let i = 0; i < attributes.length; i += 2) {
        let key = attributes[i];
        let value = attributes[i + 1];
        if (value === null || value === undefined) {
            continue;
        }
        element.setAttribute(key, value);
    }
}

function getParent(element, num = 2) {
    for (let i = 0; i < num; i++) {
        element = element.parentElement;
    }
    return element;
}

function redirect(url) {
    window.history.pushState(null, null, url);
}

function addEvent(eventType, element, callback) {
    element.addEventListener(eventType, callback);
}

function removeEvent(eventType, element) {
    element.removeEventListener(eventType);
}

export const INIT = 'INIT';
export const UPDATE_TITLE = 'UPDATE_TITLE';

export const ADD_NODE = 'ADD_NODE';
export const ADD_LINK = 'ADD_LINK';
export const REMOVE_NODE = 'REMOVE_NODE';
export const REMOVE_LINK = 'REMOVE_LINK';
export const EDIT_OPTIONS = 'EDIT_OPTIONS';
export const RESET_OPTIONS = 'RESET_OPTIONS';


export function init(){
    var state = window.localStorage['state']? window.JSON.parse(window.localStorage['state']) : {};
    return {
        'type':INIT,
        'state':state
    }
}

export function addNode(label){
    var ts = (new Date()).getTime();
    var node = {
        label:label,
        id:ts
    }
    return {
        'type':ADD_NODE,
        'node':node
    }
}

export function addLink(link){
    return {
        'type':ADD_LINK,
        'link':link
    }
}

export function removeNode(index){
    return {
        'type':REMOVE_NODE,
        'index':index
    }
}

export function removeLink(index){
    return {
        'type':REMOVE_LINK,
        'index':index
    }
}

export function editOptions(options){
    return {
        'type':EDIT_OPTIONS,
        'options':options
    }
}

export function resetOptions(){
    return {
        'type':RESET_OPTIONS,
    }
}

export function updateTitle(title){
    return {
        'type':UPDATE_TITLE,
        'title':title
    }
}
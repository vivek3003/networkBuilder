import { push } from 'react-router-redux'
import {default as fRef} from '../utils/firebase';
import assign from 'object-assign';

export const INIT = 'INIT';
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const RESTORE_USER_DATA = 'RESTORE_USER_DATA';
export const LOGOUT = 'LOGOUT';
export const GOT_LIST = 'GOT_LIST';

export const GOT_GRAPH = 'GOT_GRAPH';
export const REINIT_GRAPH = 'REINIT_GRAPH';
export const ADD_NODE = 'ADD_NODE';
export const ADD_LINK = 'ADD_LINK';
export const REMOVE_NODE = 'REMOVE_NODE';
export const REMOVE_LINK = 'REMOVE_LINK';
export const EDIT_OPTIONS = 'EDIT_OPTIONS';
export const RESET_OPTIONS = 'RESET_OPTIONS';
export const INITITAL_GRAPH = {
  id:'',
  nodes : [
  ],

  links : [
  ],

  title:'New Graph'
}

export const INITITAL_OPTIONS = {
  'width': 600,
  'height': 400,
  'background':'#ffffff',
  'allowForce':true,
  'nodeRadius':10,
  'nodeFill':'#1492e6',
  'nodeCharge':-1000,
  'nodeTextFill':'#1b998b',

  'linkLength':90,
  'linkStroke':'#fdc202'
}

function syncUserAction(user, uid){
    return {
        'type':RESTORE_USER_DATA,
        'user':user,
        'uid':uid
    }
}

function logoutAction(){
    return {
        'type':LOGOUT
    }
}

export function syncUser(authData){
    return (dispatch, getState) => {
        var data = {
            'data':authData.google.cachedUserProfile,
            'list':[]
        };

        var userRef = fRef.getUserRef();
        //Sign up New User
        userRef.once('value', function(snapshot){
            if(snapshot.val() == null) {
                userRef.set({
                    'data':authData.google.cachedUserProfile,
                    'list':[]
                })
            }else{
                data = snapshot.val();
            }
        });
        dispatch(syncUserAction(data, authData.uid));
        dispatch(push('/list'))
    }
}

export function logout(){
    return (dispatch, getState) => {
        dispatch(logoutAction());
        dispatch(push('/login'))
    }
}

function gotList(graphArray){
    return {
        'type':GOT_LIST,
        'list': graphArray
    }
}

export function getList(){
    return (dispatch, getState) => {
        fRef.getUserList().once('value', function(snap){
            var graphArray = [];
            var snapVal = snap.val()

            for(var key in snapVal){
                graphArray.push({
                    'id':key,
                    'title':snapVal[key]['graph']['title'],
                    'url':`#/graph/${key}`
                })
            }
            dispatch(gotList(graphArray))
        })
    }
}


export function getGraph(graphId){
    return (dispatch, getState) => {

        var graphRef = fRef.getGraphRef(graphId);

        graphRef.once('value', function(snap){
            var graphVal = assign({}, snap.val())
            dispatch(gotGraph(graphId,graphVal))
        })
    }
}

function gotGraph(graphId, graphVal){
    return {
        'type':GOT_GRAPH,
        'graph_id':graphId,
        'graph':graphVal
    }
}

export function createGraph(){
    return (dispatch, getState) => {
        var graph = fRef.getList().push({
            'graph': INITITAL_GRAPH,
            'options': INITITAL_OPTIONS
        })
        var graphKey = graph.key();
        dispatch(push(`/graph/${graphKey}`))
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

export function reinitGraph(){
    return {
        'type':REINIT_GRAPH
    }
}
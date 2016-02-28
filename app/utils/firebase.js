import Firebase from "firebase"

class FirebaseRef{
    constructor(url){
        this.fRef = new Firebase(url);
    }
    getRef(){
        return this.fRef;
    }
    isLoggedIn(){
        return (!(this.fRef.getAuth() == null));
    }
    getAuthData(){
        return this.fRef.getAuth();
    }
    getUserRef(){
        var user = this.fRef.getAuth();
        return this.fRef.child('users')
                        .child(user.uid);
    }
    getUserList(){
        var user = this.fRef.getAuth();
        return this.fRef.child('users')
                        .child(user.uid)
                        .child('list');
    }
    getGraphRef(graphId){
        var user = this.fRef.getAuth();
        return this.fRef.child('users')
                        .child(user.uid)
                        .child('list')
                        .child(graphId);
    }
}

const fRef = new FirebaseRef("https://networkbuilder.firebaseio.com/");

export default fRef;
export default class StateMachine{
    root: State
    currentState: State;
    changing:boolean
    private registered_names: string[]
    constructor(root: string | State){
        this.registered_names =[];
        if(root instanceof State){
            this.root = root
        }else{
            this.root = new State(root,null);
        }
        this.currentState = this.root;
        this.registered_names.push(this.root.name);
    }
    /** 
     * @params {string} name - name of the new state
     * @params {string | string[]} trans - list of state this state can trans into
     * @params {string} action - action needed to trans into this state 
     */
    addState(name:string, parent?:State, expires=false){
        if(this.registered_names.includes(name)){
            throw new Error('State exists already, use editState to change one')
        }
        this.registered_names.push(name);
        let newState = new State(name, parent || this.root,expires);
        parent.addTrans(newState)
      

    }
   /*  getByName(name:string, current=this.root):State{
        if(current.name === name)
            return current;
        if(current.actions.length ===0)
            return;
        else
            current.actions.forEach(tran=>{
                this.getByName(name, tran)
            })
        return ;
    } */
    run(action:string):string{
        if(action === 'idle' || this.currentState.name === action){
            if(this.currentState.expires){
                //figure out if its time to change states
                if(!this.currentState.actions['return'])
                    this.currentState = this.root;
                else
                    this.currentState = this.currentState.actions['return'];
            }
            return this.currentState.name;
        }
        if(!this.registered_names.includes(action)){
            console.log(action, 'is not a registered state');
            this.currentState = this.root;
            return this.currentState.name;
        }
        let nextState = this.currentState.getByAction(action);
        if(nextState)
            this.currentState = nextState
        else
            return;
        return this.currentState.name;
    }
}

interface actionMap{
    [action:string]:State
}
class State{
    name:string;
    actions: actionMap
    expires:boolean | 'string';
    constructor(name:string, parent?:State, expires=false){
        this.actions = {};
        if(parent)
           this.actions['return'] = parent
        this.name = name;
        
       
        this.expires=false;
    }
    addTrans(tran:State){
        this.actions[tran.name] = tran;
    }
    getByAction(action:string):State{
        return this.actions[action];
    }
}
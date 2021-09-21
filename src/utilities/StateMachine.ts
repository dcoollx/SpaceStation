interface iState{
    entity : Object;
    states : iHashmap<iState>;
    handleInput(entity : Object, input :string) :void
    enter() : void
    exit() : void
}
interface iHashmap<Type>{
    [name : string] : Type
}

class State implements iState{
    states : iHashmap<iState>;
    handleInput : (entity : Object, i:string)=>iState;
    enter : ()=>void;
    exit :  ()=>void;
    entity:any;
    constructor(enitiy:any,  states : iHashmap<iState>, handleInput : (entity : Object, i:string)=>iState, enter = ()=>{ console.log('entering state')}, exit = ()=>{ console.log('leaving state')} ){
        this.handleInput = handleInput;
        this.enter = enter;
        this.exit = exit;
    }
}
let jump  = function(i:string){return this});
let run  = function(entity : Object, i:string){
    if(i == "left"){
        console.log('show left sprite');
        return this;
    }else if( i === 'right' ){
        console.log('show right sprite')
        return this;
    }
    else if(!i){
        idle.enter();
        return idle;
    }
};
let idle :iState = new State({speed : 0}, function (i:string){
 if(!i){
    return this;
 }else{
     this.exit();
     if(i === 'left'){
         run.enter();
         return run;
     }
     if(i === 'up'){
        jump.enter();
        return jump
     }
 }
}, ()=>{console.log('enter idle state')},
()=>{console.log('exit idle state')})


class FSM{
    enitiy :any;
    state : iState
    allStates : iHashmap<iState>
    constructor(entity : any){
        this.enitiy = entity;
    }

    run(input : string){
        this.state = this.state.handleInput(this.enitiy, input);
        
    }
    addState(name :string, handleInput : (i:string)=>iState,  enter? : ()=>void, exit? :  ()=>void){
        const state = new State(this.enitiy, this.allStates , handleInput,enter, exit);
        this.allStates[name] = state;
    }
}

let test = new FSM({speed : 0, jumps : 0});

test.addState("run",run);
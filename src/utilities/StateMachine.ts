export default class StateMachine{
    state:string;
    rootState:string;
    allStates:stateMap
    stateArgs: any[]
    constructor(root: string, allStates: stateMap, args:any=[]){
        this.state = root;
        this.rootState = root;
        this.allStates = allStates;
        this.stateArgs = args
        this.bind();
        this.allStates[this.state].enter(...this.stateArgs);
    }
    bind(){
        for(let state in this.allStates){
            this.allStates[state].stateMachine = this;
        }
    }
    transistion(nextState:string, arg?:any[]){
        if(this.state === nextState)
            return; // dont enter a state you are already in.
        if(this.allStates[this.state].nodes.includes(nextState)){
            this.allStates[this.state].exit(this.stateArgs)
            this.state = nextState;
            this.allStates[this.state].enter(this.stateArgs)
        }
    }
    step(args?:any){
        this.allStates[this.state].execute(this.stateArgs);
    }
}

interface stateMap{
    [name:string]:State
}

export class State{
    stateMachine : StateMachine
    name:string;
    nodes:string[];
    constructor(name:string,otherStates
        :string[], enter?:(...args: any[]) => void,execute?:(...args: any[]) => void, exit?:(...args: any[]) => void){
        this.name = name;
        this.nodes = otherStates;
        this.stateMachine = null;
        if(enter)
            this.enter = enter;
        if(exit)
            this.exit = exit;
        if(execute)
            this.execute = execute;
    }
    enter(...args:any[]){
        throw new Error('You must override this function')
    }
    execute(...args:any){throw new Error('You must override this function')}
    exit(...args:any){throw new Error('You must override this function')}
}


////test machine
function check(args:any){
    args.temp++
    if(args.temp > 100){
        this.stateMachine.transistion('gas', args.temp);
    }
    if(args.temp < 100){
        this.stateMachine.transistion('liquid', args.temp);
    }
    
}

const atlas: stateMap = {
  'liquid': new State('liquid',['gas','solid'], (temp:number)=>console.log(`cup  ${(temp > 10) ? 'melted' : 'condensed'} to a liquid`),check, (temp:number)=>temp >= 100 ? console.log('cup started to boil') : console.log('cup is really cold')),
  'solid': new State('solid', ['liquid'],(temp:number)=>console.log('cup froze to ice'),check,(temp:number)=>console.log('cup started to melt')),
  'gas': new State('gas', ['liquid'],(temp:number)=>console.log('cup evaporated to mist'),(args:any)=>args.temp++, (temp:number)=>console.log('cup started to condense')),
}

let testMachine = new StateMachine('solid',atlas,{temp:0});
Object.assign(window,{test:testMachine})

export {testMachine}
interface iEvent{
    name : string,
    from : string | Array<string>
    to : string | Array<string>
    conditional? : Function
}


interface stateSettings {
    initial:string,
    events : Array<iEvent>
}



class event{
    name:string;
    condition : Function;
    to: string;
    from: string
    constructor(options : any){
        this.name = options.name;
        this.to = options.to,
        this.from = options.from;
    }
    when(expression : Function): event{
        this.condition = expression;
        return this;
    }
    on(event:string): event{
        //todo check if event is in list

        return this;
        
    }

}

export default class StateMachine{

    events : Array<event>
    currentState : string;
    constructor(settings: stateSettings){
        this.currentState = settings.initial;
        this.events = settings.events.map(e =>{
            return new event(e);
        });
    }
   
    private transition(to : string ){

        (to as unknown as event) = this.getEvent(to);
        if(!to){
            throw new Error('to event not found');
        }
        //check the conditional
        if((to as unknown as event).condition()){
        //check that this state can move to/from current state
            if(!(to as unknown as event).from.includes(this.currentState)){
                //cant move to this state
                return;
            }else{
                //dispatch event
            }
        }
    }
    public getEvent(name:string):event | null{
        return this.events.find(e => event.name === name)
    }
}
let temp = 50;
const test = new StateMachine({initial:'liquid', events : [{name:'freeze',to:'ice',from:'liquid'}, {name:'boil',to:'steam',from:'liquid'}]});
test.getEvent('freeze').when((temp : number)=>temp < 0)
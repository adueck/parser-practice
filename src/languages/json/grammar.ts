export const jsonGrammar = `Json -> Atom | Arr | Obj
Atom -> String | number | "true" | "false" | "null"
String -> " string "
Arr -> [ ArrCont ]
ArrCont -> ε | Json ArrContTail
ArrContTail -> ε | , Json ArrContTail
Obj -> { ObjCont }
ObjKeyVal -> String : Json
ObjCont -> ε | ObjKeyVal ObjContTail
ObjContTail -> ε | , ObjKeyVal ObjContTail`;

export type JsonData = Atom | Arr | Obj;
export type Atom = string | number | boolean | null;

export type Arr = JsonData[];
export type Obj = { [key: string]: JsonData };
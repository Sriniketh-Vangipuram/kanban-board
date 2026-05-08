export type Status="todo"|"in-progress"|"done";
export type Priority="low"|"medium"|"high";

export interface Task{
    id:string;
    text:string;
    status:Status;
    priority:Priority;
}
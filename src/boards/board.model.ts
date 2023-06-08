/// C++로 치면 멤버에 대한 정의정도가 될 것같음.
/// interface 혹은 class로 하는 것이 권장됌.

export interface Board {
    id: string;
    title: string;
    description: string;
    status: BoardStatus;
}

export enum BoardStatus 
{
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}
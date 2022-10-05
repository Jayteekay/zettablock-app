export interface API {
    createdAt: Date;
    name: string;
    updatedAt: Date;
    description: string;
    type: string;
    id: string;
    operationName: string;
    variables: {};
    query: string;
}
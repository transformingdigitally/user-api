import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class User extends Entity {
  @property({
    id: true,
    type: 'Number',
    generated: true,
    postgresql: {
      // generated:true, no needed
      columnName: 'id',
      dataType: 'integer',
      dataScale: 0,
      nullable: 'NO',
      },
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'number',
    required: true,
  })
  role: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;

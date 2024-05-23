import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true, minlength: 5 })
  username: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({type: String, required: true, minlength: 8})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

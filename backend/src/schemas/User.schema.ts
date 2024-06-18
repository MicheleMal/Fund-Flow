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

UserSchema.pre("findOneAndUpdate", function(next){
  const users = this.getUpdate()

  Object.keys(users).forEach((key)=>{
    if(typeof(users[key])==="string"){
      users[key] = users[key].trim()
    }
  }) 
  next()
})

UserSchema.pre("save", function(next){
  this.username = this.username.trim()
  this.email = this.email.trim()

  next()
})
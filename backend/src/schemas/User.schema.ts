import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { encryptEmail } from 'src/utils/crypto.util';
import * as bcrypt from "bcrypt"

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
  const saltRounds = 10;
  this.username = this.username.trim()
  this.email = this.email.trim()
  this.email = encryptEmail(this.email.trim())
  this.password = bcrypt.hashSync(this.password, saltRounds)

  next()
})
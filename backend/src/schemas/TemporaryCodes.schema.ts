import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { User } from "./User.schema";

export type TemporanyCodesDocument = HydratedDocument<TemporanyCodes>

@Schema({timestamps: true})
export class TemporanyCodes{
    
    @Prop({type: Number, unique: true, required: true})
    code: number

    @Prop({type: SchemaTypes.ObjectId, ref: User.name, unique: true})
    id_user: Types.ObjectId

}

export const TemporanyCodesSchema = SchemaFactory.createForClass(TemporanyCodes)
TemporanyCodesSchema.index({"createdAt": 1}, {expireAfterSeconds: 300 }) // 5 minuti

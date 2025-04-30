import { Schema, model } from "mongoose"

const EventSchema = new Schema(
    {
        event : {
            type: String,
            required: [true, "Name is required"],
            maxLength: [25, "can't exceed 25 characters"],
            trim: true,
        },
        cronograma : {
            type: Date,
            required : [true, "cronograma is required"],
        },
        time : {
            type : Number,
            required: [true, "time is required"],
        },
        hotel : {
            type : String,
            required : [true, "Hotel is required"],
            maxLength: [35, "can't exceed 35 characters"],
        },
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER",
          },
          estado: {
            type: Boolean,
            default: true,
          },
    }
);
  
export default model("Event", EventSchema);
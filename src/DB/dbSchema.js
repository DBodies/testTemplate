import {mongoose, Schema} from "mongoose";

const engineSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["petrol", "diesel", "electric", "hybrid"],
      required: true,
      trim: true,
    },
    volume_l: {
      type: Number,
      min: 0,
      required: true,
    },
    power_hp: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  { _id: false }
);

const carSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // e.g. "toyota_camry_2020"
      required: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
      min: 1950,
      max: new Date().getFullYear() + 1,
    },

    price_usd: {
      type: Number,
      required: true,
      min: 0,
    },

    mileage_km: {
      type: Number,
      required: true,
      min: 0,
    },

    engine: {
      type: engineSchema,
      required: true,
    },

    transmission: {
      type: String,
      enum: ["manual", "automatic", "cvt", "robot"],
      required: true,
    },

    drivetrain: {
      type: String,
      enum: ["fwd", "rwd", "awd", "4wd"],
      required: true,
    },

    body_type: {
      type: String,
      enum: ["sedan", "hatchback", "wagon", "suv", "coupe", "convertible", "pickup", "van"],
      required: true,
    },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    features: {
      type: [String],
      default: [],
    },

    in_stock: {
      type: Boolean,
      default: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'userTemplate'
    }
  },
  {
    timestamps: true, // adds createdAt / updatedAt
    versionKey: false,
  }
);

export const carsCollection = mongoose.model("Cars", carSchema, 'Cars');

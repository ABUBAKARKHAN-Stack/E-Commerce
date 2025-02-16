import mongoose, { Schema } from "mongoose";
import { AdminExtendedModel, CreateAdmin, IAdmin } from "../types/main.types"; // Import the interfaces
import bcrypt from "bcrypt";
import { ApiError } from "../utils";

const adminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "admin",
      immutable: true,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    usersCount: {
      type: Number,
      default: 0,
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Static method (createOne)
adminSchema.statics.createOne = async function (adminData: CreateAdmin) {
  const existingAdmin = await this.findOne();

  if (existingAdmin) {
    throw new ApiError(400, "Admin already exists!");
  }

  return await this.create(adminData);
};

// Pre-save hook to hash the password
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare passwords
adminSchema.methods.comparePassword = async function (password: string) {
  const admin = this as IAdmin;
  return await bcrypt.compare(password, admin.password);
};

// Create the model
export const adminModel = mongoose.model<IAdmin , AdminExtendedModel>("Admin", adminSchema);

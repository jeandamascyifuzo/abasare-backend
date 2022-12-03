import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    customer_id: String,
    name: String,
    email: String,
    userId: String,
    phone_code: String,
    phone: String,
    nationality: String,
    address: String,
    doc_type: String,
    domestic_license: String,
    driving_permit: [
        {
            driving_permit_fontSide: String,
            driving_permit_backSide: String,
        }
    ],
    international_license: String,
    passport: String,
    aadhar_card: String,
    status: String,
},
    { timestamps: true });

export default mongoose.model("Client", ClientSchema)
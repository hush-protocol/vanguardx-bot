import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    githubUsername: {
        type: String,
        required: true,
    },
    telegramUsername: {
        type: String,
    },
    points: {
        type: Number,
    },
});
export default mongoose.model("User", UserSchema);
//# sourceMappingURL=user.js.map
import * as mongoose from "mongoose";
declare const _default: mongoose.Model<{
    githubUsername: string;
    telegramUsername?: string | null | undefined;
    points?: number | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    githubUsername: string;
    telegramUsername?: string | null | undefined;
    points?: number | null | undefined;
}> & {
    githubUsername: string;
    telegramUsername?: string | null | undefined;
    points?: number | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    githubUsername: string;
    telegramUsername?: string | null | undefined;
    points?: number | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    githubUsername: string;
    telegramUsername?: string | null | undefined;
    points?: number | null | undefined;
}>> & mongoose.FlatRecord<{
    githubUsername: string;
    telegramUsername?: string | null | undefined;
    points?: number | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;

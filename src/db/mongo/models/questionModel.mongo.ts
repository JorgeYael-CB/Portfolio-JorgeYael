import mongoose, {Schema} from "mongoose";


const QuestionSchema = new Schema({
    date: {
        type: Date,
        default: Date.now(),
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },

    question: {
        type: String,
        required: [true, 'question is required'],
    },

    questionTitle: {
        type: String,
        required: [true, 'title is required'],
    },
});


export const QuestionModel = mongoose.model('Question', QuestionSchema);
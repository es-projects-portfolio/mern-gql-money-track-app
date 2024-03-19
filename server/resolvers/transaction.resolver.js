import Transaction from "../models/transaction.model.js";

const transactionResolver = {
    Query: {
        transactions: async (_, __, context) => {
            try {
                if (!context.getUser()) throw new Error('Unauthorized!');
                const userId = await context.getUser()._id;

                const transaction = await Transaction.find({ userId });
                return transaction;

            } catch (error) {
                console.error("Error in transactions: ", error);
                throw new Error(error.message || "Internal server error");
            }
        },
        transaction: async (_, { transactionId }) => {
            try {
                const transaction = await Transaction.find({ transactionId });
                return transaction;

            } catch (error) {
                console.error("Error in transaction query: ", error);
                throw new Error(error.message || "Internal server error");
            }
        },
        // TODO => ADD catgeorystatistics query
    },

    Mutation: {
        createTransaction: async (_, {input}, context) => {
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser._id,
                });
                await newTransaction.save();
                return newTransaction;

            } catch (error) {
                console.error("Error in creating txn: ", error);
                throw new Error(error.message || "Internal server error");
            }
        },
        updateTransaction: async (_, {input}, context) => {
            try {
                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {new: true});
                return updatedTransaction;

            } catch (error) {
                console.error("Error in updating txn: ", error);
                throw new Error(error.message || "Internal server error");
            }
        },
        deleteTransaction: async (_, {transactionId}, context) => {
            try {
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deletedTransaction;

            } catch (error) {
                console.error("Error in deleting txn: ", error);
                throw new Error(error.message || "Internal server error");
            }
        },
    },

    // TODO => ADD TRANSACTION/USER RELATIONSHIP
};

export default transactionResolver;
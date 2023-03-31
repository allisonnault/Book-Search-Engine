const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { _id }) => {
            return User.findOne({ _id });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("No user found with this email address");
            }
            const correctPW = await user.isCorrectPassword(password);

            if (!correctPW) {
                throw new AuthenticationError("Incorrect password");
            }
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { userId, bookId }, context) => {
            if(context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $addToSet: {
                            savedBooks: { authors, description, bookId, image, link, title },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        deleteBook: async (parent, { userId, book_id }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $pull: {
                            savedBooks: {
                                _id: book_id,
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    },
};

module.exports = resolvers;
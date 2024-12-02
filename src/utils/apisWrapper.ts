import { Express } from "express-serve-static-core";
import dotenv from "dotenv"
import loginRouter from "../routes/auth/login";
import registerRouter from "../routes/auth/register";
import signOutRouter from "../routes/auth/signOut";
import productsRouter from "../routes/productManagment/product";
import searchRouter from "../routes/searchOnProducts/searchOnProducts"
import feedbackRouter from "../routes/checkout/feedback"
import wishlistRouter from "../routes/wishlist/wishlist"
import notificationRouter from "../routes/notification/wishlistNotification"
import anaylictsRouter from "../routes/dashBoradAnalytics/analytics"
import searchOnComments from "../routes/searchOnComments/searchOnComments"
import session from 'express-session';
import MongoStore from 'connect-mongo';

dotenv.config()

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
})

export function APIs(app: Express) {
    app.use(sessionMiddleware)
    app.use('/auth', loginRouter);
    app.use('/auth', registerRouter);
    app.use('/auth', signOutRouter);
    app.use('/api', searchRouter);
    app.use('/api', productsRouter);
    app.use('/api', feedbackRouter);
    app.use('/api', wishlistRouter);
    app.use('/api', anaylictsRouter);
    app.use('/api', searchOnComments);
    app.use(notificationRouter)
}

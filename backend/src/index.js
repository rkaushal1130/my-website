import dotenv from "dotenv";
import dns from "dns";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";

dotenv.config();

// Ensure SRV records can be resolved on Windows networks
try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch {
    // Keep system DNS if override fails
}

const app = express();

(async () => {
    try {
        const uri = process.env.MONGODB_URL || process.env.MONGODB_URI;
        if (uri) {
            await mongoose.connect(`${uri.replace(/\/+$/, '')}/${DB_NAME}`);
            console.log("MongoDB connected successfully");
        }
        
        app.on("error", (error) => {
            console.log("ERRR: ", error);
            throw error;
        });

        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        });

    } catch (error) {
        console.error("ERROR: ", error);
        throw error;
    }
})();
import { Request, Response } from "express";

interface ServerCheckResponse {
    success: boolean;
    message: string;
    timestamp: string;
}

const ServerCheck = (req: Request<{}, {}, {}>, res: Response<ServerCheckResponse>): void => {
    res.status(200).json({
        success: true,
        message: "✅ Server is running!",
        timestamp: new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })
    });
    return;
};

export default ServerCheck;
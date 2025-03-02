const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

interface CorsOptions {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void;
  optionsSuccessStatus: number;
}

const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback) {
    if (allowedOrigins.indexOf(origin || "") !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;

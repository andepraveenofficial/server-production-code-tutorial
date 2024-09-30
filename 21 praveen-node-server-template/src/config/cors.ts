// CORS options
const whitelist = [
  'https://www.yoursite.com',
  'http://127.0.0.1:5000',
  'http://localhost:5000',
  'http://localhost:3000',
];

const corsOptions = {
  // origin: "http://localhost:3000", // Allow only requests from this origin
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
};

export default corsOptions;

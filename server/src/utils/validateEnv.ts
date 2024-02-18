import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        PORT: port({ default: 5000 }),
        MONGODB_URI: str(),
        REDIS_HOST: str(),
        REDIS_PORT: port(),
        REDIS_PASSWORD: str(),
        JWT_ACCESS_SECRET: str(),
        JWT_REFRESH_SECRET: str(),
        JWT_ACCESS_EXPIRES_IN: str(),
        JWT_REFRESH_EXPIRES_IN: str(),
        EMAIL_USER: str(),
        EMAIL_PASSWORD: str(),
        CLOUDINARY_CLOUD_NAME: str(),
        CLOUDINARY_API_KEY: str(),
        CLOUDINARY_API_SECRET: str(),
        LOCAL_ORIGIN: str(),
        PROD_ORIGIN: str(),
    });
}

export default validateEnv;

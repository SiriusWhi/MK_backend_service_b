declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MYSQL_DATABASE: string;
      MYSQL_HOST: string;
      MYSQL_PASSWORD: string;
      MYSQL_PORT: string;
      MYSQL_USERNAME: string;

      WEBHOOK_ENABLE_LOGGING: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}
export {};

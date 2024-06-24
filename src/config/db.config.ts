export const config = {
    URL: "postgres://default:HCFjpx63stci@ep-black-term-a4oklsw9.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
  export const dialect = "postgres";
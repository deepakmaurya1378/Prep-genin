/** @type {import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url:'postgresql://Prep-Genie_owner:cPWBzGFnqV41@ep-summer-fire-a6egl273.us-west-2.aws.neon.tech/Prep-Genie?sslmode=require' ,
    }
}
import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type JobsEn = GetTypeByName<typeof configuration, "jobsEn">;
export declare const allJobsEns: Array<JobsEn>;

export type JobsSr = GetTypeByName<typeof configuration, "jobsSr">;
export declare const allJobsSrs: Array<JobsSr>;

export type EducationsEn = GetTypeByName<typeof configuration, "educationsEn">;
export declare const allEducationsEns: Array<EducationsEn>;

export type EducationsSr = GetTypeByName<typeof configuration, "educationsSr">;
export declare const allEducationsSrs: Array<EducationsSr>;

export type BlogsEn = GetTypeByName<typeof configuration, "blogsEn">;
export declare const allBlogsEns: Array<BlogsEn>;

export type BlogsSr = GetTypeByName<typeof configuration, "blogsSr">;
export declare const allBlogsSrs: Array<BlogsSr>;

export {};

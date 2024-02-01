/**
 * 用户类别
 */
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender: number;
    profile: string;
    phone: string;
    email: string;
    userStatus: number;
    userCode: string;
    userRole: number;
    tags: string[];
    createTime: Date;
};
import {UserType} from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
    id: number;
    name: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    password?: string;
    //todo 定義枚舉值
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
};
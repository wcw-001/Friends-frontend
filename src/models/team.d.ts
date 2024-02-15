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
    userId: number
    //todo 定义枚举类
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoin: boolean;
    hasJoinNum?: number;
};
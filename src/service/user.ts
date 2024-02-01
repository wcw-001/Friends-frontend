import myAxios from "../plugins/myAxios.ts";
import {getCurrentUserState, setCurrentUserState} from "../states/user.ts";

/**
 *获取用户信息
 */
export const getCurrentUser = async ()=> {
    const currentUser = getCurrentUserState();
    if(currentUser){
        return currentUser;
    }
    //不存在从远程获取
    const res = await myAxios.get('/user/current');
    if(res.code === 0){
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;


}

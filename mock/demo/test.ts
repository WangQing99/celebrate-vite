import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, requestParams } from '../_util';

export function createFakeUserList() {
    return [
        {
            userId: '1',
            username: 'wq',
            realName: '王庆',
            avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
            desc: 'manager',
            password: '123456',
            token: 'token1',
            homePath: '/dashboard/analysis',
            roles: [
                {
                    roleName: 'Super Admin',
                    value: 'super',
                },
            ],
        }
    ];
}


export default [
    {
        url: '/api/login',
        timeout: 200,
        method: 'post',
        response: ({ body }: requestParams) => {
            const { username, password } = body;
            const checkUser = createFakeUserList().find(
                (item) => item.username === username && password === item.password,
            );
            if (!checkUser) {
                return resultError('Incorrect account or password！');
            }
            const { userId, username: _username, token, realName, desc, roles } = checkUser;
            return resultSuccess({
                roles,
                userId,
                username: _username,
                token,
                realName,
                desc,
            });
        },
    }
] as MockMethod[];

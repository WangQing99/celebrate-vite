import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util';

export function createFakeUserList() {
    return [
        {
            userId: '1',
            username: 'wangqing',
            realName: '王庆',
            avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
            desc: 'manager',
            password: '123456',
            token: 'fakeToken1',
            homePath: '/home',
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
        response: ({ body }) => {
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
    },
    {
        url: '/api/getUserInfo',
        method: 'get',
        response: (request: requestParams) => {
            const token = getRequestToken(request);
            if (!token) return resultError('Invalid token');
            const checkUser = createFakeUserList().find((item) => item.token === token);
            if (!checkUser) {
                return resultError('The corresponding user information was not obtained!');
            }
            return resultSuccess(checkUser);
        },
    },
] as MockMethod[]

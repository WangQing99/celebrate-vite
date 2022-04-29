

export function createFakeUserList() {
    return [
        {
            userId: '1',
            username: 'wangqomg',
            realName: 'Admin',
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

interface IMailConfig {
    drive: 'ethereal' | 'ses';

    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    drive: process.env.MAIL_DRIVE || 'ethereal',

    defaults: {
        from: {
            email: 'sandro.s.frazao@gmail.com',
            name: 'Sandro',
        },
    },
} as IMailConfig;

import IMailTempletaProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTempletaProvider {
    public async parse(): Promise<string> {
        return 'Mail content';
    }
}

export default FakeMailTemplateProvider;

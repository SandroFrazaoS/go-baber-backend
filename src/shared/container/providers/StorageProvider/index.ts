import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from './models/IStorageProvider';

import DiskStorageProvider from './implamantatios/DiskStorageProvider';
import S3StorageProvider from './implamantatios/S3StorageProvider';

const providers = {
    disk: DiskStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    providers[uploadConfig.driver],
);

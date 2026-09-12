import { MotivationalEntityBase } from '../MotivationalEntityBase';
import type { MotivationalSDK } from '../MotivationalSDK';
import type { Control } from '../types';
import type { Language, LanguageListMatch } from '../MotivationalTypes';
declare class LanguageEntity extends MotivationalEntityBase<Language> {
    constructor(client: MotivationalSDK, entopts: any);
    make(this: LanguageEntity): LanguageEntity;
    list(this: any, reqmatch?: LanguageListMatch, ctrl?: Control): Promise<LanguageEntity[]>;
}
export { LanguageEntity };

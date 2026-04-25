import { IRegistrationRule, ValidationResult } from './base.rule';

export class OriginRule implements IRegistrationRule {
  name = 'Origin Validation';

  async validate(data: any): Promise<ValidationResult> {
    const origin = data.origin || '';
    const isValid = origin.toLowerCase().includes('gorontalo');

    if (!isValid) {
      return {
        status: 'rejected',
        reason: 'Pendaftaran khusus untuk mahasiswa asal Gorontalo.',
      };
    }

    return { status: 'approved' };
  }
}

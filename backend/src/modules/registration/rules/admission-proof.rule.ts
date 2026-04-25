import { IRegistrationRule, ValidationResult } from './base.rule';

export class AdmissionProofRule implements IRegistrationRule {
  name = 'Admission Proof Validation';

  async validate(data: any): Promise<ValidationResult> {
    const proofUrl = data.admissionProofUrl;

    if (!proofUrl) {
      return {
        status: 'rejected',
        reason: 'Bukti diterima di kampus Jakarta wajib diunggah.',
      };
    }

    return { status: 'approved' };
  }
}

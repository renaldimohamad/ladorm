import { Injectable } from '@nestjs/common';
import { IRegistrationRule, ValidationResult } from './rules/base.rule';
import { OriginRule } from './rules/origin.rule';
import { AdmissionProofRule } from './rules/admission-proof.rule';

@Injectable()
export class RegistrationValidationService {
  private rules: IRegistrationRule[] = [];

  constructor() {
    // Config-based initialization: rules can be easily added/removed/reordered
    this.rules = [
      new OriginRule(),
      new AdmissionProofRule(),
    ];
  }

  async validate(data: any): Promise<ValidationResult> {
    for (const rule of this.rules) {
      const result = await rule.validate(data);
      if (result.status === 'rejected') {
        return result; // Exit early on first failure
      }
    }

    return { status: 'approved' };
  }
}

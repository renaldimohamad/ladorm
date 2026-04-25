export interface ValidationResult {
  status: 'approved' | 'rejected';
  reason?: string;
}

export interface IRegistrationRule {
  name: string;
  validate(data: any): Promise<ValidationResult>;
}

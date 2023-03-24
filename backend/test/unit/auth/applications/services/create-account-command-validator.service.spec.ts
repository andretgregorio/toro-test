import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountCommandValidatorService } from 'src/auth/applications/services/create-account-command-validator.service';

describe('CreateAccountCommandValidatorService', () => {
  let service: CreateAccountCommandValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateAccountCommandValidatorService],
    }).compile();

    service = module.get<CreateAccountCommandValidatorService>(
      CreateAccountCommandValidatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

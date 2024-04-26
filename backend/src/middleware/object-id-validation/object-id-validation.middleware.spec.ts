import { ObjectIdValidationMiddleware } from './object-id-validation.middleware';

describe('ObjectIdValidationMiddleware', () => {
  it('should be defined', () => {
    expect(new ObjectIdValidationMiddleware()).toBeDefined();
  });
});

import { __module__IdParamValidationSchema, __module__RequestBodyValidationSchema } from './validation.schemas';
import { validateRequestBody, validateUrlParams } from './validators';

export const validators = {
    urlIdParam: validateUrlParams(__module__IdParamValidationSchema),
    body: validateRequestBody(__module__RequestBodyValidationSchema),
}
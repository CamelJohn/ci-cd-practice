import { ParserIdParamValidationSchema, ParserRequestBodyValidationSchema } from './validation.schemas';
import { validateRequestBody, validateUrlParams } from './validators';

export const validators = {
    urlIdParam: validateUrlParams(ParserIdParamValidationSchema),
    body: validateRequestBody(ParserRequestBodyValidationSchema),
}